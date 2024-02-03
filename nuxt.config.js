import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Exato Consultoria',
    htmlAttrs: {
      lang: 'pt',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins:100,300,400,500,700,900',
      },
    ],
  },
  ssr: false,

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },

  store: {
    state: 'localStorage',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue2-editor', ssr: false },
    '@/plugins/vue-the-mask',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',

    [
      'vue-toastification/nuxt',
      {
        timeout: 3000,
        draggable: false,
        closeOnClick: true,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL_PROD
        : process.env.API_URL_DEV,
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // Usar o localStorage como padrão de armazenamento do token
        },

        user: {
          property: 'user',
          autoFetch: true,
        },

        endpoints: {
          login: { url: '/auth/portal', method: 'post' },
          logout: false,
          user: { url: '/auth/user', method: 'get' },
        },
      },
    },

    redirect: {
      login: '/login',
      logout: '/',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          secondary: '#a01b21',
          accent: '#8c9eff',
          error: '#b71c1c',
          primary: '#2271a1',
          open: '#00796B',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],

    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
}
