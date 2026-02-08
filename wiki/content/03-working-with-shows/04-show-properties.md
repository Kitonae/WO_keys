---
title: "Show Properties"
---

## Show Properties

Show Properties define global behavior for your project. Configure them early, then revisit before technical rehearsals.

### Typical Show-Level Settings

Depending on context, Show Properties include:

- **Timing / frame-rate related settings**
- **Network host bindings** (Director and Asset Manager context)
- **Asset update behavior**
- **Synchronization options** for distributed playback

### When to Adjust Show Properties

Update these settings when you:

- Move the show to a different venue network
- Change playback node topology
- Switch timing strategy for rehearsal vs live mode
- Prepare a handoff to another operator

### Practical Validation Checklist

Before going online, confirm:

1. Director host is correct for this venue/system.
2. Asset Manager host is reachable.
3. Timing/sync settings match your production policy.
4. Displays, timelines, and cues still target expected devices.

### Keep Properties Stable During Show Operation

Avoid changing global properties during live playback unless required for recovery. Prefer making changes in rehearsal and validating with a full run-through.

:::warning
Global property changes can affect every timeline and output path in the show.
:::
