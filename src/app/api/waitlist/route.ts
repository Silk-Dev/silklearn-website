import { NextResponse } from 'next/server';

import { getSql, isDatabaseConfigured } from '@/lib/postgres';

type WaitlistPayload = {
  companyName?: string;
  email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as WaitlistPayload;
  const email = body.email?.trim().toLowerCase();
  const companyName = body.companyName?.trim() || null;

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { message: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        message:
          'DATABASE_URL is not configured. Start Postgres and add your env file before collecting waitlist entries.',
      },
      { status: 503 },
    );
  }

  try {
    const sql = getSql();
    const inserted = await sql`
      insert into waitlist_signups (email, company_name)
      values (${email}, ${companyName})
      on conflict (email) do nothing
      returning id
    `;

    if (inserted.length === 0) {
      return NextResponse.json({ message: 'That email is already on the waitlist.' });
    }

    return NextResponse.json({ message: 'You are on the waitlist.' }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Postgres is reachable, but the waitlist write failed.' },
      { status: 500 },
    );
  }
}