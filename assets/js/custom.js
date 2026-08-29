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

  function initAnatomy() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('anatomy') !== '1') return;

    var root = document.documentElement;
    var body = document.body;
    var activeTarget = null;

    var roleGuidance = {
      T01: 'The homepage identity name only.',
      T02: 'The single primary title of a page, project, or article.',
      T03: 'A major section title or prominent browsable-entry title below the H1.',
      T04: 'A subsection heading inside long-form editorial content.',
      T05: 'The name of a structured record, such as a role, degree, or resource.',
      T06: 'A category heading for skills, capabilities, callouts, and calls to action.',
      T07: 'Introductory narrative that frames a page or article before body copy.',
      T08: 'Concise supporting copy in details, profiles, heroes, archives, calls to action, and previews.',
      T09: 'Default continuous-reading copy, lists, descriptions, and input text.',
      T11: 'Quoted speech, a pull quote, or an editorial signoff.',
      T12: 'Text that navigates, submits, toggles, downloads, or triggers an action.',
      T13: 'Short scannable context: labels, eyebrows, tags, metadata, and field names.',
      T14: 'A date, period, or sequence number that deserves typographic emphasis.',
      T15: 'Optional tertiary context such as captions, notes, and copyright.',
      T16: 'A restrained script flourish used only in the header wordmark and the homepage/About surname initial.',
      T17: 'Literal code, commands, identifiers, and preformatted technical text.'
    };

    var roles = [
      { id: 'T16', name: 'Brand flourish', selectors: '.wordmark-initial, .home-profile-surname-initial' },
      { id: 'T01', name: 'Home display name', selectors: '.app-home .home-profile h1' },
      { id: 'T02', name: 'Page/detail title', selectors: '.page-hero h1, .app-detail-hero h1' },
      { id: 'T11', name: 'Quotation or signoff', selectors: '.article-content.app-detail-prose blockquote p, .article-editorial-quote p, .article-editorial-signoff, .article-editorial-equations code' },
      { id: 'T14', name: 'Date or annotation', selectors: '.app-timeline time, .resume-role time, .resume-education time, .blog-post-row .post-meta time, .post-count, .article-editorial-prompt-index' },
      { id: 'T15', name: 'Caption or tertiary copy', selectors: '.app-detail-figure figcaption, .article-content figcaption, .article-content .caption, .resume-highlight small, .site-footer-copyright, .site-footer-links a' },
      { id: 'T17', name: 'Code', selectors: '.article-content code, .article-content pre code' },
      { id: 'T07', name: 'Editorial lead', selectors: '.about-intro p, .resume-summary p, .article-editorial-opening' },
      { id: 'T08', name: 'Supporting copy', selectors: '.app-detail-summary > p, .app-timeline-note, .about-interest-list li, .app-capabilities li, .page-hero > p:last-child:not(.section-label), .project-row p, .post-row p, .article-editorial-cta small, .article-editorial-prompt-text' },
      { id: 'T06', name: 'Category heading', selectors: '.app-capabilities h3, .resume-skill-group h3, .article-editorial-callout > strong, .article-editorial-cta strong, .callout-title' },
      { id: 'T04', name: 'Editorial subheading', selectors: '.article-content.app-detail-prose h3, .article-content.app-detail-prose h4, .project-content h3' },
      { id: 'T05', name: 'Item or record title', selectors: '.app-timeline h3, .resume-role h3, .resume-education h3, .app-detail-next-title' },
      { id: 'T03', name: 'Section or list title', selectors: '.app-experience-main h2, .project-row h2, .post-row h2, .contact-form-layout legend, .term-grid strong, .article-content.app-detail-prose h2, .project-content h2' },
      { id: 'T13', name: 'Label, metadata, or tag', selectors: '.section-label, .app-section-number, .app-timeline-meta, .project-date, .project-tags span:not(.project-tag-separator), .post-meta, .post-details, .pagination, .app-detail-eyebrow, .app-detail-utility-meta, .app-detail-taxonomy > p, .app-detail-tags a, .article-editorial-quote cite, .article-editorial-callout > span, .article-editorial-prompts-label, .callout-kind, .article-editorial-code summary, .app-detail-next-label, .resume-highlight span, .resume-role-meta, .resume-education p, .contact-form-layout label, .term-grid a > span:first-child, .os-selector-label, .auth-selector-label' },
      { id: 'T12', name: 'Navigation or action', selectors: '.primary-nav a, .app-button, .round-link, .app-detail-back, .app-resource-action, .icon-link, .contact-social-links a, .contact-form-layout input[type="submit"]' },
      { id: 'T09', name: 'Primary body copy', selectors: '.article-content.app-detail-prose p, .article-content.app-detail-prose li:not(.article-editorial-prompt), .article-content.app-detail-prose dd, .project-content p, .project-content li, .about-history-copy p, .resume-highlight strong, .resume-bullets li, .resume-clean-list li, .callout-body p, .callout-body li, .contact-form-layout input:not([type="submit"]), .contact-form-layout textarea' }
    ];

    var roleById = {};
    roles.forEach(function (role) {
      roleById[role.id] = role;
      document.querySelectorAll(role.selectors).forEach(function (element) {
        if (element.dataset.anatomyRole) return;
        element.dataset.anatomyRole = role.id;
        element.dataset.anatomyName = role.name;
      });
    });

    [
      { id: 'T02', name: 'Page/detail title', selectors: 'main h1' },
      { id: 'T03', name: 'Section or list title', selectors: 'main h2' },
      { id: 'T05', name: 'Item or record title', selectors: 'main h3, main h4, main h5, main h6' },
      { id: 'T09', name: 'Primary body copy', selectors: 'main p, main li:not(.article-editorial-prompt), main dd, main dt' },
      { id: 'T12', name: 'Navigation or action', selectors: 'main a, main button' }
    ].forEach(function (fallback) {
      document.querySelectorAll(fallback.selectors).forEach(function (element) {
        if (element.dataset.anatomyRole) return;
        element.dataset.anatomyRole = fallback.id;
        element.dataset.anatomyName = fallback.name;
      });
    });

    function pageFamily() {
      if (document.querySelector('.app-home')) return 'Homepage';
      if (document.querySelector('.about-page')) return 'About';
      if (document.querySelector('.resume-page-shell')) return 'Résumé';
      if (document.querySelector('.contact-page')) return 'Contact';
      if (document.querySelector('.not-found-page')) return 'Not found';
      if (document.querySelector('.project-index')) return 'Project archive';
      if (body.classList.contains('page--project') && document.querySelector('.app-detail-page')) return 'Project detail';
      if (body.classList.contains('page--blog') && document.querySelector('.app-detail-page')) return 'Blog article';
      if (body.classList.contains('page--blog')) return 'Blog archive';
      if (body.classList.contains('page--taxonomy')) return 'Taxonomy landing';
      if (body.classList.contains('page--term')) return 'Taxonomy term';
      if (body.classList.contains('page--talk')) return 'Talks archive';
      if (document.querySelector('.content-page')) return 'Generic content page';
      return 'Generic page';
    }

    var regions = [
      ['.topbar', 'Shared header'],
      ['.site-footer', 'Shared footer'],
      ['.home-profile', 'Identity hero'],
      ['.page-hero', 'Page hero'],
      ['.app-detail-hero', 'Detail hero'],
      ['.app-detail-utility', 'Detail utility row'],
      ['.app-detail-prose', 'Editorial body'],
      ['.app-detail-taxonomy', 'Detail taxonomy footer'],
      ['.app-detail-next', 'Next entry'],
      ['.about-detail', 'Biography and interests'],
      ['.app-experience', 'Experience and capabilities'],
      ['.resume-overview', 'Résumé overview'],
      ['.resume-experience', 'Résumé experience'],
      ['.resume-skills-section', 'Résumé skills'],
      ['.resume-credentials', 'Résumé credentials'],
      ['.project-index', 'Project archive rows'],
      ['.post-index', 'Archive rows'],
      ['.term-grid', 'Taxonomy terms'],
      ['.contact-form-layout', 'Contact form'],
      ['.project-content', 'Reading column'],
      ['.not-found-actions', 'Recovery actions']
    ];

    function regionFor(element) {
      for (var index = 0; index < regions.length; index += 1) {
        if (element.closest(regions[index][0])) return regions[index][1];
      }
      return 'Page content';
    }

    function rgbToHex(value) {
      var channels = value.match(/[\d.]+/g);
      if (!channels || channels.length < 3) return value;
      return '#' + channels.slice(0, 3).map(function (channel) {
        return Math.round(Number(channel)).toString(16).padStart(2, '0');
      }).join('');
    }

    var cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('anatomy');

    var inspector = document.createElement('div');
    inspector.className = 'anatomy-inspector';
    inspector.setAttribute('role', 'region');
    inspector.setAttribute('aria-label', 'Typography anatomy inspector');
    inspector.innerHTML =
      '<span class="anatomy-badge" aria-hidden="true">—</span>' +
      '<aside class="anatomy-panel anatomy-panel--page">' +
        '<span class="anatomy-kicker">Page anatomy</span>' +
        '<strong class="anatomy-page-name"></strong>' +
        '<p class="anatomy-region-name">Hover over text to inspect it.</p>' +
        '<span class="anatomy-help">Mapped from the living design system</span>' +
        '<a class="anatomy-exit" href="' + cleanUrl.href + '">Exit anatomy</a>' +
      '</aside>' +
      '<aside class="anatomy-panel anatomy-panel--type">' +
        '<span class="anatomy-kicker">Typography role</span>' +
        '<div class="anatomy-role-heading"><b class="anatomy-role-id">—</b><strong class="anatomy-role-name">Hover over text</strong></div>' +
        '<dl>' +
          '<div><dt>Typeface</dt><dd data-anatomy-value="family">—</dd></div>' +
          '<div><dt>Size / leading</dt><dd data-anatomy-value="size">—</dd></div>' +
          '<div><dt>Weight / style</dt><dd data-anatomy-value="weight">—</dd></div>' +
          '<div><dt>Letter spacing</dt><dd data-anatomy-value="spacing">—</dd></div>' +
          '<div><dt>Rendered color</dt><dd data-anatomy-value="color">—</dd></div>' +
          '<div><dt>Use for</dt><dd data-anatomy-value="usage">—</dd></div>' +
        '</dl>' +
      '</aside>';
    body.appendChild(inspector);

    inspector.querySelector('.anatomy-page-name').textContent = pageFamily();

    document.querySelectorAll('a[href]').forEach(function (link) {
      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (error) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      url.searchParams.set('anatomy', '1');
      link.href = url.href;
    });
    inspector.querySelector('.anatomy-exit').href = cleanUrl.href;

    function setValue(name, value) {
      var field = inspector.querySelector('[data-anatomy-value="' + name + '"]');
      if (field) field.textContent = value;
    }

    function inspect(element) {
      if (!element || element === activeTarget) return;
      if (activeTarget) activeTarget.classList.remove('anatomy-target');
      activeTarget = element;
      activeTarget.classList.add('anatomy-target');

      var role = roleById[element.dataset.anatomyRole] || {
        id: element.dataset.anatomyRole,
        name: element.dataset.anatomyName
      };
      var style = window.getComputedStyle(element);
      inspector.querySelector('.anatomy-region-name').textContent = regionFor(element);
      inspector.querySelector('.anatomy-role-id').textContent = role.id;
      inspector.querySelector('.anatomy-role-name').textContent = role.name;
      inspector.querySelector('.anatomy-badge').textContent = role.id + ' · ' + role.name;
      setValue('family', style.fontFamily.replace(/"/g, ''));
      setValue('size', style.fontSize + ' / ' + style.lineHeight);
      setValue('weight', style.fontWeight + ' / ' + style.fontStyle);
      setValue('spacing', style.letterSpacing);
      setValue('color', rgbToHex(style.color) + ' · ' + style.color);
      setValue('usage', roleGuidance[role.id] || 'A documented semantic text role.');
      window.requestAnimationFrame(positionBadge);
    }

    function positionBadge() {
      if (!activeTarget) return;
      var badge = inspector.querySelector('.anatomy-badge');
      var rect = activeTarget.getBoundingClientRect();
      var left = Math.max(8, Math.min(rect.left, window.innerWidth - badge.offsetWidth - 8));
      var top = Math.max(72, rect.top - badge.offsetHeight - 8);
      badge.style.left = left + 'px';
      badge.style.top = top + 'px';
    }

    function targetFromEvent(event) {
      if (!(event.target instanceof Element)) return null;
      return event.target.closest('[data-anatomy-role]');
    }

    document.addEventListener('pointerover', function (event) {
      inspect(targetFromEvent(event));
    });
    document.addEventListener('focusin', function (event) {
      inspect(targetFromEvent(event));
    });
    window.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() !== 'a' || event.metaKey || event.ctrlKey || event.altKey) return;
      if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
      root.classList.toggle('anatomy-hidden');
    });
    window.addEventListener('scroll', positionBadge, { passive: true });
    window.addEventListener('resize', positionBadge, { passive: true });

    root.classList.add('anatomy-mode');
    inspect(document.querySelector('main h1[data-anatomy-role]') || document.querySelector('[data-anatomy-role]'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavigation();
    initReadingProgress();
    initShareMenus();
    initAnatomy();
  });
})();
