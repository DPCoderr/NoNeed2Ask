# Owner Authentication Flow

This document describes the implemented ASP.NET Identity cookie auth flow.
Use it when you need to remember how the frontend knows whether a user is logged in and how it learns who that user is.

## Important idea

The frontend does not decode the Identity cookie.

It uses the cookie in two ways:

- Route/layout checks only ask: "Does the `.AspNetCore.Identity.Application` cookie exist?"
- User identity is loaded by calling `GET /auth/me`, which asks the backend to turn the cookie into `{ id, username, email }`.

Relevant files:

- Backend auth setup: `src/backend/Features/DependencyInjection.cs`
- Backend auth endpoints: `src/backend/Features/Auth/*`
- Frontend auth API helpers: `src/frontend/lib/api/auth.ts`
- Frontend cookie name: `src/frontend/lib/auth/cookies.ts`
- Frontend route gate: `src/frontend/proxy.ts`
- Frontend app shell check: `src/frontend/app/layout.tsx`
- Production auth proxy: `src/frontend/app/api/auth/[...path]/route.ts`

## Auth responsibility map

```mermaid
flowchart LR
    Browser["Browser"]
    Next["Next.js frontend"]
    Proxy["Next.js auth proxy<br/>/api/auth/[...path]"]
    Api["ASP.NET Core backend<br/>/auth endpoints"]
    Identity["ASP.NET Identity"]
    Db["PostgreSQL<br/>users and identity tables"]

    Browser --> Next
    Next -->|"dev auth calls"| Api
    Next -->|"production auth calls"| Proxy
    Proxy --> Api
    Api --> Identity
    Identity --> Db

    Api -->|"Set-Cookie: .AspNetCore.Identity.Application"| Browser
```

## Login sequence

```mermaid
sequenceDiagram
    actor User
    participant LoginForm as LoginForm
    participant AuthApi as frontend lib/api/auth.ts
    participant Backend as Backend /auth/login
    participant Identity as ASP.NET Identity
    participant Browser as Browser cookie jar
    participant Router as Next router

    User->>LoginForm: Submit email, password, rememberMe
    LoginForm->>AuthApi: login(values)
    AuthApi->>Backend: POST /auth/login with credentials: include
    Backend->>Identity: Find user by email
    Identity-->>Backend: AppUser or null
    Backend->>Identity: PasswordSignInAsync(user, password, rememberMe)
    Identity-->>Backend: Sign-in result

    alt credentials are valid
        Backend-->>Browser: Set Identity application cookie
        Backend-->>AuthApi: 200 with { id, username, email }
        AuthApi-->>LoginForm: login response
        LoginForm->>Router: replace(returnTo or "/")
        LoginForm->>Router: refresh()
    else credentials are invalid
        Backend-->>AuthApi: 401 problem response
        AuthApi-->>LoginForm: throw API error
        LoginForm-->>User: Show form error
    end
```

Notes:

- `PasswordSignInAsync` is the moment the auth session is created.
- The login response contains user info, but the app should not rely on that response forever. After reloads, the durable session state is the cookie.
- `rememberMe` controls whether the Identity cookie is persistent.

## Register sequence

```mermaid
sequenceDiagram
    actor User
    participant SignupForm as SignupForm
    participant AuthApi as frontend lib/api/auth.ts
    participant Backend as Backend /auth/register
    participant Identity as ASP.NET Identity
    participant Browser as Browser cookie jar
    participant Router as Next router

    User->>SignupForm: Submit username, email, password, rememberMe
    SignupForm->>AuthApi: registerAccount(values)
    AuthApi->>Backend: POST /auth/register with credentials: include
    Backend->>Identity: CreateAsync(user, password)

    alt registration is valid
        Backend->>Identity: SignInAsync(user, rememberMe)
        Backend-->>Browser: Set Identity application cookie
        Backend-->>AuthApi: 200 with { id, username, email }
        SignupForm->>Router: replace("/")
        SignupForm->>Router: refresh()
    else registration is invalid
        Backend-->>AuthApi: 400 validation problem
        AuthApi-->>SignupForm: field errors
        SignupForm-->>User: Show validation messages
    end
```

## Route gating in the frontend

```mermaid
flowchart TD
    Request["Browser requests a page"]
    ProxyFile["Next proxy.ts"]
    HasCookie{"Has .AspNetCore.Identity.Application cookie?"}
    PrivateRoute{"Is private route?<br/>/applications, /applications/*, /settings"}
    AuthRoute{"Is auth route?<br/>/login or /register"}
    RedirectLogin["Redirect to /login?returnTo=..."]
    RedirectApp["Redirect to /applications"]
    Continue["Continue to requested page"]

    Request --> ProxyFile
    ProxyFile --> HasCookie
    HasCookie --> PrivateRoute
    PrivateRoute -->|"yes and no cookie"| RedirectLogin
    PrivateRoute -->|"no or has cookie"| AuthRoute
    AuthRoute -->|"yes and has cookie"| RedirectApp
    AuthRoute -->|"no"| Continue
```

Important limitation:

The route gate only checks whether the cookie exists. It does not prove the cookie is still valid. The backend remains the source of truth. If the cookie is expired or invalid, protected API calls and `GET /auth/me` return `401`.

