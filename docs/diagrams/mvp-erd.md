# MVP Entity Relationship Model

This ERD shows the product-facing data model for the MVP.

```mermaid
erDiagram
    OWNER_PROFILE ||--o{ JOB_APPLICATION : owns

    OWNER_PROFILE {
        uuid id PK
        string email
        string publicSlug UK
        boolean isPublicSharingEnabled
        datetime createdAt
        datetime updatedAt
    }

    JOB_APPLICATION {
        uuid id PK
        uuid userId FK
        string companyName
        string jobTitle
        string status
        string publicNote
        string privateNote
        datetime lastContactAt
        datetime nextActionAt
        datetime createdAt
        datetime updatedAt
    }
```

Identity tables are owned by ASP.NET Identity and should be treated as internal auth storage. The application should expose an `OWNER_PROFILE`-level model to the product rather than leaking Identity internals into public or dashboard DTOs.
