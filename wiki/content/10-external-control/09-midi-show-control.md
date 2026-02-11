---
title: "MIDI Show Control"
---


## MIDI Show Control

<!-- STUB: This article should cover MIDI Show Control (MSC) support for receiving industry-standard show control commands. -->

### Content to include

- **What MSC is** — MIDI Show Control is a standard (part of the MIDI specification) for controlling show equipment using a defined set of commands. It is widely used in theatrical, theme park, and live event environments.
- **Supported MSC commands** — list the supported commands:
  - **GO** — trigger a cue or timeline action.
  - **STOP** — stop playback.
  - **GO OFF** — deactivate a cue.
  - **RESET** — reset to a default state.
- **MSC Device ID** — the per-device MSC Device ID setting in device properties, used to filter which MSC messages the device responds to.
- **Configuration** — where to set the MSC Device ID and how to ensure the WATCHOUT node listens for MSC messages.
- **Use cases** — integration with theatrical show control systems (e.g., Stage Research SFX, Medialon, Dataton PICKUP), automated cue triggering in multi-vendor environments.
