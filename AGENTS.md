# Linear Ticket Workflow

When a user asks Codex to implement a Linear ticket for this repository, follow this workflow unless the user says otherwise.

## Preconditions

- The Linear app must be connected and available in Codex.
- The user request should include a Linear issue identifier such as `ENG-123`, or enough context to find the ticket unambiguously.

## Required workflow

1. Read the Linear issue first to confirm scope and acceptance criteria.
2. Before making code changes, move the issue to `In Progress`.
3. Implement the requested change and run the most relevant verification available in the repo.
4. When the work is ready for review, move the issue to `In Review`.
5. Move the issue to `Done` only when one of these is true:
   - The user explicitly says to mark it done.
   - The user asks to merge or close out the ticket.
   - The repo workflow clearly treats completed local implementation as done.

## Guardrails

- Prefer the exact status names configured in the Linear team. If `In Progress`, `In Review`, or `Done` do not exist, use the closest matching workflow states and say which ones were used.
- If the task is blocked, ask for clarification before changing the final status to `Done`.
- If implementation starts but cannot be completed, leave the issue in `In Progress` or move it to the team's blocked-equivalent state if one exists.
- If the user asks only for analysis, planning, or estimation, do not move the issue unless they explicitly ask to start implementation.

## Communication

- Tell the user when the issue status is changed.
- Include the current issue status in the final summary when the ticket was part of the task.
