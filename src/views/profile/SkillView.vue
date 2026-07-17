<template>
  <!-- 專業技能頁面最外層容器：設定右側主要內容的內縮邊距 (padding) -->
  <div class="skill-page-content p-2">
    
    <!-- 頂部大標題區塊：m-0 消除外距，由 App.css 定義其橘色方塊與佈局 -->
    <div class="page-title-zone mb-4">
      <div class="page-title-indicator"></div>
      <h2 class="page-main-title m-0">專業技能 / Skills</h2>
    </div>

    <!-- Bootstrap 網格系統行容器：g-4 代表卡片之間有 1.5rem 的邊距，置中對齊最後一行的剩餘卡片 -->
    <div class="row g-4 justify-content-center">
      
      <!-- 使用 v-for 指令循環渲染 skillCategories 陣列中所有的技術分類卡片 -->
      <!-- col-12 在手機版單欄排滿，col-md-6 在平板雙欄並排，col-lg-4 在桌機三欄並排 -->
      <div v-for="cat in skillCategories" :key="cat.id" class="col-12 col-md-6 col-lg-4">
        <!-- 單個技術卡片本體：h-100 使高度填滿網格以確保整齊對齊，p-4 設定內縮間距 -->
        <div class="custom-skill-card h-100 p-4">
          
          <!-- 卡片最頂部的一條極細彩色裝飾彩線：動態綁定 cat.accentClass 來呈現不同的漸變色 -->
          <div :class="['card-accent-line', cat.accentClass]"></div>
          
          <!-- 技術大分類標題文字 (例如 Front-End、Back-End)：fw-bold 設定為粗體 -->
          <h3 class="category-name-text fw-bold mb-4">{{ cat.title }}</h3>
          
          <!-- 該分類下的具體技術項目群組容器 -->
          <div class="skill-items-group">
            <!-- 內層迴圈：遍歷該分類底下的每一個技術條目 (cat.items) -->
            <!-- :key="item.name" 作為 Vue 渲染的唯一識別索引 -->
            <div v-for="item in cat.items" :key="item.name" class="skill-row-box">
              <!-- 技術名稱 (例如 Vue 3 / Vite)：fw-medium 中等粗體 -->
              <span class="skill-item-name fw-medium">{{ item.name }}</span>
              <!-- 技術白話文詳細描述內容 -->
              <span class="skill-item-desc">{{ item.desc }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// 【樣式匯入】引入專業技能頁面專屬的純 CSS 樣式表檔案 (包含卡片 Hover 上浮、邊框發光等特效)
import '@/assets/css/profile/SkillView.css'

// 【業務邏輯匯入】引入專業技能頁面的 Composable 函數檔 (負責管理技能分類的 Ref 響應式陣列)
import { useSkillView } from '@/assets/js/profile/SkillView.js'

// 【解構載入】從 Composable 中取出技能分類陣列 (skillCategories)，以提供給上面 HTML 進行遍歷渲染
const { skillCategories } = useSkillView()
</script>