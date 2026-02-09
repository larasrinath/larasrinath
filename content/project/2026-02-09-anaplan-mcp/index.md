---
date: "2026-02-09"
external_link: https://github.com/larasrinath/anaplan-mcp
image:
  caption: Anaplan MCP Server
  focal_point: Smart
summary: Model Context Protocol (MCP) server for Anaplan Integration API v2, enabling AI assistants to manage Anaplan workflows using natural language.
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

Anaplan MCP is a Model Context Protocol (MCP) server that bridges the gap between AI assistants (like Claude) and Anaplan's Integration API v2. It allows businesses to run and manage Anaplan workflows using natural language, making complex modeling tasks more accessible.

### Key Features
- **Name Resolution**: Human-readable names (e.g., "Revenue Model") are mapped to raw Anaplan IDs with case-insensitive matching and caching.
- **Pagination and Search**: Support for `offset`, `limit`, and `search` parameters across all list tools.
- **Automatic Task Polling**: Asynchronous actions (import, export, process, delete) are automatically polled every 2 seconds.
- **Retry Logic**: Built-in exponential backoff and handling for rate limiting (429) and server errors (5xx).
- **Large Response Handling**: Automatic truncation of large transactional responses and streaming for CSV datasets.
- **Chunked File Upload**: Transparent management of large file uploads (50MB chunks) for imports.

### Tools Included
The server provides 68 structured tools to:
- Browse workspaces and models
- Read and write model data
- Execute actions and processes
- Manage list items
- Administer models and users
