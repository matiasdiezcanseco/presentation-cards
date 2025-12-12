# Technology Stack

This project uses the T3 Stack (or similar modern web stack).

## Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Package Manager:** pnpm

## Database
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL
- **Driver:** `postgres`
- **Migration Tool:** Drizzle Kit

## Authentication
- **Library:** [Better Auth](https://www.better-auth.com/)
- **Adapter:** Drizzle Adapter
- **Providers:**
  - Email/Password
  - GitHub

## Styling
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Configuration:** PostCSS with `@tailwindcss/postcss` plugin

## Environment Variables
- **Library:** [`@t3-oss/env-nextjs`](https://env.t3.gg/)
- **Validation:** Zod schemas for server and client variables

## Linting & Formatting
- **Linter:** ESLint
- **Formatter:** Prettier

