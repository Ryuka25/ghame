// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    githubToken: "GITHUB_TOKEN",
    proxyUrl: "http://localhost:8000",
    turnstile: {
      // TODO: Change this to your turnstile secret key
      // Check for local test: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
      secretKey: "1x0000000000000000000000000000000AA", // Local test only
    },
    public: {
      turnstile: {
        // TODO: Change this to your turnstile site key
        // Check for local test: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
        siteKey: "1x00000000000000000000AA", // Local test only
      },
    },
  },
  nitro: {
    vercel: {
      functions: {
        maxDuration: 60,
        memory: 1024,
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxtjs/turnstile",
    "@nuxt/fonts",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          // TODO: Change this to your umami site key
          defer: true,
          src: "https://cloud.umami.is/script.js",
          "data-website-id": "UMAMI_SITE_KEY",
        },
        {
          // TODO: Change this to your cloudflare site key
          defer: true,
          src: "https://static.cloudflareinsights.com/beacon.min.js",
          "data-cf-beacon": '{"token": "a3532d4d9da844c4a7e013e4984d1908"}',
        },
      ],
      meta: [
        {
          // TODO: Change this to your google site verification
          name: "google-site-verification",
          content: "GOOGLE_SITE_VERIFICATION",
        },
      ],
    },
  },
  colorMode: {
    classSuffix: "",
  },
});
