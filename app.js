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

  if (window.matchMedia) {
    var mq = window.matchMedia("(min-width: 760px)");
    var onChange = function (e) { if (e.matches) closeNav(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
