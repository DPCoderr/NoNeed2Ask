# Architecture

## Target monorepo structure

The project uses this structure:

```text
src/
  frontend/
  backend/
  apphost/
  service-defaults/
docs/
```

## Frontend

- Framework: Next.js App Router with TypeScript
- Styling: Tailwind CSS with shadcn/ui
- Form handling: `react-hook-form` with `zod` and `@hookform/resolvers`
- Server state: `@tanstack/react-query`
- URL state for MVP: native Next.js `searchParams`

Required routes:

- `/login`
- `/register`
- `/dashboard`
- `/dashboard/applications`
- `/dashboard/settings`
- `/status/[slug]`

The private dashboard can be richer and operational. The public page should stay calm, minimal, and clearly read-only.

## Backend

- Platform: .NET 10
- API style: ASP.NET Core Minimal APIs
- Structure: Vertical Slice Architecture
- Validation: FluentValidation
- Persistence: PostgreSQL with Entity Framework Core
- Auth: ASP.NET Identity with secure cookie auth

Feature slices should be organized by capability instead of generic controllers or services:

- `Features/Auth`
- `Features/Applications`
- `Features/Settings`
- `Features/PublicStatus`

Each slice may contain endpoint mapping, request and response DTOs, validators, and feature-local handler logic.

## Data and security

- All owner dashboard endpoints require authentication.
- Users can only access and mutate their own application records.
- Public status endpoints remain unauthenticated.
- Public responses must use dedicated public DTOs.
- Backend validation remains mandatory even when frontend validation exists.
- `privateNote` must never be exposed through public endpoints.

## Aspire

Aspire is the local orchestration and observability layer for the MVP.

AppHost should orchestrate:

- PostgreSQL container
- backend API
- frontend app as an external Node.js resource

Shared service defaults should provide:

- OpenTelemetry defaults
- service discovery defaults
- resilience defaults where appropriate
- health check defaults

The intended developer experience is to run AppHost and inspect health, logs, and service status through the Aspire dashboard.
