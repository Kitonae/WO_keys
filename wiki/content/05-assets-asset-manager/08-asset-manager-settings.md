---
title: "Asset Manager Settings"
---

## Asset Manager Settings

Configure the Asset Manager behavior through the Settings dialog.

### Accessing Settings

Go to **Edit → Preferences → Asset Manager** or access from the Assets window menu.

### General Settings

| Setting | Description |
| --- | --- |
| Cache Location | Where optimized assets are stored |
| Max Cache Size | Limit on disk space for optimized files |
| Auto-Optimize | Automatically optimize new imports |
| Parallel Optimize | Number of simultaneous optimization jobs |

### Optimization Defaults

| Setting | Description |
| --- | --- |
| Target Codec | Default codec for optimized video (HAP recommended) |
| Quality Level | Balance between quality and file size |
| Max Resolution | Cap on output resolution |
| Frame Rate | Target frame rate for optimization |

### Network Settings

| Setting | Description |
| --- | --- |
| Web UI Port | HTTP port for web interface (default: 3040) |
| Transfer Port | Port for asset distribution |
| Bandwidth Limit | Maximum network speed for transfers |

### Watch Folder Settings

- Add, remove, and configure watched directories

- Set default import behavior

- Enable/disable watching per folder

### Advanced Settings

- **GPU Acceleration** – Use graphics card for encoding/decoding

- **Hardware Encoder** – Select specific GPU for optimization

- **Thread Count** – CPU threads for software encoding

- **Memory Limit** – Maximum RAM for optimization processes

### Maintenance

- **Clear Cache** – Remove all optimized files (will re-optimize on demand)

- **Rebuild Database** – Fix corruption in asset database

- **Verify Assets** – Check all source files exist and are valid

- **Export Asset List** – Generate report of all show assets
