# Changelog

所有對 SynergyStudyTool 專案的顯著更動將紀錄於此。
本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html) 規範。

## [0.0.4] - 2026-05-01 (蕃茄鐘和日報設計)
### Added
- 建立 `src/models/focusSession` 的 Mongoose Schema 設計。
- 建立 `src/controllers/focusSessions` 並實現新增蕃茄鐘邏輯
- 建立 `src/controllers/analytics` 並實現抓取相關資料並回傳以供前端顯示日報
- 建立 `src/routes/focusRouter`
- 建立 `src/routes/analyticsRouter`
- 在 `docs/API_SPEC` 新增相關API邏輯 

### Changed
- 更改 `src/models/task` 之資料結構, 新增 `notes` 為其中之一子陣列綁定建立的note 

---

## [0.0.3] - 2026-04-30 (Note資料型態和邏輯設計)
### Added
- 建立 `src/models/note` 的 Mongoose Schema 設計。
- 建立 `src/controllers/notes` 並實現筆記建立和綁定邏輯
- 建立 `src/routes/NotesRouter`
- 在 `docs/API_SPEC` 新增Notes相關API邏輯 

### Changed
- 更改 `src/models/task` 之資料結構, 新增 `notes` 為其中之一子陣列綁定建立的note 

---

## [0.0.2] - 2026-04-29 (Task資料型態和邏輯設計)
### Added
- 建立 `src/models/task` 的 Mongoose Schema 設計。
- 建立 `docs/API_SPEC.md` 用於定義前後端通訊協定並新增TASK相關CRUD。
- 建立 `src/controllers/tasks` 並實現API通訊邏輯
- 建立 `tests/requests` 用於建立.rest檔案進行手動測試API
- 建立 `src/middleware` 並初始化 `requestLogger`, `unknowEndpoint`, `errorHandler` 等除錯中間件
- 建立 `src/routes/TasksRouter` 路由管理API通訊邏輯

### Changed
- 將 `src/config/config.js` 重新命名為 `env.js` 以提升語意清晰度。

---

## [0.0.1] - 2026-04-28 (專案初始化)
### Added
- 初始化專案結構，採用 Monorepo 邏輯區分 `client/` 與 `server/`。
- 實作 MongoDB Atlas 連線配置，並加入環境變數管理 (`dotenv`)。
- 建立 `src/utils/logger.js` 用於標準化後端日誌輸出。

### Security
- 設定 `.gitignore` 確保 `.env` 與 `node_modules` 不會被提交至版本控制。

## note (temp)
Added: 新增的功能（Feature）。

Changed: 現有功能的變更（例如：API 欄位名稱修改）。

Deprecated: 預計在未來版本刪除的功能。

Removed: 此版本已正式刪除的功能。

Fixed: 所有的 Bug 修復（你之前的 Router 報錯就寫這）。

Security: 漏洞修復或安全強化。