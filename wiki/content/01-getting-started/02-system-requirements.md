---
title: "System Requirements"
---

## System Requirements

WATCHOUT 7 requires a Windows-based computer with modern hardware to deliver optimal performance. The requirements differ between the Producer computer (where you edit shows) and Display computers (which render and output to projectors/screens).

### Producer vs. Display Computer Architecture

WATCHOUT uses a **client-server architecture** that separates show creation from show playback:

**Producer Computer** – This is your creative workstation where you design, edit, and control shows. The Producer software provides the timeline editor, stage view, and all creative tools. You only need *one* Producer computer per show, and it doesn't need to be connected to any physical outputs—it can preview everything internally. The Producer sends commands and media to Display computers over the network.

**Display Computer(s)** – These are dedicated playback machines that render content and drive physical outputs (projectors, LED walls, monitors). Each Display computer runs the WATCHOUT Display software and connects to your actual screens. A single Display computer can drive up to 4-8 outputs depending on the graphics card. For larger installations, you simply add more Display computers—WATCHOUT synchronizes them frame-accurately over the network.

:::info
**Tip:** You can run both Producer and Display on the same computer for small setups or previewing. For production environments, dedicated Display computers ensure reliable, uninterrupted playback.
:::

### Producer Computer (Editing)


| Component | Minimum | Recommended |
| --- | --- | --- |
| Operating System | Windows 10 21H2 (64-bit) | Windows 11 23H2 or newer (64-bit) |
| Processor | Intel Core i5 (8th Gen+) or AMD Ryzen 5 | Intel Core i7/i9 (12th Gen+) or AMD Ryzen 7/9 |
| RAM | 16 GB DDR4 | 32 GB DDR5 or more |
| Graphics | DirectX 12 compatible GPU with 4 GB VRAM | NVIDIA RTX 4000 series or AMD Radeon Pro |
| Storage | SSD with 100 GB free | NVMe SSD (Gen4) with 1 TB+ free |
| Network | Gigabit Ethernet | 10 Gigabit Ethernet |

### Display Computer (Playback)

| Component | Minimum | Recommended |
| --- | --- | --- |
| Operating System | Windows 10 21H2 (64-bit) | Windows 11 23H2 or newer (64-bit) |
| Processor | Intel Core i5 (8th Gen+) or AMD Ryzen 5 | Intel Core i7/i9 or AMD Ryzen 7/9 |
| RAM | 16 GB DDR4 | 32 GB DDR5 or more |
| Graphics | NVIDIA GeForce RTX or AMD equivalent | **NVIDIA Quadro RTX / RTX Ada Generation** |
| Storage | SATA SSD (500+ MB/s read) | NVMe SSD (Gen4, 3500+ MB/s read) |
| Network | Gigabit Ethernet | 10 Gigabit Ethernet |

#### Windows LTSC vs. Standard Editions

For display computers in permanent installations, consider using **Windows 10/11 IoT Enterprise LTSC** (Long-Term Servicing Channel) instead of standard Windows editions:

| Feature | Standard Windows | Windows LTSC |
| --- | --- | --- |
| Feature updates | Every 6-12 months | None (security only) |
| Support lifecycle | 18-24 months | 5-10 years |
| Bloatware/Store apps | Included | Removed |
| Cortana/Edge/Xbox | Included | Removed |
| Forced restarts | Can occur | Fully controllable |
| Update scheduling | Limited control | Complete control |

**Practical benefits of LTSC for display servers:**

- **No surprise updates** – Feature updates won't change system behavior or require reboots during shows
- **Minimal background processes** – No Cortana, Xbox Game Bar, or Store apps consuming resources
- **Predictable environment** – The OS stays exactly as you configured it for years
- **Extended support** – Security patches available for 5+ years without upgrading
- **Reduced attack surface** – Fewer pre-installed applications means fewer potential vulnerabilities

