"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CtaButton, CloseButton } from '@/components/ui/cta-button';

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
    <div className="desk-app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap');

        .desk-app-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #F3EFE6;
          color: #1C1C1A;
          min-height: 100vh;
          padding: 48px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-x: hidden;
        }

        .app-container {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }

        .header-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 600;
          color: #2E4A32;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1C1C1A;
          margin-bottom: 12px;
        }

        .section-title em {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .section-desc {
          font-size: 1rem;
          color: #66625b;
          line-height: 1.55;
          max-width: 580px;
          margin: 0 auto 24px auto;
        }

        .scroll-indicator {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(250, 248, 245, 0.85);
          border: 1px solid rgba(180, 170, 150, 0.5);
          border-radius: 980px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #2E4A32;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-bottom: 24px;
        }

        .progress-bar-bg {
          width: 60px;
          height: 6px;
          background: rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: #2E4A32;
          border-radius: 10px;
          transition: width 0.05s linear;
        }

        .scroll-track {
          position: relative;
          height: auto;
          width: 100%;
        }

        .sticky-desk-wrapper {
          position: sticky;
          top: 100px;
          width: 100%;
        }

        .header-section {
          position: relative;
        }

        .desk-workspace {
          position: relative;
          width: 100%;
          min-height: 520px;
          background-color: rgba(240, 235, 225, 0.45);
          background-image:
            radial-gradient(circle at 1px 1px, rgba(102, 92, 79, 0.18) 0.75px, transparent 0.75px),
            linear-gradient(rgba(102, 92, 79, 0.08) 1px, transparent 1px);
          background-size: 24px 24px, 24px 24px;
          background-position: 0 0, 0 0;
          border: 1px dashed rgba(180, 170, 150, 0.4);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          transition: background-color 0.4s ease, border-color 0.4s ease;
        }

        .coffee-stain {
          position: absolute;
          top: 30px;
          right: 60px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 6px solid rgba(140, 95, 55, 0.07);
          box-shadow: inset 0 0 12px rgba(140, 95, 55, 0.05);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

 


        .pile-container {
          position: relative;
          width: 100%;
          max-width: 960px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .paper-card {
          position: absolute;
          width: 310px;
          padding: 36px 24px 28px 24px;
          cursor: pointer;
          text-align: left;
          background-color: #F6F4EF;
          background-image: linear-gradient(180deg, #FAFAF7 0%, #EFECE4 100%);
          border: 1px solid #D1CAC0;
          border-radius: 0 10px 12px 12px;
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            0 4px 12px rgba(40, 30, 20, 0.06),
            0 12px 24px -6px rgba(40, 30, 20, 0.1);
          will-change: transform;
          transform: translate(var(--card-translate-x, 0), var(--card-translate-y, 0)) rotate(var(--card-rotate, 0deg));
          transition: transform 0.25s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* FIXED: Restored Folder Tab styling using staggered pseudo-elements */
        .paper-card::before {
          content: '';
          position: absolute;
          top: -22px;
          left: 0;
          width: 120px;
          height: 23px;
          background-color: #FAFAF7;
          background-image: linear-gradient(180deg, #FFFFFF 0%, #FAFAF7 100%);
          border: 1px solid #D1CAC0;
          border-bottom: none;
          border-radius: 8px 12px 0 0;
          z-index: -1;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
        }

        .paper-card:hover {
          border-color: rgba(2, 4, 2, 0.6);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            0 16px 40px rgba(40, 30, 20, 0.14);
        }

        .tape-accent {
          position: absolute;
          top: 12px;
          left: 28px;
          width: 44px;
          height: 12px;
          opacity: 0.8;
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .doc-tag {
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

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: rgba(30, 25, 20, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          pointer-events: none;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          transition: opacity 0.35s ease, backdrop-filter 0.35s ease;
        }

        .modal-overlay.visible {
          opacity: 1;
          pointer-events: auto;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .modal-card {
          position: relative;
          z-index: 10000;
          width: 100%;
          max-width: 560px;
          padding: 40px;
          border-radius: 28px;
          box-sizing: border-box;

          background-color: #faf8f5;
          background-image: 
            radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 235, 225, 0.5) 100%);
          background-size: 18px 18px, 100% 100%;

          border: 1px solid rgba(180, 170, 150, 0.5);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            0 24px 60px rgba(0, 0, 0, 0.18),
            0 4px 16px rgba(0, 0, 0, 0.08);

          opacity: 0;
          transform: scale(0.95) translateY(12px);
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-overlay.visible .modal-card {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        @media (max-width: 820px) {
          .scroll-track {
            height: auto;
          }
        
          .pile-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            height: auto !important;
          }
          .paper-card {
            position: relative !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
          }

        }
      `}</style>

      <div className="app-container">
        {/* Header */}
        <header className="header-section">
          <p className="section-eyebrow">Data System Architecture</p>
          <h1 className="section-title">
            Bringing Order to <em>Chaotic</em> Systems.
          </h1>

          <p className="section-desc">
            Scroll down to transform the chaotic desk stack into an organized system, then click any folder to inspect its architecture.
          </p>

          <div className="scroll-indicator">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </header>

        {/* Scroll Track */}
        <div ref={scrollTrackRef}  style={{ height: scrollTrackHeight }}>
          <div className="sticky-desk-wrapper">
            <div ref={deskWorkspaceRef} className="desk-workspace">
              {/* Props */}
              <div ref={coffeeStainRef} className="coffee-stain" />

              {/* Folder Cards Pile */}
              <div className="pile-container">
                {DOCUMENTS.map((doc, idx) => (
                  <div
                    key={doc.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="paper-card"
                    onClick={() => setActiveDoc(doc)}
                  >
                    {doc.badgeColor && (
                      <div
                        className="tape-accent"
                        style={{ backgroundColor: doc.badgeColor }}
                      />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          color: '#858076',
                          textTransform: 'uppercase',
                          margin: 0,
                        }}
                      >
                        {doc.eyebrow}
                      </p>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 300,
                          color: 'rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: '10px',
                        color: '#1C1C1A',
                      }}
                    >
                      {doc.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#66625b',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
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
        className={`modal-overlay ${activeDoc ? 'visible' : ''}`}
        onClick={() => setActiveDoc(null)}
      >
        {activeDoc && (
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={() => setActiveDoc(null)} />

            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: '#858076',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingRight: '40px',
              }}
            >
              {activeDoc.eyebrow}
            </p>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#1C1C1A',
                marginBottom: '16px',
                lineHeight: 1.25,
              }}
            >
              {activeDoc.title}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: '#66625b',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              {activeDoc.body} {activeDoc.details}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '32px',
              }}
            >
              {activeDoc.tags.map((tag) => (
                <span key={tag} className="doc-tag">
                  {tag}
                </span>
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