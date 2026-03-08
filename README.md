# SILKLEARN Website

Standalone marketing site scaffold for SILKLEARN using Next.js, Tailwind CSS, shadcn/ui, embedded Sanity Studio, and local Postgres via Docker Compose.

## Stack

- Next.js 16 with App Router
- Tailwind CSS 4
- shadcn/ui primitives configured in `src/components/ui`
- Sanity Studio mounted at `/studio`
- Postgres 17 in Docker Compose for operational data like waitlist capture

## Local Setup

1. Install dependencies:

	```bash
	pnpm install
	```

2. Create your env file:

	```bash
	cp .env.example .env.local
	```

3. Start Postgres:

	```bash
	pnpm db:up
	```

4. Start the site:

	```bash
	pnpm dev
	```

The website runs at `http://localhost:3000`.

## Deploying To Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel as a Next.js project.
3. Set the package manager to `pnpm` if Vercel does not detect it automatically.
4. Add the required environment variables in Vercel:

	- `NEXT_PUBLIC_SITE_URL`
	- `NEXT_PUBLIC_SANITY_PROJECT_ID`
	- `NEXT_PUBLIC_SANITY_DATASET`
	- `SANITY_API_TOKEN` if you later add preview or write flows
	- `DATABASE_URL` pointing to a hosted Postgres instance

5. Deploy.

Notes:

- `vercel.json` is included so Vercel uses `pnpm install --frozen-lockfile` and `pnpm build`.
- The waitlist API route runs on the Node.js runtime and auto-creates the `waitlist_signups` table if it does not exist yet.
- Local Docker Compose is only for development. Vercel cannot run `docker-compose.yml`, so production must use a hosted Postgres provider.
- If `NEXT_PUBLIC_SITE_URL` is not set, the app falls back to Vercel-provided deployment URLs for metadata.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: public site origin for metadata
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset, usually `production`
- `SANITY_API_TOKEN`: optional for future preview or write workflows
- `DATABASE_URL`: Postgres connection string for waitlist capture

## Postgres Notes

- The compose stack exposes Postgres on `localhost:5434` to avoid conflicting with the main SilkGuild Postgres instance on `5432`.
- On first boot, Docker runs `docker/postgres/init/001-create-waitlist.sql` to create the `waitlist_signups` table.
- The `/api/waitlist` route inserts emails into that table.
- In production, the waitlist route also creates the table automatically if it is missing.

## Sanity Notes

- The homepage reads from the `homePage` document type if Sanity is configured.
- Until then, the site renders local fallback content so the scaffold is still usable.
- Open `http://localhost:3000/studio` after adding your Sanity env vars.

## Current Scope

- Bold landing page aligned to the SILKLEARN product thesis
- Embedded CMS for marketing copy
- Waitlist capture API backed by Postgres
- Clean base for adding pages, analytics, and richer content models