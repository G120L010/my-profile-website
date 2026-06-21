// 精選作品集頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將作品資料徹底模組化抽離

import { ref } from 'vue'

/**
 * 建立並導出作品集分頁專用的核心邏輯控制函式
 * 供 PortfolioView.vue 引入解構使用
 */
export function usePortfolioView() {
  
  // 【作品集響應式陣列】使用 ref() 管理作品清單，內容若改變，網頁畫面會自動更新
  const projects = ref([
    {
      id: 1, // 作品唯一識別碼 (防止重複)
      title: '響應式個人品牌雲端履歷', // 作品中文標題名稱
      summary: '完全對齊單頁應用程式（SPA）架構開發的高質感前端作品集。具備全環境分流模組抽離、精密貝茲曲線漂浮微動畫，以及獨立路由 Hash 導航功能。', // 專案簡介白話文
      tags: ['Vue 3', 'Vite', 'Bootstrap 5', 'CSS 3'], // 專案技術標籤陣列
      image: 'images/Portfolioimg/no-image.jpg', // 本地圖片路徑 (相對於 public 目錄，放於 public/images/Portfolioimg/ 下)
      demoUrl: '#/', // 點擊「瀏覽網站」時前往的連結位址
      codeUrl: 'https://github.com/' // 點擊「原始碼」時前往的 GitHub 專案庫網址
    },
    {
      id: 2, // 作品唯一識別碼 (確保每個項目都有不同的數字，以便 Vue 進行高效畫面追蹤與渲染)
      title: '企業級前後端分離電商服務端', // 第二個作品的名稱標題
      summary: '專精於高穩健度分層架構（Controller / Service / Repo）開發的寵物商務後台系統。成功打通沙盒金流交易，並實作核心交易邏輯防呆與高併發超賣控制。', // 第二個作品的簡短說明
      tags: ['Java 21', 'Spring Boot', 'JPA', 'SQL Server'], // 第二個作品所使用的技術標籤
      image: 'images/Portfolioimg/no-image.jpg', // 第二個作品的封面圖片路徑 (放置於 public/images/Portfolioimg/)
      demoUrl: '#/', // 第二個作品在線上展示的 URL 網址 (目前為預設)
      codeUrl: 'https://github.com/' // 第二個作品的 GitHub 開源程式碼庫網址
    },
    {
      id: 3, // 作品唯一識別碼 (確保每個項目都有不同的數字)
      title: '即時雲端數據視覺化主控台', // 第三個作品的名稱標題
      summary: '基於 WebSocket 與動態圖表技術開發的雲端資源監控儀表板。提供伺服器 CPU/記憶體負載的即時可視化折線圖，並支援自訂警報門檻發送通知。', // 第三個作品的簡短說明
      tags: ['Vue 3', 'ECharts', 'WebSockets', 'Axios'], // 第三個作品所使用的技術標籤
      image: 'images/Portfolioimg/no-image.jpg', // 第三個作品的封面圖片路徑
      demoUrl: '#/', // 第三個作品的線上展示網址
      codeUrl: 'https://github.com/' // 第三個作品的開源程式碼庫網址
    },
    {
      id: 4, // 作品唯一識別碼 (確保每個項目都有不同的數字)
      title: '自動化運維部署 CI/CD 排程器', // 第四個作品的名稱標題
      summary: '串接 GitHub Actions 與 Docker 容器技術的持續整合發佈系統。讓團隊程式碼在提交後自動觸發單元測試、建置 Image，並發佈至 Linux 測試機。', // 第四個作品的簡短說明
      tags: ['Spring Boot', 'Docker', 'GitHub Actions', 'Linux'], // 第四個作品所使用的技術標籤
      image: 'images/Portfolioimg/no-image.jpg', // 第四個作品的封面圖片路徑
      demoUrl: '#/', // 第四個作品的線上展示網址
      codeUrl: 'https://github.com/' // 第四個作品的開源程式碼庫網址
    },
    {
      id: 5, // 作品唯一識別碼 (預留作品欄位一，方便日後擴充)
      title: '微服務分散式架構閘道器 (預留欄位)', // 第五個作品的名稱標題
      summary: '專門針對高併發流量設計的安全防護閘道器。提供統一限流、動態路由轉發、灰度發佈與防惡意掃描等核心安全防禦機制。', // 第五個作品的簡短說明
      tags: ['Spring Boot', 'Spring Cloud', 'Redis', 'Gateway'], // 第五個作品預定使用的技術標籤
      image: 'images/Portfolioimg/no-image.jpg', // 第五個作品的封面圖片路徑
      demoUrl: '#/', // 第五個作品的線上展示網址
      codeUrl: 'https://github.com/' // 第五個作品的開源程式碼庫網址
    },
    {
      id: 6, // 作品唯一識別碼 (預留作品欄位二，方便日後擴充)
      title: 'AI 智慧語意客服系統 (預留欄位)', // 第六個作品的名稱標題
      summary: '整合大型語言模型（LLM）的智慧客服平台。支援知識庫檢索增現生成（RAG）、語意相似度檢索，並具備即時客服轉接人工通道功能。', // 第六個作品的簡短說明
      tags: ['Vue 3', 'Java 21', 'Spring AI', 'Vector DB'], // 第六個作品預定使用的技術標籤
      image: 'images/Portfolioimg/no-image.jpg', // 第六個作品的封面圖片路徑
      demoUrl: '#/', // 第六個作品的線上展示網址
      codeUrl: 'https://github.com/' // 第六個作品的開源程式碼庫網址
    }
  ])

  // 將作品陣列 projects 導出，讓 PortfolioView.vue 可以載入讀取
  return {
    projects
  }
}