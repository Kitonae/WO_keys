# Interactive Widget Concepts for WATCHOUT Wiki

Small, self-contained `<canvas>`/`<div>` + inline `<script>` widgets embedded directly in the markdown content files. The build pipeline passes raw HTML through to the browser unchanged.

---

## 1. Color Gamut Comparison Diagram

**File:** `content/04-displays-and-outputs/10-hdr-and-color-management.md`
**Insert after:** "Color Spaces" section (line ~14)

Interactive CIE 1931 chromaticity diagram (the classic horseshoe shape) with toggle-able gamut triangles:

- **sRGB / Rec. 709** — identical primaries, shown as a single triangle
- **Rec. 601** — slightly different triangle, mostly overlapping with 709
- **Rec. 2020** — much larger triangle covering wide gamut

Users click checkboxes to show/hide each gamut. Hovering a triangle highlights it and shows the primary coordinates. The visible spectrum locus is drawn as the background.

**Why:** The section lists eight color spaces with text descriptions of gamut size, but without a visual reference there's no intuition for *how much* larger Rec. 2020 actually is.

**Complexity:** Medium — requires pre-computed CIE locus boundary points and a 2D canvas.

---

## 2. Transfer Function Curves

**File:** `content/04-displays-and-outputs/10-hdr-and-color-management.md`
**Insert after:** "Transfer Functions" section (line ~27)

Interactive line chart plotting four curves on the same axes:

- **X axis:** normalized input code value (0.0–1.0)
- **Y axis:** output luminance (nits), log scale for PQ/HLG visibility
- **Curves:** sRGB, Gamma 2.2, PQ (ST 2084), HLG

Each curve has a checkbox toggle. On hover/drag, a vertical crosshair shows the exact input→output value for each visible curve.

**Why:** The text explains that PQ maps to absolute luminance up to 10,000 nits while HLG is relative to 1,000 nits — a chart makes the dramatic difference between these curves immediately obvious.

**Complexity:** Medium — math for each curve is well-documented (PQ is the most involved formula).

---

## 3. Bit Depth Banding Demo

**File:** `content/04-displays-and-outputs/10-hdr-and-color-management.md`
**Insert after:** "Display Color Depth" section (line ~38)

A horizontal gradient strip (dark-to-light) rendered at selectable bit depths:

- Dropdown or radio buttons: **8 bpc**, **10 bpc**, **12 bpc**
- The gradient is quantized to the selected depth so banding steps become visible
- A "zoom" slider magnifies a portion of the dark end where banding is most visible

**Why:** The section states that higher bit depth "reduces banding artifacts, especially for HDR content" — showing it is far more convincing than describing it.

**Complexity:** Low — a single `<canvas>` drawing a quantized gradient.

---

## 4. SDR White Point on HDR Scale

**File:** `content/04-displays-and-outputs/10-hdr-and-color-management.md`
**Insert after:** "SDR White Point (Per-Cue)" section (line ~49)

A horizontal luminance bar (0–10,000 nits, log scale) with:

- A draggable marker for the SDR white point (range 80–500 nits)
- Labels showing "SDR black" at 0 and "SDR white" at the marker position
- The HDR headroom above the marker visually highlighted
- Preset buttons for 100 nits (broadcast) and 203 nits (reference)

**Why:** The concept of "where does SDR white land in the HDR range" is spatial — a slider on a luminance bar communicates it instantly.

**Complexity:** Low — a styled `<div>` bar with a draggable handle and labels.

---

## 5. Blend Mode Calculator

**File:** `content/07-effects-and-tweens/12-blend-modes.md`
**Insert after:** blend mode list (line ~23)

Two overlapping color swatches (top layer / bottom layer), each with a color picker. A dropdown selects the blend mode. The result swatch updates live.

- Shows the per-channel formula next to the result (e.g. `Add: R = min(1, 0.2 + 0.8) = 1.0`)
- All seven modes supported: Normal, Add, Multiply, Screen, Lighten, Darken, Linear Burn
- Optionally: a small checkerboard under the result to visualize alpha

**Why:** Blend modes are mathematical — seeing the formula *and* the color result together builds real understanding. "Multiply always darkens" becomes obvious when you watch the numbers.

**Complexity:** Low–Medium — straightforward per-channel math, standard color picker inputs.

---

## 6. Chroma Key Tolerance Visualizer

**File:** `content/07-effects-and-tweens/14-chroma-key.md`
**Insert after:** "Tolerance" section (line ~42)

A color wheel (or HS plane from HSV) with:

- The target chroma key color shown as a dot
- An inner circle (Min tolerance) — everything inside is fully transparent
- An outer circle (Max tolerance) — the ring between inner and outer is the partial-transparency falloff zone
- Two sliders for Min and Max that resize the circles in real time
- A small sample strip showing a green-screen-like gradient going from "fully keyed" → "partially keyed" → "fully opaque"

**Why:** The tolerance model (inner/outer boundary with falloff) is inherently geometric. The text describes "color distance" abstractly — a visual radius on a color wheel makes it concrete.

**Complexity:** Medium — needs a color wheel rendering and distance-based shading.

---

## 7. Linear Wipe Playground

**File:** `content/07-effects-and-tweens/11-linear-wipe.md`
**Insert after:** wipe tween channels description (line ~19)

A small canvas showing a sample image (or color gradient) with four sliders:

- **Angle** (−180° to 180°)
- **Location** (0–100%)
- **Feather** (0–50%)
- **Completion** (0–100%)

The canvas renders the wipe effect in real time as sliders move. The wipe edge is drawn as a line with a feathered alpha region.

**Why:** Four interacting parameters are hard to understand from text alone. Dragging sliders and seeing the result builds muscle memory for the UI in WATCHOUT itself.

**Complexity:** Low–Medium — line-based alpha mask on a canvas.

---

## Implementation Notes

### Embedding approach

Widgets are embedded as raw HTML blocks in the markdown files. The build script (`scripts/build-content.js`) preserves HTML and does not strip `<script>` tags from content (only from description extraction). Each widget should be a self-contained block:

```html
<div class="interactive-widget" id="widget-name">
  <canvas id="widget-name-canvas" width="600" height="300"></canvas>
  <div class="widget-controls">
    <!-- sliders, checkboxes, dropdowns -->
  </div>
</div>
<script>
(function() {
  // Self-executing, no global pollution
  const canvas = document.getElementById('widget-name-canvas');
  // ...
})();
</script>
```

### Styling

Add a shared `.interactive-widget` class to `styles.css` for consistent padding, border, border-radius, and dark/light theme support. Individual widget styles should be inline or scoped.

### Prioritized build order

| Priority | Widget | Effort | Impact |
|----------|--------|--------|--------|
| 1 | Gamut Comparison Diagram | Medium | High — most visually striking, core concept |
| 2 | Bit Depth Banding Demo | Low | High — very simple, very convincing |
| 3 | Blend Mode Calculator | Low–Med | High — useful for daily work |
| 4 | Transfer Function Curves | Medium | Medium — important but more niche |
| 5 | SDR White Point Slider | Low | Medium — small but clarifying |
| 6 | Chroma Key Tolerance | Medium | Medium — geometric concept |
| 7 | Linear Wipe Playground | Low–Med | Lower — parameters are more intuitive |
