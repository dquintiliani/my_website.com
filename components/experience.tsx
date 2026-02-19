export function Experience() {
  const roles = [
    {
      company: "[Company Name]",
      dates: "[Month Year] \u2013 Present",
      title: "[Your Title, e.g. Principal Product Manager]",
      highlights: [
        "[Impact-focused highlight: describe what you shipped and what changed \u2014 e.g., \u201CLed end-to-end launch of X feature, driving Y% increase in Z metric\u201D]",
        "[Second highlight: quantify wherever possible \u2014 e.g., \u201CUnified three fragmented data pipelines into a single source of truth, reducing analyst time-to-insight by 40%\u201D]",
        "[Third highlight: outcome over responsibility \u2014 e.g., \u201CPartnered with ML team to scope and ship first AI-powered recommendation layer\u201D]",
      ],
    },
    {
      company: "[Previous Company]",
      dates: "[Month Year] \u2013 [Month Year]",
      title: "[Previous Title]",
      highlights: [
        "[Impact highlight \u2014 e.g., \u201CDefined MVP scope for new self-serve onboarding flow; reduced support ticket volume by 30%\u201D]",
        "[Impact highlight \u2014 e.g., \u201CBuilt and maintained executive-facing reporting dashboards using SQL and Tableau across 5 product lines\u201D]",
        "[Impact highlight \u2014 e.g., \u201CRan 12+ discovery interviews per quarter; synthesized insights into roadmap priorities adopted by two squads\u201D]",
      ],
    },
    {
      company: "[Earlier Company]",
      dates: "[Month Year] \u2013 [Month Year]",
      title: "[Earlier Title]",
      highlights: ["[Impact highlight]", "[Impact highlight]"],
    },
  ]

  return (
    <section id="experience">
      <div className="experience-inner">
        <p className="section-label">Career</p>
        <h2 className="section-title">{"Experience & highlights."}</h2>
        <div className="divider"></div>
        <div className="timeline">
          {roles.map((role, i) => (
            <div key={i} className="timeline-item fade-in-element">
              <div className="timeline-dot"></div>
              <div className="timeline-meta">
                <span className="timeline-company">{role.company}</span>
                <span className="timeline-dates">{role.dates}</span>
              </div>
              <h3 className="timeline-title">{role.title}</h3>
              <ul className="timeline-highlights">
                {role.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
