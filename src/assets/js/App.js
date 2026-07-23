// 全站共用左側名片的打字機與深淺色主題切換業務邏輯控制檔案
// 採用組合式 API (Composition API) 撰寫，方便功能模組化抽離

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 建立並導出全站外殼專用的核心邏輯控制函式
 * 供 App.vue 解備份與引用
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

  // 監聽路由路徑變化：當切換不同分頁時，協助回到最頂部
  watch(
    () => route.path,
    () => {
      showScrollTopBtn.value = false
      window.scrollTo(0, 0)
    }
  )

  // 【滾動監聽函式】監聽垂直滾動高度是否超過可滾動範圍的一半（滑到頁面中間）以決定顯示或隱藏按鈕
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const maxScrollHeight = scrollHeight - clientHeight
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
    if (currentIndex < fullText.length) {
      displayText.value += fullText.charAt(currentIndex)
      currentIndex++
      typeTimer = setTimeout(typeEffect, 120)
    }
  }

  /**
   * 【主題切換函式】宣告切換深淺色主題模式的控制函式
   */
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    showThemeTip.value = false
    if (isDarkMode.value) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
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

  // 安全讀取與寫入 Storage 之防呆輔助函式
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
    } catch (e) {}
  }

  /**
   * 真實雲端動態人流計數器初始化與遞增函式
   * today/month/year 的 API Key 均帶入當前日期後綴（純英數字拼接，如 t20260723），
   * 使其在不同日期、月份或年份時自動使用新的獨立計數器，模擬「換日/月/年歸零」的效果。
   * 注意：API Key 中嚴禁使用底線 _，底線會導致 CounterAPI 回傳 301 重導向而丟失 CORS 標頭。
   * 僅 totalv15 使用固定 Key，確保累積總數持續增加。
   * 搭配數學階層保障 (Total >= Year >= Month >= Today)，確保零報錯且數據對齊。
   */
  const initVisitorCounter = async () => {
    try {
      const now = new Date()
      const yr = String(now.getFullYear())                                        // 年份字串，如 2026
      const mo = String(now.getMonth() + 1).padStart(2, '0')                     // 月份字串，如 07
      const dy = String(now.getDate()).padStart(2, '0')                           // 日期字串，如 23

      // 純英數字拼接的 API key（嚴禁底線，底線會觸發 CounterAPI 的 301 重導向 CORS 報錯）
      const apiKeyToday = `t${yr}${mo}${dy}`                                     // 如 t20260723
      const apiKeyMonth = `m${yr}${mo}`                                          // 如 m202607
      const apiKeyYear  = `y${yr}`                                               // 如 y2026
      const apiKeyTotal = 'totalv15'                                             // 固定累計 key

      // 各計數器對應的 localStorage 快取 key（以 apiKey 為後綴，確保換日後不讀到舊的快取）
      const cacheKeyToday = `hanstat${apiKeyToday}`
      const cacheKeyMonth = `hanstat${apiKeyMonth}`
      const cacheKeyYear  = `hanstat${apiKeyYear}`
      const cacheKeyTotal = `hanstat${apiKeyTotal}`

      // 分別讀取各週期的快取值，若沒有就預設為 0（新的週期從 0 起算）
      const cachedToday = parseInt(safeGetItem('local', cacheKeyToday) || '0', 10) || 0
      const cachedMonth = parseInt(safeGetItem('local', cacheKeyMonth) || '0', 10) || 0
      const cachedYear = parseInt(safeGetItem('local', cacheKeyYear) || '0', 10) || 0
      const cachedTotal = parseInt(safeGetItem('local', cacheKeyTotal) || '0', 10) || 0

      // 判斷是否為本次瀏覽器會話的第一次造訪（換日後 sessionKey 不同，視為新會話）
      const sessionKey = `hanses${apiKeyToday}`                                   // 如 hansest20260723（純英數字）
      const isNewSession = !safeGetItem('session', sessionKey)

      // 通用的 API 呼叫函式：新會話時呼叫 /up 遞增計數，舊會話時只讀取當前值
      const fetchAndIncrementKey = async (apiKey, cachedVal) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)

        try {
          const action = isNewSession ? '/up' : ''
          const url = `https://api.counterapi.dev/v1/hanjohn_profile_site/${apiKey}${action}`
          let res = await fetch(url, { signal: controller.signal })

          // 若讀取時 API 回傳非 ok（可能計數器還不存在），改以 /up 方式建立並遞增
          if (!res.ok && !isNewSession) {
            const createUrl = `https://api.counterapi.dev/v1/hanjohn_profile_site/${apiKey}/up`
            res = await fetch(createUrl, { signal: controller.signal })
          }

          clearTimeout(timeoutId)
          if (res.ok) {
            const data = await res.json()
            // 相容 counterapi.dev 兩種可能的回應欄位名稱
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null && val > 0) {
              return val
            }
          }
        } catch (e) {}

        // API 失敗時以快取值為基準：新會話則 +1，舊會話維持原值
        return cachedVal + (isNewSession ? 1 : 0)
      }

      // 並行呼叫四個計數器 API
      const results = await Promise.allSettled([
        fetchAndIncrementKey(apiKeyToday, cachedToday),
        fetchAndIncrementKey(apiKeyMonth, cachedMonth),
        fetchAndIncrementKey(apiKeyYear, cachedYear),
        fetchAndIncrementKey(apiKeyTotal, cachedTotal)
      ])

      const rawToday = results[0].status === 'fulfilled' ? results[0].value : cachedToday + (isNewSession ? 1 : 0)
      const rawMonth = results[1].status === 'fulfilled' ? results[1].value : cachedMonth + (isNewSession ? 1 : 0)
      const rawYear = results[2].status === 'fulfilled' ? results[2].value : cachedYear + (isNewSession ? 1 : 0)
      const rawTotal = results[3].status === 'fulfilled' ? results[3].value : cachedTotal + (isNewSession ? 1 : 0)

      // 確保階層邏輯：今日 <= 本月 <= 本年 <= 累計，且各值至少為 1
      const todayCount = Math.max(1, rawToday)
      const monthCount = Math.max(todayCount, rawMonth)
      const yearCount = Math.max(monthCount, rawYear)
      const totalCount = Math.max(yearCount, rawTotal)

      const updatedStats = {
        today: todayCount,
        month: monthCount,
        year: yearCount,
        total: totalCount
      }

      // 將新值寫回各自帶日期的 localStorage key，下次進入時可作為 fallback 快取使用
      if (isNewSession) {
        safeSetItem('session', sessionKey, '1')
      }
      safeSetItem('local', cacheKeyToday, String(todayCount))
      safeSetItem('local', cacheKeyMonth, String(monthCount))
      safeSetItem('local', cacheKeyYear, String(yearCount))
      safeSetItem('local', cacheKeyTotal, String(totalCount))

      visitorStats.value = updatedStats
    } catch (globalErr) {}
  }

  /**
   * 在線人數 Presence 統計控制函式
   * 採用同源 BroadcastChannel 心跳、Storage 視窗事件與 localStorage 分頁 ID 註冊
   * 支援同一瀏覽器跨分頁/跨視窗同步；跨不同瀏覽器或跨裝置因 localStorage 各自獨立無法互通，為技術限制
   * 100% 零外連請求，徹底消除所有 CORS 與 net::ERR_FAILED 控制台報錯
   */
  const initOnlinePresence = async () => {
    try {
      const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36)
      const activeClients = new Map()
      activeClients.set(myClientId, Date.now())

      let heartbeatTimer = null
      let bc = null
      let isAppVisible = true

      // 逾時閾值：超過此毫秒數未心跳的分頁視為離線（心跳 1.5s，逾時設 6s 提供足夠緩衝）
      const TIMEOUT_MS = 6000

      // 更新在線人數統計與清理逾時分頁
      const updateCount = () => {
        const now = Date.now()
        for (const [id, lastTime] of activeClients.entries()) {
          if (now - lastTime > TIMEOUT_MS) {
            activeClients.delete(id)
          }
        }
        // 若當前分頁為可見狀態，確保自己在 Map 中有最新時間戳
        if (isAppVisible) {
          activeClients.set(myClientId, now)
        } else {
          activeClients.delete(myClientId)
        }
        onlineVisitors.value = Math.max(1, activeClients.size)
      }

      // 同源 BroadcastChannel 心跳 (同裝置多分頁/多視窗)
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          bc = new BroadcastChannel('han_online_presence_clean_v14')
          bc.onmessage = (event) => {
            if (event && event.data) {
              if (event.data.type === 'leave') {
                activeClients.delete(event.data.id)
                updateCount()
              } else if (event.data.type === 'ping') {
                activeClients.set(event.data.id, Date.now())
                updateCount()
              }
            }
          }
        } catch (bcErr) {}
      }

      // 本地心跳發送與分頁註冊更新
      const sendLocalHeartbeat = () => {
        if (!isAppVisible) return

        const now = Date.now()
        activeClients.set(myClientId, now)

        let tabs = {}
        try {
          const saved = localStorage.getItem('han_active_tabs')
          if (saved) tabs = JSON.parse(saved)
        } catch (e) {}

        tabs[myClientId] = now

        for (const [id, lastTime] of Object.entries(tabs)) {
          if (now - lastTime > TIMEOUT_MS) {
            // 超過逾時閾值的分頁記錄從 localStorage 清除
            delete tabs[id]
          } else {
            activeClients.set(id, lastTime)
          }
        }

        try {
          localStorage.setItem('han_active_tabs', JSON.stringify(tabs))
        } catch (e) {}

        updateCount()

        if (bc) {
          try {
            bc.postMessage({ type: 'ping', id: myClientId, time: now })
          } catch (e) {}
        }
      }

      // 離線廣播離場並自 Storage 移除
      const handlePageLeave = () => {
        try {
          activeClients.delete(myClientId)
          try {
            const saved = localStorage.getItem('han_active_tabs')
            if (saved) {
              const tabs = JSON.parse(saved)
              delete tabs[myClientId]
              localStorage.setItem('han_active_tabs', JSON.stringify(tabs))
            }
          } catch (e) {}

          if (bc) {
            bc.postMessage({ type: 'leave', id: myClientId })
          }
          updateCount()
        } catch (e) {}
      }

      // 處理頁面切換至背景 (Hidden) 或回到前台 (Visible)
      const handleVisibilityChange = () => {
        if (typeof document === 'undefined') return

        if (document.visibilityState === 'hidden') {
          if (isAppVisible) {
            isAppVisible = false
            handlePageLeave()
          }
        } else if (document.visibilityState === 'visible') {
          if (!isAppVisible) {
            isAppVisible = true
            sendLocalHeartbeat()
          }
        }
      }

      // 監聽 Storage 事件：當同一瀏覽器的其他分頁更新 localStorage 時觸發，實現跨分頁即時同步
      // 注意：storage 事件不會在寫入的當前分頁觸發，只在其他分頁觸發，這是瀏覽器的標準行為
      const handleStorageChange = (e) => {
        if (e.key === 'han_active_tabs') {
          try {
            if (e.newValue) {
              const tabs = JSON.parse(e.newValue)
              const now = Date.now()
              // 清空並從 localStorage 完整重建在線分頁列表
              activeClients.clear()
              for (const [id, lastTime] of Object.entries(tabs)) {
                if (now - lastTime < TIMEOUT_MS) {
                  activeClients.set(id, lastTime)
                }
              }
              // 重建後補回自己的 myClientId（自己的心跳只存在 Map 中，不一定即時在 localStorage 的最新值裡）
              if (isAppVisible) {
                activeClients.set(myClientId, now)
              }
              onlineVisitors.value = Math.max(1, activeClients.size)
            }
          } catch (err) {}
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('pagehide', handlePageLeave)
        window.addEventListener('beforeunload', handlePageLeave)
        window.addEventListener('storage', handleStorageChange)
      }

      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', handleVisibilityChange)
      }

      // 啟動定時本地心跳任務（每 1.5 秒更新一次，確保在 6 秒逾時前至少發送 3 次心跳）
      heartbeatTimer = setInterval(sendLocalHeartbeat, 1500)
      sendLocalHeartbeat()

      cleanupOnlinePresence = () => {
        try {
          handlePageLeave()
          if (heartbeatTimer) clearInterval(heartbeatTimer)
          if (bc) bc.close()
          if (typeof window !== 'undefined') {
            window.removeEventListener('pagehide', handlePageLeave)
            window.removeEventListener('beforeunload', handlePageLeave)
            window.removeEventListener('storage', handleStorageChange)
          }
          if (typeof document !== 'undefined') {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
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
      typeEffect()
      initVisitorCounter().catch(() => {})
      initOnlinePresence().catch(() => {})
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll)
      }
      themeTipTimer = setTimeout(() => {
        showThemeTip.value = false
      }, 8000)
    } catch (e) {}
  })

  /**
   * 註冊組件銷毀前的生命週期鉤子
   * 移除滾動監聽與定時任務
   */
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (typeTimer) clearTimeout(typeTimer)
    if (themeTipTimer) clearTimeout(themeTipTimer)
    if (cleanupOnlinePresence) cleanupOnlinePresence()
  })

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