// 全站共用左側名片的打字機與深淺色主題切換業務邏輯控制檔案
// 採用組合式 API (Composition API) 撰寫，方便功能模組化抽離

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 建立並導出全站外殼專用的核心邏輯控制函式
 * 供 App.vue 解構引用
 */
export function useAppView() {

  // 打字機設定：定義要在個人名片上像打字機一樣輸出字串
  const fullText = '個性樂觀、熱衷學習、刻苦勤勞、積極進取'

  // 【打字機變數】建立一個初始值為空字串的響應式變數 (ref)，用來即時儲存目前已經印出來的文字
  const displayText = ref('')

  // 【打字機索引】宣告一個普通的整數變數，用來記錄打字機目前跑到了第幾個字元的索引位置
  let currentIndex = 0

  // 【打字機計時器】儲存打字機定時器的實例，用以在組件銷毀時安全清除，防堵記憶體洩漏
  let typeTimer = null

  // 【主題變數】建立一個控制全站主題模式的響應式變數，預設值設定為 false 代表淺色白天模式
  // const isDarkMode = ref(false)

  // 【主題變數】建立一個控制全站主題模式的響應式變數，預設值設定為 true 代表深色黑夜模式
  const isDarkMode = ref(true)

  // 【主題提示變數】控制右下角開燈/關燈趣味提示氣泡的隱現，預設一進入畫面時為 true 顯示
  const showThemeTip = ref(true)
  let themeTipTimer = null

  // 【置頂按鈕顯示變數】控制回到頂部按鈕的顯示狀態，大於 300px 時為真
  const showScrollTopBtn = ref(false)

  // 【路由監聽】取得當前路由物件以追蹤頁面切換
  const route = useRoute()

  // 監聽路由路徑變化：當切換不同分頁時，立即將置頂按鈕隱藏並捲回最頂部
  watch(
    () => route.path,
    () => {
      showScrollTopBtn.value = false
      window.scrollTo(0, 0)
    }
  )

  // 【滾動監聽函式】監聽垂直滾動高度是否超過可滾動範圍的一半（滑到頁面中間）以決定顯示或隱藏按鈕
  const handleScroll = () => {
    // 獲取網頁內容總高度與瀏覽器視窗高度
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    // 計算出最大的可滾動高度差
    const maxScrollHeight = scrollHeight - clientHeight
    // 安全防護雙重檢查：
    // 1. 最大可滾動高度差必須大於 150 像素（代表是足夠長的頁面，才有置頂必要）
    // 2. 目前垂直滾動位置必須大於 100 像素（防範頁面剛載入或路由切換時的高度瞬時差）
    // 3. 目前滾動高度已超過最大可滾動高度的一半（滑到頁面中間）
    if (maxScrollHeight > 150 && window.scrollY > 100) {
      showScrollTopBtn.value = window.scrollY > (maxScrollHeight / 2)
    } else {
      showScrollTopBtn.value = false
    }
  }

  // 【平滑置頂函式】點擊置頂按鈕時，執行視窗平滑滾動回頁首
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * 【打字機核心函式】宣告並定義執行逐字打字效果的遞迴計時函式
   */
  const typeEffect = () => {
    // 進行條件檢查，如果目前前進的字元索引還小於完整職稱字串的總長度
    if (currentIndex < fullText.length) {
      // 透過 charAt 依據當前索引抓取單一字元，並追加累加到負責呈現文字的響應式變數 (displayText.value) 中
      displayText.value += fullText.charAt(currentIndex)
      // 將索引計數器往後加 1，代表前進到下一個字元位置
      currentIndex++
      // 呼叫瀏覽器內建的延時排程函式，設定每隔 120 毫秒重新執行一次自己，做出打字間隔感
      typeTimer = setTimeout(typeEffect, 120)
    }
  }

  /**
   * 【主題切換函式】宣告切換深淺色主題模式的控制函式
   */
  const toggleTheme = () => {
    // 將原本儲存黑夜狀態的布林值進行反轉，如果是真(true)就變假(false)，如果是假(false)就變真(true)
    isDarkMode.value = !isDarkMode.value

    // 點擊切換主題時，自動關閉右下角的趣味開關燈提示氣泡
    showThemeTip.value = false

    // 進行條件檢查，如果目前為真 (深色模式)
    if (isDarkMode.value) {
      // 透過瀏覽器 DOM 原生語法，去網頁最外層的 <html> 標籤上設定為 data-theme="dark" 屬性
      document.documentElement.setAttribute('data-theme', 'dark')
      // 如果目前為假 (白天模式)
    } else {
      // 透過瀏覽器 DOM 原生語法，去網頁最外層的 <html> 標籤上設定為 data-theme="light" 屬性
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  // 人流計數器變數：建立一個儲存今日、本月、本年與累計總人流的響應式物件
  const visitorStats = ref({
    today: 1,
    month: 1,
    year: 1,
    total: 1
  })

  // 安全讀取與寫入 Storage 之防呆輔助函式，防止無痕模式或限制環境引發 DOMException
  const safeGetItem = (type, key) => {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage
      return storage ? storage.getItem(key) : null
    } catch (e) {
      return null
    }
  }

  const safeSetItem = (type, key, val) => {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage
      if (storage) {
        storage.setItem(key, val)
      }
    } catch (e) {
      // 忽略防追蹤或無痕模式下之寫入失敗例外
    }
  }

  /**
   * 人流計數器初始化與更新控制函式
   * 採用多重 API 服務 (Miles Hilliard CountAPI / CounterAPI.dev) 結合 Promise.allSettled 與全自動備援機制
   * 解決單一 API 失敗導致 Promise.all 崩潰、零值邏輯判斷錯誤與跨裝置未同步之所有隱性 Bug
   */
  const initVisitorCounter = async () => {
    try {
      // 獲取當前系統時間並格式化為年月日字串
      const now = new Date()
      const currentYear = String(now.getFullYear())
      const currentMonth = `${currentYear}_${String(now.getMonth() + 1).padStart(2, '0')}`
      const currentDate = `${currentMonth}_${String(now.getDate()).padStart(2, '0')}`

      // 優先載入本地上次快取數據，防止頁面初始化時數字閃爍 0
      const localSaved = safeGetItem('local', 'han_profile_real_stats')
      if (localSaved) {
        try {
          const parsed = JSON.parse(localSaved)
          visitorStats.value = {
            today: parsed.today || 1,
            month: parsed.month || 1,
            year: parsed.year || 1,
            total: parsed.total || 1
          }
        } catch (e) {
          // 忽略無效的本地快取格式
        }
      }

      // 檢查會話與日期標籤：若為全新會話或進入新的一天，則進行計數遞增 (hit/up)
      const sessionDate = safeGetItem('session', 'han_profile_session_date')
      const isNewVisit = sessionDate !== currentDate

      // 專案專屬 Key 名稱
      const keys = {
        today: `today_${currentDate}`,
        month: `month_${currentMonth}`,
        year: `year_${currentYear}`,
        total: 'total_all'
      }

      // 專屬 CounterAPI 請求函式（乾淨回應且無 404 控制台紅字報錯）
      const fetchSingleKey = async (keyName, keyStr) => {
        const isHit = isNewVisit
        const action = isHit ? '/up' : ''
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)

        try {
          // 主提供者: CounterAPI.dev (支援自動創建 Key 與 200 OK 乾淨回應)
          const url = `https://api.counterapi.dev/v1/hanjohn_profile_site/${keyStr}${action}`
          let res = await fetch(url, { signal: controller.signal })
          
          // 若非首次計數（GET 讀取模式）卻因 Key 尚未創立而回傳 404，自動切換至 /up 進行首次初始化創建
          if (!res.ok && !isHit) {
            const createUrl = `https://api.counterapi.dev/v1/hanjohn_profile_site/${keyStr}/up`
            res = await fetch(createUrl, { signal: controller.signal })
          }

          clearTimeout(timeoutId)
          if (res.ok) {
            const data = await res.json()
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null) return val
          }
        } catch (e) {
          // 忽略連線或離線例外
        }

        // 若 API 暫時無法連線，回退至快取或預設值
        return visitorStats.value[keyName] || 1
      }

      // 採用 Promise.allSettled 獨立處理每個 Key，避免單一 Key 失敗導致全盤皆輸
      const results = await Promise.allSettled([
        fetchSingleKey('today', keys.today),
        fetchSingleKey('month', keys.month),
        fetchSingleKey('year', keys.year),
        fetchSingleKey('total', keys.total)
      ])

      const updatedStats = {
        today: results[0].status === 'fulfilled' ? results[0].value : visitorStats.value.today,
        month: results[1].status === 'fulfilled' ? results[1].value : visitorStats.value.month,
        year: results[2].status === 'fulfilled' ? results[2].value : visitorStats.value.year,
        total: results[3].status === 'fulfilled' ? results[3].value : visitorStats.value.total
      }

      // 標記會話日期
      if (isNewVisit) {
        safeSetItem('session', 'han_profile_session_date', currentDate)
      }

      // 更新至本地快取與響應式狀態
      safeSetItem('local', 'han_profile_real_stats', JSON.stringify(updatedStats))
      visitorStats.value = updatedStats
    } catch (globalErr) {
      // 安全捕獲全域異常，防範任何未預期的 DOMException 向外拋出
    }
  }

  /**
   * 註冊 Vue 的生命週期鉤子
   * 當全站主外殼組件在網頁上正式渲染掛載完畢後自動觸發
   */
  onMounted(() => {
    try {
      // 呼叫打字機計時控制函式，正式啟動逐字打印的網頁文字動畫特效
      typeEffect()
      // 初始化人流計數器，並補捕獲 Promise 例外
      initVisitorCounter().catch(() => {})
      // 設定全站深色主題
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      // 註冊滾動監聽事件以控制回到頂部按鈕的隱現
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll)
      }

      // 設定 8 秒後自動隱藏開關燈氣泡提示的定時器
      themeTipTimer = setTimeout(() => {
        showThemeTip.value = false
      }, 8000)
    } catch (e) {
      // 全局生命週期例外防呆防護
    }
  })

  /**
   * 註冊組件銷毀前的生命週期鉤子
   * 移除滾動監聽，防止記憶體洩漏
   */
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    // 安全清除打字機排程計時器，防堵記憶體洩漏與重複定時任務
    if (typeTimer) {
      clearTimeout(typeTimer)
    }
    // 安全清除主題提示氣泡定時器
    if (themeTipTimer) {
      clearTimeout(themeTipTimer)
    }
  })

  // 將網頁模板 (Template) 需要用來顯示與點擊綁定的變數及函式完整包裝導出
  return {
    displayText,
    isDarkMode,
    toggleTheme,
    showScrollTopBtn,
    scrollToTop,
    showThemeTip,
    visitorStats
  }
}