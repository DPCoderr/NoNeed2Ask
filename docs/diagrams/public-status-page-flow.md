# Public Status Page Flow

This sequence shows how the public read-only status page avoids exposing private owner data.

```mermaid
sequenceDiagram
    actor Visitor
    participant Web as Public status route
    participant Api as PublicStatus slice
    participant Db as PostgreSQL

    Visitor->>Web: Open /status/[publicPageId]
    Web->>Api: GET public status by publicPageId
    Api->>Db: Find public_profile_settings by UUID publicPageId
    alt Invalid UUID or page missing
        Api-->>Web: 404 Not Found
        Web-->>Visitor: Page not found
    else Sharing disabled
        Api-->>Web: Disabled response without profile or applications
        Web-->>Visitor: This status page is currently private.
    else Sharing enabled
        Api->>Db: Load shareable application fields
        Api-->>Web: Public DTO only
        Web-->>Visitor: Read-only status page
    end
```

The most important rule in this flow is the DTO boundary: public responses may include `companyName`, `jobTitle`, `status`, `publicNote`, `updatedAt`, and `nextActionAt`; they must never include `privateNote`, `userId`, Identity data, or owner-only settings.
