import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    ui: {
      colors: {
        primary: "azure",
      },
    },
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || "AssetFusionX",
      appCopyrightYear: parseInt(process.env.APP_NAME ?? "2014"),
      defaultErrorMsg: process.env.DEFAULT_ERROR_MSG,
      emailAddress: process.env.EMAIL_USER ?? "support@assetfusionx.com",
      minPasswordLength: parseInt(process.env.MIN_PASSWORD_LENGTH ?? "8"),
      maxAccounts: parseInt(process.env.MAX_ACCOUNTS ?? "20"),
      minDepositAmount: parseFloat(process.env.MIN_DEPOSIT_AMOUNT ?? "10"),
      maxDepositAmount: parseFloat(process.env.MAX_DEPOSIT_AMOUNT ?? "100000"),
      getRequestLimit: parseInt(process.env.GET_REQUEST_LIMIT ?? "20"),
    },
  },
  devServer: {
    port: 8080,
  },
  pages: true,
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-charts",
    "nuxt-marquee",
  ],
  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },
  ui: {
    prefix: "Nuxt",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
