export function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">
          {"Product Professional \u00B7 Patient \u00B7 Persistent \u00B7 Impact-Driven"}
        </p>
        <h1 className="hero-name">
          Dominic
          <br />
          Quintili<em>an</em>
        </h1>
        <p className="hero-tagline">
          I turn ambiguous problems into clear product decisions — bridging user
          insight, data, and strategy to ship things that actually matter.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact Me
          </a>
        </div>
        <p className="hero-status">
          <span className="status-dot"></span>
          <strong>Principal PM</strong>
          {"  \u00B7  Open to opportunities in Toronto"}
        </p>
      </div>
    </section>
  )
}
