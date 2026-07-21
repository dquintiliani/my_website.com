"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CtaButton, CloseButton } from '@/components/ui/cta-button';
import { PaperTag } from '@/components/ui/paper-tag';
import { cn } from '@/lib/utils';

// Types
interface DocumentItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  details: string;
  tags: string[];
  ctaText: string;
  href: string;
  badgeColor?: string;
  scatter: { x: number; y: number; rot: number };
  organized: { x: number; y: number; rot: number };
}

// Data Definition - FIXED: Balanced 'organized' X values (-320, 0, 320)
const DOCUMENTS: DocumentItem[] = [
  {
    id: 'raw-logs',
    eyebrow: 'Messy Input #01',
    title: 'Unstructured Event Logs & Pipelines',
    body: 'Fragmented logs across legacy checkout systems, microservices, and third-party APIs.',
    details:
      'Engineered real-time schema validators and ingestion pipelines that parse millions of chaotic daily events into clean, queryable databases with zero data loss.',
    tags: ['ETL Pipelines', 'Data Ingestion', 'Schema Design'],
    ctaText: 'View architecture →',
    href: '#pipelines',
    badgeColor: '#E05A47',
    scatter: { x: -80, y: -15, rot: -5.5 },
    organized: { x: -320, y: 0, rot: 0 },
  },
  {
    id: 'governance',
    eyebrow: 'Messy Input #02',
    title: 'Conflicting Metrics & Siloed Teams',
    body: 'Marketing, finance, and product teams defining key revenue KPIs differently across dashboards.',
    details:
      'Created a centralized metric governance layer (single source of truth) unifying enterprise definitions, eliminating reporting friction across departments.',
    tags: ['Data Governance', 'Single Source of Truth', 'KPI Modeling'],
    ctaText: 'See governance framework →',
    href: '#governance',
    badgeColor: '#4A7C59',
    scatter: { x: 30, y: -30, rot: 4.2 },
    organized: { x: 0, y: 0, rot: 0 },
  },
  {
    id: 'legacy-db',
    eyebrow: 'Messy Input #03',
    title: 'High Latency & Expensive Queries',
    body: 'Bloated queries causing API timeouts and skyrocketing monthly infrastructure cloud spend.',
    details:
      'Restructured data partition keys and indexing strategies, dropping latency by 56% and cloud infrastructure expenditure by 75% without compromising availability.',
    tags: ['Database Optimization', 'AWS Cloud', 'Cost Reduction'],
    ctaText: 'Read optimization case →',
    href: '#optimization',
    badgeColor: '#D9A036',
    scatter: { x: -20, y: 40, rot: -2.5 },
    organized: { x: 320, y: 0, rot: 0 },
  },
];

// Helper: Linear Interpolation
const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

