export const personas = [
  {
    id: 'researcher',
    selector: 'Researchers',
    eyebrow: 'FOR RESEARCHERS',
    title: 'You have fifteen papers on the same topic. Three of them contradict each other.',
    animationSrc: '/silklearn/animations/team%20leader.json',
    problem:
      "You're not missing information — you're missing structure. You can't tell which paper's framework supersedes another, which claims are in tension, or what you need to read before the methodology section makes sense.",
    solution:
      'SILKLEARN ingests your source material and maps the dependency structure — what concepts build on each other, where papers conflict, and what you need to read first before anything else makes sense.',
    outcomes: [
      { label: 'You get', value: 'A dependency-ordered reading path through your sources.' },
      { label: 'You surface', value: 'Contradictions between papers before they confuse your analysis.' },
      { label: 'You stop', value: 'Rereading sections to figure out what you were supposed to know first.' },
    ],
  },
  {
    id: 'developer',
    selector: 'Developers',
    eyebrow: 'FOR DEVELOPERS',
    title: "The codebase has docs. They don't tell you what to read before the architecture doc makes sense.",
    animationSrc: '/silklearn/animations/tech%20lead.json',
    problem:
      "The repo has a wiki, runbooks, architecture notes, and an onboarding doc that assumes you already know things. There's no signal about what depends on what. You discover the sequence by getting things wrong.",
    solution:
      "SILKLEARN maps the dependency structure across your codebase docs — what foundational concepts unlock the rest, where the runbooks assume knowledge the onboarding doc doesn't provide, and what order actually makes sense.",
    outcomes: [
      { label: 'You get', value: 'A dependency-ordered path through the docs, not a pile of links.' },
      { label: 'You surface', value: "Gaps where the onboarding docs assume knowledge they don't provide." },
      { label: 'You stop', value: 'Asking senior engineers to reconstruct the sequence for you.' },
    ],
  },
  {
    id: 'student',
    selector: 'Students',
    eyebrow: 'FOR STUDENTS',
    title: 'Three textbooks on the same subject. They define the same term differently.',
    animationSrc: '/silklearn/animations/ops%20manager.json',
    problem:
      "You're working from a primary textbook, a secondary reference, and a set of lecture notes. They don't agree on terminology, they assume different prerequisites, and you can't tell whose framing to follow when they conflict.",
    solution:
      "SILKLEARN maps what each source assumes you already know, surfaces where they disagree, and builds a reading path that respects the dependency structure across all three — so you're not reconciling contradictions manually at the end.",
    outcomes: [
      { label: 'You get', value: 'A single dependency-ordered path across all your source material.' },
      { label: 'You surface', value: 'Terminological conflicts and contradictions before your exam.' },
      { label: 'You stop', value: 'Manually cross-referencing sources to figure out which one is right.' },
    ],
  },
  {
    id: 'domain-switcher',
    selector: 'Domain switchers',
    eyebrow: 'FOR DOMAIN SWITCHERS',
    title: 'New job. New field. The reading list has thirty items and no order.',
    animationSrc: '/silklearn/animations/compliance.json',
    problem:
      "You're switching domains — new company, new industry, new technical stack. Everyone says \"just read these docs\" but nobody explains what order the docs assume, which ones are foundational, or where the gaps are.",
    solution:
      "SILKLEARN takes whatever you've been handed and compiles the structure it implies — what must come first, what assumes other knowledge, and where the material contradicts itself — so you can ramp up in the right order rather than the wrong one.",
    outcomes: [
      { label: 'You get', value: 'A dependency-ordered entry path into an unfamiliar domain.' },
      { label: 'You surface', value: "What the material assumes you already know that wasn't in the reading list." },
      { label: 'You stop', value: 'Spending the first month discovering the sequence the hard way.' },
    ],
  },
] as const;