# Presentation Cards Generator

A web application for creating, designing, and exporting professional presentation (business) cards.

## Features

- **Custom Card Creation:** Design cards with your specific details (Name, Contact, Company, etc.).
- **Interactive Editor:** Drag-and-drop elements, resize, and styling options directly in the browser.
- **Image Upload:** Upload logos and profile pictures.
- **Export:** Download your designs for printing or digital sharing.
- **User Accounts:** Save and manage multiple card designs.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** Better Auth
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Set up Environment Variables:**
    Copy `.env.example` to `.env` and fill in the required values (Database URL, Auth Secrets).

3.  **Run Database Migrations:**
    ```bash
    pnpm db:push
    ```

4.  **Start Development Server:**
    ```bash
    pnpm dev
    ```

## Documentation

For AI assistance and detailed developer docs, see [.cursor/docs/README.md](.cursor/docs/README.md).
