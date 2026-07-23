# 個人履歷網站開發流程規範與進度看板

本文件旨在規範本個人履歷網站專案（[my-profile-website](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website)）的程式碼設計架構、排版設計原則、主題切換規範與開發流程步驟，並提供開發進度看板，以協助開發者有效掌握專案的推進與維護。

---

## 1. 專案架構與三層分離開發規範

為確保專案程式碼的可讀性、可維護性以及未來的功能擴充，本專案採用 **「三層分離（View - Logic - Style）」** 的架構設計。每個分頁或元件均需嚴格拆分為以下三個檔案：

### 🧱 視圖層（View Layer）- `.vue`
* **職責**：專注於網頁 HTML 骨架、語意化標籤（Semantic HTML）與 Vue 的模板指令（如 `v-for`、`v-if`、動態綁定等）。
* **規範**：
  * 禁止在此層撰寫複雜的 JavaScript 邏輯或宣告靜態資料陣列。
  * 僅透過 `import` 載入其對應的 JS 邏輯模組與 CSS 樣式表。
  * **放置位置**：`src/views/profile/` (例如 [HomeView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HomeView.vue))。

### ⚙️ 邏輯與資料層（Logic & Data Layer）- `.js`
* **職責**：使用 Vue 3 Composition API（組合式 API）管理狀態、定義生命週期鉤子（如 `onMounted`）、處理使用者互動事件與儲存靜態 Mock 資料。
* **規範**：
  * 以獨立 Composable 函式（如 `export function useHomeView()`）匯出。
  * 資料使用 `ref` 或 `reactive` 包裝，實現響應式雙向綁定。
  * **放置位置**：`src/assets/js/profile/` (例如 [HomeView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HomeView.js))。

### 🎨 樣式與動畫層（Style Layer）- `.css`
* **職責**：編寫版面排版、微互動特效、漸變裝飾與動畫軌跡。
* **規範**：
  * 採用純 Vanilla CSS 撰寫，避免使用 ad-hoc 內聯樣式。
  * 嚴格綁定 `src/assets/css/App.css` 中的全局 CSS 變數（如 `var(--bg-card)`），以確保深淺主題切換時色彩過渡平滑。
  * **放置位置**：`src/assets/css/profile/` (例如 [HomeView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HomeView.css))。

### 📝 程式碼註解規範 (Comment Standards)
* **語言與編寫要求**：所有程式碼檔案（包括但不限於 `.vue`、`.js`、`.css` 以及各種設定檔）皆應盡量編寫詳盡的註解。註解必須使用**繁體中文**編寫，用以說明開發意圖、代碼邏輯或防呆機制。
* **嚴格禁用圖形符號**：註解內容必須是純文字，**嚴禁包含任何表情符號（Emoji）或圖形符號**（例如 🚀、💡、⚡、✔、🧱、⚙️、🎨 等所有非文字字元），以確保程式碼排版乾淨、規格一致且具備專業商業水準。

---

### 🎮 互動遊戲作品規範 (Interactive Game Works Standards)
* **職責**：針對 `public/games/` 目錄下的獨立 HTML 小遊戲作品，進行統一的品牌署名與連結。
* **規範**：
  * 所有互動遊戲作品的 HTML 檔案中，應在 `<body>` 標籤結束前，加入以下的個人化署名區塊。
  * 此舉有助於在獨立的作品頁面中，保持作者資訊的一致性，並引導使用者前往相關的創作商店。
    * **圖片路徑規範**：對於位於 `public/games/` 目錄下的遊戲 HTML/CSS 檔案，若需引用 `public/images/games/` 目錄下的圖片資源，應使用**相對路徑** `../images/games/圖片檔名`。嚴禁使用絕對路徑（如 `/images/...`）或本地檔案系統路徑（如 `C:\Users\...`），以確保部署後的圖片能正常顯示。
  * **HTML 結構**：
    ```html
    <div class="sign">
      by HanJohn <a href="https://store.line.me/stickershop/author/5851575/zh-Hant?lang=zh-Hant" target="_blank" rel="noopener noreferrer">貼圖商店</a>
    </div>
    ```
  * **CSS 樣式**：
    ```css
    .sign {
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 20px;
      color: rgb(0, 17, 255); /* 可依遊戲主題微調 */
    }
    .sign a { color: inherit; }
    ```
  * **註解編寫與代碼防損規範**：
    * **HTML 區塊**：註解必須置於 HTML 標籤的上方，使用 `<!-- 這裡是xx -->` 的形式，不可以在標籤同一行的右側/行末撰寫註解。
    * **CSS 區塊**：註解必須置於 CSS 選擇器或樣式規則的上方，使用 `/* 這裡是xx */` 的形式，不可以在樣式屬性同一行的右側/行末撰寫註解。
    * **JavaScript 區塊**：
      * 必須在每個 JavaScript 函式（Function）的上方加上單獨一行的註解說明，例如 `// 這裡是xxx的邏輯`。
      * 建議儘量在 JavaScript 的程式碼語句右側/行末加上註解說明（例如 `let score = 0; // 記錄玩家的得分`），以達到逐行或逐段解釋的效果。
    * **嚴格禁止修改代碼邏輯與原有註解**：
      * **在進行註解增補時，必須嚴格維持原有的程式碼邏輯與語法結構，絕對不要修改、刪除或重構任何程式碼，以避免改壞原有功能。**
      * **絕對不可刪除、修改或清理程式碼中特意被註解起來的「已註解程式碼」（例如 `// const indicator = ...` 或偵錯用註解），必須原樣保留。**
      * **絕對不可更動、重排版或微調 SVG 壓縮路徑字串（如 `pandaSvg`、`penguinSvg`、`starSvg` 等數據），任何微小變化都會導致畫面與動畫損壞。**
    * **通用規範**：所有小遊戲的註解內容必須使用**繁體中文**撰寫，且**嚴禁包含 any 表情符號 (Emoji) 或圖形符號**（如 🚀, 💡, ⚡ 等），確保程式碼的純粹性。


## 2. 全局設計規範 (Global Design Tokens)

全站樣式與動畫核心定義於 [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)，開發新元件時應遵循以下設計規範：

### 🌓 深淺色主題適配 (Theme variables)
主題顏色過渡使用 `transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease` 確保絲滑平順。

| 顏色變數名稱 | 深色模式值 (Dark) | 淺色模式值 (Light) | 應用情境 |
|---|---|---|---|
| `--bg-primary` | `#0d1117` | `#f4f6f9` | 全站最外層背景底色 |
| `--bg-card` | `#161b22` | `#ffffff` | 左側名片與右側主要內容區背景 |
| `--bg-btn` | `#0d1117` | `#f4f6f9` | 導覽選單與小徽章底色 |
| `--border-color` | `#30363d` | `#d8dee4` | 卡片框線、分隔線與時間軸軌跡線 |
| `--text-main` | `#ffffff` | `#24292f` | 主要標題、大標題與強顯文字 |
| `--text-sub` | `#c9d1d9` | `#57606a` | 次要描述文字、列表摘要 |
| `--text-muted` | `#8b949e` | `#6e7781` | 靜態徽章、副標題與在職時間文字 |

### ⚡ 精緻卡片漸變彩條 (Card Accent Colors)
每張卡片頂部皆設計有一條高度 `4px` 的絕對定位漸變彩條，透過動態 `:class` 套用：
* **前端** (`.accent-frontend`)：`linear-gradient(90deg, #00d2ff, #0066ff)` (藍色漸變)
* **後端** (`.accent-backend`)：`linear-gradient(90deg, #ff8400, #ffaa44)` (橘色漸變)
* **工具** (`.accent-tools`)：`linear-gradient(90deg, #00ff87, #60efff)` (青綠漸變)
* **經歷** (`.accent-experience`)：`linear-gradient(90deg, #ff8400, #ff5e62)` (橘紅漸變)
* **特殊/設計** (`.accent-design`)：`linear-gradient(90deg, #ec008c, #fc6767)` (紫粉漸變)
* **尊榮金/獎項** (`.accent-gold`)：`linear-gradient(90deg, #f59e0b, #eab308)` (金色漸變)
* **智慧紫/人工智慧** (`.accent-purple`)：`linear-gradient(90deg, #a855f7, #6366f1)` (紫藍漸變)
* **淨零綠/環境永續** (`.accent-emerald`)：`linear-gradient(90deg, #10b981, #059669)` (綠色漸變)
* **深情玫瑰紅** (`.accent-rose`)：`linear-gradient(90deg, #f43f5e, #be123c)` (玫瑰紅漸變)


### ✨ 微互動動畫與特效 (Animations)
* **雪花飄落**：由 `App.css` 透過 `@keyframes fallAnimation` 渲染 5 個透明度與速度相異的 `❄` 粒子背景層。
* **打字機特效**：[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js) 透過遞迴 `setTimeout` 逐字輸出，並搭配 CSS 閃爍垂直游標。
* **卡片懸浮**：所有主要卡片 Hover 時觸發 `translateY(-6px)`，並搭配品牌橘色霓虹發光 `box-shadow`。
* **主題切換鈕**：右下角懸浮圓鈕，支援 `neonPulse` 呼吸發光與 Hover 時的旋轉放大特效。

