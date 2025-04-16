// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
   compatibilityDate: '2024-11-01',
   devtools: { enabled: true },
   modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@primevue/nuxt-module'],
   css:['primeflex/primeflex.css'],
   primevue: {
      options: {
         theme: {
            preset: Aura
         }
      }
   }
})