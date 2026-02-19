export function About() {
  const focuses = [
    "Product Management & Strategy",
    "Data Analytics & Decision Science",
    "LLM Applications & AI Product",
    "Cross-functional Stakeholder Leadership",
  ]

  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-photo-wrap">
          <div
            className="about-photo"
            role="img"
            aria-label="Headshot placeholder"
          >
            <span
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "0.72rem",
                color: "var(--warm-400)",
                letterSpacing: "0.1em",
                textAlign: "center",
                padding: "20px",
              }}
            >
              Your
              <br />
              headshot
              <br />
              <br />
              {"[ 3:4 ratio ]"}
            </span>
          </div>
          <div className="about-photo-accent" aria-hidden="true"></div>
        </div>
        <div>
          <p className="section-label">About</p>
          <h2 className="section-title">
            The full picture,
            <br />
            not just the r&eacute;sum&eacute;.
          </h2>
          <div className="divider"></div>
          <p className="about-bio">
            {"I'm a product professional with [X years] of experience building at the intersection of product management, data analytics, and emerging technology. I care deeply about getting the why right before touching the what — which means I spend a lot of time talking to users, questioning assumptions, and translating messy reality into clear, executable roadmaps."}
            <br />
            <br />
            {"Outside of product, I geek out on LLM applications, exploratory data analysis, and building tools that reduce friction in ways people don't even notice. I believe the best product work is invisible."}
          </p>
          <ul className="about-focuses">
            {focuses.map((focus) => (
              <li key={focus} className="about-focus-item">
                <span className="focus-icon"></span> {focus}
              </li>
            ))}
          </ul>
          <p className="about-location">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Toronto, Ontario, Canada
          </p>
        </div>
      </div>
    </section>
  )
}
