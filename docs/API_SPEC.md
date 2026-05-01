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

### 1.6 查詢任務筆記
- **Endpoint**: `GET /tasks/:id/notes`
- **Description**: 查詢任務筆記筆記
- **Response**
  - `200 ok`
  ```json
  [
    {
    "title": "GIT_CODE紀錄",
    "id": "65f1a...",
    "content": "docs:是更改文件的git commit代號",
    "source": {
      "type": "task",
      "refId": "662f...",
      "onModel": "Task"
      } 
    }
  ]


## 2. 筆記模組 (notes)

### 2.1 獲取所有筆記(獨立)
- **Endpoint**: `GET /notes`
- **Description**: 取得所有的筆記(獨立)。
- **Response**
  - `200 ok`
  ```json
  {
  "title": "GIT_CODE紀錄",
  "id": "65f1a...",
  "content": "docs:是更改文件的git commit代號",
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    } 
  }

### 2.2 建立新筆記
- **Endpoint**: `POST /notes`
- **Description**: 新增筆記
- **Body**
  ```json
  {
  "title": "字串 (必填)",
  "content": "選填",
  "source": {
    "type": "task(選填)",
    "refId": "662f...",
    "onModel": "Task"
    } 
  }
- **Response**
  - `201 Created`
  ```json
  {
  "title": "GIT_CODE紀錄",
  "id": "65f1a...",
  "content": "docs:是更改文件的git commit代號",
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    } 
  }

### 2.3 更新筆記
- **Endpoint** `PUT /notes/:id`
- **Description**: 編輯筆記
- **body**
  ```json
  {
    "title": "字串(選填)",
    "content": "字串(選填)",
  }
- **Response**
  - `200 ok`
  ```json
  {
  "title": "GIT_CODE紀錄",
  "id": "65f1a...",
  "content": "docs:是更改文件的git commit代號",
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    } 
  }

### 2.4 刪除筆記
- **Endpoint** `DELETE /notes/:id`
- **Description**: 刪除筆記
- **Response**
  - `204 ok`

## 3. 蕃茄鐘模組 (focusSession)

### 3.1 取得專注紀錄
- **Endpoint**: `GET /focusSession?type=independent`
- **Description**: 取得專注紀錄。
- **Response**
  - `200 ok`
  ```json
  {
  "startTime": "2026-05-01T08:00:00Z",
  "duration": 25,
  "id": "65f1a...",
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    } 
  }

### 3.2 建立專注紀錄
- **Endpoint**: `POST /focusSession`
- **Description**: 新增專注紀錄
- **Body**
  ```json
  {  
  "startTime": "2026-05-01T08:00:00Z",
  "duration": 25,           
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    }   
  }
- **Response**
  - `201 Created`
  ```json
  {
  "startTime": "2026-05-01T08:00:00Z",
  "duration": 25,  
  "id": "65f1a...",         
  "source": {
    "type": "independent",
    "refId": null,
    "onModel": null
    }
  }

### 4. Analytics mode

## 4.1 Get Analytics
- **Endpoint**: `GET /analytics?period=daily`
- **Description**: `get the analytics`
- **Query Parameters**: `period: daily(default) or weekly`
- **Response**: 
  - `200 ok`
  ```json
  {
    "period": "daily",
    "range": {
      "start": "2026-05-01T00:00:00Z",
      "end": "2026-05-01T23:59:59Z"
    },
    "summary": {
      "totalFocusMinutes": 125,   
      "completedTaskCount": 3     
    },
    "details": {
      "completedTasks": [    
        { "id": "1", "title": "寫完 API Spec", "pomodoros": 2 },
        { "id": "2", "title": "複習微積分", "pomodoros": 3 }
      ]
    }
  }
