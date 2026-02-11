---
title: "Insert and Delete Time"
---


## Insert and Delete Time

<!-- STUB: This article should cover the Insert/Delete Time feature, which shifts cues and tween points in bulk by inserting or removing a time range on a timeline. -->

### Content to include

- **What Insert/Delete Time does** — explain that this operation shifts all cues after a given point forward (insert) or backward (delete) by a specified time amount, effectively adding or removing a gap in the timeline.
- **Accessing the dialog** — how to open the Insert/Delete Time dialog from the Timeline menu.
- **Parameters**:
  - **Time** — the amount of time to insert (positive value) or delete (negative value). Uses the show's time expression format.
  - **Adjust Duration of Cues** — whether cues that span the insertion/deletion point should have their durations adjusted.
  - **Adjust Position of Tween Points** — whether tween keyframe positions within affected cues should shift proportionally.
- **Behavior details** — explain how the operation affects cues at the insertion point, cues after the insertion point, and cues that straddle the boundary.
- **Use cases** — adding time for a new section mid-show, removing dead time, shifting content to accommodate a schedule change.
- **Caution** — recommend previewing the affected region after the operation, as cue overlaps or gaps may need manual adjustment.
