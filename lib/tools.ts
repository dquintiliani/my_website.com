// Single source of truth for the AI side-tools surfaced on the homepage teaser
// (components/projects.tsx) and the full index (app/projects/page.tsx).
// Add a tool here and it shows up in both places — same pattern as lib/articles.ts.

export interface Tool {
  /** Stable id, also used as the card number source order */
  slug: string;
  title: string;
  /** One-line summary of what it does and who it's for */
  summary: string;
  /** Internal route the tool lives at */
  href: string;
  /** Short label shown under the tool, e.g. how it was built */
  built: string;
  tags: string[];
  /** "live" ships as a working tool; "experiment" is a playful/rough build */
  status: "live" | "experiment";
  /** Featured tools lead the homepage teaser and the index page */
  featured?: boolean;
  /** True if href points off-site (opens in a new tab) */
  external?: boolean;
  /** Short highlight bullets shown in the project detail modal */
  features: { title: string; description: string }[];
  /** Screenshot shown in the project detail modal's preview frame */
  image?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "data-generator",
    title: "Sample Data Generator",
    summary:
      "Generate realistic mock datasets — e-commerce orders, web analytics, ad spend, CRM, inventory, finance, and support tickets — with adjustable row counts, messy/dirty data, and duplicates, then export straight to Excel.",
    href: "/data-generator",
    built: "Built with AI · React + Next.js",
    tags: ["Data Analysis", "Excel Export"],
    status: "live",
    featured: true,
    image: "/images/tools/data-generator.png",
    features: [
      {
        title: "Realistic Mock Data",
        description: "Create thousands of believable records across e-commerce, analytics, CRM, and finance instantly.",
      },
      {
        title: "Export Ready",
        description: "Download straight to Excel, CSV, or JSON for your pipeline or dashboard.",
      },
      {
        title: "Dirty Data Simulation",
        description: "Add duplicates, nulls, and malformed values to stress-test cleaning workflows.",
      },
    ],
  },
  {
    slug: "model-budget",
    title: "Model Token Budget Estimator",
    summary:
      "Sketch out a feature's prompt, context, and call volume, and get a live estimate of the token spend across today's frontier models — before you write a line of code.",
    href: "/model-budget",
    built: "Built with AI · React + Next.js",
    tags: ["LLM Tooling", "Cost Modeling"],
    status: "live",
    featured: true,
    features: [
      {
        title: "Live Token Estimates",
        description: "Sketch prompt, context, and call volume and watch the spend update in real time.",
      },
      {
        title: "Frontier Model Coverage",
        description: "Compares pricing across today's leading models side by side.",
      },
      {
        title: "Plan Before You Build",
        description: "Catch runaway cost scenarios before writing a line of code.",
      },
    ],
  },
  {
    slug: "model-matchmaker",
    title: "Model Matchmaker",
    summary:
      "A tongue-in-cheek dating quiz for LLMs. Answer eight questions about your use case, budget, and privacy needs, and it matches you with your ideal model for your personality.",
    href: "/model-matchmaker",
    built: "Built with AI · Interactive quiz",
    tags: ["LLM Selection", "Fun"],
    status: "experiment",
    image: "/images/tools/model-matchmaker.png",
    features: [
      {
        title: "Eight-Question Quiz",
        description: "Answer a few quick prompts about use case, budget, and privacy needs.",
      },
      {
        title: "Personality-Based Match",
        description: "Get paired with the model that fits your workflow — and your vibe.",
      },
      {
        title: "Just for Fun",
        description: "A tongue-in-cheek way to explore what's out there.",
      },
    ],
  },
  {
    slug: "Learn prompting",
    title: "Prompt Quiz",
    summary:
      "A prompt engineering quiz platform with beginner and expert tracks — from clarity and constraints to chain-of-thought, few-shot learning, and injection prevention.",
    href: "https://prompt-quiz-platform.vercel.app/",
    built: "With Next JS",
    tags: ["Prompt Engineering", "Quiz"],
    status: "live",
    external: true,
    features: [
      {
        title: "Beginner & Expert Tracks",
        description: "Structured paths from clarity and constraints to chain-of-thought.",
      },
      {
        title: "Hands-On Quizzes",
        description: "Practice prompt engineering concepts with interactive questions.",
      },
      {
        title: "Injection Prevention",
        description: "Covers few-shot learning and defending prompts against misuse.",
      },
    ],
  },
];

/** Ordered for display: featured first, original order otherwise. */
export function getAllTools(): Tool[] {
  return [...TOOLS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
