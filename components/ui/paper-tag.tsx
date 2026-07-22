import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Small pill tag used on the tactile-paper cards/modals (about.tsx,
 * projects.tsx, app/projects/page.tsx) — consolidates what used to be
 * byte-identical `.card-tag`/`.tool-tag` styled-jsx blocks.
 */
function PaperTag({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'rounded-xl border border-black/5 bg-[rgba(238,234,227,0.85)] px-3 py-1.5 text-xs font-semibold text-[#3a3834] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-[2px]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { PaperTag }
