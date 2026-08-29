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
project_body:
  - type: opening
    text: >-
      This redesign began as a visual refresh and became a small publishing system. Content, templates and visual rules now work together, so the site can grow without slowly becoming inconsistent again.
  - type: image
    src: featured.jpg
    alt: Lara Srinath portfolio homepage with a portrait and editorial wordmark
    caption: "The homepage keeps the essentials: portrait, name, a short introduction and a clear path into the work."
  - type: heading
    level: 2
    text: Why I Rebuilt It
  - type: paragraph
    text: >-
      Over six years, the old portfolio accumulated themes, Blogdown pages, RStudio output, generated files and one-off CSS fixes. A change that looked correct on one page could alter the spacing, font weight or color somewhere else. The problem was no longer one untidy stylesheet. The site had no dependable boundary between content, structure and presentation.
  - type: paragraph
    text: >-
      I wanted the new version to feel quieter and more personal, but the real goal was durability: publishing a project or note should not require redesigning a page, and changing a visual rule should not mean hunting through several templates.
  - type: heading
    level: 2
    text: The Design Direction
  - type: paragraph
    text: >-
      The visual language grew from subtraction. Heavy cards, section dividers, fixed-height blocks and unnecessary outlines were removed. A continuous page surface lets typography, rhythm and negative space establish the hierarchy. Light mode uses a warm near-white canvas with deep crimson emphasis; dark mode keeps the same structure but shifts the accent to a restrained muted rose.
  - type: paragraph
    text: >-
      The type system is deliberately multi-font rather than decorative for its own sake. Fraunces carries display titles, dates and expressive emphasis. Lora handles sustained editorial reading. Inter keeps navigation, metadata and controls precise. Mea Culpa appears only as the small signature flourish, so it remains distinctive instead of becoming a repeated effect.
  - type: paragraph
    text: >-
      Those choices became named typography roles rather than page-specific styles. A page title, editorial lead, body paragraph, date or label now has one intended treatment and one purpose wherever it appears.
  - type: heading
    level: 2
    text: The System Behind It
  - type: list
    items:
      - "**Structured content** keeps navigation, résumé entries, projects, notes and editorial blocks in YAML or front matter rather than standalone HTML."
      - "**Shared page grammar** gives every page the same header, footer, hero logic, content entry and page tail while allowing each page family to arrange its content appropriately."
      - "**Reusable editorial blocks** render openings, images, quotations, callouts, lists, code and sign-offs from the same presentation layer."
      - "**Centralized design tokens** control palette, type roles, spacing, icon sizing, focus states and interaction distances from one system."
      - "**Responsive rules** use fluid type and spacing with deliberate breakpoints, so desktop and mobile adapt without a separate design for every page."
  - type: quote
    style: feature
    lines:
      - Content changes in data.
      - Structure changes in templates.
      - Visual decisions change once, in the design system.
    cite: The rule that keeps the site coherent
  - type: heading
    level: 2
    text: Designed Through Inspection
  - type: paragraph
    text: >-
      The hardest inconsistencies were often small: two roles that looked almost identical, dates aligned to different baselines, fixed gaps that became enormous on shorter pages, or hover effects that worked on desktop but made mobile elements jump. Solving them required looking at the whole system rather than polishing screenshots one by one.
  - type: paragraph
    text: >-
      I built a private Anatomy mode that labels each live typography role and reports the browser's rendered family, size, weight, spacing and color. It makes drift visible on the actual page and turns the design system into an inspection tool rather than a document that can quietly fall out of date.
  - type: heading
    level: 2
    text: Under the Hood
  - type: list
    items:
      - "**Hugo Extended** builds the site without a runtime dependency on an external theme."
      - "Page bundles keep content and media together, while Hugo generates responsive WebP image sets during the build."
      - "A small pre-paint script applies the saved theme before the page appears, preventing a light-to-dark flash."
      - "Shared metadata, sitemap, social-image, navigation and footer rules keep the supporting infrastructure consistent."
      - "The same build configuration powers local previews and deployment, so what is reviewed locally is what gets published."
  - type: callout
    label: Outcome
    title: A portfolio that behaves like a product
    text: >-
      A new project or note begins with content. Templates decide how it is presented, and the shared system keeps it recognizably part of the same site.
  - type: heading
    level: 2
    text: What I Learned
  - type: paragraph
    text: >-
      Consistency does not come from forcing every page into the same layout. It comes from agreeing on the boundaries. Content belongs in data, repeated structure belongs in templates and reusable visual decisions belong in one shared layer. Within those boundaries, the About page, résumé, project archive and long-form articles can keep their own character.
  - type: paragraph
    text: >-
      The redesign also changed how I evaluate the site. Instead of asking whether one page looks finished, I now ask whether the decision still works across page families, color modes, content lengths and screen sizes. That shift made the portfolio easier to improve as a whole.
  - type: signoff
    text: >-
      The result is deliberately quieter on the surface and far more structured underneath.
---
