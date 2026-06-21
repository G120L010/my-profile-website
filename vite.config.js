// Vite 專案的核心配置文件，負責管理開發伺服器、打包編譯插件以及路徑別名等設定

// 引入 Node.js 內建的路徑轉換工具函式，用來將網址形式的路徑轉換為實際的檔案系統路徑
import { fileURLToPath, URL } from 'node:url'

// 引入 Vite 的配置定義函式，使用 defineConfig 可以提供編輯器代碼自動補全的提示功能
import { defineConfig } from 'vite'
// 引入 Vue 3 的官方 Vite 構建插件，讓 Vite 能夠識別並編譯副檔名為 .vue 的單檔案組件
import vue from '@vitejs/plugin-vue'
// 引入 Vue DevTools 開發工具插件，在瀏覽器開發模式下提供強大的除錯功能面板
import vueDevTools from 'vite-plugin-vue-devtools'

// 導出 Vite 的配置設定物件
// https://vite.dev/config/
export default defineConfig({
  // 設定專案打包構建後的基礎根路徑，設定為 './' 相對路徑
  // 這樣做可以確保網頁在發佈部署到 GitHub Pages 的子目錄路徑（例如 https://user.github.io/repo/）時，
  // 所有的 JS 與 CSS 等靜態資源檔案都能被網頁正確尋找並順利讀取載入，防範出現白畫面。
  base: './',
  
  // 註冊本專案啟動時要載入的插件清單
  plugins: [
    vue(), // 啟用 Vue 核心編譯插件
    vueDevTools(), // 啟用 Vue 開發偵錯面板插件
  ],
  
  // 解析設定模組路徑的規則
  resolve: {
    // 定義路徑別名（Alias），方便在程式碼中進行模組匯入
    alias: {
      // 將字元 '@' 設定指向專案底下的 './src' 資料夾的絕對路徑
      // 這樣一來，不論在多深的子目錄檔案中，都可以直接使用 '@/assets/css/App.css' 這種簡潔路徑，
      // 不需要寫出類似 '../../assets/css/App.css' 這種容易出錯的相對路徑。
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
