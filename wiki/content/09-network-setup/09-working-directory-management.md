---
title: "Working Directory Management"
---


## Working Directory Management

<!-- STUB: This article should cover the per-node working directory configuration, which controls where WATCHOUT stores essential data including cached assets. -->

### Content to include

- **What the working directory is** — explain that each WATCHOUT node has a working directory where it stores cached assets, show data, and other runtime files. By default this is a system-managed location.
- **Changing the working directory** — how to change the path from node properties: the dialog, path entry, validation requirements (must be an existing directory on the target node), and the warnings about asset availability.
- **Resetting to default** — how to reset the working directory to the system default location.
- **Impact on assets** — when the working directory changes, all previously cached assets become unavailable and must be re-transferred.
- **Use cases** — moving data to a faster/larger drive, separating show data across storage volumes, and standardizing paths across fleet nodes.
- **Warnings** — the temporary loss of asset availability and error messages that occur during the transition.
