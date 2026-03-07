# SilkLearn Website

Standalone marketing site scaffold for SilkLearn using Next.js, embedded Sanity Studio, and local Postgres via Docker Compose.

## Stack

- Next.js 16 with App Router
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

## Sanity Notes

- The homepage reads from the `homePage` document type if Sanity is configured.
- Until then, the site renders local fallback content so the scaffold is still usable.
- Open `http://localhost:3000/studio` after adding your Sanity env vars.

## Current Scope

- Bold landing page aligned to the SilkLearn product thesis
- Embedded CMS for marketing copy
- Waitlist capture API backed by Postgres
- Clean base for adding pages, analytics, and richer content models