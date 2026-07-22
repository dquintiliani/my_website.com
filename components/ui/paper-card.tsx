import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Hoverable "paper-texture" teaser card, consolidating what used to be
 * near-identical (differing only by border tint) card styling duplicated
 * across about.tsx and projects.tsx.
 */
const paperCardVariants = cva(
  "paper-texture relative rounded-[20px] p-7 px-6 [transition:transform_0.35s_cubic-bezier(0.16,1,0.3,1),box-shadow_0.35s_cubic-bezier(0.16,1,0.3,1),border-color_0.3s_ease] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_8px_rgba(40,30,20,0.04),0_16px_32px_-4px_rgba(40,30,20,0.08)]",
  {
    variants: {
      tint: {
        green:
          "border border-[rgba(46,74,50,0.2)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(40,30,20,0.04),0_4px_12px_rgba(40,30,20,0.03)] hover:border-[rgba(46,74,50,0.5)]",
        warm:
          "border border-[rgba(180,170,150,0.35)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(40,30,20,0.04),0_4px_12px_rgba(40,30,20,0.03),0_12px_24px_-4px_rgba(40,30,20,0.02)] hover:border-[rgba(160,145,120,0.5)]",
      },
      rotate: {
        left: "hover:rotate-[-0.2deg]",
        right: "hover:rotate-[0.2deg]",
      },
    },
  },
)

/**
 * Paper-texture modal card wrapper, byte-identical across about.tsx,
 * projects.tsx, and folder.tsx before this consolidation.
 */
const paperModalCardVariants = cva(
  "paper-texture relative z-[10000] w-full max-w-[560px] rounded-[28px] border border-[rgba(180,170,150,0.5)] p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_24px_60px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.08)] [transition:opacity_0.35s_cubic-bezier(0.16,1,0.3,1),transform_0.35s_cubic-bezier(0.16,1,0.3,1)]",
  {
    variants: {
      active: {
        true: "translate-y-0 scale-100 opacity-100",
        false: "translate-y-3 scale-95 opacity-0",
      },
    },
  },
)

export { paperCardVariants, paperModalCardVariants }
export type PaperCardVariants = VariantProps<typeof paperCardVariants>
export type PaperModalCardVariants = VariantProps<typeof paperModalCardVariants>
