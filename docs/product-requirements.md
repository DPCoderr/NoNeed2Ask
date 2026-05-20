# Product Requirements

## Product summary

Job Search Status is a personal job search tracker for one owner account per user. The owner manages applications privately and can optionally share a simple public status page with trusted people.

The public page should reduce repeated "How is the job search going?" questions by giving a calm, low-pressure summary of the current search.

## Primary users

- Owner: the job seeker managing their own applications
- Visitor: a friend or family member viewing the shared public page without logging in

## Core user flow

1. The owner registers or logs in.
2. The owner lands on a private dashboard.
3. The owner creates, edits, views, and deletes job applications.
4. The owner controls which information is public.
5. The owner enables or disables public sharing.
6. Visitors can open `/status/[slug]` without logging in.
7. If sharing is disabled, the public page shows: `This status page is currently private.`

## Application data

Each application includes:

- `id`
- `userId`
- `companyName`
- `jobTitle`
- `status`
- `publicNote`
- `privateNote`
- `lastContactAt`
- `nextActionAt`
- `createdAt`
- `updatedAt`

Allowed statuses:

- `applied`
- `waiting_response`
- `interview_planned`
- `interview_done`
- `offer`
- `rejected`
- `ghosted`
- `paused`

## Public profile data

Each owner profile includes:

- `id`
- `email`
- `publicSlug`
- `isPublicSharingEnabled`
- `createdAt`
- `updatedAt`

## Public page rules

The public page is read-only and never requires login.

If public sharing is enabled, only these application fields may be shown:

- `companyName`
- `jobTitle`
- `status`
- `publicNote`
- `updatedAt`
- `nextActionAt`

The following data must never appear on the public page:

- `privateNote`
- `userId`
- internal auth data
- owner-only settings not meant for public viewing

## MVP boundaries

Included in MVP:

- Owner registration and login
- Private dashboard
- CRUD for applications
- Public sharing toggle
- Public slug management
- Public read-only status page

Not included in MVP:

- Multi-user collaboration
- Recruiter workflows
- Public comments or visitor interaction
- Notifications, email digests, or messaging automation
- Advanced filtering beyond simple URL search params
