// ===== Dynamic Site Enhancements =====
// All features degrade gracefully — if JS fails, site works normally.

(function () {
  'use strict';

  // Respect reduced-motion preference
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- 1. Typewriter Effect (Homepage subtitle) ----
  function initTypewriter() {
    if (prefersReduced) return;

    var el = document.querySelector('.home h2.ttu');
    if (!el) return;

    var phrases = [
      'Anaplan + Data',
      'Solution Architect',
      'Master Anaplanner',
      'Supply Chain Enthusiast'
    ];

    var phraseIndex = 0;
    var charIndex = phrases[0].length; // start fully typed
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseEnd = 2200;
    var pauseStart = 400;

    el.classList.add('typewriter-cursor');
    el.style.display = 'inline-block';
    el.style.minHeight = '1.5em';

    // Measure widest phrase to prevent collapse
    var maxWidth = 0;
    phrases.forEach(function (p) {
      el.textContent = p;
      var w = el.offsetWidth;
      if (w > maxWidth) maxWidth = w;
    });
    el.style.minWidth = maxWidth + 'px';
    el.textContent = phrases[0];

    function tick() {
      var current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = current.substring(0, charIndex) || '\u00A0';
      } else {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
      }

      var delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        delay = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = pauseStart;
      }

      setTimeout(tick, delay);
    }

    // Pause on the initial phrase, then start cycling
    setTimeout(function () {
      isDeleting = true;
      tick();
    }, 2000);
  }

  // ---- 2. Fade-in on Load (Homepage elements) ----
  function initFadeIn() {
    if (prefersReduced) return;

    var wrapper = document.querySelector('.home .page-content > .flex-ns');
    if (!wrapper) return;

    var children = wrapper.children;
    for (var i = 0; i < children.length; i++) {
      children[i].classList.add('fade-in-up');
      children[i].style.animationDelay = (i * 0.25) + 's';
    }
  }

  // ---- 3. Scroll Reveal Animations ----
  function initScrollReveal() {
    if (prefersReduced) return;
    if (!('IntersectionObserver' in window)) return;

    var elements = document.querySelectorAll([
      // Project and blog cards
      '.blog-content > article',
      // Section intros
      '.blog-intro',
      // Work experience items
      '.work-item',
      // Skill tags container
      '.about-tag'
    ].join(', '));

    if (!elements.length) return;

    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('scroll-reveal');
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  // ---- 4. Animated Skills Visualization (About page) ----
  function initSkillsChart() {
    if (prefersReduced) return;

    var sidebar = document.querySelector('#profile');
    if (!sidebar) return;

    // Find the interests heading and insert chart after skills
    var tagsOnPage = document.querySelectorAll('.about-tag');
    if (tagsOnPage.length === 0) return;

    // Animate tags in with stagger when they scroll into view
    if (!('IntersectionObserver' in window)) return;

    var tagContainer = tagsOnPage[0].parentElement;
    if (!tagContainer) return;

    var tagObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var tags = entry.target.querySelectorAll('.about-tag');
          tags.forEach(function (tag, i) {
            tag.style.animationDelay = (i * 0.05) + 's';
            tag.classList.add('tag-pop-in');
          });
          tagObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    tagObserver.observe(tagContainer);
  }


  // ---- 7. Dark Mode Toggle + Theme Picker ----

  var darkPalettes = {
    nord: {
      label: 'Nord',
      bg: '#2E3440', surface: '#3B4252', elevated: '#434C5E',
      border: '#4C566A', text: '#ECEFF4', muted: '#D8DEE9',
      accent: '#88C0D0', toggle: '#EBCB8B',
      swatches: ['#2E3440','#88C0D0','#B48EAD']
    },
    catppuccin: {
      label: 'Catppuccin',
      bg: '#1E1E2E', surface: '#313244', elevated: '#45475A',
      border: '#585B70', text: '#CDD6F4', muted: '#BAC2DE',
      accent: '#F5C2E7', toggle: '#F9E2AF',
      swatches: ['#1E1E2E','#F5C2E7','#89B4FA']
    },
    github: {
      label: 'GitHub Dark',
      bg: '#0D1117', surface: '#161B22', elevated: '#21262D',
      border: '#30363D', text: '#E6EDF3', muted: '#8B949E',
      accent: '#E22027', toggle: '#E22027',
      swatches: ['#0D1117','#58A6FF','#58A6FF']
    },
    dracula: {
      label: 'Dracula',
      bg: '#282A36', surface: '#44475A', elevated: '#6272A4',
      border: '#6272A4', text: '#F8F8F2', muted: '#6272A4',
      accent: '#BD93F9', toggle: '#F1FA8C',
      swatches: ['#282A36','#FF79C6','#BD93F9']
    }
  };

  function applyPalette(name) {
    var p = darkPalettes[name];
    if (!p) return;
    var s = document.documentElement.style;
    s.setProperty('--dm-bg', p.bg);
    s.setProperty('--dm-surface', p.surface);
    s.setProperty('--dm-elevated', p.elevated);
    s.setProperty('--dm-border', p.border);
    s.setProperty('--dm-text', p.text);
    s.setProperty('--dm-muted', p.muted);
    s.setProperty('--dm-accent', p.accent);
    s.setProperty('--dm-toggle', p.toggle);
    localStorage.setItem('dark-palette', name);
  }

  function initDarkMode() {
    var toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    var html = document.documentElement;
    var checkbox = toggle.querySelector('.theme-toggle__input');

    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved ? saved === 'dark' : prefersDark;

    // Apply saved palette (default to github)
    var savedPalette = localStorage.getItem('dark-palette') || 'github';
    applyPalette(savedPalette);

    function apply(dark) {
      html.setAttribute('data-theme', dark ? 'dark' : 'light');
      toggle.classList.toggle('theme-toggle--toggled', dark);
      if (checkbox) checkbox.checked = dark;
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    apply(isDark);

    if (checkbox) {
      checkbox.addEventListener('change', function () {
        isDark = checkbox.checked;
        apply(isDark);
      });
    }
  }

  // ---- 8. Parallax Homepage Avatar ----
  function initParallax() {
    if (prefersReduced) return;
    if (window.innerWidth < 768) return; // disable on mobile

    var img = document.querySelector('.home .page-content img');
    if (!img) return;

    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var rate = scrolled * 0.15;
      img.style.transform = 'translateY(' + rate + 'px)';
    }, { passive: true });
  }

  // ---- 12. Page Transitions ----
  function initPageTransitions() {
    if (prefersReduced) return;

    var wrapper = document.querySelector('.grid-container');
    if (!wrapper) return;

    // Fade in on load
    wrapper.classList.add('page-enter');

    // Fade out on navigation
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      // Only internal links, not anchors or new tabs
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          link.getAttribute('target') === '_blank' || e.ctrlKey || e.metaKey) return;

      // Allow same-origin absolute URLs, skip truly external ones
      if (href.startsWith('http')) {
        try {
          var linkUrl = new URL(href);
          if (linkUrl.origin !== window.location.origin) return;
          href = linkUrl.pathname + linkUrl.search + linkUrl.hash;
        } catch (ex) { return; }
      }

      e.preventDefault();
      wrapper.classList.add('page-exit');

      setTimeout(function () {
        window.location.href = href;
      }, 250);
    });
  }

  // ---- Initialize everything ----
  // ---- Mobile Hamburger Menu ----
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-toggle');
    var links = document.querySelector('.site-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var isOpen = btn.classList.toggle('open');
      links.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        btn.classList.remove('open');
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initMobileMenu();
    initTypewriter();
    initFadeIn();
    initScrollReveal();
    initSkillsChart();
    initParallax();
    initPageTransitions();
  });
})();
