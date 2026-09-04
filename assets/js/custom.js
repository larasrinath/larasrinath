// Lightweight progressive enhancements for Lara's personal Hugo theme.
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  function initTheme() {
    var root = document.documentElement;
    var toggle = document.querySelector('[data-theme-toggle]');
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    if (!toggle) return;

    function updateToggle(theme) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', toggle.getAttribute(isDark ? 'data-light-label' : 'data-dark-label'));
    }

    function setTheme(theme, remember) {
      root.dataset.theme = theme;
      updateToggle(theme);
      if (!remember) return;

      try {
        localStorage.setItem('lara-color-theme', theme);
      } catch (error) {
        // The theme still applies when storage is unavailable.
      }
    }

    updateToggle(root.dataset.theme || (media.matches ? 'dark' : 'light'));

    toggle.addEventListener('click', function () {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });

    media.addEventListener('change', function (event) {
      try {
        if (localStorage.getItem('lara-color-theme')) return;
      } catch (error) {
        // Follow the system setting when storage is unavailable.
      }
      setTheme(event.matches ? 'dark' : 'light', false);
    });
  }

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
      if (toggle.getAttribute('aria-expanded') === 'true' && !toggle.contains(event.target) && !menu.contains(event.target)) {
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

  function initShareMenus() {
    var menus = document.querySelectorAll('[data-share-menu]');
    if (!menus.length) return;

    function setOpen(menu, open, restoreFocus) {
      var toggle = menu.querySelector('[data-share-toggle]');
      var options = menu.querySelector('[data-share-options]');
      if (!toggle || !options) return;

      toggle.setAttribute('aria-expanded', String(open));
      options.hidden = !open;
      if (!open && restoreFocus) toggle.focus();
    }

    menus.forEach(function (menu) {
      var toggle = menu.querySelector('[data-share-toggle]');
      if (!toggle) return;

      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        var open = toggle.getAttribute('aria-expanded') !== 'true';

        menus.forEach(function (otherMenu) {
          if (otherMenu !== menu) setOpen(otherMenu, false);
        });
        setOpen(menu, open);
      });

      menu.addEventListener('click', function (event) {
        event.stopPropagation();
      });

      menu.querySelectorAll('[data-share-options] a').forEach(function (link) {
        link.addEventListener('click', function () {
          setOpen(menu, false);
        });
      });
    });

    document.addEventListener('click', function () {
      menus.forEach(function (menu) {
        setOpen(menu, false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;

      menus.forEach(function (menu) {
        var toggle = menu.querySelector('[data-share-toggle]');
        if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(menu, false, true);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavigation();
    initReadingProgress();
    initShareMenus();
    if (new URLSearchParams(window.location.search).get('anatomy') === '1') {
      var source = document.querySelector('script[data-anatomy-script]');
      if (!source) return;
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = source.dataset.anatomyStyle;
      document.head.appendChild(stylesheet);
      var script = document.createElement('script');
      script.src = source.dataset.anatomyScript;
      document.head.appendChild(script);
    }
  });
})();
