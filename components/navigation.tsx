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
  { id: "projects",   label: "Projects"   },
  { id: "contact",    label: "Contact"    },
] as const satisfies readonly SectionConfig[];

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Writing"  },
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
  const hideProgressBar = pathname === "/projects" || pathname === "/blog";

  return (
    <header
      role="banner"
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
      className="nav-header"
    >
      <div className="nav-inner-row">
        {/* Logo */}
        <Link href="/" aria-label="DQ. — home" className="nav-logo-link">
          Dominic Quintilian<span>.</span>
        </Link>

        {/* Desktop nav */}
        <nav role="navigation" aria-label="Primary" className="nav-desktop">

          {/* Section tracker pill */}


          {/* Divider */}
          <div aria-hidden="true" className="nav-divider" />

          {/* Route links */}
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="nav-route-link"
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <Link href="#contact" className="nav-cta-link">
            Contact
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-toggle-btn"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="nav-toggle-bar" />
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
          className="nav-mobile-menu"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
              data-active={s.id === activeSection}
              className="nav-mobile-section-btn"
            >
              {s.label}
            </button>
          ))}
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-mobile-route-link">
              {label}
            </Link>
          ))}

        </div>
      )}

      {/* Scroll progress bar */}

    </header>
  );
}
