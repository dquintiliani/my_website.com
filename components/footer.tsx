"use client";

const CONTACT_LINKS = [
  {
    href: "mailto:dquintilian@gmail.com",
    icon: "✉",
    label: "dquintilian@gmail.com",
  },
  {
    href: "https://linkedin.com/in/dominic-quintilian",
    icon: "in",
    label: "dominic-quintilian",
  },
  {
    href: "https://github.com/dquintiliani",
    icon: "⌥",
    label: "dquintiliani",
  },
] as const;

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={s.footer}>
      <div className="footer-inner" style={s.innerBase}>
        {/* ── Top row ── */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-col">
            <p style={s.logo}>
              Dominic Quintilian
              <span style={s.logoAccent}>.</span>
            </p>
            <p style={s.closing}>
              Building data products that teams{" "}
              <em style={s.closingEm}>actually depend on.</em>
            </p>
          </div>

          {/* Availability */}
          <div className="footer-col" style={s.availability}>
            <div>
              <p style={s.colLabel}>Status</p>
              <div style={s.availStatus}>
                <span className="footer-avail-dot" style={s.availDotBase} />
                <span style={s.availText}>Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p style={s.colLabel}>Get in touch</p>
            <div style={s.contactLinks}>
              {CONTACT_LINKS.map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  style={s.contactLink}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#EEEAE3";
                    const iconEl = el.querySelector(
                      ".contact-icon"
                    ) as HTMLElement;
                    if (iconEl) {
                      iconEl.style.background = "#4A9B2F";
                      iconEl.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(238,234,227,0.7)";
                    const iconEl = el.querySelector(
                      ".contact-icon"
                    ) as HTMLElement;
                    if (iconEl) {
                      iconEl.style.background = "rgba(255,255,255,0.06)";
                      iconEl.style.color = "rgba(238,234,227,0.5)";
                    }
                  }}
                >
                  <span className="contact-icon" style={s.contactIcon}>
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div className="footer-bottom">
          <span style={s.copy}>
            Dominic Quintilian · Toronto, ON · © 2026
          </span>
          <button
            onClick={handleBackToTop}
            aria-label="Back to top"
            style={s.backToTop}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(238,234,227,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(238,234,227,0.25)";
            }}
          >
            <span style={s.backLine} />
            Back to top ↑
          </button>
        </div>
      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(74,155,47,0.2); }
          50%       { box-shadow: 0 0 0 7px rgba(74,155,47,0.08); }
        }
        
        .footer-avail-dot {
          animation: footerPulse 2.5s ease-in-out infinite;
        }

        /* --- Mobile First Layout --- */
        .footer-inner {
          padding: 0 24px;
        }

        .footer-top {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 100%;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-start;
          text-align: left;
          gap: 24px;
          padding: 24px 0 40px;
        }

        /* --- Desktop Layout --- */
        @media (min-width: 768px) {
          .footer-inner {
            padding: 0 40px;
          }
          .footer-top {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 48px;
            padding-bottom: 56px;
          }
          .footer-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 20px 0;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: "#1A1916",
    padding: "64px 0 0",
    fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  innerBase: {
    maxWidth: "1080px",
    margin: "0 auto",
  },

  // Brand column
  logo: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "32px",
    fontWeight: 900,
    fontStyle: "italic",
    color: "#EEEAE3",
    letterSpacing: "-0.04em",
    marginBottom: "16px",
    lineHeight: 1,
  },
  logoAccent: {
    color: "#4A9B2F",
  },
  closing: {
    fontSize: "14px",
    fontWeight: 300,
    color: "rgba(238,234,227,0.45)",
    lineHeight: 1.7,
    maxWidth: "220px",
  },
  closingEm: {
    fontStyle: "italic",
    color: "rgba(238,234,227,0.65)",
  },

  // Shared column label
  colLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(238,234,227,0.3)",
    marginBottom: "14px",
  },

  // Availability column
  availability: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  availStatus: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
  },
  availDotBase: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#4A9B2F",
    flexShrink: 0,
  },
  availText: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#EEEAE3",
    letterSpacing: "-0.01em",
  },

  // Contact column
  contactLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  contactLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "rgba(238,234,227,0.7)",
    fontSize: "13px",
    fontWeight: 400,
    letterSpacing: "0.01em",
    transition: "color 0.15s ease",
  },
  contactIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    flexShrink: 0,
    transition: "background 0.15s ease, color 0.15s ease",
    color: "rgba(238,234,227,0.5)",
  },

  // Bottom strip elements
  copy: {
    fontSize: "11px",
    color: "rgba(238,234,227,0.25)",
    letterSpacing: "0.04em",
  },
  backToTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "rgba(238,234,227,0.25)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 500,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "color 0.15s ease",
    padding: 0,
  },
  backLine: {
    width: "24px",
    height: "1px",
    background: "rgba(238,234,227,0.2)",
    display: "block",
  },
};