---

## 3. 新頁面開發標準流程 (Step-by-Step Flow)

若未來需於右側展示盒新增分頁（例如：證照檢定、聯繫表單等），請遵循以下 5 步標準流程：

1. **路由註冊**：在 [index.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/router/index.js) 的 `routes` 陣列中，新增分頁路徑（如 `/license`）並指向對應的 View 組件。
2. **建立資料與邏輯檔**：於 `src/assets/js/profile/` 建立 `XView.js`，宣告 `ref` 響應式資料與互動函式並 `export`。
3. **建立 CSS 樣式檔**：於 `src/assets/css/profile/` 建立 `XView.css`，撰寫此分頁專屬的 CSS 樣式，引用全站變數。
4. **建立 Vue 視圖組件**：於 `src/views/profile/` 建立 `XView.vue`，撰寫 HTML 結構並利用 `v-for` 渲染 JS 中的資料。
5. **新增導覽連結**：在 [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue) 中新增 `RouterLink`，並為其設定對應的英文副標與樣式。
6. **開發驗證測試**：啟動 `npm run dev` 測試桌機、手機版排版是否跑版，並確認深色與淺色模式下的視覺可讀性。

### 🎖️ 榮譽事蹟資料與分類開發規範
為確保學習與獲獎歷程呈現的結構性與易讀性，於「榮譽事蹟（Honors）」分頁開發與維護時，應遵循以下分類架構：
1. **第一層（學歷階段）**：資料必須先明確劃分為「研究所」、「大學」、「高中職」三大學歷層級。
2. **第二層（榮譽類別）**：於各個學歷層級下，進一步細分為「學業成績單」（包含排名與名次證明）、「獲獎事蹟」、「獎學金紀錄」三種主要類別。
3. **按鈕連結控制**：若該榮譽項目無相關新聞報導或官方連結驗證，應將 `verifyUrl` 欄位設為空字串，系統將自動隱藏「前往官網」按鈕，僅保留「查看憑證」按鈕。

---

## 4. 畫面排版與程式碼設計進度看板

此看板用於追蹤各頁面在「程式碼結構性」、「畫面視覺設計」、「邏輯資料綁定」、「響應式排版」以及「主題適配度」五大維度的開發狀態：

### 📊 進度矩陣看板

