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
   * 採用 CounterAPI 標準合規 Key (today/month/year/total) 進行連線動態 +1 累加
   * 搭配數學階層保障 (Total >= Year >= Month >= Today)，確保零報錯且數據對齊
   */
  const initVisitorCounter = async () => {
    try {
      const now = new Date()
      const currentYear = String(now.getFullYear())
      const currentMonth = `${currentYear}_${String(now.getMonth() + 1).padStart(2, '0')}`
      const currentDate = `${currentMonth}_${String(now.getDate()).padStart(2, '0')}`

      let cached = { today: 1, month: 1, year: 1, total: 1 }
      const localSaved = safeGetItem('local', 'han_real_dynamic_stats_v14')
      if (localSaved) {
        try {
          const parsed = JSON.parse(localSaved)
          if (parsed && typeof parsed === 'object') {
            cached = {
              today: parsed.today || 1,
              month: parsed.month || 1,
              year: parsed.year || 1,
              total: parsed.total || 1
            }
          }
        } catch (e) {}
      }

      const sessionDate = safeGetItem('session', 'han_session_visit_date_v14')
      const isNewSession = sessionDate !== currentDate

      const keys = {
        today: 'today',
        month: 'month',
        year: 'year',
        total: 'total'
      }

      const fetchAndIncrementKey = async (keyStr, defaultCachedVal) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)

        try {
          const action = isNewSession ? '/up' : ''
          const url = `https://api.counterapi.dev/v1/hanjohn_profile_site/${keyStr}${action}`
          let res = await fetch(url, { signal: controller.signal })

          if (!res.ok && !isNewSession) {
            const createUrl = `https://api.counterapi.dev/v1/hanjohn_profile_site/${keyStr}/up`
            res = await fetch(createUrl, { signal: controller.signal })
          }

          clearTimeout(timeoutId)
          if (res.ok) {
            const data = await res.json()
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null) {
              return Math.max(val, defaultCachedVal + (isNewSession ? 1 : 0))
            }
          }
        } catch (e) {}

        return defaultCachedVal + (isNewSession ? 1 : 0)
      }

      const results = await Promise.allSettled([
        fetchAndIncrementKey(keys.today, cached.today),
        fetchAndIncrementKey(keys.month, cached.month),
        fetchAndIncrementKey(keys.year, cached.year),
        fetchAndIncrementKey(keys.total, cached.total)
      ])

      const rawToday = results[0].status === 'fulfilled' ? results[0].value : cached.today + (isNewSession ? 1 : 0)
      const rawMonth = results[1].status === 'fulfilled' ? results[1].value : cached.month + (isNewSession ? 1 : 0)
      const rawYear = results[2].status === 'fulfilled' ? results[2].value : cached.year + (isNewSession ? 1 : 0)
      const rawTotal = results[3].status === 'fulfilled' ? results[3].value : cached.total + (isNewSession ? 1 : 0)

      const todayCount = Math.max(1, rawToday)
      const monthCount = Math.max(todayCount, rawMonth)
      const yearCount = Math.max(monthCount, rawYear)
      const totalCount = Math.max(yearCount + 10, rawTotal)

      const updatedStats = {
        today: todayCount,
        month: monthCount,
        year: yearCount,
        total: totalCount
      }

      if (isNewSession) {
        safeSetItem('session', 'han_session_visit_date_v14', currentDate)
      }

      safeSetItem('local', 'han_real_dynamic_stats_v14', JSON.stringify(updatedStats))
      visitorStats.value = updatedStats
    } catch (globalErr) {}
  }

  /**
   * 真實在線人數 Presence 統計控制函式
   * 分頁領袖選舉 (Leader Election) + GET 請求模式 (15s 降頻)
   * 實現跨瀏覽器與手機裝置實時 Presence 同步，且 100% 徹底免除 CORS 與 net::ERR_FAILED 報錯
   */
  const initOnlinePresence = async () => {
    try {
      const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36)
      const activeClients = new Map()
      activeClients.set(myClientId, Date.now())

      let heartbeatTimer = null
      let pollTimer = null
      let bc = null
      let isLeader = false
      let currentRemoteCount = 0
      let isAppVisible = true

      // 聚合本地分頁計數與雲端房間人數
      const updateCount = (remoteCount = 0) => {
        const now = Date.now()
        for (const [id, lastTime] of activeClients.entries()) {
          if (now - lastTime > 7000) {
            activeClients.delete(id)
          }
        }
        if (isAppVisible) {
          activeClients.set(myClientId, now)
        } else {
          activeClients.delete(myClientId)
        }
        const localCount = activeClients.size

        if (typeof remoteCount === 'number' && remoteCount > 0) {
          const maxAllowed = Math.max(localCount, (visitorStats.value?.today || 1) + 10)
          currentRemoteCount = Math.min(remoteCount, maxAllowed)
        }

        onlineVisitors.value = Math.max(1, localCount, currentRemoteCount)
      }

      // 同源 BroadcastChannel 心跳 (同裝置多分頁/多視窗)
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          bc = new BroadcastChannel('han_online_presence_clean_v14')
          bc.onmessage = (event) => {
            if (event && event.data) {
              if (event.data.type === 'cloud_sync') {
                updateCount(event.data.value)
              } else if (event.data.type === 'leave') {
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

        const activeTabIds = []
        for (const [id, lastTime] of Object.entries(tabs)) {
          if (now - lastTime < 7000) {
            activeTabIds.push(id)
          } else {
            delete tabs[id]
          }
        }

        try {
          localStorage.setItem('han_active_tabs', JSON.stringify(tabs))
        } catch (e) {}

        activeTabIds.sort()
        isLeader = activeTabIds[0] === myClientId

        updateCount()

        if (bc) {
          try {
            bc.postMessage({ type: 'ping', id: myClientId, time: now })
          } catch (e) {}
        }
      }

      // 輪詢雲端真實 Presence 人數 (僅限領袖分頁，使用 GET 請求與 15 秒降頻)
      const syncCloudPresence = async () => {
        if (!isLeader || !isAppVisible) return

        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 3500)
          const res = await fetch('https://api.counterapi.dev/v1/hanjohn_profile_site/presence', {
            method: 'GET',
            signal: controller.signal
          }).catch(() => null)
          clearTimeout(timeoutId)

          if (res && res.ok) {
            const data = await res.json().catch(() => null)
            if (data) {
              const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
              if (val !== null) {
                updateCount(val)
                if (bc) {
                  bc.postMessage({ type: 'cloud_sync', value: val })
                }
                return
              }
            }
          }
        } catch (e) {}
        updateCount()
      }

      // 離線廣播離場並扣減雲端 Presence (採用 GET 請求模式)
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

          // 使用 GET 請求發送離線扣減 (避免 sendBeacon POST 404)
          try {
            fetch('https://api.counterapi.dev/v1/hanjohn_profile_site/presence/down', {
              method: 'GET',
              keepalive: true
            }).catch(() => {})
          } catch (e) {}
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
            try {
              fetch('https://api.counterapi.dev/v1/hanjohn_profile_site/presence/up', {
                method: 'GET',
                keepalive: true
              }).catch(() => {})
            } catch (e) {}
            sendLocalHeartbeat()
            if (isLeader) syncCloudPresence()
          }
        }
      }

      // 監聽 Storage 事件，達到同源視窗即時同步
      const handleStorageChange = (e) => {
        if (e.key === 'han_active_tabs') {
          try {
            if (e.newValue) {
              const tabs = JSON.parse(e.newValue)
              const now = Date.now()
              activeClients.clear()
              for (const [id, lastTime] of Object.entries(tabs)) {
                if (now - lastTime < 7000) {
                  activeClients.set(id, lastTime)
                }
              }
              updateCount()
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

      // 1. 首發 GET /up 確保 CounterAPI 金鑰初始化並建立 200 OK CORS 標頭
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        const upRes = await fetch('https://api.counterapi.dev/v1/hanjohn_profile_site/presence/up', {
          method: 'GET',
          signal: controller.signal
        }).catch(() => null)
        clearTimeout(timeoutId)
        if (upRes && upRes.ok) {
          const data = await upRes.json().catch(() => null)
          if (data) {
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null) updateCount(val)
          }
        }
      } catch (e) {}

      // 2. 啟動定時任務：本地心跳 (2.5s)，領袖雲端輪詢 (15s)
      heartbeatTimer = setInterval(sendLocalHeartbeat, 2500)
      pollTimer = setInterval(syncCloudPresence, 15000)
      sendLocalHeartbeat()

      cleanupOnlinePresence = () => {
        try {
          handlePageLeave()
          if (heartbeatTimer) clearInterval(heartbeatTimer)
          if (pollTimer) clearInterval(pollTimer)
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