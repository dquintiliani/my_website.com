// lib/fetch-post-mdx.ts
import fs from 'fs/promises'
import path from 'path'

export async function fetchPostMdx(slug: string): Promise<string> {
  const articlesDir = path.join(process.cwd(), 'content', 'articles')
  const filePath = path.join(articlesDir, `${slug}.mdx`)
  const file = await fs.readFile(filePath, 'utf8')
  return file
}

