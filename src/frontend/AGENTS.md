<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## React guidance

- Do not use `useEffect` for frontend changes. Prefer event handlers, derived render state, framework data APIs, React Query, nuqs, or purpose-built hooks that avoid effect-based synchronization.

## Frontend architecture

- Keep `page.tsx`, `layout.tsx`, and route handlers thin: load/validate data and compose feature components.
- Keep route-only code next to its route in `_components` or `_lib`. Put UI shared by multiple routes in `components/<feature>` and non-React logic in `lib/<feature>`.
- Use Server Components by default. Add `"use client"` only at the smallest boundary that needs browser state, event handlers, or client libraries.
- Keep one application React component per file. Small callbacks and non-component helper functions may remain with their owner.
- Treat `components/ui/**` as generated shadcn primitives. They may expose related primitives from one file and are exempt from application size rules.

## KISS and DRY

- Prefer explicit props and small cohesive modules over generic wrappers, hidden context, or speculative abstractions.
- Extract code when it has a separate responsibility, is used twice, or makes a file/function exceed the lint limits. Do not extract one-off expressions merely to reduce line count.
- Keep one source of truth for domain labels, query keys, API URL construction, and server endpoint configuration.
- Import from the concrete module that owns a symbol; do not introduce broad barrel files.
- Preserve route behavior, accessibility, loading/error states, and responsive styling during refactors.

## Required verification

- Application files must stay within 250 lines, functions within 150 lines, and cyclomatic complexity within 15; ESLint enforces these limits outside `components/ui/**`.
- Add or update focused tests for changed behavior and pure transformation logic.
- Run `npm run check` before handing off a frontend change. During iteration, use `npm run lint`, `npm run typecheck`, and `npm run test` separately for faster feedback.
