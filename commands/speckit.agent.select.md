---
description: Detect tech stack from spec/plan, select matching engineer agent, and load relevant domain skills into AI context.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Detect Tech Stack**: Read `spec.md` and/or `plan.md` from the current feature directory (resolved via `.specify/feature.json`). Scan for technology keywords (languages, frameworks, databases, services).

2. **Load Agent Configuration**: Read `.specify/extensions/agents/agents-config.yml`. Parse:
   - `engineer_selection.tech_stacks[]` — ordered list of pattern → engineer mappings
   - `skill_mappings[]` — pattern → skill list mappings
   - `default_engineer` — fallback

3. **Select Engineer Agent**:
   - For each tech_stack entry, check if its `pattern` regex matches any content in `spec.md` or `plan.md`
   - Take the **first match** (entries are ordered most-specific to most-general)
   - If the matched entry has `sub_agents`, load all of them (root architect pattern)
   - If no match, use `default_engineer`
   - Engineer path is relative to `.agents/system/engineers/`

4. **Select Domain Skills**:
   - For each skill_mapping entry, check if its `pattern` regex matches any content in `spec.md` or `plan.md`
   - Collect all matching skill names
   - Skill path is `.agents/skills/system_skills/<name>/SKILL.md`

5. **Load Context**: The AI MUST load the following into working memory:
   - The selected engineer's `SYSTEM.md` content (primary persona)
   - If sub_agents exist, their `SYSTEM.md` content (secondary personas)
   - Each matched skill's `SKILL.md` content (domain expertise)

6. **Report Selection**:

   ```text
   ## Agent Context Loaded

   **Engineer**: <engineer path>
   **Sub-Agents**: <sub-agent paths or none>
   **Skills**: <skill names or none>
   **Source**: <spec.md / plan.md tech stack match>
   ```

7. **Proceed**: The loaded context is now available for the calling command (plan, implement, etc.). The AI should use the loaded agent persona and skill guidance when executing subsequent steps.

## Key Rules

- Paths are relative to the repository root
- `.agents/` is the canonical source — do NOT duplicate files
- If `agents-config.yml` is missing, skip selection silently and use default behavior
- If a SYSTEM.md or SKILL.md file is missing, skip that entry and warn once
- For skill files, load the full SKILL.md content only if it fits in context; otherwise load the first 100 lines with a note
- The `pattern` field supports regex — match case-insensitively
