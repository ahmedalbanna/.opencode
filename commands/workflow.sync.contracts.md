---
description: مزامنة عقود API بين الخلف والواجهات (توليد TypeScript/Dart نماذج)
---

Read `.agents/workflows/sync-api-contracts.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Standard response shape: { success: boolean, data: T, message?: string, meta?: PaginationMeta }
- All fields must match EXACTLY between backend (NestJS DTOs), React (TypeScript interfaces), and Flutter (Dart models)
- Output the files that need to be created/updated in each client

Read the current backend DTOs from `/backend/src/modules/`, then generate/update:
1. TypeScript interfaces in `/admin/src/types/` or `/mobile/src/types/`
2. Dart models in `/flutter_app/lib/core/models/`
