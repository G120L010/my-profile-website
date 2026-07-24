// 聯絡表單 Modal 彈窗的抽離式組合式業務邏輯控制檔案
// 採用 Vue 3 Composition API 架構，管理表單欄位狀態與 mailto/Gmail 信件組合邏輯

import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 建立並導出聯絡表單 Modal 專用的核心邏輯控制函式
 * 供 App.js 與 ContactModal.vue 引入解構使用
 * @param {Function} [emit] - Vue 組件的 emit 函式，用於向父組件發出 close 事件
 */
export function useContactModal(emit = null) {

  // 嘗試取得 Vue I18n 的翻譯方法 t
  let t = null
  try {
    const i18n = useI18n()
    t = i18n.t
  } catch (e) { }

  // 防呆語系取得輔助函式
  const getText = (key, fallback) => {
    return t ? t(key) : fallback
  }

  // 控制 Modal 彈窗顯示狀態的響應式旗標，true 為顯示，false 為隱藏
  const showContactModal = ref(false)

  // 表單各欄位資料的響應式物件
  const form = reactive({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  /**
   * 開啟聯絡表單 Modal 彈窗
   */
  const openContactModal = () => {
    showContactModal.value = true
    document.body.style.overflow = 'hidden'
  }

  /**
   * 關閉聯絡表單 Modal 彈窗並重置所有欄位
   */
  const closeContactModal = () => {
    showContactModal.value = false
    document.body.style.overflow = ''
    resetForm()
    if (emit && typeof emit === 'function') {
      emit('close')
    }
  }

  /**
   * 重置所有表單欄位為初始空白狀態
   */
  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
  }

  /**
   * 送出表單：自動依裝置類型選擇最佳開信方式
   * 手機平板：使用 mailto: 喚起手機原生郵件 App（Gmail App、Apple Mail 等）
   * 桌面電腦：使用 Gmail Compose URL 在新分頁開啟 Gmail 網頁版撰寫視窗
   */
  const submitForm = () => {
    const recipient = 's112001044@g.ksu.edu.tw'

    // 取得當前語系的信件標籤翻譯
    const subjectPrefix = getText('contact.mailSubjectPrefix', '履歷網站聯絡')
    const mailFrom = getText('contact.mailFrom', '來自')
    const mailName = getText('contact.mailName', '姓名')
    const mailEmail = getText('contact.mailEmail', '聯絡信箱')
    const mailCompany = getText('contact.mailCompany', '服務單位')
    const mailMessage = getText('contact.mailMessage', '留言內容')

    // 動態組合郵件主旨：含當前語系標頭、寄件人姓名與公司名稱
    const companyPart = form.company ? ` (${mailFrom} ${form.company})` : ''
    const subjectText = `[${subjectPrefix}] ${form.name}${companyPart}`

    // 動態組合郵件內文：依當前語系標籤逐行列出表單欄位內容
    const companyLine = form.company ? `${mailCompany}：${form.company}\n` : ''
    const bodyText =
      `${mailName}：${form.name}\n` +
      `${mailEmail}：${form.email}\n` +
      companyLine +
      `\n${mailMessage}：\n${form.message}`


    // 偵測是否為手機或平板裝置
    const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      // 手機平板：使用 mailto: 標準協議喚起原生郵件 App（自動完成預填主旨與內文）
      const subject = encodeURIComponent(subjectText)
      const body = encodeURIComponent(bodyText)
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
    } else {
      // 電腦桌面：使用 Gmail 官方 Compose URL 在新分頁開啟撰寫視窗並預填資訊
      const subject = encodeURIComponent(subjectText)
      const body = encodeURIComponent(bodyText)
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }

    // 延遲關閉 Modal，讓訪客感知動作已觸發
    setTimeout(() => {
      closeContactModal()
    }, 400)
  }

  return {
    showContactModal,
    form,
    openContactModal,
    closeContactModal,
    resetForm,
    submitForm
  }
}

