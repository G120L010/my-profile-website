// 精選作品集頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將作品資料徹底模組化抽離

import { ref } from 'vue'

/**
 * 建立並導出作品集分頁專用的核心邏輯控制函式
 * 供 PortfolioView.vue 引入解構使用
 */
export function usePortfolioView() {

  // 作品集響應式陣列：使用 ref 管理作品清單，內容若改變，網頁畫面會自動更新 (依日期由新到舊降冪排序)
  const projects = ref([
    {
      id: 1,
      title: '暖光之丘 - 流浪動物平台 (程式碼創作)',
      summary: '於資展就業養成班培訓期間實作之全端專案。負責購物商城與 AI 智能客服功能開發，串接 LINE Pay 與 Google Gemini API。',
      tags: ['Java 21', 'Spring Boot', 'Vue 3', 'SQL Server', '程式碼開發'],
      image: 'images/Portfolioimg/Petshop.jpg',
      buttons: [
        { text: '瀏覽作品', url: 'images/Aboutimg/TV.mp4' },
        { text: '原始碼', url: 'https://github.com/' }
      ]
    },
    {
      id: 2,
      title: 'SUNSTAR產品短影音｜廣告文案與企劃',
      summary: '於日本實習期間參與團隊專案製作，推廣間歇性斷食健康能量棒，負責廣告文案發想及短影音剪輯後製，完成產品宣傳行銷內容。',
      tags: ['影片剪輯', '影音行銷', '海外實習', '短影片剪輯創作'],
      image: 'images/Portfolioimg/SUNSTAR.jpg',
      buttons: [
        { text: '商品網站', url: 'https://jp.sunstar.com/health-food/andfasting/product_001.html' },
        { text: '影片作品', url: 'images/Aboutimg/TV.mp4' }
      ]
    },
    {
      id: 3,
      title: 'LINE貼圖設計與創作｜插畫設計',
      summary: '獨立完成 LINE 原創貼圖之企劃、插畫設計與上架流程，涵蓋線稿繪製、著色與去背輸出，並通過官方審核成功上架販售，展現數位插畫與視覺設計能力。',
      tags: ['LINE貼圖設計', '角色設計', '數位插畫', '視覺設計', '圖像創作'],
      image: 'images/Portfolioimg/LINE.jpg',
      buttons: [
        { text: '貼圖商店', url: 'https://store.line.me/stickershop/author/5851575/zh-Hant?lang=zh-Hant' }
      ]
    },
    {
      id: 4,
      title: '原創作詞與影片剪輯｜影音創作',
      summary: '獨立完成原創歌詞創作、影片剪輯及動態字幕後製，運用現有音樂素材與多媒體影音技術，展現影音內容企劃與視覺編輯能力。',
      tags: ['作詞創作', '影音企劃', '自媒體創作', '影片剪輯', '動態字幕', '影音後製'],
      image: 'images/Portfolioimg/YouTube1.jpg',
      buttons: [
        { text: '點我觀看收聽創作歌曲', url: 'https://youtu.be/zw2HlqRhML0' }
      ]
    },
    {
      id: 5,
      title: '短影音創作｜作詞與剪輯實作',
      summary: '獨立完成作詞、歌曲腳本企劃與流行饒舌短影音創作，運用短影音黃金前三秒吸睛策略，結合快節奏轉場、動態字幕與音樂設計，展現影音企劃與短片剪輯能力。',
      tags: ['短影音企劃', '作詞創作', '影片剪輯', '自媒體創作', '動態字幕'],
      image: 'images/Portfolioimg/YouTube2.jpg',
      buttons: [
        { text: '點我觀看短影音創作', url: 'https://youtube.com/shorts/6jYhcZNiiMY?feature=share' }
      ]
    },
    {
      id: 6,
      title: '個人文創品牌與視覺設計｜品牌標誌設計',
      summary: '使用SPRI.NG電商平台所提供的熱轉印技術，設計開發個人品牌LOGO及系列商品，透過商品視覺開發與熱轉印技術的應用理解，累積平面設計實務經驗。',
      tags: ['熱轉印技術', '平面美術', '商品包裝', 'SPRI.NG電商平台', '品牌標誌創作'],
      image: 'images/Portfolioimg/Clothing.jpg',
      buttons: [
        { text: '點我進入觀看文創商品', url: 'https://httpshancreator-springcom-2.creator-spring.com/' }
      ]
    }
  ])

  // 將作品陣列 projects 導出，讓 PortfolioView.vue 可以載入讀取
  return {
    projects
  }
}