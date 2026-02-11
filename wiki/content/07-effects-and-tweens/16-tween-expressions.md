---
title: "Tween Expressions"
---


## Tween Expressions

<!-- STUB: This article should cover the expression system for tween properties, allowing tween values to be driven dynamically by variables and mathematical expressions rather than fixed keyframes. -->

### Content to include

- **What tween expressions are** — explain that any tween property (position, opacity, scale, color, etc.) can be driven by an expression instead of (or in addition to) static keyframe values. The expression is evaluated at runtime, making the tween value responsive to variables, inputs, or mathematical functions.
- **Setting an expression** — how to add an expression to a tween via the tween properties panel. The expression field for single-value tweens and the separate X/Y/Z expression fields for positional tweens.
- **Expression syntax** — describe the expression language: variable references, arithmetic operators, mathematical functions, and how the expression resolves to a numeric value.
- **Interaction with keyframes** — how expressions combine with or override keyframed values. Explain whether the expression adds to, multiplies, or replaces the keyframe value.
- **Variable references** — using show variables in expressions to create externally controllable animations (e.g., an OSC fader driving opacity, or an ArtNet channel driving position).
- **Practical examples** — position driven by a tracking system variable, opacity controlled by a MIDI fader, color cycling via a time-based expression.
- **Relationship to timeline expressions** — clarify the difference between tween expressions (per-tween value control) and timeline trigger expressions (play/pause/stop triggers on timelines), covered in the Timeline Triggers and Expressions article.
