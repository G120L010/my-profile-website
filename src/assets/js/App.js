// 全站共用左側名片的打字機與深淺色主題切換業務邏輯控制檔案
// 採用組合式 API (Composition API) 撰寫，方便功能模組化抽離

import { ref, onMounted } from 'vue'

/**
 * 建立並導出全站外殼專用的核心邏輯控制函式
 * 供 App.vue 解構引用
 */
export function useAppView() {
  
  // 【打字機設定】定義要在個人名片上像打字機一樣輸出打印的專業職稱字串
  const fullText = '前端工程師 / Front-End Developer'
  
  // 【打字機變數】建立一個初始值為空字串的響應式變數 (ref)，用來即時儲存目前已經印出來的文字
  const displayText = ref('')
  
  // 【打字機索引】宣告一個普通的整數變數，用來記錄打字機目前跑到了第幾個字元的索引位置
  let currentIndex = 0

  // 【主題變數】建立一個控制全站主題模式的響應式變數，預設值設定為 true 代表深色黑夜模式
  const isDarkMode = ref(true)

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
      setTimeout(typeEffect, 120)
    }
  }

  /**
   * 【主題切換函式】宣告切換深淺色主題模式的控制函式
   */
  const toggleTheme = () => {
    // 將原本儲存黑夜狀態的布林值進行反轉，如果是真(true)就變假(false)，如果是假(false)就變真(true)
    isDarkMode.value = !isDarkMode.value
    
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

  /**
   * 註冊 Vue 的生命週期鉤子
   * 當全站主外殼組件在網頁上正式渲染掛載完畢後自動觸發
   */
  onMounted(() => {
    // 呼叫打字機計時控制函式，正式啟動逐字打印的網頁文字動畫特效
    typeEffect()
    // 網頁初始化一進來時，預設先在 html 標籤打上深色模式的 data-theme="dark" 屬性，確保畫面預設為黑夜模式
    document.documentElement.setAttribute('data-theme', 'dark')
  })

  // 將網頁模板 (Template) 需要用來顯示與點擊綁定的變數及函式完整包裝導出
  return {
    displayText,
    isDarkMode,
    toggleTheme
  }
}