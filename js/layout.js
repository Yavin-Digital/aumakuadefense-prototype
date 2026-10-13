/* Shared review banner, header, footer, and simulated 21+ age gate. */
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

  var links = [
    ["home", "index.html", "Home"],
    ["shop", "shop.html", "Shop"],
    ["about", "about.html", "About"],
    ["contact", "contact.html", "Contact"]
  ];

  var nav = links.map(function (item) {
    var current = page === item[0] || (page === "category" && item[0] === "shop") || (page === "product" && item[0] === "shop") ? ' aria-current="page"' : "";
    return '<a href="' + item[1] + '"' + current + '>' + item[2] + "</a>";
  }).join("");

  var banner = document.createElement("div");
  banner.className = "proto-banner";
  banner.setAttribute("role", "note");
  banner.innerHTML = '<p class="proto-banner-text">Prototype</p>' +
    '<a href="performance.html">Performance</a>' +
    '<a href="compare/AumakuaDefense-SEO-AEO-Compare.html">SEO / AEO</a>';

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="site-bar">' +
      '<a class="logo" href="index.html">' +
        '<img class="logo-mark" src="assets/logo/aumakua-mark-copper.png" alt="Aumakua Defense">' +
        '<img class="logo-word" src="assets/logo/aumakua-wordmark-copper.png" alt="">' +
      "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' + icon("menu") + '<span>Menu</span></button>' +
      '<nav id="site-nav" class="site-nav">' + nav + "</nav>" +
      '<a class="cart-link" href="cart.html">' + icon("cart") + '<span>Cart</span> <span id="cart-count">0</span></a>' +
    "</div>";

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="measure footer-grid">' +
      '<div><img class="footer-word" src="assets/logo/aumakua-wordmark-copper.png" width="560" height="100" alt="Aumakua Defense">' +
      '<p>Copyright © 2026 Aumakua Defense.</p></div>' +
      '<nav aria-label="Footer">' +
        '<a href="shop.html">Shop</a>' +
        '<a href="about.html">About</a>' +
        '<a href="contact.html">Contact</a>' +
        '<a href="shipping.html">Shipping</a>' +
        '<a href="returns.html">Returns</a>' +
        '<a href="privacy.html">Privacy</a>' +
        '<a href="terms.html">Terms</a>' +
        '<a href="brand.html">Brand standards</a>' +
        '<a href="AumakuaDefense-Presentation.html">Presentation</a>' +
      "</nav>" +
      '<p class="footer-credit">Website by <a href="https://thetribemaker.com">The Tribe Maker</a>.</p>' +
    "</div>";

  var main = document.getElementById("main");
  var skip = document.createElement("a");
  skip.id = "skip";
  skip.className = "skip";
  skip.href = "#main";
  skip.textContent = "Skip to content";
  document.body.insertBefore(skip, document.body.firstChild);
  if (main) {
    main.insertAdjacentElement("beforebegin", banner);
    main.insertAdjacentElement("beforebegin", header);
    if (page !== "deck") {
      var band = document.createElement("div");
      band.className = "weave-band";
      band.setAttribute("aria-hidden", "true");
      main.insertAdjacentElement("beforebegin", band);
    }
    main.insertAdjacentElement("afterend", footer);
  } else {
    document.body.appendChild(banner);
    document.body.appendChild(header);
    document.body.appendChild(footer);
  }

  function paintCount() {
    var el = document.getElementById("cart-count");
    if (el && window.ADCart) el.textContent = String(window.ADCart.count());
  }
  paintCount();
  document.addEventListener("ad:cart", paintCount);

  var toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !header.classList.contains("nav-open")) return;
    if (gate && !gate.hidden) return;
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  });

  var params = new URLSearchParams(location.search);
  if (params.get("review") === "1") document.body.classList.add("review-mode");
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
        '<img src="assets/logo/aumakua-mark-copper.png" alt="Aumakua Defense">' +
        '<h2 id="age-title">You must be 21 or older to enter this site</h2>' +
        '<div class="age-actions">' +
          '<button type="button" class="btn" id="age-yes">I am 21 or older</button>' +
          '<button type="button" class="btn btn-line" id="age-no">I am under 21</button>' +
        "</div>" +
        '<p class="age-note">Prototype — simulated age verification. No age is stored beyond this browser.</p>' +
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
        '<img src="assets/logo/aumakua-mark-copper.png" alt="Aumakua Defense">' +
        '<h2 id="age-title">Please come back when you are 21 or older</h2>' +
        '<p>This site is limited to visitors who are 21 or older. You can close this tab to leave.</p>' +
        '<div class="age-actions">' +
          '<button type="button" class="btn btn-line" id="age-back">Back to the age question</button>' +
        "</div>" +
        '<p class="age-note">Prototype — simulated age verification.</p>' +
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
    document.body.classList.add("age-lock");
    banner.inert = true;
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
    document.body.classList.remove("age-lock");
    banner.inert = false;
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
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) {
      el.classList.add("is-in");
    });
  }, 2000);
})();
