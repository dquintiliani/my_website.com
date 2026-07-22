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
  },
  {
    slug: "promptsmith",
    title: "Promptsmith",
    summary:
      "A prompt engineering quiz platform with beginner and expert tracks — from clarity and constraints to chain-of-thought, few-shot learning, and injection prevention.",
    href: "https://quiz-website-ten-omega.vercel.app/",
    built: "With Next JS",
    tags: ["Prompt Engineering", "Quiz"],
    status: "live",
    external: true,
  },
];

/** Ordered for display: featured first, original order otherwise. */
export function getAllTools(): Tool[] {
  return [...TOOLS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
