import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { ScrollFadeIn } from "@/components/scroll-fade-in";

export const metadata: Metadata = {
  title: "Projects — Dominic Quintilian",
  description:
    "Small tools I've built with AI — from an LLM token-budget estimator to a tongue-in-cheek model matchmaker.",
  openGraph: {
    title: "Projects — Dominic Quintilian",
    description:
      "Small tools I've built with AI — from an LLM token-budget estimator to a tongue-in-cheek model matchmaker.",
    type: "website",
  },
};

export default function ProjectsPage() {
  const tools = getAllTools();

  return (
    <section id="projects">
      <ScrollFadeIn />
      <div className="blog-inner">
        {/* ── Header ── */}
        <div className="blog-header">
          <p className="section-label">Projects</p>
          <h1 className="blog-page-title">
            Things I&apos;ve built with <em>AI</em>.
          </h1>
          <p className="blog-page-desc">
            Side tools and experiments I&apos;ve shipped by pairing product
            thinking with AI. Each one is live — click in and try it.
          </p>
        </div>

        {/* ── Tool grid ── */}
        <div className="projects-grid" style={{ marginTop: "8px" }}>
          {tools.map((tool, i) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="project-card fade-in-element"
              {...(tool.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <p className="project-number">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="project-title">{tool.title}</h3>
              <p className="project-summary">{tool.summary}</p>
              <div className="project-meta">
                <span>
                  <strong>{tool.status === "live" ? "Live tool" : "Experiment"}</strong>
                </span>
                <span>{tool.built}</span>
              </div>
              <div className="project-tags">
                {tool.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-link">Open tool &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
