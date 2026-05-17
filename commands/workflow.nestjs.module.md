---
description: إضافة وحدة خلفية جديدة (NestJS) — Prisma, DTOs, Service, Controller, Repository
---

Read `.agents/workflows/new-nestjs-module.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Module name: lowercase, /modules/{module-name}
- API endpoints: kebab-case, plural
- All admin routes: /admin/{resource} with @Roles('admin')
- Use DTOs with class-validator everywhere
- Standard response: { success: boolean, data: T, message?: string, meta?: PaginationMeta }

Generate ALL files (Prisma model update + migration flag, DTOs, service, controller, repository, module registration in app.module.ts, Swagger docs).
