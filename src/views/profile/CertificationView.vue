<template>
  <!-- 認證證照頁面最外層容器：設定右側主要內容的內縮邊距 (padding) -->
  <div class="certification-page-content p-2">
    
    <!-- 頂部大標題區塊：m-0 消除外距，由 App.css 定義其橘色方塊與佈局 -->
    <div class="page-title-zone mb-4">
      <div class="page-title-indicator"></div>
      <h2 class="page-main-title m-0">專業認證 / Certifications</h2>
    </div>

    <!-- Bootstrap 網格系統行容器：g-4 代表子欄位之間有舒適的間距 -->
    <div class="row g-4">
      
      <!-- 使用 v-for 指令循環渲染 certifications 陣列中宣告的所有證照卡片 -->
      <!-- col-12 在手機版單欄排滿，col-md-6 在電腦版呈雙欄排版 (兩欄並排) -->
      <div v-for="cert in certifications" :key="cert.id" class="col-12 col-md-6">
        <!-- 單個證照卡片外殼：設定內縮、position-relative 做定位基準、overflow-hidden 裁切頂部彩條 -->
        <div class="cert-grid-card h-100 p-4 d-flex flex-column justify-content-between">
          
          <!-- 主要內容區域 -->
          <div class="card-main-content">
            <!-- 卡片最頂部的一條極細彩色裝飾彩線：動態綁定 cert.accentClass 來呈現不同的漸變色 -->
            <div :class="['card-accent-line', cert.accentClass]"></div>
            
            <!-- 發證機構名稱：fw-bold 設定為粗體 -->
            <span class="cert-issuer fw-bold d-block mb-1">{{ cert.issuer }}</span>
            
            <!-- 證照主要名稱：fw-bold 設定為粗體，mb-2 底部外距 -->
            <h3 class="cert-title fw-bold mb-3">{{ cert.title }}</h3>
            
            <!-- 證照取得時間與編號 -->
            <div class="cert-meta-info d-flex flex-column gap-1 mb-3">
              <span>取得時間：{{ cert.date }}</span>
              <span>證照編號：{{ cert.credentialId }}</span>
            </div>
            
            <!-- 證照細部簡介說明 -->
            <p class="cert-summary mb-4">{{ cert.summary }}</p>
          </div>

          <!-- 卡片底部的按鈕區塊，採用雙按鈕並列設計 -->
          <div class="card-action-bar mt-auto d-flex gap-2">
            <!-- 查看憑證按鈕：點擊開啟燈箱彈窗放大觀看圖片 -->
            <button @click="showCertificate(cert.image)" class="btn btn-cert-view w-100 fw-medium d-flex align-items-center justify-content-center gap-1">
              <span>查看通過憑證</span>
              <span class="small">★</span>
            </button>
            <!-- 線上驗證按鈕：另開新分頁連至證照驗證系統 -->
            <a :href="cert.verifyUrl" target="_blank" class="btn btn-cert-verify w-100 fw-medium d-flex align-items-center justify-content-center gap-1">
              <span>前往官方網站</span>
              <span class="small">↗</span>
            </a>
          </div>

        </div>
      </div>

    </div>

    <!-- 證照圖片燈箱彈窗 (Lightbox Modal) -->
    <!-- v-if="activeImageUrl" 當有選取的圖片網址時顯示此遮罩層 -->
    <!-- @click.self 點擊背景遮罩處時自動關閉視窗，防呆設計 -->
    <div v-if="activeImageUrl" class="cert-modal-overlay" @click.self="closeCertificate">
      <div class="cert-modal-content">
        <!-- 關閉按鈕 -->
        <button class="cert-modal-close-btn" @click="closeCertificate">&times;</button>
        <!-- 證照大圖，使用動態綁定相對路徑防止 Vite 報錯 -->
        <img :src="activeImageUrl" alt="證照憑證大圖" class="cert-modal-img" />
      </div>
    </div>

  </div>
</template>

<script setup>
// 【樣式匯入】引入認證證照頁面專屬的純 CSS 樣式表檔案 (包含卡片 Hover 動畫、彈窗燈箱特效等)
import '@/assets/css/profile/CertificationView.css'

// 【業務邏輯匯入】引入認證證照頁面的 Composable 函數檔 (負責管理證照資料與彈窗狀態)
import { useCertificationView } from '@/assets/js/profile/CertificationView.js'

// 【解構載入】從 Composable 中取出證照陣列與彈窗控制方法，提供給上方 HTML 做事件與變數綁定
const { certifications, activeImageUrl, showCertificate, closeCertificate } = useCertificationView()
</script>
