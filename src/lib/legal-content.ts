export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  effectiveDate: string;
  summaryItems: string[];
  sections: LegalSection[];
  reviewNotice?: string;
};

// ---------------------------------------------------------------------------
// Privacy Policy
// ---------------------------------------------------------------------------

export const privacyPolicyContent: LegalDocument = {
  title: 'Privacy Policy',
  description:
    'How SILKLEARN collects, uses, stores, and protects personal data when you visit our website, join the waitlist, use our product, or communicate with us.',
  effectiveDate: 'March 29, 2026',
  summaryItems: [
    'Details every category of personal data we collect and the specific legal basis for each processing activity under GDPR.',
    'Names the third-party vendors and subprocessors that may handle your data on our behalf.',
    'Explains your rights under EU data protection law and how to exercise them.',
  ],
  sections: [
    {
      title: '1. Data controller',
      paragraphs: [
        'SILKLEARN is operated under the laws of Portugal. For the purposes of the EU General Data Protection Regulation (GDPR) and applicable Portuguese data protection legislation, the data controller is SILKLEARN, Lda. (in formation), contactable at privacy@silklearn.io.',
        'References to "SILKLEARN," "we," "us," or "our" throughout this policy refer to the operator of the SILKLEARN service and website at silklearn.io.',
      ],
    },
    {
      title: '2. Data we collect',
      paragraphs: [
        'We collect personal data through three channels: information you provide directly, information collected automatically, and information from third-party integrations.',
      ],
      bullets: [
        'Account and contact data \u2014 name, email address, company name, job title, and any other details you provide through forms, waitlist signups, or direct communication.',
        'Payment and billing data \u2014 billing address, VAT identification number, and payment method details. Card numbers are processed and stored exclusively by our payment processor (Stripe) and never touch our servers.',
        'Source material \u2014 documents, files, or content you upload for processing by the SILKLEARN platform. This content remains yours and is processed solely to deliver the service.',
        'Usage and technical data \u2014 IP address, browser type and version, operating system, referring URL, pages visited, session duration, and interaction events collected through analytics tooling.',
        'Communication data \u2014 messages, support requests, and feedback submitted through in-app chat (Intercom), email, or other communication channels.',
        'Cookie and tracking data \u2014 identifiers set by essential and analytics cookies as described in Section 6.',
      ],
    },
    {
      title: '3. How and why we use your data',
      paragraphs: [
        'We process personal data only for specific, stated purposes. The following maps each purpose to its GDPR legal basis.',
      ],
      bullets: [
        'Service delivery (account creation, learning path generation, billing) \u2014 Legal basis: performance of a contract (Art. 6(1)(b)).',
        'Waitlist management and early-access onboarding \u2014 Legal basis: consent (Art. 6(1)(a)), withdrawable at any time.',
        'Product analytics and performance monitoring (PostHog, Google Analytics) \u2014 Legal basis: legitimate interest (Art. 6(1)(f)) in improving the service, balanced against your privacy rights.',
        'Customer support and communication (Intercom) \u2014 Legal basis: legitimate interest (Art. 6(1)(f)) or contract performance (Art. 6(1)(b)) depending on context.',
        'Marketing communications and product updates \u2014 Legal basis: consent (Art. 6(1)(a)), withdrawable at any time via the unsubscribe link in every message.',
        'Billing, invoicing, and tax compliance \u2014 Legal basis: legal obligation (Art. 6(1)(c)) under Portuguese and EU tax law.',
        'Fraud prevention and security \u2014 Legal basis: legitimate interest (Art. 6(1)(f)) in protecting the service, our users, and our business.',
      ],
    },
    {
      title: '4. AI and automated processing',
      paragraphs: [
        'SILKLEARN uses artificial intelligence to process source material you submit and generate dependency-ordered learning paths. This processing is performed solely to deliver the service you requested and is governed by the contract between you and SILKLEARN.',
        'We do not use your personal data or uploaded content for profiling, automated individual decision-making with legal or similarly significant effects, or training general-purpose AI models. Your source material is processed to produce your learning paths and is not shared with or used by other customers.',
      ],
    },
    {
      title: '5. Vendors and subprocessors',
      paragraphs: [
        'We share personal data with the following categories of third-party service providers, each of which processes data on our behalf under contractual obligations consistent with GDPR requirements.',
      ],
      bullets: [
        'Vercel Inc. \u2014 hosting, deployment, and content delivery (United States).',
        'Stripe Inc. \u2014 payment processing and billing (United States, certified under EU-US Data Privacy Framework).',
        'PostHog Inc. \u2014 product analytics (EU-hosted instance where available, otherwise United States).',
        'Google LLC \u2014 website analytics via Google Analytics (United States, operating under Standard Contractual Clauses).',
        'Intercom Inc. \u2014 customer messaging and support (United States).',
        'Sanity AS \u2014 content management system for editorial content (Norway / EU).',
        'Infrastructure database providers \u2014 PostgreSQL hosting for operational data (region depends on deployment).',
      ],
    },
    {
      title: '6. Cookies and tracking technologies',
      paragraphs: [
        'We use cookies and similar technologies on the site. Essential cookies (session management, security) are placed without consent as they are strictly necessary for the site to function. Analytics and marketing cookies are placed only after you provide consent through our cookie banner.',
        'You can withdraw cookie consent at any time by clearing your browser cookies or adjusting your preferences through the cookie settings accessible on the site. Disabling analytics cookies does not affect your ability to use the service.',
      ],
    },
    {
      title: '7. International data transfers',
      paragraphs: [
        'Some of our subprocessors are located outside the European Economic Area (EEA), primarily in the United States. Where data is transferred outside the EEA, we rely on one or more of the following safeguards: the European Commission adequacy decisions, Standard Contractual Clauses (SCCs) approved by the European Commission, or the EU-US Data Privacy Framework certification of the receiving party.',
        'You may request a copy of the applicable transfer safeguards by contacting privacy@silklearn.io.',
      ],
    },
    {
      title: '8. Data retention',
      paragraphs: [
        'We retain personal data only for as long as necessary to fulfill the purpose for which it was collected. Specific retention periods are as follows.',
      ],
      bullets: [
        'Account data \u2014 retained for the duration of your account and for 30 days after deletion to allow recovery, then permanently deleted.',
        'Payment and billing records \u2014 retained for 10 years after the end of the relevant fiscal year, as required by Portuguese tax law.',
        'Source material and generated outputs \u2014 retained for the duration of your account. Deleted within 30 days of account termination unless you request earlier deletion.',
        'Analytics data \u2014 aggregated and anonymized within 26 months of collection. Raw event data referencing identifiable users is deleted on the same schedule.',
        'Communication data \u2014 retained for the duration of the business relationship plus 12 months, then deleted.',
        'Waitlist data \u2014 retained until you are onboarded or until you request removal, whichever occurs first.',
      ],
    },
    {
      title: '9. Your rights under GDPR',
      paragraphs: [
        'Under the GDPR, you have the following rights with respect to your personal data. To exercise any right, contact us at privacy@silklearn.io. We will respond within 30 days.',
      ],
      bullets: [
        'Right of access \u2014 request a copy of the personal data we hold about you.',
        'Right to rectification \u2014 request correction of inaccurate or incomplete data.',
        'Right to erasure \u2014 request deletion of your personal data where there is no compelling reason for continued processing.',
        'Right to restriction \u2014 request that we limit how we use your data in certain circumstances.',
        'Right to data portability \u2014 receive your data in a structured, commonly used, machine-readable format.',
        'Right to object \u2014 object to processing based on legitimate interest, including direct marketing.',
        'Right to withdraw consent \u2014 where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.',
        'Right to lodge a complaint \u2014 you may file a complaint with the Portuguese data protection authority, Comiss\u00e3o Nacional de Prote\u00e7\u00e3o de Dados (CNPD), at www.cnpd.pt, or with the supervisory authority of your country of residence.',
      ],
    },
    {
      title: '10. Security',
      paragraphs: [
        'We implement reasonable technical and organizational security measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. These include encryption in transit (TLS), access controls, regular security assessments, and vendor security reviews.',
        'No method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.',
      ],
    },
    {
      title: '11. Children',
      paragraphs: [
        'SILKLEARN is not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have collected data from a child under 16, please contact privacy@silklearn.io and we will delete it promptly.',
      ],
    },
    {
      title: '12. Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy to reflect changes in our practices, legal requirements, or service features. When we make material changes, we will update the effective date at the top of this page and, where appropriate, notify you by email or through a notice on the site.',
        'Continued use of the service after changes take effect constitutes acceptance of the revised policy.',
      ],
    },
    {
      title: '13. Contact',
      paragraphs: [
        'For any privacy-related questions, requests, or complaints, contact us at privacy@silklearn.io. We will acknowledge your request within 5 business days and respond substantively within 30 days.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Terms of Service
// ---------------------------------------------------------------------------

export const termsOfServiceContent: LegalDocument = {
  title: 'Terms of Service',
  description:
    'The terms governing access to the SILKLEARN website, platform, and services \u2014 including account use, payment, intellectual property, and liability.',
  effectiveDate: 'March 29, 2026',
  summaryItems: [
    'Covers account creation, permitted use, pricing and payment terms, and intellectual property rights.',
    'Addresses EU consumer withdrawal rights, cancellation procedures, and refund policy.',
    'Specifies Portuguese governing law with EU consumer protection carve-outs.',
  ],
  sections: [
    {
      title: '1. Acceptance of terms',
      paragraphs: [
        'By accessing or using the SILKLEARN website at silklearn.io, creating an account, or purchasing any service, you agree to be bound by these Terms of Service and our Privacy Policy. If you are accepting on behalf of an organization, you represent that you have authority to bind that organization.',
        'If you do not agree to these terms, do not access or use the service.',
      ],
    },
    {
      title: '2. The service',
      paragraphs: [
        'SILKLEARN is a platform that transforms source material into dependency-ordered learning paths. You submit source content, and SILKLEARN processes it to generate structured learning sequences that your team can follow. Leaders review and approve paths before they reach learners.',
        'SILKLEARN operates on a hybrid model: platform access is provided under a subscription, and individual learning path generations may be billed as per-result charges depending on your plan. Details of available plans and pricing are published on the site and may be updated from time to time.',
      ],
    },
    {
      title: '3. Account registration',
      paragraphs: [
        'You must create an account to access paid features of SILKLEARN. You agree to provide accurate, complete information during registration and to keep it current. You are responsible for all activity under your account and for maintaining the confidentiality of your credentials.',
        'You must be at least 16 years old to create an account. If you are under 18, you represent that a parent or guardian has reviewed and consented to these terms on your behalf.',
      ],
    },
    {
      title: '4. Permitted use',
      paragraphs: [
        'You may use the site and service only for lawful purposes and in accordance with these terms. The following uses are prohibited.',
      ],
      bullets: [
        'Attempting unauthorized access to the service, its infrastructure, other user accounts, or related systems.',
        'Reverse engineering, decompiling, or attempting to extract source code, models, prompts, or proprietary logic.',
        'Using the service to build a competing product, or benchmarking it in a misleading or deceptive manner.',
        'Submitting content that is unlawful, infringing, defamatory, threatening, or harmful.',
        'Overloading, scraping, or interfering with the normal operation of the service.',
        'Removing or altering proprietary notices, branding, or attribution.',
      ],
    },
    {
      title: '5. Pricing, credits, and payment',
      paragraphs: [
        'SILKLEARN offers a hybrid pricing model combining platform access (a recurring subscription fee) with per-result charges (billed for each learning path generated). The specific tiers, credit packs, and pricing are detailed on our pricing page and in any order form or checkout flow.',
        'A "Result" is a dependency-ordered learning path successfully generated from your submitted source material and made available in your account. Revisions to an existing path within 7 days of generation are not billed as a separate Result.',
        'All prices are quoted in euros (EUR) unless otherwise stated. Prices are exclusive of applicable taxes unless displayed otherwise at checkout. VAT is charged in accordance with Portuguese and EU law based on your billing location.',
        'Payment is processed through Stripe. By providing payment information, you authorize us to charge the applicable fees to your payment method. Failed payments may result in service suspension after a 7-day grace period and written notice.',
      ],
    },
    {
      title: '6. Free trials and beta access',
      paragraphs: [
        'We may offer free trials, beta access, or promotional credits at our discretion. Free trial terms will be stated at signup. Unless you cancel before the trial ends, your subscription will convert to a paid plan at the published rate.',
        'Beta features are provided "as is" without warranty. Beta features may be modified, suspended, or discontinued without notice. We are not liable for any loss arising from reliance on beta features.',
      ],
    },
    {
      title: '7. Cancellation and refunds',
      paragraphs: [
        'You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. You retain access to the service until your paid period expires.',
        'Prepaid credits that have not been used are non-refundable except where required by applicable law. Unused credits remain available until your account is terminated or until they expire (12 months after purchase, whichever is earlier).',
      ],
    },
    {
      title: '8. EU consumer withdrawal right',
      paragraphs: [
        'If you are a consumer in the European Union, you have the right to withdraw from a distance contract within 14 days of its conclusion, without giving a reason.',
        'Because SILKLEARN delivers digital content and services that begin immediately upon your request, by completing your purchase you: (a) give your express prior consent for the service to begin immediately, and (b) acknowledge that you thereby waive your 14-day right of withdrawal once the service has been fully performed. If only part of the service has been performed, you remain entitled to a proportionate refund for the unused portion.',
        'To exercise your withdrawal right (where it has not been waived), send a clear statement to support@silklearn.io within 14 days of purchase. We will process refunds within 14 days of receiving your withdrawal notice, using the same payment method you used for the original purchase.',
      ],
    },
    {
      title: '9. Intellectual property',
      paragraphs: [
        'The SILKLEARN service, website, branding, design, software, documentation, and all related materials are the intellectual property of SILKLEARN or its licensors and are protected by applicable copyright, trademark, and other intellectual property laws.',
        'These Terms grant you a limited, non-exclusive, non-transferable, revocable license to access and use the service for your internal business or personal learning purposes. No other rights are granted.',
      ],
    },
    {
      title: '10. Your content and source materials',
      paragraphs: [
        'You retain all rights to the source material, documents, and content you upload to SILKLEARN. By uploading content, you grant SILKLEARN a limited, non-exclusive license to process that content solely for the purpose of generating your learning paths and delivering the service.',
        'You are solely responsible for ensuring that you have the legal right to submit the content you upload. SILKLEARN does not review uploaded content for legal compliance and accepts no liability for infringing, unlawful, or inappropriate source material.',
        'Learning paths generated by SILKLEARN from your source material are your work product. SILKLEARN does not claim ownership over your generated outputs. We may use anonymized, aggregated usage patterns to improve the service, but we will not use your source material or generated paths to serve other customers.',
      ],
    },
    {
      title: '11. Feedback',
      paragraphs: [
        'If you submit feedback, suggestions, or ideas regarding SILKLEARN, you grant us an unrestricted, irrevocable, royalty-free license to use, modify, and incorporate that feedback into the service without obligation to you, unless a separate written agreement states otherwise.',
      ],
    },
    {
      title: '12. Disclaimers',
      paragraphs: [
        'To the fullest extent permitted by applicable law, the service is provided on an "as is" and "as available" basis. SILKLEARN disclaims all warranties, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, accuracy of generated content, and non-infringement.',
        'SILKLEARN does not guarantee that the service will be uninterrupted, error-free, or secure, or that generated learning paths will be complete, accurate, or suitable for any particular purpose. You are responsible for reviewing and validating all generated output before relying on it.',
        'Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud or death or personal injury caused by negligence.',
      ],
    },
    {
      title: '13. Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by applicable law, SILKLEARN will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, goodwill, data, or business opportunity, arising from or related to your use of the service.',
        'Our total aggregate liability for all claims arising from or related to these Terms or the service is limited to the greater of (a) the amount you paid to SILKLEARN in the 12 months preceding the claim, or (b) EUR 100.',
        'These limitations apply regardless of the theory of liability (contract, tort, strict liability, or otherwise) and even if SILKLEARN has been advised of the possibility of such damages.',
      ],
    },
    {
      title: '14. Termination',
      paragraphs: [
        'Either party may terminate these Terms at any time. You may terminate by canceling your account. SILKLEARN may terminate or suspend your access immediately if you breach these Terms, if required by law, or if necessary to protect the service, other users, or our business.',
        'Upon termination, your right to use the service ceases immediately. We will retain your data for 30 days after account termination to allow for recovery. After 30 days, your data, including uploaded source material and generated paths, will be permanently deleted unless retention is required by law.',
      ],
    },
    {
      title: '15. Governing law and disputes',
      paragraphs: [
        'These Terms are governed by and construed in accordance with the laws of Portugal, without regard to conflict of law principles.',
        'Any dispute arising from or relating to these Terms shall be submitted to the competent courts of Lisbon, Portugal. However, if you are a consumer habitually resident in another EU member state, you retain the right to bring proceedings in the courts of your country of residence in accordance with applicable EU consumer protection regulations.',
        'Before initiating formal proceedings, both parties agree to attempt resolution through good-faith negotiation for a period of at least 30 days after written notice of the dispute.',
      ],
    },
    {
      title: '16. Changes to these terms',
      paragraphs: [
        'We may modify these Terms from time to time. When we make material changes, we will update the effective date and notify you via email or a prominent notice on the site at least 14 days before the changes take effect.',
        'Your continued use of the service after the updated Terms take effect constitutes your acceptance of the changes. If you do not agree with the new terms, you may cancel your account before the changes take effect.',
      ],
    },
    {
      title: '17. General provisions',
      paragraphs: [
        'If any provision of these Terms is found to be unenforceable, the remaining provisions continue in full force and effect. Our failure to enforce any right or provision does not constitute a waiver of that right or provision.',
        'These Terms, together with the Privacy Policy and EULA, constitute the entire agreement between you and SILKLEARN regarding the service. They supersede all prior agreements and communications regarding the subject matter.',
      ],
    },
    {
      title: '18. Contact',
      paragraphs: [
        'For questions about these Terms, contact us at support@silklearn.io.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// End User License Agreement
// ---------------------------------------------------------------------------

export const eulaContent: LegalDocument = {
  title: 'End User License Agreement',
  description:
    'The license terms governing your use of the SILKLEARN application, including software access, content processing, output ownership, and usage restrictions.',
  effectiveDate: 'March 29, 2026',
  summaryItems: [
    'Grants a limited license to access and use the SILKLEARN application for internal business purposes.',
    'Clarifies that you own your source materials and generated outputs \u2014 SILKLEARN retains ownership of the platform.',
    'Covers AI processing disclosure, restrictions, liability, and governing law.',
  ],
  sections: [
    {
      title: '1. License grant',
      paragraphs: [
        'Subject to your compliance with this Agreement, any applicable order form, and the Terms of Service, SILKLEARN grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the SILKLEARN application solely for your internal business or personal learning purposes.',
        'This license permits you to upload source material, generate learning paths, manage teams, review outputs, and use the features available under your subscription plan. The license does not grant you any rights to the underlying software, algorithms, models, or infrastructure.',
      ],
    },
    {
      title: '2. Scope and delivery',
      paragraphs: [
        'SILKLEARN is provided as a hosted service. You access the application through a web browser or API as made available by SILKLEARN. No software is installed on your devices except as needed for standard web access.',
        'Your subscription plan determines the features, usage limits, and per-result charges applicable to your account. SILKLEARN may introduce new features, modify existing ones, or retire features with reasonable notice.',
      ],
    },
    {
      title: '3. Restrictions',
      paragraphs: [
        'Except as expressly permitted by applicable law or a separate written agreement with SILKLEARN, you may not engage in any of the following.',
      ],
      bullets: [
        'Copy, distribute, modify, resell, lease, sublicense, or create derivative works from the application or any part of it.',
        'Decompile, reverse engineer, disassemble, or attempt to derive source code, algorithms, models, prompts, or proprietary logic from the application.',
        'Use the application to develop, train, or improve a competing product or service.',
        'Benchmark the application and publish results without SILKLEARN prior written consent.',
        'Remove, obscure, or alter any proprietary notices, branding, or attribution within the application.',
        'Share account credentials or allow unauthorized third parties to access the service through your account.',
        'Use the application in any manner that violates applicable law, infringes third-party rights, or could damage SILKLEARN reputation or systems.',
      ],
    },
    {
      title: '4. Your content and source materials',
      paragraphs: [
        'You retain full ownership of all source material, documents, files, and data you upload to SILKLEARN. You grant SILKLEARN a limited, non-exclusive license to process your content solely for the purpose of delivering the service \u2014 generating learning paths, rendering outputs, and providing related functionality.',
        'You are solely responsible for ensuring that all content you submit is lawful, non-infringing, and that you hold the necessary rights or permissions to use it. SILKLEARN does not pre-screen uploaded content.',
      ],
    },
    {
      title: '5. Output ownership',
      paragraphs: [
        'Learning paths, structured sequences, and other outputs generated by SILKLEARN from your source material are your work product. SILKLEARN does not claim ownership of your generated outputs.',
        'SILKLEARN may use anonymized, aggregated usage statistics (such as processing volumes, feature usage patterns, and performance metrics) to improve the service. We will not use your source material, generated outputs, or identifiable data to serve other customers or for any purpose unrelated to delivering and improving the service for you.',
      ],
    },
    {
      title: '6. AI processing disclosure',
      paragraphs: [
        'SILKLEARN uses artificial intelligence and machine learning technologies to analyze source material, identify dependencies between concepts, and generate structured learning paths. This processing is integral to the core service and occurs each time you submit material for path generation.',
        'AI-generated outputs may contain errors, omissions, or suboptimal sequencing. The designated leader review step exists to provide human oversight before learning paths reach end users. SILKLEARN recommends that all generated content be reviewed by a qualified person before deployment in any training or operational context.',
        'SILKLEARN does not use your uploaded content to train general-purpose AI models. Content processing is scoped to your account and your service instance.',
      ],
    },
    {
      title: '7. Updates and beta features',
      paragraphs: [
        'SILKLEARN may update, enhance, or modify the application from time to time. Updates may include bug fixes, performance improvements, new features, or changes to existing features. We will provide reasonable notice for changes that materially affect your use of the service.',
        'Beta, pilot, or early-access features are clearly labeled and provided without warranty of any kind. Beta features may be discontinued, altered, or removed without notice. Data created using beta features may not survive the transition to general availability.',
      ],
    },
    {
      title: '8. Support and service levels',
      paragraphs: [
        'SILKLEARN provides support through the channels published on the site (currently email and in-app messaging). Response times and support scope depend on your subscription plan.',
        'Unless a separate service level agreement (SLA) is in place, SILKLEARN targets commercially reasonable uptime but does not guarantee a specific availability percentage. Planned maintenance windows will be communicated in advance where feasible.',
      ],
    },
    {
      title: '9. SILKLEARN ownership',
      paragraphs: [
        'SILKLEARN and its licensors retain all right, title, and interest in and to the application, including all software, algorithms, models, interfaces, APIs, documentation, branding, and related intellectual property. This Agreement grants a license to use the service \u2014 it does not transfer ownership of any part of the application.',
        'Any feedback, suggestions, or improvement ideas you submit regarding the application may be used by SILKLEARN without restriction or compensation, unless a separate written agreement provides otherwise.',
      ],
    },
    {
      title: '10. Term and termination',
      paragraphs: [
        'This Agreement is effective from the date you first access the application and continues until terminated. You may terminate by canceling your account. SILKLEARN may terminate or suspend your license immediately if you breach this Agreement, if required by law, or if necessary to protect the service or other users.',
        'Upon termination, your access to the application ceases and your license is revoked. SILKLEARN will retain your data for 30 days post-termination to allow for export. After that period, all customer data, source material, and generated outputs will be permanently deleted unless legal retention obligations apply.',
      ],
    },
    {
      title: '11. Warranty disclaimer',
      paragraphs: [
        'To the fullest extent permitted by applicable law, SILKLEARN provides the application "as is" and "as available." We disclaim all warranties, express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, completeness, and non-infringement.',
        'SILKLEARN does not warrant that generated learning paths will be accurate, complete, error-free, or fit for any particular training or educational purpose. You bear full responsibility for reviewing and validating all outputs.',
        'Nothing in this Agreement excludes liability that cannot be excluded under applicable law.',
      ],
    },
    {
      title: '12. Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by applicable law, SILKLEARN total aggregate liability under this Agreement is limited to the amount you paid for the service in the 12 months preceding the event giving rise to the claim, or EUR 100, whichever is greater.',
        'SILKLEARN will not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, data, goodwill, or business opportunity, regardless of the theory of liability.',
      ],
    },
    {
      title: '13. Governing law',
      paragraphs: [
        'This Agreement is governed by the laws of Portugal. Disputes shall be submitted to the competent courts of Lisbon, Portugal, subject to the mandatory consumer jurisdiction protections of EU law as described in the Terms of Service.',
      ],
    },
    {
      title: '14. Entire agreement',
      paragraphs: [
        'This EULA, together with the Terms of Service and Privacy Policy, constitutes the entire agreement between you and SILKLEARN regarding the application. In the event of a conflict between this EULA and the Terms of Service, the Terms of Service prevail.',
        'If any provision of this Agreement is found to be unenforceable, the remaining provisions remain in full force and effect.',
      ],
    },
    {
      title: '15. Contact',
      paragraphs: [
        'For questions about this Agreement, contact us at support@silklearn.io.',
      ],
    },
  ],
};
