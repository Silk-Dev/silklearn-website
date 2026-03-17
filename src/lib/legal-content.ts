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

const reviewNotice =
  'This page is provided as an operational draft for SILKLEARN and should be reviewed by legal counsel before production use.';

export const privacyPolicyContent: LegalDocument = {
  title: 'Privacy Policy',
  description:
    'How SILKLEARN collects, uses, stores, and protects information when people visit the marketing site, join the waitlist, or interact with the product.',
  effectiveDate: 'March 17, 2026',
  reviewNotice,
  summaryItems: [
    'Explains what information SILKLEARN collects from the marketing site and waitlist flows.',
    'Describes how analytics, messaging, and infrastructure vendors may process data on our behalf.',
    'Clarifies that this draft should be finalized with legal review before public launch.',
  ],
  sections: [
    {
      title: '1. Scope',
      paragraphs: [
        'This Privacy Policy applies to the SILKLEARN marketing website, waitlist flows, and related communications. It is intended to describe how SILKLEARN handles personal information in connection with early access, product marketing, and customer communication.',
        'If SILKLEARN later offers customer-specific contractual terms, product-specific data processing terms, or enterprise security addenda, those documents may supplement this policy.',
      ],
    },
    {
      title: '2. Information we collect',
      paragraphs: [
        'SILKLEARN may collect information that you provide directly, information collected automatically when you use the site, and information generated through communication or onboarding flows.',
      ],
      bullets: [
        'Contact details such as name, email address, company name, and role when you submit forms or request access.',
        'Technical and usage information such as device/browser details, page visits, referrers, and high-level interaction data through analytics tooling.',
        'Communication data when you message us through support or chat tools, including Intercom or similar systems.',
      ],
    },
    {
      title: '3. How we use information',
      paragraphs: [
        'SILKLEARN uses information to operate the site, respond to requests, manage early-access interest, improve product and marketing performance, and communicate with prospective users or customers.',
      ],
      bullets: [
        'To provide and maintain the website and related content.',
        'To process waitlist requests, demos, or sales conversations.',
        'To measure performance, diagnose product/website issues, and improve messaging or conversion flows.',
        'To send product updates, launch communications, or relevant follow-up messages where legally permitted.',
      ],
    },
    {
      title: '4. Legal bases and permissions',
      paragraphs: [
        'Depending on jurisdiction, SILKLEARN may rely on consent, legitimate interests, contractual necessity, or legal obligations as the basis for processing personal information. Where consent is required, we intend to request it in an appropriate manner before sending certain categories of communications or placing certain analytics/marketing technologies.',
      ],
    },
    {
      title: '5. Vendors and service providers',
      paragraphs: [
        'SILKLEARN may use infrastructure, analytics, customer communication, hosting, database, and content-management providers to operate the website and related services. Those providers may process information on SILKLEARN’s behalf subject to their own contractual and security commitments.',
      ],
      bullets: [
        'Hosting and deployment providers such as Vercel or equivalent infrastructure vendors.',
        'Analytics providers such as Google Analytics, PostHog, and similar tools.',
        'Customer messaging providers such as Intercom or equivalent systems.',
        'Content and operational tooling such as Sanity, database providers, and internal business systems.',
      ],
    },
    {
      title: '6. Data retention',
      paragraphs: [
        'SILKLEARN retains information only for as long as reasonably necessary to operate the site, manage relationships, comply with law, resolve disputes, and protect the business. Retention periods may vary based on the type of information and the reason it was collected.',
      ],
    },
    {
      title: '7. Your rights',
      paragraphs: [
        'Depending on applicable law, you may have rights to access, correct, delete, or restrict the use of your personal information, or to object to certain processing. You may also have the right to withdraw consent where consent is the basis for processing.',
        'To make a privacy-related request, contact SILKLEARN through the channels identified on the site. We may need to verify your identity before fulfilling certain requests.',
      ],
    },
    {
      title: '8. Security',
      paragraphs: [
        'SILKLEARN intends to use reasonable technical and organizational measures to protect personal information. However, no method of transmission or storage is perfectly secure, and this policy should not be interpreted as a guarantee of absolute security.',
      ],
    },
    {
      title: '9. International transfers',
      paragraphs: [
        'SILKLEARN and its service providers may process information in multiple countries. Where required, SILKLEARN should adopt appropriate safeguards for cross-border transfers and document them in production legal and privacy materials.',
      ],
    },
    {
      title: '10. Changes to this policy',
      paragraphs: [
        'SILKLEARN may update this Privacy Policy from time to time. If material changes are made, the effective date will be updated and additional notice may be provided where appropriate.',
      ],
    },
  ],
};

