# Public Status Page Flow

This sequence shows how the public read-only status page avoids exposing private owner data.

```mermaid
sequenceDiagram
    actor Visitor
    participant Web as Public status route
    participant Api as PublicStatus slice
    participant Db as PostgreSQL

    Visitor->>Web: Open /status/[slug]
    Web->>Api: GET public status by slug
    Api->>Db: Find owner profile by publicSlug
    alt Sharing disabled or slug missing
        Api-->>Web: Private or not found response
        Web-->>Visitor: This status page is currently private.
    else Sharing enabled
        Api->>Db: Load shareable application fields
        Api-->>Web: Public DTO only
        Web-->>Visitor: Read-only status page
    end
```

The most important rule in this flow is the DTO boundary: public responses may include `companyName`, `jobTitle`, `status`, `publicNote`, `updatedAt`, and `nextActionAt`; they must never include `privateNote`, `userId`, Identity data, or owner-only settings.
