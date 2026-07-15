// 個人大首頁（經歷分頁）的抽離式組合式業務邏輯控制檔案
// 使用 Composition API 寫法，將資料層與視圖層完全分離，極方便日後擴充與維護

import { ref } from 'vue'

/**
 * 建立並導出經歷分頁專用的核心邏輯控制函式
 * 供 HomeView.vue 引入解構使用
 */
export function useHomeView() {

  // 經歷響應式陣列：利用 ref 包裹經歷清單，使其具備 Vue 雙向綁定的資料追蹤能力 (依結束日期由新到舊降冪排序)
  const experiences = ref([
    {
      id: 1,
      company: '崑山科技大學 創新教學中心',
      role: '專任行政助理',
      period: '2019.09 - 2025.09',
      tags: ['行政事務', '研討會籌辦', '文書資料處理', '人員接待'],
      summary: '整理會議資料、處理日常行政公文業務，並協助籌辦教學助理研討會、專案講座與培訓課程等大型活動。',
      accentClass: 'accent-design', // 套用設計隨彩紫粉色漸變彩線
      links: [
        { title: '活動成果：中央社新聞報導', url: 'https://www.cna.com.tw/postwrite/chi/306901' },
        { title: '活動成果：校園焦點新聞', url: 'https://www.ksu.edu.tw/focusNews/detail/10139' }
      ]
    },
    {
      id: 2,
      company: '教育部學海築夢計畫 - 日本大阪株式會社 TAT',
      role: '海外實習',
      period: '2025.07 - 2025.09',
      tags: ['海外實習', '日本敬業文化', '行銷實務', '影音廣告'],
      summary: '通過教育部學海築夢計畫選送赴日本大阪實習。深入綜合商品批發與代理企業，體驗日本嚴謹敬業文化。期間實習團隊主導製作 SUNSTAR 能量棒行銷短影音廣告，提升跨文化交流與專案實務能力。',
      accentClass: 'accent-purple', // 套用智慧紫藍色漸變彩線
      links: [
        { title: '實習企業：株式會社 TAT 官網', url: 'https://www.nailtat.com/companyprofile/' },
        { title: '商品網站：SUNSTAR 能量棒網頁', url: 'https://jp.sunstar.com/health-food/andfasting/product_001.html' },
        { title: '團隊成果：SUNSTAR 能量棒行銷短影音廣告', url: 'images/Aboutimg/TV.mp4' }
      ]
    },
    {
      id: 3,
      company: '崑山科技大學',
      role: '教學助理',
      period: '2020.09 - 2025.08',
      tags: ['課程助教', '教學評量', '教學活動', '專題演講'],
      summary: '擔任數位創新服務、志工領導服務及商務企劃實務等課程助教，協同課程教授進行教學、專題演講與期末考卷批改。',
      accentClass: 'accent-experience', // 套用經歷橘紅漸變彩線
      links: []
    },
    {
      id: 4,
      company: '大學USR永續發展辦公室',
      role: '專任研究助理',
      period: '2023.08 - 2025.07',
      tags: ['計畫執行', '活動規劃', '社會責任', '循環經濟'],
      summary: '參與大學USR永續發展辦公室計畫執行，協助推動循環經濟與ESG相關專案，負責資料彙整、活動規劃與成果視覺化呈現，支援跨團隊專題整合。期間參與全國大專院校競賽專案，協助完成企劃與成果展示，該計畫最終由計畫主持人帶領團隊榮獲全國第3名。',
      accentClass: 'accent-emerald', // 套用淨零綠色漸變彩線
      links: [
        { title: '獲獎新聞：中央社報導', url: 'https://www.cna.com.tw/postwrite/chi/420204' },
        { title: '「烏金」減碳告別除濕機！導入「官田菱殼碳」：東森新聞報導', url: 'https://esg.ettoday.net/news/2958041' }
      ]
    },
    {
      id: 5,
      company: '學生輔導中心',
      role: '兼任行政助理',
      period: '2022.08 - 2025.07',
      tags: ['電腦維護', '資料統計', '素材設計', '檔案管理'],
      summary: '負責辦公室教職員電腦文書軟硬體疑難排解、Google Drive 雲端資料電子化與統計彙整，並協助設計活動平面視覺宣導海報及圖卡。',
      accentClass: 'accent-tools', // 套用工具青綠色漸變彩線
      links: []
    }
  ])

  // 將宣告封裝好的 experiences 經歷陣列變數包裝成物件導出，讓 Vue 組件可以順利抓取渲染
  return {
    experiences
  }
}