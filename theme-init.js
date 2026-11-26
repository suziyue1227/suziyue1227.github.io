// theme-init.js — 在 <head> 中同步加载，在首次绘制前确定主题，避免明暗闪烁（FOUC）
try {
  var pref = localStorage.getItem('site_theme') || 'auto';
  var isDark = pref === 'dark' ||
    (pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
} catch (e) {
  document.documentElement.dataset.theme = 'dark';
}
