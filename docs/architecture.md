# Architecture

## Visual architecture overview

These Mermaid diagrams describe the target MVP architecture. They live in separate files so this document can stay readable as the design grows:

- [System context](./diagrams/system-context.md)
- [Runtime container architecture](./diagrams/runtime-container-architecture.md)
- [MVP entity relationship model](./diagrams/mvp-erd.md)
- [Owner authentication flow](./diagrams/owner-authentication-flow.md)
- [Private application management flow](./diagrams/private-application-management-flow.md)
- [Public status page flow](./diagrams/public-status-page-flow.md)

## Other flows worth diagramming

The ERD is important, but the visual understanding of this product mostly depends on boundaries and data exposure. These diagrams are the highest-value set for the MVP:

- **System context:** who uses the product and what major services exist.
- **Runtime/container architecture:** where Next.js, ASP.NET Core, PostgreSQL, Aspire, and feature slices fit.
- **ERD:** the owner profile and job applications relationship.
- **Authentication flow:** how the secure cookie is created and used.
- **Private CRUD flow:** how ownership checks protect dashboard data.
- **Public status flow:** how the public DTO prevents private data leakage.
- **Deployment/runtime flow:** useful later when Aspire, Docker, and production hosting are finalized.

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
