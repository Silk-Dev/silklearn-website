import postgres, { type Sql } from 'postgres';

let sqlInstance: Sql | null = null;

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