export const termsOfServiceContent: LegalDocument = {
  title: 'Terms of Service',
  description:
    'The baseline terms governing access to the SILKLEARN website, waitlist flows, and early product interactions.',
  effectiveDate: 'March 17, 2026',
  reviewNotice,
  summaryItems: [
    'Describes the basic rules for using the SILKLEARN site and interacting with early-access materials.',
    'Limits misuse of the website, brand, and pre-release materials.',
    'Sets placeholder legal boundaries pending formal counsel review and production rollout.',
  ],
  sections: [
    {
      title: '1. Acceptance of terms',
      paragraphs: [
        'By accessing or using the SILKLEARN website, submitting information through forms, or otherwise engaging with SILKLEARN through the site, you agree to these Terms of Service. If you do not agree, do not use the site.',
      ],
    },
    {
      title: '2. Site purpose',
      paragraphs: [
        'The SILKLEARN site is intended to provide information about the product, gather early-access interest, publish marketing and informational content, and support communication with potential customers, partners, or users.',
        'Certain parts of the site or future product may be pre-release, invitation-only, or subject to separate agreements.',
      ],
    },
    {
      title: '3. Permitted use',
      paragraphs: [
        'You may use the website only for lawful purposes and in a manner that does not violate applicable law, infringe rights, interfere with the site, or damage SILKLEARN’s systems, business, or reputation.',
      ],
      bullets: [
        'Do not attempt unauthorized access to the site, its infrastructure, or related systems.',
        'Do not reverse engineer, scrape abusively, or overload the site in ways that disrupt normal operation.',
        'Do not use the site to submit unlawful, harmful, deceptive, or infringing content.',
      ],
    },
    {
      title: '4. Intellectual property',
      paragraphs: [
        'Unless otherwise stated, the site, its content, branding, visual design, copy, graphics, and related materials are owned by SILKLEARN or its licensors and are protected by applicable intellectual property laws.',
        'These Terms do not grant you ownership of any SILKLEARN intellectual property except for the limited right to access the site in accordance with these Terms.',
      ],
    },
    {
      title: '5. Feedback',
      paragraphs: [
        'If you submit feedback, suggestions, or ideas regarding SILKLEARN, you agree that SILKLEARN may use them without restriction or obligation, unless a separate written agreement states otherwise.',
      ],
    },
    {
      title: '6. Pre-release and forward-looking materials',
      paragraphs: [
        'The site may describe roadmap concepts, upcoming features, or product intentions. Those descriptions are informational only and should not be treated as binding commitments. SILKLEARN may modify, delay, or discontinue features at its discretion.',
      ],
    },
    {
      title: '7. Disclaimers',
      paragraphs: [
        'The site and its content are provided on an "as is" and "as available" basis to the fullest extent permitted by law. SILKLEARN disclaims warranties of any kind, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      ],
    },
    {
      title: '8. Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by law, SILKLEARN will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenues, goodwill, or data arising from or related to use of the site.',
        'This draft should be refined with legal review to ensure jurisdiction-specific enforceability and appropriate caps on liability.',
      ],
    },
    {
      title: '9. Termination',
      paragraphs: [
        'SILKLEARN may suspend or terminate access to the site at any time if necessary to protect the business, other users, the integrity of the service, or to comply with law.',
      ],
    },
    {
      title: '10. Governing law and updates',
      paragraphs: [
        'These Terms should ultimately specify governing law, jurisdiction, and dispute-resolution terms after legal review. Until then, they operate as a placeholder baseline for site use and pre-release engagement.',
        'SILKLEARN may update these Terms from time to time by revising the effective date and posting an updated version on the site.',
      ],
    },
  ],
};

