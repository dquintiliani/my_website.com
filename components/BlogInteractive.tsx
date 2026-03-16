"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";

// ─── Featured CTA button ──────────────────────────────────────────────────────

export function FeaturedCta({ slug }: { slug: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      style={s.featCta}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#2C5F14";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#1A1916";
      }}
    >
      Read article →
    </Link>
  );
}

// ─── Article row ─────────────────────────────────────────────────────────────

export function ArticleRow({
  article,
  isFirst,
}: {
  article: Article;
  isFirst: boolean;
}) {
  function formatDateShort(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    });
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      role="listitem"
      style={{
        ...s.articleRow,
        borderTop: isFirst ? "1px solid #D2CEC5" : undefined,
      }}
      onMouseEnter={(e) => {
        const el  = e.currentTarget as HTMLAnchorElement;
        const ttl = el.querySelector(".row-title") as HTMLElement;
        const arr = el.querySelector(".row-arrow") as HTMLElement;
        if (ttl) ttl.style.color = "#2C5F14";
        if (arr) {
          arr.style.opacity   = "1";
          arr.style.transform = "translateX(0)";
        }
      }}
      onMouseLeave={(e) => {
        const el  = e.currentTarget as HTMLAnchorElement;
        const ttl = el.querySelector(".row-title") as HTMLElement;
        const arr = el.querySelector(".row-arrow") as HTMLElement;
        if (ttl) ttl.style.color = "#1A1916";
        if (arr) {
          arr.style.opacity   = "0";
          arr.style.transform = "translateX(-6px)";
        }
      }}
    >
      <div style={s.rowMeta}>
        <time dateTime={article.date} style={s.rowDate}>
          {formatDateShort(article.date)}
        </time>
        <span style={s.rowRead}>{article.readTime} min read</span>
      </div>

      <div style={s.rowBody}>
        <p className="row-title" style={s.rowTitle}>
          {article.title}
        </p>
        <div style={s.rowTags} aria-label="Tags">
          {article.tags.map((tag) => (
            <span key={tag} style={s.rowTag}>{tag}</span>
          ))}
        </div>
      </div>

      <span className="row-arrow" aria-hidden="true" style={s.rowArrow}>
        →
      </span>
    </Link>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  featCta: {
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
    padding:        "10px 20px",
    borderRadius:   "3px",
    transition:     "background 0.2s ease",
    marginBottom:   "24px",
  },
  articleRow: {
    display:             "grid",
    gridTemplateColumns: "140px 1fr auto",
    gap:                 "32px",
    alignItems:          "start",
    padding:             "28px 0",
    borderBottom:        "1px solid #D2CEC5",
    textDecoration:      "none",
    transition:          "background 0.15s ease",
    borderRadius:        "2px",
  },
  rowMeta: {
    display:       "flex",
    flexDirection: "column",
    gap:           "4px",
    paddingTop:    "3px",
  },
  rowDate: {
    fontSize:           "12px",
    color:              "#AEADA5",
    letterSpacing:      "0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  rowRead: {
    fontSize:      "11px",
    color:         "#C8C4BC",
    letterSpacing: "0.03em",
  },
  rowBody: {},
  rowTitle: {
    fontSize:      "clamp(15px, 1.5vw, 18px)",
    fontWeight:    600,
    color:         "#1A1916",
    letterSpacing: "-0.01em",
    lineHeight:    1.35,
    margin:        "0 0 8px",
    transition:    "color 0.15s ease",
  },
  rowTags: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "5px",
  },
  rowTag: {
    fontSize:      "10px",
    fontWeight:    500,
    color:         "#AEADA5",
    padding:       "2px 8px",
    border:        "1px solid #D2CEC5",
    borderRadius:  "20px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  rowArrow: {
    fontSize:   "16px",
    color:      "#2C5F14",
    opacity:    0,
    transform:  "translateX(-6px)",
    transition: "opacity 0.15s ease, transform 0.15s ease",
    paddingTop: "3px",
  },
};