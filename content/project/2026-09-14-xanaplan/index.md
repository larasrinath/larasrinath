---
title: "Xanaplan: Business Assistant"
subtitle: "A business assistant alongside Anaplan"
hero_summary: "A business assistant that answers questions using your Anaplan data and business context."
excerpt: "Business questions, answered alongside Anaplan"
featured_summary: "A local business assistant alongside Anaplan for asking questions about your data, with business context and sources you can inspect."
featured_home: false
featured_weight: 99
featured_image: featured.png
featured_image_alt: "Xanaplan logo"
featured_image_fit: contain
featured_meta: "Anaplan · AI · Chrome Extension — 2026"
date: "2026-09-14"
author: "Lara Srinath"
draft: true
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
      **Xanaplan** is a business assistant that sits alongside Anaplan. Ask questions in plain language, using your app's data and business definitions, and inspect the sources behind the answers.
  - type: figure
    src: featured.png
    alt: Xanaplan logo
    caption: Ask planning questions alongside Anaplan, using the current page, selected filters and your business definitions.
  - type: heading
    level: 2
    text: The Problem
  - type: paragraph
    text: >-
      Having access to a planning model does not make every business question easy to answer. A user may need to find a value for a particular product and period, understand which products belong to a category, or explain the rules behind a metric. Doing that can require knowing where the data lives, how the hierarchies are organized and how the calculations work.
  - type: paragraph
    text: >-
      A question such as "Which products are under Shampoo?" can become a search through pages and selections. Explaining a calculation may require documentation or help from someone who knows the model. That extra work interrupts the planning task, especially for users who work with the results but did not build the model.
  - type: paragraph
    text: >-
      Xanaplan addresses this by giving users a way to ask directly for the information or explanation they need. The assistant uses the relevant model data and business definitions to answer, with sources the user can inspect.
  - type: heading
    level: 2
    text: A Conversation Beside the Plan
  - type: paragraph
    text: >-
      Xanaplan runs in a Chrome side panel. It follows an enabled Anaplan app and its published board or worksheet, or stays pinned to a page I choose. Saved business definitions give the assistant context for interpreting the model, while starter questions draw on verified page cards and selections.
  - type: figure
    src: anaplan-assistant.png
    alt: Xanaplan explaining a product hierarchy beside the Anaplan worksheet
    caption: Xanaplan explains a product hierarchy alongside the Anaplan worksheet, keeping the model and conversation in view.
  - type: list
    items:
      - "**Page-aware questions:** use the current page and confirmed selections as the starting point for an answer."
      - "**Inspectable sources:** answers include model sources, effective filters and read limits, so the evidence can be checked."
      - "**A visible working state:** activity shows when the assistant is finding data or preparing an answer, with a Stop control available throughout."
      - "**Conversations that carry forward:** completed chats are saved locally and can continue on the current page or with re-verified saved selections."
  - type: gallery
    items:
      - src: admin-setup.png
        alt: Xanaplan Admin setup showing AI access, Anaplan access and enabled planning apps
        caption: Connect AI and Anaplan access, enable apps and add their business definitions.
      - src: starter-questions.png
        alt: Xanaplan starter questions for the Product Hierarchy Admin page
        caption: Start with a question drawn from the current page, or ask your own.
  - type: heading
    level: 2
    text: Keeping the Context Attached
  - type: paragraph
    text: >-
      Each question uses a frozen, verified snapshot of its page, model and selections. If I navigate to another page while an answer is running, that answer keeps its original context and sources. The new page becomes an option for the next question rather than silently changing the meaning of the current one.
  - type: paragraph
    text: >-
      The same principle applies to history. Reopening a conversation does not make yesterday's evidence current. Xanaplan re-verifies the selected context before continuing, preserves the sources on earlier answers and keeps unresolved selections explicit.
  - type: figure
    src: saved-chats.png
    alt: Xanaplan saved chats showing a search field and previous planning questions with their app and page context
    caption: Find earlier questions by chat, app or page and reopen the conversation.
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
