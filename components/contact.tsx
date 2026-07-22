"use client";

import { useState } from "react";

const CONTACT_LINKS = [
  {
    href: "mailto:dquintilian@gmail.com",
    icon: "✉",
    label: "Email",
    value: "dquintilian@gmail.com",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/dominic-quintilian/",
    icon: "in",
    label: "LinkedIn",
    value: "dominic-quintilian",
    external: true,
  },
  {
    href: "https://github.com/dquintiliani",
    icon: "⌥",
    label: "GitHub",
    value: "dquintiliani",
    external: true,
  },
] as const;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* Header Section */}
        <div className="contact-header">
          <p className="contact-eyebrow">Get in touch</p>
          <h2 className="contact-title">Reach out and Say Hi </h2>
        </div>

        {/* Content Layout */}
        <div className="contact-grid">

          {/* Direct Links Column inside Dotted Container */}
          <div className="contact-links-col">
            <p className="contact-channels-label">Direct Channels</p>
            <div className="contact-dotted-card contact-links-card">
              {CONTACT_LINKS.map(({ href, icon, label, value, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="contact-link-row"
                >
                  <span className="contact-link-icon">{icon}</span>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{label}</span>
                    <span className="contact-link-value">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Column inside Dotted Container */}
          <form onSubmit={handleSubmit} className="contact-dotted-card contact-form">
            <p className="contact-form-top-label">Or send a direct message</p>

            <div className="contact-field-row">
              <div className="contact-field-group">
                <label className="contact-field-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="contact-input"
                />
              </div>

              <div className="contact-field-group">
                <label className="contact-field-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="contact-input"
                />
              </div>
            </div>

            <div className="contact-field-group">
              <label className="contact-field-label">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on?"
                required
                rows={4}
                className="contact-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="contact-submit-btn"
            >
              {loading ? "Sending…" : "Send message →"}
            </button>

            {success && (
              <div className="contact-success-msg" role="status">
                <span>✓</span> Message sent — I&apos;ll be in touch shortly.
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
