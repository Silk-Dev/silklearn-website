'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { CheckCircle2 } from 'lucide-react';

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
  idleMessage = 'Private beta — we read every application and reply personally within two business days.',
  fitNote = "Best fit: teams where the knowledge exists in docs but the path through them doesn't.",
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
        message: payload.message || "You're in.",
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
      className="grid gap-4"
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

      <Button
        className="cta-pulse inline-flex items-center justify-center gap-2 transition-transform duration-150 ease-out active:scale-[0.97]"
        disabled={isSubmitting}
        type="submit"
      >
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

      {submissionState.kind === 'success' ? (
        <div className="animate-in fade-in slide-in-from-bottom-1 rounded-sm border border-(--primary) bg-[oklch(from_var(--primary)_l_c_h/0.05)] p-6 duration-300 ease-out">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-(--primary)" />
            <div>
              <p className="font-semibold text-(--foreground)">You&apos;re in.</p>
              <p className="mt-1 text-sm text-(--muted-foreground)">
                We&apos;ll reply personally within two business days — not a sequence, an actual email from someone who read your application.
              </p>
              <p className="mt-3 text-xs text-(--muted-foreground)">
                Teams with recurring onboarding problems and dense internal docs move to the front.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p
          className={`min-h-6 text-sm ${
            submissionState.kind === 'error'
              ? 'text-(--warning)'
              : 'text-(--muted-foreground)'
          }`}
        >
          {submissionState.message || idleMessage}
        </p>
      )}

      {fitNote ? <p className="text-xs leading-6 text-(--muted-foreground)">{fitNote}</p> : null}
    </form>
  );
}
