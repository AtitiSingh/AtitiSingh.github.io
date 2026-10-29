/* ArchitectureDiagram: renders { nodes:[{id,label,sub,layer}], edges:[[from,to]] } as an accessible SVG. */
(function () {
  "use strict";
  var App = window.App, h = App.h;
  var W = 720, NODE_W = 172, NODE_H = 52, ROW = 88, PAD = 16;

  App.diagram = function (arch, opts) {
    opts = opts || {};
    var layers = {};
    arch.nodes.forEach(function (n) { (layers[n.layer] = layers[n.layer] || []).push(n); });
    var count = Math.max.apply(null, arch.nodes.map(function (n) { return n.layer; })) + 1;
    var H = PAD * 2 + (count - 1) * ROW + NODE_H;
    var pos = {};
    Object.keys(layers).forEach(function (l) {
      var row = layers[l];
      row.forEach(function (n, i) {
        pos[n.id] = { x: (W * (i + 1)) / (row.length + 1), y: PAD + l * ROW };
      });
    });
    var byId = {};
    arch.nodes.forEach(function (n) { byId[n.id] = n; });

    var summary = "Architecture flow: " + arch.edges.map(function (e) { return byId[e[0]].label + " to " + byId[e[1]].label; }).join("; ") + ".";

    var svg = h("svg:svg", {
      class: "diagram" + (opts.mini ? " diagram--mini" : ""),
      viewBox: "0 0 " + W + " " + H,
      role: opts.mini ? null : "img",
      "aria-label": opts.mini ? null : summary,
      "aria-hidden": opts.mini ? "true" : null,
      focusable: "false",
    });

    var defs = h("svg:defs", null,
      h("svg:marker", { id: "arrow-" + (opts.id || "d"), viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" },
        h("svg:path", { d: "M0 0 L10 5 L0 10 z", class: "diagram__arrow" })));
    svg.appendChild(defs);

    arch.edges.forEach(function (e, i) {
      var a = pos[e[0]], b = pos[e[1]];
      var x1 = a.x, y1 = a.y + NODE_H, x2 = b.x, y2 = b.y - 2, my = (y1 + y2) / 2;
      svg.appendChild(h("svg:path", {
        class: "diagram__edge",
        d: "M" + x1 + " " + y1 + " C" + x1 + " " + my + " " + x2 + " " + my + " " + x2 + " " + y2,
        "marker-end": "url(#arrow-" + (opts.id || "d") + ")",
        style: { "--i": i },
      }));
    });

    arch.nodes.forEach(function (n, i) {
      var p = pos[n.id];
      var g = h("svg:g", { class: "diagram__node", style: { "--i": i }, transform: "translate(" + (p.x - NODE_W / 2) + " " + p.y + ")" },
        h("svg:rect", { width: NODE_W, height: NODE_H, rx: 8 }),
        h("svg:text", { class: "diagram__label", x: NODE_W / 2, y: n.sub ? 22 : 31, "text-anchor": "middle" }, n.label),
        n.sub ? h("svg:text", { class: "diagram__sub", x: NODE_W / 2, y: 39, "text-anchor": "middle" }, n.sub) : null
      );
      svg.appendChild(g);
    });
    return svg;
  };
})();
