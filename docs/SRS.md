# SynergyStudyTool(協同學習工具)

## Table of Contents

- [Revision History](#revision-history)
- [Document Conventions](#document-conventions)
- [Glossary](#glossary)
- [1. Introduction](#1-introduction)
    - [1.1 Purpose](#11-purpose)
    - [1.2 Scope](#12-scope)
    - [1.3 Context / Business Need](#13-context--business-need)
    - [1.4 Stakeholders](#14-stakeholders)
    - [1.5 References](#15-references)
- [2. Project Description](#2-project-description)
    - [2.1 Goals and Features](#21-goals-and-features)
    - [2.2 Target Audiences](#22-target-audiences)
    - [2.3 Operating Environment](#23-operating-environment)
    - [2.4 Design and Implementation Constraints](#24-design-and-implementation-constraints)
- [3. Requirements](#3-requirements)
    - [3.1 功能性需求 (Functional Requirements)](#31-功能性需求-functional-requirements)
        - [3.1.1 待辦任務管理模組](#311-待辦任務管理模組-to-do-list-module)
        - [3.1.2 番茄鐘與任務掛載連動](#312-番茄鐘與任務掛載連動-pomodoro--synergy-logic)
        - [3.1.3 脈絡筆記模組](#313-脈絡筆記模組-synergy-notes-module)


## Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026/04/27 | V0.0.1 | 起草協同學習工具 V1.0 需求清單與願景 | edkiada |
| 2026/04/29 | V0.0.2 | Task資料型態和邏輯設計 | edkiada |
| 2026/04/30 | V0.0.3 | Note資料型態和邏輯設計 | edkiada |

## Document Conventions

- 在必須中英文並陳時，將以「英文（中文）」方式呈現.
- **命名規範:** 本文件涉及之程式碼變數、API 路由路徑、資料庫欄位名稱，統一採用 **lowerCamelCase（小駝峰式命名法）**.
- **符號標記：**
  - **[中括號]**：代表使用者介面中的具體元件（如：點擊 [儲存] 按鈕）。
  - `等寬字體`：代表技術術語、變數名稱或 API 路徑（如：`/api/userProfile`）。

## Glossary
* **JWT (JSON Web Token)**: 一種開放標準，用於在各方之間以 JSON 物件的形式安全地傳輸資訊，常用於身份驗證。
* **RWD (Responsive Web Design)**: 響應式網頁設計，使網頁能根據不同裝置（桌面、平板、手機）的螢幕尺寸自動調整佈局。
* **LTS (Long Term Support)**: 長期支援版本，指軟體生命週期中較為穩定且獲得較長時間維護的版本。
* **Cross-query (交叉查詢)**: 指在資料庫中透過關聯欄位，同時檢索多個不同集合（Collections）或資料表的技術。

## 1. Introduction

本文件旨在詳盡定義「SynergyStudyTool（協同學習工具）」之軟體需求規格

### 1.1 Purpose
1. **開發基準:** 作為後續系統設計（System Design）與實作階段之核心指導方針。
2. **驗證依據:** 定義系統應達成之各項功能與非功能性指標，作為軟體測試與品質保證之準則。
3. **專案溝通:** 向利益關係人說明系統之技術架構、核心價值與實作範圍。

### 1.2 Scope
本專案所開發之系統名為「SynergyStudyTool（協同學習工具）」，是一個基於全端架構（Full-stack Architecture）的整合型學習生產力工具。

#### 1.2.1 系統涵蓋範疇 (In-Scope)
本系統將實現以下核心模組：
- **使用者驗證系統:** 基於JWT(JSON Web Token) 實作身份驗證與授權機制。
- **微型筆記模組 (Micro-Notes):** 提供基於 Markdown 格式的即時筆記記錄、儲存與分類功能。
- **番茄鐘計時模組 (Pomodoro Timer):** 具備可自定義時長的專注計時器，並支援階段性休息提醒。
- **待辦清單模組 (To-Do List):** 提供任務之新增、刪除、編輯與完成狀態標記，協助使用者管理學習進度。
- **數據協同機制 (Synergy Logic):** 實作模組間的數據關聯和互動關係

#### 1.2.2 排除事項與後續規劃 (Out-of-Scope & Future Enhancements)
以下功能暫不包含於 **V0.1 核心版本** 之實作範疇，但系統架構設計將預留相關擴充介面，以利於未來迭代開發：
* **原生行動裝置應用 (Native Mobile App)**：首版專注於 Web 端的跨平台通用性，行動版將列入後續之發展藍圖。
* **社群協作功能**：為確保 V0.1 之數據隱私，初期暫不開放共同編輯，待權限系統架構穩定後再行評估。
* **離線數據同步**：目前以實時通訊（Real-time API）為主，離線緩存機制（如 PWA 或 IndexedDB）預計於後續版本評估納入。

### 1.3 Context / Business Need
本專案之開發源於對數位學習過程中「工具碎片化」現象之深度觀察。

#### 1.3.1 問題陳述 (Problem Statement)
1. **情境切換成本 (Context Switching Cost)**：
   目前主流的生產力工具（如 Todoist, Notion, Forest）通常基於 **SRP(單一職責原則)** 獨立存在。使用者在學習時需頻繁在不同視窗間切換，這種操作會中斷大腦的「心流（Flow State）」，導致顯著的認知損耗。
2. **數據孤島與整合困境 (Data Silos & Integration Barrier)**：
   由於不同開發商間的技術壁壘，現有工具之數據難以實現深層連動。即便透過第三方 API 整合，亦常面臨邏輯衝突、即時性不足及 UI 不一致等問題。
3. **學習脈絡的斷層**：
   傳統筆記軟體無法自動記錄「產生該筆記時的任務背景」，導致學習歷程缺乏與任務維度的關聯資訊。

#### 1.3.2 預期效益 (Intended Benefits)
1. **實現垂直整合 (Vertical Integration)**：
   透過從底層資料架構出發的垂直設計，將待辦清單、番茄鐘與筆記模組無縫結合，消除工具間的溝通隔閡。
2. **強化數據連貫性 (Data Synergy)**：
   使用者可透過「Synergy Logic」自動建立任務進度、專注時間與知識紀錄間的關聯，使學習數據具備完整的脈絡資訊，提升回顧成效。

### 1.4 Stakeholders
本系統之主要利益關係人包含：
1. **學習者 (Learners)**：尋求高效、無干擾學習環境之主要操作者。
2. **開發人員 (Developer)**：負責系統架構設計、程式碼實作與效能優化。
3. **學術評審 (Academic Reviewers)**：評估專案之技術實踐價值與軟體工程規範遵循程度。

## 2. Project Description

### 2.1 Goals and Features
本專案之核心目標為建立一整合型學習工作台，達成「任務管理」、「專注計時」與「知識紀錄」之垂直整合。

#### 2.1.1 核心目標 (Goals)
1. **系統應 (Shall)** 整合待辦清單、番茄鐘與筆記功能於單一網頁介面。
2. **系統應 (Shall)** 降低模組間的資料交換成本，實現學習數據的自動協同。

#### 2.1.2 系統特色 (System Features)
* **聯動性 (Synergy)**：
    * **系統應 (Shall)** 允許使用者將「番茄鐘」掛載至「待辦任務」。
    * **系統應 (Shall)** 在番茄鐘計時結束時，自動產生包含任務背景與時間戳記的筆記草稿。
* **數據整合**：
    * **系統應 (Shall)** 透過單一資料庫存取接口，確保三項工具之數據能進行交叉查詢（Cross-query）。

### 2.2 Target Audiences
本系統之設計主要針對以下族群：
* **數位學習者**：需要在電腦前長時間專注學習，且有使用數位筆記習慣之使用者。
* **開發初學者**：尋求一站式工具管理任務與技術筆記之人員。

### 2.3 Operating Environment
本系統採全端 Web 架構開發，確保跨平台之可用性。

* **硬體平台 (Hardware)**：
    * **開發端**：Apple Mac 系統環境。
    * **使用者端**：支援具備網際網路連線之個人電腦、平板或智慧型手機。
* **軟體環境 (Software)**：
    * **前端運行環境**：支援響應式網頁設計 (RWD)，相容於各類行動端與桌面端之主流瀏覽器（Chrome, Safari, Edge）。
    * **後端運行環境**：Node.js 最新穩定版 (Current/LTS)、npm 套件管理工具。
    * **資料庫系統**：MongoDB Atlas (雲端資料庫服務)。

### 2.4 Design and Implementation Constraints
本系統之設計與實作須遵循以下約束條件：

1. **技術棧一致性 (Tech Stack Constraint)**：
   * 前端必須採用 **Vue 3 (Composition API)** 與 **Vite** 構建，以確保開發效率與現代響應式狀態管理。
   * 後端必須基於 **Node.js** 環境開發，並統一使用 **npm** 作為套件管理工具。
2. **跨平台兼容性 (Cross-Platform Constraint)**：
   * 系統不開發原生行動應用 (Native App)，但 **必須 (Shall)** 實作 **RWD (Responsive Web Design)**，確保在桌面端 (PC/Mac) 與行動端 (iOS/Android) 瀏覽器皆具備完整之操作體驗。
3. **資料持久化與可靠性 (Data Reliability)**：
   * 為了支援開源需求與長期上線之穩定性，資料庫必須採用 **MongoDB Atlas** 雲端服務，而非本地端單機資料庫。
4. **開發環境限制**：
   * 系統主體於 **macOS** 環境下進行開發與建置，需確保原始碼之跨環境編譯相容性。
5. **時程與資源限制**：
   * 考慮到 V0.1 之開發週期，系統優先實作「核心連動邏輯（Synergy Logic）」，部分進階動畫或複雜社群功能列為次要實作目標。

## 3. Requirements

### 3.1 功能性需求 (Functional Requirements)
本節詳述系統各核心模組之操作邏輯。所有功能皆須符合響應式網頁設計 (RWD) 之原則，確保在桌面端與行動端瀏覽器均具備一致且流暢之操作體驗。

#### 3.1.1 待辦任務管理模組 (To-Do List Module)
* **3.1.1.1 任務基本維護**：系統應 (Shall) 提供使用者新增、編輯與刪除待辦任務之功能。
   - [Implemented: v0.0.2]
* **3.1.1.2 狀態管理**：系統應 (Shall) 支援任務完成狀態（未完成 / 已完成）之即時切換。
   - [Implemented: v0.0.2]
* **3.1.1.3 優先級配置**：系統應 (Shall) 允許使用者為任務設定優先等級，並於列表視圖中依優先級或建立時間排序。

#### 3.1.2 番茄鐘與任務掛載連動 (Pomodoro & Synergy Logic)
* **3.1.2.1 核心掛載功能**：系統應 (Shall) 允許使用者從待辦任務清單中選取特定項目，並將番茄鐘計時器「掛載」至項目。
* **3.1.2.2 鎖定顯示邏輯**：當番茄鐘啟動後，系統應 (Shall) 於計時介面鎖定並顯示當前掛載之任務名稱。
* **3.1.2.3 自動化數據回填**：系統應 (Shall) 於一個專注週期結束後，自動將該段時間數據累計至對應待辦任務之總投入時長紀錄中。
* **3.1.2.4 操作流銜接**：系統應 (Shall) 於計時結束時，提供快速觸發機制，引導使用者進入該任務之關聯筆記頁面。

#### 3.1.3 脈絡筆記模組 (Synergy Notes Module)
* **3.1.3.1 Markdown 實作**：系統應 (Shall) 提供 Markdown 編輯器，支援即時語法渲染與預覽。
* **3.1.3.2 數據自動交叉關聯**：當使用者撰寫筆記時，系統應 (Shall) 自動記錄其與當前任務之關聯 ID，以利後端進行交叉查詢 (Cross-query)。
   - [Implemented: v0.0.3]
* **3.1.3.3 雲端即時同步**：系統應 (Shall) 確保所有筆記內容經由 API 請求，即時持久化儲存於 MongoDB Atlas 雲端資料庫。