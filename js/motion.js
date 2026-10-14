/* GSAP reveals, parallax, embers, counters, and card tilt.
   If the CDN or this file fails, layout.js still reveals content. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && window.gsap && window.ScrollTrigger) {
    document.documentElement.classList.add("gsap-motion");
  }

  function setupEmbers(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var mobileQuery = window.matchMedia("(max-width: 700px)");
    var count = mobileQuery.matches ? 6 : 14;
    var dots = [];
    var width = 0;
    var height = 0;
    var frameId = 0;
    var running = false;
    var seen = false;

    function seed() {
      dots = [];
      var i;
      for (i = 0; i < count; i += 1) {
        dots.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.6 + Math.random() * 1.5,
          v: 0.00022 + Math.random() * 0.0005,
          a: 0.16 + Math.random() * 0.38,
          drift: Math.random() * Math.PI * 2
        });
      }
    }

    function size() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, mobileQuery.matches ? 1 : 1.25);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    }

    var last = 0;
    function tick(now) {
      if (!running) return;
      frameId = requestAnimationFrame(tick);
      if (!last) last = now;
      if (now - last < 50) return;
      var step = Math.min((now - last) / 16.7, 4);
      last = now;
      ctx.clearRect(0, 0, width, height);
      var i;
      for (i = 0; i < dots.length; i += 1) {
        var dot = dots[i];
        dot.y -= dot.v * step;
        dot.drift += 0.012 * step;
        dot.x += Math.sin(dot.drift) * 0.0007 * step;
        if (dot.y < -0.03) {
          dot.y = 1.03;
          dot.x = Math.random();
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(247, 186, 150, " + dot.a + ")";
        ctx.arc(dot.x * width, dot.y * height, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function start() {
      if (running || !seen || document.hidden || document.body.classList.contains("age-lock")) return;
      running = true;
      frameId = requestAnimationFrame(tick);
    }

    seed();
    size();
    window.addEventListener("resize", size);
    mobileQuery.addEventListener("change", function () {
      count = mobileQuery.matches ? 6 : 14;
      seed();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
    new MutationObserver(function () {
      if (document.body.classList.contains("age-lock")) stop();
      else start();
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    new IntersectionObserver(function (entries) {
      seen = entries[0].isIntersecting;
      if (seen) start();
      else stop();
    }, { threshold: 0.02 }).observe(canvas);
  }

  function setupParallax() {
    var hero = document.querySelector(".hero-home");
    var far = document.querySelector(".hero-layer-far");
    var near = document.querySelector(".hero-layer-near");
    if (!hero || !far) return;
    var scheduled = false;
    function apply() {
      scheduled = false;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var travel = Math.max(0, -rect.top);
      var small = window.innerWidth < 700;
      far.style.transform = "translate3d(0," + (travel * (small ? 0.06 : 0.16)).toFixed(1) + "px,0) scale(1.08)";
      if (near) near.style.transform = "translate3d(0," + (travel * (small ? 0.1 : 0.28)).toFixed(1) + "px,0) scale(1.1)";
    }
    function request() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(apply);
    }
    window.addEventListener("scroll", request, { passive: true });
    apply();
  }

  function setupTilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.addEventListener("pointermove", function (event) {
      var card = event.target.closest && event.target.closest(".product-tile");
      if (!card) return;
      var box = card.getBoundingClientRect();
      var px = (event.clientX - box.left) / box.width - 0.5;
      var py = (event.clientY - box.top) / box.height - 0.5;
      card.style.setProperty("--tilt-y", (px * 7).toFixed(2) + "deg");
      card.style.setProperty("--tilt-x", (py * -6).toFixed(2) + "deg");
    });
    document.addEventListener("pointerout", function (event) {
      var card = event.target.closest && event.target.closest(".product-tile");
      if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  }

  function setupGsap() {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.utils.toArray(".weave-draw").forEach(function (el) {
      window.ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: function () { el.classList.add("is-in"); }
      });
    });
    window.gsap.utils.toArray(".reveal").forEach(function (el) {
      if (el.classList.contains("weave-draw")) return;
      var kids = window.gsap.utils.toArray(el.children);
      if (!kids.length) return;
      window.gsap.from(kids, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
    window.gsap.utils.toArray("[data-count]").forEach(function (el) {
      var target = Number(el.getAttribute("data-count")) || 0;
      var proxy = { n: 0 };
      el.textContent = "0";
      window.gsap.to(proxy, {
        n: target,
        duration: 1.1,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: function () { el.textContent = String(Math.round(proxy.n)); }
      });
    });
    new MutationObserver(function () {
      if (!document.body.classList.contains("age-lock")) window.ScrollTrigger.refresh();
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  if (reduce) return;
  setupEmbers(document.getElementById("hero-embers"));
  setupParallax();
  setupTilt();
  setupGsap();
})();
