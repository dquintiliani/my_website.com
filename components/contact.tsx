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
      <style jsx>{`
        .contact-section {
          background-color: #EEEAE3;
          padding: 64px 20px;
          font-family: 'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        @media (min-width: 768px) {
          .contact-section {
            padding: 96px 40px;
          }
        }

        .contact-inner {
          max-width: 1080px;
          margin: 0 auto;
        }

        .contact-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #2C5F14;
          margin: 0 0 16px;
        }

        .contact-heading {
          font-size: clamp(28px, 6vw, 52px);
          font-weight: 700;
          color: #1A1916;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 20px;
        }

        .contact-heading-em {
          font-style: italic;
          color: #2C5F14;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
        }

        .contact-subhead {
          font-size: 15px;
          color: #7A7670;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 0 40px;
          font-weight: 400;
        }

        /* Responsive 1 to 2 Column Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }

        @media (min-width: 840px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
          .contact-subhead {
            margin-bottom: 56px;
          }
        }

        .links-col {
          display: flex;
          flex-direction: column;
        }

        .link-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          min-height: 54px; /* Touch-friendly height */
          border-bottom: 1px solid #D2CEC5;
          text-decoration: none;
          color: #3D3B37;
          transition: color 0.15s ease;
        }

        .link-row:first-child {
          border-top: 1px solid #D2CEC5;
        }

        .lnk-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #E8E3D9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #7A7670;
          flex-shrink: 0;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .link-row:hover {
          color: #1A1916;
        }

        .link-row:hover .lnk-icon {
          background: #1A1916;
          color: #EEEAE3;
        }

        .link-row:hover .lnk-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .link-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden; /* Prevent text clipping on narrow mobile */
        }

        .link-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #AEADA5;
        }

        .link-value {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lnk-arrow {
          font-size: 16px;
          color: #2C5F14;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        /* Form Controls */
        .form-container {
          display: flex;
          flex-direction: column;
        }

        .form-top-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #AEADA5;
          margin: 0 0 16px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (min-width: 540px) {
          .field-row {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-group + .field-group {
          margin-top: 16px;
        }

        .field-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #AEADA5;
        }

        .input-control,
        .textarea-control {
          width: 100%;
          background: #E8E3D9;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 12px 14px;
          /* 16px base font sizes prevent iOS Safari auto-zoom on input focus */
          font-size: 16px; 
          font-family: inherit;
          color: #1A1916;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .input-control,
          .textarea-control {
            font-size: 14px;
          }
        }

        .input-control:focus,
        .textarea-control:focus {
          border-color: #2C5F14;
          background: #fff;
        }

        .textarea-control {
          resize: vertical;
          line-height: 1.6;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          min-height: 48px; /* Accessible mobile touch target */
          background: #1A1916;
          color: #EEEAE3;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease;
          margin-top: 12px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #2C5F14;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-msg {
          margin-top: 12px;
          padding: 12px 14px;
          background: #DCE9D4;
          border-radius: 4px;
          font-size: 13px;
          color: #2C5F14;
          fontWeight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Mobile line breaks */
        .desktop-br {
          display: none;
        }
        @media (min-width: 640px) {
          .desktop-br {
            display: inline;
          }
        }
      `}</style>

      <div className="contact-inner">
        {/* Header */}
        <p className="contact-eyebrow">Get in touch</p>
        <h2 className="contact-heading">
          If you&apos;re building something that<br className="desktop-br" />
          {" "}lives and dies by its{" "}
          <em className="contact-heading-em">data</em>,<br className="desktop-br" />
          {" "}I want to hear about it.
        </h2>
        <p className="contact-subhead">
          Whether you&apos;re hiring, building something interesting, or want to
          swap notes on product and data —{" "}
          <strong>I&apos;m always open.</strong>
        </p>

        {/* Responsive Layout Grid */}
        <div className="contact-grid">

          {/* Left: direct links */}
          <div className="links-col">
            {CONTACT_LINKS.map(({ href, icon, label, value, external }) => (
              <a
                key={href}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="link-row"
              >
                <span className="lnk-icon">{icon}</span>
                <span className="link-info">
                  <span className="link-label">{label}</span>
                  <span className="link-value">{value}</span>
                </span>
                <span className="lnk-arrow">→</span>
              </a>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="form-container">
            <p className="form-top-label">Or send a direct message</p>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="input-control"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-control"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on?"
                required
                rows={4}
                className="textarea-control"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Sending…" : "Send message →"}
            </button>

            {success && (
              <div className="success-msg" role="status">
                <span>✓</span>
                Message sent — I&apos;ll be in touch shortly.
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}