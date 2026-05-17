---
description: إضافة ميزة جديدة في تطبيق React Native
---

Read `.agents/workflows/new-react-native-feature.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Feature name: lowercase, /features/{feature-name}
- Screens: PascalCase with suffix (e.g. ProductsScreen)
- Use TanStack Query for server state
- Use functional components and hooks
- Handle loading | error | empty states in every screen
- Navigation with auth guards

Generate ALL files: data layer (API), hooks (useQuery/useMutation), screens, navigation registration.
