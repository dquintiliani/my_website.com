import type { MDXComponents } from 'mdx/types'

/**
 * Registry of components available to use inside MDX articles.
 * Import any React components you want to use in markdown and add them here.
 * 
 * Usage in MDX files:
 * import { MyComponent } from '@/components/my-component'
 * 
 * Then use it like: <MyComponent prop="value" />
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-bold my-5 mt-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-bold my-4 mt-6">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-bold my-3">{children}</h4>,
  p: ({ children }) => <p className="text-base leading-7 my-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
  li: ({ children }) => <li className="ml-2">{children}</li>,
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 overflow-auto my-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100 dark:bg-gray-800">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
      {children}
    </td>
  ),
}
