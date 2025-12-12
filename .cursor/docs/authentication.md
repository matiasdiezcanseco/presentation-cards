# Authentication

This project uses **Better Auth** for authentication, integrated with Drizzle ORM.

## Configuration
- **Config File:** `src/server/better-auth/config.ts`
- **Main Export:** `auth` object initialized with `betterAuth`.
- **Adapter:** `drizzleAdapter` connecting to the Postgres database via Drizzle.

## Providers
1.  **Email & Password:** Enabled (`emailAndPassword: { enabled: true }`).
2.  **GitHub:** Configured via environment variables (`BETTER_AUTH_GITHUB_CLIENT_ID`, `BETTER_AUTH_GITHUB_CLIENT_SECRET`).

## Database Schema
The authentication schema is managed by Drizzle and includes standard tables for users, sessions, accounts, and verifications.
Ensure schema changes are pushed/migrated using `pnpm db:push` or `pnpm db:migrate`.

## Usage
- **Server-side:** Import `auth` from `~/server/better-auth/config`.
- **Client-side:** Use the Better Auth client (likely setup in `src/server/better-auth/client.ts` or similar, check `src/server/better-auth` folder).

## Routes
- **API Route:** `src/app/api/auth/[...all]/route.ts` handles auth endpoints.

