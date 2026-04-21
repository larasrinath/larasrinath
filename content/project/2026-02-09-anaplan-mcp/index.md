---
title: "Anaplan MCP"
subtitle: "Unofficial MCP server for Anaplan"
excerpt: "Power Anaplan through AI"
date: "2026-02-09"
author: "Lara Srinath"
draft: false
tags:
  - Anaplan
  - MCP
  - TypeScript
  - AI
  - Open Source
categories:
  - Projects
layout: single
diagram: false
image:
  caption: Anaplan MCP Server
  focal_point: Smart
links:
- icon: github
  icon_pack: fab
  name: GitHub
  url: https://github.com/larasrinath/anaplan-mcp
- icon: rocket
  icon_pack: fas
  name: Setup Guide
  url: "/project/2026-02-09-anaplan-mcp/#setup-guide"
---

<div class="project--anaplan-mcp page-intro">

## The Problem

Anaplan's Integration API is powerful but requires serious technical expertise. Most teams rely on a handful of model builders to navigate complex models, extract data, and run imports. Everyone else waits. That bottleneck slows down data reviews, onboarding, impact analysis, and routine workflows that should be self-serve.

## The Solution: Anaplan MCP

This server wraps the Anaplan Integration API v2 in structured tools that AI assistants like Claude can call on your behalf. Instead of writing API calls or waiting for someone who knows the model, you ask in plain English:

<div class="card-grid card-grid--quote">
  <div class="card card--quote">
    <i class="fas fa-quote-left"></i>
    <p>Show me the structure of the Supply Planning model</p>
  </div>
  <div class="card card--quote">
    <i class="fas fa-quote-left"></i>
    <p>Pull the current pricing data for all products</p>
  </div>
  <div class="card card--quote">
    <i class="fas fa-quote-left"></i>
    <p>Run the monthly demand import and show me the result</p>
  </div>
</div>

Built in **TypeScript** with support for both **stdio** (local) and **Streamable HTTP** (remote) transports. Works with Claude Desktop, Claude Code, claude.ai, and any MCP-compatible client.

## Who It's For

<div class="card-grid">
  <div class="card">
    <i class="fas fa-chart-line"></i>
    <div>
      <strong>Business users</strong>
      <p>Stop waiting for someone to pull data or explain how a model works. Ask Claude to show you the numbers, walk you through module structure, or run your regular imports.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-cubes"></i>
    <div>
      <strong>Model builders &amp; consultants</strong>
      <p>Analyze model structure, trace formula dependencies, review line item configurations, and identify performance issues through conversation instead of clicking through hundreds of modules manually.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-shield-alt"></i>
    <div>
      <strong>IT &amp; platform teams</strong>
      <p>Standard API access using your existing authentication and permissions. No new credentials, no elevated access. Open source for auditability.</p>
    </div>
  </div>
</div>

## What It Can Do

<div class="card-grid">
  <div class="card">
    <i class="fas fa-compass"></i>
    <div>
      <strong>Model Exploration</strong>
      <p>Browse workspaces, models, modules, lists, views, and line items. Inspect import, export, and process definitions. Query users, versions, calendar settings, and task history.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-database"></i>
    <div>
      <strong>Bulk Data Operations</strong>
      <p>Run imports, exports, processes, and delete actions with automatic task polling. Upload and download files with chunked transfer for large datasets. Manage models and large-volume reads for datasets over 1M cells.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-edit"></i>
    <div>
      <strong>Transactional Operations</strong>
      <p>Read cell data from module views. Write values to specific cells. Add, update, and delete list items.</p>
    </div>
  </div>
</div>

## Common Use Cases

<div class="card-grid">
  <div class="card">
    <i class="fas fa-file-alt"></i>
    <div>
      <strong>Model documentation</strong>
      <p>Explore structure, list line items with formulas, check dimension usage, and understand how a model is composed.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-chart-bar"></i>
    <div>
      <strong>Data review</strong>
      <p>Pull current data, identify recently added items, read forecast numbers, and get summaries without building custom exports.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-project-diagram"></i>
    <div>
      <strong>Impact analysis</strong>
      <p>Find which modules use a specific list as a dimension, trace line-item references, and identify what a change would affect.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-bolt"></i>
    <div>
      <strong>Automation</strong>
      <p>Run monthly imports, export actuals, add batches of new products to master lists, and chain multi-step workflows.</p>
    </div>
  </div>
  <div class="card">
    <i class="fas fa-user-plus"></i>
    <div>
      <strong>Onboarding</strong>
      <p>Walk new team members through module structure, explain how the model is organized, and answer questions about what each piece does.</p>
    </div>
  </div>
