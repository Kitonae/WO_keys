---
title: "MIDI Bridge"
---


## MIDI Bridge

<!-- STUB: This article should cover the MIDI Bridge service, which translates MIDI controller input into WATCHOUT variable values. -->

### Content to include

- **What the MIDI Bridge is** — a standalone service that receives MIDI Control Change messages from connected MIDI devices and forwards them as variable updates to the Director.
- **Enabling the MIDI Bridge** — how to enable/disable the MIDI Bridge service on a node from the Network window.
- **Configuration dialog** — the MIDI Bridge dialog accessible from the network panel:
  - **Director target** — which Director the MIDI Bridge sends values to.
  - **Normalize values** — toggle for normalizing MIDI CC values (0–127) to a 0.0–1.0 range.
- **MIDI mapping** — how MIDI CC numbers map to WATCHOUT variable external keys, and how to configure this mapping.
- **Supported messages** — which MIDI message types are handled (Control Change). Note which types are not supported.
- **Interpolation** — MIDI inputs receive the default 50ms interpolation from the Director fallback.
- **Use cases** — fader-based manual control of opacity/position, button-triggered scene changes, DJ controller integration.
- **Hardware requirements** — the node running the MIDI Bridge must have MIDI input hardware or a virtual MIDI driver.
