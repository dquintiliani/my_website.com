import { MDXRemote } from "next-mdx-remote/rsc"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import type { MDXComponents } from "mdx/types"

export async function renderMdx(
  source: string,
  components: MDXComponents
): Promise<React.ReactNode> {
  // Next.js + next-mdx-remote handle the compilation internally
  // You just pass the source string + components
  return (
    <MDXRemote
      source={source}
      components={components as MDXRemoteProps["components"]}
    />
  )
}