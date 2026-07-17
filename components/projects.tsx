import Link from "next/link"
import { getAllTools } from "@/lib/tools"

// Homepage teaser — shows a few AI side-tools and links to the full /projects index.
// Full listing lives in app/projects/page.tsx; both read from lib/tools.ts.
export function Projects() {
  const tools = getAllTools().slice(0, 2)

  return (
    <section id="projects">
      <div className="projects-inner">
        <p className="section-label">{"Things I've built with AI"}</p>
        <h2 className="section-title">Projects &amp; tools.</h2>
        <div className="divider"></div>
        <div className="projects-grid">
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

          {/* View-all card */}
          <Link
            href="/projects"
            className="project-card fade-in-element"
            style={{
              borderStyle: "dashed",
              background: "transparent",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--warm-400)",
              }}
            >
              View all projects
              <br />&amp; tools &rarr;
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
