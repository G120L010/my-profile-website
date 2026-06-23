// 關於我與特色經歷分頁的組合式業務邏輯控制檔案
// 使用 Vue 3 Composition API 將學歷、自傳、語言與特色專案數據模組化抽離，便於維護

import { ref } from 'vue'

export function useAboutView() {
  // 學歷背景數據陣列
  const educations = ref([
    {
      id: 1,
      school: '崑山科技大學',
      degree: '企業管理研究所 碩士',
      period: '2023.09 - 2025.06',
      status: '畢業',
      desc: '專注於企業管理、數位創新與永續發展整合應用。碩士畢業榮獲台南市議會議長獎及智育獎，為校內首位同時通過雙軸鑑定之學生。'
    },
    {
      id: 2,
      school: '崑山科技大學',
      degree: '資訊工程學系 大學',
      period: '2019.09 - 2023.06',
      status: '畢業',
      desc: '奠定電腦資訊能力，學習網頁語法、軟體開發與資料庫管理基礎，並將資訊專長運用於社團行政電子化管理中。'
    },
    {
      id: 3,
      school: '亞洲餐旅',
      degree: '餐飲管理科 高職',
      period: '2014.09 - 2017.06',
      status: '畢業',
      desc: '培育基本餐旅實務操作與團隊協作素養。'
    }
  ])

  // 語文能力數據陣列
  const languages = ref([
    { name: '中文', level: '精通', percent: 100 },
    { name: '日文', level: '略懂 (曾赴日實習)', percent: 35 },
    { name: '英文', level: '略懂', percent: 30 }
  ])

  // 個人詳細自傳數據（分段落與主題，便於折疊面板排版與閱讀）
  const biography = ref([
    {
      id: 'bio-1',
      title: '跨域探索：AI 與 ESG 的實踐之路',
      content: '我是崑山科技大學企業管理系碩士畢業生，具備跨領域背景，結合企業管理與電腦資訊科技專長，並專注於 AI 與 ESG (環境、社會、公司治理) 領域。2025 年，我成為校內首位同時取得經濟部 iPAS 國家級「AI應用規劃師」及「淨零碳規劃管理師」證照的學生，展現我在雙軸整合應用上的實務能力。此外，我積極取得多元證照，涵蓋設計、資訊與企劃等，展現持續學習與快速適應新技術的能力。'
    },
    {
      id: 'bio-2',
      title: '國際視野：日本大阪 TAT 海外實習',
      content: '在大學期間，我參與教育部「學海築夢」計畫，赴日本大阪市 TAT 株式會社進行為期一個月的海外企業實習，深刻體會日本企業對細節、秩序與專業的重視。從每日朝會到工作執行，學習如何在高效與謙遜的氛圍中進行協作，顯著提升了我的國際視野與跨文化溝通能力。'
    },
    {
      id: 'bio-3',
      title: '社會責任：環境生態社社長與公益服務',
      content: '校內亦長期投入社團公益，曾連續三年擔任環境生態教育服務社社長，策劃 ESG 活動並跨社團組織志工團隊，參與教育部青年發展署青年志工團隊競賽。透過校園生活與服務的點滴，將心境與觀察轉化為新詩創作，並投稿嵐雲文學獎新詩組並屢獲佳績。這些表現讓我榮獲鴻海獎學鯨、全國大專優秀青年，並入選總統教育獎推薦名單。'
    },
    {
      id: 'bio-4',
      title: '專業蛻變：資展 Java 軟體工程師訓練',
      content: '目前我正參與財團法人資訊工業策進會的職訓計畫 (產業新尖兵)，深造 Java 後端開發與系統架構設計，發展符合產業需求的專業軟體工程技能，支援未來科技與永續領域的職涯規劃，期待能與貴公司共同成長，迎戰新時代。'
    }
  ])

  // 特色經歷與海外專案數據陣列 (依日期由新到舊降冪排序)
  const featuredExperiences = ref([
    {
      id: 1,
      title: '資展國際 - 跨域 Java 軟體工程師就業養成班',
      period: '2026.03 - 2026.07',
      accentClass: 'accent-frontend',
      desc: '接受 555 小時資策會密集資訊培訓，學習 Java、Spring Boot、Vue 3 與資料庫技術。於專案「暖光之丘」擔任資料庫 ERD 設計主導，並成功實作 LINE Pay 金流與 Google Gemini API 智慧客服。',
      image: 'images/Aboutimg/EEIT.jpg',
      url: ''
    },
    {
      id: 2,
      title: '教育部學海實習計畫 - 日本大阪 TAT 海外實習',
      period: '2025.08 - 2025.09',
      accentClass: 'accent-design',
      desc: '獲得教育部學海築夢計畫補助，前往日本大阪市株式會社 TAT 實習。深入日本綜合商品批發與代理企業，體驗日本敬業文化與嚴謹秩序，提升跨文化交流與環境適應力。',
      image: 'images/Aboutimg/TAT.jpg',
      url: 'https://www.cna.com.tw/postwrite/chi/351665'
    },
    {
      id: 3,
      title: '日本大阪實習專案 - 產品短影音行銷廣告影片',
      period: '2025.07 - 2025.08',
      accentClass: 'accent-design',
      desc: '於日本海外實習期間，為 SUNSTAR 研究所 Fasting Bar 健康能量棒製作推廣短影音與行銷素材，融入短影音剪輯、多媒體後製與廣告創意文案發想。',
      image: 'images/Aboutimg/SUN.jpg',
      url: 'images/Aboutimg/TV.mp4'
    },
    {
      id: 4,
      title: '2025 雙軸轉型菁英齊聚 iPAS 專場活動',
      period: '2025.06',
      accentClass: 'accent-tools',
      desc: '由 104 人力銀行與工研院協同辦理。通過經濟部 iPAS 淨零碳規劃管理師、環境部淨零綠領人才合格證書、以及 iPAS 人工智慧 AI 應用規劃師能力鑑定，具備數據驅動與永續規劃的雙重實務能力。',
      image: 'images/Aboutimg/104iPAS.jpg',
      url: 'https://talent.ipas.org.tw/talent/event/detail/d3bd3f271efd45ff9507cfa7466824e1'
    },
    {
      id: 5,
      title: '在校成績優良獲頒臺南市議長獎',
      period: '2024.06',
      accentClass: 'accent-experience',
      desc: '碩士班應屆畢業學業優異，獲頒臺南市議會代表性議長獎與智育優良獎肯定，展現卓越之學習態度與紮實的學術研究素養。',
      image: 'images/Aboutimg/Council.jpg',
      url: 'https://www.cna.com.tw/postwrite/chi/405198'
    },
    {
      id: 6,
      title: '獲選 112 年大專優秀青年',
      period: '2023.05',
      accentClass: 'accent-backend',
      desc: '肯定逆境堅持向學之精神，以及在社團領導、偏鄉節能志工服務、公益行動與創新發明上的積極表現，獲選為大專優秀青年。',
      image: 'images/Aboutimg/Youth.jpg',
      url: 'https://www.cna.com.tw/postwrite/chi/337943'
    },
    {
      id: 7,
      title: '入圍總統教育獎推薦名單',
      period: '2022.05',
      accentClass: 'accent-backend',
      desc: '不畏環境困頓發憤向學，品德優良且長期熱心社團服務與社會公益，入圍中華民國大專組年度總統教育獎推薦名單。',
      image: 'images/Aboutimg/Pres.jpg',
      url: 'https://www.nownews.com/news/6165578'
    },
    {
      id: 8,
      title: '青年志工團隊競賽 - 績優服務獎',
      period: '2021.11',
      accentClass: 'accent-experience',
      desc: '協同崇德青年社、多媒體社組成跨社團志工團隊，執行「愛築積節能守衛隊」專案，獲教育部青年發展署績優服務獎，為非營利機構與國中小汰換老舊燈具共 3166 支。',
      image: 'images/Aboutimg/KSUSYouth.jpg',
      url: 'https://www.ksu.edu.tw/focusNews/detail/11782'
    },
    {
      id: 9,
      title: '第五屆鴻海獎學鯨清寒獎助學金',
      period: '2021.11',
      accentClass: 'accent-tools',
      desc: '榮獲鴻海教育基金會大專清寒向學獎助學金，肯定求學不輟、逆境自律與積極參與公益、關懷社會之良好態度。',
      image: 'images/Aboutimg/2317.jpg',
      url: 'https://news111.com.tw/news/47/1077'
    },
    {
      id: 10,
      title: '第 12 屆 IIIC 國際創新發明競賽金牌',
      period: '2021.11',
      accentClass: 'accent-tools',
      desc: '參與第 12 屆 IIIC 國際創新發明競賽，憑藉實務應用作品與科技創新構想，在多國參賽隊伍中榮獲金牌獎狀肯定。',
      image: 'images/Aboutimg/Golds.jpg',
      url: 'https://www.cna.com.tw/postwrite/chi/304627'
    }
  ])

  // 駕駛執照數據陣列
  const licenses = ref([
    { name: '普通小型車駕照 - 手排', date: '無車' },
    { name: '大型重型機車駕照', date: '無車' },
    { name: '普通重型機車駕照', date: '有車' }
  ])

  // 記錄當前展開的自傳段落識別碼，預設展開第一項
  const activeBioId = ref('bio-1')

  // 切換自傳段落展開或收合的方法
  const toggleBio = (id) => {
    if (activeBioId.value === id) {
      // 若點擊已展開的項目，則收合該項目
      activeBioId.value = null
    } else {
      // 展開所點擊的項目
      activeBioId.value = id
    }
  }

  return {
    educations,
    languages,
    biography,
    featuredExperiences,
    activeBioId,
    toggleBio,
    licenses
  }
}
