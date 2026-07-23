// 全站網頁程式碼的唯一核心總進入點檔案

// 使用 import 語法引入 Vue 核心框架軟體包中的應用程式建立實例函式
import { createApp } from 'vue'

// 使用 import 語法引入剛剛在 App.vue 刻好的全站大外殼結構元件
import App from './App.vue'

// 使用 import 語法引入在 src/router/index.js 配置好的個人作品集全站路由對照表
import router from './router'

// 使用 import 語法引入在 src/i18n/index.js 配置好的 Vue I18n 語系物件
import i18n from './i18n'

// ==========================================
// 靈魂引用：在此處正式引進剛剛下載的 Bootstrap 5 官方核心樣式零件包
// ==========================================
import 'bootstrap/dist/css/bootstrap.min.css'

// 呼叫建立實例函式並傳入大外殼組件，藉此生成一個完整的 Vue 網頁應用程式物件
const app = createApp(App)

// 呼叫應用程式物件的 use 方法，正式將前端路由與多語系功能掛載注入到全站環境中
app.use(router)
app.use(i18n)

// 呼叫應用程式物件的 mount 方法，指定將整個 Vue 渲染出來的網頁畫面，強行掛載塞入到 index.html 裡識別碼為 app 的標籤盒子中
app.mount('#app')