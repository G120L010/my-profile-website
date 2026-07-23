// Vue I18n 語系初始化配置檔

import { createI18n } from 'vue-i18n'
import zhTW from '../locales/zh-TW.js'
import en from '../locales/en.js'
import ja from '../locales/ja.js'

// 讀取 localStorage 中預存的語言設定，若無則預設為 zh-TW (繁體中文)
const savedLocale = (typeof localStorage !== 'undefined' && localStorage.getItem('han_language_pref')) || 'zh-TW'

// 建立 Vue I18n 實例物件
const i18n = createI18n({
  legacy: false, // 採用 Composition API 語法模式
  locale: savedLocale, // 當前使用的語系
  fallbackLocale: 'zh-TW', // 備用語系
  messages: {
    'zh-TW': zhTW,
    en: en,
    ja: ja
  }
})

// 切換語言並寫入 localStorage 的輔助函式
export function switchLanguage(newLocale) {
  if (i18n.global.locale.value !== undefined) {
    i18n.global.locale.value = newLocale
  } else {
    i18n.global.locale = newLocale
  }
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('han_language_pref', newLocale)
    } catch (e) {}
  }
}

export default i18n
