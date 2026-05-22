# .opencode/ — OpenCode Configuration

This directory contains all OpenCode configuration: agents, commands, rules, plugins, and MCP server definitions.

## Directory Structure

```
.opencode/
├── agents/           # Agent definitions with frontmatter metadata
├── commands/         # Slash commands (/speckit.*, /workflow.*)
│   └── optional/     # Optional commands (React Native, standalone React)
├── plugins/          # JavaScript plugins (hooks into tool execution)
├── rules/            # Behavior rules triggered by commands or model decisions
├── package.json      # Plugin dependencies (@opencode-ai/plugin)
└── opencode.json     # Root configuration (model, agents, MCP, permissions)
```

## Agent Hierarchy

### Primary Agents (can edit files)
| Agent | File | Responsibility |
|-------|------|----------------|
| `backend-dev` | `agents/backend-dev.md` | NestJS modules, Prisma schema, REST APIs, Swagger |
| `admin-dev` | `agents/admin-dev.md` | React admin dashboard (Ant Design, TanStack Query) |
| `frontend-dev` | `agents/frontend-dev.md` | Frontend orchestrator — delegates to admin-dev and mobile-specialist |

### Subagents (read-only, provide recommendations)
| Agent | File | Responsibility |
|-------|------|----------------|
| `speckit-review` | `agents/speckit-review.md` | Cross-artifact consistency (spec/plan/tasks) |
| `api-consumer` | `agents/api-consumer.md` | DTO alignment, caching, auth token handling |
| `api-docs` | `agents/api-docs.md` | Swagger/OpenAPI documentation |
| `db-architect` | `agents/db-architect.md` | Prisma schema design, indexes, query optimization |
| `security-guard` | `agents/security-guard.md` | JWT, RBAC, rate limiting, OWASP audit |
| `test-writer` | `agents/test-writer.md` | Unit, integration, and E2E tests |
| `ui-designer` | `agents/ui-designer.md` | Accessibility (WCAG), design systems, responsive layouts |
| `mobile-specialist` | `agents/mobile-specialist.md` | Flutter performance, platform channels, app store deployment |
| `stitch-designer` | `agents/stitch-designer.md` | UI generation via Google Stitch |
| `plantuml-designer` | `agents/plantuml-designer.md` | UML diagrams (sequence, class, ERD, architecture) |
| `infra-ops` | `agents/infra-ops.md` | Docker, CI/CD, deployment |

### Engineer System (`.agents/system/engineers/`)
| Engineer | Path | Responsibility |
|----------|------|----------------|
| Orchestrator | `.agents/system/engineers/SYSTEM.md` | Main architect — analyzes requirements, delegates to specialists |
| Backend (NestJS) | `.agents/system/engineers/backend/nestjs/SYSTEM.md` | NestJS + Prisma + PostgreSQL focused |
| Backend (Microservices) | `.agents/system/engineers/backend/full/SYSTEM.md` | General microservices (optional) |
| Admin (React) | `.agents/system/engineers/frontend/web-DDD/SYSTEM.md` | React admin with Ant Design |
| React (Coding) | `.agents/system/engineers/frontend/react/coding/SYSTEM.md` | General React + TypeScript |
| Mobile (Flutter) | `.agents/system/engineers/mobile/SYSTEM.md` | Flutter + Clean Architecture + BLoC |

## Command Categories

