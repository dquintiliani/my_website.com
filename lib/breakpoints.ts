/**
 * Canonical breakpoint scale for this site (mirrors the comment block at the
 * top of the RESPONSIVE section in app/globals.css). Use these for any JS-side
 * viewport checks instead of a new one-off number, so JS and CSS breakpoints
 * can't drift apart.
 */
export const BREAKPOINTS = {
  xs: 400,
  mobile: 640,
  tablet_sm: 768,
  tablet: 900,
} as const;
