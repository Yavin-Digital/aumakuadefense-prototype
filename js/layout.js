/* Enhances the static header and footer (menu, cart count) and runs the simulated 21+ age gate. */
(function () {
  var page = document.body.getAttribute("data-page") || "";

  function icon(name) {
    if (name === "cart") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>';
    }
    if (name === "menu") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  }

  var header = document.querySelector(".site-header");
  var footer = document.querySelector(".site-footer");
  var main = document.getElementById("main");
  var skip = document.getElementById("skip");
  if (!header || !footer || !skip) return;

  function paintCount() {
    var el = document.getElementById("cart-count");
    if (el && window.ADCart) el.textContent = String(window.ADCart.count());
  }
  paintCount();
  document.addEventListener("ad:cart", paintCount);

  var toggle = header.querySelector(".nav-toggle");
  var navLinks = header.querySelectorAll("#site-nav a");
  function setNav(open, returnFocus) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.classList.toggle("nav-lock", open);
    if (open && navLinks.length) navLinks[0].focus();
    else if (!open && returnFocus) toggle.focus();
  }
  toggle.addEventListener("click", function () {
    setNav(!header.classList.contains("nav-open"), false);
  });
  document.addEventListener("keydown", function (event) {
    if (!header.classList.contains("nav-open")) return;
    if (gate && !gate.hidden) return;
    if (event.key === "Escape") {
      setNav(false, true);
      return;
    }
    if (event.key !== "Tab" || !navLinks.length) return;
    var last = navLinks[navLinks.length - 1];
    if (event.shiftKey && document.activeElement === toggle) {
      event.preventDefault();
      last.focus();
    } else if (event.shiftKey && document.activeElement === navLinks[0]) {
      event.preventDefault();
      toggle.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      toggle.focus();
    }
  });
  document.addEventListener("click", function (event) {
    if (header.classList.contains("nav-open") && !header.contains(event.target)) setNav(false, false);
  });
  if (window.matchMedia) {
    var wide = window.matchMedia("(min-width: 720px)");
    var onWide = function () { if (wide.matches && header.classList.contains("nav-open")) setNav(false, false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  var params = new URLSearchParams(location.search);
  if (params.get("resetage") === "1") localStorage.removeItem("ad_age_ok");

  var gate = document.createElement("div");
  gate.className = "age-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "age-title");
  gate.hidden = true;
  document.body.appendChild(gate);

  function questionView() {
    gate.innerHTML =
      '<div class="age-card">' +
        '<img src="assets/logo/aumakua-mark-copper-800.webp" width="1932" height="1220" alt="Aumakua Defense">' +
        '<h2 id="age-title">You must be 21 or older to enter this site</h2>' +
        '<div class="age-actions">' +
          '<button type="button" class="btn" id="age-yes">I am 21 or older</button>' +
          '<button type="button" class="btn btn-line" id="age-no">I am under 21</button>' +
        "</div>" +
        '<p class="age-note">Simulated age verification. No age is stored beyond this browser.</p>' +
      "</div>";
    document.getElementById("age-yes").addEventListener("click", function () {
      localStorage.setItem("ad_age_ok", "1");
      closeGate();
    });
    document.getElementById("age-no").addEventListener("click", exitView);
    document.getElementById("age-yes").focus();
  }

  function exitView() {
    gate.innerHTML =
      '<div class="age-card">' +
        '<img src="assets/logo/aumakua-mark-copper-800.webp" width="1932" height="1220" alt="Aumakua Defense">' +
        '<h2 id="age-title">Please come back when you are 21 or older</h2>' +
        '<p>This site is limited to visitors who are 21 or older. You can close this tab to leave.</p>' +
        '<div class="age-actions">' +
          '<button type="button" class="btn btn-line" id="age-back">Back to the age question</button>' +
        "</div>" +
        '<p class="age-note">Simulated age verification.</p>' +
      "</div>";
    document.getElementById("age-back").addEventListener("click", questionView);
    document.getElementById("age-back").focus();
  }

  function focusable() {
    return Array.prototype.filter.call(
      gate.querySelectorAll("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])"),
      function (el) { return el.getClientRects().length > 0; }
    );
  }

  function onKey(event) {
    if (gate.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.key !== "Tab") return;
    var items = focusable();
    if (!items.length) {
      event.preventDefault();
      return;
    }
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onFocusIn(event) {
    if (gate.hidden || gate.contains(event.target)) return;
    var items = focusable();
    if (items.length) items[0].focus();
  }

  function openGate() {
    gate.hidden = false;
    document.documentElement.classList.add("age-lock");
    skip.inert = true;
    if (main) main.inert = true;
    header.inert = true;
    footer.inert = true;
    questionView();
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("focusin", onFocusIn);
  }

  function closeGate() {
    gate.hidden = true;
    document.documentElement.classList.remove("age-lock");
    skip.inert = false;
    if (main) main.inert = false;
    header.inert = false;
    footer.inert = false;
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("focusin", onFocusIn);
    if (skip) skip.focus();
  }

  if (localStorage.getItem("ad_age_ok") !== "1") openGate();

  function initReveal() {
    if (document.documentElement.classList.contains("gsap-motion")) return;
    var nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }
  document.addEventListener("DOMContentLoaded", initReveal);
  setTimeout(function () {
    function shown(el) {
      if (!el || !el.getBoundingClientRect) return false;
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(function (trigger) {
        if (!shown(trigger.trigger)) return;
        if (trigger.animation) trigger.animation.progress(1);
        trigger.kill();
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) {
      if (!shown(el)) return;
      el.classList.add("is-in");
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("visibility");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (el) {
      if (!shown(el)) return;
      var finalValue = el.getAttribute("data-count");
      if (finalValue) el.textContent = finalValue;
    });
  }, 2000);
  setTimeout(function () {
    function shown(el) {
      if (!el || !el.getBoundingClientRect) return false;
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }
    function stillHidden(el) {
      if (!el) return false;
      var style = window.getComputedStyle(el);
      if (parseFloat(style.opacity) < 0.99) return true;
      if (style.visibility === "hidden") return true;
      if (el.classList && el.classList.contains("weave-draw") && !el.classList.contains("is-in")) return true;
      return false;
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().slice().forEach(function (trigger) {
        var root = trigger.trigger;
        if (!shown(root)) return;
        var targets = (trigger.animation && trigger.animation.targets) ? trigger.animation.targets() : [];
        var stuck = stillHidden(root);
        for (var i = 0; i < targets.length; i++) {
          if (stillHidden(targets[i])) stuck = true;
        }
        if (!stuck && root && root.children) {
          for (var c = 0; c < root.children.length; c++) {
            if (stillHidden(root.children[c])) stuck = true;
          }
        }
        if (!stuck) return;
        if (trigger.animation) trigger.animation.progress(1);
        if (root && root.classList && root.classList.contains("weave-draw")) root.classList.add("is-in");
        trigger.kill();
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll(".reveal > *, .weave-draw"), function (el) {
      var root = el.classList && el.classList.contains("weave-draw") ? el : el.parentNode;
      if (!shown(root) || !stillHidden(el)) return;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.visibility = "visible";
      if (el.classList.contains("weave-draw")) el.classList.add("is-in");
    });
  }, 8000);
})();
