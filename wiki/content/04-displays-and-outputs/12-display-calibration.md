---
title: "Display Calibration"
---


## Display Calibration

<!-- STUB: This article should cover the display calibration workflow, including camera-based calibration via NDI and the projector calibration system for 3D mapping. -->

### Content to include

- **Display calibration mode** — explain the per-display calibration mode setting and what it enables.
- **NDI calibration stream** — how to configure an NDI stream as a calibration input for camera-based alignment, and the relationship between the calibration stream setting and the calibration workflow.
- **Projector calibration (3D mapping)** — the calibration workflow for 3D projectors: virtual points vs. reality points, the requirement for at least six virtual points, continuous vs. manual calibration, calibration accuracy indicator, and the "Reposition" action.
- **EDID capture** — how to capture and save a display's EDID data as an asset for reference or troubleshooting. Explain the requirement for the display to be enabled.
- **Calibration triggers** — the external calibration trigger mechanism that can be activated via the HTTP API (the `displaycalibration` input).
- **Best practices** — recommended order of operations: physical alignment → coarse warp → calibration → fine adjustment → mask → content verification.
