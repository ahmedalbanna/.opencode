---
description: Select and load appropriate agents based on project requirements, tech stack, and phase
---

# Agent Selection Command

## Usage

```bash
/select-agent [options]
```

## Options

- `--tech-stack` or `-t`: Comma-separated list of technologies (e.g., "Python,Django,PostgreSQL")
- `--project-type` or `-p`: Project type (e.g., "web-app", "mobile-app", "api-service", "ai-ml")
- `--architecture` or `-a`: Architecture pattern (e.g., "ddd", "mvc", "microservices", "serverless")
- `--phase` or `-f`: Project phase (e.g., "planning", "implementation", "testing", "deployment")
- `--primary` or `-P`: Force specific primary agent
- `--helpers` or `-H`: Comma-separated list of helper agents

## Auto-Detection Mode

If no options provided, command will:
1. Read `spec.md` and `plan.md` from current feature
2. Detect tech stack from content
3. Detect project type and architecture
4. Select appropriate agent team
5. Load agent instructions and skills

## Examples

### Auto-detect from spec
```bash
/select-agent
```

### Specify tech stack
```bash
/select-agent -t "Python,Django,PostgreSQL" -p "web-app" -f "implementation"
```

### Specify project type
```bash
/select-agent -p "mobile-app" -a "mvvm" -f "planning"
```

### Force specific agents
```bash
/select-agent -P "ml-engineer" -H "python-developer,data-engineer" -f "implementation"
```

## Output Format

```markdown
## Agent Team Selected

**Primary Agent**: [agent-name]
**Helper Agents**: [agent1, agent2, agent3]

**Detected Stack**:
- Language: [language]
- Framework: [framework]
- Database: [database]
- Infrastructure: [infrastructure]

**Architecture**: [architecture-pattern]
**Project Type**: [project-type]
**Phase**: [phase]

**Loading**:
- [✓] agents/[primary-agent].md
- [✓] agents/[helper1].md
- [✓] agents/[helper2].md
- [✓] skills/[skill1].md
- [✓] skills/[skill2].md

**Next Steps**:
- Run /speckit.plan to create implementation plan
- Run /speckit.implement to execute with selected team
```

## Implementation Logic

1. **Parse Options**: Extract user-provided parameters
2. **Auto-Detect** (if no options):
   - Load `spec.md` and `plan.md`
   - Scan for tech stack keywords
   - Match against `tech-stack-rules.yml`
3. **Select Primary Agent**:
   - Based on project type and detected stack
   - Respect `--primary` override if provided
4. **Form Team**:
   - Add helper agents based on complexity
   - Add phase-specific agents (e.g., `qa-engineer` for testing phase)
   - Respect `--helpers` override if provided
5. **Load Context**:
   - Read agent `SYSTEM.md` files from `.agents/system/engineers/`
   - Read agent definitions from `.opencode/agents/`
   - Load matching skills from `.agents/skills/system_skills/`
6. **Report**: Display selected team and loaded context

## Integration with Speckit

### /speckit.plan
```bash
/speckit.plan
  ↓
[Auto-detect tech stack from spec.md]
  ↓
/select-agent (automatic)
  ↓
[Load agent team]
  ↓
[Generate plan with selected agents]
```

### /speckit.implement
```bash
/speckit.implement
  ↓
[Use agents from planning phase]
  ↓
[Execute tasks with team]
```

## Phase-Based Agent Selection

### Planning Phase
- **Primary**: `software-architect` or `product-manager`
- **Helpers**: Based on detected tech stack
- **Focus**: Requirements analysis, architecture design, technology selection

### Implementation Phase
- **Primary**: Language-specific developer (e.g., `python-developer`, `react-developer`)
- **Helpers**: Framework specialists, database experts
- **Focus**: Code generation, implementation following plan

### Testing Phase
- **Primary**: `qa-engineer` or `test-writer`
- **Helpers**: Implementation agents for test fixes
- **Focus**: Test writing, test execution, bug reporting

### Deployment Phase
- **Primary**: `devops-engineer`
- **Helpers**: Infrastructure specialists, security experts
- **Focus**: CI/CD setup, containerization, deployment configuration

## Team Size Guidelines

| Project Complexity | Team Size | Composition |
|-------------------|-----------|-------------|
| Simple (MVP) | 2-3 agents | 1 primary + 1-2 helpers |
| Medium | 3-5 agents | 1 primary + 2-4 helpers |
| Complex | 5-7 agents | 1 primary + 4-6 helpers + phase specialists |
| Enterprise | 7+ agents | Multiple primary agents + specialists per domain |

## Fallback Strategy

If auto-detection fails or no match found:
1. Try broader category match (e.g., "backend-developer" instead of "django-developer")
2. Fall back to generic agents (`backend-developer`, `frontend-developer`)
3. Use `software-architect` as primary for complex decisions
4. Warn user and suggest manual agent selection