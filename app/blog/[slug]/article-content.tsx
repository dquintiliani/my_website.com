'use client'

import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/lib/mdx-components'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

interface ArticleContentProps {
  slug: string
}

// Lazy load article components by slug
const articleModules: Record<string, any> = {
  'mdx-example': dynamic(() => import('@/content/articles/mdx-example.mdx')),
}

export function ArticleContent({ slug }: ArticleContentProps) {
  const MDXContent = useMemo(() => articleModules[slug], [slug])

  if (!MDXContent) {
    return <p className="text-gray-500">Article could not be loaded</p>
  }

  return (
    <MDXProvider components={mdxComponents}>
      <MDXContent />
    </MDXProvider>
  )
}
