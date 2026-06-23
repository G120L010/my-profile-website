// 專業認證證照頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將證照資料與燈箱顯示邏輯模組化抽離

import { ref } from 'vue'

/**
 * 建立並導出認證證照分頁專用的核心邏輯控制函式
 * 供 CertificationView.vue 引入解構使用
 */
export function useCertificationView() {

  // 建立控制證照大圖燈箱彈出的響應式變數，儲存目前要顯示的證照圖片路徑，null 代表關閉狀態
  const activeImageUrl = ref(null)

  // 建立一組結構化的證照數據響應式陣列，包含證照名稱、發證機構、取得時間、證照編號、驗證連結以及實體證照圖片 (依取得日期由新到舊降冪排序，排除3項交通駕照)
  const certifications = ref([
    {
      id: 1,
      title: '環境部淨零綠領人才培育合格證書',
      issuer: '行政院環境部',
      date: '2025.12',
      credentialId: '****************',
      verifyUrl: 'https://www.moenv.gov.tw/',
      image: 'images/Certificationimg/MOENV.jpg',
      accentClass: 'accent-tools',
      summary: '通過國家級綠色轉型、溫室氣體盤查、企業減碳路徑與永續規劃策略之核心培訓課程。'
    },
    {
      id: 2,
      title: '淨零碳規劃管理師 - 初級能力鑑定',
      issuer: 'iPAS 經濟部產業人才能力鑑定',
      date: '2025.07',
      credentialId: '****************',
      verifyUrl: 'https://talent.ipas.org.tw/',
      image: 'images/Certificationimg/Carbon.jpg',
      accentClass: 'accent-backend',
      summary: '具備淨零碳規劃管理相關之國際公約、碳管理、碳中和基礎理論知識，能協助企業推動低碳減量計畫。'
    },
    {
      id: 3,
      title: 'iPAS AI 應用規劃師 - 初級能力鑑定',
      issuer: 'iPAS 經濟部產業人才能力鑑定',
      date: '2025.06',
      credentialId: '****************',
      verifyUrl: 'https://talent.ipas.org.tw/',
      image: 'images/Certificationimg/AiIPAS.jpg',
      accentClass: 'accent-frontend',
      summary: '理解資料在 AI 應用模型中扮演之關鍵角色，並具備實務導入人工智慧專案之設計與規劃能力。'
    },
    {
      id: 4,
      title: '產物保險業務員',
      issuer: '中華民國產物保險商業同業公會',
      date: '2025.01',
      credentialId: '****************',
      verifyUrl: 'http://www.nlia.org.tw/',
      image: 'images/Certificationimg/Product.jpg',
      accentClass: 'accent-backend',
      summary: '通過產物保險法規與實務測驗，具備產物保險商品分析、企業風險規劃與銷售資格。'
    },
    {
      id: 5,
      title: 'TBSA 商務企劃能力初級檢定',
      issuer: 'TBSA 台灣商務企劃協進會',
      date: '2024.12',
      credentialId: '****************',
      verifyUrl: 'https://www.tbsa.tw/',
      image: 'images/Certificationimg/TBSA.jpg',
      accentClass: 'accent-design',
      summary: '通過商務企劃核心概念、市場行銷規劃分析、企劃案撰寫與提案能力之初級專業鑑定。'
    },
    {
      id: 6,
      title: '人工智慧應用與技術 (實用級/進階級/專業級)',
      issuer: 'TQC / EEC 中華民國電腦技能基金會',
      date: '2024.11',
      credentialId: '****************',
      verifyUrl: 'https://www.csf.org.tw/',
      image: 'images/Certificationimg/TQC.jpg',
      accentClass: 'accent-frontend',
      summary: '認證具備機器學習基礎、自然語言處理、影像辨識應用與深度學習核心技術之實務操作能力。'
    },
    {
      id: 7,
      title: '人身保險業務員',
      issuer: '中華民國人壽保險商業同業公會',
      date: '2024.05',
      credentialId: '****************',
      verifyUrl: 'http://www.lia-roc.org.tw/',
      image: 'images/Certificationimg/Life.jpg',
      accentClass: 'accent-backend',
      summary: '通過國家級法規與實務測驗，具備人身保險商品銷售資格、人身風險規劃與保險法規專業知識。'
    },
    {
      id: 8,
      title: 'SPSS 統計分析與資料探勘',
      issuer: 'TIPCI 臺灣國際專業認證學會',
      date: '2024.05',
      credentialId: '****************',
      verifyUrl: 'https://www.tutortristar.com/',
      image: 'images/Certificationimg/SPSS.jpg',
      accentClass: 'accent-tools',
      summary: '通過專業資料探勘實務檢定，具備多變量統計分析、資料清洗、SPSS 軟體操作與統計圖表解析能力。'
    },
    {
      id: 9,
      title: 'SSE Adobe Illustrator CC',
      issuer: 'Silicon Stone Education (SSE)',
      date: '2023.03',
      credentialId: '****************',
      verifyUrl: 'https://www.siliconstone.org/show_certificate?certificate_id=32',
      image: 'images/Certificationimg/Illustrator.jpg',
      accentClass: 'accent-design',
      summary: '向量圖像繪製、平面海報排版、Logo 標誌設計與 Adobe Illustrator 軟體實務操作國際證照。'
    },
    {
      id: 10,
      title: 'SSE Adobe Photoshop CC',
      issuer: 'Silicon Stone Education (SSE)',
      date: '2021.04',
      credentialId: '****************',
      verifyUrl: 'https://www.siliconstone.org/show_certificate?certificate_id=29',
      image: 'images/Certificationimg/Photoshop.jpg',
      accentClass: 'accent-design',
      summary: '驗證具備數位圖像設計、相片編修、視覺藝術後製與 Adobe Photoshop 軟體實務操作國際證照。'
    },
    {
      id: 11,
      title: 'SSE 攝影國際證照',
      issuer: 'Silicon Stone Education (SSE)',
      date: '2020.11',
      credentialId: '****************',
      verifyUrl: 'https://www.siliconstone.org/',
      image: 'images/Certificationimg/Photograph.jpg',
      accentClass: 'accent-design',
      summary: '驗證取得攝影構圖、光影控制、數位相機操作與影像美學創作之國際水準專業能力。'
    },
    {
      id: 12,
      title: 'MTA - 微軟專業應用技術國際認證',
      issuer: 'Microsoft / Certiport',
      date: '2019.11',
      credentialId: '****************',
      verifyUrl: 'https://learn.microsoft.com/',
      image: 'images/Certificationimg/MTA.jpg',
      accentClass: 'accent-frontend',
      summary: '微軟官方技術認證，驗證資訊科技基礎結構、資料庫管理或軟體工程核心領域之國際能力。'
    },
    {
      id: 13,
      title: 'Google Analytics (分析) 個人認證資格',
      issuer: 'Google',
      date: '2019.10',
      credentialId: '****************',
      verifyUrl: 'https://skillshop.exceedlms.com/',
      image: 'images/Certificationimg/GA.jpg',
      accentClass: 'accent-tools',
      summary: '取得 Google Analytics (分析) 個人認證，具備網站流量數據追蹤、使用者行為分析與報表解讀能力。'
    }
  ])

  /**
   * 開啟證照圖片彈窗的方法
   * @param {string} imageUrl 要展示的證照圖片相對路徑
   */
  const showCertificate = (imageUrl) => {
    activeImageUrl.value = imageUrl
  }

  /**
   * 關閉證照圖片彈窗的方法
   */
  const closeCertificate = () => {
    activeImageUrl.value = null
  }

  // 將資料與控制燈箱的方法導出，以供 Vue 視圖組件使用
  return {
    certifications,
    activeImageUrl,
    showCertificate,
    closeCertificate
  }
}
