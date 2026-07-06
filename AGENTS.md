# AGENTS.md

## Cursor Cloud specific instructions

This is a **Nuxt 3** static content portfolio/blog (`@nuxt/content`, `@nuxt/ui`, Tailwind). Package manager is **yarn** (`yarn.lock`); use `yarn`, not npm/pnpm.

- Start the dev server with `yarn dev` (serves on http://localhost:3000). SSR is enabled. `postinstall` runs `nuxt prepare` to generate `.nuxt` types.
- There is **no test script and no ESLint config**. The only "lint" available is Prettier: `npx prettier --check "**/*.{ts,vue,js}"`. Note that several existing files already report Prettier warnings on a clean checkout — do not treat those pre-existing warnings as regressions.
- `@nuxtjs/google-fonts` downloads the Inter font from Google Fonts during `nuxt prepare`/dev startup, so first install/build needs network access.
- Content pages are driven by files under `content/` (articles, projects, experiences, educations, uses, lab). Add/edit those Markdown/JSON files to change site content; `pages/` renders them.
- `nuxt.config.ts` sets `devtools.enabled: false`.

### Feature notes

- **Video Editing tab** (`pages/videos.vue` + `components/App/VideoPlayer.vue`): embeds a YouTube playlist. Set the playlist via `video.playlistId` in `app.config.ts` (accepts a full playlist URL or the bare `PL...` ID); optional `video.channelUrl` shows a "watch full channel" button. The whole playlist is embedded, so every video in it (including unlisted ones — unlisted still embeds fine, only fully private does not) appears without listing videos individually. The player uses a click-to-load facade so the heavy YouTube iframe is only loaded after the user clicks.
- **Gotcha — Tailwind `aspect-video`:** under this `@nuxt/ui` Tailwind preset, the core `aspect-video` utility is not emitted into the served CSS (a container relying on it collapses to 0 height). Use an inline `style="aspect-ratio: 16 / 9"` instead (see `VideoPlayer.vue`).
- **Testing YouTube embeds in the cloud VM:** the datacenter IP triggers YouTube's "Sign in to confirm you're not a bot" screen inside embeds. This is an environment limitation, not an app bug — embeds render correctly on a normal user's browser.
