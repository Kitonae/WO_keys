---
title: "LTC Bridge"
---


## LTC Bridge

<!-- STUB: This article should cover the LTC (Linear Time Code) Bridge service, which synchronizes WATCHOUT playback to an external timecode source. -->

### Content to include

- **What the LTC Bridge is** — a standalone service that decodes Linear Time Code from an audio input and makes it available for timeline synchronization in WATCHOUT.
- **Enabling the LTC Bridge** — how to enable/disable the LTC Bridge service on a node from the Network window.
- **Configuration dialog** — the LTC Bridge dialog:
  - **Audio device selection** — which audio input device to listen on.
  - **Channel** — the specific audio input channel carrying the LTC signal.
  - **Volume** — input level/gain for the LTC decoder.
  - **Director target** — which Director receives the timecode.
- **Timecode as a variable** — how the decoded timecode value is exposed as a variable that can drive timeline triggers and expressions.
- **Use cases** — synchronizing WATCHOUT playback with external audio/video playback systems, broadcast workflows, multi-system synchronization using SMPTE timecode.
- **Troubleshooting** — common issues such as incorrect channel selection, low signal level, and format mismatches.
