<template>
  <!-- 最外層容器：設定全站底色、滿版高度、上下內縮間距 -->
  <div class="main-site-bg w-100 min-vh-100 py-4">
    
    <!-- 背景雪花飄落特效層 -->
    <div class="snowflake-background-overlay">
      <!-- 畫出 5 個獨立雪花粒子，動畫細節定義在 App.css 中 -->
      <div class="snowflake-item"></div>
      <div class="snowflake-item"></div>
      <div class="snowflake-item"></div>
      <div class="snowflake-item"></div>
      <div class="snowflake-item"></div>
    </div>

    <!-- 懸浮固定於右下角的深淺色切換圓形按鈕 -->
    <!-- @click="toggleTheme" 點擊時觸發 App.js 中的切換黑夜/白天模式函式 -->
    <!-- :title 在滑鼠懸停按鈕時顯示說明的提示文字 -->
    <button @click="toggleTheme" class="btn custom-theme-toggle-btn" :title="isDarkMode ? '切換為白天模式' : '切換為黑夜模式'">
      <!-- 根據 isDarkMode 的真假值動態顯示 太陽 或 月亮 符號 -->
      <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>
    </button>

    <!-- Bootstrap 響應式容器網格 -->
    <div class="container">
      <div class="row g-4">
        
        <!-- 左側個人資訊名片欄：在手機版佔滿 12 格寬度，在桌機版佔 4 格寬度 -->
        <div class="col-12 col-lg-4">
          <!-- 個人資訊名片本體卡片，設定內距為 4、內容水平居中對齊 -->
          <div class="profile-sidebar-card p-4 text-center">
            
            <!-- 大頭照圓形容器：mx-auto 居中、mb-3 縮小底部間距 -->
            <div class="avatar-circle-box mx-auto mb-3">
              <!-- 大頭照圖片：指向 public/images/Homeimg/me.jpg，使用動態綁定以防 Vite 打包錯誤且支援 GitHub Pages 相對路徑 -->
              <img :src="'images/Homeimg/me.jpg'" alt="大頭照" class="avatar-img-style" />
            </div>

            <!-- 使用者中文與英文名字 -->
            <h1 class="user-name-text fw-bold mb-2">吳翰彰 (HanJohn)</h1>
            
            <!-- 專業職位文字：打字機效果呈現區 -->
            <p class="user-title-text fw-medium mb-3">
              <!-- {{ displayText }} 用於顯示 App.js 逐字跑出來的文字 -->
              <span>{{ displayText }}</span>
              <!-- 打字機後面閃爍的垂直光標 -->
              <span class="sidebar-type-cursor"></span>
            </p>

            <!-- 個人簡介內文描述 -->
            <p class="user-bio-text text-start mb-3">
              畢業於崑山科大企管所碩士，兼具 Java 後端開發與專案管理實務。擅長運用 AI 工具輔助開發與流程優化，並將「企業管理思維」與「資訊科技」深度融合，致力於為團隊創造高效、多元的數位商務價值。
            </p>

            <!-- 按鈕組：查看履歷與聯繫我 -->
            <div class="d-flex gap-3 justify-content-center mb-3">
              <!-- 查看履歷：另開新分頁連至雲端硬碟 -->
              <a href="https://drive.google.com/drive/folders/1g4pQU8MrT9m4nbCG0Y30mnXP0iJceiE7?usp=sharing" target="_blank" class="btn fw-medium px-4 py-2 d-flex align-items-center gap-2 rounded-3 btn-profile-solid">
                <span>查看履歷</span>
                <span class="small">↗</span>
              </a>
              <!-- 聯繫我：點擊直接開啟郵件軟體寄給 HanJohn -->
              <a href="mailto:s112001044@g.ksu.edu.tw" class="btn fw-medium px-4 py-2 rounded-3 d-flex align-items-center gap-2 btn-profile-solid">
                <span>聯繫我</span>
                <span class="small">Email</span>
              </a>  
            </div>

            <!-- 導覽選單連結區：利用 RouterLink 切換右側的內容 -->
            <!-- gap-2 縮小選單項目間距，防止多個項目時向下溢出 -->
            <div class="d-flex flex-column gap-2 text-start">
              <!-- 路由切換 - 關於我分頁 -->
              <RouterLink to="/about" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">關於我</span>
                <span class="nav-text-sub">About</span>
              </RouterLink>

              <!-- 路由切換 - 經歷分頁 (預設首頁) -->
              <!-- active-class="item-is-active" 代表當前網址為此分頁時自動高亮的樣式類別 -->
              <!-- py-2 px-3 縮減上下內距，以在有限的高度中容納更多選單 -->
              <RouterLink to="/" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">工作經歷</span>
                <span class="nav-text-sub">Job Experience</span>
              </RouterLink>
              
              <!-- 路由切換 - 作品集分頁 -->
              <RouterLink to="/portfolio" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">作品集</span>
                <span class="nav-text-sub">Portfolio</span>
              </RouterLink>
              
              <!-- 路由切換 - 技能分頁 -->
              <RouterLink to="/skill" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">技能</span>
                <span class="nav-text-sub">Skills</span>
              </RouterLink>

              <!-- 路由切換 - 證照分頁 -->
              <RouterLink to="/certification" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">證照</span>
                <span class="nav-text-sub">Certifications</span>
              </RouterLink>
            </div>

          </div>
        </div>

        <!-- 右側主要內容呈現欄：手機版佔 12 格，桌機版佔 8 格 -->
        <div class="col-12 col-lg-8">
          <!-- 內容主展示盒，設定內距為 4 -->
          <div class="content-main-box p-4">
            <!-- RouterView 代表切換選單時，動態渲染路由對應的子分頁組件位置 -->
            <RouterView />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// 引入全站的 CSS 樣式定義檔
import '@/assets/css/App.css'

// 引入 App.vue 大外殼專屬的 Composable 業務邏輯檔 (打字機、深淺色切換邏輯)
import { useAppView } from '@/assets/js/App.js'

// 解構取出打字機文字、主題模式變數、切換主題方法，以在 Template 模板中做變數綁定與顯示
const { displayText, isDarkMode, toggleTheme } = useAppView()
</script>