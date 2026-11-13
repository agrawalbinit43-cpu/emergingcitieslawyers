/** Everything the page says, apart from the writing list (lib/writing.ts). */

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "ai", label: "AI" },
  { id: "practice", label: "Practice" },
  { id: "approach", label: "Approach" },
  { id: "partners", label: "Partners" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Thought leadership" },
  { id: "contact", label: "Contact" },
] as const;

/** The hero graph: where the firm's lawyers studied, practised and worked, around the firm. Starting positions in a 760 × 880 viewBox,
 *  set at uneven distances so it reads as a network rather than a ring; visitors can drag every named node, and a click shows its note. */
export const GRAPH_VIEW = { w: 760, h: 880 };
export const GRAPH_HUB = { label: "ECL", x: 410, y: 480, note: "Emerging Cities Lawyers: where it all comes together." };
export const GRAPH_NODES = [
  { label: "Yale", x: 150, y: 220, note: "Yale Law School is one of the world’s foremost law schools. Prannv earned his LL.M. there." },
  { label: "NLSIU", x: 440, y: 62, note: "National Law School of India University is India’s best law school. Binit and Prannv both studied law there." },
  { label: "University of Vienna", x: 640, y: 178, note: "The University of Vienna is among Europe’s oldest universities. Binit earned a European Master in Law and Economics there." },
  { label: "Supreme Court of India", x: 640, y: 432, note: "Binit and Prannv have appeared before the Supreme Court in varied disputes, and Prannv clerked for Justice B.V. Nagarathna." },
  { label: "Competition Commission", x: 560, y: 668, note: "The CCI is India’s antitrust regulator. Binit has appeared before it on merger filings and antitrust cases." },
  { label: "Bae, Kim & Lee", x: 668, y: 832, note: "Bae, Kim & Lee is one of South Korea’s largest law firms. Binit trained there for 6 months in its technology and corporate teams." },
  { label: "BigLaw", x: 316, y: 798, note: "Khaitan & Co is one of India’s oldest and largest law firms. Binit worked in its PE/VC team in Bengaluru." },
  { label: "Deloitte New York", x: 168, y: 628, note: "Prannv worked in the international tax team at Deloitte’s New York office." },
  { label: "Lucio AI", x: 250, y: 408, note: "Lucio is a USD 5 million-funded legal AI company. As its Head of Strategy, Binit led UK/EU markets, hiring, product, and growth." },
  { label: "Information Society Project", x: 495, y: 262, note: "The Information Society Project is Yale Law School’s centre for law and technology. Prannv was a Resident Fellow there." },
  { label: "Centre for Policy Research", x: 110, y: 520, note: "The Centre for Policy Research is one of India’s leading public policy think tanks. Prannv was a Research Associate there." },
  { label: "UNDP", x: 720, y: 560, note: "The United Nations Development Programme works in about 170 countries. Binit is empanelled with it as an expert in AI and law." },
];
/** Every node links to the hub; these few links join nodes of the same kind, without closing into a ring. */
export const GRAPH_LINKS: [number, number][] = [[0, 8], [0, 9], [7, 10], [4, 11], [1, 2], [3, 4], [6, 5], [7, 6]];

export const PRACTICE = [
  ["Start-ups & venture financing", "Incorporation, ESOPs, term sheets and funding rounds."],
  ["Corporate & commercial", "Transactions, governance and company secretarial work."],
  ["Disputes & litigation", "Supreme Court, High Courts, NCLAT and arbitration."],
  ["Intellectual property", "Trade mark filings, oppositions and enforcement."],
  ["India entry & cross-border", "Entity set-up and back offices for foreign companies."],
  ["Competition & antitrust", "Merger filings and CCI cases, including digital markets."],
  ["Employment & labour", "Contracts, policies, labour codes and exits."],
  ["Technology, data & AI", "DPDP compliance, SaaS agreements and AI governance."],
] as const;

