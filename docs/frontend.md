# Frontend Implementation Guide

## Purpose

This document defines the frontend tools, patterns, and code rules for the Job Search Status MVP.
Use it to keep the Next.js app consistent, readable, and calm in tone.

## Stack and when to use each tool

### Next.js App Router

Use Next.js App Router for all frontend routes and layouts.

Use it for:

- route files under `src/frontend/app`
- nested dashboard layouts
- the public status page route
- route-level data boundaries and loading states where helpful

Do not introduce Pages Router patterns.

### TypeScript

Use TypeScript everywhere in the frontend.

Use it for:

- component props
- form values
- API DTO types
- shared status and settings types

Avoid `any` unless there is no practical alternative.

### Tailwind CSS

Use Tailwind for layout, spacing, typography, and visual styling.

Use it for:

- page composition
- responsive layout
- spacing and sizing
- state styling

Avoid large custom CSS files unless a small global rule is clearly better than repeated utilities.

### shadcn/ui

Use shadcn/ui as the default component foundation.

Use it for:

- form controls
- dialogs
- tables
- switches
- layout primitives already provided by the chosen blocks

Prefer extending existing shadcn components over inventing parallel component systems.

### react-hook-form + zod + @hookform/resolvers

Use these for user-editable forms.

Use them for:

- login
- registration
- application create and edit
- public settings updates

Keep schemas close to the form or in a small shared validation area when reused.

### @tanstack/react-query

Use React Query for all API reads and writes.

Use it for:

- fetching authenticated dashboard data
- fetching public status data
- mutations for auth, applications, and settings
- loading and error states
- cache updates after create, edit, delete, or toggle actions

Do not introduce Redux, MobX, or ad hoc global fetch state for MVP data flows.

### Next.js searchParams

Use native search params only for simple MVP URL state.

Use them for:

- basic filters
- sort or view mode if needed later

Do not add `nuqs` unless URL state becomes meaningfully more complex.

## UI direction

### Private dashboard

The dashboard should feel:

- calm
- minimal
- professional
- work-focused

It can be denser and more operational than the public page, but it should not feel noisy or over-designed.

### Public status page

The public page should feel:

- quiet
- supportive
- read-only
- low-pressure

It must not look like a recruiter dashboard, CRM, or admin panel.

## Component rules

- Prefer small reusable components with clear responsibilities.
- Keep shared UI in `components/ui`.
- Keep feature-oriented components in folders like `components/dashboard`, `components/forms`, and `components/public`.
- Prefer composition over deeply configurable mega-components.
- If a component is only used once and is simple, keep it close to the route that owns it.

## Data and API rules

- Keep API calls in a small `lib/api` area.
- Keep API request and response shapes typed.
- Never let the public page depend on private dashboard DTOs.
- Handle loading, empty, and error states explicitly.
- Prefer invalidating or updating the smallest useful query after mutations.

## Form rules

- Every user-editable form should have frontend validation.
- Mirror backend constraints where reasonable, but never rely on frontend validation alone.
- Keep field names aligned with backend contracts unless there is a clear UX reason to map them.
- Show actionable validation and API error messages.

## Readability rules

- Keep files focused. Split files when a component starts handling unrelated concerns.
- Prefer straightforward control flow over clever abstractions.
- Use descriptive names for components, hooks, props, and query keys.
- Avoid deeply nested JSX where extracting a small subcomponent improves scanning.
- Keep route files thin when possible and move repeated UI into components.
- Prefer explicit state names like `isSaving`, `isDeleting`, and `hasPublicSharing`.
- Keep utility helpers small and unsurprising.

## Clean code rules

- Reuse existing patterns before adding new abstractions.
- Do not introduce a custom state management layer for MVP needs already covered by React Query and forms.
- Do not mix public-page concerns with dashboard-only concerns in the same component.
- Avoid one-off styling patterns when a shared primitive already exists.
- Add comments only when intent is hard to infer from the code itself.

## File and folder expectations

- `app/`: routes and layouts
- `components/ui/`: shadcn primitives
- `components/dashboard/`: private dashboard components
- `components/forms/`: form-specific UI
- `components/public/`: public status page components
- `lib/api/`: fetch helpers and endpoint wrappers
- `lib/validation/`: zod schemas when reused
- `hooks/`: small reusable frontend hooks
- `types/`: shared frontend-only or API-facing types

## What to avoid

- Redux
- MobX
- Chakra UI
- MUI
- Ant Design
- untyped API calls
- mixing server state and local form state carelessly
- oversized components that own layout, fetching, mutation logic, and form rendering all at once
