---
title: "Asset Properties"
author: Karol
editor: Jacquie
quality-check: JME
---


## Asset Properties

Each asset has properties that control how it behaves in your show. Access properties by selecting an asset and viewing the Properties panel, or double-click to open the Asset Properties dialog.

### General Properties

| Property | Description |
| --- | --- |
| Name | Display name in the Assets window |
| Source Path | Location of the original file |
| Duration | Length for video/audio assets |
| Dimensions | Width × Height in pixels |
| Frame Rate | Playback speed for video/sequences |

### Video Properties

| Property | Description |
| --- | --- |
| Codec | Video compression format |
| Bit Depth | Color depth (8-bit, 10-bit, etc.) |
| Alpha Channel | Transparency support |
| In Point | Start trim point |
| Out Point | End trim point |
| Loop Mode | None, Loop, or Ping-Pong |

### Audio Properties

| Property | Description |
| --- | --- |
| Sample Rate | 44.1kHz, 48kHz, 96kHz, etc. |
| Bit Depth | 16-bit, 24-bit, 32-bit float |
| Channels | Mono, Stereo, 5.1, 7.1, etc. |
| Volume | Default playback level |

### Optimization Status

- **Pending** (gray) – Not yet optimized

- **Optimizing** (yellow) – Currently being processed

- **Ready** (green) – Optimized and ready for playback

- **Error** (red) – Optimization failed

- **Modified** (orange) – Source file has changed, needs re-optimization

### Actions

- **Re-optimize** – Regenerate optimized version

- **Reveal in Explorer** – Open source file location

- **Find Cues** – Locate all timeline cues using this asset

- **Replace Asset** – Swap with a different file
