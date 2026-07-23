"use client";

import { useEffect, useState } from "react";
import { Mail, Linkedin, Github, BadgeCheck, CheckCircle2 } from "lucide-react";
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

type ContactPhase = "idle" | "sending" | "sealed" | "flying" | "success";

export function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<ContactPhase>("idle");
  const [cycle, setCycle] = useState(0);

  function resetToIdle() {
    setName("");
    setEmail("");
    setMessage("");
    setPhase("idle");
    setCycle((c) => c + 1);
  }

  useEffect(() => {
    if (phase !== "success") return;
    const t = setTimeout(resetToIdle, 4200);
    return () => clearTimeout(t);
  }, [phase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      setPhase(reduced ? "success" : "sealed");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setPhase("idle");
    }
  }

  function handleCardAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    if (e.animationName === "envelopeSealIn" && phase === "sealed") {
      setPhase("flying");
    } else if (e.animationName === "cardFlyAway" && phase === "flying") {
      setPhase("success");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-stage">
          <div
            ref={ref}
            key={cycle}
            className={[
              "contact-card",
              isVisible ? "is-visible" : "",
              phase === "sealed" ? "is-sealed" : "",
              phase === "flying" ? "is-flying" : "",
              phase === "success" ? "is-sent" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onAnimationEnd={handleCardAnimationEnd}
          >
            <div className="contact-hole contact-hole--top" aria-hidden="true" />
            <div className="contact-hole contact-hole--middle" aria-hidden="true" />
            <div className="contact-hole contact-hole--bottom" aria-hidden="true" />

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
                      disabled={phase !== "idle"}
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
                      disabled={phase !== "idle"}
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
                    disabled={phase !== "idle"}
                    className="contact-textarea"
                  />
                </div>
              </form>
            </div>

            <div className="contact-footer">
              <p className="contact-footer-note">
                Toronto, Ontario&nbsp;•&nbsp;Designed with Intention
              </p>
              <button
                type="submit"
                form="contact-form"
                disabled={phase !== "idle"}
                className="contact-submit-btn"
              >
                {phase === "sending" ? "Sending…" : "Seal & Send →"}
              </button>
            </div>

            {(phase === "sealed" || phase === "flying") && (
              <div className="contact-envelope-overlay">
                <div className="contact-envelope-seal" aria-hidden="true">
                  <BadgeCheck size={28} strokeWidth={1.75} />
                </div>
                <p className="contact-envelope-label">Message Sealed</p>
                <div className="contact-envelope-summary">
                  <p className="contact-envelope-summary-line">{name}</p>
                  <p className="contact-envelope-summary-line">{email}</p>
                </div>
                <span className="pill-tag pill-tag--primary">
                  Ready for Dispatch
                </span>
              </div>
            )}
          </div>

          {phase === "success" && (
            <div
              className="contact-success-card"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden="true" />
              <h3 className="contact-success-title">Message Dispatched!</h3>
              <p className="contact-success-desc">
                Thanks for reaching out — I&apos;ll be in touch shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
