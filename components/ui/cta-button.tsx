import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Canonical pill-shaped CTA link, consolidating what used to be 4 separately
 * copy-pasted `.cta-btn` styled-jsx blocks (folder.tsx, projects.tsx,
 * about.tsx, app/projects/page.tsx).
 */
function CtaButton({ className, children, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        "inline-block rounded-full bg-[var(--black)] px-7 py-3.5 text-center text-[0.92rem] font-semibold text-white no-underline transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-[#2c2b28] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Canonical circular modal-dismiss button, consolidating what used to be 4
 * separately copy-pasted `.close-btn` styled-jsx blocks.
 */
function CloseButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      aria-label="Close modal"
      className={cn(
        'absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-black/[0.08] bg-[var(--warm-100)] text-sm font-bold text-[var(--warm-700)] transition-[transform,background-color] duration-200 ease-out hover:scale-[1.08] hover:bg-[#e2ddd4]',
        className,
      )}
      {...props}
    >
      ✕
    </button>
  )
}

export { CtaButton, CloseButton }
