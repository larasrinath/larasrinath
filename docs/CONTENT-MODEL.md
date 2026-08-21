# Content model

The site is a multi-page blogdown/Hugo site with one project-owned presentation system. Templates are responsible only for structure, loops, conditions, and presentation. Visible interface copy belongs in YAML data or page front matter; long-form page content belongs in the Markdown body.

## Where content lives

- `data/home.yaml` - homepage navigation, hero, marquee, about, experience, and contact content.
- `data/ui.yaml` - the shared site footer, accessibility labels, article controls, taxonomy labels, and other reusable interface copy.
- `content/blog/<slug>/index.md` - one blog post per page bundle. YAML front matter controls title, date, summary, tags, featured media, and optional display overrides; the Markdown body is the article.
- `content/project/<slug>/index.md` - one project per page bundle. YAML front matter controls listing cards, homepage selection, featured media, tags, links, and optional display overrides; the Markdown body is the case study.
- Section files such as `content/blog/_index.md` and `content/project/_index.md` - listing-page headings, descriptions, labels, and pagination copy.

Collection page sizes are controlled by `pagination.page_size` in each section file. Pagination labels and the taxonomy archive page size live in `data/ui.yaml`; every paginated collection renders through the shared pagination partial.

Every section landing page renders its header through `layouts/partials/shared/page-hero.html`. Page front matter supplies the eyebrow, title, optional emphasis, and supporting sentence. The partial always renders the same eyebrow, headline, and summary structure; page-specific controls such as résumé actions live below the shared hero.

## Adding a blog post

```sh
hugo new content blog/my-new-post/index.md
```

Edit the generated YAML and Markdown, add any bundle images beside `index.md`, and change `draft` to `false` when ready. The blog index and homepage writing preview update automatically.

## Adding a project

```sh
hugo new content project/my-new-project/index.md
```

Edit the generated YAML and Markdown. Set `featured_home: true` to include it on the homepage and use `featured_weight` to control its position. The project index updates automatically for every published project.

When `featured_image` is set, the default project layout promotes it to the full-width case-study hero. If the Markdown body begins with that same image, the leading duplicate is removed from the body while the hero remains visible.

## Special scenarios

Use a front-matter `layout` override only when a page genuinely needs a one-off presentation. The default blog and project layouts should handle normal new entries without template or stylesheet edits.
