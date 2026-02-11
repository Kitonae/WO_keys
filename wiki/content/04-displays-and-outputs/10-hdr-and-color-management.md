---
title: "HDR and Color Management"
---


## HDR and Color Management

<!-- STUB: This article should cover WATCHOUT's color management pipeline, including HDR output support and color space handling across the rendering chain. -->

### Content to include

- **Color spaces** — explain the supported color spaces: Rec. 709 and Rec. 2020, and when each applies.
- **Transfer functions** — describe the available electro-optical transfer functions: sRGB, SDR, PQ (Perceptual Quantizer for HDR10), and HLG (Hybrid Log-Gamma). Explain which display types and workflows require each.
- **Display color depth** — 8-bit vs. 10-bit output and how it relates to HDR capability.
- **SDR white point** — the per-cue SDR White Point property (range 80–10000 nits) that controls how SDR content maps into an HDR output pipeline.
- **Per-display color settings** — configuring color space and transfer function on individual display outputs.
- **NDI color space** — the separate NDI color space setting available on NDI display outputs.
- **Asset color space** — how asset metadata (detected or overridden) feeds into the rendering pipeline.
- **White point calibration** — the display-level white point setting for per-projector color temperature correction.
- **Practical workflow** — recommended approach for mixed SDR/HDR content on HDR-capable displays, and tips for consistent color across a multi-display setup.
