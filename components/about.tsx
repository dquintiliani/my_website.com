"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";
import { CtaButton, CloseButton } from "@/components/ui/cta-button";

interface CardItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  details?: string;
  tags?: string[];
  ctaText?: string;
  href?: string;
}

const CARDS: CardItem[] = [
  {
    id: "career",
    eyebrow: "Career",
    title: "Data platform PM across three industries.",
    body: "Ticketmaster (checkout & reporting), theScore (sports API platform), and Lululemon (merchandise systems) — five-plus years turning messy data into decisions people can trust.",
    details:
      "Specializing in leading technical teams, architecting core data pipelines, and bridging complex business requirements into high-impact platform tools.",
    tags: ["Data Platforms", "Product Strategy"],
    ctaText: "View details →",
    href: "#career",
  },
  {
    id: "impact",
    eyebrow: "Impact",
    title: "56% faster, 75% cheaper.",
    body: "Rebuilt theScore's sports API platform to cut latency by 56% and infrastructure cost by 75%, on systems serving 5M+ users.",
    details:
      "Optimized query performance and underlying microservice topology, drastically reducing response times while significantly cutting server spend.",
    tags: ["System Optimization", "Cost Reduction"],
    ctaText: "View details →",
    href: "#impact",
  },
  {
    id: "focus",
    eyebrow: "Focus",
    title: "One problem, many domains.",
    body: "Ticketing, sports, and retail look different on the surface, but the work is the same: source-of-truth data and the systems that make it trustworthy.",
    details:
      "Building unified analytics models and robust developer governance tools that ensure metrics remain consistent across enterprise environments.",
    tags: ["Data Architecture", "Domain Models"],
    ctaText: "View details →",
    href: "#focus",
  },
  {
    id: "certifications",
    eyebrow: "Certifications",
    title: "AWS Cloud & AI Practitioner.",
    body: "Certified AWS Cloud Practitioner and AI Practitioner, grounding product decisions in how the platform actually works.",
    details:
      "In-depth technical mastery covering serverless cloud architecture, data pipelines, security, and generative AI infrastructure implementations.",
    tags: ["AWS Cloud", "AI / ML"],
    ctaText: "View credentials →",
    href: "#certifications",
  },
];

