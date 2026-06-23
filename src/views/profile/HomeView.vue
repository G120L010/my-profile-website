<template>
  <!-- 經歷分頁最外層容器：設定右側主要內容的內縮邊距 (padding) -->
  <div class="experience-page-content p-2">
    
    <!-- 經歷頁面的頂部大標題區塊：設定底部外距為 4 (margin-bottom: 1.5rem) -->
    <div class="page-title-zone mb-4">
      <!-- 標題左側的橘色裝飾小方塊線條 (由 App.css 定義其圓角與背景色) -->
      <div class="page-title-indicator"></div>
      <!-- 經歷頁面的中英文大標題：m-0 移除預設的外距 -->
      <h2 class="page-main-title m-0">工作經歷 / Job Experience</h2>
    </div>

    <!-- 垂直時間軸的主要外殼容器 (由 HomeView.css 繪製左側的垂直灰色實線) -->
    <div class="timeline-container">
      
      <!-- 使用 Vue 3 的 v-for 指令，動態循環遍歷在 JS 宣告好的 experiences 陣列資料 -->
      <!-- :key="exp.id" 是 Vue 用來識別各卡片唯一性的防呆機制，能優化網頁渲染效能 -->
      <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
        
        <!-- 畫在左側垂直時間軸線上的橘色小圓圈 (absolute 絕對定位) -->
        <div class="timeline-dot"></div>
        
        <!-- 工作經歷卡片本體：p-4 設定內縮、position-relative 做定位基準、overflow-hidden 裁切頂部彩條 -->
        <div class="experience-card p-4 position-relative overflow-hidden">
          
          <!-- 卡片頂部的極細漸變裝飾條：動態綁定 exp.accentClass (如 accent-frontend、accent-backend) -->
          <div :class="['card-accent-line', exp.accentClass]"></div>
          
          <!-- 卡片第一排橫列：包含公司名稱與在職時間，d-flex 設定彈性盒子，flex-wrap 讓小螢幕時能自適應換行 -->
          <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
            <!-- 顯示公司的中文名稱：fw-bold 設定為粗體字 -->
            <h3 class="exp-company fw-bold m-0">{{ exp.company }}</h3>
            <!-- 顯示在職的年份與月份期間：fw-medium 設定中等粗體字 -->
            <span class="exp-period fw-medium mt-1 mt-sm-0">{{ exp.period }}</span>
          </div>
          
          <!-- 顯示專業職位職稱：固定呈現品牌亮橘色，mb-3 設定底部間距 -->
          <p class="exp-role fw-medium mb-3">{{ exp.role }}</p>
          
          <!-- 顯示具體工作內容、專案貢獻或成就的詳細摘要白話文 -->
          <p class="exp-summary mb-3">{{ exp.summary }}</p>

          <!-- 工作經歷附帶的成果新聞稿或活動成果連結 -->
          <div v-if="exp.links && exp.links.length > 0" class="exp-links-zone mb-3 d-flex flex-column gap-1">
            <span class="exp-links-title d-block fw-semibold mb-1">相關成果與新聞報導：</span>
            <div class="d-flex flex-wrap gap-3">
              <a v-for="link in exp.links" :key="link.url" :href="link.url" target="_blank" class="exp-link-item d-inline-flex align-items-center gap-1">
                <span>{{ link.title }}</span>
                <span class="small">↗</span>
              </a>
            </div>
          </div>
          
          <!-- 技術膠囊標籤容器：gap-2 設定小標籤之間的間距 -->
          <div class="d-flex flex-wrap gap-2">
            <!-- 內層迴圈：遍歷這筆經歷所用到的技術標籤陣列 (exp.tags) -->
            <span v-for="tag in exp.tags" :key="tag" class="tag-badge">
              {{ tag }}
            </span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// 【樣式匯入】引入經歷頁面專屬的純 CSS 樣式表檔案 (包含時間軸軌跡、卡片 Hover 動畫等)
import '@/assets/css/profile/HomeView.css'

// 【業務邏輯匯入】引入經歷頁面的 Composable 函數檔 (負責管理經歷的 Ref 響應式陣列資料)
import { useHomeView } from '@/assets/js/profile/HomeView.js'

// 【解構賦值】執行組合式函式並從中取出 experiences 陣列變數，提供給上方 HTML 進行遍歷渲染
const { experiences } = useHomeView()
</script>