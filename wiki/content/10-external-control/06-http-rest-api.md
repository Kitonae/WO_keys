---
title: "HTTP REST API"
---


## HTTP REST API

<!-- STUB: This article should cover the HTTP REST API endpoints for programmatic control of WATCHOUT from external systems. -->

### Content to include

- **API overview** — WATCHOUT exposes HTTP endpoints on the Operative for external control. Describe the base URL structure and port.
- **v0 Inputs endpoint** — the legacy `POST /v0/inputs` endpoint:
  - Request format: JSON array of `{"key": "...", "value": ...}` objects.
  - No interpolation duration (uses the default 50ms fallback).
  - Example curl command.
- **v1 Inputs endpoint** — the newer `POST /v1/inputs` endpoint:
  - Request format: JSON array of `{"key": "...", "value": ..., "duration": ...}` objects.
  - Optional `duration` field (in milliseconds) for custom interpolation time.
  - Falls back to 50ms if duration is omitted.
  - Example curl commands for both custom and default duration.
- **Hit test endpoint** — the endpoint for querying which cues are at a given position (for interactive applications).
- **Countdown and events endpoints** — SSE (Server-Sent Events) streams for receiving real-time show state, cue visibility changes, and countdown information.
- **API documentation** — mention the built-in RapiDoc documentation page for exploring the API interactively.
- **Authentication** — whether the API requires authentication (it does not by default).
- **Use cases** — integration with web-based control panels, custom automation scripts, interactive installations, and third-party show control systems.
