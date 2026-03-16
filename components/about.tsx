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
    { value: "5M+", label: "Users on systems I've owned" },
    { value: "3", label: "Industries · One focus area" },
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
    <section id="about" style={s.section}>
      <div style={s.inner}>

        {/* Headline */}
        <div style={s.top}>
          <p style={s.eyebrow}>About</p>
          <h2 style={s.headline}>
            Four years. Three industries.{" "}
            <em style={s.em}>One through-line.</em>
          </h2>
        </div>

        {/* Two-column body */}
        <div style={s.body}>

          {/* Left: timeline + stats */}
          <div style={s.left}>
            <p style={s.timelineLabel}>Career</p>

            {companies.map((co) => (
              <div
                key={co.name}
                style={{
                  ...s.company,
                  borderTop: co.name === "Ticketmaster" ? "1px solid #D2CEC5" : undefined,
                }}
              >
                <div style={s.dotCol}>
                  <div style={s.dot} />
                  {!co.last && <div style={s.line} />}
                </div>
                <div style={s.coInfo}>
                  <p style={s.coName}>{co.name}</p>
                  <p style={s.coRole}>
                    {co.role}
                    <br />
                    {co.sub}
                  </p>
                  <span style={s.coSignal}>{co.signal}</span>
                </div>
              </div>
            ))}

            <div style={s.stats}>
              {stats.map((st) => (
                <div key={st.label} style={s.statRow}>
                  <span style={s.statVal}>{st.value}</span>
                  <span style={s.statDesc}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: labeled paragraphs */}
          <div style={s.right}>
            {paragraphs.map((p, i) => (
              <div
                key={p.label}
                style={{
                  ...s.paraBlock,
                  borderTop: i === 0 ? "1px solid #D2CEC5" : undefined,
                }}
              >
                <p style={s.paraLabel}>{p.label}</p>
                <p style={s.paraText}>{p.text}</p>
              </div>
            ))}

            <div style={s.status}>
              <div style={s.statusDot} />
              <span style={s.statusText}>
                Product Manager · Open to opportunities in Toronto
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#EEEAE3",
    padding: "96px 0",
    fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  inner: {
    maxWidth: "1060px",
    margin: "0 auto",
    padding: "0 40px",
  },

  // Headline row
  top: {
    marginBottom: "64px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: "#2C5F14",
    margin: "0 0 18px",
  },
  headline: {
    fontSize: "clamp(36px, 4.5vw, 56px)",
    fontWeight: 700,
    color: "#1A1916",
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    margin: 0,
  },
  em: {
    fontStyle: "italic",
    color: "#2C5F14",
  },

  // Layout
  body: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "64px",
    alignItems: "start",
  },

  // Left column
  left: {
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "40px",
  },
  timelineLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#AEADA5",
    margin: "0 0 16px",
  },
  company: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    padding: "16px 0",
    borderBottom: "1px solid #D2CEC5",
  },
  dotCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "5px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#2C5F14",
    flexShrink: 0,
  },
  line: {
    width: "1px",
    flex: 1,
    backgroundColor: "#D2CEC5",
    marginTop: "6px",
    minHeight: "24px",
  },
  coInfo: {
    flex: 1,
  },
  coName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#1A1916",
    margin: "0 0 3px",
  },
  coRole: {
    fontSize: "12px",
    color: "#7A7670",
    lineHeight: 1.4,
    margin: 0,
  },
  coSignal: {
    display: "inline-block",
    marginTop: "8px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#2C5F14",
    backgroundColor: "#DCE9D4",
    padding: "3px 8px",
    borderRadius: "2px",
  },
  stats: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #D2CEC5",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  statRow: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  statVal: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1A1916",
    letterSpacing: "-0.02em",
  },
  statDesc: {
    fontSize: "11px",
    color: "#7A7670",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    fontWeight: 500,
  },

  // Right column
  right: {
    display: "flex",
    flexDirection: "column",
  },
  paraBlock: {
    padding: "24px 0",
    borderBottom: "1px solid #D2CEC5",
  },
  paraLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#AEADA5",
    margin: "0 0 10px",
  },
  paraText: {
    fontSize: "15px",
    color: "#3D3B37",
    lineHeight: 1.85,
    margin: 0,
  },

  // Status
  status: {
    marginTop: "28px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#2C5F14",
    flexShrink: 0,
  },
  statusText: {
    fontSize: "12px",
    color: "#7A7670",
    letterSpacing: "0.03em",
  },
};