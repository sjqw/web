import { fileURLToPath, URL } from "node:url";
import path from "path";
import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import ElementPlus from "unplugin-element-plus/vite";
// https://vitejs.dev/config/
const pathSrc = path.resolve(__dirname, "src/interface");
export default defineConfig({
  server: {
    port: 3000,
    open: false,
  },
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/element.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ["vue", "vue-router"],
      dts: "src/interface/auto-import.d.ts",
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: "./.eslintrc-auto-import.json", // 生成json文件
        globalsPropValue: true,
      },
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
    Icons({
      autoInstall: true,
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        [
          "custom-flex-c",
          {
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
          },
        ],
        ["custom-flex-r", { display: "flex", "align-items": "center" }],
        ["border", { border: "1px solid #05f2f2" }],
        ["hand", { cursor: "pointer" }],
      ],
      shortcuts: {
        cick: ["custom-flex"],
      },
    }),
    ElementPlus({ useSource: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
});
