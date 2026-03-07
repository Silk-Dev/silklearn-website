'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <form
      className="grid gap-4 rounded-[22px] border border-(--border) bg-(--card-strong) p-6 shadow-[0_18px_44px_rgba(22,47,88,0.08)]"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-(--foreground)">Email</span>
        <Input
          autoComplete="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="leader@company.com"
          required
          type="email"
          value={email}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-(--foreground)">Company</span>
        <Input
          autoComplete="organization"
          name="companyName"
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Acme Systems"
          type="text"
          value={companyName}
        />
      </label>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Request early access'}
      </Button>

      <p
        className={`min-h-6 text-sm ${
          submissionState.kind === 'success'
            ? 'text-(--success)'
            : submissionState.kind === 'error'
              ? 'text-(--warning)'
              : 'text-(--muted-foreground)'
        }`}
      >
        {submissionState.message || 'Private beta access is rolling out in waves.'}
      </p>

      <p className="text-xs leading-6 text-(--muted-foreground)">
        Early access is aimed at leaders testing roadmap generation from private docs and dense technical material.
      </p>
    </form>
  );
}