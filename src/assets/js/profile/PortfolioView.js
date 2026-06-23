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
      tags: ['Java 21', 'Spring Boot', 'Vue 3', 'SQL Server', '程式碼創作'],
      image: 'images/Portfolioimg/no-image.jpg',
      buttons: [
        { text: '瀏覽網站', url: 'https://github.com/' },
        { text: '原始碼', url: 'https://github.com/' }
      ]
    },
    {
      id: 2,
      title: 'SUNSTAR 產品短影音廣告 (影片剪輯創作)',
      summary: '於日本實習期間由團隊共同主導製作。推廣間歇性斷食健康能量棒，完成廣告文案高質感短影音廣告後製與影片剪輯，協助產品宣傳行銷。',
      tags: ['Adobe Premiere', '影片剪輯', '影音行銷', '海外實習', '影片剪輯創作'],
      image: 'images/Portfolioimg/SUNSTAR.jpg',
      buttons: [
        { text: '商品網站', url: 'https://jp.sunstar.com/health-food/andfasting/product_001.html' },
        { text: '影片作品', url: 'images/Aboutimg/TV.mp4' }
      ]
    },
    {
      id: 3,
      title: 'LINE 原創貼圖設計與創作 (LINE貼圖創作)',
      summary: '獨立規劃、設計並上架 LINE 原創貼圖。電腦繪圖插圖線稿與著色設計、去背輸出，並通過 LINE 官方審核成功上架銷售，展現手繪插畫與數位圖像設計之實務能力。',
      tags: ['LINE 貼圖', '角色設計', '插畫設計', '視覺創作', 'LINE貼圖創作'],
      image: 'images/Portfolioimg/LINE.jpg',
      buttons: [
        { text: '貼圖商店', url: 'https://store.line.me/stickershop/author/5851575/zh-Hant?lang=zh-Hant' }
      ]
    },
    {
      id: 4,
      title: '個人作詞＋歌曲＋剪輯字幕＋後製自製影片 (影片剪輯創作)',
      summary: '獨立完成原創歌詞創作、歌曲錄製、影片剪輯與動態字幕後製。結合多媒體影音軟體與音樂創作技術，實現從音訊剪輯、字幕對位到視覺後製的全流程自製影音專案。',
      tags: ['作詞創作', '音樂剪輯', 'Premiere Pro', '動態字幕', '影音後製', '影片剪輯創作'],
      image: 'images/Portfolioimg/YouTube1.jpg',
      buttons: [
        { text: '點我觀看收聽創作歌曲', url: 'https://youtu.be/zw2HlqRhML0' }
      ]
    },
    {
      id: 5,
      title: '短影音創作 (短影音創作)',
      summary: '獨立作詞歌曲企劃並製作的高難度趣味短影音創作。精準掌握短影音黃金前三秒吸引法則，靈活運用快節奏轉場特效、動態字體與背景音樂，展現自媒體影音企劃與短片剪輯實務能力。',
      tags: ['短影音企劃', '轉場特效', '快節奏剪輯', '自媒體創作', '短影音創作'],
      image: 'images/Portfolioimg/YouTube2.jpg',
      buttons: [
        { text: '點我觀看短影音創作', url: 'https://youtube.com/shorts/6jYhcZNiiMY?feature=share' }
      ]
    },
    {
      id: 6,
      title: '個人文創商品線上商鋪 (文創商品創作)',
      summary: '主導建立個人文創商品線上商鋪。親自操刀店鋪視覺風格設定，並以精緻平面設計技術推出專屬服飾與配件系列商品，展示平面美術設計、品牌包裝與電子商務營運之實務整合成果。',
      tags: ['品牌設計', '平面美術', '商品包裝', 'spri.ng電商平台', '文創商品創作'],
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