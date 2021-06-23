process.env.DEBUG = 'nuxt:*'
const ENV = require('dotenv').config().parsed;
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sound-matching',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    'plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],

  env:ENV,
  // axiosを利用してサーバにリクエストを送る
  axios: {
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://localhost:8000',
    // baseURL: 'http://localhost:8000/api/v1',
  },
  proxy: {
    // '/api': 'http://sound-matching_api_app_1:8000/api/test',
    // '/api': {
    //   target: 'http://localhost:8000',
    //   pathRewrite: {
    //     '^/api': '/'
    //   }
    // }
  },

  // サーバ側へのアクセス設定をエンドポイントとして追加
  auth:{
    redirect: {
      login: '/Signin',
      logout: '/',
      callback: '/login',
      home: '/TopAfterLogin'
    },
    localStorage: false,
    strategies:{
      local:{
        tokenType:'bearer',
        endpoints:{
          login:{
            url:'/auth/login',
            method:'post',
            propertyName:'token'
          },
          // logout:{
          //   url:'/auth/logout',
          //   method:'post',
          // },
          user:{
            url:'/auth/me',
            method:'get',
            propertyName:false
          }
        }
      },
      // redirect: {
      //   login: '/Signin',
      //   logout: '/',
      //   callback: '/login',
      //   home: '/TopAfterLogin'
      // }
    },
  },

  // router: {
  //   middleware: ['user_auth']
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