## Home page decision

```mermaid
flowchart TD
    Home["GET /"]
    ServerComponent["src/frontend/app/page.tsx"]
    CookieCheck{"Cookie exists?"}
    Landing["Render LandingPage"]
    Dashboard["Render DashboardPage"]

    Home --> ServerComponent
    ServerComponent --> CookieCheck
    CookieCheck -->|"no"| Landing
    CookieCheck -->|"yes"| Dashboard
```

Current implementation detail:

The dashboard currently renders fixture data. The sidebar already fetches the current user through `GET /auth/me`.

## How the frontend knows who the user is

```mermaid
sequenceDiagram
    participant Component as Frontend component
    participant AuthApi as getCurrentUser()
    participant Backend as Backend /auth/me
    participant Auth as Cookie authentication
    participant Identity as UserManager
    participant Db as PostgreSQL

    Component->>AuthApi: getCurrentUser()
    AuthApi->>Backend: GET /auth/me with credentials: include
    Backend->>Auth: RequireAuthorization reads Identity cookie

    alt cookie is valid
        Auth-->>Backend: ClaimsPrincipal
        Backend->>Identity: GetUserAsync(principal)
        Identity->>Db: Load AppUser
        Db-->>Identity: User row
        Identity-->>Backend: AppUser
        Backend-->>AuthApi: 200 { id, username, email }
        AuthApi-->>Component: currentUser
    else cookie is missing, expired, or invalid
        Backend-->>AuthApi: 401 Unauthorized
        AuthApi-->>Component: API error
    end
```

This is the answer to: "How does the frontend know who the user is?"

It asks the backend. The backend reads the Identity cookie, resolves the `ClaimsPrincipal`, loads the user, and returns a small current-user DTO.

## Private application data flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Private UI
    participant ApiHelper as frontend API helper
    participant Backend as Backend /applications
    participant Auth as Cookie auth
    participant Handler as Application handler
    participant Db as PostgreSQL

    User->>UI: Open or change private application data
    UI->>ApiHelper: Fetch or mutate application data
    ApiHelper->>Backend: Request with credentials: include
    Backend->>Auth: RequireAuthorization
    Auth-->>Backend: ClaimsPrincipal
    Backend->>Handler: Handle request
    Handler->>Handler: Read ClaimTypes.NameIdentifier as userId
    Handler->>Db: Query or mutate rows where Application.UserId == userId
    Db-->>Handler: User-owned rows only
    Handler-->>Backend: Private DTO
    Backend-->>UI: Response
```

The backend ownership rule is what protects data:

```text
authenticated user id from cookie claims == Application.UserId
```

Do not let the frontend send a `userId` to decide ownership.

## Logout sequence

```mermaid
sequenceDiagram
    actor User
    participant Sidebar as AppSidebar
    participant AuthApi as logout()
    participant Backend as Backend /auth/logout
    participant Identity as SignInManager
    participant Browser as Browser cookie jar
    participant Router as Next router

    User->>Sidebar: Click Logout
    Sidebar->>AuthApi: logout()
    AuthApi->>Backend: POST /auth/logout with credentials: include
    Backend->>Identity: SignOutAsync()
    Identity-->>Browser: Clear Identity application cookie
    Backend-->>AuthApi: 204 No Content
    Sidebar->>Router: replace("/")
    Sidebar->>Router: refresh()
```

## Local development vs production auth calls

```mermaid
flowchart TD
    Dev["Development"]
    Prod["Production"]
    DevCall["Frontend calls<br/>https://localhost:7156/auth"]
    ProdCall["Frontend calls<br/>/api/auth"]
    Render["Render backend<br/>https://noneed2ask.onrender.com/auth"]
    Vercel["Vercel route handler<br/>app/api/auth/[...path]/route.ts"]
    Browser["Browser stores cookie<br/>for the frontend origin"]

    Dev --> DevCall
    DevCall --> Browser

    Prod --> ProdCall
    ProdCall --> Vercel
    Vercel --> Render
    Render --> Vercel
    Vercel --> Browser
```

Why production is different:

- In development, both apps run on `localhost`, so the cookie can be visible to the frontend despite different ports.
- In production, Vercel and Render are different hosts.
- The auth proxy keeps the Identity cookie on the frontend origin so Next.js route checks can see it.

## Failure and recovery flow

```mermaid
flowchart TD
    Page["Protected page or component"]
    CookieExists{"Frontend sees auth cookie?"}
    CallMe["Call GET /auth/me or private API"]
    BackendValid{"Backend accepts cookie?"}
    RenderPrivate["Render private UI"]
    RedirectLogin["Redirect to /login"]
    ClearState["Clear user/query state if needed"]

    Page --> CookieExists
    CookieExists -->|"no"| RedirectLogin
    CookieExists -->|"yes"| CallMe
    CallMe --> BackendValid
    BackendValid -->|"yes"| RenderPrivate
    BackendValid -->|"no, 401"| ClearState
    ClearState --> RedirectLogin
```

Recommended behavior:

- Use cookie existence for fast route decisions.
- Use `GET /auth/me` for real user identity.
- Treat `401` from `/auth/me` or private endpoints as logged out.
- Redirect to `/login` when the backend rejects the cookie.
