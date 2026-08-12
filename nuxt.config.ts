export default defineNuxtConfig({
  compatibilityDate: '2026-08-12',
  devtools: { enabled: true },

  ssr: false,
  nitro: { preset: 'static' },

  modules: ['@nuxt/eslint', 'vuetify-nuxt-module'],

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/global.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      title: 'Haushaltsbuch',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Haushaltsbuch (Nuxt 4 + Vuetify).' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },

  components: [{ path: '~/components', pathPrefix: false }],
});
