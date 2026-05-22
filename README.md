# Job Search Status

Job Search Status is a private job application tracker with a calm public status page. It is meant to help a job seeker keep friends and family updated without repeated check-in messages.

This repository is organized as a small monorepo with:

- `src/frontend`: Next.js App Router frontend
- `src/backend`: ASP.NET Core Minimal API backend
- `src/apphost`: .NET Aspire AppHost
- `src/service-defaults`: Aspire shared service defaults
- `docs`: product and architecture documentation

## MVP goals

- Let an owner register and sign in securely
- Let the owner manage their own job applications privately
- Let the owner choose a public slug and toggle public sharing on or off
- Provide a read-only public status page for visitors
- Keep private notes and private application data off the public page

## Documentation

- [Product requirements](./docs/product-requirements.md)
- [Architecture](./docs/architecture.md)

## Planned local development flow

The intended local workflow for the MVP is:

1. Run the Aspire AppHost
2. Aspire starts PostgreSQL, the backend API, and the frontend app
3. Use the Aspire dashboard for logs, health checks, and service visibility

## MVP stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- Forms: `react-hook-form`, `zod`, `@hookform/resolvers`
- Server state: `@tanstack/react-query`
- Backend: .NET 10, ASP.NET Core Minimal APIs
- Backend structure: Vertical Slice Architecture
- Validation: FluentValidation
- Database: PostgreSQL with Entity Framework Core
- Auth: ASP.NET Identity with secure cookie-based authentication
- Orchestration and observability: .NET Aspire, OpenTelemetry defaults, Aspire dashboard
