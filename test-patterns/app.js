document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pattern-canvas');
    const ctx = canvas.getContext('2d');

    // Core Inputs
    const widthInput = document.getElementById('pattern-width');
    const heightInput = document.getElementById('pattern-height');
    const showInfoCheckbox = document.getElementById('show-info');

    // Grid Inputs
    const gridMajorSizeInput = document.getElementById('grid-major-size');
    const gridSubdivisionsInput = document.getElementById('grid-subdivisions');
    const gridMajorColorInput = document.getElementById('grid-major-color');
    const gridMinorColorInput = document.getElementById('grid-minor-color');
    const showStampsCheckbox = document.getElementById('show-stamps');

    // Display Setup Inputs
    const displayColsInput = document.getElementById('display-cols');
    const displayRowsInput = document.getElementById('display-rows');
    const overlapHInput = document.getElementById('display-overlap-h');
    const overlapVInput = document.getElementById('display-overlap-v');
    const showBordersCheckbox = document.getElementById('show-borders');
    const showRulerCheckbox = document.getElementById('show-ruler');

    // UI Groups
    const gridControlsGroup = document.getElementById('grid-controls');

    const generateBtn = document.getElementById('generate-pattern-btn');
    const downloadBtn = document.getElementById('download-pattern-btn');

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Drawing Functions
    function drawPattern() {
        const dWidth = parseInt(widthInput.value) || 1920;
        const dHeight = parseInt(heightInput.value) || 1080;
        const cols = parseInt(displayColsInput.value) || 1;
        const rows = parseInt(displayRowsInput.value) || 1;
        const overlapH = parseInt(overlapHInput.value) || 0;
        const overlapV = parseInt(overlapVInput.value) || 0;

        const totalWidth = (dWidth * cols) - (overlapH * (cols - 1));
        const totalHeight = (dHeight * rows) - (overlapV * (rows - 1));

        const showInfo = showInfoCheckbox.checked;
        const showBorders = showBordersCheckbox.checked;
        const showRuler = showRulerCheckbox.checked;
        const showStamps = showStampsCheckbox.checked;

        // Resize canvas
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Clear
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        // Draw Pattern (Grid Only)
        const majorSize = parseInt(gridMajorSizeInput.value) || 100;
        const subdivs = parseInt(gridSubdivisionsInput.value) || 4;
        const majorColor = gridMajorColorInput.value;
        const minorColor = gridMinorColorInput.value;

        // Repeat grid/circle for each display
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dWidth - overlapH);
                const y = r * (dHeight - overlapV);
                ctx.save();
                ctx.translate(x, y);
                // Clip to display area
                ctx.beginPath();
                ctx.rect(0, 0, dWidth, dHeight);
                ctx.clip();

                if (showStamps) {
                    drawStamps(dWidth, dHeight);
                }

                drawGrid(dWidth, dHeight, majorSize, subdivs, majorColor, minorColor);
                ctx.restore();
            }
        }

        // Draw Display Borders & Overlaps
        if (showBorders && (cols > 1 || rows > 1)) {
            drawDisplayBorders(dWidth, dHeight, cols, rows, overlapH, overlapV);
        }

        // Draw Rulers
        if (showRuler) {
            drawRulers(totalWidth, totalHeight);
        }

        // Draw Info Overlay
        if (showInfo) {
            drawInfoOverlay(totalWidth, totalHeight, 'GRID', cols, rows, dWidth, dHeight);
        }

        // Draw Custom Label
        const customLabel = document.getElementById('custom-label').value;
        if (customLabel) {
            drawCustomLabel(totalWidth, totalHeight, customLabel);
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

    function drawDisplayBorders(dW, dH, cols, rows, ovH, ovV) {
        ctx.save();

        // 1. Draw individual display borders (dashed Cyan)
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.lineWidth = 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (dW - ovH);
                const y = r * (dH - ovV);
                ctx.strokeRect(x + 1, y + 1, dW - 2, dH - 2);

                // Display Index
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.font = 'bold 24px Inter, sans-serif';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(`Display ${r * cols + c + 1}`, x + 20, y + 20);
            }
        }

        // 2. Highlight Overlap areas (semi-transparent Yellow)
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255, 255, 0, 0.15)';

        // Horizontal Overlaps
        if (ovH > 0 && cols > 1) {
            for (let c = 1; c < cols; c++) {
                const x = c * (dW - ovH);
                ctx.fillRect(x, 0, ovH, canvas.height);

                // Overlap lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
                ctx.moveTo(x + ovH, 0); ctx.lineTo(x + ovH, canvas.height);
                ctx.stroke();
            }
        }

        // Vertical Overlaps
        if (ovV > 0 && rows > 1) {
            for (let r = 1; r < rows; r++) {
                const y = r * (dH - ovV);
                ctx.fillRect(0, y, canvas.width, ovV);

                // Overlap lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.beginPath();
                ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
                ctx.moveTo(0, y + ovV); ctx.lineTo(canvas.width, y + ovV);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    function drawRulers(w, h) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const majorStep = 100;
        const mediumStep = 50;
        const minorStep = 10;
        const tickLengthMajor = 15;
        const tickLengthMedium = 10;
        const tickLengthMinor = 5;

        // Top Ruler (X-Axis)
        // Background for readability
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, w, 20);

        ctx.beginPath();
        for (let x = 0; x <= w; x += minorStep) {
            let len = tickLengthMinor;
            if (x % majorStep === 0) len = tickLengthMajor;
            else if (x % mediumStep === 0) len = tickLengthMedium;

            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, len);

            if (x % majorStep === 0 && x > 0) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(x, x, tickLengthMajor + 2);
            }
        }
        ctx.stroke();

        // Left Ruler (Y-Axis)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, 25, h); // slightly wider for text
        ctx.beginPath();

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        for (let y = 0; y <= h; y += minorStep) {
            let len = tickLengthMinor;
            if (y % majorStep === 0) len = tickLengthMajor;
            else if (y % mediumStep === 0) len = tickLengthMedium;

            ctx.moveTo(0, y + 0.5);
            ctx.lineTo(len, y + 0.5);

            if (y % majorStep === 0 && y > 0) {
                ctx.fillStyle = '#FFFFFF';
                // Rotate text for vertical ruler or keeps it standard? Standard is better readability usually
                // but let's rotate -90deg if we want to save space? No, simple horizontal text is safer.
                ctx.fillText(y, tickLengthMajor + 2, y);
            }
        }
        ctx.stroke();

        ctx.restore();
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

        // Circle (fill the display)
        const circleRadius = Math.min(w, h) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

        ctx.lineWidth = 1; // Reset
    }

    function drawStamps(w, h) {
        ctx.save();
        const fontSize = 120;
        ctx.font = `bold ${fontSize}px "Futura Now Headline", sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const spacingX = 1000;
        const spacingY = 350;

        for (let y = -spacingY; y < h + spacingY; y += spacingY) {
            for (let x = -spacingX; x < w + spacingX; x += spacingX) {
                ctx.save();
                // Stagger every other row
                const offsetX = (Math.floor(y / spacingY) % 2 === 0) ? 0 : spacingX / 2;

                ctx.translate(x + offsetX, y);
                // No rotation
                ctx.fillText("WATCHOUT", 0, 0);
                ctx.restore();
            }
        }
        ctx.restore();
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

    function drawInfoOverlay(w, h, type, cols, rows, dW, dH) {
        const padding = 20;
        const fontSize = Math.max(16, Math.floor(h / 40));

        ctx.font = `${fontSize}px "Inter", sans-serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

        // Measure text
        const displayInfo = cols > 1 || rows > 1 ? ` | ${cols}x${rows} Displays (${dW}x${dH})` : '';
        const text = `${w} x ${h}${displayInfo} | ${type.replace('-', ' ').toUpperCase()} | ${new Date().toLocaleTimeString()}`;
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
        link.download = `test-pattern-grid-${canvas.width}x${canvas.height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });


    function getPatternSettings() {
        return {
            width: widthInput.value,
            height: heightInput.value,
            cols: displayColsInput.value,
            rows: displayRowsInput.value,
            overlapH: overlapHInput.value,
            overlapV: overlapVInput.value,
            borders: showBordersCheckbox.checked,
            ruler: showRulerCheckbox.checked,
            majorSize: gridMajorSizeInput.value,
            subdivisions: gridSubdivisionsInput.value,
            majorColor: gridMajorColorInput.value,
            minorColor: gridMinorColorInput.value,
            showStamps: showStampsCheckbox.checked,
            showInfo: showInfoCheckbox.checked,
            customLabel: document.getElementById('custom-label').value
        };
    }

    function setPatternSettings(s) {
        widthInput.value = s.width;
        heightInput.value = s.height;
        displayColsInput.value = s.cols;
        displayRowsInput.value = s.rows;
        overlapHInput.value = s.overlapH;
        overlapVInput.value = s.overlapV;
        showBordersCheckbox.checked = s.borders;
        showRulerCheckbox.checked = s.ruler;
        gridMajorSizeInput.value = s.majorSize;
        gridSubdivisionsInput.value = s.subdivisions;
        gridMajorColorInput.value = s.majorColor;
        gridMinorColorInput.value = s.minorColor;
        showStampsCheckbox.checked = s.showStamps;
        showInfoCheckbox.checked = s.showInfo;
        document.getElementById('custom-label').value = s.customLabel;
        drawPattern();
    }

    // LED Pattern Logic
    const ledCanvas = document.getElementById('led-canvas');
    const ledCtx = ledCanvas.getContext('2d');
    const generateLedBtn = document.getElementById('generate-led-btn');
    const downloadLedBtn = document.getElementById('download-led-btn');

    downloadLedBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `led-pattern-grid-${ledCanvas.width}x${ledCanvas.height}.png`;
        link.href = ledCanvas.toDataURL('image/png');
        link.click();
    });

    function getLedSettings() {
        return {
            wallW: document.getElementById('led-wall-width').value,
            wallH: document.getElementById('led-wall-height').value,
            tileW: document.getElementById('led-tile-width').value,
            tileH: document.getElementById('led-tile-height').value,
            rainbow: document.getElementById('led-rainbow').checked,
            background: document.getElementById('led-background').checked,
            borders: document.getElementById('led-borders').checked,
            numbering: document.getElementById('led-numbering').value,
            coords: document.getElementById('led-coords').value,
            color: document.getElementById('led-color').value
        };
    }

    function setLedSettings(s) {
        document.getElementById('led-wall-width').value = s.wallW;
        document.getElementById('led-wall-height').value = s.wallH;
        document.getElementById('led-tile-width').value = s.tileW;
        document.getElementById('led-tile-height').value = s.tileH;
        document.getElementById('led-rainbow').checked = s.rainbow;
        document.getElementById('led-background').checked = s.background;
        document.getElementById('led-borders').checked = s.borders;
        document.getElementById('led-numbering').value = s.numbering || 'row-col';
        document.getElementById('led-coords').value = s.coords || 'center';
        document.getElementById('led-color').value = s.color;
        drawLedPattern();
    }

    function toLetters(num) {
        let s = '';
        while (num > 0) {
            let rem = (num - 1) % 26;
            s = String.fromCharCode(65 + rem) + s;
            num = Math.floor((num - 1) / 26);
        }
        return s;
    }

    function drawLedPattern() {
        const w = parseInt(document.getElementById('led-wall-width').value) || 1920;
        const h = parseInt(document.getElementById('led-wall-height').value) || 1080;
        const tW = parseInt(document.getElementById('led-tile-width').value) || 128;
        const tH = parseInt(document.getElementById('led-tile-height').value) || 128;
        const useRainbow = document.getElementById('led-rainbow').checked;
        const useBackground = document.getElementById('led-background').checked;
        const useBorders = document.getElementById('led-borders').checked;
        const baseColor = document.getElementById('led-color').value;

        ledCanvas.width = w;
        ledCanvas.height = h;

        ledCtx.fillStyle = '#000000';
        ledCtx.fillRect(0, 0, w, h);

        const cols = Math.floor(w / tW);
        const rows = Math.floor(h / tH);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * tW;
                const y = r * tH;

                let color = baseColor;
                if (useRainbow) {
                    // Two-axis rainbow (diagonal)
                    const hue = ((x / w) + (y / h)) * 180;
                    color = `hsl(${hue}, 100%, 50%)`;
                }

                if (useBackground) {
                    // Fill Background
                    ledCtx.fillStyle = color;
                    ledCtx.fillRect(x, y, tW, tH);

                    // Border (Black for separation)
                    if (useBorders) {
                        ledCtx.strokeStyle = '#000000';
                        ledCtx.lineWidth = 1;
                        ledCtx.strokeRect(x + 0.5, y + 0.5, tW - 1, tH - 1);
                    }

                    // Text (White with black outline for visibility)
                    ledCtx.fillStyle = '#FFFFFF';
                    ledCtx.strokeStyle = '#000000';
                    ledCtx.lineWidth = 3;
                } else {
                    // Outline Only
                    if (useBorders) {
                        ledCtx.strokeStyle = color;
                        ledCtx.lineWidth = 1;
                        ledCtx.strokeRect(x + 0.5, y + 0.5, tW - 1, tH - 1);
                    }

                    ledCtx.fillStyle = color;
                    // No text stroke needed
                    ledCtx.strokeStyle = 'rgba(0,0,0,0)';
                }

                // Determine Text Content
                let mainText = '';
                const numbering = document.getElementById('led-numbering').value;
                if (numbering === 'row-col') mainText = `${r + 1}-${c + 1}`;
                else if (numbering === 'a-1') mainText = `${toLetters(r + 1)}-${c + 1}`;
                else if (numbering === '1-a') mainText = `${r + 1}-${toLetters(c + 1)}`;
                else if (numbering === 'a-a') mainText = `${toLetters(r + 1)}-${toLetters(c + 1)}`;
                else if (numbering === 'global-h') mainText = `${r * cols + c + 1}`;
                else if (numbering === 'global-v') mainText = `${c * rows + r + 1}`;

                // Draw Main Text (Always Center)
                const cx = x + tW / 2;
                const cy = y + tH / 2;

                if (mainText) {
                    ledCtx.font = `${Math.min(tW, tH) / 4}px Inter, sans-serif`;
                    ledCtx.textAlign = 'center';
                    ledCtx.textBaseline = 'middle';

                    if (useBackground) ledCtx.strokeText(mainText, cx, cy);
                    ledCtx.fillText(mainText, cx, cy);
                }

                // Draw Coordinates
                const coordsMode = document.getElementById('led-coords').value;
                if (coordsMode !== 'none') {
                    let displayX = x;
                    let displayY = y;

                    if (coordsMode === 'bl') {
                        // Bottom-Left origin (Y grows Up)
                        // Canvas Y is from top, so h - (y + tH) gives bottom-left corner Y in BL system
                        displayY = h - (y + tH);
                    } else if (coordsMode === 'center') {
                        // Center origin (0,0 at center, Y grows Up)
                        displayX = x - w / 2;
                        displayY = h / 2 - (y + tH); // Y from center, inverted for Y-up
                    }

                    const coordText = `X:${Math.round(displayX)} Y:${Math.round(displayY)}`;
                    ledCtx.font = `${Math.min(tW, tH) / 8}px Inter, sans-serif`;
                    ledCtx.textAlign = 'center';
                    ledCtx.textBaseline = 'middle';

                    const textY = mainText ? cy + tH / 4 : cy; // Push down if main text exists

                    if (useBackground) ledCtx.strokeText(coordText, cx, textY);
                    ledCtx.fillText(coordText, cx, textY);
                }
            }
        }

        // Draw hatched remainder
        // Offset slightly to avoid overlapping the border of the last full tile?
        // If we draw rectangles at x,y with size tW,tH, they consume [x, x+tW).
        // The hatched area starts at fullW.
        // However, strokeRect with x+0.5 is centered on pixel boundary? No, strokeRect is centered on path.
        // If lineWidth is 1, it draws from -0.5 to +0.5 around the path.
        // Our tiles end at fullW. The last tile's right edge is at fullW.
        // If we draw hatched area from fullW, it should be fine.
        // But maybe let's add gap? Or just ensure z-order?
        // We draw tiles first. Then hatched area.
        // So hatched area will draw over any border spill?
        // Let's create a 1px gap between tiles and hatched area to be safe.

        const fullW = cols * tW;
        const fullH = rows * tH;

        // Shift start position by 1 pixel to avoid overdrawing the last tile's border
        if (fullW < w) drawHatchedArea(fullW, 0, w - fullW, h);
        if (fullH < h) drawHatchedArea(0, fullH, fullW, h - fullH);
    }

    function drawHatchedArea(x, y, w, h) {
        if (w <= 0 || h <= 0) return;
        ledCtx.save();
        ledCtx.beginPath();
        ledCtx.rect(x, y, w, h);
        ledCtx.clip();

        // Background
        ledCtx.fillStyle = '#111111';
        ledCtx.fillRect(x, y, w, h);

        // Diagonal Lines
        ledCtx.strokeStyle = '#444444';
        ledCtx.lineWidth = 1;
        ledCtx.beginPath();

        const spacing = 15;
        const startX = x - h;
        const endX = x + w;

        for (let i = startX; i < endX; i += spacing) {
            ledCtx.moveTo(i, y);
            ledCtx.lineTo(i + h, y + h);
        }
        ledCtx.stroke();
        ledCtx.restore();
    }

    generateLedBtn.addEventListener('click', drawLedPattern);
    document.getElementById('led-rainbow').addEventListener('change', drawLedPattern);
    document.getElementById('led-background').addEventListener('change', drawLedPattern);
    document.getElementById('led-borders').addEventListener('change', drawLedPattern);
    document.getElementById('led-numbering').addEventListener('change', drawLedPattern);
    document.getElementById('led-coords').addEventListener('change', drawLedPattern);
    document.getElementById('led-color').addEventListener('input', drawLedPattern);

    // Initial draws
    document.fonts.ready.then(() => {
        drawPattern();
        drawLedPattern();
    });
});
