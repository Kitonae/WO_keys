---
title: "Variables and Inputs"
---


## Variables and Inputs

<!-- STUB: This article should provide a detailed reference for the WATCHOUT variable/input system from the external control perspective, covering how external values map to show variables. -->

### Content to include

- **Variables window** — how to manage show variables: adding, removing, editing live values with sliders, and saving current values as defaults.
- **Variable properties** — name, external key, min/max/default value, and interpolation mode (None, Linear, Circular).
- **External keys** — the mapping between protocol-specific identifiers and WATCHOUT variable names. Explain the "Learn" mode for capturing external key assignments.
- **Input flow** — how an incoming external signal (e.g., an OSC message) is matched to a variable by its external key, the value is clamped to min/max, interpolated, and then made available to expressions and tween bindings.
- **Interpolation modes** — explain the three interpolation types:
  - **None** — value jumps immediately.
  - **Linear** — value transitions linearly over the interpolation period.
  - **Circular** — value wraps around for cyclic parameters (e.g., hue, angle).
- **Default values** — saving current values as defaults, and when default values are applied (show load, variable reset).
- **Cross-reference** — link to the Variable Cues article (Chapter 06) for timeline-based variable automation, and to individual protocol articles for protocol-specific key mapping.