export function About() {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth opening / animation flow
  const handleOpen = (card: CardItem) => {
    setIsClosing(false);
    setSelectedCard(card);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);

    setTimeout(() => {
      setSelectedCard(null);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 350);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCard) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCard]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector("button")?.clientWidth || 320;
      const scrollAmount = direction === "left" ? -(cardWidth + 20) : cardWidth + 20;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Reusable Tactile Paper Texture Styles
  const paperStyle: CSSProperties = {
    backgroundColor: "#faf8f5",
    backgroundImage: `
      radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px),
      linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(240, 235, 225, 0.5) 100%)
    `,
    backgroundSize: "18px 18px, 100% 100%",
  };

  // Modal State-Driven Dynamic Styles
  const isModalActive = isVisible && !isClosing;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "rgba(30, 25, 20, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    opacity: isModalActive ? 1 : 0,
    backdropFilter: isModalActive ? "blur(8px)" : "blur(0px)",
    WebkitBackdropFilter: isModalActive ? "blur(8px)" : "blur(0px)",
    pointerEvents: isModalActive ? "auto" : "none",
    transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
  };

  const modalCardStyle: CSSProperties = {
    ...paperStyle,
    position: "relative",
    zIndex: 10000,
    width: "100%",
    maxWidth: "560px",
    padding: "40px",
    borderRadius: "28px",
    boxSizing: "border-box",
    border: "1px solid rgba(180, 170, 150, 0.5)",
    boxShadow: `
      inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
      0 24px 60px rgba(0, 0, 0, 0.18),
      0 4px 16px rgba(0, 0, 0, 0.08)
    `,
    opacity: isModalActive ? 1 : 0,
    transform: isModalActive ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
    transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <section id="about" style={{ backgroundColor: "#F3EFE6", color: "#1C1C1A", padding: "48px 0", overflow: "hidden" }}>
      
      {/* CSS Rules for Buttons, Badges, and Hover Interactions */}
      <style>{`
        .about-card {
          position: relative;
          width: 320px;
          flex-shrink: 0;
          text-align: left;
          border-radius: 20px;
          padding: 28px 24px;
          cursor: pointer;
          border: 1px solid rgba(46, 74, 50, 0.2);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
            0 1px 2px rgba(40, 30, 20, 0.04),
            0 4px 12px rgba(40, 30, 20, 0.03);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease;
        }

        .about-card:hover {
          transform: translateY(-4px) rotate(-0.2deg);
          border-color: rgba(46, 74, 50, 0.5);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            0 4px 8px rgba(40, 30, 20, 0.04),
            0 16px 32px -4px rgba(40, 30, 20, 0.08);
        }

        .about-card:nth-child(odd):hover {
          transform: translateY(-4px) rotate(0.2deg);
        }

        .card-tag {
          background-color: rgba(238, 234, 227, 0.85);
          backdrop-filter: blur(2px);
          color: #3a3834;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 12px;
          font-weight: 600;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .nav-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .nav-btn:active {
          transform: scale(0.95);
        }

      `}</style>

      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "2.75rem", fontWeight: 600, letterSpacing: "-0.025em", color: "#1C1C1A", margin: 0 }}>
            What I&apos;ve Accomplished
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="#contact"
              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2E4A32", textDecoration: "none" }}
            >
              Get in touch <span aria-hidden="true">›</span>
            </a>

            {/* Scroll Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "16px", borderLeft: "1px solid rgba(0,0,0,0.1)" }}>
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                type="button"
                className="nav-btn"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                type="button"
                className="nav-btn"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Card Grid Container */}
        <div style={{ position: "relative", margin: "0 -24px", padding: "0 24px" }}>
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "12px 24px",
            }}
          >
            {CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => handleOpen(card)}
                type="button"
                className="about-card"
                style={{ ...paperStyle, scrollSnapAlign: "start" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0, 0, 0, 0.5)", textTransform: "uppercase", margin: 0 }}>
                    {card.eyebrow}
                  </p>
                  
                  <span style={{ fontSize: "0.875rem", fontWeight: 300, color: "rgba(0, 0, 0, 0.4)" }}>
                    ↗
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.3, marginBottom: "12px", color: "#1C1C1A" }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.7)", lineHeight: 1.6, margin: 0 }}>
                  {card.body}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Tactile Paper Modal Overlay */}
      {selectedCard && (
        <div
          onClick={handleClose}
          style={overlayStyle}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalCardStyle}
          >
            {/* Close Button */}
            <CloseButton onClick={handleClose} />

            {/* Eyebrow */}
            <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(0, 0, 0, 0.5)", textTransform: "uppercase", marginBottom: "12px", paddingRight: "40px" }}>
              {selectedCard.eyebrow}
            </p>

            {/* Title */}
            <h3
              id="modal-title"
              style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#1C1C1A", marginBottom: "16px", lineHeight: 1.25 }}
            >
              {selectedCard.title}
            </h3>

            {/* Body & Details */}
            <p style={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.7)", lineHeight: 1.6, marginBottom: "24px" }}>
              {selectedCard.body} {selectedCard.details}
            </p>

            {/* Tags */}
            {selectedCard.tags && selectedCard.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                {selectedCard.tags.map((tag) => (
                  <span key={tag} className="card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action CTA Button */}
            {selectedCard.ctaText && (
              <CtaButton href={selectedCard.href || "#"} onClick={handleClose}>
                {selectedCard.ctaText}
              </CtaButton>
            )}
          </div>
        </div>
      )}
    </section>
  );
}