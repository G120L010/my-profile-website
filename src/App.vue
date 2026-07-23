<template>
  <!-- 全站視窗最頂端旋轉星球捲動進度條 -->
  <div 
    class="custom-scroll-progress-bar" 
    :style="{ width: scrollProgress + '%' }"
    :class="{ 'is-active': scrollProgress > 0 }"
  >
    <!-- 進度條前端滾動的旋轉星球圖態 (經過處留下橘色進度條軌跡) -->
    <div class="scroll-planet-head">
      <img :src="'images/games/clawmachine23.jpg'" alt="Planet" class="scroll-planet-img" />
    </div>
  </div>

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
    <button @click="toggleTheme" class="btn custom-theme-toggle-btn" :class="{ 'has-tip': showThemeTip }" :title="isDarkMode ? $t('control.themeLightTip') : $t('control.themeDarkTip')">
      <!-- 根據 isDarkMode 的真假值動態顯示 太陽 或 月亮 符號 -->
      <span>{{ isDarkMode ? '☀️' : '🌙' }}</span>

      <!-- 趣味開關燈提示氣泡，一進頁面時主動引導使用者 -->
      <transition name="theme-tip-fade">
        <div v-if="showThemeTip" class="theme-toggle-tip" @click.stop>
          <span>{{ $t('control.themeTipText') }}</span>
          <button class="theme-tip-close-btn" @click.stop="showThemeTip = false">&times;</button>
        </div>
      </transition>
    </button>

    <!-- 懸浮固定於左上角的語言切換按鈕：顯示點擊後切換的下一個目標語系 (中文頁顯示 EN、英文頁顯示 JP、日文頁顯示 中) -->
    <button @click="toggleLanguage" class="btn custom-lang-toggle-btn" :title="$t('control.langToggleTip')">
      <span>{{ currentLocale === 'zh-TW' ? 'EN' : (currentLocale === 'en' ? 'にほんご' : '繁中') }}</span>
    </button>

    <!-- 懸浮固定於左上角語言按鈕右側之 PWA 一鍵安裝提示按鈕 (僅在瀏覽器符合 PWA 安裝條件時顯現) -->
    <button v-if="canInstallPWA" @click="installPWA" class="btn custom-pwa-install-btn" :title="$t('control.pwaInstallTip')">
      <span>📲</span>
    </button>

    <!-- 懸浮固定於右下角的回到頂部按鈕 -->
    <Transition name="fade">
      <button v-show="showScrollTopBtn" @click="scrollToTop" class="btn custom-scroll-top-btn" :title="$t('control.scrollTopTip')">
        <span>▲</span>
      </button>
    </Transition>

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

            <!-- 使用者名字 -->
            <h1 class="user-name-text fw-bold mb-2">{{ $t('profile.name') }}</h1>
            
            <!-- 專業職位文字：打字機效果呈現區 -->
            <p class="user-title-text fw-medium mb-3">
              <!-- {{ displayText }} 用於顯示 App.js 逐字跑出來的文字 -->
              <span>{{ displayText }}</span>
              <!-- 打字機後面閃爍的垂直光標 -->
              <span class="sidebar-type-cursor"></span>
            </p>

            <!-- 個人簡介內文描述 -->
            <p class="user-bio-text text-start mb-3">
              {{ $t('profile.bio') }}
            </p>

            <!-- 按鈕組：查看履歷與聯繫我 -->
            <div class="d-flex gap-3 justify-content-center mb-3">
              <!-- 查看履歷：另開新分頁連至雲端硬碟 -->
              <a href="https://drive.google.com/drive/folders/1g4pQU8MrT9m4nbCG0Y30mnXP0iJceiE7?usp=sharing" target="_blank" class="btn fw-medium px-4 py-2 d-flex align-items-center gap-2 rounded-3 btn-profile-solid">
                <span>{{ $t('profile.viewResume') }}</span>
                <span class="small">↗</span>
              </a>
              <!-- 聯繫我：點擊直接開啟郵件軟體寄給 HanJohn -->
              <a href="mailto:s112001044@g.ksu.edu.tw" class="btn fw-medium px-4 py-2 rounded-3 d-flex align-items-center gap-2 btn-profile-solid">
                <span>{{ $t('profile.contactMe') }}</span>
                <span class="small">Email</span>
              </a>  
            </div>

            <!-- 導覽選單連結區：利用 RouterLink 切換右側的內容 -->
            <div class="d-flex flex-column gap-2 text-start">
              <!-- 路由切換 - 關於我分頁 -->
              <RouterLink to="/about" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.about') }}</span>
                <span class="nav-text-sub">{{ $t('nav.aboutSub') }}</span>
              </RouterLink>

              <!-- 路由切換 - 經歷分頁 (預設首頁) -->
              <RouterLink to="/" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.experience') }}</span>
                <span class="nav-text-sub">{{ $t('nav.experienceSub') }}</span>
              </RouterLink>
              
              <!-- 路由切換 - 作品集分頁 -->
              <RouterLink to="/portfolio" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.portfolio') }}</span>
                <span class="nav-text-sub">{{ $t('nav.portfolioSub') }}</span>
              </RouterLink>
              
              <!-- 路由切換 - 技能分頁 -->
              <RouterLink to="/skill" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.skills') }}</span>
                <span class="nav-text-sub">{{ $t('nav.skillsSub') }}</span>
              </RouterLink>

              <!-- 路由切換 - 證照分頁 -->
              <RouterLink to="/certification" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.certifications') }}</span>
                <span class="nav-text-sub">{{ $t('nav.certificationsSub') }}</span>
              </RouterLink>

              <!-- 路由切換 - 榮譽事蹟分頁 -->
              <RouterLink to="/honor" class="custom-nav-item py-2 px-3 d-flex justify-content-between align-items-center" active-class="item-is-active">
                <span class="nav-text-main">{{ $t('nav.honors') }}</span>
                <span class="nav-text-sub">{{ $t('nav.honorsSub') }}</span>
              </RouterLink>
            </div>

            <!-- 全站人流計數器面板卡片：展示在線人數與日、月、年及累計人流數據 -->
            <div class="visitor-counter-box mt-3 p-3 rounded-3">
              <div class="visitor-counter-header d-flex justify-content-between align-items-center mb-2">
                <div class="d-flex align-items-center gap-2">
                  <span class="visitor-title-text fw-bold">{{ $t('counter.title') }}</span>
                  <div class="online-status-badge d-flex align-items-center px-2 py-1 rounded-pill">
                    <span class="online-pulse-dot me-1"></span>
                    <span class="online-status-text">{{ $t('counter.online') }}：<strong class="online-count-number">{{ onlineVisitors }}</strong> {{ $t('counter.peopleSuffix') }}</span>
                  </div>
                </div>
                <span class="visitor-sub-text">{{ $t('counter.visitors') }}</span>
              </div>
              <div class="row g-2 text-center visitor-stats-grid">
                <div class="col-6">
                  <div class="visitor-stat-card p-2 rounded-2">
                    <div class="visitor-stat-label">{{ $t('counter.today') }}</div>
                    <div class="visitor-stat-number">{{ visitorStats.today }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="visitor-stat-card p-2 rounded-2">
                    <div class="visitor-stat-label">{{ $t('counter.month') }}</div>
                    <div class="visitor-stat-number">{{ visitorStats.month }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="visitor-stat-card p-2 rounded-2">
                    <div class="visitor-stat-label">{{ $t('counter.year') }}</div>
                    <div class="visitor-stat-number">{{ visitorStats.year }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="visitor-stat-card p-2 rounded-2">
                    <div class="visitor-stat-label">{{ $t('counter.total') }}</div>
                    <div class="visitor-stat-number">{{ visitorStats.total }}</div>
                  </div>
                </div>
              </div>
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

// 引入 App.vue 大外殼專屬的 Composable 業務邏輯檔 (打字機、深淺色切換、語言切換、在線人數與人流計數邏輯)
import { useAppView } from '@/assets/js/App.js'

// 解構取出變數與方法，以在 Template 模板中做動態雙向綁定
const {
  displayText,
  isDarkMode,
  toggleTheme,
  showScrollTopBtn,
  scrollToTop,
  showThemeTip,
  visitorStats,
  onlineVisitors,
  currentLocale,
  toggleLanguage,
  scrollProgress,
  canInstallPWA,
  installPWA
} = useAppView()
</script>