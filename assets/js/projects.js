/* Projects: case-study cards and the ProjectModal slide-over (native <dialog> for focus trap + Esc). */
(function () {
  "use strict";
  var App = window.App, h = App.h, P = App.data;
  var dialog;

  function card(p, i) {
    var thumb = h("div", { class: "pcard__thumb", "data-cursor": "view" }, h("div", { class: "pcard__thumb-inner" }, App.diagram(p.architecture, { mini: true, id: "t-" + p.id })));
    var el = h("article", { class: "pcard reveal", style: { "--d": (i % 2) * 70 + "ms" } },
      thumb,
      h("div", { class: "pcard__body" },
        h("p", { class: "pcard__meta mono" }, h("span", { class: "tag" + (p.kind === "Production" ? " tag--prod" : "") }, p.kind), " ", p.industry),
        h("h3", { class: "pcard__title" },
          h("button", { type: "button", class: "pcard__open", "aria-haspopup": "dialog", onclick: function () { App.openProject(p.id); } }, p.name)),
        h("p", { class: "pcard__tagline" }, p.tagline),
        h("ul", { class: "chips chips--sm", "aria-label": "Technologies" },
          p.stack.slice(0, 5).map(function (t) { return h("li", { class: "chip chip--static" }, t); }),
          p.stack.length > 5 ? h("li", { class: "chip chip--static chip--more" }, "+" + (p.stack.length - 5)) : null),
        h("p", { class: "pcard__cta mono", "aria-hidden": "true" }, "View case study →")
      )
    );
    // Subtle parallax on the thumbnail (fine pointers, motion allowed).
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var inner = thumb.firstChild;
      el.addEventListener("mousemove", function (e) {
        if (App.reduced()) return;
        var r = thumb.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = "translate3d(" + (dx * -10).toFixed(1) + "px," + (dy * -8).toFixed(1) + "px,0) scale(1.04)";
      });
      el.addEventListener("mouseleave", function () { inner.style.transform = ""; });
    }
    return el;
  }

  function block(label, content) {
    return h("section", { class: "case__block" }, h("h3", { class: "case__h mono" }, label), content);
  }

  function renderModal(p) {
    dialog.textContent = "";
    dialog.appendChild(h("div", { class: "modal__panel" },
      h("button", { type: "button", class: "modal__close", "aria-label": "Close project details", onclick: function () { dialog.close(); } }, "×"),
      h("p", { class: "pcard__meta mono" }, h("span", { class: "tag" + (p.kind === "Production" ? " tag--prod" : "") }, p.kind), " ", p.industry),
      h("h2", { id: "modal-title", class: "modal__title" }, p.name),
      h("p", { class: "modal__tagline" }, p.tagline),
      block("PROBLEM", h("p", null, p.problem)),
      block("SOLUTION", h("p", null, p.solution)),
      block("ARCHITECTURE", h("figure", { class: "modal__diagram" }, App.diagram(p.architecture, { id: "m-" + p.id }))),
      block("TECHNOLOGY", h("ul", { class: "chips" }, p.stack.map(function (t) { return h("li", { class: "chip chip--static" }, t); }))),
      block("IMPACT", h("ul", { class: "case__list" }, p.impact.map(function (t) { return h("li", null, t); }))),
      p.challenges ? block("CHALLENGES", h("p", null, p.challenges)) : null,
      p.links.length
        ? block("LINKS", h("div", { class: "modal__links" }, p.links.map(function (l) {
            return h("a", { class: "btn btn--ghost", href: l.href, target: "_blank", rel: "noopener noreferrer" }, l.label + " ↗");
          })))
        : null
    ));
  }

  App.openProject = function (id) {
    var p = App.projectById(id);
    if (!p || !dialog) return;
    renderModal(p);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add("modal-open");
  };

  App.renderProjects = function () {
    dialog = document.getElementById("project-modal");
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); }); // backdrop click
    dialog.addEventListener("close", function () { document.documentElement.classList.remove("modal-open"); });
    App.mount("mount-projects", [
      App.sectionHeader("04", "PROJECTS", "Proof, as case studies.", "Production releases and proofs of concept, each with the problem, the build and the architecture.", "projects-title"),
      h("div", { class: "project-grid" }, P.projects.map(card)),
    ]);
  };
})();
