---
title: "Key and Fill"
---


## Key and Fill

<!-- STUB: This article should cover the layer-level Key & Fill compositing feature, which uses one layer's content to mask another layer. -->

### Content to include

- **What Key & Fill is** — explain that Key & Fill is a layer-level compositing operation where one layer (the key layer) provides a transparency mask that is applied to another layer (the fill layer). This enables advanced compositing without modifying the source media.
- **Keying modes** — describe the available modes:
  - **Alpha Key** — uses the alpha channel of the key layer to define transparency.
  - **Luma Key** — uses the luminance (brightness) of the key layer to define transparency.
  - **Alpha Key (Inverted)** — inverts the alpha mask.
  - **Luma Key (Inverted)** — inverts the luminance mask.
- **Configuring Key & Fill** — how to enable Key & Fill on a layer via the Layer Properties panel: enable the feature, select the keying layer, and choose the mode.
- **Invert toggle** — the invert option that flips the mask behavior.
- **Visualize Key** — the toggle to preview the generated mask for tuning.
- **Layer indicators** — the visual indicators in the Timeline window that show which layers are acting as key sources.
- **Use cases** — dynamic text reveals using animated mattes, shaped content windows, graphic overlays with custom transparency patterns, and creative transition effects.
- **Relationship to chroma key** — clarify that Key & Fill operates at the layer level using a separate source, while chroma key operates per-cue on the cue's own color content.
