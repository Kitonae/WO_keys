# WATCHOUT Wiki Content System

This wiki uses a markdown-based content system. Documentation is written in Markdown files and converted to the JavaScript data files used by the web application.

## Directory Structure

```
wiki/
├── content/                 # Markdown source files
│   ├── 01-getting-started/
│   │   ├── _index.md        # Chapter overview
│   │   ├── 01-welcome.md    # Section files
│   │   ├── 02-system-requirements.md
│   │   └── ...
│   ├── 02-the-interface/
│   │   └── ...
│   └── ...
├── scripts/
│   ├── build-content.js     # Converts MD → JS
│   └── extract-to-markdown.js # One-time migration
├── content-data.js          # Generated (DO NOT EDIT)
├── toc-data.js              # Generated (DO NOT EDIT)
├── index.html               # Wiki application
├── styles.css               # Styles
└── app.js                   # Application logic
```

## Editing Content

### 1. Edit Markdown Files

All documentation content lives in the `/content` directory. Each chapter has its own folder with numbered markdown files for each section.

**File naming:**
- Folders: `01-chapter-name/`
- Index: `_index.md` (chapter overview and metadata)
- Sections: `01-section-name.md`

### 2. Frontmatter

Each markdown file should have YAML frontmatter:

```markdown
---
title: "Section Title"
---

# Section Title

Content goes here...
```

For chapter index files (`_index.md`):

```markdown
---
title: "Chapter Title"
icon: "🚀"
---

Chapter overview content...
```

### 3. Build the Content

After editing, run the build script:

```bash
npm run build
# or
node scripts/build-content.js
```

This regenerates `content-data.js` and `toc-data.js`.

### 4. Preview

Open `index.html` in a browser to preview your changes.

## Markdown Syntax

### Standard Markdown

- `# Heading 1` through `#### Heading 4`
- `**bold**` and `*italic*`
- `` `inline code` ``
- `- Unordered lists`
- `1. Ordered lists`

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Cell 1 | Cell 2 | Cell 3 |
```

### Callout Boxes

Info boxes (blue):
```markdown
:::info
**Note:** Important information here.
:::
```

Warning boxes (amber):
```markdown
:::warning
**Warning:** Caution message here.
:::
```

### Code Blocks

````markdown
```javascript
const example = 'code';
```
````

## Adding a New Section

1. Create a new `.md` file in the appropriate chapter folder
2. Use the next number prefix (e.g., `07-new-section.md`)
3. Add frontmatter with the title
4. Write your content
5. Run `npm run build`

## Adding a New Chapter

1. Create a new folder with number prefix (e.g., `12-new-chapter/`)
2. Create `_index.md` with chapter metadata and overview
3. Add section `.md` files
4. Run `npm run build`

## Available Icons

Use these icon names in chapter `_index.md` files (Lucide-style SVG icons):

| Icon Name | Used For |
| --- | --- |
| `book` | Getting Started |
| `layout` | Interface |
| `fileText` | Shows/Files |
| `monitor` | Displays |
| `film` | Assets |
| `clock` | Timeline |
| `sliders` | Effects |
| `play` | Playback |
| `globe` | Network |
| `keyboard` | Keyboard Shortcuts |
| `alertCircle` | Troubleshooting |
| `settings` | Settings |
| `link` | Links/References |

Example `_index.md`:
```markdown
---
title: "Getting Started"
icon: "book"
---
```
