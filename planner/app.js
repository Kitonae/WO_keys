/**
 * WATCHOUT Infrastructure Planner
 * Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    const state = {
        nodes: [],
        connections: [],
        nextId: 1,
        pan: { x: 0, y: 0 },
        scale: 1,
        isDraggingNode: null,
        isPanning: false,
        isConnecting: null, // { sourceNodeId, sourcePortId, tempLine }
        selection: null, // selected node
        mouseStart: { x: 0, y: 0 },
        nodeStart: { x: 0, y: 0 }
    };

    // --- DOM Elements ---
    const container = document.getElementById('editor-container');
    const nodesLayer = document.getElementById('nodes-layer');
    const svgLayer = document.getElementById('connections-layer');
    const propsContent = document.getElementById('properties-content');

    // Tools
    const toolButtons = {
        production: document.getElementById('add-production'),
        display: document.getElementById('add-display'),
        projector: document.getElementById('add-projector'),
        led: document.getElementById('add-led'),
        switch: document.getElementById('add-switch'),
        clear: document.getElementById('clear-canvas'),
        save: document.getElementById('save-plan')
    };

    // --- Node Definitions ---
    const NodeTypes = {
        production: {
            title: 'Production Computer',
            icon: 'fa-desktop',
            width: 220,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'out-1', label: 'Output 1', type: 'output' }
            ],
            data: { name: 'Prod-1', ip: '192.168.1.100' }
        },
        display: {
            title: 'Display Server',
            icon: 'fa-server',
            width: 220,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'in', label: 'Input', type: 'input' },
                { id: 'out-1', label: 'Output 1', type: 'output' },
                { id: 'out-2', label: 'Output 2', type: 'output' },
                { id: 'out-3', label: 'Output 3', type: 'output' },
                { id: 'out-4', label: 'Output 4', type: 'output' }
            ],
            data: { name: 'Disp-1', ip: '192.168.1.101', outputs: 4 }
        },
        projector: {
            title: 'Projector',
            icon: 'fa-video',
            width: 180,
            ports: [
                { id: 'in', label: 'Input', type: 'input' },
                { id: 'net', label: 'Control', type: 'network' }
            ],
            data: { name: 'Proj-1', resolution: '1920x1080' }
        },
        led: {
            title: 'LED Processor',
            icon: 'fa-border-all',
            width: 200,
            ports: [
                { id: 'in', label: 'Input', type: 'input' },
                { id: 'net', label: 'Control', type: 'network' }
            ],
            data: { name: 'LED-1', pixels: '3840x2160' }
        },
        switch: {
            title: 'Network Switch',
            icon: 'fa-network-wired',
            width: 180,
            ports: [
                { id: 'p1', label: 'Port 1', type: 'network' },
                { id: 'p2', label: 'Port 2', type: 'network' },
                { id: 'p3', label: 'Port 3', type: 'network' },
                { id: 'p4', label: 'Port 4', type: 'network' },
                { id: 'p5', label: 'Port 5', type: 'network' },
                { id: 'p8', label: 'Port 8', type: 'network' }
            ],
            data: { name: 'Switch-1', model: 'Generic' }
        }
    };

    // --- Core Functions ---

    function createNode(type, x, y) {
        const def = NodeTypes[type];
        if (!def) return;

        const node = {
            id: state.nextId++,
            type: type,
            x: x,
            y: y,
            width: def.width,
            ports: JSON.parse(JSON.stringify(def.ports)), // Deep copy
            data: { ...def.data } // Copy default data
        };

        // Name auto-increment logic could go here
        node.data.name = `${def.data.name.split('-')[0]}-${node.id}`;

        state.nodes.push(node);
        renderNode(node);
    }

    function renderNode(node) {
        const def = NodeTypes[node.type];

        const el = document.createElement('div');
        el.className = 'node';
        el.id = `node-${node.id}`;
        el.style.left = `${node.x}px`;
        el.style.top = `${node.y}px`;
        el.style.width = `${node.width}px`;

        // Apply Color if exists
        if (node.data.color) {
            el.style.borderColor = node.data.color;
        }

        // Select handler
        el.addEventListener('mousedown', (e) => {
            if (e.target.closest('.port-socket')) return; // Don't select if clicking port
            selectNode(node.id);
        });

        const header = document.createElement('div');
        header.className = 'node-header';
        header.innerHTML = `
            <i class="fa-solid ${def.icon} node-icon"></i> 
            <span class="node-title">${node.data.name}</span>
        `;

        // Color Stripe
        const stripe = document.createElement('div');
        stripe.className = 'node-color-stripe';
        if (node.data.color) stripe.style.background = node.data.color;
        header.appendChild(stripe);

        // Drag handler on header
        header.addEventListener('mousedown', (e) => {
            startDragNode(e, node);
        });

        const body = document.createElement('div');
        body.className = 'node-body';

        // Render Ports
        node.ports.forEach(port => {
            const portEl = document.createElement('div');
            // Determine alignment
            let alignClass = port.type === 'input' ? 'input' : (port.type === 'output' ? 'output' : 'network');
            portEl.className = `port ${alignClass}`;
            portEl.innerHTML = `
                ${port.type !== 'input' ? `<span>${port.label}</span>` : ''}
                <div class="port-socket" data-node="${node.id}" data-port="${port.id}" data-type="${port.type}"></div>
                ${port.type === 'input' ? `<span>${port.label}</span>` : ''}
            `;

            // Connection start handler
            const socket = portEl.querySelector('.port-socket');
            socket.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                startConnection(e, node.id, port.id, port.type);
            });

            body.appendChild(portEl);
        });

        // Render Properties on Node
        const propsDiv = document.createElement('div');
        propsDiv.className = 'node-properties';

        // Filter out name and color, show others
        Object.keys(node.data).forEach(key => {
            if (key !== 'name' && key !== 'color') {
                const row = document.createElement('div');
                row.className = 'node-property';
                row.innerHTML = `<span class="key">${key}:</span> <span class="value">${node.data[key]}</span>`;
                propsDiv.appendChild(row);
            }
        });
        body.appendChild(propsDiv);

        el.appendChild(header);
        el.appendChild(body);
        nodesLayer.appendChild(el);
    }

    function updateNodePosition(nodeId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return;
        const el = document.getElementById(`node-${nodeId}`);
        if (el) {
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
        }
        updateConnections(); // Re-render lines
    }

    function selectNode(nodeId) {
        // Deselect previous
        if (state.selection) {
            const prevEl = document.getElementById(`node-${state.selection}`);
            if (prevEl) prevEl.classList.remove('selected');
        }

        // New selection
        state.selection = nodeId;
        if (nodeId) {
            const el = document.getElementById(`node-${nodeId}`);
            if (el) el.classList.add('selected');
            renderProperties(nodeId);
        } else {
            propsContent.innerHTML = '<p class="placeholder-text">Select a node to view properties.</p>';
        }
    }

    function renderProperties(nodeId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return;

        let html = '';

        // Name Field
        html += `
            <div class="prop-row">
                <label>Name</label>
                <input type="text" id="prop-name" value="${node.data.name}">
            </div>
        `;

        // Color Palette
        const colors = [
            '#252533', // Default Dark
            '#6B25DD', // Purple
            '#3b82f6', // Blue
            '#22c55e', // Green
            '#f59e0b', // Orange
            '#ef4444', // Red
            '#ec4899', // Pink
            '#06b6d4', // Cyan
            '#64748b'  // Slate
        ];

        const currentColor = node.data.color || '#252533';

        html += `
             <div class="prop-row">
                <label>Node Color</label>
                <div class="color-palette" id="prop-color-palette">
                    ${colors.map(c => `
                        <div class="color-swatch ${c === currentColor ? 'active' : ''}" 
                             style="background-color: ${c};" 
                             data-color="${c}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Other Data Fields
        Object.keys(node.data).forEach(key => {
            if (key !== 'name' && key !== 'color') {
                html += `
                    <div class="prop-row">
                        <label>${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input type="text" class="prop-dynamic" data-key="${key}" value="${node.data[key]}">
                    </div>
                `;
            }
        });

        // Delete Button
        html += `
            <div style="margin-top: 20px;">
                <button id="delete-node-btn" class="tool-btn danger" style="width: 100%; justify-content: center;">Delete Node</button>
            </div>
        `;

        propsContent.innerHTML = html;

        // Listeners
        const nameInput = document.getElementById('prop-name');
        nameInput.addEventListener('input', (e) => {
            node.data.name = e.target.value;
            refreshNodeVisuals(node);
        });

        const swatches = document.querySelectorAll('.color-swatch');
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                // Update data
                node.data.color = swatch.dataset.color;

                // Update UI
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');

                refreshNodeVisuals(node);
            });
        });

        const dynamicInputs = document.querySelectorAll('.prop-dynamic');
        dynamicInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const key = input.dataset.key;
                node.data[key] = e.target.value;
                refreshNodeVisuals(node);
            });
        });

        const deleteBtn = document.getElementById('delete-node-btn');
        deleteBtn.addEventListener('click', () => {
            deleteNode(nodeId);
        });
    }

    // Helper to update specific node visual parts without full re-render (or just simple re-render parts)
    function refreshNodeVisuals(node) {
        const el = document.getElementById(`node-${node.id}`);
        if (!el) return;

        // Update Title
        el.querySelector('.node-title').textContent = node.data.name;

        // Update Color
        if (node.data.color) {
            el.style.borderColor = node.data.color;
            const stripe = el.querySelector('.node-color-stripe');
            if (stripe) stripe.style.background = node.data.color;
        }

        // Update Properties List
        const propsDiv = el.querySelector('.node-properties');
        if (propsDiv) {
            propsDiv.innerHTML = '';
            Object.keys(node.data).forEach(key => {
                if (key !== 'name' && key !== 'color') {
                    const row = document.createElement('div');
                    row.className = 'node-property';
                    row.innerHTML = `<span class="key">${key}:</span> <span class="value">${node.data[key]}</span>`;
                    propsDiv.appendChild(row);
                }
            });
        }
    }

    function deleteNode(nodeId) {
        // Remove connections
        state.connections = state.connections.filter(c => c.source !== nodeId && c.target !== nodeId);

        // Remove node
        state.nodes = state.nodes.filter(n => n.id !== nodeId);

        // Remove DOM
        const el = document.getElementById(`node-${nodeId}`);
        if (el) el.remove();

        selectNode(null);
        updateConnections();
    }

    // --- Drag Logic ---

    function startDragNode(e, node) {
        e.preventDefault();
        state.isDraggingNode = node.id;
        state.mouseStart = { x: e.clientX, y: e.clientY };
        state.nodeStart = { x: node.x, y: node.y };
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        selectNode(node.id);
    }

    function onDragMove(e) {
        if (state.isDraggingNode) {
            const dx = (e.clientX - state.mouseStart.x) / state.scale;
            const dy = (e.clientY - state.mouseStart.y) / state.scale;

            const node = state.nodes.find(n => n.id === state.isDraggingNode);
            if (node) {
                node.x = state.nodeStart.x + dx;
                node.y = state.nodeStart.y + dy;
                updateNodePosition(node.id);
            }
        } else if (state.isConnecting) {
            renderTempLine(e.clientX, e.clientY);
        } else if (state.isPanning) {
            // Handle panning
            const dx = e.clientX - state.mouseStart.x;
            const dy = e.clientY - state.mouseStart.y;
            state.pan.x += dx;
            state.pan.y += dy;
            state.mouseStart = { x: e.clientX, y: e.clientY }; // Reset for incremental update
            applyPanZoom();
        }
    }

    function onDragEnd(e) {
        if (state.isDraggingNode) {
            state.isDraggingNode = null;
        }
        if (state.isConnecting) {
            // Check if dropped on a socket
            const targetEl = document.elementFromPoint(e.clientX, e.clientY);
            const socket = targetEl ? targetEl.closest('.port-socket') : null;

            if (socket) {
                const targetNode = parseInt(socket.dataset.node);
                const targetPort = socket.dataset.port;
                const targetType = socket.dataset.type;

                // Validate
                if (targetNode !== state.isConnecting.sourceNodeId) {
                    createConnection(
                        state.isConnecting.sourceNodeId,
                        state.isConnecting.sourcePortId,
                        targetNode,
                        targetPort
                    );
                }
            }

            // Cleanup
            state.isConnecting = null;
            const tempLine = document.getElementById('temp-line');
            if (tempLine) tempLine.remove();
        }
        if (state.isPanning) {
            state.isPanning = false;
        }

        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
    }

    // --- Connection Logic ---

    function startConnection(e, nodeId, portId, type) {
        state.isConnecting = {
            sourceNodeId: nodeId,
            sourcePortId: portId,
            startPos: getPortPosition(nodeId, portId)
        };

        // Create temp line
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'connection-line');
        path.setAttribute('id', 'temp-line');
        path.style.strokeDasharray = "5,5"; // Dashed for temp
        svgLayer.appendChild(path);

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
    }

    function renderTempLine(mouseX, mouseY) {
        if (!state.isConnecting) return;

        // Convert mouse to local space approx (simple version, pan support needed)
        // For now assuming mouse coords roughly map or simple offset
        // Rect of container
        const rect = container.getBoundingClientRect();
        const endX = (mouseX - rect.left - state.pan.x) / state.scale;
        const endY = (mouseY - rect.top - state.pan.y) / state.scale;

        const start = state.isConnecting.startPos;

        const d = getBezierPath(start.x, start.y, endX, endY);
        const el = document.getElementById('temp-line');
        if (el) el.setAttribute('d', d);
    }

    function createConnection(sourceNode, sourcePort, targetNode, targetPort) {
        // Prevent dupes
        const exists = state.connections.find(c =>
            (c.source === sourceNode && c.sourcePort === sourcePort && c.target === targetNode && c.targetPort === targetPort) ||
            (c.source === targetNode && c.sourcePort === targetPort && c.target === sourceNode && c.targetPort === sourcePort) // Bi-directional check not strictly needed but good for uniqueness
        );
        if (exists) return;

        state.connections.push({
            id: Date.now(),
            source: sourceNode,
            sourcePort: sourcePort,
            target: targetNode,
            targetPort: targetPort
        });
        updateConnections();
    }

    function updateConnections() {
        // Clear existing (except temp)
        const temp = document.getElementById('temp-line');
        svgLayer.innerHTML = '';
        if (temp) svgLayer.appendChild(temp);

        state.connections.forEach(conn => {
            const start = getPortPosition(conn.source, conn.sourcePort);
            const end = getPortPosition(conn.target, conn.targetPort);

            if (!start || !end) return;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'connection-line');
            path.setAttribute('d', getBezierPath(start.x, start.y, end.x, end.y));

            // Delete on click
            path.addEventListener('click', (e) => {
                // Delete connection
                // Maybe simple confirmation or selected state?
                // Just delete for now
                if (e.shiftKey) { // Shift click to delete
                    state.connections = state.connections.filter(c => c.id !== conn.id);
                    updateConnections();
                }
            });

            svgLayer.appendChild(path);
        });
    }

    function getPortPosition(nodeId, portId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return null;

        // Find DOM element
        const socket = document.querySelector(`.port-socket[data-node="${nodeId}"][data-port="${portId}"]`);
        if (!socket) return null;

        // Calculate center relative to container
        // Note: socket.getBoundingClientRect is relative to viewport
        // container.getBoundingClientRect is relative to viewport
        // We need coordinates relative to the nodes-layer (0,0) *before* pan/scale
        // But since nodes-layer moves WITH pan/scale, we need coordinates relative to nodes-layer itself.

        // Simpler: Node x/y is known. Offset within node?
        // Let's rely on node.x/y + offset

        const nodeEl = document.getElementById(`node-${nodeId}`);
        const socketRect = socket.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();

        const offsetX = socketRect.left - nodeRect.left + socketRect.width / 2;
        const offsetY = socketRect.top - nodeRect.top + socketRect.height / 2;

        return {
            x: node.x + offsetX,
            y: node.y + offsetY
        };
    }

    function getBezierPath(x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1);
        const cp1x = x1 + dx * 0.5; // Control points
        const cp2x = x2 - dx * 0.5;
        // Simple curvature?
        // Let's use standard curvature:
        // C cp1x,y1 cp2x,y2 x2,y2

        // If x distance is small, maybe curve vertically?
        // Standard node editor curve:
        const cpOffset = Math.max(dx * 0.5, 50);
        return `M ${x1} ${y1} C ${x1 + cpOffset} ${y1}, ${x2 - cpOffset} ${y2}, ${x2} ${y2}`;
    }

    // --- Panning ---
    container.addEventListener('mousedown', (e) => {
        if (e.target === container || e.target === svgLayer) {
            state.isPanning = true;
            state.mouseStart = { x: e.clientX, y: e.clientY };
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
        }
    });

    function applyPanZoom() {
        nodesLayer.style.transform = `translate(${state.pan.x}px, ${state.pan.y}px) scale(${state.scale})`;
        svgLayer.style.transform = `translate(${state.pan.x}px, ${state.pan.y}px) scale(${state.scale})`;
    }

    // --- Init ---

    // Buttons
    Object.keys(toolButtons).forEach(key => {
        const btn = toolButtons[key];
        if (!btn) return;

        btn.addEventListener('click', () => {
            // Center of viewport approx
            const cx = (-state.pan.x + container.clientWidth / 2) / state.scale;
            const cy = (-state.pan.y + container.clientHeight / 2) / state.scale;

            if (key === 'clear') {
                if (confirm('Clear all nodes?')) {
                    state.nodes = [];
                    state.connections = [];
                    nodesLayer.innerHTML = '';
                    updateConnections();
                }
            } else if (key === 'save') {
                const json = JSON.stringify({ nodes: state.nodes, connections: state.connections }, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'infrastructure-plan.json';
                a.click();
            } else {
                createNode(key, cx - 100, cy - 50); // Offset to be centeredish
            }
        });
    });

    // Add initial node for demo
    createNode('production', 100, 100);
});
