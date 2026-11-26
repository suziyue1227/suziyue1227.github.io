# suziyue · 个人主页

这是 suziyue 的个人主页，一个以「终端控制台」为视觉主题的单页站点。整体采用液态流体渐变背景与玻璃拟态卡片，左侧是身份名片与导航，右侧是内容面板，集自我介绍、快捷入口、友链、资源下载和留言交流于一体。

## 站点概览

站点共包含六个板块，通过左侧导航切换，地址栏 hash 同步变化，刷新或前进后退都能保持当前页面：

| 板块 | 内容 |
| --- | --- |
| 控制台主页 | 首页欢迎语与个人标识 |
| 留言交流板 | 基于 giscus 的留言区，数据存放在 GitHub Discussions |
| 百宝箱 | 网页版 Minecraft、B 站、GitHub、洛谷等快捷入口 |
| 友情链接 | curious-guoguo、HullQin 小游戏等朋友站点，带各自图标 |
| 资源下载区 | 壁纸合集、PCL2 启动器等资源条目 |
| 我的信息 | B 站、GitHub、洛谷、邮箱等个人联系方式 |

## 整体特性

- **氛围背景**：四团渐变色块缓慢流动，叠加噪点纹理，深色为霓虹蓝紫、浅色为柔和粉彩
- **主题自适应**：默认跟随系统明暗，可手动切换并记忆；切换时留言框主题同步变化，首屏前预读主题避免闪烁
- **玻璃拟态**：半透明磨砂卡片 + 圆角 + 悬停上浮动效
- **响应式**：桌面端左右分栏，窄屏自动改为上下布局
- **零构建**：纯 HTML / CSS / 原生 JavaScript，无框架、无打包

## 文件组成

```
.
├── index.html        # 页面结构
├── README.md         # 项目说明
├── css/
│   └── style.css     # 全部样式与主题配色
└── js/
    ├── theme-init.js # 首屏前主题初始化（防闪烁）
    └── main.js       # 主题切换、页面路由、giscus 注入
```

## 使用与部署

本地预览：在项目根目录运行 `python3 -m http.server 8000`，打开 `http://localhost:8000`。

部署：将目录推送到 GitHub 仓库，在 Settings → Pages 选择 main 分支根目录即可，相对路径无需改动。

## 备注

- giscus 留言板需仓库公开并开启 Discussions、完成 giscus.app 配置后才会显示。
- PCL2 启动器为开源 Minecraft Java 版启动器，官方发布页：[Meloong-Git/PCL Releases](https://github.com/Meloong-Git/PCL/releases)，请从官方渠道下载。
