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
    <article className="article-page">
      {/* ── Back link ── */}
      <Link href="/blog" className="back-link">
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
      <header className="article-page-header">
        <div className="blog-featured-meta">
          <time dateTime={article.date} className="blog-feat-date">
            {formatDate(article.date)}
          </time>
          <div className="blog-feat-dot" />
          <span className="blog-feat-read">{article.readTime} min read</span>
        </div>

        <h1 className="article-page-title">{article.title}</h1>

        {article.excerpt && (
          <p className="article-page-excerpt">{article.excerpt}</p>
        )}

        <ul className="blog-feat-tags" aria-label="Tags">
          {article.tags.map((tag, i) => (
            <li
              key={tag}
              className={i === 0 ? "pill-tag pill-tag--primary" : "pill-tag"}
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      {/* ── Body ── */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {/* ── Footer ── */}
      <footer className="article-page-footer">
        <Link href="/blog" className="back-link">
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
        <span className="article-page-footer-note">Dominic Quintilian · 2026</span>
      </footer>
    </article>
  );
}
