# 立可得管理后台 · 前端

本目录是智能售货机运营平台的后台前端（Vue 3 + Vite + Element Plus，黑金主题）。

完整的项目介绍、系统组成、启动步骤与界面截图请见仓库根目录 [README.md](../README.md)。

## 常用命令

```bash
npm install
npm run dev          # 开发模式，默认 http://localhost:5173/
npm run build:prod   # 生产构建
npm run build:stage  # 预发布构建
npm run preview      # 预览构建产物
```

## 目录提示

| 路径 | 说明 |
| --- | --- |
| `src/assets/styles/black-gold.scss` | 黑金主题色板与组件覆盖 |
| `src/assets/logo/logo.png` | 侧边栏品牌徽标 |
| `src/assets/images/login-background-gold.png` | 登录 / 注册页背景 |
| `public/favicon.ico` | 浏览器标签图标 |
| `public/sku/sku-1..9.png` | 商品缩略图本地兜底（外链失效时按文件名映射，见 `src/views/manage/sku/index.vue` 的 `localSkuImage`） |
| `src/views/login.vue` | 登录页（标题、背景、页脚） |
| `src/views/register.vue` | 注册页（背景同步） |
| `src/views/manage/sku/index.vue` | 商品管理（图片本地映射） |
| `src/layout/components/Sidebar/Logo.vue` | 侧边栏 logo 区 |
