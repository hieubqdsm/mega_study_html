// Procreate Handbook — JS: menu mobile, theme toggle, back-to-top
(function () {
  "use strict";

  // ---- Theme (light mặc định, dark bật qua toggle) ----
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("phb-theme"); } catch (e) {}
  if (stored === "dark") root.setAttribute("data-theme", "dark");

  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "dark");
      try { localStorage.setItem("phb-theme", isDark ? "" : "dark"); } catch (e) {}
    });
  }

  // ---- Mobile menu ----
  var btn = document.getElementById("menuToggle");
  var sidebar = document.getElementById('sidebar');
  if (btn && sidebar) {
    // Tao overlay
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      btn.textContent = '☰';
    }
    btn.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      overlay.classList.toggle('show', open);
      btn.textContent = open ? '✕' : '☰';
    });
    overlay.addEventListener('click', closeMenu);
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 900) closeMenu();
    });
  }

  // ---- Back to top ----
  var toTop = document.getElementById('toTop');
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }
})();
