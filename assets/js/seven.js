/* ============================================================
   SEVEN Medical Company — Comportamiento del sitio
   Vanilla JS, sin dependencias. Funciona con file:// y en servidor.
   ============================================================ */
(function () {
  'use strict';

  var doc = document;
  var html = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt); }

  /* 1. Año actual */
  function initYear() {
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* 2. Header: sombra al hacer scroll + progreso */
  function initHeader() {
    var header = $('.site-header');
    var util = $('.utility-bar');
    var bar = $('.scroll-progress');
    var toTop = $('.to-top');
    var toolbar = $('.catalog-toolbar');
    var last = -1;

    function frame() {
      var y = window.pageYOffset || html.scrollTop || 0;
      if (y === last) return;
      last = y;

      if (header) header.classList.toggle('is-stuck', y > 8);
      if (util) {
        var collapsed = y > 60;
        util.style.height = collapsed ? '0px' : '';
        util.style.opacity = collapsed ? '0' : '';
      }
      if (bar) {
        var max = (doc.body.scrollHeight - window.innerHeight) || 1;
        bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / max)) + ')';
      }
      if (toTop) toTop.classList.toggle('is-visible', y > 700);
      if (toolbar) toolbar.classList.toggle('is-stuck', y > 220);
    }

    var ticking = false;
    on(window, 'scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { frame(); ticking = false; });
    }, { passive: true });
    frame();

    on(toTop, 'click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* 3. Mega menú (escritorio) */
  function initMega() {
    var items = $$('.nav__item--has-mega');
    if (!items.length) return;
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    items.forEach(function (item) {
      var trigger = $('.nav__link', item);
      var timer;

      function open() { clearTimeout(timer); closeAll(item); item.classList.add('is-open'); if (trigger) trigger.setAttribute('aria-expanded', 'true'); }
      function close() { item.classList.remove('is-open'); if (trigger) trigger.setAttribute('aria-expanded', 'false'); }

      if (fine) {
        on(item, 'mouseenter', open);
        on(item, 'mouseleave', function () { timer = setTimeout(close, 140); });
      }
      on(trigger, 'click', function (e) {
        // El enlace sigue siendo navegable con teclado; en escritorio el clic abre el panel.
        if (fine && !item.classList.contains('is-open')) { e.preventDefault(); open(); }
      });
      on(item, 'focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close();
      });
    });

    function closeAll(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove('is-open');
        var t = $('.nav__link', it);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    on(doc, 'keydown', function (e) { if (e.key === 'Escape') closeAll(null); });
    on(doc, 'click', function (e) {
      if (!e.target.closest('.nav__item--has-mega')) closeAll(null);
    });
  }

  /* 4. Drawer móvil */
  function initDrawer() {
    var burger = $('.burger');
    var drawer = $('.drawer');
    if (!burger || !drawer) return;

    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      doc.body.classList.toggle('is-locked', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        var first = $('a, button', drawer);
        if (first) setTimeout(function () { first.focus(); }, 260);
      }
    }

    on(burger, 'click', function () {
      setOpen(!drawer.classList.contains('is-open'));
    });
    on(doc, 'keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) { setOpen(false); burger.focus(); }
    });
    $$('a', drawer).forEach(function (a) { on(a, 'click', function () { setOpen(false); }); });
    on(window, 'resize', function () {
      if (window.innerWidth > 960 && drawer.classList.contains('is-open')) setOpen(false);
    });
  }

  /* 5. Revelado al hacer scroll */
  function initReveal() {
    var els = $$('.reveal');
    // Escalonado automático dentro de contenedores marcados
    $$('[data-stagger]').forEach(function (box) {
      var step = parseInt(box.getAttribute('data-stagger'), 10) || 90;
      $$('.reveal', box).forEach(function (el, i) {
        if (!el.style.getPropertyValue('--delay')) el.style.setProperty('--delay', (i * step) + 'ms');
      });
    });

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      $$('.step').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) { io.observe(el); });
    $$('.step').forEach(function (el) { io.observe(el); });
  }

  /* 6. Contadores animados */
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var dur = 1300;
        var t0 = performance.now();
        var fmt = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;

        function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(fmt);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(fmt);
        }
        el.textContent = '0';
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* 7. Acordeón */
  function initAccordion() {
    $$('.acc-trigger').forEach(function (trigger) {
      var panel = doc.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;

      on(trigger, 'click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';
        // cerrar hermanos
        var group = trigger.closest('.accordion');
        if (group && !open) {
          $$('.acc-trigger[aria-expanded="true"]', group).forEach(function (other) {
            var op = doc.getElementById(other.getAttribute('aria-controls'));
            other.setAttribute('aria-expanded', 'false');
            var oitem = other.closest('.acc-item');
            if (oitem) oitem.classList.remove('is-open');
            if (op) { op.style.height = op.scrollHeight + 'px'; requestAnimationFrame(function () { op.style.height = '0px'; }); }
          });
        }
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        var item = trigger.closest('.acc-item');
        if (item) item.classList.toggle('is-open', !open);
        if (open) {
          panel.style.height = panel.scrollHeight + 'px';
          requestAnimationFrame(function () { panel.style.height = '0px'; });
        } else {
          panel.style.height = panel.scrollHeight + 'px';
        }
      });

      on(panel, 'transitionend', function (e) {
        if (e.propertyName !== 'height') return;
        if (trigger.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
      });
    });
  }

  /* 8. Reflector del bloque CTA */
  function initSpotlight() {
    if (reduce) return;
    $$('.cta-band').forEach(function (band) {
      on(band, 'pointermove', function (e) {
        var r = band.getBoundingClientRect();
        band.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        band.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* 9. Catálogo: filtros + búsqueda */
  function initCatalog() {
    var grid = $('#prodGrid');
    if (!grid) return;
    var products = window.SEVEN_PRODUCTS || [];
    var cats = window.SEVEN_CATS || [];
    var filtersBox = $('#prodFilters');
    var search = $('#prodSearch');
    var countEl = $('#prodCount');
    var empty = $('#prodEmpty');
    var current = 'todos';

    // Chips de categoría
    if (filtersBox) {
      filtersBox.innerHTML = cats.map(function (c) {
        var n = c.key === 'todos' ? products.length : products.filter(function (p) { return p.cat === c.key; }).length;
        return '<button type="button" class="chip" data-cat="' + c.key + '">' + c.label +
               '<span class="chip__count">' + n + '</span></button>';
      }).join('');
    }

    // Tarjetas
    grid.innerHTML = products.map(function (p) {
      return '' +
        '<a class="prod-card reveal" href="producto.html?id=' + p.id + '" data-cat="' + p.cat + '" ' +
        'data-search="' + (p.name + ' ' + p.catLabel + ' ' + p.short + ' ' + p.apps.join(' ') + ' ' + p.platform).toLowerCase().replace(/"/g, '') + '">' +
          '<div class="prod-card__thumb">' +
            '<span class="prod-card__tag">' + p.catLabel + '</span>' +
            (p.badge ? '<span class="prod-card__new">' + p.badge + '</span>' : '') +
            '<img src="' + p.img + '" alt="Ultrasonido Mindray ' + p.name + ' — SEVEN Medical Company" loading="lazy" decoding="async">' +
          '</div>' +
          '<div class="prod-card__body">' +
            '<h3 class="h-md prod-card__name">' + p.name + '</h3>' +
            '<p class="prod-card__desc">' + p.short + '</p>' +
            '<div class="prod-card__foot">' +
              '<span class="prod-card__spec">' + p.platform + '</span>' +
              '<span class="arrow-link">Ver equipo' +
                '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '</span>' +
            '</div>' +
          '</div>' +
        '</a>';
    }).join('');

    var cards = $$('.prod-card', grid);

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var okCat = current === 'todos' || card.getAttribute('data-cat') === current;
        var okQ = !q || card.getAttribute('data-search').indexOf(q) > -1;
        var show = okCat && okQ;
        card.classList.toggle('is-hidden', !show);
        if (show) shown++;
      });
      if (countEl) {
        countEl.innerHTML = '<b>' + shown + '</b> ' + (shown === 1 ? 'equipo' : 'equipos') +
          (current === 'todos' ? ' en el portafolio' : ' en esta categoría') + (q ? ' para “' + q + '”' : '');
      }
      if (empty) empty.style.display = shown ? 'none' : 'block';
      $$('.chip', filtersBox).forEach(function (chip) {
        chip.classList.toggle('is-active', chip.getAttribute('data-cat') === current);
      });
    }

    on(filtersBox, 'click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      current = chip.getAttribute('data-cat');
      if (history.replaceState) {
        history.replaceState(null, '', current === 'todos' ? location.pathname : location.pathname + '#' + current);
      }
      apply();
    });

    on(search, 'input', apply);

    // Categoría inicial desde el hash (#portatil, etc.)
    var hash = (location.hash || '').replace('#', '');
    if (hash && cats.some(function (c) { return c.key === hash; })) current = hash;

    apply();
    initReveal();
  }

  /* 10. Detalle de producto */
  function initProduct() {
    var root = $('#pdRoot');
    if (!root) return;
    var products = window.SEVEN_PRODUCTS || [];
    var params = new URLSearchParams(location.search);
    var id = params.get('id');
    var p = products.filter(function (x) { return x.id === id; })[0];

    if (!p) {
      root.innerHTML = '' +
        '<section class="section"><div class="container container--narrow" style="text-align:center">' +
          '<span class="eyebrow">Equipo no encontrado</span>' +
          '<h1 class="h-xl" style="margin-bottom:16px">No encontramos ese equipo</h1>' +
          '<p class="lead" style="margin-bottom:30px">El enlace puede estar incompleto o el equipo ya no figura en el catálogo. Puede revisar el portafolio completo de Mindray disponible en Panamá.</p>' +
          '<a class="btn btn--primary" href="productos.html">Ver el catálogo completo' +
            '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</a>' +
        '</div></section>';
      doc.title = 'Equipo no encontrado | SEVEN Medical Company';
      return;
    }

    doc.title = p.name + ' — Ultrasonido Mindray en Panamá | SEVEN Medical Company';
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', p.name + ': ' + p.short + ' Disponible con SEVEN Medical Company, distribuidor exclusivo de Mindray en Panamá.');

    var arrow = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h11m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var related = products.filter(function (x) { return x.id !== p.id && x.cat === p.cat; });
    if (related.length < 3) {
      products.forEach(function (x) {
        if (related.length < 3 && x.id !== p.id && related.indexOf(x) === -1) related.push(x);
      });
    }
    related = related.slice(0, 3);

    root.innerHTML = '' +
      /* Encabezado */
      '<section class="section--tight" style="background:var(--bg-alt);padding-top:26px;padding-bottom:0">' +
        '<div class="container">' +
          '<nav class="crumbs crumbs--light" aria-label="Ruta de navegación">' +
            '<a href="index.html">Inicio</a><span>/</span>' +
            '<a href="productos.html">Equipos</a><span>/</span>' +
            '<a href="productos.html#' + p.cat + '">' + p.catLabel + '</a><span>/</span>' +
            '<b>' + p.name + '</b>' +
          '</nav>' +
        '</div>' +
      '</section>' +

      '<section class="pd-hero" style="background:var(--bg-alt)">' +
        '<div class="container">' +
          '<div class="pd-grid">' +
            '<div class="reveal reveal--left">' +
              '<figure class="pd-figure">' +
                '<img src="' + p.gallery[0] + '" alt="Ultrasonido Mindray ' + p.name + '" width="900" height="900">' +
              '</figure>' +
              (p.gallery.length > 1 ?
                '<figure class="pd-figure" style="margin-top:18px">' +
                  '<img src="' + p.gallery[1] + '" alt="' + p.name + ' — características destacadas" loading="lazy" width="900" height="900">' +
                '</figure>' : '') +
            '</div>' +

            '<div class="reveal reveal--right">' +
              '<div class="pd-badges">' +
                '<span class="badge">' + p.catLabel + '</span>' +
                '<span class="badge badge--gray">' + p.platform + '</span>' +
                (p.badge ? '<span class="badge badge--solid">' + p.badge + '</span>' : '') +
              '</div>' +
              '<h1 class="h-xl" style="margin-bottom:14px">' + p.name + '</h1>' +
              '<p class="lead" style="margin-bottom:26px">' + p.tagline + '</p>' +
              p.desc.map(function (d) { return '<p class="body">' + d + '</p>'; }).join('') +
              '<div class="pd-actions">' +
                '<a class="btn btn--primary" href="contacto.html?producto=' + encodeURIComponent(p.name) + '">Solicitar cotización' + arrow + '</a>' +
                '<a class="btn btn--outline" href="productos.html">Ver otros equipos</a>' +
              '</div>' +
              '<div class="pd-trust">' +
                '<div><span>Equipo <b>original de fábrica</b>, con documentación de origen y garantía oficial Mindray.</span></div>' +
                '<div><span>Compra directa al canal exclusivo de Mindray en Panamá, sin intermediarios.</span></div>' +
                '<div><span>Asesoría previa para validar que la configuración corresponda a su necesidad clínica.</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* Especificaciones */
      '<section class="section">' +
        '<div class="container">' +
          '<div class="split split--top">' +
            '<div class="reveal">' +
                            '<span class="eyebrow">Ficha técnica</span>' +
              '<h2 class="h-lg" style="margin-bottom:18px">Características del ' + p.name + '</h2>' +
              '<p class="body">Datos tomados de la ficha oficial del equipo. Si necesita el detalle completo de configuraciones, transductores disponibles o compatibilidad con su infraestructura, nuestro equipo se lo envía por escrito.</p>' +
              '<div style="margin-top:26px"><a class="arrow-link" href="contacto.html?producto=' + encodeURIComponent(p.name) + '">Pedir ficha técnica completa' + arrow + '</a></div>' +
            '</div>' +
            '<div class="reveal reveal--right">' +
              '<ul class="spec-list">' +
                p.specs.map(function (s) { return '<li><span>' + s + '</span></li>'; }).join('') +
              '</ul>' +
            '</div>' +
          '</div>' +

          '<div class="grid grid-2" style="margin-top:64px" data-stagger="110">' +
            '<div class="card card--flat reveal">' +
              '<span class="card__num">01</span>' +
              '<h3 class="h-md card__title">Aplicaciones clínicas</h3>' +
              '<ul class="stack-sm" style="margin-top:16px">' +
                p.apps.map(function (a) { return '<li class="body" style="display:flex;gap:11px;align-items:flex-start">' + a + '</li>'; }).join('') +
              '</ul>' +
            '</div>' +
            '<div class="card card--flat reveal">' +
              '<span class="card__num">02</span>' +
              '<h3 class="h-md card__title">Entorno recomendado</h3>' +
              '<p class="body" style="margin-top:14px">' + p.setting + '</p>' +
              '<p class="body">Podemos evaluar con usted el espacio disponible, el flujo de pacientes y el personal a cargo para confirmar que esta es la configuración adecuada antes de emitir la propuesta.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* Relacionados */
      '<section class="section section--alt">' +
        '<div class="container">' +
          '<div class="section-head">' +
                        '<span class="eyebrow">También disponible</span>' +
            '<h2 class="h-lg">Otros equipos del portafolio</h2>' +
          '</div>' +
          '<div class="related" data-stagger="110">' +
            related.map(function (r) {
              return '<a class="prod-card reveal" href="producto.html?id=' + r.id + '">' +
                '<div class="prod-card__thumb"><span class="prod-card__tag">' + r.catLabel + '</span>' +
                  '<img src="' + r.img + '" alt="Ultrasonido Mindray ' + r.name + '" loading="lazy"></div>' +
                '<div class="prod-card__body">' +
                  '<h3 class="h-md prod-card__name">' + r.name + '</h3>' +
                  '<p class="prod-card__desc">' + r.short + '</p>' +
                  '<div class="prod-card__foot"><span class="prod-card__spec">' + r.platform + '</span>' +
                  '<span class="arrow-link">Ver equipo' + arrow + '</span></div>' +
                '</div></a>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>';

    initReveal();
  }

  /* 11. Formulario de contacto */
  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    var status = $('#formStatus');
    var info = window.SEVEN_INFO || {};

    // Prellenar el interés si viene desde una ficha de producto
    var params = new URLSearchParams(location.search);
    var prod = params.get('producto');
    if (prod) {
      var interes = $('#interes', form);
      var mensaje = $('#mensaje', form);
      if (interes) {
        var match = Array.prototype.filter.call(interes.options, function (o) { return o.value === prod; })[0];
        if (match) interes.value = prod;
      }
      if (mensaje && !mensaje.value) {
        mensaje.value = 'Buenos días, me interesa recibir información y cotización del equipo ' + prod + '.';
      }
      var note = $('#formPrefill');
      if (note) {
        note.textContent = 'Consulta sobre: ' + prod;
        note.style.display = 'inline-flex';
      }
    }

    function fieldOf(input) { return input.closest('.field'); }

    function validate() {
      var ok = true;
      $$('[data-required]', form).forEach(function (input) {
        var field = fieldOf(input);
        var val = (input.value || '').trim();
        var bad = !val;
        if (!bad && input.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
        if (field) field.classList.toggle('has-error', bad);
        if (bad && ok) { input.focus(); }
        if (bad) ok = false;
      });
      return ok;
    }

    $$('[data-required]', form).forEach(function (input) {
      on(input, 'input', function () {
        var field = fieldOf(input);
        if (field && field.classList.contains('has-error') && (input.value || '').trim()) field.classList.remove('has-error');
      });
    });

    on(form, 'submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        if (status) { status.classList.remove('is-visible'); }
        return;
      }

      var get = function (id) { var el = $('#' + id, form); return el ? (el.value || '').trim() : ''; };
      var nombre = get('nombre');
      var asunto = 'Solicitud de información — ' + (get('interes') || 'Equipos Mindray') + ' — ' + (get('institucion') || nombre);
      var cuerpo = [
        'Nombre: ' + nombre,
        'Institución: ' + get('institucion'),
        'Cargo: ' + get('cargo'),
        'Correo: ' + get('email'),
        'Teléfono: ' + get('telefono'),
        'Equipo de interés: ' + get('interes'),
        '',
        'Mensaje:',
        get('mensaje'),
        '',
        '— Enviado desde sevenmedical.com.pa'
      ].join('\n');

      var href = 'mailto:' + (info.email || '') +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);

      if (status) {
        status.innerHTML = 'Abrimos su gestor de correo con la solicitud lista para enviar a <b>' + (info.email || '') + '</b>. ' +
          'Si no se abre automáticamente, escríbanos a ese correo o llámenos al <b>' + (info.telefono || '') + '</b>.';
        status.classList.add('is-visible');
      }
      window.location.href = href;
    });
  }

  /* 12. Transición entre páginas */
  function initPageTransition() {
    if (reduce) return;
    var veil = doc.createElement('div');
    veil.className = 'page-veil';
    doc.body.appendChild(veil);

    on(doc, 'click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || a.target === '_blank' || a.hasAttribute('download')) return;
      if (/^(mailto:|tel:|javascript:|https?:)/i.test(href)) return;

      e.preventDefault();
      veil.classList.add('is-active');
      setTimeout(function () { window.location.href = a.href; }, 220);
      // Red de seguridad: si la navegación no ocurre, quitamos el velo.
      setTimeout(function () { veil.classList.remove('is-active'); }, 2500);
    });

    on(window, 'pageshow', function () { veil.classList.remove('is-active'); });
  }

  /* 13. Arranque */
  function boot() {
    window.__sevenReady = true;
    initYear();
    initHeader();
    initMega();
    initDrawer();
    initCatalog();
    initProduct();
    initForm();
    initReveal();
    initCounters();
    initAccordion();
    initSpotlight();
    initPageTransition();
  }

  if (doc.readyState === 'loading') on(doc, 'DOMContentLoaded', boot);
  else boot();
})();
