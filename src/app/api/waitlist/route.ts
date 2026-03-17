import { NextResponse } from 'next/server';

import { ensureWaitlistTable, getSql, isDatabaseConfigured } from '@/lib/postgres';
import { submitWaitlistSignup } from '@/lib/waitlist';

export const runtime = 'nodejs';

type WaitlistPayload = {
  companyName?: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;

  const result = await submitWaitlistSignup(
    body,
    {
      ensureTable: ensureWaitlistTable,
      async insert(email, companyName) {
        const sql = getSql();
        const inserted = await sql`
          insert into waitlist_signups (email, company_name)
          values (${email}, ${companyName})
          on conflict (email) do nothing
          returning id
        `;

        return inserted.length === 0 ? 'duplicate' : 'inserted';
      },
    },
    isDatabaseConfigured(),
  );

  return NextResponse.json(
    { message: result.message },
    { status: result.status },
  );
}
