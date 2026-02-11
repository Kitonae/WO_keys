---
title: "OSC Protocol"
---


## OSC Protocol

<!-- STUB: This article should cover OSC (Open Sound Control) input integration with WATCHOUT. -->

### Content to include

- **What OSC is** — brief explanation of Open Sound Control as a flexible, message-based protocol commonly used in media servers, show controllers, and creative applications.
- **Enabling OSC** — how to enable/disable the OSC protocol from the Network window toggle.
- **OSC input mapping** — how OSC addresses map to WATCHOUT variable external keys. Explain the address-to-key mapping convention.
- **Supported value types** — which OSC argument types are accepted (float, int, etc.) and how they are converted to WATCHOUT's numeric variable values.
- **Playback control via OSC** — OSC messages that can control timeline play state (play, pause, stop) in addition to variable values.
- **Port configuration** — the default OSC listening port and how to determine which port the Operative listens on.
- **Interpolation** — OSC inputs use the default 50ms interpolation window for smooth value transitions.
- **Testing OSC** — recommended tools for sending test OSC messages during development.
- **Use cases** — integration with QLab, TouchOSC, show control systems, and custom OSC senders.
