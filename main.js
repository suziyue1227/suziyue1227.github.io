// ================= giscus 评论系统（动态注入，按当前主题初始化） =================
(function () {
  var isLight = document.documentElement.dataset.theme === 'light';
  var s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  s.setAttribute('data-repo', 'suziyue1227/suziyue1227.github.io');
  s.setAttribute('data-repo-id', 'R_kgDOVlGRrg');
  s.setAttribute('data-category', 'Announcements');
  s.setAttribute('data-category-id', 'DIC_kwDOVlGRrs4DKoph');
  s.setAttribute('data-mapping', 'pathname');
  s.setAttribute('data-strict', '0');
  s.setAttribute('data-reactions-enabled', '1');
  s.setAttribute('data-emit-metadata', '0');
  s.setAttribute('data-input-position', 'bottom');
  s.setAttribute('data-theme', isLight ? 'light' : 'dark');
  s.setAttribute('data-lang', 'zh-CN');
  s.crossOrigin = 'anonymous';
  s.async = true;
  document.body.appendChild(s);
})();

// ================= 主题切换与 giscus 联动 =================
// 当 iframe 还没加载完就切主题时，先记下来，等它出现再补发
let pendingGiscusTheme = null;

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function updateThemeIcon() {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = getCurrentTheme() === 'light' ? '☀️' : '🌙';
}

function applyGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (!iframe) {
    pendingGiscusTheme = theme;
    return;
  }
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: theme } } },
    'https://giscus.app'
  );
  pendingGiscusTheme = null;
}

function toggleTheme() {
  const root = document.documentElement;
  const next = getCurrentTheme() === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try {
    localStorage.setItem('site_theme', next);
  } catch (e) {}
  updateThemeIcon();
  applyGiscusTheme(next);
}

// 只监听 giscus 加载完成事件，补发待同步主题；不再回发主题，避免循环抖动
window.addEventListener('message', function (event) {
  if (event.origin !== 'https://giscus.app') return;
  if (!event.data || !event.data.giscus) return;
  if (pendingGiscusTheme) {
    applyGiscusTheme(pendingGiscusTheme);
  }
});

updateThemeIcon();

// ================= 页面切换逻辑（支持 hash 刷新恢复） =================
function switchPage(pageId, el) {
  const target = document.getElementById('page-' + pageId);
  if (!target) return;
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    const matched = document.querySelector('.nav-item[data-page="' + pageId + '"]');
    if (matched) matched.classList.add('active');
  }
  if (location.hash !== '#' + pageId) {
    history.replaceState(null, '', '#' + pageId);
  }
}

// 页面加载时根据 hash 恢复对应页面
document.addEventListener('DOMContentLoaded', function () {
  const page = (location.hash || '#home').slice(1);
  const el = document.querySelector('.nav-item[data-page="' + page + '"]');
  if (el) {
    switchPage(page, el);
  } else {
    switchPage('home', document.querySelector('.nav-item[data-page="home"]'));
  }
});

// 支持浏览器前进/后退切换页面
window.addEventListener('hashchange', function () {
  const page = (location.hash || '#home').slice(1);
  const el = document.querySelector('.nav-item[data-page="' + page + '"]');
  if (el) switchPage(page, el);
});
