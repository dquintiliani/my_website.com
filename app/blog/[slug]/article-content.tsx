'use client'

import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/lib/mdx-components'

interface ArticleContentProps {
  content: React.ComponentType<{}>
}

export function ArticleContent({ content: MDXContent }: ArticleContentProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <MDXContent />
    </MDXProvider>
  )
}
