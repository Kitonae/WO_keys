---
title: "Conditional Cues"
---


## Conditional Cues

<!-- STUB: This article should cover the conditional render and conditional trigger system, which allows cues to be shown or activated only when a specified condition is met. -->

### Content to include

- **What conditional cues are** — explain that any media cue can have a condition attached that controls whether it renders (Conditional Render) and any control/output cue can have a condition controlling whether it triggers (Conditional Trigger).
- **Setting a condition** — how to add a condition to a cue via the cue properties panel. The "Conditional Render" or "Conditional Trigger" section (the label adapts based on cue type, or shows "Conditional Render/Trigger" for mixed selections).
- **Condition expression** — the expression field that evaluates against show variables and inputs. Explain the expression syntax and how it resolves to a boolean.
- **Condition value** — the numeric threshold value that the expression is compared against.
- **Runtime behavior** — how the condition is evaluated continuously during playback: a media cue whose condition is false will not render, and a control/output cue whose condition is false will not fire.
- **Interaction with variables** — conditions typically reference variables controlled by external inputs (OSC, MIDI, ArtNet, HTTP API), enabling interactive shows where content appears based on external triggers.
- **Use cases** — show branching based on audience interaction, hiding/showing content based on time-of-day variables, enabling emergency messaging via external control.
