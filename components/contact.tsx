"use client"

export function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div>
          <p className="section-label">Get in Touch</p>
          <h2 className="contact-heading">
            {"Let's talk"}
            <br />
            {"about what's next."}
          </h2>
          <p className="contact-text">
            {"Whether you're hiring, building something interesting, or just want to swap notes on product and data \u2014 I'm always happy to connect."}
          </p>
          <div className="contact-links">
            <a href="mailto:TODO@youremail.com" className="contact-link">
              <span className="contact-icon">{"\u2709"}</span>
              <span>dquintilian@gmail.com</span>
            </a>
            <a
              href="#"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">in</span>
              <span>LinkedIn &mdash; Add your handle</span>
            </a>
            <a
              href="#"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon" style={{ fontSize: "0.9rem" }}>
                {"\u2325"}
              </span>
              <span>GitHub &mdash; Add your handle</span>
            </a>
            <a
              href="#"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon" style={{ fontSize: "0.8rem" }}>
                {"\u2193"}
              </span>
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
        <div>
          <p
            className="contact-form-label"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              marginBottom: "24px",
            }}
          >
            Or send a quick message
          </p>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="contact-name">
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              placeholder="Your name"
              aria-label="Your name"
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="contact-email">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              placeholder="your@email.com"
              aria-label="Your email"
            />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              placeholder="What's on your mind?"
              aria-label="Your message"
            ></textarea>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => alert("Connect this to a form handler.")}
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  )
}
