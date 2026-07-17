<template>
  <!-- 作品集頁面最外層容器：設定右側主要內容的內縮邊距 (padding) -->
  <div class="portfolio-page-content p-2">
    
    <!-- 頂部大標題區塊：m-0 消除外距，由 App.css 定義其橘色方塊與佈局 -->
    <div class="page-title-zone mb-4">
      <div class="page-title-indicator"></div>
      <h2 class="page-main-title m-0">精選作品 / Portfolio</h2>
    </div>

    <!-- Bootstrap 網格系統行容器：g-4 代表子欄位之間有舒適的間距 -->
    <div class="row g-4">
      
      <!-- 使用 v-for 指令循環渲染 projects 陣列中宣告的所有作品卡片 -->
      <!-- col-12 在手機版單欄排滿，col-md-6 在平板與電腦版呈雙欄排版 (兩欄並排) -->
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6">
        <!-- 單個作品卡片外殼：由 PortfolioView.css 限制 240px 固定高度 -->
        <div class="project-grid-card">
          
          <!-- 專案封面圖：:src 動態載入圖片路徑，:alt 在圖片無法載入時顯示專案名稱 -->
          <img :src="project.image" :alt="project.title" class="project-cover-img" />
          
          <!-- 滑鼠移入時才會從下方滑入的半透明遮罩層：d-flex 佈局、flex-column 垂直堆疊、justify-content-between 上下對齊 -->
          <div class="project-hover-overlay p-3 d-flex flex-column justify-content-between">
            
            <!-- 遮罩內部上半部：包含作品標題、說明與技術膠囊 -->
            <div class="overlay-top-info">
              <!-- 專案中文標題：fw-bold 設定為粗體字 -->
              <h3 class="project-title-text fw-bold mb-2">{{ project.title }}</h3>
              <!-- 專案細部白話文摘要簡介：mb-3 底部外距 -->
              <p class="project-summary-text mb-3">{{ project.summary }}</p>
              
              <!-- 技術標籤容器：水平彈性排列、自適應換行、保持 2px 間距 -->
              <div class="d-flex flex-wrap gap-2 mb-3">
                <!-- 內層迴圈：遍歷此專案運用的所有技術 tags 標籤 -->
                <span v-for="tag in project.tags" :key="tag" class="project-tag-badge">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 遮罩內部下半部：操作按鈕列 (d-flex 並排) -->
            <div class="overlay-action-buttons d-flex gap-3">
              <!-- 遍歷專案按鈕列表，動態渲染各別作品的按鈕文字與連結 -->
              <template v-for="btn in project.buttons" :key="btn.text">
                <!-- 情況 A：若為影片媒體網址，則改用按鈕觸發本地燈箱彈窗播放 -->
                <button 
                  v-if="isMediaUrl(btn.url)" 
                  @click="showVideo(btn.url)" 
                  class="btn btn-overlay-action w-100 fw-medium"
                >
                  {{ btn.text }}
                </button>
                <!-- 情況 B：若為一般網頁連結，維持使用超連結另開新分頁 -->
                <a 
                  v-else 
                  :href="btn.url" 
                  target="_blank" 
                  class="btn btn-overlay-action w-100 fw-medium"
                >
                  {{ btn.text }}
                </a>
              </template>
            </div>

          </div>

        </div>
      </div>

    </div>

    <!-- 專案影片播放燈箱彈窗 -->
    <!-- v-if="activeVideoUrl" 當有選取的影片網址時顯示此遮罩層 -->
    <!-- @click.self 點擊背景遮罩處時自動關閉視窗，防呆設計 -->
    <div v-if="activeVideoUrl" class="portfolio-modal-overlay" @click.self="closeVideo">
      <div class="portfolio-modal-content">
        <!-- 關閉按鈕 -->
        <button class="portfolio-modal-close-btn" @click="closeVideo">&times;</button>
        <!-- 依影片類型動態選擇 iframe 或是 video 標籤進行播放 -->
        <iframe 
          v-if="activeVideoUrl.includes('youtube') || activeVideoUrl.includes('youtu.be')" 
          :src="activeVideoUrl" 
          class="portfolio-modal-iframe" 
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
        <video 
          v-else 
          :src="activeVideoUrl" 
          class="portfolio-modal-video" 
          controls 
          autoplay
        ></video>
      </div>
    </div>

  </div>
</template>

<script setup>
// 【樣式匯入】引入作品集頁面專屬的純 CSS 樣式表檔案 (含玻璃遮罩滑動、圖片放大等特效)
import '@/assets/css/profile/PortfolioView.css'

// 【業務邏輯匯入】引入作品集頁面的 Composable 函數檔 (負責管理專案清單的 Ref 響應式陣列)
import { usePortfolioView } from '@/assets/js/profile/PortfolioView.js'

// 【解模載入】從 Composable 中取出專案陣列與燈箱狀態控制方法，以提供給上面 HTML 進行綁定渲染
const { projects, activeVideoUrl, showVideo, closeVideo } = usePortfolioView()

/**
 * 輔助判斷網址是否為影音媒體資源的函式
 * 支援副檔名為 .mp4 與各種類型的 YouTube 影片播放網址
 */
const isMediaUrl = (url) => {
  if (!url) return false
  const u = url.toLowerCase()
  return u.endsWith('.mp4') || u.includes('youtube.com') || u.includes('youtu.be') || u.includes('youtube-nocookie.com')
}
</script>