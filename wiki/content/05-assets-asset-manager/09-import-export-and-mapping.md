---
title: "Import, Export, and Mapping"
author: Karol
editor: Jacquie
quality-check: JME
---


## Import, Export, and Mapping

Beyond normal drag-and-drop ingest, the Assets window includes transfer workflows for moving asset sets between systems and controlling optimization behavior.

### Export Workflows

From the Assets context menu, use:

- **Export All Assets...**
- **Export Selected Assets...**

Both open a destination dialog and validate the target path before export.

Use export when you need to:

- Hand over media to another system
- Archive a show media package
- Prepare a controlled import on another production machine

### Import Workflows

Use **Import Assets...** to import an exported asset package.

Key options:

- **Import path** on the current Asset Manager host
- **Merge Assets** toggle

`Merge Assets` can be much faster than copy-based import, but it is intended for specific cases:

- Source and target must be on the same disk/volume
- The export package should be treated as a one-time merge source

### Optimizer Mapping

Use **Mapping...** from the Assets context menu to manage optimizer mapping.

This workflow lets you map source format groups ("in") to optimization targets ("out"), then save the mapping for future optimization jobs.

Supported operations in the mapping dialog:

- Override individual mappings
- Restore a row to default
- Reset all non-default mappings
- Store the updated mapping

### Practical Workflow

1. Export before major cleanup or migration.
2. Import on the target system and verify optimization status.
3. Apply mapping changes only when there is a clear format/performance goal.
4. Use **Find Cues** on critical assets before delete/replace operations.
