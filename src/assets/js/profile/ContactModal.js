// 聯絡表單 Modal 彈窗的抽離式組合式業務邏輯控制檔案
// 採用 Vue 3 Composition API 架構，管理表單欄位狀態與 mailto 信件組合邏輯

import { ref, reactive } from 'vue'

/**
 * 建立並導出聯絡表單 Modal 專用的核心邏輯控制函式
 * 供 ContactModal.vue 引入解構使用
 */
export function useContactModal() {

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
   * 將表單資料組合為標準 mailto URI 格式並開啟訪客郵件軟體
   * 接收人固定為 s112001044@g.ksu.edu.tw
   */
  const submitForm = () => {
    const recipient = 's112001044@g.ksu.edu.tw'

    // 組合郵件主旨：含寄件人姓名與公司名稱
    const companyPart = form.company ? ` 來自 ${form.company}` : ''
    const subject = encodeURIComponent(`[履歷網站聯絡] ${form.name}${companyPart}`)

    // 組合郵件內文：逐行列出表單欄位內容
    const companyLine = form.company ? `服務單位：${form.company}\r\n` : ''
    const body = encodeURIComponent(
      `姓名：${form.name}\r\n` +
      `聯絡信箱：${form.email}\r\n` +
      companyLine +
      `\r\n留言內容：\r\n${form.message}`
    )

    // 開啟訪客本地郵件軟體並預填資訊
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`

    // 延遲 500 毫秒關閉 Modal，讓訪客感知動作已觸發
    setTimeout(() => {
      closeContactModal()
    }, 500)
  }

  return {
    showContactModal,
    form,
    openContactModal,
    closeContactModal,
    submitForm
  }
}
