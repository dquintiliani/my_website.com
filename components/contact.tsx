"use client"

import { useState } from "react"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setSuccess(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false) 
    }
  }

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
              <span>LinkedIn &mdash; <a href="https://www.linkedin.com/in/dominic-quintilian/">dominic-quintilian</a></span>
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
              <span>GitHub &mdash;<a href="https://github.com/dquintiliani">dquintiliani</a></span>
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
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label className="contact-form-label" htmlFor="contact-name">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                placeholder="Your name"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && (
              <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
                Message sent successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
