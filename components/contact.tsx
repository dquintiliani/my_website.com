"use client";

import { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const CONTACT_LINKS = [
  {
    href: "mailto:dquintilian@gmail.com",
    Icon: Mail,
    label: "Email",
    value: "dquintilian@gmail.com",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/dominic-quintilian/",
    Icon: Linkedin,
    label: "LinkedIn",
    value: "dominic-quintilian",
    external: true,
  },
  {
    href: "https://github.com/dquintiliani",
    Icon: Github,
    label: "GitHub",
    value: "dquintiliani",
    external: true,
  },
] as const;

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
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
        <div
          ref={ref}
          className={`contact-card${isVisible ? " is-visible" : ""}`}
        >
          <div className="contact-monogram" aria-hidden="true">DQ</div>

          <header className="contact-header">
            <p className="contact-kicker">Get in Touch</p>
            <h2 className="contact-title">
              Reach Out
              <br />
              and <em>Say Hi</em>
            </h2>
            <div className="contact-rule" />
            <p className="contact-subtitle">
              Whether you&apos;re hiring, collaborating, or simply want to
              exchange ideas, I&apos;d love to hear from you.
            </p>
          </header>

          <div className="contact-content">
            <aside className="contact-info">
              {CONTACT_LINKS.map(({ href, Icon, label, value, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="contact-info-item"
                >
                  <span className="contact-info-label">{label}</span>
                  <span className="contact-info-value">
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    {value}
                  </span>
                  <span className="contact-info-divider" />
                </a>
              ))}
            </aside>

            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your Letter</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="contact-textarea"
                />
              </div>

              {success && (
                <div className="contact-success-msg" role="status">
                  <span>✓</span> Message sent — I&apos;ll be in touch shortly.
                </div>
              )}
            </form>
          </div>

          <div className="contact-footer">
            <p className="contact-footer-note">
              Toronto, Ontario&nbsp;•&nbsp;Designed with Intention
            </p>
            <button
              type="submit"
              form="contact-form"
              disabled={loading}
              className="contact-submit-btn"
            >
              {loading ? "Sending…" : "Seal & Send →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
