# Aobzii-Blog

Aobzii's personal Hexo blog for notes, daily fragments, plans, API resources, and longer ramblings.

## Project Structure

```text
Blog-Main/                 Hexo source project
  source/                  Pages, posts, and daily entries
  themes/minima/           Customized Minima theme
  package.json             Scripts and dependencies
  package-lock.json        Locked npm dependency tree
images/                    Image assets used by published posts
README.md                  Project notes
```

The repository is maintained as a source project. Generated files such as `public/`, `db.json`, and `node_modules/` are ignored.

## Features

- Hexo 7 static blog with posts, pages, archives, tags, and daily cards.
- Customized Minima theme using EJS, CSS, and vanilla JavaScript.
- Light and dark mode with local preference persistence.
- Home page with profile image, short site description, and recent posts.
- Archive page with time and tag views plus client-side search.
- Daily page for short, card-style entries outside the main post list.
- Article pages with tags, publish date, estimated reading time, and word count.
- Markdown enhancements for code blocks, task lists, tables, blockquotes, images, MathJax, and Mermaid diagrams.
- Responsive layout for desktop and mobile reading.

## Usage

Install dependencies from the Hexo source directory:

```bash
cd Blog-Main
npm install
```

Start a local preview server:

```bash
npm run server
```

Generate the static site:

```bash
npm run build
```

Clean generated output:

```bash
npm run clean
```

Run a clean verification build:

```bash
npm run verify
```

## Writing

Create posts in `Blog-Main/source/_posts/` with Hexo front matter:

```markdown
---
title: Example Post
date: 2026-04-25
tag:
  - notes
---

Post content here.
```

Create daily entries in `Blog-Main/source/daily/`. The daily index page collects files under that directory except `index.md`.

Images used by posts can be stored in the root `images/` directory and referenced through the repository CDN path when needed.

## Theme Notes

The active theme is `Blog-Main/themes/minima`. Important files:

- `layout/layout.ejs`: base HTML, SEO metadata, scripts, and styles.
- `layout/index.ejs`: home page.
- `layout/post.ejs`: article layout.
- `layout/archive.ejs`: archive and tag grouping.
- `layout/daily.ejs`: daily card page.
- `source/css/custom.css`: custom visual system and responsive rules.
- `source/js/theme-config.js`: shared theme selectors, events, and attribute keys.
- `source/js/theme-toggle.js`: dark mode state and toggle behavior.
- `source/js/archive-search.js`: archive filtering interaction.
- `source/js/mermaid-init.js`: Mermaid detection and rendering.
- `source/js/site-init.js`: page transition, image optimization, and MathJax bootstrapping.

The visual style uses LXGW WenKai Lite as the site font and keeps code blocks on system monospace fonts.

## Frontend Script Architecture

The theme JavaScript now follows a small shared configuration pattern:

- `theme-config.js` defines reusable selectors, custom event names, and shared data attribute names.
- Feature scripts read from that shared config instead of hardcoding the same DOM contracts repeatedly.
- `site-init.js` remains the runtime entry for page enhancement and emits the `op:page-ready` event after client-side page swaps.
- `theme-toggle.js`, `archive-search.js`, and `mermaid-init.js` subscribe to the same lifecycle event so they can re-initialize after partial page navigation.

This keeps the current lightweight vanilla JavaScript approach, while reducing coupling caused by duplicated selectors and event names across multiple files.
