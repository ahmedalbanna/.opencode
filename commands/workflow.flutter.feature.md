---
description: إضافة ميزة جديدة في تطبيق Flutter
---

Read `.agents/workflows/new-flutter-feature.md` then follow its instructions.

From `.agents/rules/ai-rules.md`:
- Feature name: lowercase, /features/{feature-name}
- Pages: PascalCase with suffix (e.g. ProductsScreen)
- Use BLoC/Cubit for state management
- Use Either<Failure, Data> pattern (dartz or custom result type)
- Dependency injection via GetIt with injectable

Generate ALL files: entity, model, repository interface/impl, use cases, BLoC, pages, routes (GoRouter), DI registration.
