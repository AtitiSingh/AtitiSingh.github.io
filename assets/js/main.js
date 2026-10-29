/* Boot: render everything from data, then start behaviour. Falls back gracefully if anything throws. */
(function () {
  "use strict";
  var App = window.App;
  function boot() {
    try {
      App.initChrome();
      App.renderHero();
      App.renderSections();
      App.renderProjects();
      App.initPalette();
      if (location.hash) setTimeout(function () { var el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }, 50);
    } catch (err) {
      console.error(err);
      document.documentElement.classList.remove("js", "loading"); // show whatever rendered, unhidden
    }
  }
  // Safety net: never leave the loader up if something stalls.
  setTimeout(function () { document.documentElement.classList.remove("loading"); }, 2000);
  boot();
  App.runLoader(function () { App.observeReveals(document); });
})();
