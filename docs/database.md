# Database

The project uses **PostgreSQL** with **Drizzle ORM**.

## Setup
- **Schema Definition:** `src/server/db/schema.ts`
- **Database Connection:** `src/server/db/index.ts`
- **Config:** `drizzle.config.ts`

## Commands
- **Generate Migrations:** `pnpm db:generate`
- **Run Migrations:** `pnpm db:migrate`
- **Push Schema (Prototyping):** `pnpm db:push`
- **Studio (GUI):** `pnpm db:studio`

## Schema
Tables are defined using Drizzle's `pgTable`.
- Tables should likely be prefixed or named according to convention (e.g., `presentation-cards_*` is used in `tablesFilter` in config).

## Environment Variables
- `DATABASE_URL`: Connection string for the PostgreSQL database.

