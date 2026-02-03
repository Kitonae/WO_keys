---
title: "Firewall Configuration"
---

## Firewall Configuration

### Required Ports

| Port | Protocol | Purpose |
| --- | --- | --- |
| 3039 | TCP | Primary communication |
| 3040 | TCP | Asset transfer |
| 40400-40500 | UDP | Discovery and sync |

### Windows Firewall

WATCHOUT installer creates firewall rules automatically. For manual configuration, allow both inbound and outbound traffic on the ports above.
