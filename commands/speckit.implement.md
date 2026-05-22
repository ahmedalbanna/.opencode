---
description: Execute tasks from tasks.md and generate code for the current feature.
handoffs:
  - label: Analyze Implementation
    agent: speckit.analyze
    prompt: Analyze the implementation for consistency
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Pre-Execution Checks

**Check for extension hooks (before implementation)**:
- Check if `.specify/extensions.yml` exists in the project root.
- If it exists, read it and look for entries under the `hooks.before_implement` key
- If the YAML cannot be parsed or is invalid, skip hook checking silently and continue normally
- Filter out hooks where `enabled` is explicitly `false`. Treat hooks without an `enabled` field as enabled by default.
- For each remaining hook, do **not** attempt to interpret or evaluate hook `condition` expressions:
  - If the hook has no `condition` field, or it is null/empty, treat the hook as executable
  - If the hook defines a non-empty `condition`, skip the hook and leave condition evaluation to the HookExecutor implementation
- For each executable hook, output the following based on its `optional` flag:
  - **Optional hook** (`optional: true`):
    ```
    ## Extension Hooks

    **Optional Pre-Hook**: {extension}
    Command: `/{command}`
    Description: {description}

    Prompt: {prompt}
    To execute: `/{command}`
    ```
  - **Mandatory hook** (`optional: false`):
    ```
    ## Extension Hooks

    **Automatic Pre-Hook**: {extension}
    Executing: `/{command}`
    EXECUTE_COMMAND: {command}

    Wait for the result of the hook command before proceeding to the Execution Steps.
    ```
- If no hooks are registered or `.specify/extensions.yml` does not exist, skip silently

## Execution Steps

1. **Load feature context**: Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` from repo root and parse:
   - `FEATURE_DIR`
   - `FEATURE_SPEC` (spec.md)
   - `IMPL_PLAN` (plan.md)
   - `TASKS` (tasks.md)
   - For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load artifacts**:
   - Read `spec.md` for functional requirements and success criteria
   - Read `plan.md` for technical architecture and stack decisions
   - Read `tasks.md` for the ordered task list with IDs and dependencies

3. **Execute tasks in order**:
   - Process tasks sequentially respecting `[P]` parallel markers
   - For each task:
     - Read the task description and referenced file paths
     - Create or modify files as specified
     - Follow coding standards from `.agents/rules/ai-rules.md`
     - Use the appropriate agent based on the task's layer (backend → `@backend-dev`, admin → `@admin-dev`, mobile → `mobile/SYSTEM.md`)

4. **Quality gates** (after each phase):
   - Backend: Prisma schema valid, DTOs have class-validator, Swagger decorators present
   - Admin: TanStack Query hooks working, Ant Design components rendering, routes registered
   - Mobile: BLoC states compile, GoRouter paths valid, DI registrations complete

5. **Report progress**:
   - Output completed task IDs
   - List files created/modified
   - Flag any tasks that couldn't be completed (with reasons)

6. **Post-implementation**:
   - Suggest running `/speckit.analyze` for cross-artifact consistency check
   - Suggest running `/speckit.checklist` for domain-specific quality checks

## Post-Execution Checks

**Check for extension hooks (after implementation)**:
- Check if `.specify/extensions.yml` exists in the project root.
- If it exists, read it and look for entries under the `hooks.after_implement` key
- If the YAML cannot be parsed or is invalid, skip hook checking silently and continue normally
- Filter out hooks where `enabled` is explicitly `false`. Treat hooks without an `enabled` field as enabled by default.
- For each remaining hook, do **not** attempt to interpret or evaluate hook `condition` expressions:
  - If the hook has no `condition` field, or it is null/empty, treat the hook as executable
  - If the hook defines a non-empty `condition`, skip the hook and leave condition evaluation to the HookExecutor implementation
- For each executable hook, output the following based on its `optional` flag:
  - **Optional hook** (`optional: true`):
    ```
    ## Extension Hooks

    **Optional Hook**: {extension}
    Command: `/{command}`
    Description: {description}

    Prompt: {prompt}
    To execute: `/{command}`
    ```
  - **Mandatory hook** (`optional: false`):
    ```
    ## Extension Hooks

    **Automatic Hook**: {extension}
    Executing: `/{command}`
    EXECUTE_COMMAND: {command}
    ```
- If no hooks are registered or `.specify/extensions.yml` does not exist, skip silently
