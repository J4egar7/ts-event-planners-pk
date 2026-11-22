/* TS Event Planners — shared behaviour */
(function () {
  "use strict";

  /* mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* gallery lightbox */
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (items.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button class="lightbox-close" type="button">Close ✕</button>' +
      '<img alt="" />' +
      '<p class="lightbox-cap"></p>';
    document.body.appendChild(box);

    var bigImg = box.querySelector("img");
    var cap = box.querySelector(".lightbox-cap");
    var closeBtn = box.querySelector(".lightbox-close");
    var index = 0;

    function show(i) {
      index = (i + items.length) % items.length;
      var source = items[index].querySelector("img");
      var meta = items[index].querySelector("figcaption");
      bigImg.src = source.getAttribute("data-full") || source.src;
      bigImg.alt = source.alt || "";
      cap.textContent = meta ? meta.textContent : "";
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function hide() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () { show(i); });
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          show(i);
        }
      });
    });

    closeBtn.addEventListener("click", hide);
    box.addEventListener("click", function (e) {
      if (e.target === box) hide();
    });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });
  }

  /* year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
