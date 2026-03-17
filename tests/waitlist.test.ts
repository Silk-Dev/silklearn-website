import test from 'node:test';
import assert from 'node:assert/strict';

import type { WaitlistRepository } from '../src/lib/waitlist';
import { submitWaitlistSignup } from '../src/lib/waitlist';

function createRepository(overrides: Partial<WaitlistRepository> = {}): WaitlistRepository {
  return {
    async ensureTable() {},
    async insert() {
      return 'inserted';
    },
    ...overrides,
  };
}

test('rejects an invalid email', async () => {
  const result = await submitWaitlistSignup(
    { email: 'not-an-email' },
    createRepository(),
    true,
  );

  assert.equal(result.status, 400);
  assert.equal(result.message, 'Enter a valid email address.');
});

test('returns 503 when the database is not configured', async () => {
  const result = await submitWaitlistSignup(
    { email: 'leader@example.com' },
    createRepository(),
    false,
  );

  assert.equal(result.status, 503);
  assert.match(result.message, /DATABASE_URL is not configured/i);
});

test('normalizes email and trims company name before insert', async () => {
  let insertedEmail = '';
  let insertedCompanyName: string | null = null;

  const result = await submitWaitlistSignup(
    { email: '  LEADER@Example.com  ', companyName: '  Acme Systems  ' },
    createRepository({
      async insert(email, companyName) {
        insertedEmail = email;
        insertedCompanyName = companyName;
        return 'inserted';
      },
    }),
    true,
  );

  assert.equal(result.status, 201);
  assert.equal(result.message, 'You are on the waitlist.');
  assert.equal(insertedEmail, 'leader@example.com');
  assert.equal(insertedCompanyName, 'Acme Systems');
});

test('returns duplicate message when insert reports an existing email', async () => {
  const result = await submitWaitlistSignup(
    { email: 'leader@example.com' },
    createRepository({
      async insert() {
        return 'duplicate';
      },
    }),
    true,
  );

  assert.equal(result.status, 200);
  assert.equal(result.message, 'That email is already on the waitlist.');
});

test('returns 500 when the repository throws', async () => {
  const result = await submitWaitlistSignup(
    { email: 'leader@example.com' },
    createRepository({
      async ensureTable() {
        throw new Error('db down');
      },
    }),
    true,
  );

  assert.equal(result.status, 500);
  assert.equal(result.message, 'Postgres is reachable, but the waitlist write failed.');
});
