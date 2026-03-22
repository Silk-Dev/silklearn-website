export const personas = [
  {
    id: 'team-leads',
    selector: 'Team Leads',
    eyebrow: 'FOR TEAM LEADS',
    title: 'Your team reads the docs. They still ask the same questions. Every cohort.',
    animationSrc: '/silklearn/animations/team%20leader.json',
    problem:
      "Engineers aren't skipping the docs — they're reading them in the wrong order. The prerequisite structure was never made visible. Every new hire improvises the same path, makes the same early mistakes.",
    solution:
      'Compiles your existing runbooks into a prerequisite-ordered path you approve before anyone follows it. No new docs to write.',
    outcomes: [
      { label: 'You get', value: 'A reviewed onboarding sequence, ready to hand to new hires from day one.' },
      { label: 'You stop', value: 'Answering the same questions every quarter.' },
      { label: 'Your team gets', value: 'A clear path - not a pile of docs with no indication of where to start.' },
    ],
  },
  {
    id: 'ops-managers',
    selector: 'Ops Managers',
    eyebrow: 'FOR OPS MANAGERS',
    title: 'Rollouts slow down when critical steps stay buried across runbooks and handoffs.',
    animationSrc: '/silklearn/animations/ops%20manager.json',
    problem:
      'Your team may have the documentation, but not the dependency logic. When rollout order is implied instead of explicit, handoffs slip, steps are missed, and teams discover the sequence only after something breaks.',
    solution:
      'SILKLEARN surfaces the rollout order your docs already imply, then gives leaders a review step before the sequence ships to the team. The structure becomes visible before another handoff depends on it being right.',
    outcomes: [
      { label: 'You get', value: 'A rollout checklist in dependency order, ready to use.' },
      { label: 'You stop', value: 'Relying on tribal knowledge to carry critical handoffs.' },
      { label: 'Your team gets', value: 'A rollout path that shows what must happen first.' },
    ],
  },
  {
    id: 'compliance',
    selector: 'Compliance',
    eyebrow: 'FOR COMPLIANCE',
    title: 'Audit work gets harder when the reasoning trail is scattered across the docs.',
    animationSrc: '/silklearn/animations/compliance.json',
    problem:
      'When review history, source context, and ownership live in different places, compliance teams spend time reconstructing why a decision was made instead of reviewing a clean trail from source to approval.',
    solution:
      'SILKLEARN builds a reviewable audit trail from your actual documents as leaders inspect the compiled structure. Reviewer names, timestamps, and source links stay tied to the material that produced the final output.',
    outcomes: [
      { label: 'You get', value: 'A compliance review queue linked back to exact source sections.' },
      { label: 'You stop', value: 'Rebuilding decision history manually during audits.' },
      { label: 'Your team gets', value: 'A traceable review path grounded in the original docs.' },
    ],
  },
  {
    id: 'technical-leaders',
    selector: 'Technical Leaders',
    eyebrow: 'FOR TECHNICAL LEADERS',
    title: 'Your internal AI cannot reason well if the source context arrives unordered.',
    animationSrc: '/silklearn/animations/tech%20lead.json',
    problem:
      'Most internal AI setups inherit the same weakness as the docs they pull from: the context has no visible prerequisite order, no review step, and no clear boundary between source and guesswork.',
    solution:
      'SILKLEARN gives your AI structured context from leader-reviewed source. Instead of a retrieval guess, the system packages the material in the order the team has already approved.',
    outcomes: [
      { label: 'You get', value: 'An AI context bundle grounded in reviewed source.' },
      { label: 'You stop', value: 'Trusting unordered retrieval to stand in for actual structure.' },
      { label: 'Your team gets', value: 'Context that arrives in the right order, not just the closest match.' },
    ],
  },
] as const;