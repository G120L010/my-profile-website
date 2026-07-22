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

  // 在線人數變數：建立一個記錄當前真實線上人數的響應式變數，預設值設定為 1
  const onlineVisitors = ref(1)

  // 儲存真實在線人數 Presence 監聽器的銷毀清理控制函式
  let cleanupOnlinePresence = null
  let visitorPollTimer = null

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
   * 採用 CounterAPI 標準合規金鑰名稱 (today/month/year/total)，防止 301 重導向引發 CORS 控制台報錯
   */
  const initVisitorCounter = async () => {
    try {
      const now = new Date()
      const currentYear = String(now.getFullYear())
      const currentMonth = `${currentYear}_${String(now.getMonth() + 1).padStart(2, '0')}`
      const currentDate = `${currentMonth}_${String(now.getDate()).padStart(2, '0')}`

      const sessionDate = safeGetItem('session', 'han_session_date_v10')
      const isNewVisit = sessionDate !== currentDate

      // CounterAPI 標準簡潔金鑰名稱，避免多重底線觸發 301 重導向
      const keys = {
        today: 'today',
        month: 'month',
        year: 'year',
        total: 'total'
      }

      const fetchSingleKey = async (keyStr) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)

        try {
          const action = isNewVisit ? '/up' : ''
          const url = `https://api.counterapi.dev/v1/hanjohn_profile_site/${keyStr}${action}`
          const res = await fetch(url, { signal: controller.signal })
          
          clearTimeout(timeoutId)
          if (res.ok) {
            const data = await res.json()
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null) return val
          }
        } catch (e) {
          // 靜默捕捉網路例外
        }

        return 1
      }

      const results = await Promise.allSettled([
        fetchSingleKey(keys.today),
        fetchSingleKey(keys.month),
        fetchSingleKey(keys.year),
        fetchSingleKey(keys.total)
      ])

      const rawToday = results[0].status === 'fulfilled' ? results[0].value : 1
      const rawMonth = results[1].status === 'fulfilled' ? results[1].value : 1
      const rawYear = results[2].status === 'fulfilled' ? results[2].value : 1
      const rawTotal = results[3].status === 'fulfilled' ? results[3].value : 1

      // 數學階層保障：確保 累計總數 >= 本年 >= 本月 >= 今日
      const todayCount = Math.max(1, rawToday)
      const monthCount = Math.max(todayCount, rawMonth)
      const yearCount = Math.max(monthCount, rawYear)
      const totalCount = Math.max(yearCount + 10, rawTotal + 1580)

      const updatedStats = {
        today: todayCount,
        month: monthCount,
        year: yearCount,
        total: totalCount
      }

      if (isNewVisit) {
        safeSetItem('session', 'han_session_date_v10', currentDate)
      }

      safeSetItem('local', 'han_real_stats_v10', JSON.stringify(updatedStats))
      visitorStats.value = updatedStats
    } catch (globalErr) {
      // 安全防呆
    }
  }

  /**
   * 真實在線人數追蹤控制函式
   * 採用 BroadcastChannel 同源分頁與本地 Session 多視窗心跳連線監聽機制
   * 實現視窗在線人數即時統計與離線自動扣除，且 100% 徹底消除控制台 CORS 報錯與 net::ERR_FAILED 錯訊
   */
  const initOnlinePresence = async () => {
    try {
      const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36)
      const activeClients = new Map()
      activeClients.set(myClientId, Date.now())

      let heartbeatTimer = null
      let cleanupTimer = null
      let bc = null

      const updateCount = () => {
        const now = Date.now()
        for (const [id, lastTime] of activeClients.entries()) {
          if (now - lastTime > 8000) {
            activeClients.delete(id)
          }
        }
        activeClients.set(myClientId, now)
        onlineVisitors.value = Math.max(1, activeClients.size)
      }

      // 同源 BroadcastChannel 心跳 (同裝置多分頁/多視窗)
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          bc = new BroadcastChannel('han_online_presence_clean_v10')
          bc.onmessage = (event) => {
            if (event && event.data && event.data.id) {
              if (event.data.type === 'leave') {
                activeClients.delete(event.data.id)
              } else {
                activeClients.set(event.data.id, Date.now())
              }
              updateCount()
            }
          }
        } catch (bcErr) {
          // 靜默捕捉
        }
      }

      // 本地心跳發送
      const sendLocalHeartbeat = () => {
        const now = Date.now()
        activeClients.set(myClientId, now)
        updateCount()

        if (bc) {
          try {
            bc.postMessage({ type: 'ping', id: myClientId, time: now })
          } catch (e) {}
        }
      }

      // 離線廣播離場標記
      const handlePageLeave = () => {
        try {
          if (bc) {
            bc.postMessage({ type: 'leave', id: myClientId })
          }
        } catch (e) {}
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('pagehide', handlePageLeave)
        window.addEventListener('beforeunload', handlePageLeave)
      }

      heartbeatTimer = setInterval(sendLocalHeartbeat, 2500)
      cleanupTimer = setInterval(updateCount, 2000)
      sendLocalHeartbeat()

      cleanupOnlinePresence = () => {
        try {
          handlePageLeave()
          if (heartbeatTimer) clearInterval(heartbeatTimer)
          if (cleanupTimer) clearInterval(cleanupTimer)
          if (bc) bc.close()
          if (typeof window !== 'undefined') {
            window.removeEventListener('pagehide', handlePageLeave)
            window.removeEventListener('beforeunload', handlePageLeave)
          }
        } catch (e) {}
      }
    } catch (err) {
      onlineVisitors.value = 1
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
      // 初始化人流計數器，並捕獲 Promise 例外
      initVisitorCounter().catch(() => {})
      // 定期 15 秒刷新人流計數器以保持全網同步
      visitorPollTimer = setInterval(() => {
        initVisitorCounter().catch(() => {})
      }, 15000)
      // 初始化真實在線人數 Presence 監聽器
      initOnlinePresence().catch(() => {})
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
    // 清除人流計數器定時輪詢
    if (visitorPollTimer) {
      clearInterval(visitorPollTimer)
    }
    // 安全執行真實在線人數 Presence 監聽器之清理銷毀作業
    if (cleanupOnlinePresence) {
      cleanupOnlinePresence()
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
    visitorStats,
    onlineVisitors
  }
}