"use client";

export function About() {
  const companies = [
    {
      name: "Ticketmaster",
      role: "Product Manager",
      sub: "Checkout & Reporting",
      signal: "Source of truth data",
      last: false,
    },
    {
      name: "TheScore",
      role: "Technical PM",
      sub: "Sports API Platform",
      signal: "56% latency · 75% cost ↓",
      last: false,
    },
    {
      name: "Lululemon",
      role: "Product Manager",
      sub: "Merchandise Systems",
      signal: "Global planning platform",
      last: true,
    },
  ];

  const stats = [
    { value: "4+ yrs", label: "Data platform PM experience" },
    { value: "5M+",    label: "Users on systems I've owned" },
    { value: "3",      label: "Industries · One focus area" },
  ];

  const paragraphs = [
    {
      label: "The work",
      text: "I've spent four-plus years making product decisions that live or die by what the data actually says — not what stakeholders assume it says.",
    },
    {
      label: "The path",
      text: "That work has taken me from ticketing infrastructure at Ticketmaster, where the margin for error on high-demand sale events is essentially zero, to analytics tooling at TheScore, where fan-facing product decisions move fast and instrumenting them correctly matters just as much as shipping them. Most recently at Lululemon, I worked inside the Merchandise Planning & Allocation systems that determine what shows up in stores — where a bad assumption upstream costs inventory, not just a sprint.",
    },
    {
      label: "The focus",
      text: "Across all three, the through-line was the same: someone needed to bridge the gap between what the data team built and what the product team could actually use. That's the problem I'm drawn to, and it's why I've drifted toward data platform and self-serve analytics as a focus area.",
    },
    {
      label: "Outside work",
      text: "I teach Python to teenagers in Roncesvalles and I'm building a trend-detection tool that indexes Reddit, Hacker News, and arXiv. I learn by building. It shows.",
    },
  ];

  return (
    <section id="about">
      <div className="about-inner">

        {/* Headline */}
        <div className="about-top">
          <p className="section-label">About</p>
          <h2 className="about-headline">
            Four years. Three industries.{" "}
            <em>One through-line.</em>
          </h2>
        </div>

        {/* Two-column body */}
        <div className="about-body">

          {/* Left: timeline + stats */}
          <div className="about-left">
            <p className="about-timeline-label">Career</p>

            {companies.map((co) => (
              <div key={co.name} className="about-company">
                <div className="about-dot-col">
                  <div className="about-dot" />
                  {!co.last && <div className="about-dot-line" />}
                </div>
                <div className="about-co-info">
                  <p className="about-co-name">{co.name}</p>
                  <p className="about-co-role">
                    {co.role}
                    <br />
                    {co.sub}
                  </p>
                  <span className="about-co-signal">{co.signal}</span>
                </div>
              </div>
            ))}

            <div className="about-stats">
              {stats.map((st) => (
                <div key={st.label} className="about-stat-row">
                  <span className="about-stat-value">{st.value}</span>
                  <span className="about-stat-desc">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: labeled paragraphs */}
          <div className="about-right">
            {paragraphs.map((p) => (
              <div key={p.label} className="about-para-block">
                <p className="about-para-label">{p.label}</p>
                <p className="about-para-text">{p.text}</p>
              </div>
            ))}

            <div className="about-status">
              <div className="about-status-dot" />
              <span className="about-status-text">
                Product Manager · Open to opportunities in Toronto
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}