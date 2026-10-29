/* CommandPalette (Ctrl/Cmd+K) and the Konami easter egg. ARIA combobox + listbox pattern on a native <dialog>. */
(function () {
  "use strict";
  var App = window.App, h = App.h, P = App.data;
  var dlg, input, list, items = [], active = 0;

  function commands() {
    var nav = [
      ["about", "About", "who i am summary"], ["skills", "Skills", "stack technologies map"],
      ["industries", "Industries", "domains gaming fintech"], ["projects", "Projects", "case studies work"],
      ["experience", "Experience", "timeline roles jobs"], ["philosophy", "How I engineer", "approach principles"],
      ["hood", "Under the hood", "this website built"], ["contact", "Contact", "email phone hire"],
    ].map(function (c) { return { label: c[1], hint: "section", kw: c[2], run: function () { App.goTo(c[0]); } }; });
    var projects = P.projects.map(function (p) {
      return { label: p.name, hint: "project", kw: p.stack.join(" ") + " " + p.industry, run: function () { App.openProject(p.id); } };
    });
    var s = P.social;
    var actions = [
      { label: "Download Resume", hint: "pdf", kw: "cv resume download", run: function () { var a = h("a", { href: P.resume.pdf, download: P.resume.downloadName }); document.body.appendChild(a); a.click(); a.remove(); App.toast("Downloading resume..."); } },
      { label: "Email", hint: s.email, kw: "mail contact", run: function () { location.href = "mailto:" + s.email; } },
      { label: "Call", hint: s.phone, kw: "phone contact", run: function () { location.href = "tel:" + s.phoneHref; } },
      { label: "LinkedIn", hint: "external", kw: "social", run: function () { window.open(s.linkedin, "_blank", "noopener"); } },
      { label: "GitHub", hint: "external", kw: "code social", run: function () { window.open(s.github, "_blank", "noopener"); } },
    ];
    return nav.concat(actions, projects);
  }
  var all;

  function render(q) {
    q = q.trim().toLowerCase();
    // Label matches rank above keyword-only matches (so "res" finds Resume before Express.js projects).
    items = all.map(function (c) {
      var l = c.label.toLowerCase().indexOf(q);
      var rest = (c.kw + " " + c.hint).toLowerCase().indexOf(q) > -1;
      return { c: c, score: !q ? 0 : l === 0 ? 0 : l > -1 ? 1 : rest ? 2 : 3 };
    }).filter(function (x) { return x.score < 3; })
      .sort(function (a, b) { return a.score - b.score; })
      .map(function (x) { return x.c; });
    active = 0;
    list.textContent = "";
    if (!items.length) {
      list.appendChild(h("li", { class: "palette__empty", role: "presentation" }, "No matches. Try “projects” or “resume”."));
    }
    items.forEach(function (c, i) {
      list.appendChild(h("li", {
        id: "pal-" + i, role: "option", "aria-selected": String(i === 0), class: "palette__item",
        onclick: function () { run(i); }, onmousemove: function () { if (active !== i) select(i); },
      }, h("span", null, h("span", { class: "palette__arrow", "aria-hidden": "true" }, "→ "), c.label), h("span", { class: "palette__tag mono" }, c.hint)));
    });
    sync();
  }
  function select(i) {
    if (!items.length) return;
    active = (i + items.length) % items.length;
    sync();
    var el = document.getElementById("pal-" + active);
    if (el) el.scrollIntoView({ block: "nearest" });
  }
  function sync() {
    items.forEach(function (_, i) { var el = document.getElementById("pal-" + i); if (el) el.setAttribute("aria-selected", String(i === active)); });
    if (items.length) input.setAttribute("aria-activedescendant", "pal-" + active); else input.removeAttribute("aria-activedescendant");
  }
  function run(i) {
    var c = items[i];
    if (!c) return;
    close();
    setTimeout(c.run, 0);
  }
  function open() {
    if (!dlg.open) { dlg.showModal(); input.value = ""; render(""); input.focus(); }
  }
  function close() { if (dlg.open) dlg.close(); }

  function konami() {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"], pos = 0;
    document.addEventListener("keydown", function (e) {
      if (/input|textarea/i.test(e.target.tagName)) return;
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos === seq.length) {
        pos = 0;
        var on = document.documentElement.getAttribute("data-accent") === "violet";
        if (on) document.documentElement.removeAttribute("data-accent"); else document.documentElement.setAttribute("data-accent", "violet");
        App.toast(on ? "// accent restored" : "// achievement unlocked: konami. accent switched to violet");
      }
    });
  }

  App.initPalette = function () {
    dlg = document.getElementById("palette");
    input = document.getElementById("palette-input");
    list = document.getElementById("palette-list");
    all = commands();
    var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    document.getElementById("palette-kbd").textContent = mac ? "⌘ K" : "Ctrl K";
    document.getElementById("open-palette").addEventListener("click", open);
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); select(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); select(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); run(active); }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); dlg.open ? close() : open(); }
    });
    konami();
  };
})();
