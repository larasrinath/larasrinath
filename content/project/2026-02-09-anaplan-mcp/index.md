---
date: "2026-02-09"
external_link: https://github.com/larasrinath/anaplan-mcp
image:
  caption: Anaplan MCP Server
  focal_point: Smart
summary: An MCP server that lets AI assistants like Claude manage Anaplan workspaces, models, and data through natural language — 68 tools covering exploration, bulk operations, and transactional workflows.
links:
- icon: github
  icon_pack: fab
  name: GitHub
  url: https://github.com/larasrinath/anaplan-mcp
tags:
- anaplan
- mcp
- typescript
- nodejs
- ai

title: Anaplan MCP
---

Anaplan's Integration API is powerful but technically demanding — most organizations rely on a small group of model builders to handle data extraction, imports, and workflow execution, creating bottlenecks. **Anaplan MCP** democratizes that access by wrapping the entire API in 68 structured tools that AI assistants can invoke conversationally.

Built in **TypeScript** and running over the **Model Context Protocol (MCP)**, this server lets business users ask Claude to explore models, pull data, run imports, or manage workflows — all in plain English, without touching the API directly.

### What It Can Do

- **Explore** workspaces, models, modules, lists, views, and line items
- **Read & write** cell data and list items
- **Run** imports, exports, processes, and delete actions with automatic task polling
- **Upload & download** files with chunked transfer for large datasets (50MB chunks)
- **Administer** models — open, close, delete, set periods and fiscal year
- **Query** users, versions, and task history

### Common Use Cases

- **Model documentation** — explore structure, list line items with formulas, check dimension usage
- **Data review** — pull current data, identify recently added items, summarize forecasts
- **Impact analysis** — find modules using specific lists, trace line-item references
- **Automation** — run monthly imports, export actuals, add new products to master lists
- **Onboarding** — walk new team members through module structure and model composition

### Engineering Highlights

- **Name resolution** — human-readable names mapped to Anaplan IDs with case-insensitive matching and caching
- **Automatic task polling** — async actions polled every 2 seconds with up to 5-minute timeout
- **Retry logic** — exponential backoff for rate limits (429) and server errors (5xx)
- **Chunked uploads** — transparent management of large file uploads
- **Large response handling** — automatic truncation and streaming for CSV datasets
- **Three-layer architecture** — Auth (pluggable providers) → API (16 domain wrappers) → Tools (MCP registrations with Zod validation)

### Authentication

Supports **basic auth**, **certificate auth**, and **OAuth2** (both device grant and authorization code flows). Configuration is entirely through environment variables — no config files or CLI flags.

### Works With

Claude Desktop, Claude Code, and any MCP-compatible client using stdio transport. Built with TypeScript 5.x and Node.js 18+.
