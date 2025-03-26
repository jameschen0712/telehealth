# 🩺 Telehealth 遠距看診系統

這是一個簡易的遠距門診系統，功能包含：
- 使用者註冊 / 登入（病患與醫師）
- 醫師預約清單、病患預約紀錄
- 支援 Jitsi popup 視訊看診
- 自動記錄看診結束時間
- Vue 前端 + Node.js/Express 後端 + PostgreSQL 資料庫

---

## 📁 專案結構

telehealth/ 
├── backend/ # Node.js + Express 後端 
├── frontend/ # Vue 3 + Vite 前端 
├── init.sql # 初始資料表 + 測試帳號 
├── .env # 後端 DB 設定 
├── .gitignore 
└── README.md