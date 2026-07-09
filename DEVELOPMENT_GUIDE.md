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

## 7. 除錯紀錄區 (Debugging Log)

為落實規範，以下詳細記錄本專案於開發與佈局防錯過程中的關鍵除錯紀錄：

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
