export function Skills() {
  const skillGroups = [
    {
      label: "Product",
      pills: [
        "Roadmapping",
        "Discovery & Research",
        "Prioritization Frameworks",
        "OKRs",
        "Stakeholder Alignment",
        "Go-to-Market",
        "Agile / Scrum",
      ],
    },
    {
      label: "Data",
      pills: [
        "SQL",
        "Python",
        "Pandas",
        "Exploratory Analysis",
        "A/B Testing",
        "Tableau",
        "Looker",
      ],
    },
    {
      label: "Technical",
      pills: [
        "LLM Applications",
        "Prompt Engineering",
        "API Integration",
        "Git",
        "Jupyter Notebooks",
      ],
    },
    {
      label: "Tools & Platforms",
      pills: [
        "Figma",
        "Notion",
        "Jira",
        "Confluence",
        "Linear",
        "Mixpanel",
        "Amplitude",
      ],
    },
  ]

  return (
    <section id="skills">
      <div className="skills-inner">
        <p className="section-label">Capabilities</p>
        <h2 className="section-title">{"Skills & tools."}</h2>
        <div className="divider"></div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="skill-group-label fade-in-element">{group.label}</p>
              <div className="skill-pills">
                {group.pills.map((pill) => (
                  <span key={pill} className="pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
