/* ============================================================
   SEVEN Medical Company — Inicio
   Portada en carrusel, carruseles con arrastre, paralaje y
   accesos rápidos. Vanilla JS, sin dependencias.
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt); }

  /* 1. Portada: carrusel con autoplay, progreso, gestos y teclado */
  function initHero() {
    var shell = $('[data-hero]');
    if (!shell) return;
    var track = $('[data-hero-track]', shell);
    var slides = $$('.hx__slide', shell);
    var tabs = $$('.hx__tab', shell);
    var n = slides.length;
    if (!n) return;

    var DURATION = 6000;
    var current = 0;
    var elapsed = 0;
    var last = 0;
    var paused = false;
    var hidden = false;
    var raf = 0;

    function setInert(el, value) {
      if ('inert' in el) el.inert = value;
      el.setAttribute('aria-hidden', value ? 'true' : 'false');
    }

    slides.forEach(function (s, i) { if (i !== current) setInert(s, true); });

    function go(to, dir) {
      to = (to + n) % n;
      if (to === current) return;
      dir = dir || (to > current ? 1 : -1);
      shell.style.setProperty('--dir', dir);

      var from = slides[current];
      from.classList.remove('is-active');
      from.classList.add('is-leaving');
      setInert(from, true);
      setTimeout(function () { from.classList.remove('is-leaving'); }, 700);

      tabs.forEach(function (t, i) {
        var active = i === to;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.tabIndex = active ? 0 : -1;
        t.style.setProperty('--p', 0);
      });

      current = to;
      var next = slides[current];
      setInert(next, false);
      // Un fotograma para que la salida arranque antes que la entrada
      requestAnimationFrame(function () { next.classList.add('is-active'); });
      elapsed = 0;
    }

    function tick(now) {
      if (!last) last = now;
      var dt = now - last;
      last = now;
      if (!paused && !hidden) {
        elapsed += dt;
        var p = Math.min(1, elapsed / DURATION);
        if (tabs[current]) tabs[current].style.setProperty('--p', p.toFixed(4));
        if (elapsed >= DURATION) go(current + 1, 1);
      }
      raf = requestAnimationFrame(tick);
    }

    // Controles
    on($('[data-hero-prev]', shell), 'click', function () { go(current - 1, -1); });
    on($('[data-hero-next]', shell), 'click', function () { go(current + 1, 1); });
    tabs.forEach(function (t, i) {
      on(t, 'click', function () { go(i); });
      on(t, 'keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowLeft') {
          e.preventDefault();
          var to = (i + (k === 'ArrowRight' ? 1 : -1) + n) % n;
          go(to, k === 'ArrowRight' ? 1 : -1);
          tabs[to].focus();
        }
      });
    });

    // Cambia sola siempre; solo se detiene mientras la pestaña está oculta
    on(doc, 'visibilitychange', function () { hidden = doc.hidden; last = 0; });

    // Deslizar con el dedo o el mouse
    var sx = 0, sy = 0, dragging = false;
    on(track, 'pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a, button')) return;
      dragging = true; sx = e.clientX; sy = e.clientY;
    });
    on(window, 'pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) go(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });

    // Profundidad con el cursor: el equipo y la palabra se mueven en sentidos opuestos
    if (fine && !reduce) {
      var tx = 0, ty = 0, cx = 0, cy = 0, moving = false;
      on(shell, 'pointermove', function (e) {
        var r = shell.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (!moving) { moving = true; requestAnimationFrame(follow); }
      });
      on(shell, 'pointerleave', function () { tx = 0; ty = 0; if (!moving) { moving = true; requestAnimationFrame(follow); } });
      var follow = function () {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        $$('.hx__float', shell).forEach(function (el) { el.style.translate = (cx * 16).toFixed(2) + 'px ' + (cy * 10).toFixed(2) + 'px'; });
        $$('.hx__word', shell).forEach(function (el) { el.style.translate = (cx * -28).toFixed(2) + 'px ' + (cy * -14).toFixed(2) + 'px'; });
        if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) requestAnimationFrame(follow);
        else moving = false;
      };
    }

    raf = requestAnimationFrame(tick);
  }

  /* 2. Carruseles: desplazamiento nativo con imán, flechas, puntos, arrastre y autoplay opcional */
  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      var vp = $('[data-cx-track]', root);
      var prev = $('[data-cx-prev]', root);
      var next = $('[data-cx-next]', root);
      var dotsBox = $('[data-cx-dots]', root);
      if (!vp) return;
      var items = Array.prototype.slice.call(vp.children);
      var dots = [];
      var pages = 1;

      function step() {
        if (items.length < 2) return vp.clientWidth;
        return items[1].offsetLeft - items[0].offsetLeft;
      }
      function perView() { return Math.max(1, Math.round(vp.clientWidth / step())); }
      function maxScroll() { return vp.scrollWidth - vp.clientWidth; }

      function build() {
        var per = perView();
        pages = Math.max(1, Math.ceil((items.length - per) / per) + 1);
        if (maxScroll() <= 2) pages = 1;
        dotsBox.innerHTML = '';
        dots = [];
        if (pages < 2) { update(); return; }
        for (var i = 0; i < pages; i++) {
          var b = doc.createElement('button');
          b.type = 'button';
          b.className = 'cx__dot';
          b.setAttribute('aria-label', 'Ir al grupo ' + (i + 1) + ' de ' + pages);
          (function (idx) { on(b, 'click', function () { goPage(idx); restart(); }); })(i);
          dotsBox.appendChild(b);
          dots.push(b);
        }
        update();
      }

      function pageIndex() {
        var max = maxScroll();
        if (max <= 0) return 0;
        if (vp.scrollLeft >= max - 4) return pages - 1;
        return Math.min(pages - 1, Math.round(vp.scrollLeft / (step() * perView())));
      }

      function goPage(i) {
        var left = Math.min(maxScroll(), i * step() * perView());
        vp.scrollTo({ left: left, behavior: reduce ? 'auto' : 'smooth' });
      }

      function update() {
        var idx = pageIndex();
        dots.forEach(function (d, i) {
          d.classList.toggle('is-active', i === idx);
          d.setAttribute('aria-current', i === idx ? 'true' : 'false');
        });
        if (prev) prev.disabled = vp.scrollLeft <= 4 && !root.hasAttribute('data-autoplay');
        if (next) next.disabled = vp.scrollLeft >= maxScroll() - 4 && !root.hasAttribute('data-autoplay');
      }

      function move(dir) {
        var idx = pageIndex();
        var to = idx + dir;
        if (to > pages - 1) to = 0;          // vuelve al inicio
        if (to < 0) to = pages - 1;          // va al final
        goPage(to);
      }

      on(prev, 'click', function () { move(-1); restart(); });
      on(next, 'click', function () { move(1); restart(); });

      var ticking = false;
      on(vp, 'scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });

      on(vp, 'keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); move(1); restart(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); restart(); }
      });

      // Arrastre con mouse (en táctil el desplazamiento es nativo)
      var down = false, moved = false, startX = 0, startLeft = 0;
      on(vp, 'pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = vp.scrollLeft;
      });
      on(window, 'pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; vp.classList.add('is-dragging'); }
        if (moved) vp.scrollLeft = startLeft - dx;
      });
      on(window, 'pointerup', function () {
        if (!down) return;
        down = false;
        if (moved) {
          vp.classList.remove('is-dragging');
          // Ajuste al grupo más cercano
          var s = step();
          vp.scrollTo({ left: Math.round(vp.scrollLeft / s) * s, behavior: 'smooth' });
          restart();
        }
      });
      // Un arrastre no debe abrir la tarjeta
      on(vp, 'click', function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);

      // Autoplay opcional
      var delay = parseInt(root.getAttribute('data-autoplay'), 10) || 0;
      var timer = 0, hover = false, visible = false;
      function restart() {
        clearInterval(timer);
        if (!delay || reduce || pages < 2) return;
        timer = setInterval(function () { if (!hover && visible && !doc.hidden) move(1); }, delay);
      }
      on(root, 'mouseenter', function () { hover = true; });
      on(root, 'mouseleave', function () { hover = false; });
      on(root, 'focusin', function () { hover = true; });
      on(root, 'focusout', function (e) { if (!root.contains(e.relatedTarget)) hover = false; });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.3 }).observe(root);
      } else { visible = true; }

      var rt;
      on(window, 'resize', function () { clearTimeout(rt); rt = setTimeout(function () { build(); restart(); }, 150); });
      build();
      restart();
    });
  }

  /* 3. Paralaje suave de fondos decorativos */
  function initParallax() {
    if (reduce) return;
    var els = $$('[data-parallax]');
    if (!els.length) return;
    var vh = window.innerHeight;
    var ticking = false;

    function frame() {
      ticking = false;
      els.forEach(function (el) {
        var host = el.closest('section') || el.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        var center = r.top + r.height / 2 - vh / 2;
        el.style.translate = '0 ' + (center * speed * -1).toFixed(1) + 'px';
      });
    }
    on(window, 'scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    on(window, 'resize', function () { vh = window.innerHeight; frame(); });
    frame();
  }

  /* 4. Accesos rápidos: aparecen al dejar atrás la portada */
  function initFab() {
    var fab = $('.fab');
    var hero = $('.hx');
    if (!fab || !hero) return;
    var ticking = false;
    function frame() {
      ticking = false;
      var r = hero.getBoundingClientRect();
      var footer = $('.site-footer');
      var nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight * 0.75;
      fab.classList.toggle('is-visible', r.bottom < window.innerHeight * 0.35 && !nearFooter);
    }
    on(window, 'scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    frame();
  }

  function boot() {
    initHero();
    initCarousels();
    initParallax();
    initFab();
  }

  if (doc.readyState === 'loading') on(doc, 'DOMContentLoaded', boot);
  else boot();
})();
