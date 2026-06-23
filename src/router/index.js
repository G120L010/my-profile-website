// 個人作品集網站的路由核心組態設定檔

import { createRouter, createWebHashHistory } from 'vue-router'

/* 建立並定義全站作品集的分頁路由對照表 */
const router = createRouter({
  // 設定路由的歷史紀錄模式，使用 Hash 模式以適應 GitHub Pages 部署
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  // 開始宣告每個網址對應到的 Vue 畫面元件
  routes: [
    {
      // 當網址列為 about 時，代表關於我與特色經歷頁面
      path: '/about',
      name: 'profile-about',
      // 指定載入關於我的視圖元件
      component: () => import('@/views/profile/AboutView.vue')
    },
    {
      // 當網址列為最根本的斜線時，代表個人大首頁
      path: '/',
      name: 'profile-home',
      // 指定載入大首頁的視圖元件
      component: () => import('@/views/profile/HomeView.vue')
    },
    {
      // 當網址列為 portfolio 時，代表精選作品集頁面
      path: '/portfolio',
      name: 'profile-portfolio',
      // 指定載入作品集的視圖元件
      component: () => import('@/views/profile/PortfolioView.vue')
    },
    {
      // 當網址列為 skill 時，代表專業技能頁面
      path: '/skill',
      name: 'profile-skill',
      // 指定載入專業技能的視圖元件
      component: () => import('@/views/profile/SkillView.vue')
    },
    {
      // 當網址列為 certification 時，代表認證證照頁面
      path: '/certification',
      name: 'profile-certification',
      // 指定載入認證證照的視圖元件
      component: () => import('@/views/profile/CertificationView.vue')
    }
  ]
})

// 將設定好的路由實例導出，讓 main.js 進入點可以順利掛載
export default router