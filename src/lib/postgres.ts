import postgres, { type Sql } from 'postgres';

let sqlInstance: Sql | null = null;
let waitlistTableReady = false;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql(): Sql {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }

  if (!sqlInstance) {
    sqlInstance = postgres(process.env.DATABASE_URL, {
      max: 1,
    });
  }

  return sqlInstance;
}

export async function ensureWaitlistTable(): Promise<void> {
  if (waitlistTableReady) {
    return;
  }

  const sql = getSql();

  await sql`
    create table if not exists waitlist_signups (
      id bigserial primary key,
      email text not null unique,
      company_name text,
      created_at timestamptz not null default now()
    )
  `;

  await sql`
    create index if not exists waitlist_signups_created_at_idx
      on waitlist_signups (created_at desc)
  `;

  waitlistTableReady = true;
}