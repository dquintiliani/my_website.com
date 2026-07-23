"use client";

import { useState, useRef, useEffect } from "react";
import { CtaButton, CloseButton } from "@/components/ui/cta-button";
import { PaperTag } from "@/components/ui/paper-tag";
import { PendingRibbon, PendingStamp } from "@/components/ui/pending-banner";
import {
  paperCardVariants,
  pendingPaperCardVariants,
  paperModalCardVariants,
} from "@/components/ui/paper-card";
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
  /** Still being written up — renders as a non-interactive placeholder card instead of opening the modal. */
  pending?: boolean;
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
  {
    id: "coming-soon",
    eyebrow: "In Progress",
    title: "Lorem ipsum dolor sit amet.",
    body: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    pending: true,
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
            {CARDS.map((card, i) =>
              card.pending ? (
                <div
                  key={card.id}
                  className={cn(pendingPaperCardVariants(), "w-80 flex-shrink-0 [scroll-snap-align:start]")}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="m-0 text-xs font-semibold uppercase tracking-[0.05em] text-black/50">
                      {card.eyebrow}
                    </p>
                    <span className="size-2 flex-shrink-0 animate-pulse rounded-full bg-[var(--mustard)]" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold leading-[1.3] text-[var(--black)]">
                    {card.title}
                  </h3>

                  <p className="m-0 mb-4 text-sm leading-[1.6] text-black/70">
                    {card.body}
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="skeleton-bar w-full" />
                    <div className="skeleton-bar w-2/3" />
                  </div>

                  <PendingRibbon className="top-[62%]">Coming Soon · In The Works</PendingRibbon>
                  <PendingStamp className="bottom-4 right-4">ETA Soon</PendingStamp>
                </div>
              ) : (
                <button
                  key={card.id}
                  onClick={() => handleOpen(card)}
                  type="button"
                  className={cn(
                    paperCardVariants({ tint: "green", rotate: i % 2 === 0 ? "left" : "right" }),
                    "w-80 flex-shrink-0 text-left [scroll-snap-align:start]",
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
              ),
            )}
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
            className={paperModalCardVariants({ active: isModalActive })}
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
