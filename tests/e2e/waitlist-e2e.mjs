import assert from 'node:assert/strict';
import process from 'node:process';

import postgres from 'postgres';
import { chromium } from 'playwright';

const baseUrl = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000';
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required for waitlist e2e.');
}

const sql = postgres(databaseUrl, { max: 1 });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const email = `waitlist-e2e-${Date.now()}@example.com`;
const companyName = 'E2E Systems';

try {
  await sql`delete from waitlist_signups where email = ${email}`;

  await page.goto(`${baseUrl}/waitlist`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Company').fill(companyName);
  await page.getByRole('button', { name: 'Request early access' }).click();

  await page.getByText('You are on the waitlist.').waitFor({ timeout: 20000 });

  const rows = await sql`
    select email, company_name
    from waitlist_signups
    where email = ${email}
    limit 1
  `;

  assert.equal(rows.length, 1);
  assert.equal(rows[0].email, email);
  assert.equal(rows[0].company_name, companyName);

  console.log(JSON.stringify({
    ok: true,
    email,
    companyName,
    baseUrl,
  }, null, 2));
} finally {
  await page.close();
  await browser.close();
  await sql.end();
}
