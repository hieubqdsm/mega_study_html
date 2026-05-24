/* ============================================================
   Claude Mastery — JS dùng chung
   Theme · nút copy · thanh tiến trình · menu mobile · scrollspy
   ============================================================ */
(function () {
  "use strict";

  /* ---- Theme toggle ---- */
  var THEME_KEY = "cc-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---- Menu mobile ---- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* ---- Nút copy cho mọi khối .prompt ---- */
  document.querySelectorAll(".prompt").forEach(function (block) {
    var btn = block.querySelector(".copy-btn");
    var pre = block.querySelector("pre");
    if (!btn || !pre) return;
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      navigator.clipboard.writeText(text).then(function () {
        var old = btn.textContent;
        btn.textContent = "✓ Đã copy";
        btn.classList.add("done");
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("done");
        }, 1600);
      }).catch(function () {
        btn.textContent = "Lỗi copy";
      });
    });
  });

  /* ---- Thanh tiến trình đọc ---- */
  var bar = document.getElementById("progressBar");
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Scrollspy: làm nổi mục TOC đang đọc ---- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute("href");
      if (id && id.charAt(0) === "#") map[id.slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          var active = map[en.target.id];
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---- Năm hiện tại trong footer ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