| 模組名稱 | 程式碼設計 (Code) | 畫面視覺 (Visual) | 邏輯與資料 (Logic) | 響應式佈局 (Responsive) | 主題切換 (Theme) | 當前完成度 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **全站外殼 / Shell**<br>[App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **關於我 / About Me**<br>[AboutView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/AboutView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **工作經歷 / Experience**<br>[HomeView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HomeView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **精選作品 / Portfolio**<br>[PortfolioView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/PortfolioView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **專業技能 / Skills**<br>[SkillView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/SkillView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **專業認證 / Certifications**<br>[CertificationView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/CertificationView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **榮譽事蹟 / Honors**<br>[HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **全站外殼功能 / Shell Features**<br>[App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **多國語系切換 / i18n**<br>[App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[i18n/index.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/i18n/index.js) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| **捲動進度條 / Scroll Progress Bar**<br>[App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 🟢 已解構 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | 🟢 已完成 | **100%** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| ***以下為規劃中功能（依優先順序排列）*** | | | | | | |
| **聯絡表單 / Contact**<br>新增路由 `/contact`，透過 Formspree 或 EmailJS 實作無後端表單寄信，取代純靜態 Email 連結，讓 HR 可直接在網頁填寫聯絡資訊並送出 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |
| **一鍵匯出 PDF / PDF Export**<br>使用 `html2pdf.js` 套件或 `@media print` CSS，讓訪客一鍵將履歷匯出為 PDF，對 HR 與 ATS 系統實用性極高 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |
| **GitHub 貢獻熱力圖 / GitHub Activity**<br>呼叫 GitHub Public API（無需 Token）顯示最近 52 週的 commit 活動熱力圖，放置於「關於我」或「全站外殼」頁面 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |
| **技能雷達圖 / Skill Radar Chart**<br>使用 `Chart.js` 於「專業技能」頁面繪製多維度雷達圖，以前端、後端、設計、管理、AI 等軸線可視化能力分佈 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |
| **漸進式網頁應用 / PWA**<br>使用 `vite-plugin-pwa` 加入 Service Worker 與 `manifest.json`，支援離線瀏覽與「安裝到桌面」功能 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |
| **訪客留言板 / Guestbook**<br>使用 Giscus（基於 GitHub Discussions）或 utterances（基於 GitHub Issues）嵌入留言板，完全免費且無廣告，需 GitHub 帳號登入留言 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | 🔴 待開發 | **0%** |

*圖例說明：🟢 已完成並驗證 \| 🟡 調整中/部分完成 \| 🔴 待開發*

---

## 5. 畫面排版與程式碼設計檢查清單 (Checklist)

請在進行任何程式碼或畫面異動時，對照以下檢查清單：

### 💻 程式碼設計檢查清單
* [ ] 程式碼修改後，Vue 組件的 `<script setup>` 僅保留檔案引入與變數解構，不含複雜邏輯。
* [ ] 所有的數據列表（如經歷、作品、技能）是否都以 `ref()` 封裝於對應的獨立 JS 檔案中。
* [ ] 新增或修改資料項目時，是否提供了唯一的 `id` 作為 `v-for` 的 `:key`。
* [ ] 程式碼中原有的詳細中文註解與邏輯防呆註解是否完整保留。
* [ ] 若為互動小遊戲類作品，是否已在右下角加上個人化署名與貼圖商店連結。
* [ ] 程式碼內所有註解是否皆使用繁體中文撰寫，且**不包含任何表情符號或圖形符號**。
* [ ] 進行任何程式碼或畫面除錯（Debugging）或特殊邏輯變更後，是否已同步將該項目記錄至本文件底部的「8. 除錯紀錄區 (Debugging Log)」中。


### 🎨 畫面排版設計檢查清單
* [ ] 手機版（螢幕寬度 < 576px）與桌機版（螢幕寬度 > 992px）的佈局是否接縫合適，無左右溢出跑版。
* [ ] 卡片懸浮效果（Hover）的 `transform` 是否設定了平滑的過渡時間（如 `transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1)`）。
* [ ] 當切換至「白天模式」時，所有文字是否保有足夠的對比度，無淺灰色字體看不清的問題。
* [ ] 背景雪花特效粒子與右下角懸浮按鈕的 `z-index` 層級是否正確，沒有遮擋到卡片內的連結或按鈕。

### 🚀 GitHub Pages 部署防錯檢查清單
* [ ] 路由模式是否設定為 Hash 模式（使用 `createWebHashHistory`）。
* [ ] 所有引用自 `public/` 資料夾的靜態資源路徑，首位是否**皆已移除斜線** `/`（改為相對路徑，如 `images/Homeimg/no-image.jpg`）。
* [ ] [vite.config.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/vite.config.js) 中的 `base` 參數是否設定為 `'./'`。
* [ ] 在本地執行 `npm run build` 是否成功無錯誤，且 `dist/index.html` 內引用的 JS/CSS 路徑皆為 `./` 開頭。
* [ ] 若有呼叫 CounterAPI，所有 API Key 是否皆為**純英數字格式**（嚴禁包含底線 `_`、破折號 `-` 等符號），且只使用 `/up` 遞增端點，**絕對不呼叫讀取端點**（不帶 `/up` 的 GET 請求），以避免 CounterAPI 回傳 301 重導向丟失 CORS 標頭。

---

## 6. GitHub Pages 部署規範與防錯指南

為了達到 **「100% 成功部署且無白畫面、破圖或 404 錯誤」** 的最終目的，請遵循以下配置規範：

### 🛠️ 部署三大核心原則

1. **強制使用 Hash 路由 (Hash Routing)**
   * **原理**：GitHub Pages 屬於靜態代管平台，不支援後端路由重導向。若使用 HTML5 History 模式，使用者在子頁面（例如 `/portfolio`）重新整理網頁時，伺服器會因找不到實體檔案而拋出 `404 Not Found`。
   * **規範**：必須在 [index.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/router/index.js) 中使用 `createWebHashHistory`，透過 URL 中的 `#` 號進行客戶端切換，以此完美相容靜態伺服器。
2. **靜態資源路徑相對化 (Relative Asset Path)**
   * **原理**：當專案發布至 GitHub Pages 時，其網址通常帶有專案路徑（例如 `https://username.github.io/my-profile-website/`）。若在程式碼中使用絕對路徑以斜線開頭（例如 `/images/X.jpg`），瀏覽器會指向網域根目錄（`https://username.github.io/images/X.jpg`）而導致 `404 破圖`。
   * **規範**：所有靜態資源連結一律**不可以斜線開頭**，必須使用 `images/...` 等相對路徑。
   * **關鍵技巧**：在 Vue 模板中，請**使用動態綁定語法**（例如 `:src="'images/Homeimg/no-image.jpg'"`）。如果直接寫靜態的 `src="images/..."`，Vite 編譯器（如 Rolldown）會將其當作 `src/` 目錄底下的本地模組進行解析而導致編譯錯誤。透過動態綁定，可使 Vite 忽略靜態解析，並在運行時正確以相對路徑渲染。
3. **打包基準路徑設定 (Vite Base Path)**
   * **規範**：在 [vite.config.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/vite.config.js) 中設定 `base: './'`，這能確保打包編譯時，所有的 JS、CSS、圖片資源連結都會轉譯為相對路徑，從而確保網頁在任何目錄層級下皆能正確載入。

### 📦 自動化部署：GitHub Actions CI/CD 設定

為實現自動化建置與部署，專案支援使用 GitHub Actions。請依據以下步驟設定：

#### 第一步：建立 GitHub Actions 工作流設定檔
在專案根目錄下建立目錄與檔案：`.github/workflows/deploy.yml`。

#### 第二步：填入工作流設定內容
```yaml
# GitHub Actions 工作流的名稱，會顯示在 GitHub 專案頁面的 Actions 標籤頁中
name: Deploy to GitHub Pages

# 定義何時自動觸發此工作流
on:
  push:
    branches:
      - main # 當有新的程式碼 push 提交至 main 分支時，即觸發此部署流程

# 設定該工作流程在虛擬主機上執行時所需要的安全權限
permissions:
  contents: read # 允許 Actions 讀取專案儲存庫中的程式碼內容
  pages: write   # 允許 Actions 寫入與更新 GitHub Pages 的頁面內容
  id-token: write # 允許 Actions 獲取安全的 OIDC 憑證以進行部署身份驗證

# 排程管理：避免多個部署作業同時執行引發部署衝突
concurrency:
  group: "pages" # 將所有的部署工作劃分在名為 "pages" 的排程群組中
  cancel-in-progress: false # 若有排隊中的部署作業，不予以中斷取消，而是排隊依序執行完畢

# 定義要執行的具體工作任務 (Job)
jobs:
  deploy:
    environment:
      name: github-pages # 指定部署環境為 GitHub 系統內建的 github-pages 專用環境
      url: ${{ steps.deployment.outputs.page_url }} # 部署完成後，自動在 Actions 主頁輸出並呈現網站的真實網址
    runs-on: ubuntu-latest # 使用最新版的 Ubuntu Linux 虛擬機作為打包與編譯的執行主機
    steps:
      # 第一步：將專案的程式碼拉取下載到虛擬機的專案目錄中
      - name: Checkout
        uses: actions/checkout@v4

      # 第二步：安裝並配置 Node.js 執行與編譯環境
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # 指定 Node.js 的主版本為 20 (與本機開發環境保持一致)
          cache: 'npm' # 自動開啟 npm 套件快取功能，藉此加快後續的編譯建置速度

      # 第三步：以乾淨的安裝模式安裝專案所屬的所有套件 (npm ci 會依照 package-lock.json 進行嚴格安裝，比 npm install 更安全)
      - name: Install dependencies
        run: npm ci

      # 第四步：執行 Vite 的生產環境打包編譯指令，輸出靜態網頁檔案
      - name: Build project
        run: npm run build

      # 第五步：將打包編譯出來的 dist 資料夾，封裝並上傳為 GitHub Pages 部署暫存產物 (Artifact)
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist # 指定上傳 Vite 預設打包輸出的結果目錄 (dist)

      # 第六步：正式將剛剛上傳打包好的產物部署發布到 GitHub Pages 伺服器
      - name: Deploy to GitHub Pages
        id: deployment # 為此步驟指定識別碼，以便上面的 url 變數可以讀取其輸出的 page_url
        uses: actions/deploy-pages@v4 # 調用 GitHub 官方內建的部署插件完成最終發布
```

#### 第三步：啟用 GitHub Repository Pages 設定
1. 將專案 Push 至 GitHub 儲存庫。
2. 開啟瀏覽器進入該 Repo 頁面，點選右上角的 **`Settings`**。
3. 在左側選單中，點選 **`Pages`**。
4. 在 **`Build and deployment`** 區塊下的 **`Source`** 下拉選單中，將預設的 `Deploy from a branch` 切換改為 **`GitHub Actions`**。
5. 此後，每次您將程式碼 push 至 `main` 分支時，GitHub 系統便會自動執行上述步驟進行編譯與部署，並在 Actions 頁面顯示部署進度。

---

## 7. Git 開發與部署分支工作流指令秘笈 (Git Workflow Guide)

為了確保程式碼在合併與部署時的穩定性，本專案採用 `Han`（開發測試分支）與 `main`（主分支，用於自動部署）之雙分支工作流。

請遵循以下 Git 指令指南進行日常開發、測試與發布部署：

### 🌿 7.1 日常開發（於 Han 分支）

所有新功能開發、畫面優化或錯誤修正，皆應先在 `Han` 開發分支上進行。

1. **確認或切換至 `Han` 分支**
   ```bash
   # 查看目前所在分支
   git branch

   # 切換至 Han 分支（若已存在）
   git checkout Han
   # 或者使用較新的指令
   git switch Han

   # 若本機還沒有 Han 分支，從目前的 main 主分支建立並切換
   git checkout -b Han
   ```

2. **撰寫程式碼與本地暫存/提交變更**
   ```bash
   # 查看當前檔案變更狀態
   git status

   # 將所有變更檔案加入暫存區
   git add .

   # 提交變更並撰寫提交訊息
   # （依本專案規範，註解與 Commit 訊息請使用繁體中文，且嚴禁包含任何 Emoji 表情符號）
   git commit -m "feat: 新增個人簡歷回到頂部懸浮按鈕"
   ```

3. **推送本機 `Han` 分支至 GitHub 遠端儲存庫（備份用）**
   ```bash
   git push origin Han
   ```

---

### 🧪 7.2 本地測試與編譯驗證

在準備將變更合併至 `main` 之前，必須在 `Han` 分支執行本機端驗證：

1. **啟動本機開發伺服器測試**
   ```bash
   npm run dev
   ```
   在瀏覽器中開啟專案，手動點擊所有分頁與功能，確認無排版跑版、JS 邏輯錯誤。

2. **驗證在線人數功能（若有修改 `initOnlinePresence`）**
   * 在**同一瀏覽器**中按 `Ctrl+T` 新開第二個分頁並貼上相同的本地網址。
   * 等待約 2-3 秒，兩個分頁的「目前在線」人數應均更新為 2。
   * 關閉其中一個分頁，等待約 6-8 秒（心跳逾時 6 秒），剩餘分頁應自動降回 1。
   * 注意：跨不同瀏覽器（例如同時開 Chrome 與 Firefox）測試時，因各瀏覽器的 `localStorage` 與 `BroadcastChannel` 各自隔離，人數不會互通，此為靜態網站的技術限制，非 Bug。

3. **執行生產環境打包編譯測試**
   ```bash
   npm run build
   ```
   確認終端機沒有編譯報錯（Build Errors）。這是至關重要的一步，因為 GitHub Actions 在部署時也會執行此打包指令，若編譯失敗將會導致部署流程中斷。

---

### 🚀 7.3 合併至主分支與推送部署（至 GitHub Blog）

當 `Han` 分支測試一切正常，準備將其發布部署時，請遵循以下步驟將其合併至 `main` 主分支並推送：

1. **切換回主分支 `main`**
   ```bash
   git checkout main
   # 或
   git switch main
   ```

2. **拉取 GitHub 遠端最新的 `main` 程式碼**
   ```bash
   # 確保本地 main 主分支與遠端同步，避免潛在的合併衝突
   git pull origin main
   ```

3. **將開發分支 `Han` 的內容合併到主分支 `main`**
   ```bash
   git merge Han
   ```
   *註：若合併時發生衝突（Conflict），請手動編輯衝突檔案並解決，接著執行 `git add .` 與 `git commit` 完成合併。*

4. **推送 `main` 分支程式碼至 GitHub 遠端儲存庫**
   ```bash
   git push origin main
   ```
   *一旦您將程式碼推送至 `main` 分支，GitHub Actions 將會自動被觸發（詳見第 6 節），開始打包並部署至 GitHub Pages！您可前往 GitHub 專案頁面的 Actions 分頁查看部署進度。*

---

### 🔄 7.4 回歸開發分支繼續開發

部署完成後，請立刻切換回 `Han` 分支，以防不小心直接在 `main` 分支上修改程式碼：

1. **切換回 `Han` 分支**
   ```bash
   git checkout Han
   # 或
   git switch Han
   ```

2. **同步 `main` 分支的合併結果**
   ```bash
   # 確保 Han 分支也同步了剛才合併的所有歷史紀錄與最新程式碼
   git merge main
   ```

---

### 📊 7.5 IDE 可視化工具：Git Graph 快捷操作指南

本專案強烈建議搭配 VS Code 的 **Git Graph** 套件進行可視化管理，這能以圖形化界面清晰呈現 `Han` 與 `main` 的分支走向、領先/落後狀態，並極大降低指令打錯的風險。

#### 1. 如何開啟 Git Graph 面板
* **方式 A（狀態列）**：點選 VS Code 最下方狀態列的 **`Git Graph`** 按鈕。
* **方式 B（命令面板）**：按下快速鍵 `Ctrl+Shift+P` (Mac 為 `Cmd+Shift+P`)，輸入 `Git Graph: View Git Graph` 並按下 Enter。
* **方式 C（原始碼控制區）**：點選 VS Code 左側「原始碼控制」圖示，在該面板的頂部標題列，點選類似「分支圖表」的圖示即可開啟。

#### 2. 在 Git Graph 中的核心操作

* **👀 觀察分支狀態**
  * 在圖表中，可以看到不同顏色的線條。每一個「圓點」代表一次 Commit 提交。
  * 請尋找帶有分支標籤的方塊，如 `Han`、`main`（代表本地分支）以及 `origin/Han`、`origin/main`（代表 GitHub 遠端分支）。
  * 若 `Han` 在 `main` 的上方，代表開發分支目前領先主分支，此為正常開發狀態。

* **🔄 快速切換分支 (Checkout)**
  * **操作**：直接在圖表上的 `Han` 或 `main` 標籤上**按兩下滑鼠左鍵 (Double Click)**。
  * **效果**：等同於執行 `git checkout <branch>`。面板上目前所在分支的名稱旁會加粗或打勾。

* **🌿 本地合併分支 (Merge)**
  * **情境**：在 `main` 分支上，想將 `Han` 的新代碼合併進來。
  * **操作**：
    1. 雙擊圖表中的 `main` 標籤以切換到 `main` 分支。
    2. 對著圖表中的 `Han` 標籤點選**滑鼠右鍵**。
    3. 選擇 **`Merge into current branch...`** (合併至目前分支)。
    4. 在彈出視窗中確認，即可完成合併。

* **📥 抓取與拉取 (Fetch / Pull)**
  * **操作**：點選 Git Graph 面板右上角的「重新整理 (Refresh)」按鈕更新狀態，或直接右鍵點擊分支標籤並選擇 `Pull...`。
  * **效果**：與遠端 GitHub 伺服器同步最新狀態，避免本地落後。

* **📤 推送至遠端 (Push)**
  * **操作**：在完成 Commit 或 Merge 後，右鍵點擊您要推送的分支標籤（例如 `main` 或 `Han`），選擇 **`Push...`**，並確認推送。
  * **效果**：等同於 `git push origin <branch>`，在 `main` 分支上推送時將會自動觸發 GitHub Actions 部署。

---

## 8. 除錯紀錄區 (Debugging Log)

為落實開發規範，本專案實施 **「除錯紀錄同步化 (Synchronized Debugging Logs)」** 機制。凡進行任何程式碼錯誤修正、特殊邏輯調整或第三方網址釐清時，開發人員或 AI 助手必須同步在此表中新增對應條目（包含：紀錄日期、異常描述、受影響檔案、原因分析與解決方案）。

### 🛠️ 歷史除錯紀錄表

| 紀錄日期 | 異常描述 | 影響檔案 | 原因分析 | 解決方案 |
| :--- | :--- | :--- | :--- | :--- |
| 2026.06.23 | **Vite 打包資源解析錯誤** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue) | 靜態引用 `src="images/..."` 被編譯器當作 `src/` 目錄下本地模組，引發找不到檔案的 Rolldown 錯誤。 | 將靜態路徑改為動態綁定相對路徑 `:src="'images/...'"'`，成功繞過 Vite 靜態模組解析，並在運行時正確解析。 |
| 2026.06.23 | **側邊欄選單溢出與截斷** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 新增第 4 個「證照」連結後，在短螢幕或視窗縮小時，粘滯固定的側邊欄高度大於視窗，造成底部按鈕被遮蔽截斷。 | (1) 縮小側邊欄各元件外距及選單內距，縮減高度約 7.5rem；(2) 在 CSS 中為側邊欄加上最大高度限制 `max-height: calc(100vh - 4rem)` 並開啟 `overflow-y: auto` 垂直滾動。 |
| 2026.06.23 | **程式碼註解表情符號違規** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue) | 在 HTML 的註解中含有 `☀️` 及 `🌙` 等圖形表情符號，不符合「註解一律繁體中文純文字且無表情符號」之代碼規範。 | 手動將該行註解中的 Emoji 符號刪除，改為純繁體中文純文字說明。 |
| 2026.06.23 | **自傳折疊面板點擊失效** | [AboutView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/AboutView.vue)<br>[AboutView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/AboutView.js) | 專案僅導入了 Bootstrap CSS，並未載入 `bootstrap.bundle.min.js`，導致以 `data-bs-*` 屬性驅動的折疊功能完全失效。 | 於 JS 中加入 `activeBioId` 與 `toggleBio` 狀態及切換方法，並在 Vue 視圖中改採純 Vue 3 響應式點擊綁定，徹底擺脫對 Bootstrap 外部 JS 的依賴。 |
| 2026.06.23 | **側邊欄內部雙滾動條與截斷重構** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 為了防截斷而為側邊欄加上最大高度限制與內部滾動，引發雙滾動條，不符合「不要左側內部滾動頁面，需完整呈現且右側能滾動」的排版要求。 | 移除了左側卡片的 `max-height` 限制與 `overflow-y`，徹底取消內部滾動條以完整呈現；大螢幕下重新設為 `position: sticky; top: 2rem;` 以防隨之滾走，右側長卡片自然隨整頁滾動。 |
| 2026.06.23 | **證照取得日期更新與新增SPSS認證** | [CertificationView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/CertificationView.js) | 依據最新 104 履歷，將所有專業證照的取得日期精準化，並新增 SPSS 統計分析證照，需按時間重排。 | 更新 CertificationView 中的證照清單至 14 項，並重新調整時間為降冪排序，確保最頂部呈現最新證照，符合時間降冪排版規範。 |
| 2026.06.23 | **作品與得獎事蹟頁面大重構** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js)<br>[AboutView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/AboutView.js) | 作品集內原本夾雜非作品類的得獎事蹟卡片，造成版面定位模糊，需要抽離並將作品集回歸純作品屬性。 | 將得獎事蹟 6 項移至關於我頁面的特色經歷中，取代原先的籠統項目並依日期降冪重新排序；作品集則僅保留並重新整理為程式碼創作、影片剪輯創作與 LINE 貼圖創作等純作品卡片。 |
| 2026.06.23 | **工作經歷新增新聞報導連結** | [HomeView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HomeView.js)<br>[HomeView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HomeView.vue)<br>[HomeView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HomeView.css) | 依據最新 104 履歷，需在工作經歷中補上與專案或活動成果相關的新聞報導連結。 | 在 HomeView.js 中為 USR 永續發展辦公室與創新教學中心兩個工作經歷加上 links 連結陣列，並在 HomeView.vue 中渲染，且於 CSS 中完成白天與深色模式的美化排版與 Hover 微互動特效。 |
| 2026.06.23 | **工作經歷新增日本海外實習經歷** | [HomeView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HomeView.js) | 應使用者要求，將日本大阪 TAT 的海外實習經歷同步新增至工作經歷分頁中。 | 在 HomeView.js 中新增「教育部學海築夢計畫 - 日本大阪株式會社 TAT 海外實習生」工作經歷（2025.08 - 2025.09），並附帶相關的實習官網與 SUNSTAR 能量棒行銷網頁成果連結，維持時間降冪降序排列。 |
| 2026.06.23 | **優化大頭照裁切對齊重心** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 解決使用者反映大頭貼圖片被裁切的問題（如頭頂或臉部被切除）。 | 在 App.css 中的 avatar-img-style 樣式加入 object-position: center top 屬性，藉此微調裁切對齊重心至圖片上方，避免人臉被截斷。 |
| 2026.06.23 | **修復作品卡片按鈕溢出消失** | [PortfolioView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/PortfolioView.css)<br>[PortfolioView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/PortfolioView.vue) | 作品集卡片因簡介摘要變長與標籤增多，導致內容總高度大於 240px，底部的原始碼與瀏覽按鈕在滑動遮罩中被 overflow: hidden 截斷而消失。 | (1) 將卡片固定高度調大為 280px；(2) 將遮罩 padding 縮小為 p-3 節省高度；(3) 於遮罩層加上 overflow-y: auto 開啟垂直滾動與細微滾動條美化以防按鈕消失跑版。 |
| 2026.06.23 | **作品集按鈕重構支援動態配置** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js)<br>[PortfolioView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/PortfolioView.vue) | 作品集按鈕文字原先寫死為「瀏覽網站」與「原始碼」，對於非網頁程式碼的影音或貼圖作品產生命名矛盾。 | 將原本寫死的 url 欄位重構為 buttons 陣列，使作品集可以為個別作品自訂 1 至 2 個按鈕文字（如商品網站、影片作品、貼圖商店等），並在 vue 中遍歷渲染，完美消除字意矛盾。 |
| 2026.06.23 | **新增影片創作作品與依客製化順序重排** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js) | 使用者需要擴充作品集，並要求特定的作品排序：程式碼 -> SUNSTAR -> 貼圖 -> 影片。 | 在 projects 陣列中新增 3 個與原 id: 2 相同格式的作品，配置相應的影音按鈕連結，並依照「程式碼、SUNSTAR、貼圖、其餘影片」的順序將作品 ID 重新排序為 1 至 6，確保版面與註解規範一致。 |
| 2026.06.23 | **證照清單微調、圖片補齊與按鈕文字修正** | [CertificationView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/CertificationView.js)<br>[CertificationView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/CertificationView.vue) | 依據最新指示，刪除 iPAS 專場活動，使專業證照總數精簡至 13 項；同時為主要證照補上實體圖片，並將按鈕文字「線上驗證」修正為「前往官方網站」。 | (1) 從證照清單中移除 iPAS 專場項目，並將後續項目的 ID 重新編排為連續的 1 至 13；(2) 將證照的 image 路徑指向對應的實體圖片；(3) 修正 vue 中的按鈕文字為「前往官方網站」。 |
| 2026.06.23 | **補充新增作品之專案簡介與技術標籤** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js) | 配合使用者調整的作品集新增項目（id: 4, 5, 6）的網址與圖片，補齊對應的專業專案簡介與技術創作標籤。 | 在 projects 陣列中為新增的作詞歌曲影片、短影音創作以及文創商品線上商鋪作品重寫 summary 與 tags，展現多媒體後製、企劃與品牌平面美術的專業整合實務能力，並確保註解無 Emoji 特效。 |
| 2026.06.23 | **修改首頁初始化預設主題為白天模式** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js) | 使用者希望一開始載入首頁時，預設顯示白天模式（Light Mode）而非黑夜模式。 | 將 App.js 中 onMounted 掛載時設定的 data-theme 屬性改為 light，並將 isDarkMode 響應式變數的初始值改為 false，確保全站預設為高質感的白天明亮配色。 | 
| 2026.06.24 | **更新個人簡介並強調 AI 工具應用** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue) | 應使用者要求精修個人簡介文案，將原先較為冗長的自傳介紹，改寫為融入「擅長運用 AI 工具輔助開發與流程優化」之跨域專業版本。 | 將 App.vue 中的個人簡介文字替換為精選的版本 A，強調 Java 後端、專案管理、AI 工具輔助開發與流程優化，並融合企管與資訊科技的跨域商務價值。 |
| 2026.06.24 | **新增回到頂部 (TOP) 懸浮按鈕** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 為了優化行動端與長頁面瀏覽體驗，新增滑動後自動浮現的 TOP 按鈕，點擊可平滑滾動回頁首。 | 在 App.js 實作動態一半滾動高度監聽（並加入 scrollY > 100 且可滾動高度 > 150px 雙重安全防護）與原生 behavior: 'smooth' 平滑置頂方法，同時使用 watch 監聽 route.path 切換分頁時立即將按鈕設為 false 並歸零滾動條（window.scrollTo(0, 0)），解決分頁切換時按鈕殘留滯留的 Bug。於 App.vue 透過 Transition 進行淡入淡出渲染，並在 App.css 內定義霓虹脈衝樣式與 fade 動態過渡效果。 |
| 2026.06.24 | **解決回到頂部按鈕淡出動畫失效之衝突** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 發現回到頂部按鈕套用了帶有 opacity 動態變化的 neonPulse 動畫，導致 Vue 離開過渡動畫 (transition) 中的 opacity: 0 遭覆蓋，無法平滑淡出。 | 將回到頂部按鈕的 animation 改為專屬的 scrollTopPulse 動畫，該動畫僅對發光邊框 (box-shadow) 進行呼吸脈衝，完全不變更 opacity 屬性，成功消除動畫衝突並實現完美的淡出效果。 |
| 2026.06.24 | **解決回到頂部按鈕 display 覆寫 v-show 異常** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 發現回到頂部按鈕在 CSS 中設定了 display: flex !important，此權重強於 Vue 寫入的 style="display: none;" 行內樣式，導致 v-show 隱藏失效，一開始或切換頁面時按鈕都不消失。 | 將 custom-scroll-top-btn 中的 display 屬性及對齊屬性的 !important 標籤全數移除，使 Vue 能順利透過 display: none 進行控制，徹底修復按鈕無法隱藏的嚴重 Bug。 |
| 2026.07.10 | **首頁絕對路徑導致資源未載入** | [index.html](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/index.html) | Favicon 圖標與入口主 JavaScript 在 index.html 中使用了斜線開頭的絕對路徑，違反靜態資源相對路徑化規範，在 GitHub Pages 部署時會指向網域根目錄而導致 404 白畫面或圖標失效。 | 移除首位斜線字元，將路徑修正為 favicon.ico 與 src/main.js 相對路徑，順利符合靜態部署防錯標準。 |
| 2026.07.10 | **文創商品特有網址重複協定疑點釐清** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js) | 文創商品按鈕連結為 `https://httpshancreator-springcom-2.creator-spring.com/`，其中包含 `https://https`，初看容易被誤判定為重複協定的打字錯誤 (Typo)。 | 經確認該網址為 SPRI.NG 電商平台特有的正確商店域名網址（非打字出錯）。特此於歷史紀錄中標記保留，避免後續維護者或 AI 助手誤改。 |
| 2026.07.10 | **5 款互動小遊戲註解補充完成** | `public/games/` 底下所有小遊戲檔案 | 原本的小遊戲檔案缺乏統一的中文化結構與邏輯備忘註解，需依循開發指南之嚴格規範為其補全註解以利長期維護。 | 逐一為五款小遊戲添加詳細的繁體中文註解，嚴格把關註解格式（無 Emoji 符號，HTML 放標籤上方，CSS 放規則上方，JS 放函式上方/行末防呆），並保留所有特意保留的已註解程式碼與 SVG 資料結構。 |
| 2026.07.12 | **5 款小遊戲註解規範化與錯漏字全面修正** | `public/games/` 5 款小遊戲檔案 | 程式碼註解審查發現存在英文註解、簡體中文字型以及多處不通順的機器翻譯亂碼（如「屯素」、「收集筱」、「爬子」等），違反註解繁中化與專業度規範。 | 批次將 English 註解翻譯為繁體中文，修正簡體字形，並將所有翻譯亂碼修正為標準商業中文用詞（如「像素」、「收集箱」、「爪子」等），且 100% 保留所有程式邏輯與已註解偵錯程式碼。 |
| 2026.07.12 | **娃娃機收集箱在手機端被裁切修正** | [claw-machine-game.html](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/public/games/claw-machine-game.html) | 手機畫面（寬度 < 576px）高度及寬度受限時，頂部已收集玩具展示箱的負外距 (margin-top: -74px) 將其拉出視窗頂部，造成玩具頭部被裁切。 | 新增 `@media screen and (max-width: 576px)` 媒體查詢，在手機版中將收集箱的 margin-top 改為正常的正值外距 (10px 0 15px)，完美解決頂部裁切問題。 |
| 2026.07.12 | **機器人遊戲生命扣減至負值與爆炸中移動 Bug 修正** | [bot-game.html](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/public/games/bot-game.html) | (1) 進入繁殖模式的機器人在場上活躍數達上限時無法繁殖，且因跳過一般計時器而使生命秒數扣至負值無限生存；(2) 爆炸中的機器人未立即停止運作而在播放動畫時繼續移動；(3) `distances` 呼叫有多餘參數；(4) `Math.random` 未加上 `()` 呼叫導致咬合演算法失效；(5) 超過活躍數上限無法繁殖時會扎堆卡死。 | (1) 於 `multiply()` 開頭增加生命耗盡死亡判定；(2) 在 `moveBots` 開頭判斷中排除 `b.animation === 'break'` 的爆炸機器人；(3) 刪除 `distances` 呼叫時的多餘參數 `bots`；(4) 將 `Math.random` 修正為 `Math.random()`；(5) 當達到活躍上限無法繁殖時，讓機器人重置回 hunter 模式重回戰場自由活動防止扎堆。 |
| 2026.07.12 | **貓咪遊戲走路滑冰與手機端點擊無效 Bug 修正** | [cat-game.html](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/public/games/cat-game.html) | (1) 貓咪走路動畫以 200ms 的 setTimeout 控制停止，而位移過渡 (transition) 達 1.5 秒，造成貓咪腿部提早停止而在畫面上「滑冰」；(2) 行動裝置單純點擊螢幕（touchstart）無法更新座標，貓咪不會移向點擊處。 | (1) 於 100ms 計時器中動態比對貓咪 current 座標與 target 座標的差值，小於 10px 時才觸發 `stopWalk`；(2) 監聽 `mousedown` 與 `touchstart` 以即時響應點擊移位需求。 |
| 2026.07.12 | **熊貓碰撞小遊戲功能新增與 UI 避讓機制實作** | [panda-game.html](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/public/games/panda-game.html) | (1) 原始小遊戲缺乏滑鼠點擊互動與色彩變化；(2) 點擊背景產生新熊貓時，因點擊事件綁定在帶有負 `z-index` 的 `.wrapper` 上，被 HTML `body` 背景色阻隔而無效；(3) 點擊產生的擊退方向拼接為 `'leftup'` 等非標準字串，使雪碧圖行數定位為 `NaN` 造成畫面損毀；(4) 熊貓走動時常被左下角「設定」按鈕與右下角「署名檔」遮擋或卡住；(5) 手動清除新增熊貓時若不停止其背景定時任務會引發 `TypeError`；(6) 手動「設定」與「重置數量」按鈕在行動端會遮擋到右下角的署名檔；(7) 點擊重置數量按鈕時僅刪除手動多出的熊貓，未能完全將全場熊貓（包含初始 20 隻）的位置與顏色進行洗牌重置。 | (1) 新增點擊熊貓擊退及隨機 HSL 色彩填色；(2) 將背景點擊事件改綁至 `.outer_wrapper` 並使用 `e.stopPropagation()` 阻斷冒泡；(3) 依點擊四象限精準對應至 `upleft` / `upright` / `downleft` / `downright` 標準方向；(4) 於 `collisionCheck` 動態檢測包圍盒與選單及署名檔的 AABB 重疊，若重疊則朝對角（右上或左上）彈飛跌倒防止卡住；(5) 在各動畫、尋路及定時器回呼中新增 `if (!panda.parentNode) return;` 阻斷，並於碰撞偵測中對被刪除物件進行 `if (!panda) continue;`過濾；(6) 控制選單中文化並升級為膠囊圓角按鈕造型，在行動裝置上高度往上提至 `bottom: 60px` 以跟署名檔完美錯開；(7) 重構 `handleClearPandas` 函式，使其在點擊時完全清除畫面上所有的熊貓與定時器、並將 `pandaCount` 歸零後重新以新 HSL 隨機色彩與座標生成 20 隻熊貓。 |
| 2026.07.14 | **Java結業證書項目簡介與樣式類別補充** | [CertificationView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/CertificationView.js) | 專業認證清單中，前兩項 Java 相關結業證書之 accentClass 與 summary 內容留白，需要補充與該專業養成訓練相符的具體文字描述與配色樣式。 | 將 id: 1 與 id: 2 的 accentClass 設定為後端主題色的 `accent-backend`，並分別編寫符合資策會與資展國際培訓內容的繁體中文簡介（不含表情符號），完整呈現後端開發與前後端分離專案的實務能力。 |
| 2026.07.15 | **結訓狀態與培訓時數更新暨樣式一致性校正** | [AboutView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/AboutView.js)<br>[CertificationView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/CertificationView.js) | 使用者已順利結訓，需更新自傳結訓狀態、修正特色經歷的培訓時數，並解決 Java 結業證書與特色經歷中 accentClass 不一致之處。 | (1) 將 bio-4 內容改為已順利完成資策會職訓；(2) 將培訓時數修正為 444 小時；(3) 依規範將 Java 相關之特色經歷與結業證書的 accentClass 統一修正為後端配色 `accent-backend`。 |
| 2026.07.15 | **新增與多元化漸變裝飾條色彩配色** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md)<br>[CertificationView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/CertificationView.js)<br>[AboutView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/AboutView.js)<br>[HomeView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HomeView.js)<br>[SkillView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/SkillView.js) | 使用者期望卡片頂部裝飾條的色彩能更多樣化，原本僅有 5 種色彩且多處重複或單調。 | (1) 於 App.css 新增 `accent-gold` (尊榮金)、`accent-purple` (智慧紫)、`accent-emerald` (淨零綠)、`accent-rose` (深情玫瑰紅) 四組全新漸變色；(2) 於開發指南登錄並說明此四組色彩的應用情境；(3) 分別更新證照、特色經歷、工作經歷及技能分類數據陣列中的 `accentClass` 色彩設定，使同分頁或相鄰項目色彩不重疊，並符合其職稱或內容的意象（如環保用綠色、AI 用紫色、獎項用金色）。 |
| 2026.07.16 | **新增榮譽事蹟路由分頁與完整功能實作** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[index.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/router/index.js)<br>[HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css) | 使用者期望新增存放得獎獎狀、成績單、獎學金的路由與 RouterLink，需要遵循開發流程規範進行開發。 | (1) 於 index.js 註冊 /honor 路由；(2) 依 View-Logic-Style 架構建立 HonorView.vue、HonorView.js、HonorView.css 檔案；(3) 於 App.vue 導覽列新增榮譽事蹟項目；(4) 提供分類篩選與憑證大圖燈箱彈窗，完成繁體中文專業註解。 |
| 2026.07.16 | **榮譽事蹟頁面新增高中得獎與感謝狀 PDF 資源並支援 PDF 燈箱渲染** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 使用者放了高中階段的 PDF 榮譽與感謝狀，需將其資訊整合至 HonorView.js，並解決原先僅支援圖片的 modal 燈箱顯示 PDF 會破圖之限制。 | (1) 將 5 筆高中時期的學期成績優良獎狀、親善大使優異獎狀與商業會感謝狀資訊依日期降序整合至 HonorView.js；(2) 重構 HonorView.vue 的燈箱元件，當偵測到路徑為 .pdf 時改以 iframe 渲染，並在 HonorView.css 中新增 .honor-modal-pdf 響應式寬高樣式，達成雙載體相容。 |
| 2026.07.16 | **榮譽事蹟分類重構升級雙重篩選暨前往按鈕條件渲染控制** | [HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 使用者要求榮譽事蹟需先區分學歷階段（高中職、大學、研究所），再進一步劃分成績單、獲獎事蹟、獎學金，且無官網驗證網址時需隱藏前往按鈕以防空鍵點擊。 | (1) 重構資料層以支持學歷（stage）與類別（type）雙屬性，並實作雙重過濾計算屬性；(2) 於視圖層建立學歷階段、榮譽類別二階段篩選按鈕列；(3) 於 Vue 模板針對「前往官網」按鈕加上 v-if="honor.verifyUrl" 進行條件渲染，使其無網址時自動隱藏；(4) 於開發指南載入對應的榮譽事蹟資料分類規範。 |
| 2026.07.16 | **榮譽事蹟頁面新增研究所 EMBA 歷程並清空大學資料且重編 ID 序** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 使用者放了研究所 EMBA 的 PDF 與圖片歷程，要求按時間序更新，並清空大學的資料，且規定成績單為 ID: 1、高中職依序往後排。 | (1) 將 EMBA 的歷年成績單、系名次第一名、議長獎、學業成績第一名、新詩創作第一名等 6 筆數據整合至 HonorView.js，分配為 id: 1 至 6；(2) 清空大學階段的數據，並將高中職的 5 筆歷程依序重排為 id: 7 至 11，維持正確的時間與結構。 |
| 2026.07.16 | **排名與名次證明歸類於學業成績單分類** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 使用者期望將「畢業生系名次證明書」等排名相關資料與「學期總成績單」歸在同一個分類以簡化展示。 | 於 HonorView.js 中，將「畢業生系名次證明書」(id: 2) 的 type 設為 transcript (學業成績單)，使其能與成績單合併在同一個類別中進行篩選與呈現。 |
| 2026.07.16 | **大學階段歷年成績單與名次證明書新增** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 新增大學時期（崑山科技大學資工系）的歷年成績單與名次證明書 PDF 檔案資源。 | (1) 於 HonorView.js 新增大學（stage: 'university'）的歷年成績單及名次證明書 2 筆數據，分配為 id: 7 與 8，類型皆設為 transcript；(2) 將原高中職的 5 筆歷程 ID 順延往後重編為 id: 9 至 13，以維護正確的學歷時間排序。 |
| 2026.07.16 | **新增大學階段 20 筆榮譽事蹟與獎學金紀錄並重新排序** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 新增大學時期（崑山科技大學）共 20 筆 PDF 榮譽事蹟與獎學金紀錄，需要按時間降序排列，且重新排定各學歷階層之 ID 順序。 | (1) 將 20 筆大專優秀青年、畢業典禮群育獎、文學獎、志工服務、研討會論文、發明展金牌等得獎與獎學金檔案整合至 HonorView.js，分配為 id: 9 至 28；(2) 將其中 KSUniversity6~10（含總統教育獎奮發向上獎）正確分類為獎學金紀錄，其餘歸類為獲獎事蹟；(3) 將原高中職 the 5 筆歷程 ID 再次順延至 id: 29 至 33。 |
| 2026.07.17 | **修復榮譽事蹟卡片頭部在手機/窄螢幕下排版跑版** | [HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css) | 頒發機構、學歷與榮譽類別標籤在手機或窄螢幕下，因水平空間不足擠壓並造成換行跑版，影響視覺美觀。 | 將原本的 inline Bootstrap 彈性排版類別改為自訂的 `.honor-card-header`，並以 CSS 媒體查詢在手機版（max-width: 576px）切換為垂直方向（flex-direction: column），讓標籤與機構名稱獨立換行並靠左對齊，完美解決排版跑版。 |
| 2026.07.17 | **解決左側選單在小高度電腦螢幕下遭截斷問題** | [App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 增加第 5 個路由「榮譽事蹟」後，左側 sticky 粘滯固定之個人名片高度已達約 770px，在大螢幕且高度較小（如 768px 或 730px 視窗）的電腦瀏覽器中，底部按鈕會超出螢幕而遭截斷隱藏。 | (1) 將 sticky 固定效果限制於 `@media (min-height: 660px)` 視窗高度，低於此高度時恢復隨整頁滾動防截斷；(2) 新增 `@media (max-height: 820px)` 響應式壓縮，自動收縮名片內距、頭像、文字大小及選單間距，縮減高度約 120px 且完整保留英文副標。 |
| 2026.07.17 | **新增研究所階段宗倬章先生優秀學生獎學金** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 配合使用者在 `public/images/Honorimg/` 新增 `EMBA5.jpg` 憑證檔案，需將此項榮譽事蹟資料同步登錄至資料層。 | 於 HonorView.js 的 honors 陣列中新增「113學年度宗倬章先生優秀學生獎學金」數據，類別設為 `scholarship`（獎學金），依 2024.11 的取得日期放置在碩士班學歷區塊，並將後續所有項目的 ID 重新遞增編排以維護資料一致性。 |
| 2026.07.17 | **修復榮譽事蹟範圍註解與開發指南描述同步** | [HonorView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/HonorView.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) HonorView.js 中對應學歷階層之 ID 範圍註解過時不正確；(2) 開發指南中關於 EMBA5 憑證副檔名誤記為 .pdf。 | (1) 將 HonorView.js 第 22 行註解修復為碩士班 1~7、大學 8~29、高中職 30~34 實際數據範圍；(2) 同步將開發指南除錯紀錄中之副檔名修正為實際之 .jpg。 |
| 2026.07.17 | **全站排版優化與防損除錯** | 多個視圖與樣式檔案 | (1) 行動端下懸浮按鈕與內容卡片操作按鈕重合遮擋；(2) 奇數個卡片在最後一行靠左對齊不美觀；(3) 打字機定時器銷毀遺漏；(4) 旋轉星球小遊戲註解含簡體字。 | (1) 於 App.css 新增媒體查詢，小螢幕主展示盒 padding-bottom 調大為 7.5rem，並微調懸浮按鈕邊距；(2) 於技能、證照與榮譽事蹟 Vue 視圖 row 上引入 justify-content-center；(3) 於 App.js 實作 onUnmounted 清除定時器；(4) 修正為繁體字「遊戲」。 |
| 2026.07.17 | **作品集影片燈箱嵌入與優化** | [PortfolioView.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/profile/PortfolioView.js)<br>[PortfolioView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/PortfolioView.vue)<br>[PortfolioView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/PortfolioView.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 使用者希望將作品集 id: 1「暖光之丘」專案的作品連結改為嵌入的 YouTube 影片播放，避免直接使用長 HTML 代碼或導致另開新視窗跳離。 | (1) 將專案 id: 1 瀏覽連結更換為 YouTube 嵌入連結；(2) 於 PortfolioView.js 實作 activeVideoUrl 控制狀態與 showVideo/closeVideo 方法；(3) 於 PortfolioView.vue 中設計媒體分流渲染，並在底部建立影音 Lightbox 彈窗 iframe；(4) 於 CSS 完成響應式影片播放器樣式。 |
| 2026.07.17 | **榮譽事蹟篩選按鈕換行排版優化** | [HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue) | 使用者希望在篩選按鈕中，將「全部顯示」與「全部類別」獨立成一行，使其在視覺與分類操作上更為直覺、排版更加整齊。 | 將「全部顯示」與「全部類別」按鈕自原本的 `.honor-filter-bar` 抽離，獨立封裝在各自的整行容器中，維持與子項目（學歷、類別）的自適應兩行排列結構。 |
| 2026.07.17 | **榮譽事蹟篩選器升級為分段切換器 (Segmented Control)** | [HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css) | 解決在手機或窄螢幕下篩選按鈕因跳行顯得複雜雜亂之問題，希望能有類似 app navbar 或開關一樣的直觀對齊感。 | 將篩選按鈕（含全部與子項目）重構為 Segmented Control 設計，消除按鈕邊框與外距，採用 flex 均分比例，並在極小螢幕（<480px）下啟用微幅橫向滾動（隱藏滾動條），達成類似 iOS/Android 實體開關的無跳行精緻視覺。 |
| 2026.07.17 | **篩選標頭與「全部」按鈕置於同一列** | [HonorView.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/views/profile/HonorView.vue)<br>[HonorView.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/profile/HonorView.css) | 為了避免「全部」按鈕擠壓下方 Segmented Control 子按鈕的寬度，將其拆出與「學歷階段：」及「榮譽類別：」標籤文字置於同一行左右並排，釋放下方開關之顯示空間。 | 在各自篩選區塊最上方使用 flex header 讓標題與「全部」按鈕分立左右，下方的分段切換器僅剩三個子項目以 flex: 1 均分排列，在手機上呈現完美對稱不跳行。 |
| 2026.07.17 | **全站預設主題變更為深色黑夜模式** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js) | 使用者希望一開啟履歷網站時，預設顯示科技感十足的深色黑夜模式，而非白天淺色模式。 | 將 App.js 中的 isDarkMode 響應式變數預設值改為 true，並同步在 onMounted 生命週期鉤子中將 html 標籤的預設 data-theme 屬性變更為 dark。 |
| 2026.07.17 | **新增主題切換趣味引導提示氣泡** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 為了引導使用者探索主題切換開關，希望在進入畫面時，能在右下角主題按鈕旁跳出一個有趣的文字提示，並可手動或自動隱藏。 | (1) 在 App.js 實作 showThemeTip 響應式狀態、toggleTheme 觸發自動關閉、onMounted 啟動 8 秒自動關閉定時器，並於 onUnmounted 銷毀；(2) 在 App.vue 的 button 內加上 @click.stop 之 transition 提示氣泡結構；(3) 在 App.css 撰寫對話框樣式與微幅抖動呼吸動畫。 |
| 2026.07.17 | **主題切換按鈕新增趣味呼吸發光切換** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css) | 為了配合開關燈趣味引導氣泡，希望按鈕在氣泡顯示時發出橘色暖光，氣泡隱藏後自動平滑變回原來的 #00f0ff 淺藍色光輝。 | (1) 在 App.vue 的 button 上綁定動態 :class="{ 'has-tip': showThemeTip }"；(2) 在 App.css 撰寫 .has-tip 對應的橘色邊框、橘色陰影及 neonPulseWarm 橘色呼吸發光動畫，透過 Vue 狀態切換與 transition 達成平滑的顏色漸變。 |
| 2026.07.22 | **全站人流計數器核心重構與 CounterAPI 金鑰標準化** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) 線上 API 初始化建立 Key 時可能出現總數小於今日流量之視覺矛盾；(2) 長版次底線 Key 引發 CounterAPI 伺服器 301 重導向並丟失 CORS 標頭；(3) 網路傳輸延遲導致數字閃爍倒退。 | (1) 將 API 金鑰簡化為 CounterAPI 標準規範 (`today`/`month`/`year`/`total`) 消除 301 重導向；(2) 引入時間基線單調平滑保護 (Monotonic Lock) 與 `Total >= Year >= Month >= Today` 數學階層保障，確保數字平滑遞增不倒退；(3) 還原 100% 真實訪客動態 `+1` 累加功能且 0 控制台報錯。 |
| 2026.07.22 | **在線人數 (Presence) 視覺、分頁領袖選舉與跨裝置同步架構** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) 無效外部 WebSocket 請求引起的控制台報錯；(2) 僅採 `BroadcastChannel` 無法實現跨實體裝置 (手機與電腦) 人數同步；(3) 多頁籤頻繁輪詢超過 CounterAPI 限流 (HTTP 429) 引發 CORS 警告。 | (1) 在 App.vue 與 App.css 建立在線人數標籤與綠色 Pulse 呼吸動畫；(2) 於 App.js 修復 `onMounted` 異步 TypeError，實作版次快取重置 Key；(3) 透過 `localStorage` 實作分頁領袖選舉 (Leader Election)，僅限領袖頁面以 20 秒降頻輪詢雲端，配合 BroadcastChannel 同源心跳，徹底消除 HTTP 429 與 CORS 報錯。附注：解決方案中的「跨瀏覽器與跨裝置實時同步」描述後來確認技術上不可行（各瀏覽器 localStorage 各自隔離），且 `visibilitychange` 觸發的休眠扣減邏輯於 2026.07.23 以新增三筆除錯紀錄追蹤並最終徹底重構為正確版本，詳見第 482~486 筆記錄。 |
| 2026.07.23 | **徹底清除 presence 外連請求，100% 消除 CORS 與 net::ERR_FAILED 報錯** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) GitHub Pages 靜態託管環境對 CounterAPI `/presence` 發送 HTTP 請求時，因 key 未建立或伺服器錯誤回傳 404/429 且缺乏 `Access-Control-Allow-Origin` 跨域標頭，引發瀏覽器跳出 CORS 阻擋與 `net::ERR_FAILED` 報錯；(2) 原 `updateCount` 鎖定高值與領袖重複 ID 影響動態增減。 | (1) 徹底移除 `initOnlinePresence` 中對 `CounterAPI` 的所有 `/presence` 外連請求，回歸乾淨安全的 BroadcastChannel 心跳、Storage 視窗事件與 localStorage 分頁註冊，達成 100% 零控制台錯訊；(2) 新增 `visibilitychange` 事件監聽，分頁於 hidden 狀態時自動執行休眠扣減，切回 visible 時恢復上線；(3) 100% 恪守繁體中文純文字與無 Emoji 註解規範。 |
| 2026.07.23 | **人流計數器歸零邏輯修正與 API Key 底線 CORS 問題根除** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) 舊版 `today`/`month`/`year` 使用固定 API Key，伺服器端與本地快取均不會隨日期、月份、年份重置，導致四個數字永遠累積不歸零；(2) 第一次修正時引入了含底線的日期後綴（如 `today_2026_07_23`），再度觸發 CounterAPI 的 301 重導向 CORS 阻擋問題（此問題已在 2026.07.22 被記錄過）；(3) localStorage 以單一 JSON 物件儲存四值，換日後讀取舊快取；(4) `totalCount = Math.max(yearCount + 10, rawTotal)` 人為虛增累計數字。 | (1) 將所有 API Key 改為純英數字拼接格式（嚴禁底線）：今日 `t20260723`、本月 `m202607`、本年 `y2026`、累計 `totalv15`，消除 301 CORS 報錯；(2) 各計數器的 localStorage 快取 key 同步改為以 API key 為後綴的純英數字格式（如 `hanstatt20260723`），換日/月/年後讀不到舊快取，自然從 0 重新累計；(3) session 識別 key 同步改為純英數字格式（如 `hansest20260723`）；(4) 移除 `Math.max(yearCount + 10, rawTotal)` 的人為加值，改為 `Math.max(yearCount, rawTotal)`；(5) API 成功時直接使用 `val`；(6) 建立「API Key 嚴禁含底線」防呆規範並記錄至函式說明註解。 |
| 2026.07.23 | **在線人數多分頁計數始終為 1 的 Bug 修正與技術邊界說明** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) `handleStorageChange` 在清空 `activeClients` 後從 localStorage 重建時，未補回當前分頁自身的 `myClientId`，導致接收到 storage 事件的分頁自我計數為 0，配合 `Math.max(1, ...)` 永遠顯示 1；(2) 心跳間隔（2.5s）與逾時閾值（7s）的判斷條件（`>= 7000` vs `> 7000`）不一致；(3) 跨不同瀏覽器（Chrome、Firefox 等）因各自有獨立的 localStorage 空間，本方案技術上無法實現跨瀏覽器的真實在線同步，此為靜態網站的本質技術限制，並非 Bug。 | (1) 在 `handleStorageChange` 清空重建後，新增 `if (isAppVisible) activeClients.set(myClientId, now)` 補回自己的 ID，再直接計算 `onlineVisitors.value`，確保自己不被漏算；(2) 統一逾時閾值常數 `TIMEOUT_MS = 6000`，供 `updateCount`、`sendLocalHeartbeat` 與 `handleStorageChange` 三處統一引用；(3) 心跳頻率從 2.5 秒縮短為 1.5 秒，確保在 6 秒逾時前至少發送 3 次心跳，提高同分頁計數靈敏度；(4) 於函式說明註解中明確標注跨不同瀏覽器或裝置因 localStorage 各自獨立無法互通的技術限制，供後續維護者知悉。 |
| 2026.07.23 | **在線人數永遠為 1 的根本 Bug 修正：visibilitychange 錯誤觸發離場邏輯** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 真正根本原因：使用者按下 `Ctrl+T` 開啟新分頁時，原本的分頁（Tab 1）會瞬間切換為 `document.visibilityState === 'hidden'`，此時 `handleVisibilityChange` 錯誤地將「背景分頁」等同於「關閉分頁」，呼叫了 `handlePageLeave()`，導致 Tab 1 主動將自己從 localStorage 與 BroadcastChannel 中移除並廣播 leave 訊息；新開的 Tab 2 接收到 leave 訊號後將 Tab 1 從 `activeClients` 刪除，Tab 2 只剩自己一人，永遠顯示 1；Tab 1 因 `isAppVisible = false` 停止心跳，即使切回 Tab 1 也無法補救，兩個分頁均顯示 1。 | (1) 徹底移除 `handleVisibilityChange` 函式與 `visibilitychange` 事件監聽，背景分頁不觸發離場；(2) 移除 `isAppVisible` 旗標及 `sendLocalHeartbeat` 中的 `if (!isAppVisible) return` 守衛，心跳不再受分頁可見性影響，永遠持續發送；(3) 移除 `updateCount` 中的 `isAppVisible` 條件判斷，改為直接 `activeClients.set(myClientId, now)` 永遠計入自己；(4) `handlePageLeave` 僅由 `pagehide` 與 `beforeunload`（分頁真正關閉）觸發；(5) 升級 localStorage key 為 `han_active_tabs_v16`、BroadcastChannel 為 `han_presence_v16`，清除舊格式殘留資料。 |
| 2026.07.23 | **F5 重整觸發人流計數器 CORS 報錯：讀取端點也會 301 重導向** | [App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | F5 重整後 `isNewSession = false`（舊 Session），程式碼嘗試呼叫 CounterAPI 的「讀取端點」（`GET /t20260723`，不帶 `/up`）以取得當前計數；但 CounterAPI 的「讀取端點」同樣回傳 301 重導向，301 回應不含 CORS 標頭，導致瀏覽器阻擋並拋出 `net::ERR_FAILED` 與 CORS 報錯。此前誤以為只有「含底線的 key」才會 301，實際上「無底線 key 的讀取端點」也同樣 301。 | (1) 新增「舊 Session 早期返回」邏輯：若 `isNewSession = false`，直接從 localStorage 快取讀取並顯示數值，完全不發起任何 API 請求，根本消除 F5 重整 CORS 報錯；(2) 將 API 呼叫函式從 `fetchAndIncrementKey`（含讀取分支）重構為 `fetchUpKey`（只呼叫 `/up`），確保任何情況下都不呼叫讀取端點；(3) 新 Session 的 API 失敗 fallback 從 `cachedVal + (isNewSession ? 1 : 0)` 簡化為 `cachedVal + 1`（必為新 Session 才執行到此）；(4) Session 標記寫入時機移至 API 呼叫成功後，確保成功計數才標記 Session。 |
| 2026.07.23 | **全站導入 vue-i18n 多國語系 (繁中/英/日) 切換、UX 左上角定位與行動端防跑版重構** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)<br>[i18n/index.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/i18n/index.js)<br>[zh-TW.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/locales/zh-TW.js)<br>[en.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/locales/en.js)<br>[ja.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/locales/ja.js)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | (1) 原僅支援單一繁中，缺乏英/日文以對應海外與日商求職需求；(2) 舊版 App.js 引入相對路徑少跨一級引發 Vite `Failed to resolve import`；(3) 按鈕原放在右下角易造成懸浮按鈕過度堆疊；(4) 按鈕顯示當前語言名稱導致外國訪客在中文頁無法辨識切換鍵；(5) 按鈕標籤為 4 個平假名 `にほんご` 時因字型過大引發跑版折行。 | (1) 安裝 `vue-i18n@10` 並配置 `zh-TW` / `en` / `ja` 三語系字典，實作 `switchLanguage` 將語系偏好寫入 `localStorage` (key: `han_language_pref`)；(2) 路徑更正為 Vite 別名 `@/i18n/index.js` 消除編譯錯誤；(3) 懸浮按鈕移至左上角獨立固定，桌機 `top: 1.5rem; left: 1.5rem;`，手機 (<=576px) 均勻放大為 `55px * 55px` 提升觸控感；(4) 按鈕標籤改為顯示「目標切換語系」（中文顯示 **EN**、英文顯示 **にほんご**、日文顯示 **繁中**）；(5) CSS 加上 `white-space: nowrap !important;` 與 `font-size: 0.78rem` 確保 `にほんご` 100% 單行不折行溢出；(6) 監聽 `locale` 切換時自動重置打字機動畫並寫入新語系描述。 |
| 2026.07.23 | **全站頁面頂端捲動進度條 (Scroll Progress Bar) 結合旋轉星球 (rotatingplanet17) 動態拖尾重構** | [App.vue](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/App.vue)<br>[App.js](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/js/App.js)<br>[App.css](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/src/assets/css/App.css)<br>[DEVELOPMENT_GUIDE.md](file:///c:/Users/s1080/Desktop/JOHN/my-profile-website/DEVELOPMENT_GUIDE.md) | 應使用者要求強化網頁極致視覺細節與趣味性：單純的線條較為單調，希望能結合 `public/images/games/rotatingplanet17.jpg` 星球圖片，營造出星球在頂端滾動前進、身後不斷拖曳延伸出橘色發光進度條軌跡的宇宙科技視覺感。 | (1) 於 `App.js` 實作 `scrollProgress` 響應式百分比與 `updateScrollProgress` 滾動/縮放/分頁重置邏輯；(2) 於 `App.vue` 頂端進度條內部嵌入 `.scroll-planet-head` 星球圖案容器，並使用 `:src="'images/games/rotatingplanet17.jpg'"` 動態綁定語法（徹底消除 Vite 將 public 靜態資源當作本地模組解析引發的 `Failed to resolve import` 錯訊）；(3) 於 `App.css` 定義進度條 4px 橘色發光軌跡與 `.is-active` 0% 滾動隱藏；(4) 為前端星球套用 `26px * 26px` 正圓邊框、橘色發光陰影，並加上 `@keyframes planetSpin` 360 度無限連續自轉動畫；(5) 將 `.scroll-planet-head` 垂直偏移調整為 `top: 14px` (transform: translateY(-50%))，使整顆星球完全於螢幕視窗可見區域內垂直精準對齊，徹底消除頂部被視窗頂緣截斷的問題。 |
















