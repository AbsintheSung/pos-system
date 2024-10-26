import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 加載環境變數
dotenv.config();

// 使用環境變數
const baseURL = process.env.VITE_APP_API_URL;
const apiName = process.env.VITE_APP_API_NAME;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_colorVariables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@customer': fileURLToPath(new URL('./src/views/customer', import.meta.url)),
    }
  },
  server: {
    proxy: {
      [`/${apiName}`]: {
        target: baseURL,
        changeOrigin: true,
        secure: false,
        // 如果有字串需要替換可以加入 rewrite 這個屬性
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/Images': {
      //   target: baseURL,
      //   changeOrigin: true,
      // }
    },
  },
})
