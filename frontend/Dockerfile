# Step 1: 編譯 Vue 前端
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: 使用 Nginx 做靜態檔案服務
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
