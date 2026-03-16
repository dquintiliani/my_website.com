"use client";

import { useState } from "react";

const CONTACT_LINKS = [
  {
    href:    "mailto:dquintilian@gmail.com",
    icon:    "✉",
    label:   "Email",
    value:   "dquintilian@gmail.com",
    external: false,
  },
  {
    href:    "https://www.linkedin.com/in/dominic-quintilian/",
    icon:    "in",
    label:   "LinkedIn",
    value:   "dominic-quintilian",
    external: true,
  },
  {
    href:    "https://github.com/dquintiliani",
    icon:    "⌥",
    label:   "GitHub",
    value:   "dquintiliani",
    external: true,
  },
] as const;

export function Contact() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, message }),
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
    <section id="contact" style={s.section}>
      <div style={s.inner}>

        {/* Header */}
        <p style={s.eyebrow}>Get in touch</p>
        <h2 style={s.heading}>
          If you&apos;re building something that<br />
          lives and dies by its{" "}
          <em style={s.headingEm}>data</em>,<br />
          I want to hear about it.
        </h2>
        <p style={s.subhead}>
          Whether you&apos;re hiring, building something interesting, or want to
          swap notes on product and data —{" "}
          <strong style={s.subheadStrong}>I&apos;m always open.</strong>
        </p>

        {/* Two-column grid */}
        <div style={s.grid}>

          {/* Left: direct links */}
          <div style={s.linksCol}>
            {CONTACT_LINKS.map(({ href, icon, label, value, external }, i) => (
              <a
                key={href}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{
                  ...s.linkRow,
                  borderTop: i === 0 ? "1px solid #D2CEC5" : undefined,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#1A1916";
                  const ico  = el.querySelector(".lnk-icon")  as HTMLElement;
                  const arr  = el.querySelector(".lnk-arrow") as HTMLElement;
                  if (ico) { ico.style.background = "#1A1916"; ico.style.color = "#EEEAE3"; }
                  if (arr) { arr.style.opacity = "1"; arr.style.transform = "translateX(0)"; }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#3D3B37";
                  const ico  = el.querySelector(".lnk-icon")  as HTMLElement;
                  const arr  = el.querySelector(".lnk-arrow") as HTMLElement;
                  if (ico) { ico.style.background = "#E8E3D9"; ico.style.color = "#7A7670"; }
                  if (arr) { arr.style.opacity = "0"; arr.style.transform = "translateX(-6px)"; }
                }}
              >
                <span
                  className="lnk-icon"
                  style={s.linkIcon}
                >
                  {icon}
                </span>
                <span style={s.linkInfo}>
                  <span style={s.linkLabel}>{label}</span>
                  <span style={s.linkValue}>{value}</span>
                </span>
                <span
                  className="lnk-arrow"
                  style={s.linkArrow}
                >
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} style={s.form}>
            <p style={s.formLabelTop}>Or send a direct message</p>

            <div style={s.fieldRow}>
              <div style={s.field}>
                <label style={s.fieldLabel}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={s.input}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "#2C5F14";
                    (e.target as HTMLInputElement).style.background  = "#fff";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "transparent";
                    (e.target as HTMLInputElement).style.background  = "#E8E3D9";
                  }}
                />
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={s.input}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "#2C5F14";
                    (e.target as HTMLInputElement).style.background  = "#fff";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "transparent";
                    (e.target as HTMLInputElement).style.background  = "#E8E3D9";
                  }}
                />
              </div>
            </div>

            <div style={s.field}>
              <label style={s.fieldLabel}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on?"
                required
                rows={4}
                style={s.textarea}
                onFocus={(e) => {
                  (e.target as HTMLTextAreaElement).style.borderColor = "#2C5F14";
                  (e.target as HTMLTextAreaElement).style.background  = "#fff";
                }}
                onBlur={(e) => {
                  (e.target as HTMLTextAreaElement).style.borderColor = "transparent";
                  (e.target as HTMLTextAreaElement).style.background  = "#E8E3D9";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={s.submitBtn}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.background = "#2C5F14";
              }}
              onMouseLeave={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.background = "#1A1916";
              }}
            >
              {loading ? "Sending…" : "Send message →"}
            </button>

            {success && (
              <div style={s.successMsg} role="status">
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#EEEAE3",
    padding:         "96px 0",
    fontFamily:      "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  inner: {
    maxWidth: "1080px",
    margin:   "0 auto",
    padding:  "0 40px",
  },

  // Header
  eyebrow: {
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         "#2C5F14",
    margin:        "0 0 18px",
  },
  heading: {
    fontSize:      "clamp(32px, 4vw, 52px)",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.03em",
    lineHeight:    1.1,
    margin:        "0 0 20px",
  },
  headingEm: {
    fontStyle:  "italic",
    color:      "#2C5F14",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 900,
  },
  subhead: {
    fontSize:     "15px",
    color:        "#7A7670",
    lineHeight:   1.75,
    maxWidth:     "520px",
    margin:       "0 0 56px",
    fontWeight:   400,
  },
  subheadStrong: {
    color:      "#1A1916",
    fontWeight: 600,
  },

  // Grid
  grid: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "80px",
    alignItems:          "start",
  },

  // Contact links
  linksCol: {
    display:       "flex",
    flexDirection: "column",
  },
  linkRow: {
    display:        "flex",
    alignItems:     "center",
    gap:            "16px",
    padding:        "20px 0",
    borderBottom:   "1px solid #D2CEC5",
    textDecoration: "none",
    color:          "#3D3B37",
    transition:     "color 0.15s ease",
    position:       "relative",
  },
  linkIcon: {
    width:          "36px",
    height:         "36px",
    borderRadius:   "8px",
    background:     "#E8E3D9",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       "13px",
    fontWeight:     600,
    color:          "#7A7670",
    flexShrink:     0,
    transition:     "background 0.15s ease, color 0.15s ease",
  },
  linkInfo: {
    flex:          1,
    display:       "flex",
    flexDirection: "column",
    gap:           "3px",
  },
  linkLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
  },
  linkValue: {
    fontSize:      "14px",
    fontWeight:    500,
    letterSpacing: "0.01em",
  },
  linkArrow: {
    fontSize:   "16px",
    color:      "#2C5F14",
    opacity:    0,
    transform:  "translateX(-6px)",
    transition: "opacity 0.15s ease, transform 0.15s ease",
  },

  // Form
  form: {
    display:       "flex",
    flexDirection: "column",
    gap:           "0",
  },
  formLabelTop: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    margin:        "0 0 20px",
  },
  fieldRow: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "12px",
    marginBottom:        "16px",
  },
  field: {
    display:       "flex",
    flexDirection: "column",
    gap:           "6px",
    marginBottom:  "16px",
  },
  fieldLabel: {
    fontSize:      "11px",
    fontWeight:    500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color:         "#AEADA5",
  },
  input: {
    width:       "100%",
    background:  "#E8E3D9",
    border:      "1px solid transparent",
    borderRadius: "4px",
    padding:     "12px 14px",
    fontSize:    "14px",
    fontFamily:  "inherit",
    color:       "#1A1916",
    outline:     "none",
    transition:  "border-color 0.15s ease, background 0.15s ease",
  },
  textarea: {
    width:       "100%",
    background:  "#E8E3D9",
    border:      "1px solid transparent",
    borderRadius: "4px",
    padding:     "12px 14px",
    fontSize:    "14px",
    fontFamily:  "inherit",
    color:       "#1A1916",
    outline:     "none",
    transition:  "border-color 0.15s ease, background 0.15s ease",
    resize:      "none",
    lineHeight:  1.6,
    minHeight:   "120px",
  },
  submitBtn: {
    width:          "100%",
    padding:        "14px 24px",
    background:     "#1A1916",
    color:          "#EEEAE3",
    border:         "none",
    borderRadius:   "4px",
    fontSize:       "12px",
    fontWeight:     600,
    letterSpacing:  "0.08em",
    textTransform:  "uppercase",
    cursor:         "pointer",
    fontFamily:     "inherit",
    transition:     "background 0.2s ease",
    marginTop:      "4px",
  },
  successMsg: {
    marginTop:   "12px",
    padding:     "12px 14px",
    background:  "#DCE9D4",
    borderRadius: "4px",
    fontSize:    "13px",
    color:       "#2C5F14",
    fontWeight:  500,
    display:     "flex",
    alignItems:  "center",
    gap:         "8px",
  },
};