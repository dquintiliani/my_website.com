"use client";

import { useState, useRef, useEffect } from "react";
import { CtaButton, CloseButton } from "@/components/ui/cta-button";
import { PaperTag } from "@/components/ui/paper-tag";
import { cn } from "@/lib/utils";

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

  const isModalActive = isVisible && !isClosing;

  return (
    <section
      id="about"
      className="overflow-hidden bg-[var(--white)] py-12 text-[var(--black)]"
    >
      <div className="mx-auto max-w-[1152px] px-6">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="m-0 text-[2.75rem] font-semibold tracking-[-0.025em] text-[var(--black)]">
            What I&apos;ve Accomplished
          </h2>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="text-sm font-medium text-[#2e4a32] no-underline"
            >
              Get in touch <span aria-hidden="true">›</span>
            </a>

            {/* Scroll Controls */}
            <div className="flex items-center gap-2 border-l border-black/10 pl-4">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                type="button"
                className="flex size-9 items-center justify-center rounded-full border border-black/15 bg-transparent transition-colors duration-200 hover:bg-black/5 active:scale-95"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                type="button"
                className="flex size-9 items-center justify-center rounded-full border border-black/15 bg-transparent transition-colors duration-200 hover:bg-black/5 active:scale-95"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Card Grid Container */}
        <div className="relative -mx-6 px-6">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory]"
          >
            {CARDS.map((card, i) => (
              <button
                key={card.id}
                onClick={() => handleOpen(card)}
                type="button"
                className={cn(
                  "paper-texture relative w-80 flex-shrink-0 rounded-[20px] border border-[rgba(46,74,50,0.2)] p-7 px-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(40,30,20,0.04),0_4px_12px_rgba(40,30,20,0.03)] [transition:transform_0.35s_cubic-bezier(0.16,1,0.3,1),box-shadow_0.35s_cubic-bezier(0.16,1,0.3,1),border-color_0.3s_ease] [scroll-snap-align:start]",
                  "hover:-translate-y-1 hover:border-[rgba(46,74,50,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_8px_rgba(40,30,20,0.04),0_16px_32px_-4px_rgba(40,30,20,0.08)]",
                  i % 2 === 0 ? "hover:rotate-[-0.2deg]" : "hover:rotate-[0.2deg]",
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.05em] text-black/50">
                    {card.eyebrow}
                  </p>
                  <span className="text-sm font-light text-black/40">↗</span>
                </div>

                <h3 className="mb-3 text-xl font-semibold leading-[1.3] text-[var(--black)]">
                  {card.title}
                </h3>

                <p className="m-0 text-sm leading-[1.6] text-black/70">
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className={cn(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(30,25,20,0.45)] p-5 [transition:opacity_0.35s_ease,backdrop-filter_0.35s_ease]",
            isModalActive
              ? "pointer-events-auto opacity-100 backdrop-blur-md"
              : "pointer-events-none opacity-0 backdrop-blur-none",
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "paper-texture relative z-[10000] w-full max-w-[560px] rounded-[28px] border border-[rgba(180,170,150,0.5)] p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_24px_60px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.08)] [transition:opacity_0.35s_cubic-bezier(0.16,1,0.3,1),transform_0.35s_cubic-bezier(0.16,1,0.3,1)]",
              isModalActive
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-3 scale-95 opacity-0",
            )}
          >
            {/* Close Button */}
            <CloseButton onClick={handleClose} />

            {/* Eyebrow */}
            <p className="mb-3 pr-10 text-xs font-semibold uppercase tracking-[0.05em] text-black/50">
              {selectedCard.eyebrow}
            </p>

            {/* Title */}
            <h3
              id="modal-title"
              className="mb-4 text-[1.75rem] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--black)]"
            >
              {selectedCard.title}
            </h3>

            {/* Body & Details */}
            <p className="mb-6 text-base leading-[1.6] text-black/70">
              {selectedCard.body} {selectedCard.details}
            </p>

            {/* Tags */}
            {selectedCard.tags && selectedCard.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {selectedCard.tags.map((tag) => (
                  <PaperTag key={tag}>{tag}</PaperTag>
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
