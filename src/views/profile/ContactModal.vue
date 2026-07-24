<template>
  <!-- 聯絡表單 Modal 彈窗：僅在 showContactModal 為 true 時渲染 -->
  <!-- @click.self 點擊遮罩背景時自動關閉 Modal -->
  <div v-if="showContactModal" class="contact-modal-overlay" @click.self="closeContactModal">

    <!-- Modal 主體卡片 -->
    <div class="contact-modal-card">

      <!-- Modal 頂部標題列 -->
      <div class="contact-modal-header">
        <h2 class="contact-modal-title">
          <!-- 橘色裝飾短線 -->
          <span class="contact-modal-title-accent"></span>
          {{ $t('contact.modalTitle') }}
        </h2>
        <!-- 關閉按鈕：點擊後關閉 Modal 並清除表單資料 -->
        <button class="contact-modal-close-btn" @click="closeContactModal" :title="$t('contact.closeBtn')">&times;</button>
      </div>

      <!-- 聯絡表單本體 -->
      <form @submit.prevent="submitForm" novalidate>

        <!-- 姓名欄位（必填） -->
        <div class="contact-form-group">
          <label class="contact-form-label" for="contact-name">
            {{ $t('contact.nameLabel') }}<span class="contact-form-required">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            class="contact-form-input"
            v-model="form.name"
            :placeholder="$t('contact.namePlaceholder')"
            required
            maxlength="60"
          />
        </div>

        <!-- 聯絡信箱欄位（必填） -->
        <div class="contact-form-group">
          <label class="contact-form-label" for="contact-email">
            {{ $t('contact.emailLabel') }}<span class="contact-form-required">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            class="contact-form-input"
            v-model="form.email"
            :placeholder="$t('contact.emailPlaceholder')"
            required
            maxlength="100"
          />
        </div>

        <!-- 服務單位欄位（選填） -->
        <div class="contact-form-group">
          <label class="contact-form-label" for="contact-company">
            {{ $t('contact.companyLabel') }}
          </label>
          <input
            id="contact-company"
            type="text"
            class="contact-form-input"
            v-model="form.company"
            :placeholder="$t('contact.companyPlaceholder')"
            maxlength="80"
          />
        </div>

        <!-- 留言內容欄位（必填） -->
        <div class="contact-form-group">
          <label class="contact-form-label" for="contact-message">
            {{ $t('contact.messageLabel') }}<span class="contact-form-required">*</span>
          </label>
          <textarea
            id="contact-message"
            class="contact-form-textarea"
            v-model="form.message"
            :placeholder="$t('contact.messagePlaceholder')"
            required
            maxlength="2000"
          ></textarea>
        </div>

        <!-- 底部：送出說明文字與送出按鈕 -->
        <div class="contact-modal-footer">
          <!-- 說明文字：告知訪客將開啟郵件軟體 -->
          <p class="contact-submit-hint">{{ $t('contact.submitHint') }}</p>
          <!-- 送出按鈕 -->
          <button type="submit" class="contact-submit-btn">
            {{ $t('contact.submitBtn') }}
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
// 引入聯絡表單 Modal 專屬樣式
import '@/assets/css/profile/ContactModal.css'

import { reactive } from 'vue'

// 定義 Props：接收父元件傳入的 Modal 顯示狀態
defineProps({
  showContactModal: {
    type: Boolean,
    required: true
  }
})

// 定義 Emits：向父元件拋出關閉事件
const emit = defineEmits(['close'])

// 表單各欄位資料的響應式物件
const form = reactive({
  name: '',
  email: '',
  company: '',
  message: ''
})

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
 * 關閉 Modal：恢復頁面捲動、重置表單、向父元件發出 close 事件
 */
const closeContactModal = () => {
  document.body.style.overflow = ''
  resetForm()
  emit('close')
}

/**
 * 送出表單：自動依裝置類型選擇最佳開信方式
 * 手機平板：使用 mailto: 喚起手機原生郵件 App（Gmail App、Apple Mail 等）
 * 桌面電腦：使用 Gmail Compose URL 在新分頁開啟 Gmail 網頁版撰寫視窗
 */
const submitForm = () => {
  const recipient = 's112001044@g.ksu.edu.tw'

  // 組合郵件主旨：含寄件人姓名與公司名稱
  const companyPart = form.company ? ` 來自 ${form.company}` : ''
  const subjectText = `[履歷網站聯絡] ${form.name}${companyPart}`

  // 組合郵件內文：逐行列出表單欄位內容
  const companyLine = form.company ? `服務單位：${form.company}\n` : ''
  const bodyText =
    `姓名：${form.name}\n` +
    `聯絡信箱：${form.email}\n` +
    companyLine +
    `\n留言內容：\n${form.message}`

  // 偵測是否為手機或平板裝置
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

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
</script>
