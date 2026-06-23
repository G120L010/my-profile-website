<template>
  <!-- 關於我與特色經歷頁面最外層容器：設定右側主要內容的內縮邊距 -->
  <div class="about-page-content p-2">
    
    <!-- 頂部大標題區塊：由 App.css 定義其橘色方塊與排版 -->
    <div class="page-title-zone mb-4">
      <div class="page-title-indicator"></div>
      <h2 class="page-main-title m-0">關於我 / About Me</h2>
    </div>

    <!-- 第一部分：自傳折疊面板 (Accordion) -->
    <div class="mb-5">
      <h3 class="about-section-title">個人自傳故事</h3>
      <div class="accordion custom-bio-accordion" id="accordionBio">
        <!-- 遍歷自傳段落資料 -->
        <div v-for="bio in biography" :key="bio.id" class="accordion-item">
          <h4 class="accordion-header" :id="'heading-' + bio.id">
            <!-- 使用點擊事件觸發 toggleBio 切換展開狀態，並用 activeBioId 綁定動態樣式類別 -->
            <button 
              class="accordion-button" 
              :class="{ collapsed: activeBioId !== bio.id }" 
              type="button"
              @click="toggleBio(bio.id)"
              :aria-expanded="activeBioId === bio.id ? 'true' : 'false'" 
              :aria-controls="'collapse-' + bio.id"
            >
              {{ bio.title }}
            </button>
          </h4>
          <div 
            :id="'collapse-' + bio.id" 
            class="accordion-collapse collapse" 
            :class="{ show: activeBioId === bio.id }" 
            :aria-labelledby="'heading-' + bio.id" 
            data-bs-parent="#accordionBio"
          >
            <div class="accordion-body">
              {{ bio.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分：學歷背景與語文能力 (雙欄並排佈局) -->
    <div class="row g-4 mb-5">
      <!-- 左欄：學歷背景時間軸 -->
      <div class="col-12 col-md-6">
        <div class="edu-lang-card p-4 h-100">
          <div class="card-accent-line accent-experience"></div>
          <h3 class="about-section-title border-0 pb-0 mb-4">學歷背景</h3>
          
          <div class="edu-timeline">
            <!-- 遍歷學歷資料 -->
            <div v-for="edu in educations" :key="edu.id" class="edu-item">
              <div class="edu-dot"></div>
              <h4 class="edu-school-name">{{ edu.school }}</h4>
              <p class="edu-degree-text">{{ edu.degree }}</p>
              <p class="edu-period-text">{{ edu.period }} ({{ edu.status }})</p>
              <p class="edu-desc-text">{{ edu.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右欄：語文能力與駕駛執照 -->
      <div class="col-12 col-md-6">
        <div class="edu-lang-card p-4 h-100">
          <div class="card-accent-line accent-frontend"></div>
          
          <!-- 語文能力模組 -->
          <div class="mb-4">
            <h3 class="about-section-title border-0 pb-0 mb-3">語文能力</h3>
            <div class="py-2">
              <!-- 遍歷語文能力資料 -->
              <div v-for="lang in languages" :key="lang.name" class="lang-row">
                <div class="lang-info">
                  <span class="lang-name">{{ lang.name }}</span>
                  <span class="lang-level">{{ lang.level }}</span>
                </div>
                <div class="lang-progress-bar-bg">
                  <div class="lang-progress-bar-fill" :style="{ width: lang.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分隔線 -->
          <div class="border-top border-secondary opacity-25 my-3"></div>

          <!-- 駕駛執照模組 -->
          <div>
            <h3 class="about-section-title border-0 pb-0 mb-3">駕駛執照</h3>
            <div class="py-2">
              <!-- 遍歷駕駛執照資料 -->
              <div v-for="lic in licenses" :key="lic.name" class="lang-row">
                <div class="lang-info m-0">
                  <span class="lang-name">{{ lic.name }}</span>
                  <span class="lang-level">{{ lic.date }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 第三部分：特色經歷與專案 (網格佈局) -->
    <div>
      <h3 class="about-section-title mb-4">特色經歷與專案</h3>
      
      <div class="row g-4">
        <!-- 遍歷特色經歷資料，手機版一列一項，桌機版一列兩項 -->
        <div v-for="exp in featuredExperiences" :key="exp.id" class="col-12 col-md-6">
          <div class="feat-grid-card">
            <!-- 頂部漸變彩線 -->
            <div :class="['card-accent-line', exp.accentClass]"></div>
            
            <!-- 經歷配圖區塊：動態相對路徑綁定以防止 Vite 編譯破圖 -->
            <div class="feat-card-image-box">
              <img :src="exp.image" :alt="exp.title" class="feat-card-img" />
            </div>

            <!-- 卡片內容區塊 -->
            <div class="feat-card-body">
              <h4 class="feat-card-title">{{ exp.title }}</h4>
              <span class="feat-card-period">{{ exp.period }}</span>
              <p class="feat-card-desc">{{ exp.desc }}</p>
              
              <!-- 只有當有設定外部連結網址時才顯示按鈕 -->
              <div v-if="exp.url" class="feat-card-action">
                <a :href="exp.url" target="_blank" class="feat-link-btn">
                  <span>查看詳細內容</span>
                  <span class="small">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// 【樣式匯入】引入關於我頁面專屬的純 CSS 樣式表檔案
import '@/assets/css/profile/AboutView.css'

// 【業務邏輯匯入】引入關於我頁面的 Composable 函數檔 (管理自傳、學歷、語文、特色經歷的響應式 Ref)
import { useAboutView } from '@/assets/js/profile/AboutView.js'

// 【解構載入】從 Composable 中取出相關響應式資料與切換狀態方法，提供給上面 HTML 渲染
const { educations, languages, biography, featuredExperiences, activeBioId, toggleBio, licenses } = useAboutView()
</script>
