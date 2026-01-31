document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pattern-canvas');
    const ctx = canvas.getContext('2d');

    // Core Inputs
    const widthInput = document.getElementById('pattern-width');
    const heightInput = document.getElementById('pattern-height');
    const typeSelect = document.getElementById('pattern-type');
    const colorInput = document.getElementById('pattern-color'); // General Primary Color
    const showInfoCheckbox = document.getElementById('show-info');

    // Grid Inputs
    const gridMajorSizeInput = document.getElementById('grid-major-size');
    const gridSubdivisionsInput = document.getElementById('grid-subdivisions');
    const gridMajorColorInput = document.getElementById('grid-major-color');
    const gridMinorColorInput = document.getElementById('grid-minor-color');

    // UI Groups
    const colorControlGroup = document.getElementById('color-control-group');
    const gridControlsGroup = document.getElementById('grid-controls');

    const generateBtn = document.getElementById('generate-pattern-btn');
    const downloadBtn = document.getElementById('download-pattern-btn');

    // UI Logic
    function updateUI() {
        const type = typeSelect.value;

        if (type === 'grid') {
            gridControlsGroup.style.display = 'flex';
            colorControlGroup.style.display = 'none'; // Grid has its own colors
        } else if (type === 'gradient' || type === 'checkerboard') {
            gridControlsGroup.style.display = 'none';
            colorControlGroup.style.display = 'flex';
        } else {
            gridControlsGroup.style.display = 'none';
            colorControlGroup.style.display = 'none';
        }
    }

    typeSelect.addEventListener('change', updateUI);
    updateUI(); // Init

    // Drawing Functions
    function drawPattern() {
        const width = parseInt(widthInput.value) || 1920;
        const height = parseInt(heightInput.value) || 1080;
        const type = typeSelect.value;
        const showInfo = showInfoCheckbox.checked;

        // Resize canvas
        canvas.width = width;
        canvas.height = height;

        // Clear
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Draw Pattern
        switch (type) {
            case 'grid':
                const majorSize = parseInt(gridMajorSizeInput.value) || 100;
                const subdivs = parseInt(gridSubdivisionsInput.value) || 4;
                const majorColor = gridMajorColorInput.value;
                const minorColor = gridMinorColorInput.value;
                drawGrid(width, height, majorSize, subdivs, majorColor, minorColor);
                break;
            case 'color-bars':
                drawColorBars(width, height);
                break;
            case 'gradient':
                drawGradient(width, height, colorInput.value);
                break;
            case 'checkerboard':
                drawCheckerboard(width, height, colorInput.value);
                break;
            case 'contrast':
                drawContrastSteps(width, height);
                break;
            case 'cmyk':
                drawCMYK(width, height);
                break;
        }

        // Draw Info Overlay
        if (showInfo) {
            drawInfoOverlay(width, height, type);
        }

        // Draw Custom Label
        const customLabel = document.getElementById('custom-label').value;
        if (customLabel) {
            drawCustomLabel(width, height, customLabel);
        }
    }

    function drawCustomLabel(w, h, text) {
        // Dynamic font size based on height, but capped
        const fontSize = Math.floor(h / 10);
        ctx.font = `bold ${fontSize}px "Inter", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text Shadow/Outline for visibility
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.strokeText(text, w / 2, h / 2);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, w / 2, h / 2);

        // Reset
        ctx.lineWidth = 1;
    }

    function drawGrid(w, h, majorSize, subdivs, majorColor, minorColor) {
        const minorSize = majorSize / subdivs;

        // 1. Draw Minor Lines
        if (subdivs > 1) {
            ctx.beginPath();
            ctx.strokeStyle = minorColor;
            ctx.lineWidth = 1;

            // Vertical Minor
            for (let x = 0; x <= w; x += minorSize) {
                // Skip if this is also a major line position (approx)
                if (Math.abs(x % majorSize) > 0.1 && Math.abs(x % majorSize - majorSize) > 0.1) {
                    ctx.moveTo(Math.floor(x) + 0.5, 0); // +0.5 for crisp lines
                    ctx.lineTo(Math.floor(x) + 0.5, h);
                }
            }

            // Horizontal Minor
            for (let y = 0; y <= h; y += minorSize) {
                if (Math.abs(y % majorSize) > 0.1 && Math.abs(y % majorSize - majorSize) > 0.1) {
                    ctx.moveTo(0, Math.floor(y) + 0.5);
                    ctx.lineTo(w, Math.floor(y) + 0.5);
                }
            }
            ctx.stroke();
        }

        // 2. Draw Major Lines
        ctx.beginPath();
        ctx.strokeStyle = majorColor;
        ctx.lineWidth = 2; // Thicker major lines

        // Vertical Major
        for (let x = 0; x <= w; x += majorSize) {
            ctx.moveTo(Math.floor(x), 0);
            ctx.lineTo(Math.floor(x), h);
        }

        // Horizontal Major
        for (let y = 0; y <= h; y += majorSize) {
            ctx.moveTo(0, Math.floor(y));
            ctx.lineTo(w, Math.floor(y));
        }
        ctx.stroke();

        // 3. Center Crosshair (Always Red to stand out)
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;

        const centerX = w / 2;
        const centerY = h / 2;
        const crossSize = 50;

        // Cross
        ctx.moveTo(centerX - crossSize, centerY);
        ctx.lineTo(centerX + crossSize, centerY);
        ctx.moveTo(centerX, centerY - crossSize);
        ctx.lineTo(centerX, centerY + crossSize);
        ctx.stroke();

        // Circle (based on height)
        const circleRadius = Math.min(w, h) / 3; // 1/3 of screen height/width
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = majorColor; // Use major color for circle or keep custom? 
        // Let's keep it Red/Visible or maybe just same as Major but Red/contrast is better for center finding
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

        ctx.lineWidth = 1; // Reset
    }

    function drawColorBars(w, h) {
        const colors = [
            '#FFFFFF', // White
            '#FFFF00', // Yellow
            '#00FFFF', // Cyan
            '#00FF00', // Green
            '#FF00FF', // Magenta
            '#FF0000', // Red
            '#0000FF'  // Blue
        ];

        const barWidth = w / colors.length;

        colors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.fillRect(i * barWidth, 0, barWidth, h);
        });
    }

    function drawGradient(w, h, color) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, color);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    function drawCheckerboard(w, h, color) {
        const size = 100;
        const rows = Math.ceil(h / size);
        const cols = Math.ceil(w / size);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if ((r + c) % 2 === 0) {
                    ctx.fillStyle = color;
                    ctx.fillRect(c * size, r * size, size, size);
                }
            }
        }
    }

    function drawContrastSteps(w, h) {
        const steps = 11; // 0 to 100% in 10% steps
        const stepWidth = w / steps;

        for (let i = 0; i < steps; i++) {
            const val = Math.floor((i / (steps - 1)) * 255);
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            ctx.fillRect(i * stepWidth, 0, stepWidth, h);

            // Label
            ctx.fillStyle = val > 128 ? '#000' : '#fff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${i * 10}%`, i * stepWidth + stepWidth / 2, h - 20);
        }
    }

    function drawCMYK(w, h) {
        const colors = [
            '#00FFFF', // Cyan
            '#FF00FF', // Magenta
            '#FFFF00', // Yellow
            '#000000'  // Black
        ];
        const barWidth = w / 4;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);

        colors.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.fillRect(i * barWidth, 0, barWidth, h);
        });
    }

    function drawInfoOverlay(w, h, type) {
        const padding = 20;
        const fontSize = Math.max(16, Math.floor(h / 30));

        ctx.font = `${fontSize}px "Inter", sans-serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

        // Measure text
        const text = `${w} x ${h} | ${type.replace('-', ' ').toUpperCase()} | ${new Date().toLocaleTimeString()}`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;

        // Background box
        ctx.fillRect(padding, h - padding - fontSize - 10, textWidth + 20, fontSize + 10);

        // Text
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'left';
        ctx.fillText(text, padding + 10, h - padding - 5);
    }

    // Event Listeners
    generateBtn.addEventListener('click', drawPattern);

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `test-pattern-${typeSelect.value}-${widthInput.value}x${heightInput.value}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Initial draw
    document.fonts.ready.then(drawPattern);
});
