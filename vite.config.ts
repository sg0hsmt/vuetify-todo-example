// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vuetify-todo-example/" : "/",
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      {
        find: "@/",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
  // https://github.com/vitejs/vite/issues/6333#issuecomment-1003318603
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  plugins: [
    // https://github.com/underfin/vite-plugin-vue2
    createVuePlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [VuetifyResolver()],
      dts: false,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["tests/setup.ts"],
    silent: true,
    deps: {
      inline: ["vuetify"],
    },
  },
});
