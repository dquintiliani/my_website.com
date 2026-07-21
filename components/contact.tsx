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
          <p className="eyebrow">Get in touch</p>
          <h2 className="title">Reach out and Say Hi </h2>
        </div>

        {/* Content Layout */}
        <div className="contact-grid">
          
          {/* Direct Links Column inside Dotted Container */}
          <div className="links-col">
            <p className="section-label">Direct Channels</p>
            <div className="dotted-card links-card">
              {CONTACT_LINKS.map(({ href, icon, label, value, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="link-row"
                >
                  <span className="lnk-icon">{icon}</span>
                  <div className="link-info">
                    <span className="link-label">{label}</span>
                    <span className="link-value">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Column inside Dotted Container */}
          <form onSubmit={handleSubmit} className="dotted-card form-container">
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
                <span>✓</span> Message sent — I&apos;ll be in touch shortly.
              </div>
            )}
          </form>

        </div>
      </div>

      <style jsx>{`
        /* Base Container */
        .contact-section {
          background-color: #F3EFE6;
          color: #1C1C1A;
          padding: 64px 24px;
        }

        .contact-container {
          max-width: 1152px;
          margin: 0 auto;
        }

        /* Header Styling */
        .contact-header {
          margin-bottom: 48px;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #2E4A32;
          margin: 0 0 8px 0;
        }

        .title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #1C1C1A;
          margin: 0;
          line-height: 1.15;
          max-width: 640px;
        }

        .section-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
          margin: 0 0 8px 0;
        }

        /* Dotted Paper Card Base Class */
        .dotted-card {
          background-color: #FAF8F5;
          /* Subtle dot grid pattern inside card */
          background-image: radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px);
          background-size: 18px 18px;
          border: 1px solid rgba(46, 74, 50, 0.2);
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        /* Layout Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }

        /* Links Card */
        .links-col {
          display: flex;
          flex-direction: column;
        }

        .links-card {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .link-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          text-decoration: none;
          background-color: rgba(250, 248, 245, 0.85); /* Slightly opaque to keep text readable */
          backdrop-filter: blur(2px);
          transition: background-color 0.2s ease;
        }

        .link-row:hover {
          background-color: rgba(255, 255, 255, 0.95);
        }

        .lnk-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .link-row:hover .lnk-icon {
          background: #2E4A32;
          color: #ffffff;
          border-color: transparent;
        }

        .link-info {
          display: flex;
          flex-direction: column;
        }

        .link-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
        }

        .link-value {
          font-size: 14px;
          font-weight: 500;
          color: #1C1C1A;
          transition: color 0.2s ease;
        }

        .link-row:hover .link-value {
          color: #2E4A32;
        }

        /* Form Card */
        .form-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-top-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.45);
          margin: 0;
        }

        .field-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .field-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
        }

        .input-control,
        .textarea-control {
          width: 100%;
          background-color: #E8E4DC;
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          font-family: inherit;
          color: #1C1C1A;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .input-control::placeholder,
        .textarea-control::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }

        .input-control:focus,
        .textarea-control:focus {
          border-color: #2E4A32;
          background-color: #FFFFFF;
        }

        .textarea-control {
          resize: vertical;
          min-height: 120px;
        }

        /* Submit Button */
        .submit-btn {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #1C1C1A;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px 28px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #2E4A32;
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .success-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(46, 74, 50, 0.1);
          color: #2E4A32;
          padding: 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
        }

        /* Responsive Breakpoints */
        @media (min-width: 640px) {
          .form-container {
            padding: 36px;
          }

          .field-row {
            flex-direction: row;
          }
        }

        @media (min-width: 1024px) {
          .contact-section {
            padding: 96px 24px;
          }

          .contact-grid {
            grid-template-columns: 5fr 7fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}