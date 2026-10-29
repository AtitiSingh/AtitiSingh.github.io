/* Hero: headline, typing animation, terminal card and the subtle network canvas. */
(function () {
  "use strict";
  var App = window.App, h = App.h, P = App.data;

  function terminal() {
    var current = P.experience[0];
    var rows = [
      ["whoami", "software-engineer"],
      ["name", P.personal.name],
      ["role", current.role + " @ Aristocrat"],
      ["location", P.personal.location],
      ["experience", App.yearsOfExperience() + "+ years"],
      ["status", null],
    ];
    var body = h("div", { class: "terminal__body mono" });
    rows.forEach(function (r, i) {
      body.appendChild(h("div", { class: "terminal__row", style: { "--i": i } },
        h("p", { class: "terminal__cmd" }, h("span", { class: "prompt", "aria-hidden": "true" }, "$ "), r[0]),
        r[1] !== null
          ? h("p", { class: "terminal__out" }, r[1])
          : h("p", { class: "terminal__out terminal__out--ok" }, h("span", { class: "dot", "aria-hidden": "true" }), P.personal.status)
      ));
    });
    return h("aside", { class: "terminal reveal", "aria-label": "Quick facts" },
      h("div", { class: "terminal__bar", "aria-hidden": "true" },
        h("span", { class: "terminal__lights" }, h("i"), h("i"), h("i")),
        h("span", { class: "mono terminal__title" }, "atiti@workstation: ~")
      ),
      body
    );
  }

  function typing(el) {
    var phrases = P.personal.typing, pi = 0, ci = 0, deleting = false, timer;
    if (App.reduced()) { el.textContent = phrases[0]; return; }
    function tick() {
      var full = phrases[pi];
      ci += deleting ? -1 : 1;
      el.textContent = full.slice(0, ci);
      var delay = deleting ? 22 : 48;
      if (!deleting && ci === full.length) { deleting = true; delay = 1400; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 380; }
      timer = setTimeout(tick, delay);
    }
    tick();
    // Pause when the tab is hidden; switch to static text if the user enables reduced motion later.
    document.addEventListener("visibilitychange", function () {
      clearTimeout(timer);
      if (!document.hidden) tick();
    });
    matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", function (m) {
      if (m.matches) { clearTimeout(timer); el.textContent = phrases[0]; }
    });
  }

  function network() {
    var canvas = document.getElementById("hero-canvas"), ctx = canvas.getContext("2d");
    if (!ctx) return;
    var hero = document.getElementById("top");
    var w = 0, h2 = 0, nodes = [], raf = 0, visible = true, dpr = Math.min(devicePixelRatio || 1, 2);
    var rgb = "122,167,255";

    function resize() {
      w = hero.clientWidth; h2 = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h2 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(18, Math.min(52, Math.round(w / 30)));
      nodes = [];
      for (var i = 0; i < count; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h2, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 });
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h2);
      var link = Math.min(150, w / 6);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            ctx.strokeStyle = "rgba(" + rgb + "," + (0.16 * (1 - d / link)).toFixed(3) + ")";
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(" + rgb + ",0.5)";
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      }
    }
    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h2) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function start() { if (!raf && visible && !document.hidden && !App.reduced()) raf = requestAnimationFrame(step); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    var rt; addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
    }
    resize();
    start();
  }

  App.renderHero = function () {
    var p = P.personal, s = P.social;
    var typed = h("span", { id: "typed" });
    var content = h("div", { class: "hero__layout" },
      h("div", { class: "hero__copy" },
        h("p", { class: "hero__hello mono reveal" }, h("span", { class: "dot", "aria-hidden": "true" }), "HELLO, WORLD."),
        h("h1", { id: "hero-title", class: "hero__title reveal" },
          h("span", { class: "hero__im" }, "I'm"), " ",
          h("span", { class: "hero__name" }, p.name)
        ),
        h("p", { class: "hero__role reveal" }, h("strong", null, p.title), " ", p.headline),
        h("p", { class: "typing mono reveal", "aria-hidden": "true" },
          h("span", { class: "prompt" }, "> "), typed, h("span", { class: "caret" })),
        h("p", { class: "sr-only" }, p.typing.join(" ")),
        h("div", { class: "tree mono reveal", role: "list", "aria-label": "What I build" },
          h("span", { class: "tree__root" }, "I build"),
          p.builds.map(function (b, i) {
            return h("span", { class: "tree__item", role: "listitem" },
              h("span", { class: "tree__branch", "aria-hidden": "true" }, i === p.builds.length - 1 ? "└── " : "├── "), b);
          })
        ),
        h("div", { class: "hero__cta reveal" },
          h("a", { class: "btn btn--primary", href: "#projects", onclick: function (e) { e.preventDefault(); App.goTo("projects"); } }, "View My Work"),
          h("a", { class: "btn btn--ghost", href: P.resume.pdf, download: P.resume.downloadName }, "Download Resume"),
          h("a", { class: "btn btn--text", href: "mailto:" + s.email }, "Email me →")
        )
      ),
      terminal()
    );
    var meta = h("p", { class: "hero__meta mono", "aria-hidden": "true" },
      "28.54°N 77.39°E", h("span", null, " · "), P.site.version, h("span", null, " · "), "scroll ↓");
    App.mount("mount-hero", [content, meta]);
    typing(typed);
    network();
  };
})();
