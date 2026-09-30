(function () {
  'use strict';

  var root = document.documentElement;
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function storedTheme() {
    try {
      var t = localStorage.getItem('theme');
      return t === 'light' || t === 'dark' ? t : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || (darkQuery && darkQuery.matches ? 'dark' : 'light');
  }

  function syncToggles() {
    var theme = currentTheme();
    var buttons = document.querySelectorAll('[data-theme-value]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-theme-value') === theme));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d1117' : '#fafbfc');
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('[data-theme-value]') : null;
    if (!button) return;
    var theme = button.getAttribute('data-theme-value');
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
    syncToggles();
  });

  // Follow the system setting until the visitor picks a theme themselves.
  if (darkQuery) {
    var onSystemChange = function () {
      if (!storedTheme()) syncToggles();
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
  }

  syncToggles();

  // Demo video: play only while it's on screen, and never for people who
  // prefer reduced motion (they keep the normal video controls instead).
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var videos = document.querySelectorAll('video[data-autoplay]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          var playing = video.play();
          if (playing && playing.catch) playing.catch(function () { video.controls = true; });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });
    for (var j = 0; j < videos.length; j++) {
      videos[j].controls = false;
      observer.observe(videos[j]);
    }
  }
})();
