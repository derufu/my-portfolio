# AGENTS.md

## Cursor Cloud specific instructions

This is a **Nuxt 3** static content portfolio/blog (`@nuxt/content`, `@nuxt/ui`, Tailwind). Package manager is **yarn** (`yarn.lock`); use `yarn`, not npm/pnpm.

- Start the dev server with `yarn dev` (serves on http://localhost:3000). SSR is enabled. `postinstall` runs `nuxt prepare` to generate `.nuxt` types.
- There is **no test script and no ESLint config**. The only "lint" available is Prettier: `npx prettier --check "**/*.{ts,vue,js}"`. Note that several existing files already report Prettier warnings on a clean checkout — do not treat those pre-existing warnings as regressions.
- `@nuxtjs/google-fonts` downloads the Inter font from Google Fonts during `nuxt prepare`/dev startup, so first install/build needs network access.
- Content pages are driven by files under `content/` (articles, projects, experiences, educations, uses, lab). Add/edit those Markdown/JSON files to change site content; `pages/` renders them.
- `nuxt.config.ts` sets `devtools.enabled: false`.
