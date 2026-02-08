---
title: "Creating a New Show"
---

## Creating a New Show

Creating a new show sets up the timeline, stage, and routing model for your project. In WATCHOUT 7, a show can be local (on your Producer workstation) or connected to a Director node on the network.

### Ways to Start a New Show

Use any of the following:

- **Welcome Screen** → **New Show**
- **File → New**

If you already have unsaved edits, WATCHOUT prompts you to save, discard, or cancel before creating the new show.

### What Gets Created

A new show starts with:

- An empty **Stage**
- At least one **Timeline**
- Default show-level settings (frame rate, timing, and routing defaults)
- No displays, cues, or imported assets

### Choose a Good Storage Location

Store your show in a predictable project folder structure, for example:

- `Shows/ClientName/EventName/`
- `Shows/ClientName/EventName/Assets/`
- `Shows/ClientName/EventName/Exports/`

This keeps asset paths and backups organized, especially when multiple operators collaborate.

:::tip
**Tip:** Create the folder structure before you begin cue programming. It avoids later relinking work.
:::

### Director-Aware Behavior

When you create a show while connected to network nodes, WATCHOUT validates Director state. If the target Director is already running a different show, you will get a warning before overriding it.

### Recommended First Steps

After creating the show:

1. Set your **Show Properties**.
2. Add displays or projectors on the Stage.
3. Connect to the intended Director/Asset Manager.
4. Import a small test asset and verify playback.
