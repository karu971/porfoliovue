module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'protfolio-vue',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        href: "https://fonts.googleapis.com/css?family=Sawarabi+Mincho",
        rel: "stylesheet"
      }
    ],
    script: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
    }],
  },
  css: [
    '@/assets/scss/app.scss' // use our build, as entered via app.scss
  ],
  env: {
    API_LOCAL: process.env.NODE_ENV === "development" ? 'http://localhost:3000/api/v1' : '',
    API_SERVER: process.env.NODE_ENV === "development" ? 'http://localhost:8081/api/v1' : ''
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    //   css: false
    // }] // don't include a default build, use ours
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  plugins: [{
    src: '@/plugins/axios.js',
    ssr: false
  }],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: '404',
  //       path: '*',
  //       component: resolve(__dirname, 'pages/404.vue')
  //     })
  //   }
  // }
}
