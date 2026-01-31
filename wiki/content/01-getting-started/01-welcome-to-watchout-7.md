---
title: "Welcome to WATCHOUT 7"
---

## Welcome to WATCHOUT 7

**WATCHOUT 7** is the latest evolution of Dataton's award-winning multi-display production and playback system. Designed for show creators, live event professionals, and system integrators, WATCHOUT allows you to orchestrate massive scale visuals across unlimited displays, projectors, and LED walls—all from a single timeline.

Whether you are creating a digital signage installation, a projection mapping spectacle, a live concert background, or a corporate presentation, WATCHOUT gives you the power to compose, manage, and play back high-resolution media with frame-accurate synchronization.

:::info
**New in WATCHOUT 7:** This version introduces a completely new high-performance video engine, support for **HDR** (High Dynamic Range), a modernized user interface with dark mode, and enhanced support for asset management and collaborative workflows.
:::

### The Core Concept: One Giant Canvas

If you are new to multi-display systems, the easiest way to understand WATCHOUT is to think of it as **one giant digital canvas**.

Imagine you have a video wall made of 10 different screens. In traditional systems, you might have to create 10 separate video files and try to press "Play" on 10 different players at the exact same time. That is difficult and error-prone.

**WATCHOUT changes this.**

With WATCHOUT, you don't worry about individual screens. You simply place your media on a **Virtual Stage**—a single, continuous workspace that represents your entire display area. You can drag a video across all 10 screens, or have an image float from the first screen to the last.

Behind the scenes, WATCHOUT does the heavy lifting:

1.  **The Producer (Your Desk):** This is where you sit. You use the Producer software to design your show, arrange media on a Timeline, and animate content. It feels like editing in standard video software.
2.  **The Display Computers (The Players):** These are the workhorses connected to the actual projectors or LED walls.
3.  **The "Magic":** When you run your show, WATCHOUT automatically **slices up your content** in real-time. It sends the correct "puzzle piece" of your video to each Display Computer. All computers play their piece in perfect synchronization, so the audience sees one seamless, massive image.

**In short:** You design on one big canvas; WATCHOUT handles the complexities of splitting it up for your hardware.

### System Architecture

Technically, WATCHOUT uses a distributed client-server architecture designed for reliability and scalability.

1.  **Production Computer:**
    *   Runs the *Producer* software.
    *   Holds the master "Show File" (.watch).
    *   Does NOT perform the final heavy rendering.
    *   Sends control commands (Play, Pause, Jump) and distributes media files.

2.  **Display Computer(s):**
    *   Run the *Display* software (Watchpoint.exe).
    *   Perform the heavy lifting: decoding video, real-time compositing, and rendering to outputs.
    *   Store a local cached copy of all media files needed for the show.
    *   Can run "headless" (without monitor/keyboard) in installation racks.

3.  **The Network:**
    *   Connects Producer and Display computers via standard Ethernet (TCP/IP).
    *   **UDP Protocol:** Used for frame-accurate synchronization.
    *   **TCP Protocol:** Used for media transfer and system commands.

### What You Can Create

WATCHOUT is a blank canvas limited only by your hardware and imagination. Common applications include:

-   **Wide-screen Projection:** Blending multiple projectors to create massive panoramic screens.
-   **Projection Mapping:** Wrapping video content around complex 3D physical objects or buildings.
-   **LED Video Walls:** Driving custom resolution LED processors with pixel-perfect accuracy.
-   **Digital Signage:** Synchronized playback across multiple separate monitors in a venue.
-   **Live Broadcasts:** Providing dynamic backdrops and lower-thirds for broadcast or streaming.
-   **Interactive Museums:** Triggering content based on external inputs (sensors, buttons, network commands).