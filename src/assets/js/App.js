// 全站共用左側名片的打字機與深淺色主題切換業務邏輯控制檔案
// 採用組合式 API (Composition API) 撰寫，方便功能模組化抽離

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { switchLanguage } from '@/i18n/index.js'

/**
 * 建立並導出全站外殼專用的核心邏輯控制函式
 * 供 App.vue 解構與引用
 */
export function useAppView() {

  // 取得 Vue I18n 實例
  const { locale } = useI18n()

  // 當前使用的語系標籤（zh-TW 或 en）
  const currentLocale = computed(() => locale.value)

  // 根據語系動態切換打字機要印出的文字內容
  const getFullText = () => {
    if (locale.value === 'en') {
      return 'Optimistic, Motivated, Diligent, Proactive'
    } else if (locale.value === 'ja') {
      return '明るい・前向き・向上心・行動力'
    }
    return '個性樂觀、熱衷學習、刻苦勤勞、積極進取'
  }

  // 【打字機變數】建立一個初始值為空字串的響應式變數，儲存目前已印出的文字
  const displayText = ref('')

  // 【打字機索引】記錄打字機跑到的字元位置
  let currentIndex = 0

  // 【打字機計時器】儲存定時器實例
  let typeTimer = null

  /**
   * 【打字機核心函式】執行逐字打字效果
   */
  const typeEffect = () => {
    const fullText = getFullText()
    if (currentIndex < fullText.length) {
      displayText.value += fullText.charAt(currentIndex)
      currentIndex++
      typeTimer = setTimeout(typeEffect, 100)
    }
  }

  /**
   * 【重置打字機函式】切換語言時重置打字進度並重新啟動打字效果
   */
  const resetTypewriter = () => {
    if (typeTimer) clearTimeout(typeTimer)
    displayText.value = ''
    currentIndex = 0
    typeEffect()
  }

  // 監聽語系切換：當語言改變時，重新啟動打字機效果
  watch(locale, () => {
    resetTypewriter()
  })

  /**
   * 【語言切換函式】在繁體中文 (zh-TW)、英文 (en) 與日文 (ja) 之間循環切換
   */
  const toggleLanguage = () => {
    let targetLocale = 'en'
    if (locale.value === 'zh-TW') {
      targetLocale = 'en'
    } else if (locale.value === 'en') {
      targetLocale = 'ja'
    } else {
      targetLocale = 'zh-TW'
    }
    switchLanguage(targetLocale)
  }

  // 【主題變數】預設值設定為 true 代表深色黑夜模式
  const isDarkMode = ref(true)

  // 【主題提示變數】控制右下角開燈/關燈趣味提示氣泡的隱現
  const showThemeTip = ref(true)
  let themeTipTimer = null

  // 【置頂按鈕顯示變數】控制回到頂部按鈕的顯示狀態
  const showScrollTopBtn = ref(false)

  // 【全站頂部捲動進度條變數】記錄目前頁面滾動百分比 (0 至 100)
  const scrollProgress = ref(0)

  // 【計算頁面捲動百分比函式】
  const updateScrollProgress = () => {
    if (typeof window === 'undefined') return
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (scrollHeight <= 0) {
      scrollProgress.value = 0
      return
    }
    const progress = (scrollTop / scrollHeight) * 100
    scrollProgress.value = Math.min(100, Math.max(0, progress))
  }

  // 【路由監聽】取得當前路由物件以追蹤頁面切換
  const route = useRoute()

  // 監聽路由路徑變化：切換不同分頁時自動回到最頂部並重置進度條
  watch(
    () => route.path,
    () => {
      showScrollTopBtn.value = false
      window.scrollTo(0, 0)
      scrollProgress.value = 0
    }
  )

  // 【滾動監聽函式】監聽垂直滾動高度決定顯示置頂按鈕與更新進度條
  const handleScroll = () => {
    updateScrollProgress()
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const maxScrollHeight = scrollHeight - clientHeight
    if (maxScrollHeight > 150 && window.scrollY > 100) {
      showScrollTopBtn.value = window.scrollY > (maxScrollHeight / 2)
    } else {
      showScrollTopBtn.value = false
    }
  }

  // 【平滑置頂函式】執行視窗平滑滾動回頁首
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * 【主題切換函式】切換深淺色主題模式
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

  // 人流計數器變數
  const visitorStats = ref({
    today: 1,
    month: 1,
    year: 1,
    total: 1
  })

  // 在線人數變數
  const onlineVisitors = ref(1)

  // 儲存 Presence 監聽器的銷毀清理控制函式
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
    } catch (e) { }
  }

  /**
   * 真實雲端動態人流計數器初始化與遞增函式
   */
  const initVisitorCounter = async () => {
    try {
      const now = new Date()
      const yr = String(now.getFullYear())
      const mo = String(now.getMonth() + 1).padStart(2, '0')
      const dy = String(now.getDate()).padStart(2, '0')

      const apiKeyToday = `t${yr}${mo}${dy}`
      const apiKeyMonth = `m${yr}${mo}`
      const apiKeyYear = `y${yr}`
      const apiKeyTotal = 'totalv15'

      const cacheKeyToday = `hanstat${apiKeyToday}`
      const cacheKeyMonth = `hanstat${apiKeyMonth}`
      const cacheKeyYear = `hanstat${apiKeyYear}`
      const cacheKeyTotal = `hanstat${apiKeyTotal}`

      const cachedToday = parseInt(safeGetItem('local', cacheKeyToday) || '0', 10) || 0
      const cachedMonth = parseInt(safeGetItem('local', cacheKeyMonth) || '0', 10) || 0
      const cachedYear = parseInt(safeGetItem('local', cacheKeyYear) || '0', 10) || 0
      const cachedTotal = parseInt(safeGetItem('local', cacheKeyTotal) || '0', 10) || 0

      const sessionKey = `hanses${apiKeyToday}`
      const isNewSession = !safeGetItem('session', sessionKey)

      if (!isNewSession) {
        visitorStats.value = {
          today: Math.max(1, cachedToday),
          month: Math.max(Math.max(1, cachedToday), cachedMonth),
          year: Math.max(Math.max(1, cachedToday), Math.max(cachedMonth, cachedYear)),
          total: Math.max(Math.max(1, cachedYear), cachedTotal)
        }
        return
      }

      const fetchUpKey = async (apiKey, cachedVal) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3500)

        try {
          const url = `https://api.counterapi.dev/v1/hanjohn_profile_site/${apiKey}/up`
          const res = await fetch(url, { signal: controller.signal })

          clearTimeout(timeoutId)
          if (res.ok) {
            const data = await res.json()
            const val = typeof data.count === 'number' ? data.count : (typeof data.value === 'number' ? data.value : null)
            if (val !== null && val > 0) {
              return val
            }
          }
        } catch (e) { }

        return cachedVal + 1
      }

      const results = await Promise.allSettled([
        fetchUpKey(apiKeyToday, cachedToday),
        fetchUpKey(apiKeyMonth, cachedMonth),
        fetchUpKey(apiKeyYear, cachedYear),
        fetchUpKey(apiKeyTotal, cachedTotal)
      ])

      const rawToday = results[0].status === 'fulfilled' ? results[0].value : cachedToday + 1
      const rawMonth = results[1].status === 'fulfilled' ? results[1].value : cachedMonth + 1
      const rawYear = results[2].status === 'fulfilled' ? results[2].value : cachedYear + 1
      const rawTotal = results[3].status === 'fulfilled' ? results[3].value : cachedTotal + 1

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

      safeSetItem('session', sessionKey, '1')
      safeSetItem('local', cacheKeyToday, String(todayCount))
      safeSetItem('local', cacheKeyMonth, String(monthCount))
      safeSetItem('local', cacheKeyYear, String(yearCount))
      safeSetItem('local', cacheKeyTotal, String(totalCount))

      visitorStats.value = updatedStats
    } catch (globalErr) { }
  }

  /**
   * 在線人數 Presence 統計控制函式
   */
  const initOnlinePresence = async () => {
    try {
      const myClientId = 'cli_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36)
      const activeClients = new Map()
      activeClients.set(myClientId, Date.now())

      let heartbeatTimer = null
      let bc = null
      const TIMEOUT_MS = 6000
      const TABS_KEY = 'han_active_tabs_v16'

      const updateCount = () => {
        const now = Date.now()
        for (const [id, lastTime] of activeClients.entries()) {
          if (now - lastTime > TIMEOUT_MS) {
            activeClients.delete(id)
          }
        }
        activeClients.set(myClientId, now)
        onlineVisitors.value = Math.max(1, activeClients.size)
      }

      if (typeof BroadcastChannel !== 'undefined') {
        try {
          bc = new BroadcastChannel('han_presence_v16')
          bc.onmessage = (event) => {
            if (event && event.data) {
              if (event.data.type === 'leave') {
                activeClients.delete(event.data.id)
                onlineVisitors.value = Math.max(1, activeClients.size)
              } else if (event.data.type === 'ping') {
                activeClients.set(event.data.id, Date.now())
                onlineVisitors.value = Math.max(1, activeClients.size)
              }
            }
          }
        } catch (bcErr) { }
      }

      const sendLocalHeartbeat = () => {
        const now = Date.now()
        activeClients.set(myClientId, now)

        let tabs = {}
        try {
          const saved = localStorage.getItem(TABS_KEY)
          if (saved) tabs = JSON.parse(saved)
        } catch (e) { }

        tabs[myClientId] = now

        for (const [id, lastTime] of Object.entries(tabs)) {
          if (now - lastTime > TIMEOUT_MS) {
            delete tabs[id]
          } else {
            activeClients.set(id, lastTime)
          }
        }

        try {
          localStorage.setItem(TABS_KEY, JSON.stringify(tabs))
        } catch (e) { }

        updateCount()

        if (bc) {
          try {
            bc.postMessage({ type: 'ping', id: myClientId, time: now })
          } catch (e) { }
        }
      }

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
          } catch (e) { }

          // 廣播離場訊息，讓同瀏覽器的其他分頁即時扣減人數
          if (bc) {
            bc.postMessage({ type: 'leave', id: myClientId })
          }
        } catch (e) { }
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
          } catch (err) { }
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
        } catch (e) { }
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
      initVisitorCounter().catch(() => { })
      initOnlinePresence().catch(() => { })
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', updateScrollProgress)
        updateScrollProgress()
      }
      themeTipTimer = setTimeout(() => {
        showThemeTip.value = false
      }, 8000)
    } catch (e) { }
  })

  /**
   * 註冊組件銷毀前的生命週期鉤子
   * 移除滾動監聽與定時任務
   */
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollProgress)
    }
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
    onlineVisitors,
    currentLocale,
    toggleLanguage,
    scrollProgress
  }
}