export function Projects() {
  const projects = [
    {
      number: "01",
      title: "[Mini-Hackathon Project Name]",
      summary:
        "[One-line summary \u2014 e.g., \u201CAn LLM-powered triage tool that classifies incoming support tickets and suggests responses in real-time.\u201D]",
      role: "[Product Lead / Solo Builder / PM & Designer]",
      outcome: "[e.g., Reduced mock triage time by 60% in user testing]",
      tags: ["LLM Prototyping", "Product Strategy"],
      link: { text: "View project \u2192", href: "#" },
    },
    {
      number: "02",
      title: "[Python / Data Project Name]",
      summary:
        "[One-line summary \u2014 e.g., \u201CExploratory analysis of [dataset] to identify [insight], visualized with Plotly and shared as a public notebook.\u201D]",
      role: "[Solo analyst / Data lead]",
      outcome: "[e.g., Insight surfaced to stakeholders; informed Q3 roadmap]",
      tags: ["Data Analysis", "Python"],
      link: { text: "View on GitHub \u2192", href: "#" },
    },
    {
      number: "03",
      title: "[Professional Project or Case Study]",
      summary:
        "[One-line summary \u2014 e.g., \u201CRedesigned the onboarding experience for [product], cutting time-to-value from 14 days to 4.\u201D]",
      role: "[Product Manager]",
      outcome: "[e.g., 35% improvement in D7 activation rate]",
      tags: ["Product Strategy", "Growth"],
      link: { text: "Read case study \u2192", href: "#" },
    },
    {
      number: "04",
      title: "[Side Project or Hackathon]",
      summary: "[One-line summary \u2014 what it is and who it\u2019s for.]",
      role: "[Your role]",
      outcome: "[Key result or status]",
      tags: ["Hackathon", "AI / ML"],
      link: { text: "View project \u2192", href: "#" },
    },
    {
      number: "05",
      title: "[Another Project]",
      summary: "[One-line summary.]",
      role: "[Your role]",
      outcome: "[Key result]",
      tags: ["Data Analysis", "Visualization"],
      link: null,
    },
  ]

  return (
    <section id="projects">
      <div className="projects-inner">
        <p className="section-label">{"Work & Side Projects"}</p>
        <h2 className="section-title">Selected projects.</h2>
        <div className="divider"></div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card fade-in-element">
              <p className="project-number">{project.number}</p>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              <div className="project-meta">
                <span>
                  <strong>My Role:</strong> {project.role}
                </span>
                <span>
                  <strong>Outcome:</strong> {project.outcome}
                </span>
              </div>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link.href}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link.text}
                </a>
              )}
            </div>
          ))}
          <div
            className="project-card fade-in-element"
            style={{
              borderStyle: "dashed",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "0.78rem",
                color: "var(--warm-400)",
                textAlign: "center",
                letterSpacing: "0.06em",
              }}
            >
              Add more projects
              <br />
              or remove this card
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
