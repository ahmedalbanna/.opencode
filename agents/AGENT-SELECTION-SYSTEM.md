# Agent Selection System

## Overview
This system enables dynamic agent selection based on:
- **Tech Stack Detection**: Automatically identifies programming languages, frameworks, and tools
- **Project Type**: Web, Mobile, Desktop, Cloud, IoT, AI/ML, Blockchain, etc.
- **Architecture Pattern**: DDD, MVC, Microservices, Serverless, Event-Driven, etc.
- **Project Phase**: Planning, Implementation, Testing, Deployment, Maintenance

## Agent Categories

### 1. **Core Agents** (Project Leadership)
- `software-architect.md` - Overall architecture decisions
- `product-manager.md` - Requirements, user stories, prioritization
- `backend-developer.md` - Server-side logic (language-agnostic)
- `frontend-developer.md` - Client-side UI/UX (language-agnostic)
- `full-stack-developer.md` - End-to-end development

### 2. **Language-Specific Agents** (Implementation)
- `python-developer.md`, `javascript-developer.md`, `typescript-specialist.md`
- `java-developer.md`, `cpp-developer.md`, `go-developer.md`, `rust-developer.md`
- `php-developer.md`, `ruby-developer.md`, `kotlin-developer.md`, `scala-developer.md`
- `dart/flutter-developer.md`, `swift/ios-developer.md`, `kotlin/android-developer.md`

### 3. **Framework-Specific Agents** (Specialized Implementation)
- `react-developer.md`, `angular-developer.md`, `vue-developer.md`, `nextjs-developer.md`
- `django-developer.md`, `spring-boot-developer.md`, `aspnet-core-developer.md`
- `laravel-developer.md`, `nodejs-developer.md`

### 4. **Infrastructure & DevOps Agents**
- `devops-engineer.md`, `aws-architect.md`, `kubernetes-specialist.md`
- `docker-specialist.md`, `terraform-engineer.md`, `cicd-pipeline-engineer.md`
- `linux-engineer.md`, `network-engineer.md`

### 5. **Specialized Domain Agents**
- `ai-engineer.md`, `ml-engineer.md`, `data-engineer.md`, `mlops-engineer.md`
- `blockchain-developer.md`
- `cyber-security-specialist.md`, `devsecops-engineer.md`
- `qa-engineer.md`, `ux-design-specialist.md`

### 6. **Database & Storage Agents**
- `postgresql-dba.md`, `mongodb-specialist.md`, `redis-specialist.md`
- `elasticsearch-specialist.md`, `sql-specialist.md`

### 7. **Support Agents**
- `technical-writer.md`, `prompt-engineering-specialist.md`
- `git-specialist.md`, `github-actions-specialist.md`
- `css-specialist.md`, `tailwind-css-specialist.md`
- `graphql-specialist.md`, `api-designer.md`

## Selection Algorithm

```javascript
// 1. Detect Tech Stack from spec/plan
const detectedStack = detectTechStack(specContent, planContent);

// 2. Select Primary Agent based on project type
const primaryAgent = selectPrimaryAgent(detectedStack);

// 3. Form Team based on project complexity
const team = formAgentTeam({
  primaryAgent,
  detectedStack,
  projectPhase,
  complexity: estimateComplexity(spec)
});

// 4. Load agent instructions and skills
loadAgentContext(team);
```

## Configuration

### Tech Stack Detection Rules
Located in `.opencode/agents/tech-stack-rules.yml`:
- Language patterns (regex)
- Framework patterns
- Database patterns
- Infrastructure patterns

### Agent Team Templates
Located in `.opencode/agents/team-templates/`:
- `web-app.yml` - Standard web application team
- `mobile-app.yml` - Mobile application team
- `microservices.yml` - Microservices architecture team
- `ai-ml.yml` - AI/ML project team
- `blockchain.yml` - Blockchain project team

### Architecture Patterns
Located in `.opencode/agents/architecture-patterns/`:
- `ddd.yml` - Domain-Driven Design
- `mvc.yml` - Model-View-Controller
- `microservices.yml` - Microservices
- `serverless.yml` - Serverless/FaaS
- `event-driven.yml` - Event-Driven Architecture

## Usage

### Automatic Selection (Speckit Integration)
```bash
/speckit.plan  # Automatically detects stack and loads agents
/speckit.implement  # Uses same team from planning phase
```

### Manual Selection
```bash
/select-agent --tech-stack "Python, Django, PostgreSQL" --phase planning
/select-agent --project-type "mobile-app" --architecture "mvvm"
```

### Custom Team Composition
```bash
/create-team --primary "software-architect" --helpers "python-developer,postgresql-dba,devops-engineer"
```

## Integration with Existing System

### Backward Compatibility
- Existing agents in `.opencode/agents/` remain functional
- New system detects and integrates with existing agents
- Falls back to existing `agents-config.yml` if no match found

### Speckit Workflow Enhancement
```
/speckit.specify
  ↓
/speckit.plan  → [NEW] Agent Selection → Load team context
  ↓              ↓
/speckit.tasks  → Assign tasks to team members
  ↓
/speckit.implement → Execute with selected team
```

## Example: Web Application Project

**Detected Stack**: TypeScript, React, NestJS, PostgreSQL

**Selected Team**:
- **Primary**: `software-architect.md` (overall design)
- **Backend**: `typescript-specialist.md` + `nodejs-developer.md`
- **Frontend**: `react-developer.md`
- **Database**: `postgresql-dba.md`
- **DevOps**: `docker-specialist.md`

**Phases**:
1. **Planning**: `software-architect`, `product-manager`
2. **Implementation**: `typescript-specialist`, `react-developer`, `postgresql-dba`
3. **Testing**: `qa-engineer`, `typescript-specialist`, `react-developer`
4. **Deployment**: `devops-engineer`, `docker-specialist`, `cicd-pipeline-engineer`

## Example: Mobile App Project

**Detected Stack**: Flutter, Dart, Firebase

**Selected Team**:
- **Primary**: `software-architect.md`
- **Mobile**: `flutter-developer.md`
- **Backend**: `firebase-specialist.md` (if available) or `nodejs-developer.md`
- **UI/UX**: `ux-design-specialist.md`

## Example: AI/ML Project

**Detected Stack**: Python, TensorFlow, PyTorch, PostgreSQL

**Selected Team**:
- **Primary**: `ml-engineer.md`
- **Data**: `data-engineer.md`, `python-developer.md`
- **Infrastructure**: `aws-architect.md` (for GPU instances)
- **MLOps**: `mlops-engineer.md`

## Benefits

1. **Flexibility**: Adapt to any tech stack or architecture
2. **Scalability**: Add new agents without breaking existing workflow
3. **Intelligence**: Automatic detection and team formation
4. **Consistency**: Maintain quality across different project types
5. **Extensibility**: Easy to add new languages, frameworks, or domains