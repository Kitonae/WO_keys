---
title: "Frame Blending"
---


## Frame Blending

<!-- STUB: This article should cover the per-cue Frame Blending option, which smooths playback when the source media frame rate differs from the show frame rate. -->

### Content to include

- **What frame blending is** — explain that Frame Blending interpolates between video frames when the media's native frame rate does not match the show's playback frame rate, producing smoother motion rather than repeated or dropped frames.
- **Enabling frame blending** — how to toggle the Frame Blending property on a media cue (under the Playback page in cue properties).
- **When to use it** — scenarios where frame blending improves quality: playing 24fps content in a 60fps show, slow-motion playback, or variable-speed tween playback.
- **When to avoid it** — cases where frame blending may produce undesirable ghosting or artifacts, such as text overlays, sharp-edged graphics, or content already matching the show frame rate.
- **Performance implications** — the additional GPU cost of blending two frames per output frame.