:::warning
**Licensing Note:** Windows IoT Enterprise LTSC requires volume licensing through Microsoft partners and is priced differently than retail Windows. It's designed for embedded and fixed-function devices like kiosks, digital signage, and display servers—making it ideal for WATCHOUT installations.
:::

:::info
**Note:** Display computers should be dedicated to WATCHOUT playback. Avoid running other applications during live shows to ensure consistent performance.

:::

### Windows Updates and Rendering Performance

Keeping Windows up to date is **critical for optimal WATCHOUT performance**. Newer Windows updates deliver significant improvements to rendering stability and visual output quality:

#### WDDM (Windows Display Driver Model) Improvements

Modern Windows versions include updated WDDM drivers that fundamentally improve how the operating system communicates with graphics hardware:

- **WDDM 3.0+ (Windows 11)** – Reduced latency for frame presentation, better VSync handling, and improved multi-monitor synchronization

- **Hardware-accelerated GPU scheduling** – Enables the GPU to directly manage its own video memory scheduling, reducing CPU overhead and eliminating stutter during complex compositions

- **Optimized flip model** – Modern swap chain presentation reduces tearing and improves frame pacing for smoother playback

#### DirectX 12 Ultimate Enhancements

Windows updates continuously improve DirectX 12 capabilities:

- **Enhanced memory management** – Better VRAM allocation reduces out-of-memory errors with large textures and high-resolution video

- **Improved shader compilation** – Faster loading times and reduced hitching during playback

- **Multi-adapter support** – Better handling of systems with multiple GPUs

#### Multi-Head Output Stability

For display servers driving multiple outputs, Windows updates are essential:

- **Improved EDID handling** – Better detection and configuration of connected displays, especially when using EDID emulators or matrix switches

- **Hotplug stability** – Reduced crashes and display resets when cables are connected or disconnected

- **Resolution persistence** – Display configurations survive reboots more reliably

- **Mosaic/Surround mode fixes** – Critical patches for multi-display spanning configurations

#### Security and Reliability

- **Kernel improvements** – Reduced system crashes and blue screens during extended operation

- **Memory leak fixes** – Essential for 24/7 installations where systems run for weeks without restart

- **Timer resolution updates** – More accurate timing for frame-perfect synchronization

:::warning
**Recommendation:** Always use the latest stable Windows version and cumulative updates. Test updates in a staging environment before deploying to production show computers.
:::

### NVIDIA Quadro RTX / RTX Ada Professional Graphics

While consumer GeForce cards can run WATCHOUT, **NVIDIA Quadro RTX and RTX Ada generation professional GPUs** are strongly recommended for display computers in production environments. Here's why:

#### Key Benefits of Quadro RTX

| Feature | Quadro RTX / RTX Pro | GeForce RTX |
| --- | --- | --- |
| ECC Memory | ✓ Error-correcting VRAM | ✗ Not available |
| TCC Mode | ✓ Compute-optimized mode | ✗ Windows display only |
| Sync Connector | ✓ Hardware genlock/framelock | ✗ Software sync only |
| Displays Supported | Up to 4-8 native outputs | Typically 4 outputs |
| 10-bit Color | ✓ Full support in all apps | Limited application support |
| Driver Certification | ✓ ISV certified, extended testing | Game-focused optimization |
| Long-term Support | ✓ Enterprise driver branches | Consumer update cycle |

#### ECC Memory – Preventing Visual Artifacts

Quadro RTX cards feature **Error-Correcting Code (ECC) memory** that automatically detects and corrects single-bit memory errors. This prevents:

- Random pixel corruption and visual artifacts during playback

- Frame buffer corruption during extended operation

- Unexplained crashes in mission-critical installations

For 24/7 installations like museums, permanent exhibits, or broadcast applications, ECC memory is essential for guaranteed visual integrity.

#### Quadro Sync and Framelock

For multi-projector installations requiring perfect synchronization:

- **Quadro Sync II cards** enable hardware-level genlock between multiple GPUs and external sync sources