</div>

{{< callout type="note" title="Built-in orchestration guide" >}}
The server exposes an MCP resource (`anaplan://orchestration-guide`) that AI assistants read automatically. It teaches the correct tool sequences for every workflow: navigation patterns, read and write prerequisites, bulk import lifecycles, large-volume read pagination, and list mutation flows. Every tool description also includes prerequisite hints and next-step guidance, so the AI always knows what to call and in what order.
{{< /callout >}}

{{< callout type="warning" title="What it can't do" >}}
The Anaplan API does not support creating modules or line items, defining formulas, building model structure from scratch, or configuring the model calendar programmatically. For model building, use Anaplan's UI or Agent Studio. This server covers everything the Integration API v2 exposes.
{{< /callout >}}

For implementation details (internals, module layout, client compatibility matrix, architecture diagrams), see the [GitHub README](https://github.com/larasrinath/anaplan-mcp). That is the canonical technical reference and always reflects the latest release.

<a href="#setup-guide" class="cta-banner">
  <span class="cta-banner__label">
    <i class="fas fa-rocket"></i>
    <strong>Ready to set up?</strong>
    Jump to the platform-aware setup guide below.
  </span>
  <span class="cta-banner__arrow"><i class="fas fa-arrow-down"></i></span>
</a>

</div>

<div class="setup-guide">

<h2 class="section-heading" id="setup-guide"><i class="fas fa-rocket"></i> Setup Guide</h2>

{{< callout type="note" >}}
This guide is <strong>platform-aware</strong>. Pick your operating system below and the commands, file paths, and troubleshooting will switch to match. In <strong>Phase 2</strong> you will also pick an authentication method: <strong>OAuth2</strong> (recommended), <strong>Certificate</strong>, or <strong>Basic Auth</strong>. Both pickers stay in sync throughout the page.
{{< /callout >}}

{{< callout type="note" title="Scope of this walkthrough" >}}
This walkthrough covers the local **Claude Desktop** setup only (`stdio` transport). Remote or cloud-hosted MCP deployment is not covered on this page.
{{< /callout >}}

{{< os-select >}}

## Prerequisites

Ensure these are in place before starting.

| Requirement    | Min Version | Where to get it |
| -------------- | ----------- | --------------- |
| Node.js        | 18 or higher | [nodejs.org](https://nodejs.org) LTS installer, or platform instructions below |
| Git            | Any recent  | Platform instructions below |
| Claude Desktop | Latest      | [claude.ai/download](https://claude.ai/download) |
| Anaplan account | With API access | Ask your Anaplan admin to enable API access if needed |

{{< callout type="tip" title="Quick check" >}}
Open a terminal and run `node --version`. You should see `v18.x.x` or higher. If the command is not found, follow the install instructions in Phase 1, Step 2.
{{< /callout >}}

## Phase 1: Clone and build the server

Complete this phase once, regardless of which auth method you choose.

{{< step num="1" title="Open a terminal" >}}

{{< os-block os="win" >}}
Press `Windows + R`, type `cmd`, and press Enter. Or search for "Command Prompt" in the Start menu. No admin privileges needed.
{{< /os-block >}}

{{< os-block os="mac" >}}
Open **Terminal** from Applications > Utilities, or press `Cmd + Space` and type "Terminal".
{{< /os-block >}}

{{< os-block os="lin" >}}
Open your terminal emulator. On Ubuntu-based distros: `Ctrl + Alt + T`.
{{< /os-block >}}

{{< /step >}}

{{< step num="2" title="Install Node.js and Git (if not already present)" >}}

Run `node --version` and `git --version` first. If both report a valid version, skip this step.

{{< os-block os="win" >}}
- **Node.js**: download the LTS installer from [nodejs.org](https://nodejs.org) and run it with default options.
- **Git**: download from [git-scm.com/download/win](https://git-scm.com/download/win) and install with default options.
{{< /os-block >}}

{{< os-block os="mac" >}}

```bash
# Option A: Homebrew (recommended)
brew install node

# Option B: direct installer
# Download the .pkg from https://nodejs.org and run it
```

Git installs automatically on first use (triggers Xcode Command Line Tools dialog):

```bash
git --version
# Click "Install" in the dialog that appears
```

{{< /os-block >}}

{{< os-block os="lin" >}}

Node.js (pick one):

```bash
# Option A: nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc   # or ~/.zshrc on zsh
nvm install --lts

# Option B: package manager
sudo apt install nodejs npm     # Debian/Ubuntu
sudo dnf install nodejs         # Fedora/RHEL
```

Some distro package managers ship an older Node.js version. After installing, run `node --version` and confirm it is still **18 or higher**. If not, use `nvm`.

Git:

```bash
sudo apt install git            # Debian/Ubuntu
sudo dnf install git            # Fedora/RHEL
```

{{< /os-block >}}

After installing, open a new terminal window and confirm with `node --version` and `git --version`.

{{< /step >}}

{{< step num="3" title="Navigate to your projects folder" >}}

Keep the repo in your user folder for easy access.

{{< os-block os="win" >}}

```cmd
cd %USERPROFILE%
mkdir Projects
cd Projects
```

{{< /os-block >}}

{{< os-block os="mac lin" >}}

```bash
cd ~
mkdir -p Projects
cd Projects
```

{{< /os-block >}}

{{< /step >}}

{{< step num="4" title="Clone the repository" >}}

```bash
git clone https://github.com/larasrinath/anaplan-mcp.git
cd anaplan-mcp
```

{{< os-block os="win" >}}
Result: a folder at `C:\Users\<your-username>\Projects\anaplan-mcp`.
{{< /os-block >}}

{{< os-block os="mac lin" >}}
Result: a folder at `~/Projects/anaplan-mcp`.
{{< /os-block >}}

{{< /step >}}

{{< step num="5" title="Install dependencies" >}}

```bash
npm install
```

Wait for it to finish. Warnings are normal. Only lines starting with `npm ERR!` indicate a real problem.

{{< os-block os="mac lin" >}}
{{< callout type="warning" title="EACCES permission errors" >}}
If you see `EACCES` errors, do not use `sudo`. Fix ownership first, then retry:

```bash
sudo chown -R $(whoami) ~/.npm
npm install
```
{{< /callout >}}
{{< /os-block >}}

{{< /step >}}

{{< step num="6" title="Build the TypeScript source" >}}

```bash
npm run build
```

Compiles TypeScript to JavaScript. Only needed on first setup and after `git pull`. Success means no errors, and a `dist/` folder appears inside `anaplan-mcp`.

{{< /step >}}

{{< step num="7" title="Note your absolute path" >}}

You will need this exact path when configuring Claude Desktop.

{{< os-block os="win" >}}

```cmd
echo %CD%
```

Output will look like: `C:\Users\<your-username>\Projects\anaplan-mcp`.

{{< callout type="warning" title="Use forward slashes in the JSON config" >}}
In `claude_desktop_config.json`, always use forward slashes in paths. Example: `C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js`.
{{< /callout >}}
{{< /os-block >}}

{{< os-block os="mac lin" >}}

```bash
pwd
```

{{< os-block os="mac" >}}
Output example: `/Users/<your-username>/Projects/anaplan-mcp`.
{{< /os-block >}}

{{< os-block os="lin" >}}
Output example: `/home/<your-username>/Projects/anaplan-mcp`.
{{< /os-block >}}

Copy this path. You will paste it into the config file in Phase 2.
{{< /os-block >}}

{{< /step >}}

## Phase 2: Configure authentication

Pick your auth method below and the guide will filter to show only the steps that apply. Review the comparison table first if you're not sure which to choose.

{{< callout type="warning" title="One auth method at a time" >}}
Use only ONE authentication method. If multiple env vars are present, the server picks the highest-priority method: OAuth2 > Certificate > Basic. Never set all three at once.
{{< /callout >}}

### Authentication methods at a glance

|                | OAuth2 (Recommended) | Certificate | Basic Auth |
| -------------- | -------------------- | ----------- | ---------- |
| Best for       | Most users, SSO tenants | Service accounts, automation | Simple, non-SSO accounts |
| What you need  | OAuth2 client ID (device grant flow) | Paths to your certificate `.pem` and private key `.pem` files | Your Anaplan login email and password |
| Token lifetime | 60 min idle (in-memory) | Session-based | Session-based |
| SSO compatible | Yes | Yes | No |

{{< auth-select >}}

{{< auth-block auth="oauth" >}}

### Option A: OAuth2 (recommended)

OAuth2 is recommended for most users, especially if your Anaplan account uses SSO. On first use, Claude Desktop shows an authorization link in chat. Click it, approve in Anaplan, then retry your request.

**What you need:** an Anaplan OAuth2 Client ID. Ask your workspace admin to create an OAuth2 client (Device Grant type) and share the Client ID.

{{< step num="A1" title="Open the Claude Desktop config file" >}}

{{< os-block os="win" >}}
Press `Windows + R`, type `%APPDATA%\Claude`, press Enter. Open `claude_desktop_config.json` in Notepad. If the file does not exist yet, create it as an empty file.
{{< /os-block >}}

{{< os-block os="mac" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/Library/Application\ Support/Claude
```

```bash
# Open the config folder in Finder
open ~/Library/Application\ Support/Claude

# Or edit directly in terminal
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< os-block os="lin" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/.config/Claude
```

```bash
# Edit in terminal
nano ~/.config/Claude/claude_desktop_config.json

# Or with a GUI editor
gedit ~/.config/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< /step >}}

{{< step num="A2" title="Paste the OAuth2 configuration" >}}

If this is your only MCP server, you can replace the entire file contents with the block below. Otherwise, add or update only the `anaplan` entry inside `mcpServers`. Substitute your actual path and Client ID.

{{< os-block os="win" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CLIENT_ID": "your-client-id-here"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="mac" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CLIENT_ID": "your-client-id-here"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="lin" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/home/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CLIENT_ID": "your-client-id-here"
      }
    }
  }
}
```

{{< /os-block >}}

{{< /step >}}

{{< step num="A3" title="Save and fully restart Claude Desktop" >}}

{{< os-block os="win" >}}
Save the file. Right-click the Claude icon in the system tray and choose **Quit** (do not just close the window). Reopen Claude Desktop.
{{< /os-block >}}

{{< os-block os="mac" >}}
Save the file. Quit Claude Desktop with `Cmd + Q`, or right-click the Dock icon and choose **Quit**. Reopen Claude Desktop.
{{< /os-block >}}

{{< os-block os="lin" >}}
Save the file. Right-click the Claude system tray icon and choose **Quit**. Reopen Claude Desktop.
{{< /os-block >}}

{{< callout type="note" title="First-use authorization" >}}
On first tool use, Claude will display an authorization URL in chat. Open it in your browser, approve in Anaplan, then re-run your request.
{{< /callout >}}

{{< /step >}}

{{< /auth-block >}}

{{< auth-block auth="cert" >}}

### Option B: Certificate authentication

Best for service accounts and automation pipelines. Requires a `.pem` certificate and private key registered with your Anaplan tenant.

**What you need:**
- A `.pem` certificate file registered in your Anaplan tenant
- The matching private key `.pem` file
- The absolute paths to both files

{{< step num="B1" title="Open the Claude Desktop config file" >}}

{{< os-block os="win" >}}
Press `Windows + R`, type `%APPDATA%\Claude`, press Enter. Open `claude_desktop_config.json` in Notepad. If the file does not exist yet, create it as an empty file.
{{< /os-block >}}

{{< os-block os="mac" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/Library/Application\ Support/Claude
```

```bash
# Open the config folder in Finder
open ~/Library/Application\ Support/Claude

# Or edit directly in terminal
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< os-block os="lin" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/.config/Claude
```

```bash
# Edit in terminal
nano ~/.config/Claude/claude_desktop_config.json

# Or with a GUI editor
gedit ~/.config/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< /step >}}

{{< step num="B2" title="Paste the Certificate configuration" >}}

If this is your only MCP server, you can replace the file contents with the block below. Otherwise, add or update only the `anaplan` entry inside `mcpServers`. Use absolute paths to your `.pem` files. On Windows, use forward slashes.

{{< os-block os="win" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CERTIFICATE_PATH": "C:/certs/anaplan-cert.pem",
        "ANAPLAN_PRIVATE_KEY_PATH": "C:/certs/anaplan-key.pem"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="mac" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CERTIFICATE_PATH": "/Users/<your-username>/certs/anaplan-cert.pem",
        "ANAPLAN_PRIVATE_KEY_PATH": "/Users/<your-username>/certs/anaplan-key.pem"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="lin" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/home/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_CERTIFICATE_PATH": "/home/<your-username>/certs/anaplan-cert.pem",
        "ANAPLAN_PRIVATE_KEY_PATH": "/home/<your-username>/certs/anaplan-key.pem"
      }
    }
  }
}
```

{{< /os-block >}}

{{< callout type="note" title="Legacy tenants only" >}}
If your tenant is legacy (pre-2020), also add `"ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT": "v1"` inside the `env` block. Most tenants do not need this.
{{< /callout >}}

{{< /step >}}

{{< step num="B3" title="Save and fully restart Claude Desktop" >}}
Fully quit Claude Desktop and reopen it. No browser authorization step is needed for certificate auth.
{{< /step >}}

{{< /auth-block >}}

{{< auth-block auth="basic" >}}

### Option C: Basic Authentication (Username / Password)

Simplest to configure but only works for accounts that do not use SSO. If your company uses Single Sign-On to log in to Anaplan, use Option A or B instead.

{{< step num="C1" title="Open the Claude Desktop config file" >}}

{{< os-block os="win" >}}
Press `Windows + R`, type `%APPDATA%\Claude`, press Enter. Open `claude_desktop_config.json` in Notepad. If the file does not exist yet, create it as an empty file.
{{< /os-block >}}

{{< os-block os="mac" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/Library/Application\ Support/Claude
```

```bash
# Open the config folder in Finder
open ~/Library/Application\ Support/Claude

# Or edit directly in terminal
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< os-block os="lin" >}}

If the folder does not exist yet:

```bash
mkdir -p ~/.config/Claude
```

```bash
# Edit in terminal
nano ~/.config/Claude/claude_desktop_config.json

# Or with a GUI editor
gedit ~/.config/Claude/claude_desktop_config.json
```
{{< /os-block >}}

{{< /step >}}

{{< step num="C2" title="Paste the Basic Auth configuration" >}}

If this is your only MCP server, you can replace the file contents with the block below. Otherwise, add or update only the `anaplan` entry inside `mcpServers`.

{{< os-block os="win" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_USERNAME": "you@company.com",
        "ANAPLAN_PASSWORD": "your-anaplan-password"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="mac" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/Users/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_USERNAME": "you@company.com",
        "ANAPLAN_PASSWORD": "your-anaplan-password"
      }
    }
  }
}
```

{{< /os-block >}}

{{< os-block os="lin" >}}

```json
{
  "mcpServers": {
    "anaplan": {
      "command": "node",
      "args": ["/home/<your-username>/Projects/anaplan-mcp/dist/index.js"],
      "env": {
        "ANAPLAN_USERNAME": "you@company.com",
        "ANAPLAN_PASSWORD": "your-anaplan-password"
      }
    }
  }
}
```

{{< /os-block >}}

{{< callout type="danger" title="Password is stored in plain text" >}}
Your password sits in plain text in this config file. Never commit it to source control, and keep the file private.

{{< os-block os="mac lin" >}}
Set restrictive permissions: `chmod 600 <config-file-path>`.
{{< /os-block >}}
{{< /callout >}}

{{< /step >}}

{{< step num="C3" title="Save and fully restart Claude Desktop" >}}
Fully quit Claude Desktop and reopen it.
{{< /step >}}

{{< /auth-block >}}

## Phase 3: Verify the connection

{{< step num="V1" title="Confirm tools are loaded" >}}
After reopening Claude Desktop, look for a hammer icon (:hammer_and_wrench:) in the chat input area. Click it. You should see Anaplan tools listed.

If the hammer icon is not there, see [Troubleshooting](#troubleshooting) below.
{{< /step >}}

{{< step num="V2" title="Run a safe first test" >}}
Type this into Claude Desktop:

> *"Show me my Anaplan workspaces"*

Claude will ask you to approve the `show_workspaces` tool call. Click Allow. You should see your workspace names and IDs returned.
{{< /step >}}

{{< step num="V3" title="OAuth2 only: complete the authorization flow" >}}
If using OAuth2, Claude shows a URL on first use.

1. Copy the URL Claude displays and open it in your browser.
2. Log in to Anaplan and approve the device request.
3. Return to Claude Desktop and re-run your request.

Tokens are kept in memory. After 60 minutes idle or a Claude Desktop restart, you will need to re-authorize.
{{< /step >}}

## Environment variable reference

This section follows the auth selector above and shows only the variables for the currently selected auth method.

{{< auth-block auth="oauth" >}}

| Variable            | Description |
| ------------------- | ----------- |
| `ANAPLAN_CLIENT_ID` | Your Anaplan OAuth2 client ID (device grant flow) |

{{< /auth-block >}}

{{< auth-block auth="cert" >}}

| Variable                                  | Description |
| ----------------------------------------- | ----------- |
| `ANAPLAN_CERTIFICATE_PATH`                | Absolute path to your `.pem` certificate file |
| `ANAPLAN_PRIVATE_KEY_PATH`                | Absolute path to your private key `.pem` file |
| `ANAPLAN_CERTIFICATE_ENCODED_DATA_FORMAT` | Optional. Set `v1` for legacy tenants only. Defaults to `v2` |

{{< /auth-block >}}

{{< auth-block auth="basic" >}}

| Variable            | Description |
| ------------------- | ----------- |
| `ANAPLAN_USERNAME`  | Your Anaplan login email address |
| `ANAPLAN_PASSWORD`  | Your Anaplan password |

{{< /auth-block >}}

## Troubleshooting

{{< os-block os="win" >}}

| Symptom | Fix |
| ------- | --- |
| `Unexpected non-whitespace` error | JSON config is invalid. Paste it into [jsonlint.com](https://jsonlint.com). Common causes: trailing comma or duplicate `{}` block. |
| `Server disconnected` in Claude | Run `node C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js` in Command Prompt to see the real error. Common causes: wrong path (use forward slashes), missing `npm run build`, or Node.js not installed. |
| `401 Unauthorized` | Credentials are wrong, or tenant uses SSO. Switch from Basic to Certificate or OAuth2. |
| OAuth refresh failed | Session expired (60 min idle or server restarted). Re-authorize in Claude Desktop and retry. |
| Hammer icon missing in Claude | Claude Desktop was not fully restarted. Right-click the system-tray icon and choose **Quit**, then reopen. |
| `npm run build` fails | Node.js version too old. Run `node --version`. Install Node.js 18+ from [nodejs.org](https://nodejs.org). |
| `'node' is not recognized` | Node.js not installed or not in PATH. Reinstall from [nodejs.org](https://nodejs.org) with the installer's default options, then open a fresh Command Prompt. |
| Backslash paths cause errors in JSON | In `claude_desktop_config.json`, always use forward slashes. Example: `C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js`. |

{{< /os-block >}}

{{< os-block os="mac" >}}

| Symptom | Fix |
| ------- | --- |
| `Unexpected non-whitespace` error | JSON config is invalid. Paste it into [jsonlint.com](https://jsonlint.com). Common causes: trailing comma or duplicate `{}` block. |
| `Server disconnected` in Claude | Run `node ~/Projects/anaplan-mcp/dist/index.js` in Terminal to see the real error. Common causes: wrong path, missing `npm run build`, or Node.js not installed. |
| `401 Unauthorized` | Credentials are wrong, or tenant uses SSO. Switch from Basic to Certificate or OAuth2. |
| OAuth refresh failed | Session expired (60 min idle or server restarted). Re-authorize in Claude Desktop and retry. |
| Hammer icon missing in Claude | Claude Desktop was not fully restarted. Press `Cmd + Q` (or right-click the Dock icon and choose **Quit**), then reopen. |
| `npm run build` fails | Node.js version too old. Run `node --version`. Upgrade via `brew upgrade node`, or install Node.js 18+ from [nodejs.org](https://nodejs.org). |
| `command not found: node` | Node.js not installed or not in PATH. Install with `brew install node`, then open a fresh Terminal. |
| `EACCES` / permission denied on `npm install` | Do not use `sudo`. Fix npm ownership: `sudo chown -R $(whoami) ~/.npm`, then retry `npm install`. |
| Config file not found | The folder may not exist yet. Create it: `mkdir -p ~/Library/Application\ Support/Claude`. |

{{< /os-block >}}

{{< os-block os="lin" >}}

| Symptom | Fix |
| ------- | --- |
| `Unexpected non-whitespace` error | JSON config is invalid. Paste it into [jsonlint.com](https://jsonlint.com). Common causes: trailing comma or duplicate `{}` block. |
| `Server disconnected` in Claude | Run `node ~/Projects/anaplan-mcp/dist/index.js` in your terminal to see the real error. Common causes: wrong path, missing `npm run build`, or Node.js not installed. |
| `401 Unauthorized` | Credentials are wrong, or tenant uses SSO. Switch from Basic to Certificate or OAuth2. |
| OAuth refresh failed | Session expired (60 min idle or server restarted). Re-authorize in Claude Desktop and retry. |
| Hammer icon missing in Claude | Claude Desktop was not fully restarted. Right-click the tray icon and choose **Quit**, then reopen. |
| `npm run build` fails | Node.js version too old. Run `node --version`. Install 18+ via `nvm install --lts`, or `sudo apt install nodejs` on Debian/Ubuntu. |
| `command not found: node` | Node.js not installed or not in PATH. Install via nvm (recommended) or `sudo apt install nodejs npm`, then open a fresh terminal. |
| `EACCES` / permission denied on `npm install` | Do not use `sudo`. Fix npm ownership: `sudo chown -R $(whoami) ~/.npm`, then retry `npm install`. |
| Config file not found | The folder may not exist yet. Create it: `mkdir -p ~/.config/Claude`. |

{{< /os-block >}}

{{< callout type="tip" title="The fastest diagnosis" >}}
When in doubt, open a terminal and run the server directly:

{{< os-block os="win" >}}

```cmd
node C:/Users/<your-username>/Projects/anaplan-mcp/dist/index.js
```

{{< /os-block >}}

{{< os-block os="mac lin" >}}

```bash
node ~/Projects/anaplan-mcp/dist/index.js
```

{{< /os-block >}}

The error output is always the fastest way to diagnose any issue.
{{< /callout >}}

## Quick reference: key paths

{{< os-block os="win" >}}

| Item | Path |
| ---- | ---- |
| Claude Desktop config | `%APPDATA%\Claude\claude_desktop_config.json` |
| Server entry point    | `C:\Users\<your-username>\Projects\anaplan-mcp\dist\index.js` |
| Source code           | `C:\Users\<your-username>\Projects\anaplan-mcp\src\` |
| Orchestration guide   | `anaplan://orchestration-guide` (auto-loaded by Claude) |

{{< /os-block >}}

{{< os-block os="mac" >}}

| Item | Path |
| ---- | ---- |
| Claude Desktop config | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Server entry point    | `~/Projects/anaplan-mcp/dist/index.js` |
| Source code           | `~/Projects/anaplan-mcp/src/` |
| Orchestration guide   | `anaplan://orchestration-guide` (auto-loaded by Claude) |

{{< /os-block >}}

{{< os-block os="lin" >}}

| Item | Path |
| ---- | ---- |
| Claude Desktop config | `~/.config/Claude/claude_desktop_config.json` |
| Server entry point    | `~/Projects/anaplan-mcp/dist/index.js` |
| Source code           | `~/Projects/anaplan-mcp/src/` |
| Orchestration guide   | `anaplan://orchestration-guide` (auto-loaded by Claude) |

{{< /os-block >}}

</div>

<script>
/* Keep the clicked platform/auth label pinned to its current viewport
   position across the content reflow, so the page does not appear to jump. */
(function () {
  var labels = document.querySelectorAll(
    '.os-selector-choices label, .auth-selector-choices label'
  );
  labels.forEach(function (lbl) {
    lbl.addEventListener('click', function () {
      var before = lbl.getBoundingClientRect().top;
      requestAnimationFrame(function () {
        var after = lbl.getBoundingClientRect().top;
        var diff = after - before;
        if (diff !== 0) {
          window.scrollBy(0, diff);
        }
      });
    });
  });
})();
</script>
