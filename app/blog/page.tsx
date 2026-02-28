import Link from "next/link"
import { getAllArticles } from "@/lib/articles"
import type { Metadata } from "next"
import "./blog.css"


export const metadata: Metadata = {
  title: "Writing",
  description:
    "Knowledge and stories I want to share with the world",
  openGraph: {
    title: "Blog",
    description:
      "Thinking on product management, data analytics, AI applications, and building things worth building.",
    type: "website",
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    
    <section id="blog">
      <div className="blog-header">
        <br></br>
        <p className="section-label">Writing</p>
        <div className="divider"></div>
        <p className="blog-intro">
          Knowledge and stories I want to share with the world
        </p>
        <p> 
          <br></br>
        </p>
      </div>

      <div className="article-list" role="list">
        {articles.map((article, i) => (
          <article
            key={article.slug}
            className="article-card"
            role="listitem"
            style={{ "--card-index": i } as React.CSSProperties}
          >
            <Link href={`/blog/${article.slug}`} className="article-card-link">
              <div className="article-card-inner">
                <div className="article-meta-row">
                  <time
                    dateTime={article.date}
                    className="article-date"
                  >
                    {formatDate(article.date)}
                  </time>
                  <span className="article-read-time">
                    {article.readTime} min read
                  </span>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-footer">
                  <ul className="article-tags" aria-label="Tags">
                    <hr></hr>
                    {article.tags.map((tag) => (
                      <li key={tag} className="article-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="article-cta" aria-hidden="true">
                    Read
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}