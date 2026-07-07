export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  runtimeConfig: {
    // Set these as environment variables (locally in .env, and in Vercel
    // Project Settings → Environment Variables). Nuxt maps NUXT_-prefixed vars
    // automatically; the server route also accepts the unprefixed names.
    gmailUser: "delf.boston@gmail.com",
    gmailAppPassword: "",
    contactTo: "delf.boston@gmail.com",
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "@vercel/analytics",
  ],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "mask-icon", href: "/favicon.svg", color: "#14b8a6" },
      ],
      htmlAttrs: {
        lang: "en",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  image: {
    presets: {
      cover: {
        modifiers: {
          fit: "cover",
          format: "jpg",
          width: 300,
          height: 300,
        },
      },
    },
  },
  routeRules: {
    "/google271a59d4b9c24142.html": {
      prerender: true,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  },
});
