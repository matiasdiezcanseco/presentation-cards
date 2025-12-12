# Project Documentation for Cursor

This directory contains specific documentation files intended to help Cursor understand the project context, patterns, and technologies.

## Usage Instructions for Cursor

**Do not read these files for every request.**

Only read the relevant documentation file when you are working on a task specifically related to that topic. For example:
- Read `authentication.md` only when modifying auth logic or protecting routes.
- Read `database.md` only when changing the schema or running migrations.
- Read `styling.md` only when there are questions about the Tailwind v4 setup.

This prevents unnecessary context loading and keeps the focus on the immediate task.

## Documentation Index

- [Project Overview](./project-overview.md) - **READ THIS FIRST.** Application goals, features, and user flow.
- [Feature Implementation Plan](./features/) - **SEQUENTIAL TASK LIST.** Follow these steps to build the app.
- [Technology Stack](./tech-stack.md) - Overview of the main technologies used.
- [Authentication](./authentication.md) - Details on Better Auth setup and flow.
- [Database](./database.md) - Drizzle ORM and Postgres configuration.
- [Styling](./styling.md) - Tailwind CSS v4 usage.
- [Environment Variables](./env-vars.md) - Management of env vars via @t3-oss/env-nextjs.
