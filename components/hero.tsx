"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" style={s.section}>
      {/* Grain overlay */}
      <div aria-hidden="true" style={s.grain} />

      <div style={s.inner}>

        {/* ── Main grid ── */}
        <div style={s.grid}>

          {/* Left: text */}
          <div style={s.left}>

            <div style={s.eyebrow}>
              <div style={s.eyebrowLine} />
              <span style={s.eyebrowText}>Data Platform PM</span>
            </div>

            <h1 style={s.name}>
              Dominic<br />
              Quintili<em style={s.nameEm}>an</em>
            </h1>

            <div style={s.statement}>
              <p style={s.statementText}>
                Product decisions<br />
                get <strong style={s.statementStrong}>messy</strong>.<br />
                That&apos;s where I start.
              </p>
              <p style={s.subtext}>
                The PM who reads the schema before the PRD.
              </p>
            </div>

            <div style={s.actions}>
              <Link
                href="#contact"
                style={s.btnPrimary}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#2C5F14";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#1A1916";
                }}
              >
                Let&apos;s talk <span style={s.btnArrow}>→</span>
              </Link>
              <Link
                href="#about"
                style={s.btnGhost}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#1A1916";
                  el.style.borderBottomColor = "#1A1916";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#7A7670";
                  el.style.borderBottomColor = "#D2CEC5";
                }}
              >
                Read more
              </Link>
            </div>

            <div style={s.status}>
              <span style={s.statusDot} />
              <span style={s.statusText}>
                <strong style={{ color: "#1A1916", fontWeight: 600 }}>
                  Product Manager
                </strong>
                {" · Open to opportunities in Toronto"}
              </span>
            </div>

          </div>

          {/* Right: image */}
          <div style={s.right}>
            <div style={s.imageFrame}>
              {/* Corner marks */}
              <div style={{ ...s.corner, ...s.cornerTL }} />
              <div style={{ ...s.corner, ...s.cornerTR }} />
              <div style={{ ...s.corner, ...s.cornerBL }} />
              <div style={{ ...s.corner, ...s.cornerBR }} />

              <div style={s.imageFadeWrap}>
                <Image
                  src="/block_image.jpeg"
                  alt="3D Building Blocks Illustration"
                  width={600}
                  height={600}
                  priority
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                {/* Radial fade overlay */}
                <div aria-hidden="true" style={s.imageFadeOverlay} />
              </div>
            </div>

            {/* Floating stat cards */}
            <div style={{ ...s.statCard, ...s.statCard1 }}>
              <span style={s.statVal}>5M+</span>
              <span style={s.statLabel}>Users on systems owned</span>
            </div>
            <div style={{ ...s.statCard, ...s.statCard2 }}>
              <span style={s.statVal}>56%</span>
              <span style={s.statLabel}>Latency improvement</span>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={s.bottomBar}>
          <div style={s.companies}>
            <span style={s.bottomLabel}>Previously</span>
            {["Ticketmaster", "TheScore", "Lululemon"].map((co) => (
              <span key={co} style={s.chip}>{co}</span>
            ))}
          </div>
          <div style={s.scrollHint}>
            <div style={s.scrollLine} />
            <span>Scroll to explore</span>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');

        #hero { animation: heroFadeIn 0.4s ease forwards; }

        #hero .hero-eyebrow   { animation: fadeUp 0.6s ease forwards; animation-delay: 0.15s; opacity: 0; }
        #hero .hero-name      { animation: fadeUp 0.7s ease forwards; animation-delay: 0.28s; opacity: 0; }
        #hero .hero-statement { animation: fadeUp 0.7s ease forwards; animation-delay: 0.42s; opacity: 0; }
        #hero .hero-actions   { animation: fadeUp 0.6s ease forwards; animation-delay: 0.56s; opacity: 0; }
        #hero .hero-status    { animation: fadeUp 0.6s ease forwards; animation-delay: 0.68s; opacity: 0; }
        #hero .hero-right     { animation: fadeIn  1s   ease forwards; animation-delay: 0.35s; opacity: 0; }
        #hero .hero-stat-1    { animation: floatIn 0.7s ease forwards; animation-delay: 0.85s; opacity: 0; }
        #hero .hero-stat-2    { animation: floatIn 0.7s ease forwards; animation-delay: 1.0s;  opacity: 0; }
        #hero .hero-bottom    { animation: fadeUp 0.6s ease forwards;  animation-delay: 0.8s;  opacity: 0; }

        .status-dot-pulse { animation: pulse 2.5s ease-in-out infinite; }

        @keyframes heroFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(44,95,20,0.15); }
          50%       { box-shadow: 0 0 0 6px rgba(44,95,20,0.08); }
        }
      `}</style>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#EEEAE3",
    minHeight:       "92vh",
    display:         "flex",
    alignItems:      "center",
    fontFamily:      "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
    overflow:        "hidden",
    position:        "relative",
    padding:         "80px 0 64px",
  },
  grain: {
    position: "absolute",
    inset:    0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: {
    maxWidth: "1080px",
    margin:   "0 auto",
    padding:  "0 40px",
    width:    "100%",
    position: "relative",
    zIndex:   1,
  },

  // Grid
  grid: {
    display:             "grid",
    gridTemplateColumns: "1fr 420px",
    gap:                 "64px",
    alignItems:          "center",
  },
  left: {},

  // Eyebrow
  eyebrow: {
    display:      "flex",
    alignItems:   "center",
    gap:          "12px",
    marginBottom: "20px",
  },
  eyebrowLine: {
    width:      "32px",
    height:     "1px",
    background: "#2C5F14",
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color:         "#2C5F14",
  },

  // Name — gap tightened via reduced marginBottom
  name: {
    fontFamily:    "'Playfair Display', Georgia, serif",
    fontSize:      "clamp(52px, 6.5vw, 88px)",
    fontWeight:    900,
    color:         "#1A1916",
    letterSpacing: "-0.03em",
    lineHeight:    0.95,
    marginBottom:  "24px", // was 40px — tightened
  },
  nameEm: {
    fontStyle: "italic",
    color:     "#2C5F14",
  },

  // Statement
  statement: {
    paddingLeft:  "20px",
    borderLeft:   "3px solid #2C5F14",
    marginBottom: "36px",
  },
  statementText: {
    fontSize:      "clamp(18px, 2.2vw, 26px)",
    fontWeight:    300,
    color:         "#3D3B37",
    lineHeight:    1.4,
    letterSpacing: "-0.01em",
  },
  statementStrong: {
    fontWeight: 700,
    color:      "#1A1916",
  },
  // Replaced generic subtext with the schema line — bigger, more weight
  subtext: {
    marginTop:     "14px",
    fontSize:      "clamp(14px, 1.4vw, 17px)",
    fontWeight:    500,
    color:         "#3D3B37",
    lineHeight:    1.5,
    letterSpacing: "-0.01em",
    fontStyle:     "italic",
  },

  // Actions
  actions: {
    display:      "flex",
    alignItems:   "center",
    gap:          "20px",
    marginBottom: "40px",
  },
  btnPrimary: {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "8px",
    fontSize:       "12px",
    fontWeight:     600,
    letterSpacing:  "0.08em",
    textTransform:  "uppercase",
    color:          "#EEEAE3",
    background:     "#1A1916",
    textDecoration: "none",
    padding:        "12px 24px",
    borderRadius:   "3px",
    transition:     "background 0.2s ease",
  },
  btnArrow: {
    fontSize:   "14px",
    transition: "transform 0.2s ease",
  },
  btnGhost: {
    fontSize:       "12px",
    fontWeight:     500,
    letterSpacing:  "0.08em",
    textTransform:  "uppercase",
    color:          "#7A7670",
    textDecoration: "none",
    padding:        "12px 0",
    borderBottom:   "1px solid #D2CEC5",
    transition:     "color 0.2s ease, border-color 0.2s ease",
  },

  // Status
  status: {
    display:    "flex",
    alignItems: "center",
    gap:        "10px",
  },
  statusDot: {
    width:        "7px",
    height:       "7px",
    borderRadius: "50%",
    background:   "#2C5F14",
    flexShrink:   0,
    boxShadow:    "0 0 0 3px rgba(44, 95, 20, 0.15)",
    animation:    "pulse 2.5s ease-in-out infinite",
  },
  statusText: {
    fontSize:      "12px",
    color:         "#7A7670",
    letterSpacing: "0.03em",
  },

  // Image
  right: {
    position: "relative",
  },
  imageFrame: {
    position:     "relative",
    borderRadius: "4px",
    overflow:     "hidden",
  },
  corner: {
    position: "absolute",
    width:    "20px",
    height:   "20px",
    zIndex:   2,
  },
  cornerTL: {
    top: "-1px", left: "-1px",
    borderTop: "2px solid #2C5F14", borderLeft: "2px solid #2C5F14",
  },
  cornerTR: {
    top: "-1px", right: "-1px",
    borderTop: "2px solid #2C5F14", borderRight: "2px solid #2C5F14",
  },
  cornerBL: {
    bottom: "-1px", left: "-1px",
    borderBottom: "2px solid #2C5F14", borderLeft: "2px solid #2C5F14",
  },
  cornerBR: {
    bottom: "-1px", right: "-1px",
    borderBottom: "2px solid #2C5F14", borderRight: "2px solid #2C5F14",
  },
  imageFadeWrap: {
    position: "relative",
  },
  // Radial fade dissolves image edges into background
  imageFadeOverlay: {
    position:   "absolute",
    inset:      0,
    background: "radial-gradient(ellipse at center, transparent 45%, #EEEAE3 100%)",
    pointerEvents: "none",
    zIndex:     1,
  },

  // Floating stat cards
  statCard: {
    position:      "absolute",
    background:    "rgba(255,255,255,0.95)",
    border:        "1px solid #D2CEC5",
    borderRadius:  "6px",
    padding:       "10px 14px",
    display:       "flex",
    flexDirection: "column",
    gap:           "2px",
    boxShadow:     "0 2px 12px rgba(26, 25, 22, 0.06)",
    backdropFilter: "blur(8px)",
  },
  statCard1: { bottom: "24px", left: "-32px" },
  statCard2: { top: "32px",    right: "-28px" },
  statVal: {
    fontSize:      "18px",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.02em",
    lineHeight:    1,
  },
  statLabel: {
    fontSize:      "10px",
    fontWeight:    500,
    color:         "#AEADA5",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  // Bottom bar
  bottomBar: {
    marginTop:      "56px",
    paddingTop:     "20px",
    borderTop:      "1px solid #D2CEC5",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
  },
  companies: {
    display:    "flex",
    alignItems: "center",
    gap:        "6px",
  },
  bottomLabel: {
    fontSize:      "10px",
    fontWeight:    500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    marginRight:   "8px",
  },
  chip: {
    fontSize:      "11px",
    fontWeight:    500,
    color:         "#7A7670",
    padding:       "4px 10px",
    border:        "1px solid #D2CEC5",
    borderRadius:  "20px",
    letterSpacing: "0.02em",
  },
  scrollHint: {
    display:       "flex",
    alignItems:    "center",
    gap:           "8px",
    fontSize:      "11px",
    color:         "#AEADA5",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight:    500,
  },
  scrollLine: {
    width:      "32px",
    height:     "1px",
    background: "#D2CEC5",
  },
};