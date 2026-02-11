---
title: "Stacking Order"
---


## Stacking Order

<!-- STUB: This article should explain how WATCHOUT determines the visual stacking (z-order) of cues and timelines when multiple elements overlap on displays. -->

### Content to include

- **Per-cue stacking** — explain the two stacking modes available on media cues:
  - **By Z** — cues stack based on their Z position value (depth in 3D space).
  - **By Layer** — cues stack based on their layer order within the timeline, regardless of Z position.
- **Per-timeline stacking order** — the timeline-level stacking property:
  - **Timeline Order** — timelines render in the order they appear in the Timelines panel.
  - **Always on Top** — a timeline with this setting renders above all other timelines regardless of its position in the list.
- **Layer order within timelines** — how the vertical position of layers in the Timeline window determines rendering priority (top layers render on top of bottom layers).
- **Cross-timeline stacking** — how content from different timelines composites together, especially when multiple timelines contribute content to the same display region.
- **Practical implications** — how stacking order affects blend modes, transparency, and visual layering in complex multi-timeline shows.