export const WORK = [
  ["Venture financing", "Guided early- to mid-stage founders from incorporation and NDAs through term sheets to convertible note rounds."],
  ["Funds & PE", "Worked on deal structuring and investments for leading fund managers and investors, and advised a US-fund on their India strategy."],
  ["India entry", "Helped set up a foreign technology company’s back office in India: strategy, entity, compliance, employment, and trade marks."],
  ["Trade marks", "Acted for a range of clients on trade mark applications, registrations, and disputes."],
  ["Litigation", "Appeared before the Supreme Court, High Courts in several states, company law tribunals, and local courts across commercial, constitutional, and consumer matters.\n\nActed in Supreme Court cases on Pegasus spyware surveillance and the Waqf (Amendment) Act, and on caste surveys and reservations.\n\nRepresented the State of Punjab and the Government of NCT of Delhi, including against a ₹1,000 crore NGT penalty.\n\nAssisted the amicus in the Indian Medical Association case on misleading drug advertisements.\n\nAlso handled UAPA bail, prison safety, pay parity between Assam Rifles riflemen and the BSF, and a medical teachers’ association’s case on who may teach in medical colleges."],
  ["Arbitration & mediation", "Acted in a DIAC arbitration that ended in settlement, and in court-annexed mediation."],
  ["Competition", "Acted on merger filings and antitrust litigation before the CCI. Advised on competition law, with a focus on digital markets."],
  ["Employment", "Advised a major fund and a mid-stage startup on employment and labour law compliance."],
  ["Corporate advisory", "Advised technology and consumer start-ups, school trusts, societies and energy companies on corporate compliance, transactions and disputes, including an AI start-up on an acquisition and the Punjab Dyers Association on MSME laws."],
  ["Government advisory", "Advised the Climate Change Council, Government of Meghalaya, on enforcement."],
] as const;

export const PRINCIPLES = [
  ["Clear", "The answer first, in plain language."],
  ["Practical", "No work or cost the problem doesn’t need."],
  ["Responsive", "Quick turnarounds, straight from the lawyers doing the work."],
  ["Fee transparency", "Fixed fees or simple retainers, agreed upfront."],
] as const;

/** The AI section: three illustrated cards (components/AiScenes.tsx draws them, in this order). */
export const AI_CARDS = [
  ["On our machines", "Our AI harnesses and agents run locally. Sensitive files stay on our devices."],
  ["Built in-house", "We assemble our tools from open-source parts, so we know what each step does with your work."],
  ["Faster, for less", "AI does everything it is good at. You pay for legal acumen, never for the software or for work that is better automated."],
] as const;

export const AI_CHECKS = [
  "A lawyer reviews and signs every draft.",
  "Your engagement letter names our tools.",
  "You can opt out of any of them.",
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
      "Binit advises on VC and PE deals, corporate work, competition law and technology regulation. He worked in the PE/VC team at Khaitan & Co, and filed merger notices before the CCI at Axiom5 Law Chambers, a competition boutique. He also trained for six months with the technology and corporate teams of Bae, Kim & Lee in Seoul. As Head of Strategy at Lucio, a legal AI company, he led its expansion abroad, fundraising and hiring.",
      "He has worked as a consultant with UNDP, the Digital Cooperation Organisation in Saudi Arabia, Open Society Foundations and GIZ. He is an Affiliate Fellow of the Cyril Shroff Centre for AI, Law & Regulation, and has appeared before the Supreme Court, several High Courts and the NCLAT.",
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
      "Prannv is an advocate enrolled with the Bar Council of Delhi. He clerked for Justice B.V. Nagarathna at the Supreme Court of India, then practised trial and appellate litigation at Farasat Law Offices before the Supreme Court and High Courts. Earlier, he worked in the international tax team at Deloitte, New York. He was a Research Associate at the Centre for Policy Research and a Visiting Researcher at the Centre de Sciences Humaines. He has also advised Cortex Capital.",
      "At Yale Law School he studied corporate and international tax. He was a Resident Fellow at the Information Society Project and is associated with the Paul Tsai China Center. He served as Editor of the Yale Journal on Regulation and the Yale Law & Policy Review. Through the Lowenstein International Human Rights Clinic, he advised domestic and international civil society organisations. He was also part of the Ludwig Program in Public Sector Leadership and holds the MacMillan Translation Fellowship.",
    ],
    edu: ["LL.M., Yale Law School", "B.A. LL.B. (Hons.), National Law School of India University"],
    email: "pd@emergingcitieslawyers.com",
    linkedin: "https://www.linkedin.com/in/prannv-dhawan-296b79155/",
  },
];

export const OFFICES = [
  {
    city: "Delhi",
    address: "161, S Block, GK-2, Delhi 110048",
  },
  {
    city: "Bangalore",
    address: "1st Floor, The Horizon, Richmond Town, Bangalore, 560025",
  },
  {
    city: "Ludhiana",
    address: "South City, Ayali Khurd, Ludhiana, Punjab 142027",
  },
  {
    city: "Raipur",
    address: "1st Floor, G8, ATM Chowk, Avanti Vihar, Sector 1, Shankar Nagar, Raipur, Chhattisgarh 492001",
  },
] as const;

export const OFFICE = OFFICES[0].address;
