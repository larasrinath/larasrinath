# Local development

This is a Hugo portfolio with a fully project-owned presentation layer. The site does not load an external Hugo theme at runtime; its layouts, assets, content model, and interface data live in this repository.

## Architecture

- Shared Hugo templates render the homepage, section pages, résumé, articles, projects, taxonomies, and error pages.
- Navigation, profile details, résumé content, experience, and interface labels are stored in YAML data files.
- Blog and project bundles normally store visible metadata and structured body blocks in YAML front matter, then render them through shared templates.
- Hugo processes the visual system, progressive enhancements, local fonts, and responsive images at build time.
- Netlify builds and deploys the generated `public/` directory.

## Requirements

- Hugo Extended 0.165.0

The Hugo version is pinned in the shared `[build.environment]` block in `netlify.toml` for Netlify.

## Run locally

```sh
hugo server
```

Open [http://127.0.0.1:1313/](http://127.0.0.1:1313/). Include draft content when needed with `hugo server --buildDrafts`.

## Validate a production build

```sh
hugo --gc --cleanDestinationDir --minify --printPathWarnings --panicOnWarning
```

This command treats Hugo deprecations and other warnings as failures, removes stale generated files, and writes the production site to `public/`.

The generated `public/` and `resources/` directories are ignored by Git. Do not commit them.

## Project structure

- `assets/css/lara-theme.css` - the complete project-owned visual system.
- `assets/js/custom.js` - progressive enhancements, including the mobile navigation.
- `assets/img/` - global source images processed by Hugo.
- `data/home.yaml` - shared navigation, homepage identity, portrait, and social links.
- `data/experience.yaml` - experience and capability data shared by the About and Résumé pages.
- `data/resume.yaml` - résumé summary, highlights, skills, selected work, certifications, and education.
- `data/ui.yaml` - reusable interface labels, footer copy, accessibility text, taxonomy labels, and pagination copy.
- `content/` - page bundles and section front matter. Blog and project bodies are normally stored as structured YAML blocks.
- `layouts/` - all active Hugo templates, partials, render hooks, and shortcodes.
- `static/` - byte-for-byte files such as fonts, the favicon, and downloadable files.
- `archetypes/` - YAML-first templates used by `hugo new content`.
- `config.toml` - Hugo configuration, taxonomies, image cache, and site metadata.
- `netlify.toml` - Netlify build commands and the Hugo version pin.

See `docs/CONTENT-MODEL.md` for the authoring model and instructions for adding projects or articles.

See `docs/SITE-DESIGN-SYSTEM.md` for the broader design language, template architecture, spacing and responsive rules, maintenance guardrails, and lessons from the site rebuild.

## Netlify deployment

Netlify publishes `public/`. Production builds use the canonical Netlify site URL, while deploy previews and branch deploys override Hugo's base URL with the URL for that deployment. The deploy-preview command also includes future-dated content so scheduled work can be reviewed before publication.

No Node build step is required. Hugo processes the CSS, JavaScript, fonts, and responsive images directly.

## Version upgrades

Before changing the Hugo version, install the candidate Extended release locally and run the production validation command above. Then update `HUGO_VERSION` in the shared Netlify build environment.
