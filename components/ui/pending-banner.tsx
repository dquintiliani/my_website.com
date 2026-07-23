import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Diagonal banner strip for "pending" cards — a mustard-toned reinterpretation
 * of a caution-tape stripe, evoking anticipation rather than hazard.
 */
function PendingRibbon({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'absolute inset-x-[-15%] rotate-[-6deg] whitespace-nowrap bg-[var(--mustard)] py-1.5 text-center text-xs font-extrabold uppercase tracking-[0.15em] text-[var(--warm-700)] shadow-[0_4px_10px_rgba(0,0,0,0.12)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Rotated dashed-border "stamp" badge for pending cards, echoing the
 * mustard/accent-foreground pairing used by projects.tsx's status pill.
 */
function PendingStamp({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'absolute rotate-[-4deg] rounded-md border-2 border-dashed border-[var(--mustard)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--accent-foreground)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { PendingRibbon, PendingStamp }
