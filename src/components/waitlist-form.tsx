'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SubmissionState = {
  kind: 'idle' | 'success' | 'error';
  message: string;
};

type WaitlistFormProps = {
  submitLabel?: string;
  idleMessage?: string;
  fitNote?: string | null;
};

const idleState: SubmissionState = {
  kind: 'idle',
  message: '',
};

export function WaitlistForm({
  submitLabel = 'Request early access',
  idleMessage = 'Private beta access. No spam. We review every application.',
  fitNote = 'Best fit: leaders testing onboarding, handoffs, compliance review, or AI context built from dense private docs.',
}: WaitlistFormProps) {
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
      className="grid gap-4  bg-(--card-strong)  "
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

      <Button className="inline-flex items-center justify-center gap-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <>
            <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          submitLabel
        )}
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
        {submissionState.message || idleMessage}
      </p>

      {fitNote ? <p className="text-xs leading-6 text-(--muted-foreground)">{fitNote}</p> : null}
    </form>
  );
}