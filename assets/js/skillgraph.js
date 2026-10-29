/*
 * SkillGraph — "Engineering Stack Map".
 * Categories radiate from a central node; technologies sit on wedges around it.
 * Connections shown on hover/focus come from real data: technologies that share a project or a role.
 * No proficiency scores are invented. The detail panel doubles as the tap-friendly mobile sheet.
 */
(function () {
  "use strict";
  var App = window.App, h = App.h, P = App.data;
  var VB_W = 1000, VB_H = 680, CX = 500, CY = 340, R_CAT = 112, R_TECH = 182;

  var info = {};      // skill name -> { cat, desc }
  var catById = {};
  P.skills.forEach(function (c) {
    catById[c.id] = c;
    c.items.forEach(function (it) { info[it.name] = { cat: c, desc: it.desc }; });
  });

  /* Where each technology appears, and what it appears alongside. */
  function usage(name) {
    var projects = P.projects.filter(function (p) { return p.stack.indexOf(name) > -1; });
    var roles = P.experience.filter(function (e) { return e.tech.indexOf(name) > -1; });
    var peers = [];
    projects.forEach(function (p) { peers = peers.concat(p.stack); });
    roles.forEach(function (e) { peers = peers.concat(e.tech); });
    peers = App.unique(peers).filter(function (n) { return n !== name && info[n]; });
    return { projects: projects, roles: roles, peers: peers };
  }

  var nodes = {}, cats = {}, svg, linkLayer, panel, locked = null, previewing = null;

  function polar(r, deg) { var a = (deg * Math.PI) / 180; return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }; }
  function svgEl(tag, attrs) { return h.apply(null, ["svg:" + tag, attrs].concat([].slice.call(arguments, 2))); }

  function build() {
    var total = P.skills.reduce(function (n, c) { return n + c.items.length; }, 0);
    var gap = 4, step = (360 - gap * P.skills.length) / total, angle = -90;
    svg = svgEl("svg", { class: "sg", viewBox: "0 0 " + VB_W + " " + VB_H, role: "group", "aria-label": "Interactive map of technologies by category" });
    var edgeLayer = svgEl("g", { class: "sg-edges" });
    linkLayer = svgEl("g", { class: "sg-links", "aria-hidden": "true" });
    var nodeLayer = svgEl("g");
    svg.appendChild(edgeLayer); svg.appendChild(linkLayer); svg.appendChild(nodeLayer);

    var center = svgEl("g", { class: "sg-center" },
      svgEl("circle", { cx: CX, cy: CY, r: 46 }),
      svgEl("text", { x: CX, y: CY + 4, "text-anchor": "middle" }, "ENGINEERING"));
    nodeLayer.appendChild(center);

    P.skills.forEach(function (cat) {
      var span = step * cat.items.length, mid = angle + span / 2;
      var cp = polar(R_CAT, mid);
      cats[cat.id] = { x: cp.x, y: cp.y, techs: cat.items.map(function (i) { return i.name; }) };

      edgeLayer.appendChild(svgEl("line", { class: "sg-edge sg-edge--cat", "data-cat": cat.id, x1: CX, y1: CY, x2: cp.x, y2: cp.y }));
      var cg = svgEl("g", { class: "sg-node sg-cat", tabindex: "0", role: "button", "aria-pressed": "false", "aria-label": cat.name + ", " + cat.items.length + " technologies", "data-id": "cat:" + cat.id },
        svgEl("circle", { cx: cp.x, cy: cp.y, r: 26 }),
        svgEl("text", { x: cp.x, y: cp.y + 4, "text-anchor": "middle" }, cat.name.split(" ")[0].replace("&", "")));
      bind(cg, "cat:" + cat.id);
      cats[cat.id].el = cg;
      nodeLayer.appendChild(cg);

      cat.items.forEach(function (it, k) {
        var deg = angle + step * (k + 0.5), p = polar(R_TECH, deg), flip = Math.cos((deg * Math.PI) / 180) < 0;
        edgeLayer.appendChild(svgEl("line", { class: "sg-edge", "data-cat": cat.id, "data-tech": it.name, x1: cp.x, y1: cp.y, x2: p.x, y2: p.y }));
        var x0 = 14;
        var label = svgEl("text", flip ? { x: x0, y: 4, "text-anchor": "end", transform: "rotate(180 " + x0 + " 0)" } : { x: x0, y: 4 }, it.name);
        var g = svgEl("g", { class: "sg-node sg-tech", tabindex: "0", role: "button", "aria-pressed": "false", "aria-label": it.name + ", " + cat.name, "data-id": it.name, style: { "--pd": ((k * 0.37 + cats[cat.id].techs.length) % 3).toFixed(2) + "s" } },
          svgEl("g", { transform: "translate(" + p.x + " " + p.y + ") rotate(" + deg + ")" },
            svgEl("circle", { r: 5.5 }), label));
        bind(g, it.name);
        nodes[it.name] = { x: p.x, y: p.y, el: g, cat: cat.id };
        nodeLayer.appendChild(g);
      });
      angle += span + gap;
    });
    return svg;
  }

  function bind(el, id) {
    el.addEventListener("mouseenter", function () { previewing = id; apply(id); });
    el.addEventListener("mouseleave", function () { previewing = null; apply(locked); });
    el.addEventListener("focus", function () { previewing = id; apply(id); });
    el.addEventListener("blur", function () { previewing = null; apply(locked); });
    el.addEventListener("click", function () { App.selectSkill(id, true); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); App.selectSkill(id, true); }
    });
  }

  /* Highlight a node, its category and everything it was used alongside. */
  function apply(id) {
    var on = {};
    linkLayer.textContent = "";
    var isCat = id && id.indexOf("cat:") === 0;
    if (id) {
      if (isCat) { var c = id.slice(4); on[id] = 1; cats[c].techs.forEach(function (t) { on[t] = 1; }); }
      else {
        on[id] = 1; on["cat:" + nodes[id].cat] = 1;
        usage(id).peers.forEach(function (n) {
          on[n] = 1; on["cat:" + nodes[n].cat] = 1;
          var a = nodes[id], b = nodes[n], mx = (a.x + b.x) / 2 + (CX - (a.x + b.x) / 2) * 0.45, my = (a.y + b.y) / 2 + (CY - (a.y + b.y) / 2) * 0.45;
          linkLayer.appendChild(svgEl("path", { class: "sg-link", d: "M" + a.x + " " + a.y + " Q" + mx + " " + my + " " + b.x + " " + b.y }));
        });
      }
    }
    svg.classList.toggle("has-focus", !!id);
    Object.keys(nodes).forEach(function (n) { setNode(nodes[n].el, n, on, locked); });
    Object.keys(cats).forEach(function (c) { setNode(cats[c].el, "cat:" + c, on, locked); });
    App.$$(".sg-edge", svg).forEach(function (l) {
      var t = l.getAttribute("data-tech"), cat = l.getAttribute("data-cat");
      var lit = false;
      if (id) lit = isCat ? cat === id.slice(4) : (t === id || (!t && cat === nodes[id].cat));
      l.classList.toggle("is-on", lit);
    });
    showPanel(previewing || locked);
    App.$$(".chip[data-skill]").forEach(function (c) { c.classList.toggle("is-active", c.getAttribute("data-skill") === locked); });
  }
  function setNode(el, id, on, lock) {
    el.classList.toggle("is-on", !!on[id]);
    el.setAttribute("aria-pressed", String(lock === id));
  }

  /* ---------- detail panel ---------- */
  function chipBtn(name) { return h("button", { type: "button", class: "chip chip--sm", onclick: function () { App.selectSkill(name, true); } }, name); }

  function showPanel(id) {
    panel.classList.toggle("is-open", !!locked);
    var body = panel.querySelector(".skill-detail__body");
    body.textContent = "";
    if (!id) {
      body.appendChild(h("p", { class: "muted" }, "Hover, focus or tap a technology to see its context and what it connects to."));
      return;
    }
    if (id.indexOf("cat:") === 0) {
      var cat = catById[id.slice(4)];
      body.appendChild(h("p", { class: "mono skill-detail__cat" }, "CATEGORY"));
      body.appendChild(h("h3", null, cat.name));
      body.appendChild(h("ul", { class: "chips chips--sm" }, cat.items.map(function (i) { return h("li", null, chipBtn(i.name)); })));
      return;
    }
    var s = info[id], u = usage(id);
    body.appendChild(h("p", { class: "mono skill-detail__cat" }, s.cat.name.toUpperCase()));
    body.appendChild(h("h3", null, id));
    body.appendChild(h("p", null, s.desc));
    if (u.projects.length || u.roles.length) {
      body.appendChild(h("p", { class: "mono skill-detail__k" }, "USED IN"));
      body.appendChild(h("ul", { class: "skill-detail__used" },
        u.roles.map(function (e) { return h("li", null, e.role + " · " + e.company); }),
        u.projects.map(function (p) { return h("li", null, h("button", { type: "button", class: "link-btn", onclick: function () { App.openProject(p.id); } }, p.name)); })
      ));
    }
    if (u.peers.length) {
      body.appendChild(h("p", { class: "mono skill-detail__k" }, "PAIRED WITH"));
      body.appendChild(h("ul", { class: "chips chips--sm" }, u.peers.slice(0, 12).map(function (n) { return h("li", null, chipBtn(n)); })));
    }
  }

  App.selectSkill = function (id, lock) {
    if (lock) locked = locked === id ? null : id;
    apply(locked);
    if (lock && locked && matchMedia("(min-width: 900px)").matches) {
      var n = nodes[id]; if (n) n.el.focus({ preventScroll: true });
    }
  };

  App.renderSkillGraph = function () {
    panel = h("div", { class: "skill-detail", role: "region", "aria-label": "Technology details", "aria-live": "polite" },
      h("button", { type: "button", class: "skill-detail__close", "aria-label": "Close details", onclick: function () { locked = null; apply(null); } }, "×"),
      h("div", { class: "skill-detail__body" }));
    // `reveal` goes on the graph only: a transformed ancestor would break the fixed-position mobile sheet.
    var wrap = h("figure", { class: "skillmap" },
      h("div", { class: "skillmap__graph reveal" }, build(),
        h("figcaption", { class: "mono skillmap__cap" }, "Lines show technologies used together in the same project or role")),
      panel);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && locked && !document.querySelector("dialog[open]")) { locked = null; apply(null); } });
    setTimeout(function () { apply(null); }, 0);
    return wrap;
  };
})();
