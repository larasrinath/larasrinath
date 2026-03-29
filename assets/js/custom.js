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

    // Close menu when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!btn.classList.contains('open')) return;
      if (btn.contains(e.target) || links.contains(e.target)) return;
      btn.classList.remove('open');
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  // ---- Supply Chain Flowing Background (Resume page) ----
  function initSupplyChainChart() {
    if (prefersReduced) return;

    var resumePage = document.querySelector('.resume-page');
    if (!resumePage) return;

    var container = resumePage.parentElement;
    var canvas = document.createElement('canvas');
    canvas.className = 'supply-chain-canvas';
    container.insertBefore(canvas, resumePage);

    var ctx = canvas.getContext('2d');
    var mouse = { x: -9999, y: -9999 };
    var dpr = window.devicePixelRatio || 1;
    var time = 0;

    // Supply and Demand wave configs
    var supplyWave = { name: 'Supply', freq: 0.009, amp: 45, speed: 0.018, phase: 1.2 };
    var demandWave = { name: 'Demand', freq: 0.007, amp: 40, speed: 0.015, phase: 2.5 };
    // Number of vertical bar slices across the screen
    var barSlices = 52;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function waveVal(wave, x, t) {
      return Math.sin(x * wave.freq + t * wave.speed + wave.phase) * wave.amp
           + Math.sin(x * wave.freq * 1.8 + t * wave.speed * 1.3 + wave.phase * 0.7) * wave.amp * 0.4
           + Math.sin(x * wave.freq * 0.5 + t * wave.speed * 0.6) * wave.amp * 0.2;
    }

    function applyMouse(x, y) {
      if (mouse.x > 0 && mouse.y > 0) {
        var distX = Math.abs(x - mouse.x);
        if (distX < 250) {
          var pull = (1 - distX / 250) * 0.5;
          y += (mouse.y - y) * pull;
        }
      }
      return y;
    }

    function animate() {
      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var axisY = h - 40; // x-axis position above footer
      var barW = w / barSlices;
      var maxBarH = axisY - 20; // max bar height (leave room at top)

      // Colors
      var supplyFill = isDark ? 'rgba(80, 200, 120, 0.1)' : 'rgba(60, 179, 113, 0.05)';
      var supplyStroke = isDark ? 'rgba(80, 200, 120, 0.1)' : 'rgba(60, 179, 113, 0.05)';
      var demandFill = isDark ? 'rgba(226, 32, 39, 0.1)' : 'rgba(226, 32, 39, 0.05)';
      var demandStroke = isDark ? 'rgba(226, 32, 39, 0.1)' : 'rgba(226, 32, 39, 0.05)';
      var closingStroke = isDark ? 'rgba(230, 237, 243, 0.1)' : 'rgba(0, 0, 0, 0.05)';
      var axisColor = isDark ? 'rgba(230,237,243,0.05)' : 'rgba(0,0,0,0.05)';
      var tickColor = isDark ? 'rgba(230,237,243,0.7)' : 'rgba(0,0,0,0.7)';
      // Label colors at 70%
      var supplyLabel = isDark ? 'rgba(80, 200, 120, 0.7)' : 'rgba(60, 179, 113, 0.7)';
      var demandLabel = isDark ? 'rgba(226, 32, 39, 0.7)' : 'rgba(226, 32, 39, 0.7)';
      var closingLabel = isDark ? 'rgba(230, 237, 243, 0.7)' : 'rgba(0, 0, 0, 0.7)';
      var labelColor = isDark ? 'rgba(230,237,243,0.7)' : 'rgba(0,0,0,0.7)';

      // X-axis line
      ctx.beginPath();
      ctx.moveTo(0, axisY);
      ctx.lineTo(w, axisY);
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // X-axis tick labels (periods)
      var tickLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var tickSpacing = w / tickLabels.length;
      ctx.font = '9px Commissioner, sans-serif';
      ctx.fillStyle = tickColor;
      ctx.textAlign = 'center';
      for (var t = 0; t < tickLabels.length; t++) {
        var tx = t * tickSpacing + tickSpacing / 2;
        // Tick mark
        ctx.beginPath();
        ctx.moveTo(tx, axisY);
        ctx.lineTo(tx, axisY + 4);
        ctx.strokeStyle = axisColor;
        ctx.stroke();
        // Label
        ctx.fillText(tickLabels[t], tx, axisY + 16);
      }

      // Draw stacked bars growing upward from x-axis
      var closingPoints = [];

      for (var i = 0; i < barSlices; i++) {
        var cx = i * barW + barW / 2;

        // Fixed bar heights
        var sVal = 0.3 + Math.sin(i * 0.4 + 1.2) * 0.15 + Math.sin(i * 0.15) * 0.1;
        var dVal = 0.25 + Math.sin(i * 0.35 + 2.5) * 0.12 + Math.sin(i * 0.2 + 1) * 0.1;
        sVal = Math.max(0.05, Math.min(0.6, sVal));
        dVal = Math.max(0.05, Math.min(0.6, dVal));

        // Mouse proximity scales bars
        var scale = 1;
        if (mouse.x > 0 && mouse.y > 0) {
          var distX = Math.abs(cx - mouse.x);
          if (distX < 200) {
            scale = 1 + (1 - distX / 200) * 0.5;
          }
        }

        var demandH = dVal * maxBarH * scale;
        var supplyH = sVal * maxBarH * scale;

        // Demand bar (bottom, from x-axis up)
        ctx.fillStyle = demandFill;
        ctx.strokeStyle = demandStroke;
        ctx.lineWidth = 1;
        ctx.fillRect(i * barW + 1, axisY - demandH, barW - 2, demandH);
        ctx.strokeRect(i * barW + 1, axisY - demandH, barW - 2, demandH);

        // Supply bar (stacked on top of demand)
        ctx.fillStyle = supplyFill;
        ctx.strokeStyle = supplyStroke;
        ctx.fillRect(i * barW + 1, axisY - demandH - supplyH, barW - 2, supplyH);
        ctx.strokeRect(i * barW + 1, axisY - demandH - supplyH, barW - 2, supplyH);

        // Closing = total stack height (supply + demand)
        var closingY = axisY - demandH - supplyH;
        closingPoints.push({ x: cx, y: closingY });
      }

      // Closing stock line (traces top of stacked bars)
      ctx.beginPath();
      ctx.strokeStyle = closingStroke;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      for (var i = 0; i < closingPoints.length; i++) {
        if (i === 0) ctx.moveTo(closingPoints[i].x, closingPoints[i].y);
        else ctx.lineTo(closingPoints[i].x, closingPoints[i].y);
      }
      ctx.stroke();

      // Closing dots
      for (var i = 0; i < closingPoints.length; i += 4) {
        ctx.beginPath();
        ctx.arc(closingPoints[i].x, closingPoints[i].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = closingStroke;
        ctx.fill();
      }

      // Right-side labels for bars — track last bar's top, affected by mouse
      ctx.font = '10px Commissioner, sans-serif';
      ctx.textAlign = 'right';

      var lastIdx = barSlices - 1;
      var lastCx = lastIdx * barW + barW / 2;
      var lastScale = 1;
      if (mouse.x > 0 && mouse.y > 0) {
        var lastDistX = Math.abs(lastCx - mouse.x);
        if (lastDistX < 200) {
          lastScale = 1 + (1 - lastDistX / 200) * 0.5;
        }
      }
      var lastSVal = Math.max(0.05, Math.min(0.6, 0.3 + Math.sin(lastIdx * 0.4 + 1.2) * 0.15 + Math.sin(lastIdx * 0.15) * 0.1));
      var lastDVal = Math.max(0.05, Math.min(0.6, 0.25 + Math.sin(lastIdx * 0.35 + 2.5) * 0.12 + Math.sin(lastIdx * 0.2 + 1) * 0.1));
      var lastDemandH = lastDVal * maxBarH * lastScale;
      var lastSupplyH = lastSVal * maxBarH * lastScale;

      ctx.fillStyle = demandLabel;
      ctx.fillText('Demand', w - 8, axisY - lastDemandH - 4);
      ctx.fillStyle = supplyLabel;
      ctx.fillText('Supply', w - 8, axisY - lastDemandH - lastSupplyH - 4);
      ctx.textAlign = 'left';
      ctx.fillStyle = closingLabel;
      ctx.fillText('Closing', 8, closingPoints[0].y - 6);

      // Flowing line charts — safety stock & reorder point
      var lines = [
        { name: 'Safety Stock', freq: 0.004, amp: 20, yOff: 0.55, phase: 0.8,
          light: 'rgba(180, 140, 60, 0.1)', dark: 'rgba(220, 180, 80, 0.1)',
          labelLight: 'rgba(180, 140, 60, 0.7)', labelDark: 'rgba(220, 180, 80, 0.7)' },
        { name: 'Reorder Point', freq: 0.006, amp: 25, yOff: 0.35, phase: 2.1,
          light: 'rgba(100, 100, 200, 0.1)', dark: 'rgba(140, 140, 230, 0.1)',
          labelLight: 'rgba(100, 100, 200, 0.7)', labelDark: 'rgba(140, 140, 230, 0.7)' }
      ];

      for (var li = 0; li < lines.length; li++) {
        var line = lines[li];
        var baseY2 = h * line.yOff;
        var strokeColor = isDark ? line.dark : line.light;

        ctx.beginPath();
        for (var x = 0; x < w; x += 2) {
          var y = baseY2
            + Math.sin(x * line.freq + line.phase) * line.amp
            + Math.sin(x * line.freq * 2.2 + line.phase * 0.6) * line.amp * 0.3;

          // Mouse warp
          if (mouse.x > 0 && mouse.y > 0) {
            var distX = Math.abs(x - mouse.x);
            if (distX < 250) {
              var pull = (1 - distX / 250) * 0.4;
              y += (mouse.y - y) * pull;
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Left-side label — tracks the line at x=50, warps with mouse
        var labelX2 = 50;
        var labelY2 = baseY2
          + Math.sin(labelX2 * line.freq + line.phase) * line.amp
          + Math.sin(labelX2 * line.freq * 2.2 + line.phase * 0.6) * line.amp * 0.3;
        if (mouse.x > 0 && mouse.y > 0) {
          var distX2 = Math.abs(labelX2 - mouse.x);
          if (distX2 < 250) {
            var pull2 = (1 - distX2 / 250) * 0.4;
            labelY2 += (mouse.y - labelY2) * pull2;
          }
        }
        ctx.font = '10px Commissioner, sans-serif';
        ctx.fillStyle = isDark ? line.labelDark : line.labelLight;
        ctx.textAlign = 'left';
        ctx.fillText(line.name, 8, labelY2 - 6);
      }


      requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    }, { passive: true });

    document.addEventListener('touchend', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    }, { passive: true });

    window.addEventListener('resize', resize);
    resize();
    animate();
  }


  // ---- Interactive Data Network (Resume page) ----
  function initDataNetwork() {
    if (prefersReduced) return;
    if (window.innerWidth < 768) return;

    var resumePage = document.querySelector('.resume-page');
    if (!resumePage) return;

    var container = resumePage.parentElement;
    var canvas = document.createElement('canvas');
    canvas.className = 'data-network-canvas';
    container.insertBefore(canvas, resumePage);

    var ctx = canvas.getContext('2d');
    var nodes = [];
    var mouse = { x: -9999, y: -9999 };
    var labels = [
      'Anaplan', 'ALM', 'Data Hub', 'CloudWorks', 'NUX', 'Optimizer',
      'Pigment', 'DRP', 'MRP', 'MPS', 'S&OP', 'MEIO',
      'R', 'Python', 'AMPL', 'DISCO', 'EDA', 'ETL',
      'Master Anaplanner', 'Solution Architect', 'Pre-Sales Certified',
      'Model Builder', 'The Anaplan Way', 'Pigment Modeler', 'R Programming'
    ];
    var nodeCount = labels.length;
    var connectDist = 180;
    var mouseDist = 200;
    var dpr = window.devicePixelRatio || 1;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    }

    function createNodes() {
      nodes = [];
      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;

      for (var i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 3 + 2,
          label: labels[i]
        });
      }
    }

    function animate() {
      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var nodeColor = isDark ? 'rgba(226, 32, 39, 0.7)' : 'rgba(226, 32, 39, 0.5)';
      var lineColor = isDark ? 'rgba(226, 32, 39, 0.18)' : 'rgba(226, 32, 39, 0.12)';
      var mouseLineColor = isDark ? 'rgba(226, 32, 39, 0.45)' : 'rgba(226, 32, 39, 0.3)';
      var labelColor = isDark ? 'rgba(230, 237, 243, 0.45)' : 'rgba(0, 0, 0, 0.25)';

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var dx = mouse.x - n.x;
        var dy = mouse.y - n.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          var force = (mouseDist - dist) / mouseDist * 0.8;
          n.vx -= (dx / dist) * force;
          n.vy -= (dy / dist) * force;
        }

        n.vx *= 0.98;
        n.vy *= 0.98;
        n.vx += (Math.random() - 0.5) * 0.02;
        n.vy += (Math.random() - 0.5) * 0.02;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx *= -0.5; }
        if (n.x > w) { n.x = w; n.vx *= -0.5; }
        if (n.y < 0) { n.y = 0; n.vy *= -0.5; }
        if (n.y > h) { n.y = h; n.vy *= -0.5; }
      }

      // Node connections
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - dist / connectDist;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Mouse connections
      if (mouse.x > 0 && mouse.y > 0) {
        for (var i = 0; i < nodes.length; i++) {
          var dx = mouse.x - nodes[i].x;
          var dy = mouse.y - nodes[i].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDist) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.strokeStyle = mouseLineColor;
            ctx.globalAlpha = 1 - dist / mouseDist;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Nodes
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        ctx.font = '11px Commissioner, sans-serif';
        ctx.fillStyle = labelColor;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - n.r - 5);
      }

      requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener('resize', resize);
    resize();
    animate();
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
    initSupplyChainChart();
    initDataNetwork();
  });
})();
