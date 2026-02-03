---
title: "Asset Types"
---

## Asset Types

WATCHOUT 7 supports a wide variety of media types, each with specific capabilities and use cases.

### Still Images

| Type | Formats | Notes |
| --- | --- | --- |
| Standard Images | JPEG, PNG, BMP, TGA, TIFF | Common image formats |
| High Dynamic Range | EXR, HDR | For HDR displays |
| Layered | PSD | Imported as flattened image |
| Vector | SVG | Rasterized at import |

### Video

| Type | Formats | Notes |
| --- | --- | --- |
| GPU-Accelerated | HAP, HAP Alpha, HAP Q | Best performance - recommended |
| Professional | ProRes 422/4444, DNxHR | High quality, decode only |
| Compressed | H.264, HEVC/H.265 | Smaller files, more CPU usage |
| Specialty | NotchLC | Real-time graphics from Notch |

### Image Sequences

Numbered image files treated as video frames. Supports JPEG, PNG, TGA, TIFF, and EXR sequences.

### Audio

| Format | Notes |
| --- | --- |
| WAV | Recommended - uncompressed, best quality |
| AIFF | Uncompressed audio |
| MP3 | Compressed audio |
| AAC, FLAC, OGG | Additional compressed formats |

### Live Sources

- **NDI** – Network Device Interface streams

- **Capture Cards** – BlackMagic, AJA, and other capture devices

- **Screen Capture** – Capture from desktop or specific windows

- **Web Browser** – Render web pages as live content

### Special Types

- **Composition** – Nested timeline as a reusable asset

- **Solid Color** – Color fills for backgrounds or overlays

- **Dynamic Text** – Text that can be updated at runtime
