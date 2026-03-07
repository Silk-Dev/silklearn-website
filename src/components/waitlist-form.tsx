'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

type SubmissionState = {
  kind: 'idle' | 'success' | 'error';
  message: string;
};

const idleState: SubmissionState = {
  kind: 'idle',
  message: '',
};

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(idleState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState(idleState);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, companyName }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to join the waitlist right now.');
      }

      setEmail('');
      setCompanyName('');
      setSubmissionState({
        kind: 'success',
        message: payload.message || 'You are on the list.',
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to join the waitlist right now.';

      setSubmissionState({
        kind: 'error',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Email</span>
        <input
          autoComplete="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="leader@company.com"
          required
          type="email"
          value={email}
        />
      </label>

      <label className="field">
        <span>Company</span>
        <input
          autoComplete="organization"
          name="companyName"
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Acme Systems"
          type="text"
          value={companyName}
        />
      </label>

      <button className="button primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Request early access'}
      </button>

      <p className={`form-message ${submissionState.kind}`}>
        {submissionState.message || 'Private beta access is rolling out in waves.'}
      </p>
    </form>
  );
}