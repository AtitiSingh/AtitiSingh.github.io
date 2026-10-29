/* Section renderers. Each one consumes PORTFOLIO data and returns DOM; no content lives here. */
(function () {
  "use strict";
  var App = window.App, h = App.h, P = App.data;

  function allSkillNames() {
    return App.unique(P.skills.reduce(function (a, c) { return a.concat(c.items.map(function (i) { return i.name; })); }, []));
  }

  /* ---------- 01 About ---------- */
  function about() {
    var stats = [
      { n: App.yearsOfExperience(), suffix: "+", label: "Years in industry" },
      { n: P.projects.length, suffix: "", label: "Projects" },
      { n: P.industries.length, suffix: "", label: "Industries" },
      { n: allSkillNames().length, suffix: "", label: "Technologies" },
    ];
    var statEls = stats.map(function (s) {
      var num = h("span", { class: "stat__num" }, "0");
      App.onVisible(num, function () { App.countUp(num, s.n, s.suffix); });
      return h("div", { class: "stat" }, num, h("span", { class: "stat__label mono" }, s.label));
    });

    return [
      App.sectionHeader("01", "ABOUT", "I turn complex problems into simple, scalable software.", null, "about-title"),
      h("div", { class: "about" },
        h("div", { class: "about__main reveal" },
          h("p", { class: "lead" }, P.personal.summary),
          h("div", { class: "build-grid" },
            P.personal.buildAreas.map(function (b) {
              return h("article", { class: "build-card" }, h("h3", null, b.title), h("p", null, b.text));
            })
          )
        ),
        h("aside", { class: "about__side reveal", "aria-label": "Snapshot" },
          h("ul", { class: "pillars mono" }, P.personal.pillars.map(function (p) { return h("li", null, h("span", { "aria-hidden": "true" }, "▸ "), p); })),
          h("div", { class: "stats" }, statEls),
          h("div", { class: "foundation" },
            h("p", { class: "mono foundation__label" }, "FOUNDATION"),
            P.education.map(function (e) {
              return h("p", null, h("strong", null, e.degree), h("br"), e.school, h("br"),
                h("span", { class: "muted" }, App.fmtDate(e.start) + " – " + App.fmtDate(e.end) + " · " + e.note));
            }),
            h("p", { class: "muted" }, P.certifications.map(function (c) { return c.name + " (" + c.issuer + ")"; }).join(" · "))
          )
        )
      ),
    ];
  }

  /* ---------- 02 Skills ---------- */
  function skills() {
    var grid = h("div", { class: "skill-grid" },
      P.skills.map(function (cat, ci) {
        return h("article", { class: "skill-card reveal", style: { "--d": ci * 50 + "ms" } },
          h("h3", { class: "mono skill-card__title" }, cat.name),
          h("ul", { class: "chips" },
            cat.items.map(function (it) {
              return h("li", null, h("button", { type: "button", class: "chip", "data-skill": it.name, onclick: function () { App.selectSkill(it.name, true); } }, it.name));
            })
          )
        );
      })
    );
    return [
      App.sectionHeader("02", "SKILLS", "What I build with.", "Grouped by what they do. Select any technology to see where I've used it and what it connects to.", "skills-title"),
      App.renderSkillGraph(),
      grid,
    ];
  }

  /* ---------- 03 Industries ---------- */
  function industries() {
    return [
      App.sectionHeader("03", "INDUSTRIES", "Domains I've worked in.", "Gaming, commerce, finance, enterprise and AI.", "industries-title"),
      h("div", { class: "industry-grid" },
        P.industries.map(function (ind, i) {
          return h("article", { class: "industry reveal", style: { "--d": i * 60 + "ms" } },
            h("h3", { class: "mono industry__name" }, ind.name.toUpperCase()),
            h("p", { class: "industry__blurb" }, ind.blurb),
            h("ul", { class: "chips chips--sm", "aria-label": "Technologies" }, ind.tech.map(function (t) { return h("li", { class: "chip chip--static" }, t); })),
            h("div", { class: "industry__projects" },
              ind.projects.map(function (id) {
                var pr = App.projectById(id);
                return h("button", { type: "button", class: "link-btn", onclick: function () { App.openProject(id); } }, "↳ " + pr.name);
              })
            ),
            ind.impact ? h("p", { class: "industry__impact mono" }, h("span", { "aria-hidden": "true" }, "◆ "), ind.impact) : null
          );
        })
      ),
    ];
  }

  /* ---------- 05 Experience ---------- */
  function experience() {
    var fill = h("span", { class: "timeline__fill" });
    var list = h("ol", { class: "timeline__list" },
      P.experience.map(function (e) {
        return h("li", { class: "tl-item reveal" },
          h("span", { class: "tl-item__dot", "aria-hidden": "true" }),
          h("p", { class: "tl-item__date mono" }, App.range(e)),
          h("article", { class: "tl-card" },
            h("h3", null, e.role),
            h("p", { class: "tl-card__co" }, e.company, h("span", { class: "muted" }, " · " + e.location)),
            e.industry ? h("p", { class: "tl-card__ind mono" }, "Industry: " + e.industry) : null,
            h("p", { class: "tl-card__sum" }, e.summary),
            h("ul", { class: "tl-card__list" }, e.achievements.map(function (a) { return h("li", null, a); })),
            h("ul", { class: "chips chips--sm", "aria-label": "Technologies" }, e.tech.map(function (t) { return h("li", { class: "chip chip--static" }, t); }))
          )
        );
      })
    );
    var wrap = h("div", { class: "timeline" }, h("span", { class: "timeline__rail", "aria-hidden": "true" }, fill), list);

    var ticking = false;
    function update() {
      var r = wrap.getBoundingClientRect(), mid = innerHeight * 0.55;
      var p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      fill.style.transform = "scaleY(" + p + ")";
      ticking = false;
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    setTimeout(update, 0);

    return [
      App.sectionHeader("05", "EXPERIENCE", "Where I've applied it.", "From game servers to mobile apps, newest first.", "experience-title"),
      wrap,
    ];
  }

  /* ---------- 06 Philosophy ---------- */
  function philosophy() {
    return [
      App.sectionHeader("06", "APPROACH", "How I engineer.", null, "philosophy-title"),
      h("div", { class: "principles" },
        P.philosophy.map(function (p, i) {
          return h("article", { class: "principle reveal", style: { "--d": i * 50 + "ms" } },
            h("p", { class: "principle__num mono" }, String(i + 1).padStart(2, "0") + " —"),
            h("h3", null, p.title),
            h("p", null, p.text),
            h("p", { class: "principle__ev mono" }, "↳ " + p.evidence)
          );
        })
      ),
    ];
  }

  /* ---------- 07 Under the hood ---------- */
  function hood() {
    var u = P.underTheHood;
    return [
      App.sectionHeader("07", "UNDER THE HOOD", "This website.", u.intro, "hood-title"),
      h("div", { class: "hood reveal" },
        h("dl", { class: "hood__list" },
          u.items.map(function (it) { return h("div", null, h("dt", { class: "mono" }, it.label), h("dd", null, it.value)); })),
        h("figure", { class: "hood__diagram" },
          App.diagram(u.architecture, { id: "hood" }),
          h("figcaption", { class: "mono" }, "Content → renderers → DOM → static hosting")
        )
      ),
    ];
  }

  /* ---------- 08 Contact ---------- */
  function copyBtn(text, label) {
    return h("button", {
      type: "button", class: "copy mono", "aria-label": "Copy " + label,
      onclick: function () {
        var done = function () { App.toast(label + " copied"); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { App.toast(text); });
        else App.toast(text);
      },
    }, "copy");
  }
  function contact() {
    var s = P.social;
    return [
      App.sectionHeader("08", "CONTACT", "Let's build something worth shipping.", "Have an interesting problem? Let's talk.", "contact-title"),
      h("div", { class: "contact reveal" },
        h("ul", { class: "contact__rows" },
          h("li", null,
            h("span", { class: "mono contact__k" }, "EMAIL"),
            h("a", { class: "contact__v", href: "mailto:" + s.email }, s.email), copyBtn(s.email, "email")),
          h("li", null,
            h("span", { class: "mono contact__k" }, "PHONE"),
            h("a", { class: "contact__v", href: "tel:" + s.phoneHref }, s.phone), copyBtn(s.phone, "phone number")),
          h("li", null,
            h("span", { class: "mono contact__k" }, "BASED IN"),
            h("span", { class: "contact__v" }, P.personal.location))
        ),
        h("div", { class: "contact__cta" },
          h("a", { class: "btn btn--primary", href: "mailto:" + s.email }, "Email me"),
          h("a", { class: "btn btn--ghost", href: "tel:" + s.phoneHref }, "Call"),
          h("a", { class: "btn btn--ghost", href: s.linkedin, target: "_blank", rel: "noopener noreferrer" }, "LinkedIn"),
          h("a", { class: "btn btn--ghost", href: s.github, target: "_blank", rel: "noopener noreferrer" }, "GitHub"),
          h("a", { class: "btn btn--ghost", href: P.resume.pdf, download: P.resume.downloadName }, "Download Resume")
        ),
        h("p", { class: "muted contact__alt" }, "Prefer Word? ", h("a", { href: P.resume.docx, download: "" }, "Download the .docx version"), ".")
      ),
    ];
  }

  /* ---------- footer ---------- */
  function footer() {
    var s = P.social;
    return h("div", { class: "container footer__inner" },
      h("div", null,
        h("p", { class: "footer__copy" }, "© " + new Date().getFullYear() + " " + P.personal.name),
        h("p", { class: "muted" }, P.site.footerNote)
      ),
      h("nav", { class: "footer__links", "aria-label": "Footer" },
        h("a", { href: s.github, target: "_blank", rel: "noopener noreferrer" }, "GitHub"),
        h("a", { href: s.linkedin, target: "_blank", rel: "noopener noreferrer" }, "LinkedIn"),
        h("a", { href: "mailto:" + s.email }, "Email"),
        h("a", { href: P.resume.pdf, download: P.resume.downloadName }, "Resume")
      ),
      h("p", { class: "footer__status mono" }, "STATUS: ONLINE ", h("span", { class: "dot", "aria-hidden": "true" }), h("span", { class: "muted" }, " " + P.site.version))
    );
  }

  App.renderSections = function () {
    App.mount("mount-about", about());
    App.mount("mount-skills", skills());
    App.mount("mount-industries", industries());
    App.mount("mount-experience", experience());
    App.mount("mount-philosophy", philosophy());
    App.mount("mount-hood", hood());
    App.mount("mount-contact", contact());
    App.mount("mount-footer", footer());
  };
})();
