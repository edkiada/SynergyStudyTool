# API Specification 

## 基礎資訊
- **Base URL**: `http://localhost:3000/api`
- **Content-Type**: `application/json`

---

## 1. 任務模組 (Tasks)

### 1.1 獲取所有任務
- **Endpoint**: `GET /tasks`
- **Description**: 取得所有的任務列表。
- **Response**:
  - `200 OK`
  ```json
  [
    {
      "id": "65f1a...",
      "title": "完成資料庫設計",
      "priority": "high",
      "status": "pending",
      "totalFocusedTime": 1500,
      "createdAt": "2026-04-28T..."
    }
  ]

### 1.2 建立新任務
- **Endpoint**: `POST /tasks`
- **Description**: 新增任務
- **Body**
  ```json
  {
  "title": "字串 (必填)",
  "priority": "low | medium | high (選填, 預設 medium)"
  }
- **Response**
  - `201 Created`
  ```json
  {
    "id": "65f1a...",
    "title": "完成資料庫設計",
    "priority": "high",
    "status": "pending",
    "totalFocusedTime": 1500,
    "createdAt": "2026-04-28T.."
  }

### 1.3 更新任務
- **Endpoint** `PUT /tasks/:id`
- **Description**: 編輯任務
- **body**
  ```json
  {
  "title": "字串 (必填)",
  "id": "task_id(必填)",
  "priority": "low | medium | high",
  }
- **Response**
  - `200 ok`
  ```json
  {
    "id": "65f1a...",
    "title": "完成資料庫設計",
    "priority": "high",
    "status": "pending",
    "totalFocusedTime": 1500,
    "createdAt": "2026-04-28T.."
  }

### 1.4 操作任務
- **Endpoint** `PATCH /tasks/:id/status`
- **Description**: 操作任務
- **body**
  ```json
  {
    "id": "task_id(必填)",
    "status": "in_progress | pending | completed",
  }
- **Response**
  - `200 ok`
  ```json
  {
    "id": "65f1a...",
    "title": "完成資料庫設計",
    "priority": "high",
    "status": "completed",
    "totalFocusedTime": 1500,
    "createdAt": "2026-04-28T.."
  }

### 1.5 刪除任務
- **Endpoint** `DELETE /tasks/:id`
- **Description**: 刪除任務
- **body**
  ```json
  {
  "id": "task_id(必填)",
  }
- **Response**
  - `204 ok`
