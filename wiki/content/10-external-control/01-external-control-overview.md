---
title: "External Control Overview"
---


## External Control Overview

<!-- STUB: This article should provide a high-level overview of WATCHOUT's external control architecture and how the different protocols relate to each other. -->

### Content to include

- **Control architecture** — explain the overall input flow: external signals arrive at the Operative (or directly at the Director for some protocols), are converted into variable/input updates, and are then forwarded to the Director which distributes values to Runners for rendering.
- **Variables as the bridge** — explain that all external control ultimately maps to WATCHOUT variables (defined in the show). Variables feed into tween expressions, conditional cues, and timeline triggers.
- **Supported protocols** — list all supported protocols with a brief description of each:
  - **ArtNet** — DMX-over-IP for lighting console integration.
  - **OSC** — Open Sound Control for flexible show control.
  - **HTTP REST API** — programmatic control via HTTP requests.
  - **MIDI** — musical instrument / controller integration via the MIDI Bridge.
  - **LTC** — Linear Time Code for external timecode synchronization via the LTC Bridge.
  - **PosiStageNet (PSN)** — position tracking protocol.
  - **MIDI Show Control (MSC)** — industry-standard show control messaging.
  - **WATCHOUT 6 Protocol** — backward-compatible TCP control protocol.
- **Protocol enable/disable** — how to enable or disable individual protocols from the Network window (ArtNet, OSC, PSN, Web UI, WO7/WO6 protocol toggles).
- **Input interpolation** — briefly explain the 50ms default interpolation that smooths all external input values for glitch-free rendering, and that the HTTP v1 API allows custom interpolation durations.
- **Choosing a protocol** — guidance on which protocol to use for different scenarios (lighting desk → ArtNet, show controller → OSC or HTTP, timecode → LTC, tracking → PSN).
