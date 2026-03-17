import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";
import { FeaturedCta, ArticleRow } from "@/components/BlogInteractive";

export const metadata: Metadata = {
  title: "Writing — Dominic Quintilian",
  description:
    "Writing about data products, platform thinking, and the PM decisions that don't make it into the PRD.",
  openGraph: {
    title: "Writing — Dominic Quintilian",
    description:
      "Writing about data products, platform thinking, and the PM decisions that don't make it into the PRD.",
    type: "website",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <section id="blog">
      <div className="blog-inner">

        {/* ── Header ── */}
        <div className="blog-header">
          <p className="section-label">Writing</p>
          <h1 className="blog-page-title">
            Ideas worth <em>sharing</em>.
          </h1>
          <p className="blog-page-desc">
            Writing about data products, platform thinking, and the PM
            decisions that don&apos;t make it into the PRD.
          </p>
        </div>

        {/* ── Featured post ── */}
        {featured && (
          <div className="blog-featured">
            <div>
              <p className="blog-featured-label">Latest</p>
              <div className="blog-featured-meta">
                <time dateTime={featured.date} className="blog-feat-date">
                  {formatDate(featured.date)}
                </time>
                <div className="blog-feat-dot" />
                <span className="blog-feat-read">{featured.readTime} min read</span>
              </div>
              <h2 className="blog-feat-title">{featured.title}</h2>
              {featured.excerpt && (
                <p className="blog-feat-excerpt">{featured.excerpt}</p>
              )}

              {/* Client component — needs hover interaction */}
              <FeaturedCta slug={featured.slug} />

              <div className="blog-feat-tags">
                {featured.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={
                      i === 0
                        ? "blog-feat-tag blog-feat-tag--primary"
                        : "blog-feat-tag"
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative right column */}
            <div className="blog-featured-aside">
              <p className="blog-feat-number" aria-hidden="true">01</p>
              <p className="blog-feat-context">
                Most recent article ·{" "}
                <strong>
                  {articles.length} post{articles.length !== 1 ? "s" : ""} published
                </strong>{" "}
                · Topics span AI, product strategy, and data platform thinking.
              </p>
            </div>
          </div>
        )}

        {/* ── All articles ── */}
        <div>
          <p className="blog-list-label">All articles</p>
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