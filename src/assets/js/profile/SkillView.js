// 專業技能頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將技能資料徹底模組化抽離，方便管理與維護

import { ref } from 'vue'

/**
 * 建立並導出專業技能頁面專用的核心邏輯控制函式
 * 供 SkillView.vue 引入解構使用
 */
export function useSkillView() {

  // 建立技術分類數據陣列，包含前端、後端與部署工具
  const skillCategories = ref([
    {
      id: 1,
      title: 'Front-End',
      accentClass: 'accent-frontend', // 前端藍色彩線
      items: [
        {
          name: 'Vue 3 / JavaScript',
          desc: '熟練組合式架構（Composition API）開發、全域狀態管理與前端非同步網路請求。'
        },
        {
          name: 'Bootstrap 5',
          desc: '善用 Bootstrap 響應式網格系統（Grid System）進行多裝置移動端自適應切版佈局。'
        },
        {
          name: 'HTML5 / CSS3',
          desc: '掌握網頁架構語意化、CSS 樣式設計、Flex 彈性佈局以及自訂網頁懸浮微動畫特效。'
        }
      ]
    },
    {
      id: 2,
      title: 'Back-End',
      accentClass: 'accent-backend', // 後端橘色彩線
      items: [
        {
          name: 'Java / Spring Boot',
          desc: '精通後端分層架構設計，專責編寫 API 介面控制層與穩健的商業邏輯層。'
        },
        {
          name: 'Spring Data JPA',
          desc: '進行資料庫實體關係映射、自訂查詢、自動化事務控制與核心防呆機制管理。'
        },
        {
          name: 'SQL Server',
          desc: '具備資料表實體關係圖（ERD）規劃設計、高效資料存取與資料庫結構管理能力。'
        }
      ]
    },
    {
      id: 3,
      title: 'Tools & Security',
      accentClass: 'accent-tools', // 工具安全青綠彩線
      items: [
        {
          name: 'LINE Pay & Gemini API',
          desc: '實作串接第三方商務金流交易防呆處理，以及 Google Gemini 人工智慧對話模型串接。'
        },
        {
          name: 'Docker / Jenkins',
          desc: '具備 Docker 容器化全端部署能力，並能整合 Jenkins 自動化編譯打包流水線。'
        },
        {
          name: 'Spring Security',
          desc: '理解 JWT 安全權限令牌過濾機制、Filter Chain 驗證放行與安全性端點防護。'
        }
      ]
    }
  ])

  // 將封裝完成的技術分類數據資料包裝成物件並導出，讓 Vue 視圖元件可以順利解構讀取
  return {
    skillCategories
  }
}