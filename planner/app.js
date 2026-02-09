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

    // --- Persistence ---
    function saveState() {
        const data = {
            nodes: state.nodes,
            connections: state.connections,
            nextId: state.nextId,
            pan: state.pan,
            scale: state.scale
        };
        localStorage.setItem('watchout-planner-v1', JSON.stringify(data));
    }

    function loadState() {
        const raw = localStorage.getItem('watchout-planner-v1');
        if (raw) {
            try {
                const data = JSON.parse(raw);
                state.nodes = data.nodes || [];
                state.connections = data.connections || [];
                state.nextId = data.nextId || 1;
                state.pan = data.pan || { x: 0, y: 0 };
                state.scale = data.scale || 1;
                return true;
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
        return false;
    }

    // --- DOM Elements ---
    const container = document.getElementById('editor-container');
    const nodesLayer = document.getElementById('nodes-layer');
    const svgLayer = document.getElementById('connections-layer');
    const propsContent = document.getElementById('properties-content');

    // Tools
    const toolButtons = {
        production: document.getElementById('add-production'),
        display: document.getElementById('add-display'),
        watchpax: document.getElementById('add-watchpax'),
        projector: document.getElementById('add-projector'),
        led: document.getElementById('add-led'),
        matrix: document.getElementById('add-matrix'),
        ndi: document.getElementById('add-ndi'),
        capture: document.getElementById('add-capture'),
        mediaserver: document.getElementById('add-mediaserver'),
        dmx: document.getElementById('add-dmx'),
        audio: document.getElementById('add-audio'),
        switch: document.getElementById('add-switch'),
        control: document.getElementById('add-control'),
        clear: document.getElementById('clear-canvas'),
        save: document.getElementById('save-plan'),
        load: document.getElementById('load-plan')
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
        watchpax: {
            title: 'WATCHPAX',
            icon: 'fa-cube',
            width: 200,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'out-1', label: 'Output 1', type: 'output' },
                { id: 'out-2', label: 'Output 2', type: 'output' }
            ],
            data: { name: 'PAX-1', ip: '192.168.1.110', model: 'WATCHPAX 60' }
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
        ndi: {
            title: 'NDI Source',
            icon: 'fa-podcast',
            width: 200,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'out', label: 'NDI Out', type: 'output' }
            ],
            data: { name: 'NDI-1', stream: 'Camera 1', resolution: '1920x1080' }
        },
        capture: {
            title: 'Capture Card',
            icon: 'fa-sd-card',
            width: 200,
            ports: [
                { id: 'in-sdi', label: 'SDI In', type: 'input' },
                { id: 'in-hdmi', label: 'HDMI In', type: 'input' },
                { id: 'out', label: 'To PC', type: 'output' }
            ],
            data: { name: 'Cap-1', model: 'Decklink', inputs: 2 }
        },
        dmx: {
            title: 'DMX / Art-Net',
            icon: 'fa-lightbulb',
            width: 200,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'dmx-out', label: 'DMX Out', type: 'output' }
            ],
            data: { name: 'DMX-1', universe: 1, protocol: 'Art-Net' }
        },
        audio: {
            title: 'Audio Device',
            icon: 'fa-volume-high',
            width: 180,
            ports: [
                { id: 'net', label: 'Dante/AES67', type: 'network' },
                { id: 'in', label: 'Audio In', type: 'input' },
                { id: 'out', label: 'Audio Out', type: 'output' }
            ],
            data: { name: 'Audio-1', channels: 8 }
        },
        control: {
            title: 'Control System',
            icon: 'fa-gamepad',
            width: 200,
            ports: [
                { id: 'net', label: 'Network', type: 'network' }
            ],
            data: { name: 'Ctrl-1', protocol: 'OSC', model: 'Stream Deck' }
        },
        mediaserver: {
            title: 'Media Server',
            icon: 'fa-film',
            width: 220,
            ports: [
                { id: 'net', label: 'Network', type: 'network' },
                { id: 'out-1', label: 'Output 1', type: 'output' },
                { id: 'out-2', label: 'Output 2', type: 'output' },
                { id: 'ndi-out', label: 'NDI Out', type: 'output' }
            ],
            data: { name: 'Media-1', ip: '192.168.1.120' }
        },
        matrix: {
            title: 'Matrix Switcher',
            icon: 'fa-arrows-turn-to-dots',
            width: 220,
            ports: [
                { id: 'in-1', label: 'In 1', type: 'input' },
                { id: 'in-2', label: 'In 2', type: 'input' },
                { id: 'in-3', label: 'In 3', type: 'input' },
                { id: 'in-4', label: 'In 4', type: 'input' },
                { id: 'out-1', label: 'Out 1', type: 'output' },
                { id: 'out-2', label: 'Out 2', type: 'output' },
                { id: 'out-3', label: 'Out 3', type: 'output' },
                { id: 'out-4', label: 'Out 4', type: 'output' },
                { id: 'net', label: 'Control', type: 'network' }
            ],
            data: { name: 'Matrix-1', model: '4x4 HDMI' }
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
                { id: 'p6', label: 'Port 6', type: 'network' },
                { id: 'p7', label: 'Port 7', type: 'network' },
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
        saveState();
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
        // No longer setting border color here
        // if (node.data.color) { el.style.borderColor = node.data.color; }

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

        // Apply color to header background if exists
        if (node.data.color) {
            header.style.backgroundColor = node.data.color;
        }

        // Color Stripe (Removed)
        /*
        const stripe = document.createElement('div');
        stripe.className = 'node-color-stripe';
        if (node.data.color) stripe.style.background = node.data.color;
        header.appendChild(stripe);
        */

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
                ${port.type === 'network' ? `<span class="port-connected-label" data-port-id="${port.id}"></span>` : ''}
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

        // Connections List (New)
        html += `
            <div class="prop-row">
                <label>Connections</label>
                <div class="connections-list" style="font-size: 0.8rem; color: var(--text-muted);">
                    ${getConnectionsHtml(node)}
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
            saveState();
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
                saveState();
            });
        });

        const dynamicInputs = document.querySelectorAll('.prop-dynamic');
        dynamicInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const key = input.dataset.key;
                node.data[key] = e.target.value;
                refreshNodeVisuals(node);
                saveState();
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

        // Update Network Port Labels
        node.ports.forEach(port => {
            if (port.type === 'network') {
                const labelEl = el.querySelector(`.port-connected-label[data-port-id="${port.id}"]`);
                if (labelEl) {
                    const conn = state.connections.find(c =>
                        (c.source === node.id && c.sourcePort === port.id) ||
                        (c.target === node.id && c.targetPort === port.id)
                    );

                    if (conn) {
                        const otherNodeId = conn.source === node.id ? conn.target : conn.source;
                        const otherNode = state.nodes.find(n => n.id === otherNodeId);
                        if (otherNode) {
                            labelEl.textContent = `-> ${otherNode.data.name}`;
                            labelEl.style.display = 'inline';
                            return;
                        }
                    }
                    labelEl.textContent = '';
                    labelEl.style.display = 'none';
                }
            }
        });

        // Update Color
        // Update Color
        const header = el.querySelector('.node-header');
        if (node.data.color) {
            header.style.backgroundColor = node.data.color;
            // Clear border just in case
            el.style.borderColor = '';
        } else {
            header.style.backgroundColor = ''; // Revert to CSS default
            el.style.borderColor = '';
        }

        // Stripe removed
        /*
        const stripe = el.querySelector('.node-color-stripe');
        if (stripe) stripe.style.background = node.data.color;
        */

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

    function getConnectionsHtml(node) {
        const relevantConns = state.connections.filter(c => c.source === node.id || c.target === node.id);
        if (relevantConns.length === 0) return 'None';

        return relevantConns.map(c => {
            const isSource = c.source === node.id;
            const otherNodeId = isSource ? c.target : c.source;
            const otherNode = state.nodes.find(n => n.id === otherNodeId);
            const myPortId = isSource ? c.sourcePort : c.targetPort;
            const otherPortId = isSource ? c.targetPort : c.sourcePort;

            const myPort = node.ports.find(p => p.id === myPortId);
            const otherPort = otherNode ? otherNode.ports.find(p => p.id === otherPortId) : null;

            if (!otherNode || !myPort || !otherPort) return '';

            return `
                <div style="margin-bottom: 4px; padding: 4px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                    <span style="color: var(--text-primary);">${myPort.label}</span>
                    <i class="fa-solid fa-arrow-right" style="font-size: 0.7em; margin: 0 4px;"></i>
                    <span style="color: var(--text-secondary);">${otherNode.data.name} (${otherPort.label})</span>
                </div>
            `;
        }).join('');
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
        saveState();
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
            saveState();
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
            saveState();
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

        // Refresh visuals for both nodes to show connected labels
        refreshNodeVisuals(state.nodes.find(n => n.id === sourceNode));
        refreshNodeVisuals(state.nodes.find(n => n.id === targetNode));

        saveState();
    }

    function updateConnections() {
        // Clear existing (except temp)
        const temp = document.getElementById('temp-line');
        svgLayer.innerHTML = '';
        if (temp) svgLayer.appendChild(temp);

        // Reset all port styles first
        document.querySelectorAll('.port-socket').forEach(el => {
            el.classList.remove('connected');
        });

        state.connections.forEach(conn => {
            // Mark ports as connected
            const sourceSocket = document.querySelector(`.port-socket[data-node="${conn.source}"][data-port="${conn.sourcePort}"]`);
            const targetSocket = document.querySelector(`.port-socket[data-node="${conn.target}"][data-port="${conn.targetPort}"]`);

            if (sourceSocket) sourceSocket.classList.add('connected');
            if (targetSocket) targetSocket.classList.add('connected');
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
                    const src = conn.source;
                    const tgt = conn.target;
                    state.connections = state.connections.filter(c => c.id !== conn.id);
                    updateConnections();

                    // Refresh visuals to clear labels
                    refreshNodeVisuals(state.nodes.find(n => n.id === src));
                    refreshNodeVisuals(state.nodes.find(n => n.id === tgt));

                    saveState();
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
            selectNode(null);
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
                    saveState();
                }
            } else if (key === 'save') {
                const json = JSON.stringify({ nodes: state.nodes, connections: state.connections, nextId: state.nextId, pan: state.pan, scale: state.scale }, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'infrastructure-plan.json';
                a.click();
            } else if (key === 'load') {
                document.getElementById('load-file').click();
            } else {
                createNode(key, cx - 100, cy - 50); // Offset to be centeredish
            }
        });
    });

    // File Input Listener
    const loadFile = document.getElementById('load-file');
    loadFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                // Validate data structure lightly
                if (!Array.isArray(data.nodes) || !Array.isArray(data.connections)) {
                    alert('Invalid file format');
                    return;
                }

                // Update state
                state.nodes = data.nodes || [];
                state.connections = data.connections || [];
                state.nextId = data.nextId || (Math.max(...state.nodes.map(n => n.id), 0) + 1);
                state.pan = data.pan || { x: 0, y: 0 };
                state.scale = data.scale || 1;

                // Clear and render
                nodesLayer.innerHTML = '';
                state.nodes.forEach(node => renderNode(node));
                updateConnections();
                applyPanZoom();
                saveState();

                // Clear input
                loadFile.value = '';
            } catch (err) {
                console.error("Error parsing file", err);
                alert('Failed to load file');
            }
        };
        reader.readAsText(file);
    });

    // Add initial node for demo
    // Load state or add initial node
    if (loadState()) {
        state.nodes.forEach(node => renderNode(node));
        updateConnections();
        applyPanZoom();
    } else {
        createNode('production', 100, 100);
    }
});
