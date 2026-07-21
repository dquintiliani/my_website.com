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
      <div className="contact-inner">
        {/* Placement 4: Direct links */}
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
            </a>
          ))}
        </div>

        {/* Placement 5: Form */}
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

      <style jsx>{`
        /* --- Mobile First Base Styles --- */
        .contact-section {
          background-color: #EEEAE3;
          padding: 64px 24px;
          font-family: 'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif;
        }


        .contact-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #2C5F14;
          margin: 0;
        }

        .contact-heading {
          font-size: clamp(32px, 8vw, 52px);
          font-weight: 700;
          color: #1A1916;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
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
          font-weight: 400;
          margin: 0;
        }

        /* Links styling */
        .links-col {
          display: flex;
          flex-direction: column;
        }

        .link-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #D2CEC5;
          text-decoration: none;
          color: #3D3B37;
          transition: color 0.15s ease;
        }
        
        .link-row:first-child {
          border-top: 1px solid #D2CEC5;
        }

        .lnk-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #D2CEC5;
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

        .link-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
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
        }

        /* Form styling */
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
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }

        .field-group + .field-group {
          margin-top: 16px;
        }

        .field-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #AEADA5;
        }

        .input-control,
        .textarea-control {
          width: 100%;
          background: #E4DFD5;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 12px 14px;
          font-size: 16px; /* 16px avoids iOS zoom */
          font-family: inherit;
          color: #1A1916;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .input-control:focus,
        .textarea-control:focus {
          border-color: #2C5F14;
          background: #fff;
        }

        .textarea-control {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          padding: 16px;
          background: #1A1916;
          color: #EEEAE3;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 12px;
          transition: background 0.2s ease;
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
          padding: 12px;
          background: #DCE9D4;
          border-radius: 4px;
          font-size: 13px;
          color: #2C5F14;
          font-weight: 500;
        }

        .desktop-br {
          display: none;
        }

        /* --- Desktop Grid Layout --- */
        @media (min-width: 840px) {
          .contact-section {
            padding: 96px 40px;
          }

          /* Define the 12-column grid */
          .contact-inner {
            width: 100%;
            max-width: 1080px; 
            margin: 0 auto;
            box-sizing: border-box;
            
            /* Mobile padding baseline */
            padding: 64px 20px; 
          }

          /* Once the screen hits tablet/desktop sizes, apply the larger padding */
          @media (min-width: 768px) {
            .contact-inner {
              padding: 150px 40px;
            }
          }

          .desktop-br {
            display: inline;
          }

          /* Placement Mapping */
          .contact-eyebrow {
            grid-column: 1 / 5;
            grid-row: 1;
          }

          .contact-heading {
            grid-column: 7 / 13;
            grid-row: 1;
            margin-top: -8px; /* Optically align with eyebrow text */
          }

          .contact-subhead {
            grid-column: 1 / 5;
            grid-row: 2;
          }

          .links-col {
            grid-column: 7 / 10;
            grid-row: 2;
          }

          .form-container {
            grid-column: 10 / 13;
            grid-row: 2;
          }

          /* Desktop specific tweaks */
          .field-row {
            flex-direction: row;
          }
          
          .field-group + .field-group {
            margin-top: 0;
          }

          .input-control,
          .textarea-control {
            font-size: 14px; /* Can safely reduce size on desktop */
          }

          .submit-btn {
            padding: 12px 24px;
            width: auto;
            align-self: flex-end;
          }

          .link-row {
            padding: 12px 0;
            gap: 12px;
          }
          .link-row:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}