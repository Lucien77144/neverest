export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/style/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/_colors.scss" as *;',
        },
      },
    },
  },
})
