import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllSlugs, getArticleBySlug } from "@/lib/articles"
import { renderMarkdown } from "@/lib/markdown"
import type { Metadata } from "next"
import "../blog.css"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const html = renderMarkdown(article.content)

  return (
    <article className="article-page">
      <div className="article-page-header">
        <Link href="/blog" className="back-link">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All articles
        </Link>

        <div className="article-page-meta">
          <time dateTime={article.date} className="article-date">
            {formatDate(article.date)}
          </time>
          <span className="article-read-time">{article.readTime} min read</span>
        </div>

        <h1 className="article-page-title">{article.title}</h1>
        <p className="article-page-excerpt">{article.excerpt}</p>

        <ul className="article-tags" aria-label="Tags">
          {article.tags.map((tag) => (
            <li key={tag} className="article-tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="divider" style={{ marginTop: "var(--sp-8)" }}></div>
      </div>

      <div
        className="article-body prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="article-page-footer">
        <div className="divider"></div>
        <Link href="/blog" className="back-link">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to all articles
        </Link>
      </footer>
    </article>
  )
}