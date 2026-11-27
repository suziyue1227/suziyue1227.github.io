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

// 深/浅色主题对应的浏览器地址栏配色
const THEME_COLORS = { dark: '#000000', light: '#f0f4f8' };

function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function updateThemeIcon() {
  const theme = getCurrentTheme();
  const btn = document.getElementById('themeBtn');
  if (btn) {
    btn.textContent = theme === 'light' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'light' ? '切换到深色主题' : '切换到浅色主题');
  }
  // 同步手机浏览器地址栏 / 状态栏配色
  const meta = document.getElementById('themeColor');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
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

function setTheme(next, persist) {
  document.documentElement.dataset.theme = next;
  if (persist) {
    try {
      localStorage.setItem('site_theme', next);
    } catch (e) {}
  }
  updateThemeIcon();
  applyGiscusTheme(next);
}

function toggleTheme() {
  setTheme(getCurrentTheme() === 'light' ? 'dark' : 'light', true);
}

// 用户还没手动选过主题时，跟随系统明暗设置实时切换
function hasSavedTheme() {
  try {
    return !!localStorage.getItem('site_theme');
  } catch (e) {
    return false;
  }
}

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
function onSystemThemeChange(e) {
  if (!hasSavedTheme()) setTheme(e.matches ? 'dark' : 'light', false);
}
if (darkQuery.addEventListener) {
  darkQuery.addEventListener('change', onSystemThemeChange);
} else if (darkQuery.addListener) {
  darkQuery.addListener(onSystemThemeChange); // Safari < 14
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

// 主题按钮已是真正的 <button>，在此绑定点击，不依赖内联 onclick
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

// ================= 页面切换逻辑（支持 hash 刷新恢复） =================
// 导航已改为真正的 <a href="#page">，方向键、回车、前进后退都由浏览器处理
function switchPage(pageId, el) {
  const target = document.getElementById('page-' + pageId);
  if (!target) return;
  document.querySelectorAll('.page-section').forEach(function (s) {
    s.classList.remove('active');
  });
  target.classList.add('active');
  const activeLink = el || document.querySelector('.nav-item[data-page="' + pageId + '"]');
  document.querySelectorAll('.nav-item').forEach(function (link) {
    if (link === activeLink) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
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
