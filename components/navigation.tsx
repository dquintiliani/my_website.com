"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionConfig {
  readonly id: string;
  readonly label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "about",      label: "About"      },
  { id: "experience", label: "Experience" },
  { id: "skills",     label: "Skills"     },
  { id: "contact",    label: "Contact"    },
] as const satisfies readonly SectionConfig[];

const NAV_LINKS = [
  { href: "/blog", label: "Writing" },
] as const;

const SCROLL_THRESHOLD = 40; // px before nav gains frosted state

// ─── Component ────────────────────────────────────────────────────────────────

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled]           = useState(false);
  const [progress, setProgress]           = useState(0);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [menuOpen, setMenuOpen]           = useState(false);
  const rafRef = useRef<number | null>(null);

  // ── Scroll: frosted state + progress bar ──────────────────────────────────
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      const scrollY  = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > SCROLL_THRESHOLD);
      setProgress(docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // ── IntersectionObserver: active section tracking ─────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ── Derived ──────────────────────────────────────────────────────────────
  const activeSectionLabel =
    SECTIONS.find((s) => s.id === activeSection)?.label ?? SECTIONS[0].label;
  const activeIndex =
    SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <header
      role="banner"
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
      style={{
        position:   "sticky",
        top:        0,
        zIndex:     50,
        width:      "100%",
        background: scrolled ? "rgba(238,234,227,0.88)" : "#EEEAE3",
        backdropFilter:         scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter:   scrolled ? "blur(14px)" : "none",
        boxShadow:  scrolled ? "0 1px 0 #D2CEC5" : "none",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth:       "1080px",
          margin:         "0 auto",
          padding:        "0 40px",
          height:         "68px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="DQ. — home"
          style={{
            fontSize:       "21px",
            fontWeight:     100,
            color:          "#1A1916",
            letterSpacing:  "-0.04em",
            textDecoration: "none",
            lineHeight:     1,
            fontFamily:    "'Playfair Display', Georgia, serif",
          }}
        >
          Dominic Quintilian<span style={{ color: "#2C5F14" }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav role="navigation" aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: "6px" }}>

          {/* Section tracker pill */}
          <div
            aria-hidden="true"
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "8px",
              padding:      "5px 12px",
              borderRadius: "20px",
              border:       "1px solid #D2CEC5",
              marginRight:  "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() =>
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                  }
                  title={s.label}
                  style={{
                    width:           "5px",
                    height:          "5px",
                    borderRadius:    "50%",
                    border:          "none",
                    padding:         0,
                    cursor:          "pointer",
                    backgroundColor: i === activeIndex ? "#2C5F14" : "#D2CEC5",
                    transform:       i === activeIndex ? "scale(1.5)" : "scale(1)",
                    transition:      "background 0.25s ease, transform 0.25s ease",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize:      "11px",
                fontWeight:    500,
                color:         "#7A7670",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                minWidth:      "60px",
                transition:    "color 0.2s ease",
              }}
            >
              {activeSectionLabel}
            </span>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{ width: "1px", height: "16px", background: "#D2CEC5", margin: "0 2px" }}
          />

          {/* Route links */}
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              style={{
                fontSize:       "12px",
                fontWeight:     500,
                color:          pathname === href ? "#1A1916" : "#7A7670",
                textDecoration: "none",
                padding:        "6px 10px",
                borderRadius:   "4px",
                letterSpacing:  "0.07em",
                textTransform:  "uppercase",
                transition:     "color 0.15s ease, background 0.15s ease",
              }}
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="#contact"
            style={{
              fontSize:       "12px",
              fontWeight:     600,
              letterSpacing:  "0.07em",
              textTransform:  "uppercase",
              color:          "#EEEAE3",
              background:     "#1A1916",
              textDecoration: "none",
              padding:        "8px 18px",
              borderRadius:   "4px",
              marginLeft:     "4px",
              transition:     "background 0.2s ease",
              display:        "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2C5F14";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#1A1916";
            }}
          >
            Contact
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display:         "none", // shown via CSS at mobile breakpoint
              flexDirection:   "column",
              gap:             "5px",
              background:      "none",
              border:          "none",
              cursor:          "pointer",
              padding:         "4px",
              marginLeft:      "8px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display:         "block",
                  width:           "22px",
                  height:          "2px",
                  backgroundColor: "#1A1916",
                  borderRadius:    "1px",
                  transition:      "transform 0.2s ease, opacity 0.2s ease",
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            padding:    "16px 40px 24px",
            borderTop:  "1px solid #D2CEC5",
            background: "rgba(238,234,227,0.97)",
            display:    "flex",
            flexDirection: "column",
            gap:        "4px",
          }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
              style={{
                background:    "none",
                border:        "none",
                textAlign:     "left",
                cursor:        "pointer",
                fontSize:      "15px",
                fontWeight:    s.id === activeSection ? 600 : 400,
                color:         s.id === activeSection ? "#1A1916" : "#7A7670",
                padding:       "10px 0",
                borderBottom:  "1px solid #D2CEC5",
                fontFamily:    "inherit",
                letterSpacing: "0.02em",
              }}
            >
              {s.label}
            </button>
          ))}
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize:       "15px",
                fontWeight:     400,
                color:          "#7A7670",
                textDecoration: "none",
                padding:        "10px 0",
                borderBottom:   "1px solid #D2CEC5",
                display:        "block",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop:      "12px",
              display:        "block",
              textAlign:      "center",
              fontSize:       "13px",
              fontWeight:     600,
              letterSpacing:  "0.07em",
              textTransform:  "uppercase",
              color:          "#EEEAE3",
              background:     "#1A1916",
              textDecoration: "none",
              padding:        "12px 18px",
              borderRadius:   "4px",
            }}
          >
            Contact
          </Link>
        </div>
      )}

      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          bottom:       0,
          left:         0,
          height:       "2px",
          width:        `${progress}%`,
          background:   "#2C5F14",
          borderRadius: "0 1px 1px 0",
          transition:   "width 0.12s linear",
        }}
      />
    </header>
  );
}