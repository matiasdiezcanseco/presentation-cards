# Environment Variables

Environment variables are managed using **@t3-oss/env-nextjs**.

## Definition
- **File:** `src/env.js`
- **Schema:** Defined using Zod.
- **Access:** Import `env` from `~/env` (server) or use `env` (client).

## Structure
- **Server:** Variables only available on the server (e.g., secrets, database URLs).
- **Client:** Variables exposed to the client (prefixed with `NEXT_PUBLIC_`).
- **Runtime:** `process.env` mapping for validation.

## Adding New Variables
1. Add to `.env` file.
2. Add validation schema in `src/env.js` under `server` or `client`.
3. Add mapping in `runtimeEnv` in `src/env.js`.

## Key Variables
- `DATABASE_URL`: Postgres connection string.
- `BETTER_AUTH_SECRET`: Secret for signing auth tokens.
- `BETTER_AUTH_GITHUB_CLIENT_ID`: GitHub OAuth Client ID.
- `BETTER_AUTH_GITHUB_CLIENT_SECRET`: GitHub OAuth Client Secret.

