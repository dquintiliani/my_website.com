'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

// Statically import MDX articles to avoid React Context issues
// This allows Next.js to properly compile MDX with client component support
const mdxModules: Record<string, { default: ComponentType<{}> }> = {
  'mdx-example': { default: dynamic(() => import('../content/articles/mdx-example.mdx')) as any },
}

export async function loadArticleComponent(slug: string): Promise<ComponentType<{}> | null> {
  const module = mdxModules[slug]
  if (!module) return null
  return module.default
}

export function isArticleMDX(slug: string): boolean {
  return slug in mdxModules
}
