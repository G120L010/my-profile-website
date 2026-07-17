<template>
  <!-- 榮譽事蹟頁面最外層容器：設定右側主要內容的內縮邊距 -->
  <div class="honor-page-content p-2">
    
    <!-- 頂部大標題區塊：由 App.css 定義其邊框飾條與排版 -->
    <div class="page-title-zone mb-4">
      <div class="page-title-indicator"></div>
      <h2 class="page-main-title m-0">榮譽事蹟 / Honors</h2>
    </div>

    <!-- 教育階段篩選列：提供全部、研究所、大學、高中職的動態篩選 -->
    <div class="honor-filter-section mb-3">
      <div class="filter-label">學歷階段：</div>
      <div class="honor-filter-bar">
        <button 
          @click="setStageFilter('all')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedStage === 'all' }"
        >
          全部顯示
        </button>
        <button 
          @click="setStageFilter('graduate')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedStage === 'graduate' }"
        >
          研究所
        </button>
        <button 
          @click="setStageFilter('university')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedStage === 'university' }"
        >
          大學
        </button>
        <button 
          @click="setStageFilter('highschool')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedStage === 'highschool' }"
        >
          高中
        </button>
      </div>
    </div>

    <!-- 榮譽類別篩選列：提供全部、學業成績單、獲獎事蹟、獎學金紀錄的動態篩選 -->
    <div class="honor-filter-section mb-4">
      <div class="filter-label">榮譽類別：</div>
      <div class="honor-filter-bar">
        <button 
          @click="setTypeFilter('all')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedType === 'all' }"
        >
          全部類別
        </button>
        <button 
          @click="setTypeFilter('transcript')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedType === 'transcript' }"
        >
          學業成績單
        </button>
        <button 
          @click="setTypeFilter('award')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedType === 'award' }"
        >
          獲獎事蹟
        </button>
        <button 
          @click="setTypeFilter('scholarship')" 
          class="btn btn-honor-filter" 
          :class="{ active: selectedType === 'scholarship' }"
        >
          獎學金
        </button>
      </div>
    </div>

    <!-- Bootstrap 網格系統行容器，置中對齊最後一行的剩餘卡片 -->
    <div class="row g-4 justify-content-center">
      
      <!-- 使用 v-for 指令循環渲染過濾後的榮譽事蹟卡片 -->
      <!-- col-12 在手機版單欄排滿，col-md-6 在電腦版呈雙欄排版 -->
      <div v-for="honor in filteredHonors" :key="honor.id" class="col-12 col-md-6">
        <!-- 單個榮譽卡片外殼：設定彈性排版以確保按鈕列於卡片底部對齊 -->
        <div class="honor-grid-card h-100 p-4 d-flex flex-column justify-content-between">
          
          <!-- 主要內容區域 -->
          <div class="card-main-content">
            <!-- 卡片最頂部的彩色細裝飾線：動態綁定 accentClass 以呈現對應主題色 -->
            <div :class="['card-accent-line', honor.accentClass]"></div>
            
            <!-- 發證與頒發機構名稱，並列呈現學歷階段與分類標籤 -->
            <div class="honor-card-header mb-1">
              <span class="honor-issuer fw-bold">{{ honor.issuer }}</span>
              <div class="honor-badges-container">
                <span class="honor-type-badge">{{ honor.stageName }}</span>
                <span class="honor-type-badge">{{ honor.typeName }}</span>
              </div>
            </div>
            
            <!-- 榮譽事蹟名稱 -->
            <h3 class="honor-title fw-bold mb-3">{{ honor.title }}</h3>
            
            <!-- 榮譽取得時間 -->
            <div class="honor-meta-info mb-3">
              <span>取得時間：{{ honor.date }}</span>
            </div>
            
            <!-- 榮譽細部簡介與獲獎描述 -->
            <p class="honor-summary mb-4">{{ honor.summary }}</p>
          </div>

          <!-- 卡片底部按鈕區：包含查看憑證與前往官方網站的按鈕設計 -->
          <div class="card-action-bar mt-auto d-flex gap-2">
            <!-- 查看憑證按鈕：點擊開啟燈箱彈窗放大觀看圖片或PDF -->
            <button @click="showHonor(honor.image)" class="btn btn-honor-view w-100 fw-medium d-flex align-items-center justify-content-center gap-1">
              <span>點我查看</span>
              <span class="small">★</span>
            </button>
            <!-- 前往官網按鈕：當 verifyUrl 有資料時才顯示（例如新聞報導或驗證連結） -->
            <a 
              v-if="honor.verifyUrl" 
              :href="honor.verifyUrl" 
              target="_blank" 
              class="btn btn-honor-verify w-100 fw-medium d-flex align-items-center justify-content-center gap-1"
            >
              <span>了解更多</span>
              <span class="small">↗</span>
            </a>
          </div>

        </div>
      </div>

    </div>

    <!-- 榮譽憑證大圖燈箱彈窗 -->
    <!-- v-if="activeImageUrl" 當有選取的圖片網址時顯示此遮罩層 -->
    <!-- @click.self 點擊背景遮罩處時自動關閉視窗，防呆設計 -->
    <div v-if="activeImageUrl" class="honor-modal-overlay" @click.self="closeHonor">
      <div class="honor-modal-content">
        <!-- 關閉按鈕 -->
        <button class="honor-modal-close-btn" @click="closeHonor">&times;</button>
        <!-- 憑證大圖或PDF，依據副檔名進行動態切換以相容PDF檔案 -->
        <iframe 
          v-if="activeImageUrl.toLowerCase().endsWith('.pdf')" 
          :src="activeImageUrl" 
          class="honor-modal-pdf" 
          frameborder="0"
        ></iframe>
        <img 
          v-else 
          :src="activeImageUrl" 
          alt="榮譽憑證大圖" 
          class="honor-modal-img" 
        />
      </div>
    </div>

  </div>
</template>

<script setup>
// 【樣式匯入】引入榮譽事蹟頁面專屬的純 CSS 樣式表檔案
import '@/assets/css/profile/HonorView.css'

// 【業務邏輯匯入】引入榮譽事蹟頁面的 Composable 函數檔
import { useHonorView } from '@/assets/js/profile/HonorView.js'

// 【解構載入】從 Composable 中解構變數與方法，供 Vue 模板綁定使用
const { 
  selectedStage,
  selectedType, 
  filteredHonors, 
  activeImageUrl, 
  setStageFilter,
  setTypeFilter,
  showHonor, 
  closeHonor 
} = useHonorView()
</script>
