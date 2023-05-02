import runtimeConfig from './config';

export default defineNuxtConfig({
  runtimeConfig,
  modules: ['@nuxtjs/eslint-module'],
  ssr: false,
  css: [
    'primevue/resources/themes/soho-dark/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'file-icons-js/css/style.css',
    'plyr/dist/plyr.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  serverHandlers: [{ route: '/streaming', handler: '~/server/streaming/index.js', middleware: true }],
});
