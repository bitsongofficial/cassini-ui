require("dotenv").config();
import colors from "vuetify/es5/util/colors";

export default {
  env: {
    BTSG_CONTRACT:
      process.env.BTSG_CONTRACT || "0x05079687D35b93538cbd59fe5596380cae9054A9",
    BRIDGE_CONTRACT: process.env.BRIDGE_CONTRACT || "",
    BRIDGE_FEE: process.env.BRIDGE_FEE || "0.03",
    INFURA: process.env.INFURA || null,
    NETWORK: process.env.NETWORK || "0x3"
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - cassini-ui",
    title: "cassini-ui",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        size: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        size: "96x96",
        href: "/favicon/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        size: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "apple-touch-icon",
        size: "57x57",
        href: "/favicon/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        size: "60x60",
        href: "/favicon/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        size: "72x72",
        href: "/favicon/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        size: "76x76",
        href: "/favicon/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        size: "114x114",
        href: "/favicon/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        size: "120x120",
        href: "/favicon/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        size: "144x144",
        href: "/favicon/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        size: "152x152",
        href: "/favicon/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        size: "180x180",
        href: "/favicon/apple-icon-180x180.png"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "nuxt-validate"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: "#fc015b",
          secondary: "#4f4e7d",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
