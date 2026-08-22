---
title: "Portfolio, Rebuilt as a System"
subtitle: "A YAML-driven Hugo portfolio built as a reusable design system"
hero_summary: "A personal portfolio rebuilt around shared Hugo templates, structured content, responsive editorial layouts and one centralized design system."
excerpt: "A portfolio treated as a publishing system"
featured_summary: "A personal portfolio rebuilt around shared Hugo templates, YAML-first content, responsive editorial layouts and one coherent visual language."
featured_home: false
featured_weight: 1
featured_image: featured.jpg
featured_image_alt: "Lara Srinath portfolio homepage with a portrait and editorial wordmark"
featured_image_fit: cover
featured_meta: "Hugo · Design System · YAML — 2026"
date: "2026-08-21"
author: "Lara Srinath"
draft: false
tags:
  - Hugo
  - Design System
  - YAML
  - Responsive Design
  - Performance
categories:
  - Projects
  - Web Design
layout: single
links:
  - icon: link
    icon_pack: fas
    name: Live Site
    url: https://www.larasrinath.com/
  - icon: github
    icon_pack: fab
    name: GitHub
    url: https://github.com/larasrinath/larasrinath
article_note:
  label: Project note
  title: Portfolio as a system
  text: A personal site rebuilt around reusable templates, structured content and one coherent visual language.
project_body:
  - type: opening
    text: >-
      **This portfolio redesign began as a visual refresh and became a small publishing system.** One Hugo presentation layer now connects YAML-driven content, responsive editorial templates and a shared set of design decisions.
  - type: image
    src: featured.jpg
    alt: Lara Srinath portfolio homepage with a portrait and editorial wordmark
    caption: The redesigned homepage reduces the portfolio to its most personal elements - portrait, name and navigation.
  - type: heading
    level: 2
    text: Why Rebuild It?
  - type: paragraph
    text: >-
      Over six years, what began as a simple, fun project grew into a disorganized mix-and-match of themes, Blogdown content, pages rendered through RStudio, Python-generated output and one-off overrides. Individual pages ended up with different font weights, padding, spacing and visual rules. Meanwhile, files, duplicate assets and folders accumulated without a clear structure. Each fix solved an immediate problem, but the site as a whole became a patchwork of band-aids over deeper cracks. The redesign therefore had to be more than a new look; it needed a content model and a visual system that could grow without drifting.
  - type: heading
    level: 2
    text: The System Behind the Surface
  - type: list
    items:
      - "**Shared page grammar**: One header, footer, hero system, divider language and set of content-start and page-tail rules across the site."
      - "**YAML-first content**: Navigation, profile copy, résumé entries, projects, blog metadata and editorial body blocks live in structured content rather than standalone HTML pages."
      - "**Editorial templates**: Projects and writing share a body renderer for opening leads, featured media, quotes, callouts, lists, code, charts and sign-offs."
      - "**Responsive by design**: Adaptive images, deliberate desktop and mobile layouts, a keyboard-friendly menu and standardized spacing replace one-off viewport fixes."
      - "**Centralized design tokens**: Palette, typography, spacing, divider weights and interaction distances are controlled from one design layer."
  - type: quote
    style: feature
    lines:
      - Content changes in YAML.
      - Structure changes in templates.
      - Visual decisions change once, in the design system.
    cite: The governing rule
  - type: heading
    level: 2
    text: A Personal Editorial Language
  - type: paragraph
    text: >-
      The system is intentionally quiet but not anonymous. Cormorant Garamond provides the editorial backbone, a single Mea Culpa initial adds the signature flourish, warm neutrals keep the pages tactile and a restrained rust accent carries emphasis. The homepage is reduced to portrait and name, while deeper pages reveal the work through a consistent reading experience.
  - type: heading
    level: 2
    text: What Changed Technically
  - type: list
    items:
      - "The site runs on **Hugo Extended** without a runtime dependency on an external theme."
      - "Page bundles keep content and relevant media together, while Hugo generates responsive WebP image sets at build time."
      - "Shared metadata, sitemap, 404, navigation and footer templates keep infrastructure and presentation consistent."
      - "Netlify preview and production builds use the same Hugo configuration, with environment-specific settings kept outside the content."
      - "Legacy Blogdown and RStudio scaffolding was removed so the repository reflects the current workflow."
  - type: callout
    label: Outcome
    title: A portfolio that behaves like a product
    text: >-
      A new project or article now begins with a content bundle and YAML fields. The templates decide how it is presented, and the design system keeps every page recognizably part of the same site.
  - type: heading
    level: 2
    text: What I Learned
  - type: paragraph
    text: >-
      Consistency does not come from checking the same values on every page. It comes from defining the right boundaries: content belongs in data, structure belongs in templates and reusable visual decisions belong in one shared layer. Once those boundaries were clear, typography, spacing, responsive behavior and performance became easier to improve together.
  - type: signoff
    text: >-
      The result is deliberately quieter: a personal front door, richer editorial pages and a content model that can keep growing without adding another CMS.
---
