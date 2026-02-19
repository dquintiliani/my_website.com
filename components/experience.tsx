export function Experience() {
  const roles = [
    {
      company: "Ticketmaster",
      title: "Product Manager",
    },
    {
      company: "TheScore",
      title: "Technical Product Manager",
    },
    {
      company: "Lululemon",
      title: "Product Manager, MP&A Systems",
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
              </div>
              <h3 className="timeline-title">{role.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
