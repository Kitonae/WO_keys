---
title: "Feedback Reports"
---


## Feedback Reports

<!-- STUB: This article should cover the Feedback Report feature for collecting diagnostic logs and system information for troubleshooting. -->

### Content to include

- **What feedback reports are** — explain that a feedback report bundles logs from the Director and connected nodes into a downloadable archive for submission to Dataton support or internal analysis.
- **Creating a report** — how to open the Create Feedback Report dialog from the Help menu or Welcome screen:
  - **Director selection** — choose which Director to fetch logs from (including localhost).
  - **Start time** — the beginning of the time window to collect (must be within the last 2 weeks and not in the future).
  - **Duration** — how many hours of logs to include (0.1–720 hours).
  - **Include show file** — option to attach the current show file to the report.
- **Output** — where the report is saved and what it contains (logs, system information, optionally the show file).
- **Size and data limits** — the maximum report size warning (with file size in MB), the maximum log line limit, and the "no data" warning when the selected time range has no logs.
- **When to create a report** — after experiencing crashes, unexpected behavior, performance issues, or when requested by Dataton support.
- **Loki log server** — brief mention that WATCHOUT uses a Loki-based logging service for centralized log collection, and that the feedback report pulls from this service. Note the error messages if Loki fails to start or stops unexpectedly.
