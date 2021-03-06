import * as FontAwesome from './build/fontawesome'

process.env.DEBUG = 'nuxt:*'
const ENV = require('dotenv').config()
// export default ENV;
export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'A platform for independent artists | Nosnol',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/android-chrome-36x36.png' }
    ]
  },
  browser: {
    fs: false
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    '~/plugins/axios',
    '~plugins/vue-aplayer.js',
    { src: '~/plugins/localStorage.js', ssr: false },
    {
      src: '~/plugins/vue-preloader',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
    '@nuxt/typescript-build'
  ],
  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
  ],

  // axiosを利用してサーバにリクエストを送る
  axios: {
    // proxyを使用する場合baseURLは併用できないためコメントアウト
      // baseURL: process.env.API_BASE_URL,
    // baseURL と proxy を同時に使用できないためprefixを設定し、baseURLとして使用する
    prefix: process.env.API_BASE_URL,
    proxy: true,
  },
  proxy: {
    '/proxy/': {
      target: process.env.API_BASE_URL,
      pathRewrite: {'^/api/': '/'}
    },
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
            url:'/api/v1/auth/login',
            method:'post',
            propertyName:'access_token'
          },
          logout:{
            url:'/api/v1/auth/logout',
            method:'post',
          },
          user:{
            url:'/api/v1/auth/me',
            method:'get',
            propertyName:'user'
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
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
console.log('hoge')
console.log(ENV.API_BASE_URL)