export const MessyDeskCanvas: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scrollTrackHeight, setScrollTrackHeight] = useState<string>('auto');

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const deskWorkspaceRef = useRef<HTMLDivElement>(null);
  const coffeeStainRef = useRef<HTMLDivElement>(null);
  const stickyNoteRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820;
      setIsMobile(mobile);
      if (mobile) {
        setScrollTrackHeight('auto');
        return;
      }

      const height = window.innerHeight;
      const animationStart = height * 0.95;
      const animationEnd = height * 0.45;
      const animationRange = animationStart - animationEnd;
      const deskHeight = deskWorkspaceRef.current?.offsetHeight || 520;
      const stickyTop = 100;
      const minTrackHeight = Math.max(height, deskHeight + animationRange + stickyTop);
      setScrollTrackHeight(`${minTrackHeight}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = useCallback(() => {
    if (isMobile || !scrollTrackRef.current) return;

    const deskRect = deskWorkspaceRef.current?.getBoundingClientRect();
    if (!deskRect) return;

    const animationStart = window.innerHeight * 0.95;
    const animationEnd = window.innerHeight * 0.45;
    const animationRange = animationStart - animationEnd;

    let rawProgress = (animationStart - deskRect.top) / animationRange;
    rawProgress = Math.max(0, Math.min(1, rawProgress));

    const eased =
      rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

    setProgress(eased);

    DOCUMENTS.forEach((doc, index) => {
      const cardEl = cardRefs.current[index];
      if (cardEl) {
        const curX = lerp(doc.scatter.x, doc.organized.x, eased);
        const curY = lerp(doc.scatter.y, doc.organized.y, eased);
        const curRot = lerp(doc.scatter.rot, doc.organized.rot, eased);
        cardEl.style.transform = `translate(${curX}px, ${curY}px) rotate(${curRot}deg)`;
      }
    });


    if (deskWorkspaceRef.current) {
      if (eased > 0.85) {
        deskWorkspaceRef.current.style.backgroundColor = 'rgba(235, 242, 236, 0.6)';
        deskWorkspaceRef.current.style.borderColor = 'rgba(46, 74, 50, 0.3)';
      } else {
        deskWorkspaceRef.current.style.backgroundColor = 'rgba(240, 235, 225, 0.4)';
        deskWorkspaceRef.current.style.borderColor = 'rgba(180, 170, 150, 0.4)';
      }
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDoc(null);
    };
    if (activeDoc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDoc]);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-[#F3EFE6] px-5 py-12 font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif] text-[#1C1C1A]">
      {/* Google Fonts import: no Tailwind/next-font equivalent for a one-off component font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap');
      `}</style>

      <div className="mx-auto w-full max-w-[1100px]">
        {/* Header */}
        <header className="relative mb-8 text-center">
          <p className="mb-2 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-[#2E4A32]">
            Data System Architecture
          </p>
          <h1 className="mb-3 text-[2.5rem] font-bold tracking-[-0.02em] text-[#1C1C1A]">
            Bringing Order to <em className="font-['Playfair_Display',serif] italic">Chaotic</em> Systems.
          </h1>

          <p className="mx-auto mb-6 max-w-[580px] text-base leading-[1.55] text-[#66625b]">
            Scroll down to transform the chaotic desk stack into an organized system, then click any folder to inspect its architecture.
          </p>

          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[rgba(180,170,150,0.5)] bg-[rgba(250,248,245,0.85)] px-[18px] py-2 text-[0.82rem] font-semibold text-[#2E4A32] shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-[6px]">
            <div className="h-1.5 w-[60px] overflow-hidden rounded-[10px] bg-black/[0.08]">
              <div
                className="h-full rounded-[10px] bg-[#2E4A32] transition-[width] duration-[50ms] ease-linear"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </header>

        {/* Scroll Track */}
        <div ref={scrollTrackRef} style={{ height: scrollTrackHeight }}>
          <div className="sticky top-[100px] w-full">
            <div
              ref={deskWorkspaceRef}
              className="relative flex min-h-[520px] w-full items-center justify-center rounded-3xl border border-dashed border-[rgba(180,170,150,0.4)] bg-[rgba(240,235,225,0.45)] bg-[image:radial-gradient(circle_at_1px_1px,rgba(102,92,79,0.18)_0.75px,transparent_0.75px),linear-gradient(rgba(102,92,79,0.08)_1px,transparent_1px)] bg-[length:24px_24px,24px_24px] px-5 py-10 transition-[background-color,border-color] duration-[400ms] ease-in-out"
            >
              {/* Props */}
              <div
                ref={coffeeStainRef}
                className="pointer-events-none absolute right-[60px] top-[30px] h-[110px] w-[110px] rounded-full border-[6px] border-[rgba(140,95,55,0.07)] shadow-[inset_0_0_12px_rgba(140,95,55,0.05)] transition-opacity duration-300 ease-in-out"
              />

              {/* Folder Cards Pile */}
              <div className="relative flex h-[420px] w-full max-w-[960px] items-center justify-center max-[820px]:h-auto max-[820px]:flex-col max-[820px]:gap-6">
                {DOCUMENTS.map((doc, idx) => (
                  <div
                    key={doc.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveDoc(doc)}
                    className="absolute w-[310px] cursor-pointer rounded-[0_10px_12px_12px] border border-[#D1CAC0] bg-[#F6F4EF] bg-[image:linear-gradient(180deg,#FAFAF7_0%,#EFECE4_100%)] px-6 pb-7 pt-9 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_12px_rgba(40,30,20,0.06),0_12px_24px_-6px_rgba(40,30,20,0.1)] [will-change:transform] before:absolute before:-top-[22px] before:left-0 before:z-[-1] before:h-[23px] before:w-[120px] before:rounded-t-lg before:border before:border-b-0 before:border-[#D1CAC0] before:bg-[#FAFAF7] before:bg-[image:linear-gradient(180deg,#FFFFFF_0%,#FAFAF7_100%)] before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] before:content-[''] hover:border-[rgba(2,4,2,0.6)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_16px_40px_rgba(40,30,20,0.14)] max-[820px]:static max-[820px]:w-full max-[820px]:!transform-none [transition:transform_0.25s_ease,border-color_0.3s_ease,box-shadow_0.3s_ease]"
                  >
                    {doc.badgeColor && (
                      <div
                        className="absolute left-7 top-3 h-3 w-11 rounded-sm opacity-80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                        style={{ backgroundColor: doc.badgeColor }}
                      />
                    )}
                    <div className="mb-3 flex items-center justify-between">
                      <p className="m-0 text-xs font-semibold uppercase tracking-[0.05em] text-[#858076]">
                        {doc.eyebrow}
                      </p>
                      <span className="text-sm font-light text-black/40">↗</span>
                    </div>
                    <h3 className="mb-2.5 text-[1.15rem] font-bold leading-[1.3] text-[#1C1C1A]">
                      {doc.title}
                    </h3>
                    <p className="m-0 text-[0.85rem] leading-[1.5] text-[#66625b]">
                      {doc.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div
        onClick={() => setActiveDoc(null)}
        className={cn(
          "fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(30,25,20,0.45)] p-5 [transition:opacity_0.35s_ease,backdrop-filter_0.35s_ease]",
          activeDoc
            ? "pointer-events-auto opacity-100 backdrop-blur-md"
            : "pointer-events-none opacity-0 backdrop-blur-none",
        )}
      >
        {activeDoc && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "paper-texture relative z-[10000] w-full max-w-[560px] rounded-[28px] border border-[rgba(180,170,150,0.5)] p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_24px_60px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.08)] [transition:opacity_0.35s_cubic-bezier(0.16,1,0.3,1),transform_0.35s_cubic-bezier(0.16,1,0.3,1)]",
              activeDoc ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0",
            )}
          >
            <CloseButton onClick={() => setActiveDoc(null)} />

            <p className="mb-3 pr-10 text-xs font-semibold uppercase tracking-[0.05em] text-[#858076]">
              {activeDoc.eyebrow}
            </p>
            <h2 className="mb-4 text-[1.75rem] font-bold leading-[1.25] tracking-[-0.01em] text-[#1C1C1A]">
              {activeDoc.title}
            </h2>
            <p className="mb-6 text-base leading-[1.6] text-[#66625b]">
              {activeDoc.body} {activeDoc.details}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {activeDoc.tags.map((tag) => (
                <PaperTag key={tag}>{tag}</PaperTag>
              ))}
            </div>

            <CtaButton href={activeDoc.href}>{activeDoc.ctaText}</CtaButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessyDeskCanvas;