- **Framelock** ensures all outputs across multiple cards/systems swap buffers simultaneously

- Critical for edge-blended panoramas and LED wall installations where frame tearing between panels is visible

#### Professional Driver Certification

Quadro drivers undergo extensive testing and certification:

- **Optimal Drivers for Enterprise (ODE)** – Stability-focused drivers with extended testing cycles

- **ISV certifications** – Guaranteed compatibility with professional applications

- **Longer support lifecycle** – Enterprise customers receive driver updates for extended periods

- **Better regression testing** – Less risk of updates breaking existing functionality

#### Recommended Quadro RTX Models

| Model | VRAM | Outputs | Best For |
| --- | --- | --- | --- |
| RTX A4000 | 16 GB | 4× DP 1.4 | Mid-range installations, 4K playback |
| RTX A5000 | 24 GB | 4× DP 1.4 | High-res content, multiple 4K outputs |
| RTX A6000 | 48 GB | 4× DP 1.4 | 8K content, demanding installations |
| RTX 4000 Ada | 20 GB | 4× DP 1.4a | Latest generation, AV1 decode |
| RTX 5000 Ada | 32 GB | 4× DP 1.4a | Premium performance, future-proof |

:::info
**Tip:** For installations requiring more than 4 outputs per machine, consider using multiple Quadro cards with Quadro Sync, or NVIDIA's NVLink bridge technology for unified memory access across GPUs.
:::

### Storage Recommendations

Video playback performance depends heavily on storage speed:

| Content Type | Minimum Read Speed | Recommended Storage |
| --- | --- | --- |
| Single 4K HAP video | 400 MB/s | SATA SSD |
| Multiple 4K videos | 1500 MB/s | NVMe Gen3 SSD |
| 8K content | 3000+ MB/s | NVMe Gen4 SSD |
| Image sequences | 5000+ MB/s | NVMe Gen4 or RAID array |

### Network Requirements

| Component | Minimum | Recommended |
| --- | --- | --- |
| Speed | 1 Gbps | 10 Gbps |
| Switch | Managed Gigabit switch | Enterprise-grade with IGMP snooping |
| Cabling | Cat6 | Cat6a or fiber optic |
| Topology | Star (all on same subnet) | Dedicated VLAN for WATCHOUT |

:::info
**What is IGMP Snooping?** Internet Group Management Protocol (IGMP) snooping is a switch feature that optimizes multicast traffic. Without it, multicast packets (used by WATCHOUT for synchronization and NDI video) flood all switch ports, wasting bandwidth. With IGMP snooping enabled, the switch intelligently forwards multicast traffic only to devices that need it—reducing network congestion and improving overall performance, especially in systems with multiple display servers or NDI sources.
:::

#### File Transfer Time Comparison

Network speed dramatically affects how quickly you can deploy media to display servers. The table below shows approximate transfer times for common file sizes:

| File Size | 1 Gbps (~110 MB/s) | 10 Gbps (~1.1 GB/s) | Time Saved |
| --- | --- | --- | --- |
| 1 GB | ~9 seconds | ~1 second | 8 seconds |
| 100 GB | ~15 minutes | ~90 seconds | 13.5 minutes |
| 1 TB | ~2.5 hours | ~15 minutes | 2+ hours |

:::info
**Note:** Actual transfer speeds depend on disk I/O, network congestion, and switch quality. The values above assume modern SSDs and a well-configured network with minimal overhead.
:::

For productions with large media libraries or frequent content updates, 10 Gbps networking pays for itself quickly in reduced setup and rehearsal time. Consider 10 GbE especially for:

- **4K/8K video content** – Single uncompressed 4K frames can exceed 30 MB
- **Image sequences** – Thousands of files that benefit from sustained throughput
- **Multi-server deployments** – Simultaneous transfers to multiple display computers
- **Live event environments** – Last-minute content changes require rapid deployment
