export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/style/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/_variables.scss" as *;',
        },
      },
    },
  },
  modules: [
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.ts',
          },
          {
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR.ts',
          },
        ],
        detectBrowserLanguage: true, // use default language of browser
        langDir: 'lang/', // source of translations
        strategy: 'no_prefix', // don't add language to url
      },
    ],
  ],
  components: [
    {
      path: '~/components/Interface/Components',
      pathPrefix: false,
      prefix: 'I',
    },
    '~/components',
  ],
})
