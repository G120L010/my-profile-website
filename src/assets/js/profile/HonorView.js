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
      title: '研究所歷年總成績單',
      issuer: '教務處',
      date: '2025.09',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/EmbaTranscript1.pdf',
      accentClass: 'accent-purple',
      summary: '歷年學業總平均成績為93.42分（A+）實得總學分數45學分。'
    },
    {
      id: 2,
      title: '研究所系排名次證明書',
      issuer: '教務處',
      date: '2025.10',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/EmbaTranscript2.jpg',
      accentClass: 'accent-gold',
      summary: '企業管理研究所畢業生系排名第一（全班共13人）。'
    },
    {
      id: 3,
      title: '第51屆嵐雲文學獎新詩創作組第一名',
      issuer: '通識教育中心',
      date: '2025.06',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'award',
      typeName: '寫作競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/405074',
      image: 'images/Honorimg/EMBA3.jpg',
      accentClass: 'accent-rose',
      summary: '於研究所二年級再次參加第五十一屆嵐雲文學獎徵文比賽，蟬聯新詩創作組全校第一名殊榮。'
    },
    {
      id: 4,
      title: '獲頒臺南市議會議長獎狀',
      issuer: '臺南市議會',
      date: '2025.06',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'award',
      typeName: '議長獎',
      verifyUrl: 'https://www.ettoday.net/news/20250620/2981913.html',
      image: 'images/Honorimg/EMBA1.jpg',
      accentClass: 'accent-rose',
      summary: '因在研究所就讀期間在學成績優良、表現傑出，畢業時獲頒臺南市議會之議長獎鼓勵。'
    },
    {
      id: 5,
      title: '碩士班學業成績獲頒智育獎',
      issuer: '企業管理研究所',
      date: '2025.06',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'transcript',
      typeName: '智育獎',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/405198',
      image: 'images/Honorimg/EMBA4.jpg',
      accentClass: 'accent-gold',
      summary: '企業管理研究所在學學業成績優良，於畢業典禮獲頒獎狀表揚。'
    },
    {
      id: 6,
      title: '第50屆嵐雲文學獎新詩創作組第一名',
      issuer: '通識教育中心',
      date: '2024.06',
      stage: 'graduate',
      stageName: '碩士班',
      type: 'award',
      typeName: '寫作競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/372906',
      image: 'images/Honorimg/EMBA2.jpg',
      accentClass: 'accent-rose',
      summary: '參加校內第五十屆嵐雲文學獎徵文比賽，於新詩創作組競賽中榮獲全校第一名殊榮。'
    },
    {
      id: 7,
      title: '大學部歷年總成績單',
      issuer: '教務處',
      date: '2023.09',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/UniversityEmbaTranscript1.pdf',
      accentClass: 'accent-purple',
      summary: '歷年學業總平均成績為88.18分（A），大學部四技畢業，實得總學分數136學分。'
    },
    {
      id: 8,
      title: '大學部系排名次證明書',
      issuer: '教務處',
      date: '2023.09',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '學業成績單',
      verifyUrl: '',
      image: 'images/Honorimg/UniversityEmbaTranscript2.jpg',
      accentClass: 'accent-gold',
      summary: '大學部畢業系排名次第五名畢業（全系共63人，佔百分比7.94%）。'
    },
    {
      id: 9,
      title: '111學年度吳林盡獎學金',
      issuer: '財團法人吳林盡教育基金會',
      date: '2023.12',
      stage: 'university',
      stageName: '大學',
      type: 'scholarship',
      typeName: '獎學金',
      verifyUrl: 'https://tue.utaipei.edu.tw/index.php',
      image: 'images/Honorimg/KSUniversity8.jpg',
      accentClass: 'accent-gold',
      summary: '學業成績表現優良，獲頒財團法人吳林盡教育基金會大專組獎學金。'
    },
    {
      id: 10,
      title: '111學年度畢業典禮獲頒群育獎',
      issuer: '崑山科技大學',
      date: '2023.06',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '群育獎',
      verifyUrl: 'https://www.nownews.com/news/6166353',
      image: 'images/Honorimg/KSUniversity5.jpg',
      accentClass: 'accent-emerald',
      summary: '積極參與社團及群體活動，服務表現優異，於畢業典禮榮獲群育獎表揚。'
    },
    {
      id: 11,
      title: '第49屆嵐雲文學獎新詩創作組第二名',
      issuer: '通識教育中心',
      date: '2023.06',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '寫作競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/344104',
      image: 'images/Honorimg/KSUniversity12.jpg',
      accentClass: 'accent-rose',
      summary: '參加第四十九屆嵐雲文學獎徵文比賽，於新詩創作組榮獲全校第二名佳績。'
    },
    {
      id: 12,
      title: '第38屆學生專題製作成果展作品第二名',
      issuer: '崑山科技大學',
      date: '2023.06',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '專題製作',
      verifyUrl: '',
      image: 'images/Honorimg/KSUniversity18.jpg',
      accentClass: 'accent-gold',
      summary: '四技資訊工程系畢業專題成果傑出，榮獲第三十八屆學生專題製作成果展作品第二名。'
    },
    {
      id: 13,
      title: '2023入圍總統教育獎奮發向上優秀學生',
      issuer: '中華民國教育部',
      date: '2023.05',
      stage: 'university',
      stageName: '大學',
      type: 'scholarship',
      typeName: '總統教育獎學金',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/343701',
      image: 'images/Honorimg/KSUniversity10.jpg',
      accentClass: 'accent-purple',
      summary: '不畏逆境而奮發上進、熱心服務奉獻，榮獲教育部2023總統教育獎「奮發向上優秀學生獎」。'
    },
    {
      id: 14,
      title: 'DLT數位生活科技研討會論文發表會',
      issuer: '國立高雄科技大學',
      date: '2023.05',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '研討會',
      verifyUrl: 'https://2023dlt.wixsite.com/dlt2023',
      image: 'images/Honorimg/KSUniversity11.jpg',
      accentClass: 'accent-purple',
      summary: '於2023 DLT 數位生活科技研討會發表論文《開放式交通動態圖資共享平台》，特頒此證。'
    },
    {
      id: 15,
      title: '111年度參與服務學習教育表現優良學生獎',
      issuer: '課外活動暨服務學習組',
      date: '2023.04',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '社團獲獎',
      verifyUrl: '',
      image: 'images/Honorimg/KSUniversity3.jpg',
      accentClass: 'accent-emerald',
      summary: '熱心參與服務學習教育，在社團及各項公共服務活動中表現優良，特頒獎狀嘉許。'
    },
    {
      id: 16,
      title: '獲頒凌霄寶殿武龍宮獎助學金',
      issuer: '大灣凌霄寶殿武龍宮',
      date: '2023.04',
      stage: 'university',
      stageName: '大學',
      type: 'scholarship',
      typeName: '獎學金',
      verifyUrl: 'https://www.twtainan.net/zh-tw/attractions/detail/4326/',
      image: 'images/Honorimg/KSUniversity9.jpg',
      accentClass: 'accent-gold',
      summary: '品學兼優、在學期間學習領域表現優異，獲頒凌霄寶殿武龍宮獎學金以資鼓勵。'
    },
    {
      id: 17,
      title: '擔任環境生態教育服務社社長',
      issuer: '課外活動暨服務學習組',
      date: '2023.03',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '社團幹部',
      verifyUrl: 'https://www.ctee.com.tw/news/20211117700616-431208',
      image: 'images/Honorimg/KSUniversity0.jpg',
      accentClass: 'accent-emerald',
      summary: '於110年9月1日至112年3月期間擔任「環境生態教育服務社」社長，負責社團經營與服務推廣。'
    },
    {
      id: 18,
      title: '獲頒大專優秀青年當選證書',
      issuer: '中華民國青年救國團',
      date: '2023.03',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '校外表現',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/337943',
      image: 'images/Honorimg/KSUniversity4.jpg',
      accentClass: 'accent-gold',
      summary: '熱心參與校內外公共服務與社團事務，表現傑出，經遴選當選為中華民國112年大專優秀青年。'
    },
    {
      id: 19,
      title: '111年度e-Portfolio達人競賽優等獎',
      issuer: '崑山科技大學',
      date: '2022.12',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '創作競賽',
      verifyUrl: '',
      image: 'images/Honorimg/KSUniversity17.jpg',
      accentClass: 'accent-purple',
      summary: '參與111年度高等教育深耕計畫「e-Portfolio達人競賽」，學業與學習歷程成果優異榮獲優等。'
    },
    {
      id: 20,
      title: '萬潤2022創新創意競賽入圍',
      issuer: '萬潤科技股份有限公司',
      date: '2022.10',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '專題競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/326805',
      image: 'images/Honorimg/KSUniversity16.jpg',
      accentClass: 'accent-purple',
      summary: '以研發作品《開放式交通圖資共享平台》參賽，榮獲萬潤2022創新創意競賽入圍獎。'
    },
    {
      id: 21,
      title: '獲頒111年度陳忠陳葉蕊獎助學金',
      issuer: '財團法人陳忠陳葉蕊文教基金會',
      date: '2022.08',
      stage: 'university',
      stageName: '大學',
      type: 'scholarship',
      typeName: '獎學金',
      verifyUrl: 'http://www.cccef.org.tw/',
      image: 'images/Honorimg/KSUniversity7.jpg',
      accentClass: 'accent-gold',
      summary: '敦品勵學、奮發向上，學業成績表現優良，獲頒陳忠陳葉蕊文教基金會獎學金。'
    },
    {
      id: 22,
      title: '110年青年志工團隊競賽青年組績優服務獎',
      issuer: '教育部青年發展署',
      date: '2022.03',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '社團競賽',
      verifyUrl: 'https://www.ksu.edu.tw/focusNews/detail/11782',
      image: 'images/Honorimg/KSUniversity15.jpg',
      accentClass: 'accent-emerald',
      summary: '擔任「崑山科大愛築積節能守衛隊」隊員，熱心公益參與志工服務，榮獲青年組績優服務獎。'
    },
    {
      id: 23,
      title: '110學年度第1學期學期成績優異書卷獎',
      issuer: '崑山科技大學',
      date: '2022.03',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '書卷獎',
      verifyUrl: '',
      image: 'images/Honorimg/KSUniversity2.jpg',
      accentClass: 'accent-purple',
      summary: '四技在校學業表現卓越，於110學年度第1學期學期成績優異，特頒此狀以資鼓勵。'
    },
    {
      id: 24,
      title: '獲頒第五屆鴻海獎學鯨',
      issuer: '鴻海教育基金會',
      date: '2021.12',
      stage: 'university',
      stageName: '大學',
      type: 'scholarship',
      typeName: '獎學金',
      verifyUrl: 'https://www.foxconnfoundation.org/plan/scholarship',
      image: 'images/Honorimg/KSUniversity6.jpg',
      accentClass: 'accent-gold',
      summary: '展現逆境求學熱誠、學業成績優異，榮獲110年第五屆鴻海獎學鯨大專院校獎助學金。'
    },
    {
      id: 25,
      title: 'TSIA國際美業菁英賽最佳設計獎',
      issuer: '中華沙龍產業發展協會',
      date: '2021.12',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '校外競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/308742',
      image: 'images/Honorimg/KSUniversity13.jpg',
      accentClass: 'accent-rose',
      summary: '參加2021 TSIA 國際美業菁英賽，榮獲「國際商品網拍攝影組」最佳設計獎。'
    },
    {
      id: 26,
      title: '第十二屆 IIIC 國際創新發明競賽金牌獎證書',
      issuer: '中華創新發明學會',
      date: '2021.11',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '校外競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/304627',
      image: 'images/Honorimg/KSUniversity19.jpg',
      accentClass: 'accent-purple',
      summary: '以作品《智能生活安全防疫用紫外線殺菌系統》參賽，榮獲第十二屆 IIIC 國際創新發明競賽金牌。'
    },
    {
      id: 27,
      title: '萬潤2021創新創意競賽佳作獎',
      issuer: '萬潤科技股份有限公司',
      date: '2021.10',
      stage: 'university',
      stageName: '大學',
      type: 'award',
      typeName: '專題競賽',
      verifyUrl: 'https://www.cna.com.tw/postwrite/chi/301938',
      image: 'images/Honorimg/KSUniversity14.jpg',
      accentClass: 'accent-purple',
      summary: '團隊研發作品《智能生活安全防疫用紫外線殺菌系統》參賽，榮獲萬潤2021創新創意競賽佳作。'
    },
    {
      id: 28,
      title: '109學年度第2學期學業成績優異書卷獎',
      issuer: '崑山科技大學',
      date: '2021.09',
      stage: 'university',
      stageName: '大學',
      type: 'transcript',
      typeName: '書卷獎',
      verifyUrl: '',
      image: 'images/Honorimg/KSUniversity1.jpg',
      accentClass: 'accent-purple',
      summary: '四技在學學業表現優異，名列前茅，於109學年度第2學期榮獲學業成績優異獎狀。'
    },
    {
      id: 29,
      title: '104學年度畢業典禮親善服務大使表現優異',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.06',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '校園禮賓生',
      verifyUrl: '',
      image: 'images/Honorimg/JK4.jpg',
      accentClass: 'accent-gold',
      summary: '於104學年度畢業典禮中擔任親善服務大使，負責引導與典禮服務，表現優異，特頒此狀。'
    },
    {
      id: 30,
      title: '104學年度第1學期學期成績優良獎',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.04',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '成績優良',
      verifyUrl: '',
      image: 'images/Honorimg/JK0.jpg',
      accentClass: 'accent-purple',
      summary: '餐飲管理科在校學業成績優異，名列前茅，特頒此狀以資鼓勵。'
    },
    {
      id: 31,
      title: '擔任親善服務大使熱心服務表現優異',
      issuer: '臺南市亞洲高級餐旅職業學校',
      date: '2016.03',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '校園禮賓生',
      verifyUrl: '',
      image: 'images/Honorimg/JK1.jpg',
      accentClass: 'accent-rose',
      summary: '在校期間擔任親善服務大使，熱心協助學校各項公共事務與外賓接待，服務表現優異。'
    },
    {
      id: 32,
      title: '協助辦理第六十九屆商人節慶祝大會感謝狀',
      issuer: '台南市商業會',
      date: '2015.11',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '校外表現',
      verifyUrl: '',
      image: 'images/Honorimg/JK3.jpg',
      accentClass: 'accent-emerald',
      summary: '協助台南市商業會辦理第六十九屆商人節慶祝大會，熱心公益與會場服務，特頒此感謝狀。'
    },
    {
      id: 33,
      title: '協助辦理第六十八屆商人節慶祝大會感謝狀',
      issuer: '台南市商業會',
      date: '2014.11',
      stage: 'highschool',
      stageName: '高中職',
      type: 'award',
      typeName: '校外表現',
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
