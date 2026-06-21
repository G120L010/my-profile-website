// 個人大首頁（經歷分頁）的抽離式組合式業務邏輯控制檔案
// 使用 Composition API 寫法，將資料層與視圖層完全分離，極方便日後擴充與維護

import { ref } from 'vue'

/**
 * 建立並導出經歷分頁專用的核心邏輯控制函式
 * 供 HomeView.vue 引入解構使用
 */
export function useHomeView() {
  
  // 【經歷響應式陣列】利用 ref() 包裹經歷清單，使其具備 Vue 雙向綁定的資料追蹤能力
  const experiences = ref([
    {
      id: 1, // 經歷唯一識別碼 (確保不可重複)
      company: '前端互動網頁設計工作室', // 公司或接案單位名稱
      role: '前端工程師 / Front-End Developer', // 擔任的技術職稱
      period: '2024.03 - 2025.06', // 在職起迄年月區間
      tags: ['Vue 3', 'Vite', 'Bootstrap 5', 'JavaScript'], // 所使用到的核心技術標籤，會自動在卡片底部生成膠囊徽章
      summary: '專責多端響應式企業官網與後台管理系統開發，優化網頁載入效能與跨瀏覽器相容性，並編寫客製化網頁懸浮微動畫。', // 具體的工作職責與貢獻說明
      accentClass: 'accent-frontend' // 套用在 App.css 最底部的卡片頂部漸變線條 CSS 類別名稱 (此為藍色漸變)
    },
    {
      id: 2, // 經歷唯一識別碼 (確保每個項目都有不同的數字，以便 Vue 進行高效畫面追蹤與渲染)
      company: '巨量核心資訊系統公司', // 第二筆工作經歷的公司或單位名稱
      role: 'Java 後端工程師 / Back-End Developer', // 第二筆工作經歷擔任的技術職稱
      period: '2025.07 - 2026.06', // 服務的起迄年月區間
      tags: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'SQL Server'], // 該經歷所使用到的核心後端技術標籤
      summary: '主導企業核心業務子系統模組重構，精準實作高併發交易安全防呆，並進行 SQL 查詢優化以顯著縮短系統 API 響應時間。', // 該經歷的具體工作績效與成就簡介
      accentClass: 'accent-backend' // 套用在 App.css 中的橘色漸變彩線 CSS 類別名稱，讓頂部細線呈現橘色發光
    },
    {
      id: 3, // 經歷唯一識別碼 (確保每個項目都有不同的數字)
      company: '科技新創開源協作團隊', // 第三筆經歷的協作團隊名稱
      role: '全端開發工程師 / Full-Stack Developer', // 第三筆經歷所擔任的技術職稱
      period: '2026.07 - 至今', // 服務的起迄年月區間 (至今代表目前仍在職中)
      tags: ['Vue 3', 'Spring Boot', 'Spring Security', 'Git / GitHub'], // 使用到的全端開發技術標籤
      summary: '負責多套前後端分離電商平台與 SaaS 服務架構規劃。部署並管理團隊自動化版本控制協作流程，串接金流與第三方 API。', // 該經歷的具體開發職責與貢獻說明
      accentClass: 'accent-experience' // 套用在 App.css 中的橘紅漸變彩線 CSS 類別名稱
    },
    {
      id: 4, // 經歷唯一識別碼 (預留欄位，方便初學者自行新增第五、第六筆經歷)
      company: '獨立開源專案與接案合作 (預留欄位)', // 預留卡片所顯示的公司名稱
      role: '全端開發工程師 / Full-Stack Developer', // 預留卡片所顯示的職稱
      period: '未來規劃中', // 預留卡片的執行期間
      tags: ['Java 21', 'Spring Boot', 'Vue 3', 'Database'], // 預定使用的技術標籤
      summary: '這是為您預留的經歷卡片區塊，日後您可以直接在此處補上新的工作經歷或接案專案內容。', // 預留卡片的說明文字
      accentClass: 'accent-design' // 套用在 App.css 中的炫彩紫粉色漸變彩線 CSS 類別名稱
    }
  ])

  // 將宣告封裝好的 experiences 經歷陣列變數包裝成物件導出，讓 Vue 組件可以順利抓取渲染
  return {
    experiences
  }
}