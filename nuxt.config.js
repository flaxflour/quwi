// Common options
export const options = {
  name:             'Quwi',
  shortDescription: process.env.npm_package_name || '',
  description:      'Quwi - project management and time tracking. Best and easy to use project management platform with time tracking, realtime chat and file sharing features you will love.',
  app:              {
    background: '#786cd0',
  },
  social: {
    youtube:   'https://www.youtube.com/channel/UCwCnlFSlEM3ozCdy7zCI9Yg',
  },
}

export default {
  /**
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
  head:   {
    title: process.env.npm_package_name || '',
    meta:  [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      {
        hid:     'description',
        name:    'description',
        content: process.env.npm_package_description || '',
      },
      {
        hid:     'name',
        name:    'name',
        content: `${options.name} • ${options.shortDescription}`,
      },
      {
        hid:  'og:image',
        name: 'og:image',
        // content: "path/to/image.png",
      },
      {
        name:    'X-UA-Compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        name:    'keywords',
        content: '',
      },
      // Add to homescreen for Chrome on Android. Fallback for PWA (handled by nuxt)
      {
        name:    'application-name',
        content: options.name,
      },
      // Windows phone tile icon
      {
        name:    'msapplication-TileImage',
        content: '/icon.png',
      },
      {
        name:    'msapplication-TileColor',
        content: options.app.background,
      },
      {
        name:    'msapplication-tap-highlight',
        content: 'no',
      },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },
  /**
     ** Customize the progress-bar color
     */
  loading:    { color: '#786cd0' },
  /**
     ** Global CSS
     */
  css:        ['@/assets/scss/main.scss'],
  /**
     * Components
     */
  components: true,
  /**
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
  plugins:    [
    '~/plugins/vuelidate',
  ],

  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  /**
     ** Nuxt.js modules
     */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    /** https://github.com/nuxt-community/svg-sprite-module */
    '@nuxtjs/svg-sprite',
    '@nuxtjs/toast',
    /** https://github.com/nuxt-community/device-module */
    '@nuxtjs/device',
    'v-wave/nuxt',
  ],

  // PWA module configuration (https://pwa.nuxtjs.org/setup)
  pwa: {
    meta: {
      name:             `${options.name} - ${options.shortDescription}`,
      description:      options.description,
      // ogHost:         process.env.BASE_URL,
      // ogImage:        `${process.env.BASE_URL}/f7.jpg`,
      facebookSite:     options.social.facebook,
      facebookCreator:  options.social.facebook,
      instagramSite:    options.social.instagram,
      instagramCreator: options.social.instagram,
      youtubeSite:      options.social.youtube,
      youtubeCreator:   options.social.youtube,
      theme_color:      options.app.background,
    },
    manifest: {
      name:             options.name,
      short_name:       options.name,
      description:      options.shortDescription,
      start_url:        '/',
      background_color: options.app.background,
    },
  },

  /**
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
  axios: {
    proxy:        false,
    baseURL:      process.env.API_URL || 'https://api.quwi.com/v2/',
    progress:     true,
    retry:        true,
    proxyHeaders: false,
    credentials:  false,
    debug:        true,
  },

  server: {
    port: 3000,
  },

  auth: {
    strategies: {
      local: {
        token: {
          maxAge: 60 * 60 * 24 * 366,
        },
        endpoints: {
          user: {
            url:    'auth/init',
            method: 'get',
          },
          logout: {
            url:    'auth/logout',
            method: 'post',
          },
        },
      },
    },
    redirect: {
      login:    '/',
      logout:   '/',
      callback: '/home',
      home:     '/home',
    },
    watchLoggedIn: true,
  },

  svgSprite: {
    svgoConfig: {
      plugins: [
        { removeNonInheritableGroupAttrs: true },
        { collapseGroups: true },
        { convertShapeToPath: true },
        { mergePaths: true },
      ],
    },
  },

  render: {
    http2: {
      push:       true,
      pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles.map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
    families: {
      Roboto: true,
    }
  },

  toast: {
    duration: 3000,
  },

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso:  'en-US',
        file: 'en.json',
      },
      {
        name: 'Russian',
        code: 'ru',
        iso:  'ru-RU',
        file: 'ru.json',
      },
    ],
    langDir:               '~/locales/',
    defaultLocale:         'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    lazy:           true,
    fallbackLocale: 'en',
    vueI18n:        '~/config/vue-i18n-ru.js',
    vueI18nLoader:  true,
  },

  router: {
    middleware: ['auth']
  }
}