### Speckit Core
| Command | File | Purpose |
|---------|------|---------|
| `/speckit.specify` | `commands/speckit.specify.md` | Create feature specification |
| `/speckit.clarify` | `commands/speckit.clarify.md` | Resolve ambiguities in spec |
| `/speckit.plan` | `commands/speckit.plan.md` | Generate technical implementation plan |
| `/speckit.tasks` | `commands/speckit.tasks.md` | Break plan into actionable tasks |
| `/speckit.implement` | `commands/speckit.implement.md` | Execute tasks and generate code |
| `/speckit.analyze` | `commands/speckit.analyze.md` | Cross-artifact consistency check |
| `/speckit.checklist` | `commands/speckit.checklist.md` | Generate domain-specific quality checklists |
| `/speckit.constitution` | `commands/speckit.constitution.md` | Create/update project constitution |
| `/speckit.review` | `commands/speckit.review.md` | Speckit review (uses speckit-review agent) |
| `/speckit.taskstoissues` | `commands/speckit.taskstoissues.md` | Sync tasks to GitHub issues |
| `/speckit.agent.select` | `commands/speckit.agent.select.md` | Auto-select engineer based on tech stack |
| `/speckit.docs.add` | `commands/speckit.docs.add.md` | Create feature documentation |

### Workflows
| Command | File | Purpose |
|---------|------|---------|
| `/workflow.fullstack.project` | `commands/workflow.fullstack.project.md` | Scaffold entire Backend + Admin + Mobile |
| `/workflow.nestjs.module` | `commands/workflow.nestjs.module.md` | Add a new NestJS module |
| `/workflow.flutter.feature` | `commands/workflow.flutter.feature.md` | Add a new Flutter feature |
| `/workflow.admin.feature` | `commands/workflow.admin.feature.md` | Add a new admin dashboard page |

### Optional (in `commands/optional/`)
| Command | File | Purpose |
|---------|------|---------|
| `/workflow.rn.feature` | `commands/optional/workflow.rn.feature.md` | Add a React Native feature |
| `/workflow.react.feature` | `commands/optional/workflow.react.feature.md` | Add a standalone React feature |
| `/workflow.cross.feature` | `commands/optional/workflow.cross.feature.md` | Cross-layer feature with docs |

### Git Extension
| Command | File | Purpose |
|---------|------|---------|
| `speckit.git.initialize` | `commands/speckit.git.initialize.md` | Initialize Git repository |
| `speckit.git.feature` | `commands/speckit.git.feature.md` | Create feature branch |
| `speckit.git.commit` | `commands/speckit.git.commit.md` | Auto-commit after Speckit commands |
| `speckit.git.remote` | `commands/speckit.git.remote.md` | Detect Git remote URL |
| `speckit.git.validate` | `commands/speckit.git.validate.md` | Validate branch naming |

## Adding a New Agent

1. Create `agents/<name>.md` with frontmatter:
   ```yaml
   ---
   description: Short description
   mode: primary | subagent
   model: opencode/deepseek-v4-flash-free  # optional, overrides default
   permission:
     edit: allow | deny
     bash: allow | deny
   color: "#hexcolor"
   hidden: false
   ---
   ```
2. Add to `opencode.json` under `"agent"`:
   ```json
   "<name>": {
     "description": "Same description as frontmatter"
   }
   ```
3. If it's a subagent, add orchestration references in primary agents that should call it.

## Adding a New Command

1. Create `commands/<name>.md` with frontmatter:
   ```yaml
   ---
   description: Short description shown in command palette
   handoffs:  # optional
     - label: Next step label
       agent: target-command-name
       prompt: Prefill text
   ---
   ```
2. The command body should reference `$ARGUMENTS` for user input.
3. For Speckit commands, follow the hook checking pattern from existing commands.

## Plugin System

Plugins are JavaScript files in `plugins/` that export async functions returning event handlers:

```js
module.exports.EnvProtection = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      // Intercept tool calls
    },
  }
}
```

Available hooks: `tool.execute.before`, `tool.execute.after`, `message.before`, `message.after`.

## MCP Servers

Configured in `opencode.json` under `"mcp"`:

| Server | Type | Purpose |
|--------|------|---------|
| `github` | Local (npx) | GitHub API access (issues, PRs, code search) |
| `sentry` | Remote | Error monitoring and analysis |
| `context7` | Remote | Library documentation lookup |
| `grep` | Remote | GitHub code search |
| `stitch` | Remote | Google Stitch UI generation |
| `plantuml` | Local (npx) | UML diagram generation |
