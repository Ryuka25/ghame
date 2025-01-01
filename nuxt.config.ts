// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
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
          "data-cf-beacon": '{"token": "f5f4d13235bf4d7ebd973c6a4f58aa0a"}',
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
  turnstile: {
    // TODO: Change this to your turnstile site key
    // Check for local test: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
    // siteKey: "3x00000000000000000000FF", // Local test only
    siteKey: "0x4AAAAAAAy89W2disDsWMfC", // Production only
  },
});
