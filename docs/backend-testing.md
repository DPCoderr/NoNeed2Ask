# Backend Testing

## Strategy

Backend endpoint behavior should be tested primarily with integration tests. Auth and application endpoints rely on ASP.NET Core routing, authorization, Identity cookies, FluentValidation endpoint filters, EF Core, migrations, and PostgreSQL constraints. Unit tests are still useful, but only for small pure logic such as validators.

Use xUnit for both test styles:

- Integration tests exercise real HTTP requests through `WebApplicationFactory<Program>`.
- Validator tests instantiate FluentValidation validators directly.
- Avoid EF InMemory and SQLite for endpoint tests because production uses PostgreSQL and ASP.NET Identity.

## Packages

The backend test project should use:

- `xunit` for tests.
- `xunit.runner.visualstudio` for IDE and `dotnet test` discovery.
- `Microsoft.NET.Test.Sdk` for the .NET test host.
- `Microsoft.AspNetCore.Mvc.Testing` for `WebApplicationFactory` and `TestServer`.
- `Testcontainers.PostgreSql` for disposable PostgreSQL databases.
- `FluentAssertions` for readable assertions.

`Respawn` can be added later if recreating databases or containers becomes too slow.

## Running Tests

Run all backend tests from the repository root:

```powershell
dotnet test src/NoNeed2Ask.sln
```

Integration tests require Docker because Testcontainers starts PostgreSQL in a container. CI must provide a Docker-capable runner.

## Auth Endpoint Matrix

`POST /auth/register`

- Returns `200 OK` for valid username, email, password, and `rememberMe`.
- Returns `id`, `username`, and `email` only.
- Signs the user in so `GET /auth/me` succeeds afterward.
- Returns `400 ValidationProblem` for missing username, invalid email, short password, and passwords missing a number, lowercase letter, uppercase letter, or special character.
- Returns `400 ValidationProblem` for duplicate email or duplicate username.

`POST /auth/login`

- Returns `200 OK` for correct credentials.
- Signs the user in so `GET /auth/me` succeeds afterward.
- Returns `401 ProblemDetails` for unknown email and wrong password.
- Returns `400 ValidationProblem` for invalid email or missing password.

`GET /auth/me`

- Returns `401` when unauthenticated.
- Returns current user details when authenticated.
- Does not expose password hashes, roles, claims, or internal Identity fields.

`POST /auth/logout`

- Returns `401` when unauthenticated.
- Returns `204 NoContent` when authenticated.
- Clears auth so a later `GET /auth/me` returns `401`.

## Application Endpoint Matrix

Authorization and ownership:

- Every `/applications` endpoint returns `401` when unauthenticated.
- Malformed authenticated user identifiers return `401`.
- One user cannot list, get, update, or delete another user's applications.

`POST /applications`

- Returns `201 Created` for valid requests.
- Includes a `Location` header for the created application.
- Persists all request fields.
- Allows nullable `publicNote`, `privateNote`, `lastContactAt`, and `nextActionAt`.
- Returns `400 ValidationProblem` for empty or overlong company name, empty or overlong job title, empty/invalid/overlong status, overlong public note, and overlong private note.

`GET /applications`

- Returns `200 OK` with an empty array for a new user.
- Returns only the authenticated user's applications.
- Includes owner-only fields such as `privateNote`.
- Does not expose `userId`.

`GET /applications/{id}`

- Returns `200 OK` for the owner.
- Returns `404` for missing ids.
- Returns `404` for another user's application.
- Includes `privateNote` for the owner-only response.

`PUT /applications/{id}`

- Returns `204 NoContent` for valid owner updates.
- Updates all editable fields.
- Changes `updatedAt`.
- Returns `404` for missing ids.
- Returns `404` for another user's application.
- Returns `400 ValidationProblem` for the same invalid field cases as create.

`DELETE /applications/{id}`

- Returns `204 NoContent` for owner deletes.
- Removes the record from later get/list responses.
- Returns `404` for missing ids.
- Returns `404` for another user's application and does not delete it.

## Future Endpoint Rule

Every new backend endpoint should include tests for:

- Success behavior.
- Request validation.
- Unauthenticated access when authorization is required.
- Not-found and ownership boundaries where applicable.
- Response shape, especially for private vs public DTOs.
