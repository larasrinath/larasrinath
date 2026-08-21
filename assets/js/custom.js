// Lightweight progressive enhancements for Lara's personal Hugo theme.
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  function initNavigation() {
    var header = document.querySelector('.topbar');
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!header || !toggle || !menu) return;

    header.setAttribute('data-menu-ready', '');

    function setOpen(open, restoreFocus) {
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', toggle.getAttribute(open ? 'data-close-label' : 'data-open-label'));
      if (!open && restoreFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false, true);
      }
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

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
    initNavigation();
    initReadingProgress();
    initCopyLinks();
  });
})();
