# Step 1: 使用 Node 建構 Vue 專案
FROM node:20-alpine AS build-stage

# 設定工作目錄
WORKDIR /app

# 複製前端專案檔案
COPY . .

# 安裝相依套件
RUN npm install

# 建構 Vue 專案（會輸出到 dist/）
RUN npm run build

# Step 2: 使用 Nginx 提供靜態檔案
FROM nginx:alpine AS production-stage

# 複製自訂 nginx 設定（支援 Vue Router history 模式）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 複製建構完成的靜態檔案到 nginx 預設根目錄
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 開放 port 80 給外部使用
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
