import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import { FeaturedCta, ArticleRow } from "@/components/BlogInteractive";

export const metadata: Metadata = {
  title: "Writing — Dominic Quintilian",
  description:
    "Writing about data products, platform thinking, and the PM decisions that don't make it into the PRD.",
  openGraph: {
    title:       "Writing — Dominic Quintilian",
    description: "Writing about data products, platform thinking, and the PM decisions that don't make it into the PRD.",
    type:        "website",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export default function BlogPage() {
  const articles  = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <section id="blog" style={s.page}>
      <div style={s.inner}>

        {/* ── Header ── */}
        <div style={s.header}>
          <p style={s.eyebrow}>Writing</p>
          <h1 style={s.pageTitle}>
            Ideas worth{" "}
            <em style={s.pageTitleEm}>sharing</em>.
          </h1>
          <p style={s.pageDesc}>
            Writing about data products, platform thinking, and the PM
            decisions that don&apos;t make it into the PRD.
          </p>
        </div>

        {/* ── Featured post ── */}
        {featured && (
          <div style={s.featured}>
            <div>
              <p style={s.featuredLabel}>Latest</p>
              <div style={s.featuredMeta}>
                <time dateTime={featured.date} style={s.featDate}>
                  {formatDate(featured.date)}
                </time>
                <div style={s.featDot} />
                <span style={s.featRead}>{featured.readTime} min read</span>
              </div>
              <h2 style={s.featTitle}>{featured.title}</h2>
              {featured.excerpt && (
                <p style={s.featExcerpt}>{featured.excerpt}</p>
              )}

              {/* Client component — needs hover interaction */}
              <FeaturedCta slug={featured.slug} />

              <div style={s.featTags}>
                {featured.tags.map((tag, i) => (
                  <span
                    key={tag}
                    style={i === 0
                      ? { ...s.featTag, ...s.featTagGreen }
                      : s.featTag
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative right column */}
            <div style={s.featRight}>
              <p style={s.featNumber} aria-hidden="true">01</p>
              <p style={s.featContext}>
                Most recent article ·{" "}
                <strong style={s.featContextStrong}>
                  {articles.length} post{articles.length !== 1 ? "s" : ""} published
                </strong>{" "}
                · Topics span AI, product strategy, and data platform thinking.
              </p>
            </div>
          </div>
        )}

        {/* ── All articles ── */}
        <div>
          <p style={s.listLabel}>All articles</p>
          <div role="list">
            {articles.map((article, i) => (
              /* Client component — needs hover interaction */
              <ArticleRow
                key={article.slug}
                article={article}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: "#EEEAE3",
    minHeight:       "100vh",
    padding:         "72px 0 96px",
    fontFamily:      "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  inner: {
    maxWidth: "1080px",
    margin:   "0 auto",
    padding:  "0 40px",
  },

  // Header
  header: {
    marginBottom:  "64px",
    paddingBottom: "48px",
    borderBottom:  "1px solid #D2CEC5",
  },
  eyebrow: {
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         "#2C5F14",
    margin:        "0 0 18px",
  },
  pageTitle: {
    fontSize:      "clamp(36px, 4.5vw, 56px)",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.03em",
    lineHeight:    1.05,
    margin:        "0 0 16px",
  },
  pageTitleEm: {
    fontStyle:  "italic",
    color:      "#2C5F14",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 900,
  },
  pageDesc: {
    fontSize:   "15px",
    color:      "#7A7670",
    lineHeight: 1.75,
    maxWidth:   "520px",
    margin:     0,
  },

  // Featured
  featured: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "64px",
    alignItems:          "start",
    marginBottom:        "64px",
    paddingBottom:       "64px",
    borderBottom:        "1px solid #D2CEC5",
  },
  featuredLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    margin:        "0 0 16px",
  },
  featuredMeta: {
    display:      "flex",
    alignItems:   "center",
    gap:          "10px",
    marginBottom: "16px",
  },
  featDate: {
    fontSize:      "12px",
    color:         "#AEADA5",
    letterSpacing: "0.04em",
    fontWeight:    400,
  },
  featDot: {
    width:        "3px",
    height:       "3px",
    borderRadius: "50%",
    background:   "#D2CEC5",
  },
  featRead: {
    fontSize:      "12px",
    color:         "#AEADA5",
    letterSpacing: "0.04em",
  },
  featTitle: {
    fontSize:      "clamp(22px, 2.5vw, 30px)",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.02em",
    lineHeight:    1.2,
    margin:        "0 0 16px",
  },
  featExcerpt: {
    fontSize:   "14px",
    color:      "#6B6760",
    lineHeight: 1.8,
    margin:     "0 0 24px",
  },
  featTags: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "6px",
    marginTop: "16px",
  },
  featTag: {
    fontSize:      "11px",
    fontWeight:    500,
    color:         "#7A7670",
    padding:       "4px 10px",
    border:        "1px solid #D2CEC5",
    borderRadius:  "20px",
    letterSpacing: "0.02em",
  },
  featTagGreen: {
    background: "#DCE9D4",
    border:     "1px solid #DCE9D4",
    color:      "#2C5F14",
    fontWeight: 600,
  },
  featRight: {
    paddingTop: "8px",
  },
  featNumber: {
    fontFamily:    "'Playfair Display', Georgia, serif",
    fontStyle:     "italic",
    fontSize:      "120px",
    fontWeight:    900,
    color:         "#E8E3D9",
    lineHeight:    1,
    letterSpacing: "-0.04em",
    margin:        "0 0 16px",
    userSelect:    "none",
  },
  featContext: {
    fontSize:   "13px",
    color:      "#AEADA5",
    lineHeight: 1.6,
    maxWidth:   "280px",
  },
  featContextStrong: {
    color:      "#7A7670",
    fontWeight: 500,
  },

  // Article list
  listLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    margin:        "0 0 0",
    padding:       "0 0 16px",
  },
};  