# WATCHOUT Wiki - Static Site

This documentation site is now a static HTML site. Content is generated from `content-data.js` and `toc-data.js` using a Node.js script.

## Structure
- `index.html`: The home page. Links to chapters.
- `[chapter-slug]/index.html`: Chapter overview pages.
- `[chapter-slug]/[section-slug].html`: Content pages.

## Editing Content
To update the content:
1. Edit `content-data.js` (text content) or `toc-data.js` (structure).
2. Run the generation script:
   ```bash
   node scripts/generate-static.js
   ```

## Development
- `styles.css`: Global styles.
- `app.js`: Client-side logic (theme toggle, mobile menu, sidebar navigation for Index page).
- `scripts/generate-static.js`: The build script.

## Notes
- The `index.html` file works slightly differently than sub-pages: it dynamically loads the sidebar using `app.js` and `toc-data.js`.
- Sub-pages have the sidebar statically embedded in their HTML.
