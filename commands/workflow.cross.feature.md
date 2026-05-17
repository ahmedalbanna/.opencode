---
description: ميزة جديدة عبر كل الطبقات (NestJS + React + Flutter/RN) مع توثيق
---

Read `.agents/workflows/new-feature.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Backend module: lowercase, /modules/{name}
- Frontend features: lowercase, /features/{name}
- API endpoints: kebab-case, plural
- Standard response shape across ALL endpoints
- All API calls and DTOs must match exactly between backend and clients
- Generate documentation in corresponding docs/ folders using the template at `.agents/docs/templates/feature-template.md`
- Output ALL backend, admin, and mobile files in one response
