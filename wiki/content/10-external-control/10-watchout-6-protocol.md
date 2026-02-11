---
title: "WATCHOUT 6 Protocol"
---


## WATCHOUT 6 Protocol

<!-- STUB: This article should cover the WATCHOUT 6 backward-compatible TCP control protocol supported by WATCHOUT 7. -->

### Content to include

- **What the WO6 protocol is** — WATCHOUT 7 includes a backward-compatible TCP control interface that accepts commands in the WATCHOUT 6 protocol format. This enables existing integrations and control systems written for WATCHOUT 6 to work with WATCHOUT 7 without modification.
- **Enabling WO6 protocol** — how to enable/disable the WATCHOUT 6 protocol from the Network window toggle (labeled "WATCHOUT 6 protocol").
- **Supported commands** — describe which WATCHOUT 6 commands are supported in the compatibility layer (timeline control, input setting, etc.) and any commands that are not supported or behave differently.
- **Connection details** — the TCP port and connection model (persistent TCP connection, text-based command/response).
- **Migration path** — guidance for users transitioning from WATCHOUT 6: when the WO6 protocol is sufficient vs. when to migrate to the native WATCHOUT 7 HTTP API or OSC for better feature coverage.
- **Use cases** — maintaining compatibility with existing Crestron/AMX/Extron control system programming, legacy show control integrations.
