---
title: "Xanaplan: Planning Assistant"
subtitle: "A planning assistant alongside Anaplan"
hero_summary: "A planning assistant for asking questions about your Anaplan data, alongside the page you’re using."
excerpt: "Planning questions, alongside Anaplan"
featured_summary: "A personal project exploring a Chrome side-panel assistant for asking questions about Anaplan data and continuing the conversation as you work."
featured_home: false
featured_weight: 99
featured_image: featured.png
featured_image_alt: "Xanaplan logo"
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
      I’m building **Xanaplan** as a planning assistant that sits beside Anaplan. The current version lets you ask questions about your data, get explanations and follow up in the same conversation.
  - type: figure
    src: featured.png
    alt: Xanaplan logo
    max_width: 400
    caption: Ask planning questions alongside Anaplan, using the current page, selected filters and your business definitions.
  - type: heading
    level: 2
    text: The Idea
  - type: paragraph
    text: >-
      This is a personal project exploring a simple idea: what would it be like to ask a planning question while looking at the relevant Anaplan page? A question might be about a value for a particular period, the products in a category or how a metric is calculated.
  - type: paragraph
    text: >-
      Xanaplan uses the selected app, page and supported filters as context, together with business definitions added during setup. That gives the conversation a starting point for the question you want to ask.
  - type: heading
    level: 2
    text: Using the Assistant
  - type: paragraph
    text: >-
      Open the Chrome side panel next to an enabled Anaplan app. Choose a suggested question or write your own, then ask follow-ups. In the example below, the conversation starts with an explanation of a product hierarchy, followed by a question about the products under Shampoo.
  - type: figure
    src: anaplan-assistant.png
    alt: Xanaplan explaining a product hierarchy beside the Anaplan worksheet
    caption: Xanaplan explains a product hierarchy alongside the Anaplan worksheet, keeping the model and conversation in view.
  - type: list
    items:
      - "**Choose the context:** follow the current Anaplan page or select a page for the conversation."
      - "**Check the answer:** expand the sources to see which model data and filters were used."
      - "**Add business context:** provide definitions and notes for each enabled app during setup."
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
    text: Pick Up a Conversation
  - type: paragraph
    text: >-
      Completed chats are saved locally. You can find an earlier question and continue using the current page or return to the saved page and selections. Earlier answers keep their original sources, and the context is checked again before a new question.
  - type: figure
    src: saved-chats.png
    alt: Xanaplan saved chats showing a search field and previous planning questions with their app and page context
    caption: Find earlier questions by chat, app or page and reopen the conversation.
  - type: heading
    level: 2
    text: Under the Hood
  - type: paragraph
    text: >-
      The Chrome extension connects to a local Node.js helper, an OpenAI or Claude connection and [anaplan-mcp](https://github.com/larasrinath/anaplan-mcp) for model reads. Settings and completed chats are stored on your computer. Questions and relevant retrieved data are sent through the AI connection you configure.
  - type: heading
    level: 2
    text: Where It Stands
  - type: paragraph
    text: >-
      For now, Xanaplan is an early planning assistant for local, single-person use. It supports published Anaplan boards and worksheets with read-only access. It retrieves information and responds in chat; changes to the plan still happen in Anaplan.
  - type: paragraph
    text: >-
      Some page types and complex selections remain unsupported. The current focus is on questions and explanations about existing data, with answer accuracy still needing validation against the app being used.
  - type: paragraph
    text: >-
      The [repository](https://github.com/larasrinath/Xanaplan) contains the source and current limitations. The [setup guide](https://github.com/larasrinath/Xanaplan/blob/main/docs/setup.md) covers installation and connecting an app.
---
