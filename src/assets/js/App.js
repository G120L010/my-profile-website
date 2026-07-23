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
   * 核心原則：只有分頁真正關閉（pagehide / beforeunload）才離場，切換至背景分頁不影響在線計數
   */
  const initOnlinePresence = async () => {
    try {
      // 為此分頁產生唯一識別碼，用來在跨分頁通訊中辨識自己
      const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36)

      // 儲存目前已知的在線分頁 ID 與其最後心跳時間戳
      const activeClients = new Map()
      activeClients.set(myClientId, Date.now())

      let heartbeatTimer = null
      let bc = null

      // 逾時閾值：分頁超過 6 秒未發送心跳，視為已離線（心跳頻率 1.5 秒，提供 4 倍緩衝）
      const TIMEOUT_MS = 6000

      // localStorage 的鍵名（升級版本號以清除舊格式資料）
      const TABS_KEY = 'han_active_tabs_v16'

      // 更新在線人數：清理逾時分頁，確保自己永遠計入，再更新響應式數值
      const updateCount = () => {
        const now = Date.now()
        for (const [id, lastTime] of activeClients.entries()) {
          if (now - lastTime > TIMEOUT_MS) {
            activeClients.delete(id)
          }
        }
        // 不論分頁是否在前台，只要此 JS 仍在執行代表分頁開著，永遠把自己計入
        activeClients.set(myClientId, now)
        onlineVisitors.value = Math.max(1, activeClients.size)
      }

      // BroadcastChannel：同一瀏覽器的跨分頁即時訊息通道
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          bc = new BroadcastChannel('han_presence_v16')
          bc.onmessage = (event) => {
            if (event && event.data) {
              if (event.data.type === 'leave') {
                // 其他分頁宣告關閉，將其從在線列表移除
                activeClients.delete(event.data.id)
                onlineVisitors.value = Math.max(1, activeClients.size)
              } else if (event.data.type === 'ping') {
                // 其他分頁發出心跳，更新其時間戳並重新計算人數
                activeClients.set(event.data.id, Date.now())
                onlineVisitors.value = Math.max(1, activeClients.size)
              }
            }
          }
        } catch (bcErr) {}
      }

      // 心跳函式：不論分頁是否在前台，每 1.5 秒持續執行一次
      // 切換到背景分頁（hidden）不會停止心跳，因為背景分頁仍算在線
      const sendLocalHeartbeat = () => {
        const now = Date.now()
        activeClients.set(myClientId, now)

        // 從 localStorage 讀取所有分頁的心跳紀錄
        let tabs = {}
        try {
          const saved = localStorage.getItem(TABS_KEY)
          if (saved) tabs = JSON.parse(saved)
        } catch (e) {}

        // 更新自己的時間戳
        tabs[myClientId] = now

        // 清理逾時分頁並同步至 activeClients
        for (const [id, lastTime] of Object.entries(tabs)) {
          if (now - lastTime > TIMEOUT_MS) {
            delete tabs[id]
          } else {
            activeClients.set(id, lastTime)
          }
        }

        // 將最新的分頁清單寫回 localStorage（觸發其他分頁的 storage 事件）
        try {
          localStorage.setItem(TABS_KEY, JSON.stringify(tabs))
        } catch (e) {}

        updateCount()

        // 透過 BroadcastChannel 廣播心跳（同一瀏覽器其他分頁即時接收）
        if (bc) {
          try {
            bc.postMessage({ type: 'ping', id: myClientId, time: now })
          } catch (e) {}
        }
      }

      // 離場函式：僅在分頁真正關閉時呼叫（pagehide / beforeunload）
      // 切換至背景分頁不會呼叫此函式，以確保背景分頁仍計入在線人數
      const handlePageLeave = () => {
        try {
          activeClients.delete(myClientId)
          try {
            const saved = localStorage.getItem(TABS_KEY)
            if (saved) {
              const tabs = JSON.parse(saved)
              delete tabs[myClientId]
              localStorage.setItem(TABS_KEY, JSON.stringify(tabs))
            }
          } catch (e) {}

          // 廣播離場訊息，讓同瀏覽器的其他分頁即時扣減人數
          if (bc) {
            bc.postMessage({ type: 'leave', id: myClientId })
          }
        } catch (e) {}
      }

      // Storage 事件：當同一瀏覽器的其他分頁更新 localStorage 時觸發
      // storage 事件只會在「其他分頁」觸發，不會在寫入的當前分頁觸發，這是瀏覽器標準行為
      const handleStorageChange = (e) => {
        if (e.key === TABS_KEY) {
          try {
            if (e.newValue) {
              const tabs = JSON.parse(e.newValue)
              const now = Date.now()
              activeClients.clear()
              for (const [id, lastTime] of Object.entries(tabs)) {
                if (now - lastTime < TIMEOUT_MS) {
                  activeClients.set(id, lastTime)
                }
              }
              // storage 事件觸發時，自己的最新時間戳可能尚未反映在 localStorage，補回以確保不漏算
              activeClients.set(myClientId, now)
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

      // 啟動心跳定時器（每 1.5 秒），並立即執行一次以完成初始化
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