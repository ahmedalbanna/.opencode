---
description: إضافة ميزة جديدة في تطبيق React (غير الإدارة)
---

Read `.agents/workflows/new-react-feature.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Feature name: lowercase, /features/{feature-name}
- Screens: PascalCase with suffix (e.g. ProductsPage)
- Use TanStack Query for server state, Zustand/Context only for UI state
- Handle loading | error | empty states in every screen
- API calls via hooks (useProductsQuery, useCreateProductMutation)

Generate ALL files: API layer, hooks, pages, route registration, shared component usage.
