// 專業技能頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將技能資料徹底模組化抽離，方便管理與維護

import { ref } from 'vue'

/**
 * 建立並導出專業技能頁面專用的核心邏輯控制函式
 * 供 SkillView.vue 引入解構使用
 */
export function useSkillView() {

  // 建立技術分類數據陣列，包含前端、後端、資料庫、API與安全、AI數據分析及設計多媒體等技能
  const skillCategories = ref([
    {
      id: 1,
      title: '前端開發〔Frontend〕',
      accentClass: 'accent-frontend', // 前端藍色彩線
      items: [
        {
          name: 'Vue 3 / JavaScript',
          desc: '使用組合式架構（Composition API）開發、Pinia全域狀態管理與前端非同步網路請求。'
        },
        {
          name: 'HTML5 / CSS3',
          desc: '掌握網頁架構語意化、CSS 樣式設計、Flex 彈性佈局以及自訂網頁懸浮微動畫特效。'
        },
        {
          name: 'Bootstrap 5',
          desc: '使用Bootstrap 響應式網格系統（Grid System）進行多裝置移動端自適應切版佈局。'
        }
      ]
    },
    {
      id: 2,
      title: '後端開發〔Backend〕',
      accentClass: 'accent-backend', // 後端橘色彩線
      items: [
        {
          name: 'Java / Spring Boot',
          desc: '實作後端分層架構設計，專責編寫 API 介面控制層與穩健的商業邏輯層。'
        },
        {
          name: 'Spring Data JPA',
          desc: '進行資料庫實體關係映射、自訂查詢、自動化事務控制與核心防呆機制管理。'
        }
      ]
    },
    {
      id: 3,
      title: '資料庫〔Database〕',
      accentClass: 'accent-tools', // 工具青綠色彩線
      items: [
        {
          name: 'SQL Server',
          desc: '具備資料庫正規化、資料存取與結構管理能力，並撰寫預存程序與腳本。'
        },
        {
          name: 'dbdiagram.io',
          desc: '使用線上工具進行資料庫實體關係圖（ERD）的視覺化規劃與設計。'
        }
      ]
    },
    {
      id: 4,
      title: '串接、安全〔API＆JWT〕',
      accentClass: 'accent-experience', // 經歷橘紅漸變彩線
      items: [
        {
          name: 'Third-Party API Integration',
          desc: '具備串接第三方金流（LINE Pay）與 AI 模型（Google Gemini）的實務經驗與防呆處理能力。'
        },
        {
          name: 'Spring Security',
          desc: '理解 JWT 安全權限令牌過濾機制、（Filter Chain）驗證放行與安全性端點防護。'
        }
      ]
    },
    {
      id: 5,
      title: '人工智慧與軟體操作〔AI＆Software Operation〕',
      accentClass: 'accent-design', // 設計紫粉色彩線
      items: [
        {
          name: 'AI Application Planning',
          desc: '具備iPAS AI應用規劃師資格，使用並導入 AI 進行專案與規劃。'
        },
        {
          name: 'SPSS Data Analysis',
          desc: '理解統計分析、資料清洗、SPSS軟體操作與統計圖表解析。'
        },
        {
          name: 'AI-Assisted Development',
          desc: '善用 IDE 開發環境整合之 AI Agent（如 Gemini Code Assist）輔助編寫、重構與除錯，提升開發效率。'
        }
      ]
    },
    {
      id: 6,
      title: '設計與多媒體〔Design＆Multimedia〕',
      accentClass: 'accent-frontend', // 重複使用前端藍色彩線
      items: [
        {
          name: 'Adobe Illustrator / Photoshop',
          desc: '具備 SSE 國際認證，熟練向量圖像繪製、LINE 貼圖創作、數位圖像設計與相片編修後製。'
        },
        {
          name: 'Video Production',
          desc: '具備廣告文案、腳本企劃、動態字幕、剪輯後製與影音行銷素材產製能力（如 SUNSTAR 短影音廣告）。'
        }
      ]
    },
    {
      id: 7,
      title: '版本控制與工具〔Version Control＆Tools〕',
      accentClass: 'accent-backend', // 重複使用後端橘色彩線
      items: [
        {
          name: 'Git / GitHub',
          desc: '使用 Git 版本控制指令，使用 GitHub 進行程式碼託管、分支管理與團隊協作（理解 GitHub Actions CI/CD）。'
        },
        {
          name: 'Postman API Testing',
          desc: '使用 Postman 進行後端 API 功能測試、驗證與除錯，確保介面穩定性。'
        }
      ]
    }
  ])

  // 將封裝完成的技術分類數據資料包裝成物件並導出，讓 Vue 視圖元件可以順利解構讀取
  return {
    skillCategories
  }
}