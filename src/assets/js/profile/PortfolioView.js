// 精選作品集頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將作品資料徹底模組化抽離

import { ref } from 'vue'

/**
 * 建立並導出作品集分頁專用的核心邏輯控制函式
 * 供 PortfolioView.vue 引入解構使用
 */
export function usePortfolioView() {
  
  // 作品集響應式陣列：使用 ref 管理作品清單，內容若改變，網頁畫面會自動更新 (依日期由新到舊降冪排序)
  const projects = ref([
    {
      id: 1, // 作品唯一識別碼
      title: '暖光之丘 - 流浪動物平台 (程式碼創作)', // 專案名稱
      summary: '於資展就業養成班培訓期間實作之全端專案。擔任資料庫組長主導 ERD 實體關係圖設計與彙整，負責購物商城與 AI 智能客服功能開發，串接 LINE Pay 與 Google Gemini API。', // 專案簡介，量化並凸顯技術能力
      tags: ['Java 21', 'Spring Boot', 'Vue 3', 'SQL Server', '程式碼創作'], // 專案技術標籤陣列
      image: 'images/Portfolioimg/no-image.jpg', // 依照要求維持引用 no-image.jpg
      demoUrl: 'https://g120l010.github.io/CurriculumVitae2/', // 前往的連結位址
      codeUrl: 'https://github.com/' // 前往的 GitHub 專案庫網址
    },
    {
      id: 2,
      title: 'SUNSTAR 產品短影音廣告 (影片剪輯創作)',
      summary: '於日本實習期間主導製作。推廣間歇性斷食健康能量棒，完成高質感短影音廣告後製與影片剪輯，協助產品宣傳行銷。',
      tags: ['Adobe Premiere', '影片剪輯', '影音行銷', '海外實習', '影片剪輯創作'],
      image: 'images/Portfolioimg/no-image.jpg',
      demoUrl: 'https://jp.sunstar.com/health-food/andfasting/product_001.html',
      codeUrl: 'https://github.com/'
    },
    {
      id: 3,
      title: 'LINE 原創貼圖設計與創作 (LINE貼圖創作)',
      summary: '獨立規劃、設計並上架 LINE 原創貼圖。涵蓋角色視覺草圖設定、插圖線稿與著色設計、去背輸出，並通過 LINE 官方嚴格審核成功上架銷售，展現手繪插畫與數位圖像設計之實務能力。',
      tags: ['LINE 貼圖', '角色設計', '插畫設計', '視覺創作', 'LINE貼圖創作'],
      image: 'images/Portfolioimg/no-image.jpg',
      demoUrl: 'https://store.line.me/',
      codeUrl: 'https://github.com/'
    }
  ])

  // 將作品陣列 projects 導出，讓 PortfolioView.vue 可以載入讀取
  return {
    projects
  }
}