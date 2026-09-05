---
title: "Compass: From a Friend’s Request to a Working App"
subtitle: "A local workspace for candidate research and comparison"
hero_summary: "Built from a friend’s request, Compass brings LinkedIn candidate research, evidence-based scoring and side-by-side comparison into one local workspace."
featured_summary: "A friend’s request became Compass: a local app for finding LinkedIn candidates, reviewing the evidence behind their scores and comparing people against a role brief."
featured_home: false
featured_weight: 1
featured_image: search-criteria.png
featured_image_alt: "Compass search criteria with a role description, Anaplan skills, credentials, locations and minimum experience"
featured_image_fit: contain
featured_meta: "Candidate Research · Python · Local Storage — 2026"
date: "2026-09-05"
author: "Lara Srinath"
draft: true
tags:
  - Python
  - Candidate Research
  - Product Design
  - MCP
categories:
  - Projects
layout: single
links:
  - icon: github
    icon_pack: fab
    name: GitHub
    url: https://github.com/larasrinath/compass
project_body:
  - type: opening
    text: >-
      Compass started with a request from a friend. I built it into a working app for finding candidates on LinkedIn, reviewing the evidence behind a match and keeping that research together for later.
  - type: image
    src: search-criteria.png
    alt: Compass search criteria with a role description, Anaplan skills, credentials, locations and minimum experience
    caption: "Review the role description, skills, credentials, locations and minimum experience before continuing to search."
  - type: heading
    text: The Problem
  - type: paragraph
    text: >-
      Finding a profile is only one part of candidate research. The next questions are harder: which requirements does this person appear to meet, what evidence supports that assessment and how do they compare with someone else? A useful shortlist needs more than names and links.
  - type: paragraph
    text: >-
      Compass brings those steps into one workflow. The role criteria, downloaded profiles, review notes and comparisons stay connected, so a search can be revisited without starting the research again.
  - type: heading
    text: From Role Brief to Shortlist
  - type: list
    ordered: true
    items:
      - "**Define the role.** Enter skills, credentials, locations and minimum experience, with optional preferences. Criteria are entered explicitly; a pasted job description is not automatically interpreted."
      - "**Run a search.** Compass retrieves LinkedIn profiles through the signed-in connector, downloads new profiles and scores them using the configured criteria. Existing downloads are reused."
      - "**Review the list.** Check candidate names and duplicate sources, add a review note and confirm the list before opening the ranking."
      - "**Inspect and compare.** Review the saved evidence for an individual candidate, or compare two or three people side by side."
      - "**Return later.** Saved searches keep previous runs together, with profiles and evidence available locally even when the connector is offline."
  - type: heading
    text: Make the Score Explainable
  - type: paragraph
    text: >-
      A score is useful only when the person reviewing it can understand what sits behind it. Compass lets the reviewer open a candidate’s score breakdown and inspect the saved evidence, rather than treating the ranking as the end of the process.
  - type: image
    src: candidate-review.png
    alt: Compass candidate review drawer with a fictional candidate’s score and signal breakdown
    caption: "The candidate review view exposes the score and supporting signals for closer inspection. The candidate shown is fictional."
  - type: paragraph
    text: >-
      Scoring weights can be adjusted in Settings, which recalculates saved evidence locally. Connection distance controls search reach but does not affect scores. Confidence describes evidence availability; it is separate from how closely the retrieved evidence matches the role criteria.
  - type: callout
    label: Design principle
    title: Keep the evidence close to the decision
    text: >-
      Scores help organize a review. They do not verify qualifications or predict job performance. The saved sources give the reviewer a way to assess each match for themselves.
  - type: heading
    text: Built to Run Locally
  - type: paragraph
    text: >-
      Searches, profiles and evidence are stored in a local SQLite database. LinkedIn retrieval uses the user’s signed-in session, while saved work remains available for review offline. Compass does not send messages or connection requests.
  - type: paragraph
    text: >-
      The app starts with a single command, `./compass`, on macOS or desktop Linux. The launcher prepares the dependencies, builds the frontend when needed, starts the local services and opens the app. The first launch includes an interactive LinkedIn sign-in; later launches reuse the installation and login.
  - type: list
    items:
      - "**Python backend** coordinates the application and its local services."
      - "**Vite frontend** provides the role brief, results, candidate review, comparisons, settings and saved-search views."
      - "**SQLite storage** keeps searches and retrieved evidence on the user’s computer."
      - "**LinkedIn MCP connector** provides LinkedIn access through the open-source [linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server) project by Daniel Sticker and its contributors."
  - type: heading
    text: The Result
  - type: paragraph
    text: >-
      A friend’s request became a complete path from role criteria to candidate comparison. Compass brings search, evidence review and saved research into the same app, with an interactive guide to help someone work through the process.
  - type: paragraph
    text: >-
      The part I want to highlight is the connection between those steps. Finding candidates, understanding a score and returning to an earlier search all belong to the same piece of work. Building Compass meant making that whole path usable.
  - type: signoff
    text: "Started with a friend’s request. Built into a tool for a real workflow."
---
