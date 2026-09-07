/* دليل الخدمات — سكربت مشترك */

(function () {
  "use strict";

  var KEY = "theme";
  var root = document.documentElement;
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var themeBtn = document.getElementById("themeToggle");
  var animateTimer = 0;

  function systemTheme() {
    return darkQuery && darkQuery.matches ? "dark" : "light";
  }

  function savedTheme() {
    try {
      var value = localStorage.getItem(KEY);
      return value === "dark" || value === "light" ? value : "";
    } catch (e) {
      return "";
    }
  }

  function currentTheme() {
    return root.classList.contains("theme-dark") ? "dark" : "light";
  }

  function persist(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  function syncButton(theme) {
    if (!themeBtn) return;
    var dark = theme === "dark";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
    themeBtn.setAttribute("aria-label", dark ? "التبديل إلى المظهر الفاتح" : "التبديل إلى المظهر الداكن");
  }

  function applyTheme(theme, animate) {
    var dark = theme === "dark";
    if (animate) {
      root.classList.add("theme-animate");
      clearTimeout(animateTimer);
      animateTimer = setTimeout(function () {
        root.classList.remove("theme-animate");
      }, 200);
    }
    root.classList.toggle("theme-dark", dark);
    root.setAttribute("data-theme", theme);
    if (root.style) root.style.colorScheme = theme;
    syncButton(theme);
  }

  applyTheme(savedTheme() || systemTheme(), false);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next, true);
      persist(next);
    });
  }

  if (darkQuery) {
    var onSystem = function (event) {
      if (!savedTheme()) applyTheme(event.matches ? "dark" : "light", true);
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", onSystem);
    else if (darkQuery.addListener) darkQuery.addListener(onSystem);
  }

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
