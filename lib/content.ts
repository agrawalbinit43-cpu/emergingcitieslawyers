/** Everything the page says, apart from the writing list (lib/writing.ts). */

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "background", label: "Background" },
  { id: "practice", label: "Practice" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "partners", label: "Partners" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

/** The hero graph: where the firm's lawyers studied, practised and worked, around the firm. Starting positions in a 760 × 880 viewBox,
 *  set at uneven distances so it reads as a network rather than a ring; visitors can drag every named node. */
export const GRAPH_VIEW = { w: 760, h: 880 };
export const GRAPH_HUB = { label: "ECL", x: 410, y: 480 };
export const GRAPH_NODES = [
  { label: "Yale", x: 150, y: 220 },
  { label: "NLSIU", x: 440, y: 62 },
  { label: "Vienna", x: 692, y: 178 },
  { label: "Supreme Court of India", x: 640, y: 432 },
  { label: "Competition Commission", x: 560, y: 668 },
  { label: "Bae, Kim & Lee", x: 668, y: 832 },
  { label: "BigLaw", x: 316, y: 798 },
  { label: "Deloitte", x: 168, y: 628 },
  { label: "Lucio AI", x: 250, y: 408 },
];
/** Every node links to the hub; these few links join nodes of the same kind, without closing into a ring. */
export const GRAPH_LINKS: [number, number][] = [[0, 8], [1, 2], [3, 4], [6, 5], [7, 6]];

export const CREDENTIALS = [
  { title: "Studied at", items: ["National Law School of India University, Bengaluru", "Yale Law School", "University of Vienna"] },
  {
    title: "Appeared before",
    items: ["Supreme Court of India", "High Courts across several states", "National Company Law Appellate Tribunal (NCLAT)", "Competition Commission of India (CCI)"],
  },
  {
    title: "Worked at",
    items: [
      "Supreme Court of India, as Law Clerk to Justice B.V. Nagarathna",
      "Khaitan & Co",
      "Deloitte, New York",
      "Lucio AI",
      "Axiom5 Law Chambers",
      "Centre for Policy Research",
      "Bae, Kim & Lee, Seoul",
    ],
  },
  {
    title: "Advised",
    items: ["United Nations Development Programme (UNDP)", "Digital Cooperation Organisation, Saudi Arabia", "Open Society Foundations", "Cortex Capital", "Cyril Shroff Centre for AI, Law & Regulation"],
  },
];

export const PRACTICE = [
  ["Start-ups & venture financing", "Incorporation, founder agreements, ESOPs, term sheets, NDAs and regulatory filings."],
  ["Corporate & commercial", "Structuring, transactions, contracts, governance and company secretarial work."],
  ["Disputes & litigation", "Supreme Court, High Courts and NCLAT. Strategy before filing, and arbitration."],
  ["Intellectual property", "Trade mark searches, filings, oppositions and enforcement. Assignment and licensing."],
  ["Tax & transfer pricing", "Corporate tax, GST, withholding and permanent establishment."],
  ["India entry & cross-border", "Operating model, entity set-up, investment rules and back-office support for foreign companies."],
  ["Competition & antitrust", "Merger filings, investigations and appeals before the Competition Commission of India (CCI), including digital markets."],
  ["Employment & labour", "Contracts, policies, labour codes, incentive plans and exits."],
  ["Technology, data & AI", "DPDP Act compliance, cross-border transfers, SaaS agreements and AI governance."],
] as const;

export const WORK = [
  ["Venture financing", "Guided early- to mid-stage founders from incorporation and NDAs through term sheets to convertible note rounds."],
  ["Funds & PE", "Worked on deal structuring and investments for leading fund managers and investors, and advised a US-fund on their India strategy."],
  ["India entry", "Helped set up a foreign technology company’s back office in India: strategy, entity, compliance, employment, and trade marks."],
  ["Trade marks", "Acted for a range of clients on trade mark applications, registrations, and disputes."],
  ["Litigation", "Appeared before the Supreme Court, High Courts in several states, company law tribunals, and local courts across commercial, constitutional, and consumer matters."],
  ["Competition", "Acted on merger filings and antitrust litigation before the CCI, and competition law advisory, with a focus on digital markets."],
  ["Employment", "Advised a major fund and a mid-stage startup on employment and labour law compliance."],
  ["Corporate advisory", "Advised technology and consumer start-ups, school trusts, societies and energy companies across corporate compliance, transactions, and disputes."],
] as const;

export const PRINCIPLES = [
  ["Clear", "The answer first, in plain language."],
  ["Practical", "No work or cost the problem doesn’t need."],
  ["Responsive", "Quick turnarounds, straight from the lawyers doing the work."],
  ["Fee transparency", "Fixed fees or simple retainers, agreed upfront."],
] as const;

export const AI_CHECKS = [
  "A lawyer checks every AI-assisted draft and answers for it.",
  "Your engagement letter names the tools we use.",
  "You can opt out of any of them.",
  "No separate charge for them.",
];

export const ALLIED = [
  ["AI transformation", "Where AI fits, which tools, governance and training."],
  ["Operations", "HR, payroll, finance, procurement, compliance calendars and vendors."],
  ["India strategy", "Subsidiary, GCC or service-provider models, and first hires, for foreign start-ups."],
  ["Cross-border compliance", "FEMA, data transfers and intra-group arrangements."],
] as const;

export const PARTNERS = [
  {
    name: "Binit Agrawal",
    photo: "/img/binit-agrawal.jpg",
    role: "Corporate, transactions, competition, technology",
    bio: [
      "Binit advises on VC and PE deals, corporate work, competition law and technology regulation. He worked in the PE/VC and technology M&A practice of a leading firm, and filed merger notices before the CCI at a competition boutique. As Head of Strategy at Lucio, a legal AI company, he led its expansion abroad, fundraising and hiring.",
      "He has advised UNDP, the Digital Cooperation Organisation, Open Society Foundations, GIZ and Cortex Capital, and is an Affiliate Fellow of the Cyril Shroff Centre for AI, Law & Regulation.",
    ],
    edu: ["B.A. LL.B. (Hons.), National Law School of India University", "M.A. LL.M., University of Vienna (European Master in Law and Economics)"],
    email: "ba@emergingcitieslawyers.com",
    linkedin: "https://www.linkedin.com/in/binitagrawal/",
  },
  {
    name: "Prannv Dhawan",
    photo: "/img/prannv-dhawan.jpg",
    role: "Disputes, constitutional and public law, tax",
    bio: [
      "Prannv is an advocate enrolled with the Bar Council of Delhi. He clerked for Justice B.V. Nagarathna at the Supreme Court of India, then practised trial and appellate litigation at Farasat Law Offices before the Supreme Court and High Courts. Earlier, he worked in the tax advisory and transfer pricing team at Deloitte, New York, and was a Research Associate at the Centre for Policy Research.",
      "At Yale Law School he studied corporate and international tax. His thesis compared the tax exemption of universities in India and the United States.",
    ],
    edu: ["LL.M., Yale Law School", "B.A. LL.B. (Hons.), National Law School of India University"],
    email: "pd@emergingcitieslawyers.com",
    linkedin: "https://www.linkedin.com/in/prannv-dhawan-296b79155/",
  },
];

export const OFFICE = "161, S Block, GK-2, Delhi 110048";
