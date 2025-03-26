# 使用 Node LTS 作為基礎
FROM node:20

# 設定工作目錄
WORKDIR /app

# 複製 package 檔案並安裝
COPY package*.json ./
RUN npm install

# 複製專案程式碼
COPY . .

# 開放 port 3000
EXPOSE 3000

# 啟動程式
CMD ["npm", "start"]
