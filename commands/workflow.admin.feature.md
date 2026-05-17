---
description: إضافة صفحة/وحدة جديدة في لوحة تحكم React (Ant Design)
---

Read `.agents/workflows/new-admin-feature.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Feature name: lowercase, /features/{feature-name}
- Pages: PascalCase with suffix (e.g. ProductsManagementPage)
- TanStack Query for server state
- All admin API endpoints start with /admin/{resource}
- Use Ant Design components (Table, Form, Modal, Button)
- Handle loading | error | empty states
- Role protection — @Roles('admin') on backend, role check on frontend

Generate ALL files: API functions, React Query hooks, Ant Design pages/components, route registration.
