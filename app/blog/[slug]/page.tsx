import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title:       `${article.title} — Dominic Quintilian`,
    description: article.excerpt,
    keywords:    article.tags.join(", "),
    openGraph: {
      title:         article.title,
      description:   article.excerpt,
      type:          "article",
      publishedTime: article.date,
      tags:          article.tags,
    },
    twitter: {
      card:        "summary_large_image",
      title:       article.title,
      description: article.excerpt,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug }  = await params;
  const article   = getArticleBySlug(slug);
  if (!article) notFound();

  const html = renderMarkdown(article.content);

  return (
    <article style={s.page}>
      <div style={s.inner}>

        {/* ── Back link ── */}
        <Link href="/blog" style={s.back}>
          <svg
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        {/* ── Header ── */}
        <header style={s.header}>
          <div style={s.meta}>
            <time dateTime={article.date} style={s.metaDate}>
              {formatDate(article.date)}
            </time>
            <div style={s.metaDot} />
            <span style={s.metaRead}>{article.readTime} min read</span>
          </div>

          <h1 style={s.title}>{article.title}</h1>

          {article.excerpt && (
            <p style={s.excerpt}>{article.excerpt}</p>
          )}

          <ul style={s.tags} aria-label="Tags">
            {article.tags.map((tag, i) => (
              <li
                key={tag}
                style={i === 0
                  ? { ...s.tag, ...s.tagFirst }
                  : s.tag
                }
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        {/* ── Body ── */}
        <div
          style={s.prose}
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* ── Footer ── */}
        <footer style={s.footer}>
          <Link href="/blog" style={s.back}>
            <svg
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
          <span style={s.footerNote}>Dominic Quintilian · 2026</span>
        </footer>

      </div>

      {/* Prose styles injected globally for markdown output */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700;1,900&display=swap');

        .article-prose { font-size: 16px; line-height: 1.85; color: #3D3B37; font-weight: 400; }
        .article-prose p  { margin-bottom: 1.5em; }
        .article-prose h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px; font-weight: 700;
          color: #1A1916; letter-spacing: -0.02em;
          margin: 2.5em 0 0.75em; line-height: 1.25;
        }
        .article-prose h3 {
          font-size: 17px; font-weight: 600;
          color: #1A1916; letter-spacing: -0.01em;
          margin: 2em 0 0.6em;
        }
        .article-prose strong { font-weight: 600; color: #1A1916; }
        .article-prose em    { font-style: italic; }
        .article-prose a     { color: #2C5F14; text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s ease; }
        .article-prose a:hover { color: #1A1916; }
        .article-prose blockquote {
          border-left: 3px solid #2C5F14;
          padding: 4px 0 4px 20px;
          margin: 2em 0;
        }
        .article-prose blockquote p { color: #6B6760; font-style: italic; margin: 0; font-size: 17px; }
        .article-prose ul,
        .article-prose ol  { padding-left: 1.5em; margin-bottom: 1.5em; }
        .article-prose li  { margin-bottom: 0.4em; line-height: 1.7; }
        .article-prose code {
          font-size: 13px; background: #E8E3D9;
          padding: 2px 6px; border-radius: 3px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          color: #2C5F14;
        }
        .article-prose pre {
          background: #1A1916; padding: 20px 24px;
          border-radius: 4px; overflow-x: auto; margin: 1.5em 0;
        }
        .article-prose pre code { background: none; color: #EEEAE3; padding: 0; font-size: 13px; }
        .article-prose hr { border: none; border-top: 1px solid #D2CEC5; margin: 2.5em 0; }
        .article-prose img { max-width: 100%; border-radius: 4px; margin: 1.5em 0; }
      `}</style>
    </article>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: "#EEEAE3",
    padding:         "48px 0 96px",
    minHeight:       "100vh",
    fontFamily:      "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },
  inner: {
    maxWidth: "720px",
    margin:   "0 auto",
    padding:  "0 40px",
  },

  // Back link
  back: {
    display:        "inline-flex",
    alignItems:     "center",
    gap:            "8px",
    fontSize:       "11px",
    fontWeight:     600,
    letterSpacing:  "0.1em",
    textTransform:  "uppercase",
    color:          "#AEADA5",
    textDecoration: "none",
    marginBottom:   "48px",
    transition:     "color 0.15s ease",
  },

  // Header
  header: {
    marginBottom:  "48px",
    paddingBottom: "40px",
    borderBottom:  "1px solid #D2CEC5",
  },
  meta: {
    display:      "flex",
    alignItems:   "center",
    gap:          "10px",
    marginBottom: "20px",
  },
  metaDate: {
    fontSize:      "12px",
    color:         "#AEADA5",
    letterSpacing: "0.04em",
    fontWeight:    400,
  },
  metaDot: {
    width:        "3px",
    height:       "3px",
    borderRadius: "50%",
    background:   "#D2CEC5",
    flexShrink:   0,
  },
  metaRead: {
    fontSize:      "12px",
    color:         "#AEADA5",
    letterSpacing: "0.04em",
  },
  title: {
    fontFamily:    "'Playfair Display', Georgia, serif",
    fontSize:      "clamp(32px, 4vw, 48px)",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.02em",
    lineHeight:    1.15,
    margin:        "0 0 20px",
  },
  excerpt: {
    fontSize:   "16px",
    fontWeight: 400,
    fontStyle:  "italic",
    color:      "#6B6760",
    lineHeight: 1.75,
    margin:     "0 0 24px",
  },
  tags: {
    display:   "flex",
    flexWrap:  "wrap",
    gap:       "6px",
    listStyle: "none",
    padding:   0,
    margin:    0,
  },
  tag: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color:         "#7A7670",
    padding:       "4px 10px",
    border:        "1px solid #D2CEC5",
    borderRadius:  "20px",
  },
  tagFirst: {
    background:  "#DCE9D4",
    borderColor: "#DCE9D4",
    color:       "#2C5F14",
  },

  // Prose wrapper — actual styles injected via <style> tag
  prose: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },

  // Footer
  footer: {
    marginTop:      "64px",
    paddingTop:     "32px",
    borderTop:      "1px solid #D2CEC5",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
  },
  footerNote: {
    fontSize:      "12px",
    color:         "#AEADA5",
    letterSpacing: "0.03em",
  },
};