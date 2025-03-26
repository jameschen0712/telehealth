-- 清除舊有資料（小心使用！）
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS users;

-- 使用者資料表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'doctor' or 'patient'
  display_name VARCHAR(100)  -- 顯示名稱
);

-- 預約資料表
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  doctor_name VARCHAR(100) NOT NULL, -- 對應 users.username
  appointment_time TIMESTAMP NOT NULL,
  ended_at TIMESTAMP
);

-- 預設帳號資料（密碼為 bcrypt 加密的 123456）
INSERT INTO users (username, password, role, display_name) VALUES
('test', '$2b$10$HC.QfzMZ1MXApaofE/lideoxgqa6qK59sHm6VhWYfPdqJF3Dhq6Zu', 'patient', 'Test User'),
('doctor1', '$2b$10$HC.QfzMZ1MXApaofE/lideoxgqa6qK59sHm6VhWYfPdqJF3Dhq6Zu', 'doctor', 'Dr. Alice Chen'),
('doctor2', '$2b$10$HC.QfzMZ1MXApaofE/lideoxgqa6qK59sHm6VhWYfPdqJF3Dhq6Zu', 'doctor', 'Dr. Bob Wang');

-- 範例預約（test 預約 doctor1）
INSERT INTO appointments (user_id, doctor_name, appointment_time)
VALUES (1, 'doctor1', NOW() + INTERVAL '1 hour');