export const eulaContent: LegalDocument = {
  title: 'End User License Agreement',
  description:
    'A placeholder end-user license framework for access to the SILKLEARN application, including pre-release and hosted product use.',
  effectiveDate: 'March 17, 2026',
  reviewNotice,
  summaryItems: [
    'Defines the license model for use of the SILKLEARN application and related materials.',
    'Restricts unauthorized copying, reverse engineering, resale, and misuse of the product.',
    'Acts as a draft baseline until production product terms are finalized with legal review.',
  ],
  sections: [
    {
      title: '1. License grant',
      paragraphs: [
        'Subject to compliance with this Agreement and any applicable order form or subscription terms, SILKLEARN grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the SILKLEARN application for your internal business purposes.',
      ],
    },
    {
      title: '2. License scope',
      paragraphs: [
        'The license covers access to SILKLEARN as provided by SILKLEARN, including hosted software, interfaces, and documentation made available to you under the applicable service model. All rights not expressly granted are reserved.',
      ],
    },
    {
      title: '3. Restrictions',
      paragraphs: [
        'Except as expressly permitted by law or written agreement, you may not copy, distribute, modify, resell, lease, sublicense, decompile, reverse engineer, or create derivative works from the product.',
      ],
      bullets: [
        'Do not attempt to extract source code or underlying models, prompts, or proprietary logic.',
        'Do not use SILKLEARN to build a competing service or benchmark it in a misleading way.',
        'Do not remove notices, attribution, or proprietary markings.',
      ],
    },
    {
      title: '4. Customer data and responsibilities',
      paragraphs: [
        'You are responsible for ensuring that you have the right to submit any source material, documents, or data you provide to SILKLEARN. You remain responsible for the legality, accuracy, and appropriateness of customer-controlled content.',
        'Where SILKLEARN later offers customer-specific data processing commitments, those should be reflected in separate contractual terms.',
      ],
    },
    {
      title: '5. Updates and pre-release features',
      paragraphs: [
        'SILKLEARN may modify, update, enhance, or discontinue features from time to time. Beta, pilot, or early-access features may be incomplete, experimental, or subject to additional restrictions.',
      ],
    },
    {
      title: '6. Ownership',
      paragraphs: [
        'SILKLEARN retains all right, title, and interest in and to the product, software, interfaces, documentation, and related intellectual property. This Agreement grants a license, not a transfer of ownership.',
      ],
    },
    {
      title: '7. Support and availability',
      paragraphs: [
        'Unless otherwise agreed in writing, SILKLEARN is not obligated to provide any particular level of support, maintenance, uptime, or service-level commitment under this draft EULA. Production commitments should be reflected in commercial terms or service schedules.',
      ],
    },
    {
      title: '8. Term and termination',
      paragraphs: [
        'This license continues until terminated. SILKLEARN may suspend or terminate access if you violate this Agreement, fail to comply with applicable terms, or use the product in a manner that threatens SILKLEARN, other users, or the integrity of the service.',
      ],
    },
    {
      title: '9. Warranty disclaimer and liability',
      paragraphs: [
        'To the fullest extent permitted by law, SILKLEARN provides the product "as is" and disclaims warranties of any kind. SILKLEARN should finalize liability limitations, disclaimers, and any jurisdiction-specific clauses with legal review before broad public release.',
      ],
    },
    {
      title: '10. Final legal review',
      paragraphs: [
        'Because license structure, enforceability, governing law, and customer data obligations depend on how SILKLEARN is ultimately sold and delivered, this EULA should be treated as a high-quality draft rather than final legal advice.',
      ],
    },
  ],
};
