export type WaitlistPayload = {
  companyName?: string;
  email?: string;
};

export type WaitlistSubmissionResult = {
  message: string;
  status: number;
};

export type WaitlistRepository = {
  ensureTable(): Promise<void>;
  insert(email: string, companyName: string | null): Promise<'inserted' | 'duplicate'>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitWaitlistSignup(
  payload: WaitlistPayload,
  repository: WaitlistRepository,
  databaseConfigured: boolean,
): Promise<WaitlistSubmissionResult> {
  const email = payload.email?.trim().toLowerCase();
  const companyName = payload.companyName?.trim() || null;

  if (!email || !emailPattern.test(email)) {
    return {
      message: 'Enter a valid email address.',
      status: 400,
    };
  }

  if (!databaseConfigured) {
    return {
      message:
        'DATABASE_URL is not configured. Start Postgres and add your env file before collecting waitlist entries.',
      status: 503,
    };
  }

  try {
    await repository.ensureTable();
    const result = await repository.insert(email, companyName);

    if (result === 'duplicate') {
      return {
        message: 'That email is already on the waitlist.',
        status: 200,
      };
    }

    return {
      message: 'You are on the waitlist.',
      status: 201,
    };
  } catch {
    return {
      message: 'Postgres is reachable, but the waitlist write failed.',
      status: 500,
    };
  }
}
