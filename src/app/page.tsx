import { WaitlistForm } from '@/components/waitlist-form';
import { getHomePageContent, isSanityConfigured } from '@/lib/sanity';

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">{content.kicker}</p>
          <h1>{content.headline}</h1>
          <p className="hero-text">{content.subheadline}</p>

          <div className="hero-actions">
            <a className="button primary" href={content.primaryCtaHref}>
              {content.primaryCtaLabel}
            </a>
            <a className="button ghost" href={content.secondaryCtaHref}>
              {content.secondaryCtaLabel}
            </a>
          </div>

          <div className="signal-row">
            <span className="signal-dot" />
            <span>
              {isSanityConfigured
                ? 'Marketing copy is loading from Sanity.'
                : 'Using local fallback copy until Sanity is configured.'}
            </span>
          </div>
        </div>

        <div className="hero-frame">
          <div className="code-card">
            <div className="code-card-header">
              <span>Source material</span>
              <span>Compiler output</span>
            </div>

            <div className="code-grid">
              <div>
                <p className="terminal-title">Input</p>
                <ul>
                  <li>Security architecture spec.pdf</li>
                  <li>Internal onboarding handbook.md</li>
                  <li>Platform incident runbook.docx</li>
                </ul>
              </div>

              <div>
                <p className="terminal-title">Output</p>
                <ul>
                  <li>95 segments</li>
                  <li>29.8 estimated hours</li>
                  <li>Cycle-free prerequisite graph</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="metrics-grid">
            {content.metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Why this exists</p>
          <h2>The order of knowledge is usually trapped in someone&apos;s head.</h2>
        </div>

        <div className="pillar-grid">
          {content.pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block faq-block">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Core questions, answered directly.</h2>
        </div>

        <div className="faq-list">
          {content.faq.map((item) => (
            <article className="faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="waitlist-panel" id="waitlist">
        <div>
          <p className="eyebrow">Early access</p>
          <h2>Start with a site that can market the product and collect demand now.</h2>
          <p className="waitlist-copy">
            This scaffold keeps content editable in Sanity and waitlist capture in
            Postgres so the marketing site can move before the full application is
            public.
          </p>
        </div>

        <WaitlistForm />
      </section>
    </main>
  );
}