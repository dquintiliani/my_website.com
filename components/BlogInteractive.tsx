"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { CtaButton } from "@/components/ui/cta-button";

// ─── Featured CTA button ──────────────────────────────────────────────────────

export function FeaturedCta({ slug }: { slug: string }) {
  return (
    <CtaButton href={`/blog/${slug}`} className="mb-6">
      Read article →
    </CtaButton>
  );
}

// ─── Article row ─────────────────────────────────────────────────────────────

export function ArticleRow({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  function formatDateShort(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div
      className="article-card"
      role="listitem"
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <Link href={`/blog/${article.slug}`} className="article-card-link">
        <div className="article-card-inner">
          <div className="article-meta-row">
            <time dateTime={article.date} className="article-date">
              {formatDateShort(article.date)}
            </time>
            <span className="article-read-time">{article.readTime} min read</span>
          </div>

          <h3 className="article-title">{article.title}</h3>

          <div className="article-footer">
            <ul className="article-tags" aria-label="Tags">
              {article.tags.map((tag) => (
                <li key={tag} className="pill-tag">
                  {tag}
                </li>
              ))}
            </ul>
            <span className="article-cta" aria-hidden="true">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
