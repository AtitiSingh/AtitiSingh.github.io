/* Core runtime: shared helpers and the page "chrome" (nav, progress, cursor, loader, reveals). */
(function () {
  "use strict";
  var P = window.PORTFOLIO;
  var App = (window.App = { data: P });
  var root = document.documentElement;
  var reducedMq = matchMedia("(prefers-reduced-motion: reduce)");
  App.reduced = function () { return reducedMq.matches; };

  /* ---------- helpers ---------- */
  var SVG_NS = "http://www.w3.org/2000/svg";
  App.h = function (tag, attrs) {
    var svg = tag.indexOf("svg:") === 0;
    var el = svg ? document.createElementNS(SVG_NS, tag.slice(4)) : document.createElement(tag);
    for (var k in attrs || {}) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.setAttribute("class", v);
      else if (k === "text") el.textContent = v;
      else if (k === "style" && typeof v === "object") for (var s in v) el.style.setProperty(s, v[s]);
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  };
  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { append(el, x); });
    else el.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
  }
  App.$ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  App.$$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  App.mount = function (id, node) { var m = document.getElementById(id); m.textContent = ""; append(m, node); return m; };

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  App.fmtDate = function (ym) { if (!ym) return "Present"; var p = ym.split("-"); return MONTHS[+p[1] - 1] + " " + p[0]; };
  App.range = function (e) { return App.fmtDate(e.start) + " – " + App.fmtDate(e.end); };
  App.yearsOfExperience = function () {
    var p = P.personal.careerStart.split("-"), now = new Date();
    return Math.max(0, Math.floor((now.getFullYear() - +p[0]) + (now.getMonth() + 1 - +p[1]) / 12));
  };
  App.unique = function (arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); };
  App.projectById = function (id) { return P.projects.filter(function (p) { return p.id === id; })[0]; };

  App.sections = [
    { id: "about", label: "About", num: "01" },
    { id: "skills", label: "Skills", num: "02" },
    { id: "industries", label: "Industries", num: "03" },
    { id: "projects", label: "Projects", num: "04" },
    { id: "experience", label: "Experience", num: "05" },
    { id: "philosophy", label: "Approach", num: "06" },
    { id: "contact", label: "Contact", num: "08" },
  ];

  App.sectionHeader = function (num, label, title, sub, id) {
    return App.h("header", { class: "sec-head reveal" },
      App.h("p", { class: "eyebrow mono" }, App.h("span", { class: "eyebrow__num" }, num), " / ", label),
      App.h("h2", { id: id, class: "sec-title" }, title),
      sub ? App.h("p", { class: "sec-sub" }, sub) : null
    );
  };

  App.goTo = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: App.reduced() ? "auto" : "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  var toastTimer;
  App.toast = function (msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  };

  /* ---------- reveal on scroll ---------- */
  var revealIO = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;
  App.observeReveals = function (ctx) {
    App.$$(".reveal:not(.in)", ctx).forEach(function (el) {
      if (revealIO) revealIO.observe(el); else el.classList.add("in");
    });
  };

  App.countUp = function (el, target, suffix) {
    suffix = suffix || "";
    if (App.reduced()) { el.textContent = target + suffix; return; }
    var start = null, dur = 900;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur), eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  App.onVisible = function (el, fn) {
    if (!("IntersectionObserver" in window)) { fn(); return; }
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { io.disconnect(); fn(); }
    }, { threshold: 0.4 });
    io.observe(el);
  };

  /* ---------- nav, progress, scroll-spy ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    var linkBox = document.getElementById("nav-links");
    var mobileBox = document.getElementById("mobile-links");
    var menuBtn = document.getElementById("menu-btn");
    var menu = document.getElementById("mobile-menu");
    var inertTargets = [document.getElementById("main"), document.getElementById("mount-footer")];

    App.sections.forEach(function (s) {
      linkBox.appendChild(App.h("a", { href: "#" + s.id, "data-spy": s.id, onclick: function (e) { e.preventDefault(); App.goTo(s.id); } }, s.label));
      mobileBox.appendChild(App.h("a", {
        href: "#" + s.id, "data-spy": s.id,
        onclick: function (e) { e.preventDefault(); setMenu(false); App.goTo(s.id); }
      }, App.h("span", { class: "mono" }, s.num), s.label));
    });
    mobileBox.appendChild(App.h("a", { href: P.resume.pdf, download: P.resume.downloadName, class: "mobile-menu__cta", onclick: function () { setMenu(false); } }, "Download Resume"));

    function setMenu(open) {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      root.classList.toggle("menu-open", open);
      inertTargets.forEach(function (el) { if (el) { if (open) el.setAttribute("inert", ""); else el.removeAttribute("inert"); } });
      if (open) mobileBox.querySelector("a").focus(); else menuBtn.focus({ preventScroll: true });
    }
    menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
    matchMedia("(min-width: 900px)").addEventListener("change", function (m) { if (m.matches && !menu.hidden) setMenu(false); });

    var fill = document.getElementById("progress-fill"), ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - innerHeight;
        fill.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scrollY / max) : 0) + ")";
        nav.classList.toggle("nav--solid", scrollY > 12);
        ticking = false;
      });
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = e.target.id;
          App.$$("[data-spy]").forEach(function (a) {
            if (a.getAttribute("data-spy") === id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      App.sections.forEach(function (s) { var el = document.getElementById(s.id); if (el) spy.observe(el); });
      spy.observe(document.getElementById("top"));
    }
  }

  /* ---------- custom cursor (fine pointers only; native cursor stays) ---------- */
  function initCursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || App.reduced()) return;
    var dot = document.getElementById("cursor-dot"), ring = document.getElementById("cursor-ring");
    var label = ring.firstElementChild;
    var x = -100, y = -100, rx = -100, ry = -100, running = false;
    root.classList.add("has-cursor");
    function loop() {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) requestAnimationFrame(loop); else running = false;
    }
    addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      var view = t.closest && t.closest("[data-cursor='view']");
      var link = t.closest && t.closest("a,button,input,[role='option'],summary");
      ring.classList.toggle("is-view", !!view);
      ring.classList.toggle("is-link", !!link && !view);
      label.textContent = view ? "VIEW" : "";
    });
    document.addEventListener("mouseleave", function () { dot.style.opacity = ring.style.opacity = 0; });
    document.addEventListener("mouseenter", function () { dot.style.opacity = ring.style.opacity = 1; });
  }

  /* ---------- loader (<1s, skipped on repeat visits / reduced motion) ---------- */
  App.runLoader = function (done) {
    var finish = function () {
      root.classList.remove("loading");
      try { sessionStorage.setItem("seen", "1"); } catch (e) {}
      done();
    };
    if (!root.classList.contains("loading")) { done(); return; }
    var fill = document.getElementById("loader-fill"), log = document.getElementById("loader-log");
    var steps = [[0, 15, "Loading modules..."], [220, 55, "Loading experience..."], [420, 90, "Loading projects..."], [600, 100, "Ready."]];
    steps.forEach(function (s) {
      setTimeout(function () { fill.style.transform = "scaleX(" + s[1] / 100 + ")"; log.textContent = s[2]; }, s[0]);
    });
    setTimeout(finish, 760);
  };

  App.initChrome = function () { initNav(); initCursor(); };
})();
