---
title: "Xanaplan: Planning Assistant"
subtitle: "A page-aware AI assistant alongside Anaplan"
hero_summary: "A Chrome side-panel assistant that connects planning questions to the current Anaplan page, verified model data and business context."
excerpt: "Planning questions, grounded in the page"
featured_summary: "A local Chrome assistant for Anaplan that combines page context, read-only model access and saved conversations to help explain planning data."
featured_home: false
featured_weight: 99
featured_image: featured.png
featured_image_alt: "Xanaplan logo with interwoven blue, lavender and cream ribbons"
featured_image_fit: contain
featured_meta: "Anaplan · AI · Chrome Extension — 2026"
date: "2026-09-14"
author: "Lara Srinath"
draft: false
tags:
  - Anaplan
  - Generative AI
  - Chrome Extension
  - MCP
categories:
  - Projects
  - Planning
layout: single
links:
  - icon: github
    icon_pack: fab
    name: GitHub
    url: https://github.com/larasrinath/Xanaplan
  - icon: book-open
    icon_pack: fas
    name: Setup Guide
    url: https://github.com/larasrinath/Xanaplan/blob/main/docs/setup.md
project_body:
  - type: opening
    text: >-
      A planning question depends on more than a number. The page, period, product selection and business definition all shape what that number means. I built **Xanaplan** to bring those pieces into a conversation beside the Anaplan page where the question starts.
  - type: image
    src: featured.png
    alt: Xanaplan logo with interwoven blue, lavender and cream ribbons
    caption: The Xanaplan mark supplies the blue, lavender and cream palette used throughout the assistant.
  - type: heading
    level: 2
    text: The Problem
  - type: paragraph
    text: >-
      Asking an AI assistant about a planning model usually means reconstructing the context: which page is open, what the selectors mean, where a metric comes from and how the business defines it. Copying a table into a chat can lose those connections. An answer may sound plausible while referring to the wrong period, model or slice of data.
  - type: heading
    level: 2
    text: A Conversation Beside the Plan
  - type: paragraph
    text: >-
      Xanaplan runs in a Chrome side panel. It follows an enabled Anaplan app and its published board or worksheet, or stays pinned to a page I choose. Saved business definitions give the assistant context for interpreting the model, while starter questions draw on verified page cards and selections.
  - type: list
    items:
      - "**Page-aware questions:** use the current page and confirmed selections as the starting point for an answer."
      - "**Inspectable sources:** answers include model sources, effective filters and read limits, so the evidence can be checked."
      - "**A visible working state:** activity shows when the assistant is finding data or preparing an answer, with a Stop control available throughout."
      - "**Conversations that carry forward:** completed chats are saved locally and can continue on the current page or with re-verified saved selections."
  - type: heading
    level: 2
    text: Keeping the Context Attached
  - type: paragraph
    text: >-
      Each question uses a frozen, verified snapshot of its page, model and selections. If I navigate to another page while an answer is running, that answer keeps its original context and sources. The new page becomes an option for the next question rather than silently changing the meaning of the current one.
  - type: paragraph
    text: >-
      The same principle applies to history. Reopening a conversation does not make yesterday's evidence current. Xanaplan re-verifies the selected context before continuing, preserves the sources on earlier answers and keeps unresolved selections explicit.
  - type: heading
    level: 2
    text: How It Works
  - type: paragraph
    text: >-
      The extension handles page discovery, selections and the conversation interface. A local **Node.js helper** verifies the context, stores settings and chats, and coordinates the configured OpenAI or Claude connection. My [anaplan-mcp](https://github.com/larasrinath/anaplan-mcp) project provides model access through the Model Context Protocol (MCP), which connects the assistant to a restricted set of Anaplan read tools.
  - type: paragraph
    text: >-
      Reads stay within one verified source model per question and are limited to page sources and relevant formula dependencies. Unknown or unsupported filters block numeric reads instead of being guessed. The helper binds to the local machine and checks the extension's pairing token and request origin.
  - type: callout
    label: Design principle
    title: Make the evidence inspectable
    text: >-
      The assistant should make it easier to understand a plan and check the explanation. Source details, explicit selection limits and read-only access are central to that experience.
  - type: heading
    level: 2
    text: Current Scope
  - type: paragraph
    text: >-
      Xanaplan is built for local, single-person use with published boards and worksheets. It cannot change cells or lists, run imports or processes, or administer models. Reports, draft pages and some complex selector contexts remain outside its supported scope. Questions, business context and relevant retrieved data pass through the configured AI connection; settings and completed conversations are stored locally.
  - type: paragraph
    text: >-
      Automated checks cover context changes, cancellation, saved conversations and read restrictions using synthetic adapters. Compatibility and answer accuracy still need validation against the Anaplan app being used. The repository documents those limits alongside a live acceptance checklist.
  - type: heading
    level: 2
    text: Explore the Project
  - type: paragraph
    text: >-
      The [GitHub repository](https://github.com/larasrinath/Xanaplan) includes the source, architecture notes and Apache 2.0 license. The [setup guide](https://github.com/larasrinath/Xanaplan/blob/main/docs/setup.md) walks through installing the extension, starting the local helper, connecting an AI provider and enabling an Anaplan app.
---
