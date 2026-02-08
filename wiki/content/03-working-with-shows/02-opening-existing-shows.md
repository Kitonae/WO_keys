---
title: "Opening Existing Shows"
---

## Opening Existing Shows

WATCHOUT supports opening shows from disk and attaching to shows currently managed by a Director.

### Open from Disk

Use:

- **File → Open...**
- `Ctrl+O`
- **File → Open Recent**

The open dialog filters for WATCHOUT show files (for example `*.watch`).

### Open from Director

Use **File → Open Show from Director** (or the Welcome screen connect action) when the show is already running on a network Director node.

This is useful for:

- Taking over programming on an existing production system
- Verifying a show state before live playback
- Fast handoff between operators

### Unsaved Changes Protection

If your current show has unsaved changes, WATCHOUT displays a prompt before opening another show. You can:

- Save current changes
- Continue without saving
- Cancel and stay on the current show

### Director Override Warnings

If the selected Director is already running a different show, WATCHOUT warns you before replacing it. Treat this as a high-risk action in live environments.

:::warning
**Live systems:** Confirm with your team before overriding a Director during rehearsal or show time.
:::

### Best Practices

- Prefer **Open Recent** for fast recovery when restarting Producer.
- Verify **Director** and **Asset Manager** connection status after loading.
- Check timeline duration, display routing, and missing assets before going online.
