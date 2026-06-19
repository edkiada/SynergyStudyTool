# Changelog

所有對 SynergyStudyTool 專案的顯著更動將紀錄於此。
本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html) 規範。
## [0.0.81] - 2026-6-19
### feat
- Login頁面表單切版內容 `client/src/components/globalComponents/userInfo`
- login request(token) `server/src/controllers/login.js`, `server/src/routes/loginRouter.js`, `.gitignore`, `server/src/app.js` 

## [0.0.8] - 2026-6-18
### feat
- 新增user對task欄位一對多綁定設計 `server/src/controllers/tasks.js`, `server/src/controllers/users.js`, `server/src/models/task.js`, `server/src/models/user.js`, `server/src/routes/usersRouter.js`
- 新增user對task欄位一對多綁定設計(前端對應pinia欄位) `client/src/stores/taskStore.ts`
- 新增使用者頁面(overlay模式) `client/src/components/globalComponents/header`, `client/src/components/globalComponents/userInfo`, `client/src/assets/icons/leftArrow.svg`, `client/src/assets/icons/login.svg`
### chore
- 更新jsonwebtoken `server/package-lock.json`

## [0.0.75] - 2026-6-15
### fix 
- 解決計時器錯誤問題 `client/src/components/focusComponents/dualTimer/dualTimer.vue`
- 切換計時模式造成錯誤記錄問題 `client/src/components/focusComponents/dualTimer/dualTimer.vue`
### feat 
- user schema初始化和controller初始化並新增POST request `server/src/controllers/users.js`, `server/src/models/user.js`, `server/src/routes/usersRouter.js`, `server/src/app.js`

## [0.0.74] -2026-6-14
### feat
- 將當前calendar日期存儲至pinia `client/src/components/calendarComponents/cHeader/cHeader.vue`, `client/src/stores/focusStore.ts`
- FocusSession個別刪除和task的聯動 `server/src/controllers/focusSessions.js`, `server/src/models/task.js`, `server/src/routes/focusRouter.js`

### fix
- 解決刪除任務不會連帶刪除其focusSession問題 `server/src/controllers/tasks.js`, `server/src/services/focusService.js`, `server/src/services/taskService.js`

## [0.0.73] -2026-6-12
### feat 
- calendar記錄顯示task title優化 `client/src/components/calendarComponents/timeLine`, `client/src/style.css`
- calendar記錄顯示task durationTime `client/src/components/calendarComponents/timeLine`
### style
- claendar記錄顯示focusSession樣式設計 `client/src/components/calendarComponents/timeLine`

### fix
- 優化重複focusSession關聯之task title `server/src/models/focusSession.js`, `client/src/stores/focusStore.ts`, `client/src/components/focusComponents/dualTimer/dualTimer.vue`

## [0.0.72] - 2026-6-11
### feat
- 繪製focus時間並在calendar圖示化 `client/src/components/calendarComponents/timeLine`, `client/src/stores/focusStore.ts`
- calendar記錄顯示task title `server/src/models/focusSession.js`, `client/src/stores/focusStore.ts`, `client/src/components/focusComponents/dualTimer/dualTimer.vue`
- calendar顯示條件化(過低時間不顯示)  `client/src/components/calendarComponents/timeLine/timeLine.vue`
### fix
- 修正addFocus錯誤將日期格式認為string `client/src/components/focusComponents/dualTimer/dualTimer.vue`, `client/src/stores/focusStore.ts`

## [0.0.71] - 2026-6-10
### feat
- 讀取自選日期之focus資料(後端) `server/src/controllers/focusSessions.js`, `server/src/models/focusSession.js`, `server/src/routes/focusRouter.js`
- Calendar頁面之timeLine Components初始化 `client/src/components/calendarComponents/timeLine`, `client/src/view/calendarView.vue`

### docs
- 更改API_SPEC之自選日期需求 `docs/API_SPEC.md`

### fix 
- 使用大駝峰命名錯誤 `server/src/routes/focusRouter.js`

## [0.0.7] - 2026-6-07
### feat
- 初始化calendar頁面 `client/src/view/calendarView.vue`, `client/src/router/index.ts`, `client/src/components/globalComponents/navBar/navBar.vue`
- calendar頁面header(選擇日期特殊版) `client/src/components/calendarComponents/cHeader` 

### style
- 顏色變數 `client/src/style.css`

## [0.0.66] - 2026-6-05
### fix
- 刷新頁面造成Task refId遺失 `client/src/components/focusComponents/focusTask/focusTask.vue`, `client/src/components/taskComponents/taskContent/taskContent.vue`

## [0.0.65] - 2026-6-04
### feat
- 停止計時後將時間加總至當前任務 `client/src/components/focusComponents/dualTimer/dualTimer.vue`

### fix
- 刪除任務之任務殘留顯示問題(只處理破圖, 未解決根源) `client/src/components/taskComponents/taskContent/taskContent.vue`
- 重複呼叫fetchTask問題 `client/src/view/taskView.vue`

## [0.0.64] - 2026-6-03
### feat
- focusStore創建 `client/src/stores/focusStore.ts`

### fix
- focusTaskId用以追蹤刪除的任務是否為當前專注任務 `client/src/components/focusComponents/focusTask/focusTask.vue`, `client/src/components/taskComponents/taskContent`, `client/src/stores/taskStore.ts`
- 命名錯誤 `client/src/components/focusComponents/focusTask/focusTask.vue`, `client/src/components/taskComponents/taskContent`, `client/src/stores/taskStore.ts`

## [0.0.63] - 2026-6-02
### feat
- 新增由task點擊start按鈕跳轉focus頁面功能 `client/src/components/taskComponents/taskContent`
- 倒／順計時核心邏輯 `client/src/components/focusComponents/dualTimer`

### fix
- 針對focusTask在pinia部分action補commit `client/src/stores/taskStore.ts`

### refactor
- 將切換頁面switchView包裝成action寫入main `client/src/components/globalComponents/navBar/navBar.vue`, `client/src/stores/mainStore.ts`


## [0.0.62] - 2026-5-31
### feat
- 使用localStorage儲存當前任務選擇 `client/src/components/focusComponents/focusTask/focusTask.vue`

### fix
- 解決中英文文字行高不同問題 `client/src/components/focusComponents/focusTask/focusTask.css`
- 解決因為原生縮放導致的畫面跑版問題 `client/src/style.css`

## [0.0.61] - 2026-5-30
### feat
- focus介面當前task UI設計 `client/src/components/focusComponents/focusTask`, `client/src/view/taskView.vue`, `client/src/assets/icons/dropdown.svg`


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