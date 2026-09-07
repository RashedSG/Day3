/* ثلاثي — سكربت مشترك: قائمة التنقّل على الجوال */

(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  function closeNav(returnFocus) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 760) closeNav(false);
  });
})();
