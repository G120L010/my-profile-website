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
// 【樣式匯入】引入聯絡表單 Modal 專屬 CSS 樣式表
import '@/assets/css/profile/ContactModal.css'

// 【業務邏輯匯入】引入聯絡表單 Modal 專屬 Composable 業務邏輯控制檔
import { useContactModal } from '@/assets/js/profile/ContactModal.js'

// 定義 Props：接收父元件傳入的 Modal 顯示狀態
defineProps({
  showContactModal: {
    type: Boolean,
    required: true
  }
})

// 定義 Emits：向父元件拋出關閉事件
const emit = defineEmits(['close'])

// 【解構載入】從 Composable 中取出表單資料物件與操作函式
const { form, closeContactModal, submitForm } = useContactModal(emit)
</script>

