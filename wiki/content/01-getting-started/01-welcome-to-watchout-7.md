---
title: "Welcome to WATCHOUT 7"
---

## Welcome to WATCHOUT 7

**WATCHOUT 7** represents the latest evolution of Dataton's award-winning multi-display production and playback system. Created for show creators, live event professionals, and system integrators, WATCHOUT gives you the power to orchestrate massive scale visuals across unlimited displays, projectors, and LED walls, all from a single timeline.

Whether you're creating a digital signage installation, a projection mapping spectacle, a live concert background, or a corporate presentation, WATCHOUT provides the tools to compose, manage, and play back high-resolution media with frame-accurate synchronization.

:::info
**New in WATCHOUT 7:** This seventh version introduces a completely new high-performance video engine alongside support for **HDR** (High Dynamic Range). You'll also discover a modernized user interface with dark mode, plus enhanced support for asset management and collaborative workflows.
:::

### The Core Concept: One Giant Canvas

If you're new to multi-display systems, the easiest way to understand WATCHOUT is to think of it as **one giant digital canvas**.

Imagine you have a video wall made of ten different screens. In traditional systems, you'd need to create ten separate video files and try to press "Play" on ten different players at the exact same time. That approach is difficult and error-prone, requiring constant adjustment to keep everything aligned.

**WATCHOUT changes this entirely.**

With WATCHOUT, you don't worry about individual screens anymore. Instead, you place your media on a **Virtual Stage**—a single, continuous workspace that represents your entire display area. You can drag a video across all ten screens, or have an image float smoothly from the first screen to the last. The whole display becomes one unified creative space.

Behind the scenes, WATCHOUT handles the heavy lifting:

*   **The Producer (Your Desk):** At your desk, you work with the Producer software, where you design your show, arrange media on a Timeline, and animate content. It feels familiar, like editing in standard video software.
*   **The Display Computers (The Players):** Meanwhile, the Display Computers serve as the workhorses connected to the actual projectors or LED walls.
*   **The "Magic":** Here's where the magic happens: when you run your show, WATCHOUT automatically **slices up your content** in real-time. It sends the correct "puzzle piece" of your video to each Display Computer. All computers play their piece in perfect synchronization, so the audience sees one seamless, massive image.

In short, you design on **one big canvas** while WATCHOUT handles the complexities of splitting it up for your hardware.

### System Architecture

Technically, WATCHOUT uses a distributed client-server architecture designed for reliability and scalability.

1.  **Production Computer**
    Runs the *Producer* software and manages your project files. This is your creative workstation, where you utilize the new **Asset Manager** to organize content. It performs the control functions (Play, Pause, Update) and synchronizes assets across the network, but leaves the heavy rendering to the displays.

2.  **Display Computers**
    Run the *Display* software (formerly known as Watchpoint). These machines perform the heavy lifting by decoding video, handling real-time compositing, and rendering to outputs. Each Display Computer automatically synchronizes media from the Production computer and can run "headless" without a monitor or keyboard.

3.  **The Network**
    The network connects your Production and Display computers via standard Ethernet using TCP/IP.
    *   **UDP Protocol** ensures frame-accurate synchronization.
    *   **TCP Protocol** handles media transfer and system commands.
    
    This architecture means you can scale from a simple two-screen setup to hundreds of outputs without changing your workflow.

### What You Can Create

WATCHOUT is a blank canvas limited only by your hardware and imagination. You might use it to create:

*   **Wide-screen Projection:** Blending multiple projectors to form massive panoramic screens that wrap around audiences.
*   **Projection Mapping:** Allows you to wrap video content around complex 3D physical objects or entire buildings, transforming architecture into dynamic canvases.
*   **LED Video Walls:** Driving custom resolution LED processors with pixel-perfect accuracy.
*   **Digital Signage:** Installations benefit from synchronized playback across multiple separate monitors throughout a venue, ensuring your message stays coordinated.
*   **Live Broadcasts:** Gain dynamic backdrops and lower-thirds for broadcast or streaming applications.
*   **Interactive Museums:** Can trigger content based on external inputs from sensors, buttons, or network commands.

The system adapts to your creative vision, whether you're designing an intimate gallery experience or commanding the visual spectacle of a stadium concert.