# Styling conventions

This is a Next.js App Router site using Tailwind CSS v4 (config-free — theme lives in
`app/styles/tokens.css`'s `@theme`/`:root` blocks, there is no `tailwind.config.*`) plus
shadcn/ui primitives in `components/ui/*`.

`app/globals.css` is just the entry point (`@import 'tailwindcss'` plus the imports
below) — the actual CSS lives in `app/styles/`:
- `tokens.css` — `:root` / `.dark` / `@theme inline`
- `base.css` — the `@layer base` reset and shared `@keyframes`
- `utilities.css` — small shared one-off classes (`.container`, `.tag`, `.paper-texture`, etc.)
- `sections/*.css` — one file per page section (`hero.css`, `about.css`, `experience.css`,
  `skills.css`, `writing.css`, `contact.css`, `blog.css`)
- `responsive.css` — the breakpoint overrides for the above

Where new styling should live, in priority order:

1. **Design tokens** (color, spacing, radius, font, breakpoint, transition values) live
   only in `app/styles/tokens.css`'s `:root` / `@theme inline` blocks. Never redeclare a
   raw value that already has a token (`--black`, `--white`, `--green*`, `--mustard*`,
   `--warm-100..700`, `--sp-2..20`, etc.) — reference the token instead.
2. **Reusable interactive primitives** (buttons, cards, inputs, dialogs, badges, form
   fields) go through `components/ui/*` (shadcn), extended only via `cva` variants on
   top of the existing primitive. Don't hand-roll a new button/card markup+CSS
   combination in a page or feature component — check `components/ui/` first.
3. **One-off layout/visual styling** for a specific component gets a real CSS class
   added to the relevant file under `app/styles/` (its own section file, or
   `utilities.css` if it's shared/generic). This is the default for all new work — do
   not reach for Tailwind utility classes for bespoke one-off component styling. Add a
   new `sections/*.css` file (and `@import` it from `app/globals.css`) for a section
   that doesn't have one yet. (Some existing components — `footer.tsx`, `about.tsx`,
   `projects.tsx`, `app/projects/page.tsx`, `folder.tsx` — were migrated to Tailwind
   utility classes before this rule was set; that's accepted as-is, not something to
   redo, but don't extend the pattern to new components.)
4. **Site-wide base/reset/keyframes/decorative effects** (the grain overlay, shared
   `@keyframes`) live in `app/styles/base.css`; the `.prose` typography block lives in
   `app/styles/sections/blog.css`. Never duplicate a rule that already exists in one of
   these files.
5. **`styled-jsx`** is deprecated for new code — use rule #3 (a real CSS class) instead
   of a component-embedded `<style>`/`<style jsx>` block. Existing usages
   (`components/contact.tsx` before its migration, etc.) were migration debt, not a
   pattern to copy.
6. **Inline `style={{...}}`** (or a hoisted `const s = {...}` style-object) is only for
   values genuinely computed at runtime (measured DOM size, scroll-driven transforms,
   per-datum colors from data). Never use it for static values — those belong in a CSS
   class under `app/styles/`.

Before adding a new class, check whether an existing class or CSS custom property
already covers it — this codebase has a history of dead/duplicated CSS from components
being rewritten without removing what they used to depend on (see the `git log` for the
design-system cleanup commits). When you retire a component's old styling, delete the
CSS that only it used; don't leave it behind as debris for the next person to puzzle
over.

## Known exception

`app/model-matchmaker/page.tsx` uses an intentionally separate neon pink/purple visual
theme unrelated to the rest of the site's warm/editorial palette. Don't reuse its colors
elsewhere, and don't force the main site tokens onto that page without a deliberate
product decision.

## Notes

- Dark mode: the `.dark` class and `@theme` bridge exist for shadcn compatibility, but
  page content is not currently wired up to render correctly in dark mode (components
  use light-only raw hex rather than `bg-background`/`text-foreground`). Treat dark-mode
  correctness in page content as out of scope unless specifically requested.
- Breakpoints: the canonical scale (400/640/768/900px) is documented at the top of
  `app/styles/responsive.css`. Plain CSS `@media` conditions can't read a `var()` token,
  so that comment is the source of truth for new `@media` rules. For JS-side viewport
  checks, use `BREAKPOINTS` from `lib/breakpoints.ts` instead of a new one-off number.
