---
title: "Display Masks"
---


## Display Masks

<!-- STUB: This article should cover per-display mask geometry — a system for controlling pixel visibility and edge shaping independently of warp geometry. -->

### Content to include

- **What display masks are** — masks define regions of a display where pixels are visible or hidden, using alpha-based geometry overlays. They are separate from warp geometry and applied after the warp stage.
- **Accessing the mask editor** — how to open the mask editor from the Stage context menu ("Edit Display Mask") or from device properties.
- **Mask surface layers** — explain that a display can have multiple mask surfaces, each with its own name, geometry, and gamma correction setting. Cover the surface list and how to add/remove/rename surfaces.
- **Mask types** — built-in mask creation options: Left Mask, Right Mask, Top Mask, Bottom Mask, Rectangular Mask, Round Mask. Each creates a predefined shape that can then be edited.
- **Editing mask points** — junction point positioning (X/Y), alpha value per point (transparent vs. opaque), bezier handles for curved edges, smooth junction toggle.
- **Mask images** — how to assign an image asset as a mask source and how to remove it.
- **Gamma correction** — the per-surface gamma correction parameter and when to use it for blending quality.
- **Common workflows** — masking spill in projection, shaping output for scenic elements, combining masks with edge blending for custom overlap regions.
- **Relationship to warp geometry** — clarify that masks and warp are independent systems applied in sequence, and when to use each.
