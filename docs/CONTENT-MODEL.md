# Content model

The site is a multi-page blogdown/Hugo site with one project-owned presentation system. Templates are responsible only for structure, loops, conditions, and presentation. Visible interface copy and long-form page content belong in YAML data or page front matter and render through shared templates; Markdown-body rendering is retained only for explicitly deferred special cases.

## Where content lives

- `data/home.yaml` - homepage navigation, hero, marquee, about, experience, and contact content.
- `data/ui.yaml` - the shared site footer, accessibility labels, article controls, taxonomy labels, and other reusable interface copy.
- `content/blog/<slug>/index.md` - one blog post per page bundle. YAML front matter controls title, date, summary, tags, featured media, the optional article rail, and structured editorial body blocks. Legacy posts can still use the Markdown body.
- `content/project/<slug>/index.md` - one project per page bundle. YAML front matter controls the short detail-page `hero_summary`, longer listing-card `featured_summary`, homepage selection, featured media, tags, links, optional display overrides, and the structured `project_body` case study.
- Section files such as `content/blog/_index.md` and `content/project/_index.md` - listing-page headings, descriptions, labels, and pagination copy.

Collection page sizes are controlled by `pagination.page_size` in each section file. Pagination labels and the taxonomy archive page size live in `data/ui.yaml`; every paginated collection renders through the shared pagination partial.

Every section landing page renders its header through `layouts/partials/shared/page-hero.html`. Page front matter supplies the eyebrow, title, optional emphasis, and supporting sentence. The partial always renders the same eyebrow, headline, and summary structure; page-specific controls such as résumé actions live below the shared hero.

Blog and project detail pages keep their editorial hero and share the reduced `--page-content-start-detail-space` token through `.app-detail-body`; this avoids presentational spacer markup. Their body ending uses the same shared page-tail spacing token as every other page; when an adjacent-entry panel is present, that panel remains the final page section.

## Adding a blog post

```sh
hugo new content blog/my-new-post/index.md
```

Edit the generated YAML, add any bundle images beside `index.md`, and change `draft` to `false` when ready. The blog index updates automatically.

New posts start with this structured YAML model automatically. The shared `layouts/partials/article/body.html` renderer supports `opening`, `paragraph`, `heading`, `image`, `quote`, `list`, and `signoff` blocks. Image blocks accept `src`, `alt`, and `caption`; quote blocks accept `style` (`feature`, `chant`, or `standard`), `text` or `lines`, and `cite`. Paragraph and signoff blocks may also use `lines` when deliberate line breaks matter. Lists are unordered by default; set `ordered: true` for numbered lists. Use `article_note` for the sticky rail and `reading_time` when the article body is stored in YAML. If `article_body` is absent, the blog template renders the Markdown body unchanged for existing content.

Blog heroes are always text-only. Store the featured asset once at the page-bundle root (normally `featured.jpg` or `featured.png`) and use that same path for `featured_image` and the first populated `image` block. `featured_image` supplies the page and social metadata. The shared article renderer moves the first image directly after the opening lead and gives only that image the theme backplate. Later image blocks remain in their authored positions and render as plain secondary media. Leave the image block's `src` empty when an article has no featured image.

## Adding a project

```sh
hugo new content project/my-new-project/index.md
```

Edit the generated YAML. Set `featured_home: true` to include it on the homepage and use `featured_weight` to control its position. The project index updates automatically for every published project.

Normal Project pages use `project_body` and the same shared block renderer as Blog articles. In addition to text, headings, images, quotes, lists, and signoffs, Project bodies may use `callout`, `equations`, `code`, and supported `chart` blocks. Store the featured asset once at the page-bundle root and use that same relative path for cards, metadata, and the first `image` block. Project heroes stay text-only. The renderer makes that first image the sole featured image directly after the opening lead; later images and interactive charts remain plain secondary media without a backplate. The legacy Markdown fallback remains only for explicitly deferred special cases.

Keep page-specific media inside its page bundle. Put global images that Hugo should optimize, such as the homepage/sharing portrait, in `assets/img`; reserve `static/img` for files served byte-for-byte, such as the favicon. Do not duplicate Project featured images in either location.

## Special scenarios

Use a front-matter `layout` override only when a page genuinely needs a one-off presentation. The default blog and project layouts should handle normal new entries without template or stylesheet edits.
