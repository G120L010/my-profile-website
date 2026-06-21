// 專業技能頁面的抽離式組合式業務邏輯控制檔案

// 從 Vue 核心框架軟體包中引入建立響應式數據所需要的 ref 函式
import { ref } from 'vue'

/* 建立並導出專業技能頁面專用的核心邏輯控制函式 */
export function useSkillView() {
  
  // 建立一組結構化的技術分類響應式陣列資料，完全對齊 2魚 網站的資料排版階層
  const skillCategories = ref([
    {
      // 分類唯一識別碼 (確保每個項目都有不同的數字，以便 Vue 進行高效畫面追蹤與渲染)
      id: 1,
      // 在卡片頂部顯示的英文大分類名稱
      title: 'Front-End',
      // 用於在 CSS 樣式表中對應前端藍色渐變發光線條的類名
      accentClass: 'accent-frontend',
      // 該分類底下的具體技術項目條目陣列
      items: [
        {
          name: 'Vue 3 / Vite',
          desc: '掌握組合式架構（Composition API）、前端路由導航與響應式網頁切版技術。'
        },
        {
          name: 'Bootstrap 5',
          desc: '熟練運用現代化網格系統（Grid System）進行多裝置移動端自適應版面佈局。'
        },
        {
          name: 'JavaScript / CSS 3',
          desc: '具備純前端非同步請求處理能力，並熟練編寫客製化網頁懸浮微動畫特效。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (確保每個項目都有不同的數字)
      id: 2,
      // 在卡片頂部顯示的英文大分類名稱
      title: 'Back-End',
      // 用於在 CSS 樣式表中對應後端橘色渐變發光線條的類名
      accentClass: 'accent-backend',
      // 該分類底下的具體技術項目條目陣列
      items: [
        {
          name: 'Java / Spring Boot',
          desc: '精通後端分層架構設計，專責編寫介面控制層與高度穩健的企業級業務邏輯。'
        },
        {
          name: 'Spring Data JPA',
          desc: '熟練進行資料庫實體關係映射、自動化事務控制管理以及核心業務防呆機制。'
        },
        {
          name: 'SQL Server',
          desc: '具備資料表實體關係圖（ERD）規劃設計、高效資料存取與結構化管理能力。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (確保每個項目都有不同的數字)
      id: 3,
      // 在卡片頂部顯示的英文大分類名稱
      title: 'Tools & Security',
      // 用於在 CSS 樣式表中對應工具與安全青綠色漸變線條的類名
      accentClass: 'accent-tools',
      // 該分類底下的具體技術項目條目陣列
      items: [
        {
          name: 'Git / GitHub',
          desc: '熟練使用程式碼版本控制管理工具，嚴格遵循團隊多分支協作與整合開發流程。'
        },
        {
          name: 'Spring Security',
          desc: '具備後端安全性路由防線配置、加密金鑰解析驗證以及敏感端點權限控管技術。'
        },
        {
          name: 'API Integration',
          desc: '熟練處理第三方商務金流接口（如 LINE Pay）與智能客服模型（如 Gemini）之跨系統串接。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (預留欄位，方便初學者擴充新的技術分類)
      id: 4,
      // 在卡片頂部顯示的英文大分類名稱 (預留)
      title: 'Tools & Security (預留欄位)',
      // 用於在 CSS 樣式表中對應青綠色漸變線條的類名
      accentClass: 'accent-tools',
      // 該分類底下的具體技術項目條目陣列 (預留)
      items: [
        {
          name: 'Git / GitHub',
          desc: '熟練使用程式碼版本控制管理工具，嚴格遵循團隊多分支協作與整合開發流程。'
        },
        {
          name: 'Spring Security',
          desc: '具備後端安全性路由防線配置、加密金鑰解析驗證以及敏感端點權限控管技術。'
        },
        {
          name: 'API Integration',
          desc: '熟練處理第三方商務金流接口（如 LINE Pay）與智能客服模型（如 Gemini）之跨系統串接。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (預留欄位，方便初學者擴充新的技術分類)
      id: 5,
      // 在卡片頂部顯示的英文大分類名稱 (預留)
      title: 'Tools & Security (預留欄位)',
      // 用於在 CSS 樣式表中對應青綠色漸變線條的類名
      accentClass: 'accent-tools',
      // 該分類底下的具體技術項目條目陣列 (預留)
      items: [
        {
          name: 'Git / GitHub',
          desc: '熟練使用程式碼版本控制管理工具，嚴格遵循團隊多分支協作與整合開發流程。'
        },
        {
          name: 'Spring Security',
          desc: '具備後端安全性路由防線配置、加密金鑰解析驗證以及敏感端點權限控管技術。'
        },
        {
          name: 'API Integration',
          desc: '熟練處理第三方商務金流接口（如 LINE Pay）與智能客服模型（如 Gemini）之跨系統串接。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (預留欄位，方便初學者擴充新的技術分類)
      id: 6,
      // 在卡片頂部顯示的英文大分類名稱 (預留)
      title: 'Tools & Security (預留欄位)',
      // 用於在 CSS 樣式表中對應青綠色漸變線條的類名
      accentClass: 'accent-tools',
      // 該分類底下的具體技術項目條目陣列 (預留)
      items: [
        {
          name: 'Git / GitHub',
          desc: '熟練使用程式碼版本控制管理工具，嚴格遵循團隊多分支協作與整合開發流程。'
        },
        {
          name: 'Spring Security',
          desc: '具備後端安全性路由防線配置、加密金鑰解析驗證以及敏感端點權限控管技術。'
        },
        {
          name: 'API Integration',
          desc: '熟練處理第三方商務金流接口（如 LINE Pay）與智能客服模型（如 Gemini）之跨系統串接。'
        }
      ]
    },
    {
      // 分類唯一識別碼 (預留欄位，方便初學者擴充新的技術分類)
      id: 7,
      // 在卡片頂部顯示的英文大分類名稱 (預留)
      title: 'Tools & Security (預留欄位)',
      // 用於在 CSS 樣式表中對應青綠色漸變線條的類名
      accentClass: 'accent-tools',
      // 該分類底下的具體技術項目條目陣列 (預留)
      items: [
        {
          name: 'Git / GitHub',
          desc: '熟練使用程式碼版本控制管理工具，嚴格遵循團隊多分支協作與整合開發流程。'
        },
        {
          name: 'Spring Security',
          desc: '具備後端安全性路由防線配置、加密金鑰解析驗證以及敏感端點權限控管技術。'
        },
        {
          name: 'API Integration',
          desc: '熟練處理第三方商務金流接口（如 LINE Pay）與智能客服模型（如 Gemini）之跨系統串接。'
        }
      ]
    }
  ])

  // 將封裝完成的技術分類數據資料包裝成物件並導出，讓 Vue 視圖元件可以順利解構讀取
  return {
    skillCategories
  }
}