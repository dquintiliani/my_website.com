import fs from "fs"
import path from "path"

export interface ArticleMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  readTime: number
  slug: string
  staging: boolean
}

// This module implements a very small MDX-based content system for a
// blog or article section. It loads .mdx files from a content/articles directory,
// parses their frontmatter manually, and exposes helper functions to retrieve article metadata,
// full article content, and slugs.
//
// content/articles/staging/*.mdx holds unlisted drafts: getArticleBySlug and
// getAllSlugs (so they're still statically built) include them, but
// getAllArticles (the /blog index) does not — they're reachable only by
// whoever has the direct /blog/<slug> link.

export interface Article extends ArticleMeta {
  content: string
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles")
const STAGING_DIR = path.join(ARTICLES_DIR, "staging")

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

function listMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
}

export function getAllArticles(): ArticleMeta[] {
  return listMdxFiles(ARTICLES_DIR)
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8")
      const { meta } = parseFrontmatter(raw)
      return { ...(meta as unknown as ArticleMeta), staging: false }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const publishedPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  const stagingPath = path.join(STAGING_DIR, `${slug}.mdx`)

  const staging = !fs.existsSync(publishedPath) && fs.existsSync(stagingPath)
  const filePath = staging ? stagingPath : publishedPath
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { meta, content } = parseFrontmatter(raw)

  return { ...(meta as unknown as ArticleMeta), staging, content }
}

export function getAllSlugs(): string[] {
  const slugs = [...listMdxFiles(ARTICLES_DIR), ...listMdxFiles(STAGING_DIR)]
    .map((f) => f.replace(/\.mdx$/, ""))
  return [...new Set(slugs)]
}