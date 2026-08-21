# Local development

This is a Hugo and blogdown portfolio using a fully project-owned presentation layer. The site does not load an external Hugo theme at runtime; layouts, assets, and interface data live in this repository.

## Requirements

- Hugo Extended 0.165.0
- R and blogdown 1.24 or newer only when editing or rebuilding `.Rmd` sources

The Hugo version is pinned consistently in `.Rprofile` and `netlify.toml`.

## Run locally

```sh
hugo server
```

Open [http://localhost:1313/](http://localhost:1313/). Draft content can be included with `hugo server --buildDrafts`.

## Validate a production build

```sh
hugo --gc --cleanDestinationDir --minify --printPathWarnings --panicOnWarning
```

This command treats Hugo deprecations and other warnings as failures and removes stale files from the generated `public/` directory.

## Project structure

- `assets/css/lara-theme.css` - the complete project-owned visual system.
- `assets/js/custom.js` - small progressive enhancements.
- `data/home.yaml` - homepage copy, navigation, work, experience, and contact data.
- `data/ui.yaml` - reusable interface labels and accessibility copy.
- `content/` - Markdown and R Markdown page bundles.
- `layouts/` - all active Hugo templates, partials, and shortcodes.
- `static/` - fonts, images, PDFs, and generated R Markdown dependencies.
- `config.toml` - current Hugo configuration.
- `netlify.toml` - deployment build configuration and Hugo version pin.

See `docs/CONTENT-MODEL.md` for the authoring model and instructions for adding projects or articles.

## Version upgrades

Before changing the Hugo pin, install the candidate Extended release locally and run the production validation command above. Keep the versions in `.Rprofile` and every Netlify context synchronized.
