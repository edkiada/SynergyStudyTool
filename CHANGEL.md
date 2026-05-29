# Changelog

所有對 SynergyStudyTool 專案的顯著更動將紀錄於此。
本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html) 規範。

## [0.0.6] - 2026-5-29
### feat
- 計時器UI設計 `client/src/components/focusComponents/dualTimer`, `client/src/view/focusView.vue`

### refactor
- 將component依頁面打包 `client/src/components`, `client/src/view`

### style
- 將 header 和 navBar 的留白由padding改為margin `client/src/components/globalComponents/header/header.css`, `client/src/components/globalComponents/navBar/navBar.css`
- 新增顏色變數 `client/src/style.css`

## [0.0.55] - 2026-5-28
### feat
- 新增focus頁面 `client/src/view/focusView.vue`
- 新增mainStore並管理當前頁面變數 `client/src/stores/mainStore.ts` 
- router中心路由管理 `client/src/router/index.ts`
- 相關路徑掛載Router `client/src/App.vue`, `client/main.ts`
- 改為使用mainStore變數記錄當前頁面 `client/src/components/navBar/navBar.vue`
- 增加RouterLink導覽至task和focus `client/src/components/navBar/navBar.vue`

### chore 
- 新增Router插件 `client/package.json`, `client/package-lock.json`
- 更名main.vue為taskView.vue `client/src/view/taskView.vue`

## [0.0.54] - 2026-5-24
### feat
- 新增task邏輯(排序功能) `server/src/services/taskService.js`
- 掛載task排序邏輯進GET Request `server/src/controllers/tasks.js`

### style
- 更改taskTag UI `client/src/taskContent`
- 更改顏色變數 `client/src/style.css`


## [0.0.53] - 2026-05-23
### Added
- 新增taskTag相關UI顯示 `client/src/component/taskContent`
- 新增tag顏色選擇和輸入標籤名稱 `client/src/component/addTask`

### Change
- 新增tag相關資料欄位 `server/src/models/tasks.js`
- 新增請求資料欄位 `server/src/controllers/tasks.js`
- 新增dataStore之task資料欄位 `client/src/stores/taskStore.ts`

### Fixed
- 滑動刪除之按鈕位置錯誤影響排版問題修正 `client/src/component/taskContent`
- cors參數之相關設定 `server/src/app.js`

### chore
- 新增八種顏色全域變數 `client/src/style.css`

## [0.0.52] - 2026-05-22
### Added
- 增加task欄位的priority顯示 `client/src/components/taskContent.vue`
- 更改任務狀態(pending | completed) `client/src/components/taskContent.vue`
- task欄位之priority顯示之對應顏色與完成任務 `client/src/components/taskContent.css`
- 新增多種全域自定義顏色 `client/src/style.css`
- 更改任務狀態之API查詢 `client/src/stores/taskStore.ts`
- 打勾icon `src/assets/icons/tick.svg`


## [0.0.51] - 2026-05-18 
### Docs
- 建立 `docs/README.md` 
- 更新 `docs/SRS.md` 文件並新增Task前後端交互邏輯說明.
- 修正 `CHANGEL.md` 文件之部分錯誤化路徑


## [0.0.5] - 2026-05-17 (Task頁面(前端))
### Added
- 建立 `client/src/components/addTask` 處理新增任務之overlay頁面
- 建立 `client/src/components/header` 作今日日期和User入口
- 建立 `client/src/components/navBar` 作四種子分頁之索引
- 建立 `client/src/components/taskContent` 顯示task內容
- 建立 `client/src/stores/taskStore.ts` 作為task頁面之API請求和狀態管理
- 建立 task 之 fegma初稿 


## [0.0.4] - 2026-05-01 (蕃茄鐘和日報設計和UI)
### Added
- 建立 `server/src/models/focusSession` 的 Mongoose Schema 設計。
- 建立 `server/src/controllers/focusSessions` 並實現新增蕃茄鐘邏輯
- 建立 `server/src/controllers/analytics` 並實現抓取相關資料並回傳以供前端顯示日報
- 建立 `server/src/routes/focusRouter`
- 建立 `server/src/routes/analyticsRouter`
- 在 `docs/API_SPEC` 新增相關API邏輯

### Changed
- 更改 `server/src/models/task` 之資料結構, 將 `createdAt` 改成 `completedAt` 
- 在 `server/src/models/task` 裡新增.pre中間件, 實現更改state至completed時自動記錄completedAt時間

---

## [0.0.3] - 2026-04-30 (Note資料型態和邏輯設計)
### Added
- 建立 `server/src/models/note` 的 Mongoose Schema 設計。
- 建立 `server/src/controllers/notes` 並實現筆記建立和綁定邏輯
- 建立 `server/src/routes/NotesRouter`
- 在 `docs/API_SPEC` 新增Notes相關API邏輯 

### Changed
- 更改 `server/src/models/task` 之資料結構, 新增 `notes` 為其中之一子陣列綁定建立的note 

---

## [0.0.2] - 2026-04-29 (Task資料型態和邏輯設計)
### Added
- 建立 `server/src/models/task` 的 Mongoose Schema 設計。
- 建立 `docs/API_SPEC.md` 用於定義前後端通訊協定並新增TASK相關CRUD。
- 建立 `server/src/controllers/tasks` 並實現API通訊邏輯
- 建立 `server/tests/requests` 用於建立.rest檔案進行手動測試API
- 建立 `server/src/middleware` 並初始化 `requestLogger`, `unknowEndpoint`, `errorHandler` 等除錯中間件
- 建立 `server/src/routes/TasksRouter` 路由管理API通訊邏輯

### Changed
- 將 `server/src/config/config.js` 重新命名為 `env.js` 以提升語意清晰度。

---

## [0.0.1] - 2026-04-28 (專案初始化)
### Added
- 初始化專案結構，採用 Monorepo 邏輯區分 `client/` 與 `server/`。
- 實作 MongoDB Atlas 連線配置，並加入環境變數管理 (`dotenv`)。
- 建立 `server/src/utils/logger.js` 用於標準化後端日誌輸出。

### Security
- 設定 `.gitignore` 確保 `.env` 與 `node_modules` 不會被提交至版本控制。



## note (temp)
**`feat`**: (Feature) Use this when you add new functionality.

**`fix`**: Use this when you repair a bug.

**`docs`**: (Documentation) Use this for README updates or comments.

**`style`**: Use this for CSS, formatting, or UI changes that don't change logic.

**`refactor`**: Use this when you rewrite code to make it better without changing what it does.

**`chore`**: Use this for maintenance (like installing packages).