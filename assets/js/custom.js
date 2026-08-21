// Lightweight progressive enhancements for Lara's personal Hugo theme.
(function () {
  'use strict';

  function initReadingProgress() {
    var progress = document.querySelector('.reading-progress');
    if (!progress) return;

    function update() {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.width = Math.max(0, Math.min(100, percentage)) + '%';
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  function initCopyLinks() {
    var buttons = document.querySelectorAll('[data-copy-url]');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var url = button.getAttribute('data-copy-url');
        if (!url || !navigator.clipboard) return;

        navigator.clipboard.writeText(url).then(function () {
          var previous = button.textContent;
          var successLabel = button.getAttribute('data-copy-success-label');
          button.textContent = successLabel;
          button.setAttribute('aria-label', successLabel);
          window.setTimeout(function () {
            button.textContent = previous;
            button.setAttribute('aria-label', button.getAttribute('data-copy-reset-label'));
          }, 1800);
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReadingProgress();
    initCopyLinks();
  });
})();
