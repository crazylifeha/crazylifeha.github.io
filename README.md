# 🎓 现代学术个人主页 (Academic Homepage - Kangning Wang)

一个专为学者、科研人员打造的**轻量、现代、优雅、纯静态**学术个人主页，针对 **GitHub Pages** 原生零配置托管进行设计与深度优化。

---

## ✨ 核心特性

- ⚡ **纯静态零依赖**：基于现代标准 HTML5 + CSS3 + 原生 JavaScript，秒开、零编译步骤、完全不需要安装 Node.js/npm。
- 🌐 **中英文切换**：一键切换页面语言，并在浏览器本地记忆选择。
- 🌓 **深浅双色主题 (Dark / Light Mode)**：自动识别操作系统配色偏好，支持一键切换并在本地记忆。
- 📚 **学术论文展示 (Publications)**：高亮本人作者姓名，展示会议/期刊标签、论文链接和代码仓库，并支持点击预览图放大查看。
- 📢 **学术动态时间轴 (News)**：按时间展示论文录用、代码发布等最新进展。
- 🛠️ **精选开源项目与学术经历**：展示 CRISP、LSMamba 等代表作与研究经历。
- 📱 **响应式适配**：桌面端使用固定侧栏，平板和手机端使用可开合导航菜单。

---

## 🚀 3 步快速部署到 GitHub Pages

### 方式一：作为个人主站点（推荐：`https://crazylifeha.github.io`）

1. **新建 GitHub 仓库**：
   - 在 GitHub 上新建一个公开仓库 (Public Repository)。
   - 仓库名称命名为：`crazylifeha.github.io`。

2. **上传文件**：
   - 将本项目 `academic-homepage/` 目录下的所有文件（`index.html`、`css/`、`js/`、`assets/` 等）推送到该仓库的 `main` 分支根目录下：
   ```bash
   cd academic-homepage
   git init
   git add .
   git commit -m "feat: initial academic homepage for Kangning Wang"
   git branch -M main
   git remote add origin https://github.com/crazylifeha/crazylifeha.github.io.git
   git push -u origin main
   ```

3. **开启 GitHub Pages**：
   - 进入该仓库的 **Settings** -> **Pages**。
   - 在 **Build and deployment** 下，Source 选择 **Deploy from a branch**，Branch 选择 `main` / `/(root)`，点击 **Save**。
   - 等待约 1 分钟后，访问 `https://crazylifeha.github.io` 即可查看您的学术主页！

---

### 方式二：作为子项目主页（格式为 `https://<username>.github.io/academic-homepage/`）

- 如果推送到普通命名的仓库（如 `academic-homepage`），在仓库 **Settings** -> **Pages** 中启用部署后，访问地址将为 `https://<你的用户名>.github.io/academic-homepage/`。

---

## ✏️ 个性化修改指南

所有内容均已做好清晰注释，只需在文本编辑器（如 VS Code）中打开 `index.html`：

1. **修改基本信息与头像**：
   - 替换 `assets/images/avatar.jpg` 为个人寸照或学术头像。
   - 在 `index.html` 的侧栏和个人简介部分修改姓名、学校机构、导师姓名及 GitHub / arXiv / Email 链接。

2. **更新发表论文 (Publications)**：
   - 复制 `<article class="pub-card">` 结构块即可新增论文。
   - 将作者列表中您的名字包裹在 `<span class="author-me">您的名字</span>` 内即可自动高亮。
   - 将论文预览图放入 `assets/images/`，并更新图片路径、论文链接和代码链接。

3. **更新学术动态 (News)**：
   - 在 `<div class="news-timeline">` 中复制并更新 `<div class="news-item">`。
   - 分别填写 `.lang-zh` 与 `.lang-en` 内容，以保持双语信息一致。

---

## 📁 目录结构

```text
academic-homepage/
├── index.html        # 网页主体结构与全部数据展示
├── css/
│   └── style.css     # 现代化设计系统、CSS 变量、主题与响应式样式
├── js/
│   └── main.js       # 语言/主题切换、导航、移动菜单与图片预览交互
├── assets/
│   └── images/       # 头像与论文示意图
└── README.md         # 部署与配置文档
```
