# Styling conventions

This is a Next.js App Router site using Tailwind CSS v4 (config-free — theme lives in
`app/globals.css`'s `@theme`/`:root` blocks, there is no `tailwind.config.*`) plus
shadcn/ui primitives in `components/ui/*`.

Where new styling should live, in priority order:

1. **Design tokens** (color, spacing, radius, font, breakpoint, transition values) live
   only in `app/globals.css`'s `:root` / `@theme inline` blocks. Never redeclare a raw
   value that already has a token (`--black`, `--white`, `--green*`, `--mustard*`,
   `--warm-100..700`, `--sp-2..20`, etc.) — reference the token instead.
2. **Reusable interactive primitives** (buttons, cards, inputs, dialogs, badges, form
   fields) go through `components/ui/*` (shadcn), extended only via `cva` variants on
   top of the existing primitive. Don't hand-roll a new button/card markup+CSS
   combination in a page or feature component — check `components/ui/` first.
3. **One-off layout/visual styling** for a specific component gets a real CSS class
   added to `app/globals.css`, organized by section (e.g. a `CONTACT` section, a
   `NAVIGATION` section). This is the default for all new work — do not reach for
   Tailwind utility classes for bespoke one-off component styling. (Some existing
   components — `footer.tsx`, `about.tsx`, `projects.tsx`, `app/projects/page.tsx`,
   `folder.tsx` — were migrated to Tailwind utility classes before this rule was set;
   that's accepted as-is, not something to redo, but don't extend the pattern to new
   components.)
4. **Site-wide base/reset/keyframes/decorative effects** (the grain overlay, the
   `.prose` typography block, shared `@keyframes`) live in `app/globals.css` too, scoped
   by section, never duplicated.
5. **`styled-jsx`** is deprecated for new code — use rule #3 (a globals.css class)
   instead of a component-embedded `<style>`/`<style jsx>` block. Existing usages
   (`components/contact.tsx` before its migration, etc.) were migration debt, not a
   pattern to copy.
6. **Inline `style={{...}}`** (or a hoisted `const s = {...}` style-object) is only for
   values genuinely computed at runtime (measured DOM size, scroll-driven transforms,
   per-datum colors from data). Never use it for static values — those belong in a
   globals.css class.

Before adding a new class to globals.css, check whether an existing class or CSS custom
property already covers it — this codebase has a history of dead/duplicated CSS from
components being rewritten without removing what they used to depend on (see the `git
log` for the design-system cleanup commits). When you retire a component's old styling,
delete the CSS that only it used; don't leave it behind as debris for the next person to
puzzle over.

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
