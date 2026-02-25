import fs from "fs"
import path from "path"
import { MDXComponents } from "mdx/types"

export interface ArticleMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: number
  slug: string
}

export interface Article extends ArticleMeta {
  content: string
}

export interface MDXArticle extends ArticleMeta {
  default: React.ComponentType<{}>
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles")

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; content: string } {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!fmMatch) return { meta: {}, content: raw }

  const [, fmBlock, content] = fmMatch
  const meta: Record<string, unknown> = {}

  for (const line of fmBlock.split("\n")) {
    const colonIdx = line.indexOf(":")
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const raw = line.slice(colonIdx + 1).trim()

    if (raw.startsWith("[")) {
      // Parse inline array: ["a", "b"]
      meta[key] = raw
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    } else if (!isNaN(Number(raw))) {
      meta[key] = Number(raw)
    } else {
      meta[key] = raw.replace(/^["']|["']$/g, "")
    }
  }

  return { meta, content: content.trim() }
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"))

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8")
      const { meta } = parseFrontmatter(raw)
      return meta as unknown as ArticleMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { meta, content } = parseFrontmatter(raw)

  return { ...(meta as unknown as ArticleMeta), content }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}


