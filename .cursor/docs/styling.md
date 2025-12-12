# Styling

This project uses **Tailwind CSS v4**.

## Configuration
- **Config:** `postcss.config.js` uses `@tailwindcss/postcss`.
- **CSS File:** `src/styles/globals.css`.
- **Note:** Tailwind v4 moves configuration to CSS variables in the CSS file itself or detects utility classes automatically without a massive `tailwind.config.js`.

## Usage
- Apply utility classes directly in JSX/TSX.
- Global styles are defined in `src/styles/globals.css`.
- Uses `postcss` for processing.

## Best Practices
- Use utility classes for most styling.
- Extract components if patterns repeat significantly, but prefer composition.
- Follow Tailwind v4 documentation for any new features or breaking changes from v3.

