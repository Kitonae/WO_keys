---
title: "Blend Modes"
---


## Blend Modes

<!-- STUB: This article should cover the per-cue blend mode setting, which controls how a cue's pixels combine with the content beneath it. -->

### Content to include

- **What blend modes are** — explain that each media cue has a blend mode property that determines how its rendered pixels are composited with underlying layers and content.
- **Available blend modes** — describe each mode and its visual behavior:
  - **Normal** — standard alpha compositing (default).
  - **Add** (Additive) — pixel values are summed, creating a brightening effect. Useful for light effects, particles, and glow.
  - **Multiply** — pixel values are multiplied, darkening the result. Useful for shadows and texture overlays.
  - **Screen** — inverse of multiply; lightens the result. Good for glow and light leak effects.
  - **Lighten** — takes the brighter value from each pixel comparison.
  - **Darken** — takes the darker value from each pixel comparison.
  - **Linear Burn** — adds pixel values and subtracts white, producing a darker result than Multiply.
- **Setting the blend mode** — where to find the blend mode property in cue properties (under the Presentation page).
- **Interaction with stacking** — how blend modes are affected by layer order and timeline stacking.
- **Performance considerations** — whether certain blend modes have different GPU costs.
- **Common creative techniques** — practical examples of using blend modes for projection mapping, overlay graphics, and atmospheric effects.
