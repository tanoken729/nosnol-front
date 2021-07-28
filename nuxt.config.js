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
    // baseURL: 'http://localhost:8000',
    // baseURL: 'http://localhost:8000/api/v1',
    baseURL: ENV.API_BASE_URL,
    browserBaseURL: 'http://localhost:8000/',
  },
  proxy: {
    // '/api': 'http://sound-matching_api_app_1:8000/api/test',
    // '/api': {
    //   target: 'http://localhost:8000',
    //   pathRewrite: {
    //     '^/api': '/'
    //   }
    // }
    // '/api1/': 'http://localhost:8000',
    // '/api2/': {
    //   target: 'http://localhost:8000',
    //   pathRewrite: {'^/api/': ''}
    // },
    '/proxy/': {
      target: 'http://localhost:8000',
      pathRewrite: {'^/api/': '/'}
    },
    // '/api3/': {
    //   target: 'http://localhost:8000',
    //   pathRewrite: {'^/api/': ''}
    // },
    "secure": false
  },

  // 予めauthモジュールで使用するログイン用のルートを指定したり、使用する通信パターンを定義
  // サーバ側へのアクセス設定をエンドポイントとして追加
  auth:{
    redirect: {
      login: '/Signin',
      logout: '/Signin',
      callback: '/Signin',
      home: '/TopAfterLogin'
    },
    localStorage: false, // JWTトークンをローカルストレージに入れておくのは危ない
    // 通信パターンやルートの定義
    strategies:{
      local:{
        token:{ //追加
          // type: 'Bearer', //記述しなきゃ自動的にauthorizationヘッダーにbeareという文字を追加
          property: 'access_token',
        },
        user: { //追加
          property: false
        },
        endpoints:{
          login:{
            url:'/auth/login',
            method:'post',
            propertyName:'access_token'
          },
          logout:{
            url:'/auth/logout',
            method:'post',
          },
          user:{
            url:'/auth/me',
            method:'get',
            propertyName:false
          }
        }
      },
    },
  },

  // router: {
  //   middleware: ['user_auth']
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
  }
}
