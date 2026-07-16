// 榮譽事蹟頁面的抽離式組合式業務邏輯控制檔案
// 使用 Vue 3 的 Composition API 架構，將榮譽事蹟資料、教育階段與類別雙重篩選及燈箱顯示邏輯模組化抽離

import { ref, computed } from 'vue'

/**
 * 建立並導出榮譽事蹟分頁專用的核心邏輯控制函式
 * 供 HonorView.vue 引入解構使用
 */
export function useHonorView() {

  // 建立控制榮譽憑證大圖燈箱彈出的響應式變數，儲存目前要顯示的圖片或PDF路徑，null 代表關閉狀態
  const activeImageUrl = ref(null)

  // 建立當前選擇的學歷階段篩選值，'all' 代表顯示全部階段
  const selectedStage = ref('all')

  // 建立當前選擇的榮譽類別篩選值，'all' 代表顯示全部類別
  const selectedType = ref('all')

  // 建立結構化的榮譽事蹟數據響應式陣列，包含標題、頒發機構、時間、學歷階段、榮譽類別、簡介、驗證網址與展示圖片
  // 依時間排序，研究所佔 id: 1 至 6，高中職佔 id: 7 至 11
  const honors = ref([
    {
      id: 1,
      title: '碩士學位全學期總成績單',
      issuer: '崑山科技大學教務處',
      date: '2025.09',
      stage: 'graduate',
      stageName: '研究所',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/EmbaTranscript1.pdf',
      accentClass: 'accent-purple',
      summary: '歷年學業總平均成績為93.42分（A+）學分總計45'
    },
    {
      id: 2,
      title: '畢業生系名次證明書',
      issuer: '崑山科技大學教務處',
      date: '2025.10',
      stage: 'graduate',
      stageName: '研究所',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/EmbaTranscript2.pdf',
      accentClass: 'accent-gold',
      summary: '企業管理研究所畢業生系名次第一名畢業（全系共13人）。'
    },
    {
      id: 3,
      title: '第五十一屆嵐雲文學獎新詩組第一名獎狀',
      issuer: '崑山科技大學通識教育中心',
      date: '2025.06',
      stage: 'graduate',
      stageName: '研究所',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/EMBA3.jpg',
      accentClass: 'accent-rose',
      summary: '於研究所二年級再次參加第五十一屆嵐雲文學獎徵文比賽，蟬聯新詩創作組全校第一名殊榮。'
    },
    {
      id: 4,
      title: '臺南市議會議長獎狀',
      issuer: '臺南市議會',
      date: '2025.06',
      stage: 'graduate',
      stageName: '研究所',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/EMBA1.jpg',
      accentClass: 'accent-rose',
      summary: '因在研究所就讀期間在學成績優良、表現傑出，畢業時獲頒臺南市議會之議長獎鼓勵。'
    },
    {
      id: 5,
      title: '碩士班學業成績第一名獎狀',
      issuer: '崑山科技大學',
      date: '2025.06',
      stage: 'graduate',
      stageName: '研究所',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/EMBA4.jpg',
      accentClass: 'accent-gold',
      summary: '因研究所在學學業成績極為優良，榮獲企管系碩士班第一名，由李天祥校長親自頒發獎狀表揚。'
    },
    {
      id: 6,
      title: '第五十屆嵐雲文學獎新詩組第一名獎狀',
      issuer: '崑山科技大學通識教育中心',
      date: '2024.06',
      stage: 'graduate',
      stageName: '研究所',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/EMBA2.jpg',
      accentClass: 'accent-rose',
      summary: '參加校內第五十屆嵐雲文學獎徵文比賽，於新詩組競賽中榮獲全校第一名殊榮。'
    },
    {
      id: 7,
      title: '大學歷年成績單',
      issuer: '崑山科技大學教務處',
      date: '2023.09',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/UniversityEmbaTranscript1.pdf',
      accentClass: 'accent-purple',
      summary: '歷年學業總平均成績為88.18分，四技資訊工程系畢業，實得總學分數136學分。'
    },
    {
      id: 8,
      title: '畢業生系名次證明書',
      issuer: '崑山科技大學教務處',
      date: '2023.09',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/UniversityEmbaTranscript2.pdf',
      accentClass: 'accent-gold',
      summary: '資訊工程系畢業生系名次第五名畢業（全系共63人，佔百分比7.94%）。'
    },
    {
      id: 9,
      title: '104學年度畢業典禮親善服務大使表現優異獎狀',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.06',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/JK4.jpg',
      accentClass: 'accent-gold',
      summary: '於104學年度畢業典禮中擔任親善服務大使，負責引導與典禮服務，表現優異，特頒此狀。'
    },
    {
      id: 10,
      title: '104學年度第1學期學期成績優良獎狀',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.04',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/JK0.jpg',
      accentClass: 'accent-purple',
      summary: '餐飲管理科在校學業成績優異，名列前茅，特頒此狀以資鼓勵。'
    },
    {
      id: 11,
      title: '擔任親善服務大使熱心服務表現優異獎狀',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.03',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/JK1.jpg',
      accentClass: 'accent-rose',
      summary: '在校期間擔任親善服務大使，熱心協助學校各項公共事務與外賓接待，服務表現優異。'
    },
    {
      id: 12,
      title: '協助辦理第六十九屆商人節慶祝大會感謝狀',
      issuer: '台南市商業會',
      date: '2015.11',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/JK3.jpg',
      accentClass: 'accent-emerald',
      summary: '協助台南市商業會辦理第六十九屆商人節慶祝大會，熱心公益與會場服務，特頒此感謝狀。'
    },
    {
      id: 13,
      title: '協助辦理第六十八屆商人節慶祝大會感謝狀',
      issuer: '台南市商業會',
      date: '2014.11',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '獲獎事蹟',
      verifyUrl: '',
      image: 'images/Honorimg/JK2.jpg',
      accentClass: 'accent-emerald',
      summary: '積極參與社會服務，協助台南市商業會籌辦第六十八屆商人節慶祝大會，表現優良。'
    }
  ])

  // 依據學歷階段與榮譽類別雙重篩選值動態過濾榮譽事蹟清單的計算屬性
  const filteredHonors = computed(() => {
    return honors.value.filter(item => {
      const matchesStage = selectedStage.value === 'all' || item.stage === selectedStage.value
      const matchesType = selectedType.value === 'all' || item.type === selectedType.value
      return matchesStage && matchesType
    })
  })

  // 設定當前的學歷階段篩選值
  const setStageFilter = (stage) => {
    selectedStage.value = stage
  }

  // 設定當前的榮譽類別篩選值
  const setTypeFilter = (type) => {
    selectedType.value = type
  }

  // 開啟榮譽憑證大圖燈箱彈窗，並記錄所點擊的圖片路徑
  const showHonor = (imageUrl) => {
    activeImageUrl.value = imageUrl
  }

  // 關閉榮譽憑證大圖燈箱彈窗，將圖片路徑變數歸零
  const closeHonor = () => {
    activeImageUrl.value = null
  }

  // 返回視圖層所需的變數與控制方法
  return {
    selectedStage,
    selectedType,
    filteredHonors,
    activeImageUrl,
    setStageFilter,
    setTypeFilter,
    showHonor,
    closeHonor
  }
}
