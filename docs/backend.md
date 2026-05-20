# Backend Implementation Guide

## Purpose

This document defines the backend tools, feature structure, and code rules for the Job Search Status MVP.
Use it to keep the API secure, consistent, and easy to extend.

## Stack and when to use each tool

### ASP.NET Core Minimal APIs

Use Minimal APIs for all HTTP endpoints in the MVP.

Use them for:

- auth endpoints
- applications endpoints
- settings endpoints
- public status endpoints

Keep endpoint registration in feature-specific extension methods such as `MapAuthEndpoints()` and `MapApplicationEndpoints()`.

Do not introduce MVC controllers for this MVP.

### Vertical Slice Architecture

Organize backend code by feature, not by technical layer.

Use slices such as:

- `Features/Auth`
- `Features/Applications`
- `Features/Settings`
- `Features/PublicStatus`

Each slice may contain:

- endpoint mapping
- request DTOs
- response DTOs
- validators
- slice-local handlers or query logic

Avoid large generic folders like `Controllers`, `Services`, and `Repositories`.

### Entity Framework Core

Use EF Core for persistence and database access.

Use it for:

- application records
- public profile settings
- ASP.NET Identity data
- migrations

Prefer standard EF Core mapping and query patterns before adding custom data access layers.

### PostgreSQL

Use PostgreSQL as the only relational database for the MVP.

Use it for:

- Identity tables
- application data
- public profile data

Keep provider-specific behavior limited to configuration and migrations where possible.

### ASP.NET Identity

Use ASP.NET Identity for registration, login, logout, and current-user handling.

Use it for:

- account creation
- secure cookie-based auth
- user ownership checks through the authenticated identity

Do not add external auth providers for the MVP.

### FluentValidation

Use FluentValidation for backend request validation.

Use it for:

- required fields
- max lengths
- valid status values
- public slug rules
- request-level guardrails before persistence

Validation belongs on the backend even if the frontend already validates the same form.

### .NET Aspire

Use Aspire as the local orchestration layer.

Use it for:

- AppHost
- PostgreSQL resource configuration
- service discovery
- health checks
- OpenTelemetry defaults

Keep AppHost focused on composition, not business logic.

## Endpoint rules

- Keep `Program.cs` minimal.
- Register feature endpoints through extension methods.
- Group public and authenticated endpoints clearly.
- Require authentication for all owner-only endpoints.
- Keep the public status endpoint unauthenticated.
- Return DTOs, not EF entities.

## Security rules

- Users may only access and mutate their own applications.
- Public endpoints must use dedicated public DTOs.
- `privateNote` must never be returned by public endpoints.
- Use secure cookie defaults appropriate for HTTPS-ready local development.
- Keep auth secrets and connection secrets out of the frontend.
- Validate ownership on reads, updates, and deletes, not just creates.

## Data rules

- Keep entities explicit and easy to read.
- Use clear enum or constant handling for application status values.
- Keep public profile settings separate from public-facing response models.
- Add migrations intentionally and keep them aligned with the current model state.
- Avoid leaking persistence-only concerns into API contracts.

## Readability rules

- Keep each feature slice small and easy to scan.
- Prefer straightforward request-to-handler flow over heavy abstraction.
- Use names that match the product language: `Application`, `PublicProfileSettings`, `PublicStatus`.
- Keep query logic close to the feature that owns it unless reuse is real and proven.
- Favor short files with single responsibilities where practical.
- Add comments sparingly and only when the why is not obvious from the code.

## Clean code rules

- Reuse framework capabilities before inventing custom infrastructure.
- Do not create repository layers unless they remove real complexity.
- Keep validation logic close to the request models it protects.
- Keep public DTOs and private DTOs separate even if they look similar.
- Do not expose fields “for convenience” if they are not part of the contract.
- Prefer explicit mapping over magical implicit behavior when shaping API responses.

## Error handling rules

- Return consistent validation errors.
- Keep not-found, unauthorized, and forbidden cases easy to distinguish.
- Avoid catching exceptions just to rewrap everything generically.
- Handle known domain and ownership failures deliberately near the feature slice that owns them.

## File and folder expectations

- `Database/`: `AppDbContext`, entities, configurations, migrations
- `Features/Auth/`: register, login, logout, me
- `Features/Applications/`: create, list, get by id, update, delete
- `Features/Settings/`: get and update public profile settings
- `Features/PublicStatus/`: get public status by slug
- `Shared/`: small cross-cutting helpers only when they truly serve multiple slices

## What to avoid

- MVC controller sprawl
- generic repository layers by default
- leaking EF entities directly through endpoints
- mixing public and private response contracts
- business logic hidden in `Program.cs`
- skipping backend validation because the frontend already checks it
