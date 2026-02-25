import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllSlugs, getArticleBySlug, getMDXArticle } from "@/lib/articles"
import { mdxComponents } from "@/lib/mdx-components"
import { MDXProvider } from "@mdx-js/react"
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

  // Try to load MDX component if it exists, otherwise render as markdown
  let mdxArticle
  try {
    mdxArticle = await getMDXArticle(slug)
  } catch (error) {
    console.warn(`MDX not found for ${slug}, falling back to markdown`)
  }

  const MDXContent = mdxArticle?.default

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
      </div>

      <div className="article-body prose">
        {MDXContent ? (
          <MDXProvider components={mdxComponents}>
            <MDXContent />
          </MDXProvider>
        ) : (
          <p className="text-gray-500">Article could not be loaded</p>
        )}
      </div>

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
