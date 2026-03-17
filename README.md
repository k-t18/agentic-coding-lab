# Frontend with AI Test

Next.js application with TypeScript, Tailwind CSS, App Router, and Git hooks.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint** + **Prettier**
- **Husky** (pre-commit, commit-msg)

## Project Structure

```
src/
  app/              # Pages and layouts (App Router)
  components/
    common/         # Shared UI components
  lib/              # Utilities and helpers
  hooks/            # Custom React hooks
  types/            # TypeScript type definitions
  styles/           # Global styles
.husky/             # Git hooks
```

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start dev server               |
| `npm run build`   | Production build               |
| `npm run start`   | Start production server        |
| `npm run lint`    | Run ESLint                     |
| `npm run format`  | Format code with Prettier      |
| `npm run format:check` | Check formatting (no write) |

## Lint & Format

- **Lint:** `npm run lint` (Next.js ESLint)
- **Format:** `npm run format` (Prettier on `src/`)
- **Format check only:** `npm run format:check`

## Husky Git Hooks

Husky runs automatically after `npm install` via the `prepare` script.

| Hook         | Action                                                                 |
|--------------|------------------------------------------------------------------------|
| **pre-commit** | Runs `lint-staged` (Prettier + ESLint on staged files), then `npm run lint`. |
| **commit-msg** | Runs Commitlint for conventional commit message validation.           |

- Hooks are under `.husky/`. Edit them to change behavior.
- To skip hooks (e.g. WIP): `git commit --no-verify` (use sparingly).
- In CI, set `HUSKY=0` to disable hooks.

## Conventions

- Use **Server Components** by default.
- Add `"use client"` only where client interactivity is required.
