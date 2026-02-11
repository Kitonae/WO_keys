---
title: "Time Synchronization"
---


## Time Synchronization

<!-- STUB: This article should cover how WATCHOUT synchronizes time across nodes using NTP and the WATCHOUT-managed vs user-managed sync modes. -->

### Content to include

- **Why time sync matters** — explain that frame-accurate multi-display playback requires all nodes to share a common time reference. Without proper sync, content on different nodes drifts apart.
- **NTP synchronization** — WATCHOUT uses NTP (Network Time Protocol) to synchronize clocks. Describe the NTP server configuration on nodes and the option to leave it blank to preserve the node's existing NTP settings.
- **Sync modes** — the two sync management approaches:
  - **WATCHOUT-managed** — WATCHOUT controls NTP configuration automatically.
  - **User-managed (Advanced)** — the operator manages NTP configuration externally. This mode includes a warning about potential sync issues.
- **Time server designation** — how to designate a specific node as the WATCHOUT time source. Explain the "Use as Time Server" option and the NTP diff display showing "N/A (is WATCHOUT time source)" for the designated server.
- **NTP status monitoring** — the NTP diff indicator on each node showing the time offset from the reference, and the automatic resync behavior when the offset exceeds a threshold.
- **Sync settings dialog** — the dialog for changing sync mode on nodes, including the restart warning.
- **Multiple Producer warning** — the warning when multiple Producer instances run on the same machine, which may affect time synchronization.
- **Troubleshooting sync issues** — common symptoms (frame offset between displays), diagnostic steps (check NTP diff in node info), and resolutions.
