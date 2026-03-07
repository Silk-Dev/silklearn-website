---
applyTo: "**/*"
description: "Use when working in the silklearn-website repo for Next.js, Tailwind, shadcn/ui, Sanity, and Docker-backed Postgres work."
---

# SilkLearn Website Patterns

This repository is the standalone SilkLearn marketing website. Keep the product story aligned with the main SilkLearn thesis, but do not assume the SilkGuild monorepo structure exists here.

## What This Repo Is

- A standalone Next.js 16 site for SilkLearn marketing, editorial content, and lightweight operational capture.
- Embedded Sanity Studio for content editing.
- Local Postgres via Docker Compose for waitlist capture and future website-side operational data.

## Tech Stack

### Website

- Runtime: Node 22+
- Framework: Next.js 16 App Router
- Language: TypeScript 5.9+ in strict mode
- Styling: Tailwind CSS v4
- UI primitives: shadcn/ui
- CMS: Sanity Studio embedded at `/studio`
- Database access: `postgres` package
- Local infrastructure: Docker Compose + Postgres 17

## Product Context

- SilkLearn turns source material into dependency-ordered learning paths.
- Target users are leaders who need teams proficient in complex knowledge without manually designing every learning step.
- Website copy should reflect the actual product thesis: source material in, structured learning path out.
- Do not drift into generic AI, course-builder, or vague productivity messaging.

## Source Of Truth Locations

- Main landing page: `src/app/page.tsx`
- Global styling entry: `src/app/globals.css`
- Layout and metadata: `src/app/layout.tsx`
- Waitlist API route: `src/app/api/waitlist/route.ts`
- Waitlist form UI: `src/components/waitlist-form.tsx`
- shadcn primitives: `src/components/ui/`
- Shared utilities: `src/lib/utils.ts`
- Sanity client and queries: `src/lib/sanity.ts`
- Fallback editorial content: `src/lib/site-content.ts`
- Sanity schema types: `src/sanity/schemaTypes/`
- Sanity config: `sanity.config.ts`, `sanity.cli.ts`
- Local database stack: `docker-compose.yml`
- DB init scripts: `docker/postgres/init/`

## Anti-Redundancy Rules

- Reuse existing shadcn primitives from `src/components/ui/` before creating new UI helpers.
- Prefer extending shared utilities or tokens over inventing one-off patterns.
- If a layout or content pattern already exists on the site, evolve it instead of duplicating it.
- Keep fallback content centralized in `src/lib/site-content.ts`.

## TypeScript Conventions

- Use strict typing throughout.
- Prefer `import type` for type-only imports.
- Use the `@/` alias for internal imports.
- Avoid `any` unless there is no practical alternative.
- Keep components and types separated once a file starts mixing too much UI and data-shape logic.

## Styling Conventions

- Prefer Tailwind utility classes for component and layout styling.
- Keep global CSS focused on tokens, resets, and top-level shared styles.
- Use CSS variables in `src/app/globals.css` as the source of truth for the visual system.
- Use shadcn/ui components as the default primitive layer for buttons, cards, inputs, and future interactive UI.
- If a new reusable primitive is needed, add it under `src/components/ui/`.

## UI Direction

- Follow `AGENTS.md` in this repository for visual rules and banned patterns.
- Default to clean, human-designed UI, not generic AI-SaaS styling.
- Keep the site grounded in the current palette and visual system unless a redesign is intentional.
- Prefer clarity and hierarchy over decorative effects.
- Avoid adding blue-heavy palettes unless the existing design explicitly moves that direction.

## Sanity Conventions

- The homepage should continue to work without Sanity credentials by using fallback content.
- Keep content models focused and small; do not create speculative schema sprawl.
- When adding new editable areas, update both the schema and the fallback content path.
- Treat Sanity as the editorial source of truth for marketing content once configured.

## Database Conventions

- Use `DATABASE_URL` for the website Postgres connection.
- The website database is separate from SilkGuild and intentionally runs on localhost:5434 in Docker Compose.
- Keep website-side DB usage narrow and operational: waitlist capture, simple admin needs, lightweight site features.
- Prefer small SQL queries via the existing `postgres` client rather than adding a heavy ORM prematurely.

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Build: `pnpm build`
- Start Postgres: `pnpm db:up`
- Stop Postgres: `pnpm db:down`

## Common Pitfalls

- Do not import or reference SilkGuild monorepo packages from this repository.
- Do not assume Prisma exists here.
- Do not move operational website data into Sanity just because it is available.
- Do not break the fallback content path when modifying Sanity-driven pages.
- Do not add UI components that bypass the shared tokens and shadcn primitives unless there is a clear reason.

## When Writing Copy

- Be concrete about the input, output, and user value.
- Use language that signals trust and specificity.
- Avoid filler startup copy, vague “AI-powered” claims, and ornamental labels.
- Keep messaging consistent with the product’s actual mechanism: decomposition, dependency order, leader review.