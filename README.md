# suziyue · 个人主页

这是 suziyue 的个人主页，一个以「终端控制台」为视觉主题的单页站点。整体采用液态流体渐变背景与玻璃拟态卡片，左侧是身份名片与导航，右侧是内容面板，集自我介绍、快捷入口、友链、资源下载和留言交流于一体。

## 站点概览

站点共包含六个板块，通过左侧导航切换，地址栏 hash 同步变化，刷新或前进后退都能保持当前页面：

| 板块 | hash | 内容 |
| --- | --- | --- |
| 控制台主页 | `#home` | 首页欢迎语与个人标识 |
| 留言交流板 | `#guestbook` | 基于 giscus 的留言区，数据存放在 GitHub Discussions |
| 百宝箱 | `#tools` | 网页版 Minecraft、B 站、GitHub、洛谷等快捷入口 |
| 友情链接 | `#friend` | curious-guoguo、HullQin 小游戏等朋友站点，带各自图标 |
| 资源下载区 | `#download` | PCL2 启动器下载入口（后续可继续添加资源条目） |
| 我的信息 | `#about` | B 站、GitHub、洛谷、邮箱等个人联系方式 |

## 整体特性

- **氛围背景**：四团渐变色块缓慢流动，叠加噪点纹理，深色为霓虹蓝紫、浅色为柔和粉彩
- **主题自适应**：首屏前预读、无闪烁；未手动选择时实时跟随系统明暗变化，手动切换后记住选择；留言框（giscus）主题同步切换
- **玻璃拟态**：半透明磨砂卡片 + 圆角 + 悬停上浮动效
- **响应式**：桌面端左右分栏，窄屏自动改为上下布局，适配刘海屏安全区
- **可访问性**：导航为真实链接，可键盘 Tab / 回车访问，带 `aria-current` 标记；尊重系统「减少动态效果」设置
- **零构建**：纯 HTML / CSS / 原生 JavaScript，无框架、无打包

## 文件组成

```
.
├── index.html      # 页面结构（所有板块都在这一页里）
├── style.css       # 全部样式、明暗主题配色、响应式与动效
├── theme-init.js   # 首屏前主题初始化（防闪烁），在 <head> 中同步加载
├── main.js         # 主题切换、giscus 注入、页面路由
└── README.md       # 本说明
```

> 注意：三个资源文件都直接放在仓库根目录，`index.html` 里的引用是 `style.css`、`theme-init.js`、`main.js`。若以后拆分到 `css/`、`js/` 子目录，请同步修改 HTML 中的路径。

## 使用与部署

本地预览：在项目根目录运行 `python3 -m http.server 8000`，打开 `http://localhost:8000`；也可以直接双击 `index.html`（纯静态、无跨域请求）。

部署方式二选一：

1. **网页上传（无需安装 git）**：在 GitHub 仓库页面点 `Add file → Upload files`，把这 5 个文件拖进去提交；`Settings → Pages` 里选 main 分支根目录。
2. **命令行**：`git add -A && git commit -m "更新" && git push`，同样在 `Settings → Pages` 选择 main 分支根目录。

两种方式都用相对路径，无需改动代码。

## 维护备注

- giscus 留言板需仓库公开并开启 Discussions、完成 giscus.app 配置后才会显示；主题切换通过 `postMessage` 同步给 iframe。
- PCL2 启动器为开源 Minecraft Java 版启动器，官方发布页：[Meloong-Git/PCL Releases](https://github.com/Meloong-Git/PCL/releases)，请从官方渠道下载。
- 字体来自 Google Fonts（Fira Code / Inter），若访客网络无法访问会自动回退到系统字体，不影响功能。
- 新增板块时需三处同步：`index.html` 里加 `<section class="page-section" id="page-XXX">`、导航加 `<a class="nav-item" data-page="XXX" href="#XXX">`、必要时在 `style.css` 补样式。
