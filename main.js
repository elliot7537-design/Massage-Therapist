/* ═══════════════════════════════════════════
   SERENIDAD — main.js  (v3)
   ═══════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────
   State
──────────────────────────────────────────── */
var currentLang = 'es';

/* ────────────────────────────────────────────
   Translations — reads data-es / data-en
   attributes written directly in the HTML,
   so no JS dictionary and no auto-translate
   interference.
──────────────────────────────────────────── */
function applyTranslations(lang) {
  document.querySelectorAll('[data-es][data-en]').forEach(function(el) {
    if (el.id === 'langToggle') return;
    var raw = el.getAttribute('data-' + lang);
    if (!raw) return;
    el.innerHTML = raw
      .replace(/&lt;/g,  '<')
      .replace(/&gt;/g,  '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"');
  });
  document.querySelectorAll('[data-ph-es][data-ph-en]').forEach(function(el) {
    el.placeholder = el.getAttribute('data-ph-' + lang) || '';
  });
  var btn = document.getElementById('langToggle');
  if (btn) btn.setAttribute('data-lang', lang);
}

function initLangToggle() {
  var btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyTranslations(currentLang);
  });
}

/* ────────────────────────────────────────────
   Sticky nav
──────────────────────────────────────────── */
function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ────────────────────────────────────────────
   Mobile burger menu
──────────────────────────────────────────── */
function initMobileNav() {
  var burger = document.getElementById('burger');
  if (!burger) return;

  var menu = document.createElement('div');
  menu.className = 'mobile-menu';

  [['#about','Nosotros','About'],['#services','Servicios','Services'],
   ['#gallery','Galería','Gallery'],['#club','Club','Club'],
   ['#reviews','Reseñas','Reviews'],['#book','Reservar','Book Now']
  ].forEach(function(item) {
    var a = document.createElement('a');
    a.href = item[0];
    a.setAttribute('data-es', item[1]);
    a.setAttribute('data-en', item[2]);
    a.textContent = currentLang === 'es' ? item[1] : item[2];
    a.addEventListener('click', close);
    menu.appendChild(a);
  });
  document.body.appendChild(menu);

  function open() {
    menu.classList.add('open');
    var s = burger.querySelectorAll('span');
    s[0].style.transform = 'translateY(8px) rotate(45deg)';
    s[1].style.transform = 'translateY(-8px) rotate(-45deg) scaleX(.6)';
    s[1].style.opacity = '0';
  }
  function close() {
    menu.classList.remove('open');
    var s = burger.querySelectorAll('span');
    s[0].style.transform = '';
    s[1].style.transform = '';
    s[1].style.opacity = '';
  }
  burger.addEventListener('click', function() {
    menu.classList.contains('open') ? close() : open();
  });
}

/* ────────────────────────────────────────────
   Scroll Reveal (IntersectionObserver)
──────────────────────────────────────────── */
function initReveal() {
  var els = document.querySelectorAll('.reveal, .clip-reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(function(el) { obs.observe(el); });
}

/* ────────────────────────────────────────────
   Number counters
──────────────────────────────────────────── */
function initCounters() {
  var els = document.querySelectorAll('.counter');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) {
      var t = +el.getAttribute('data-target');
      el.textContent = t >= 1000 ? t / 1000 : t;
    });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      var target = +e.target.getAttribute('data-target');
      var dur = 1800, start = performance.now();
      (function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        e.target.textContent = target >= 1000 ? Math.floor(v / 1000) : v;
        if (p < 1) requestAnimationFrame(tick);
        else e.target.textContent = target >= 1000 ? target / 1000 : target;
      })(start);
    });
  }, { threshold: 0.5 });
  els.forEach(function(el) { obs.observe(el); });
}

/* ────────────────────────────────────────────
   Custom cursor
──────────────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  var mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring lags behind for a smooth trailing effect
  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Grow on interactive elements
  document.querySelectorAll('a, button, .svc-card, .gallery__item').forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-hover'); });
  });

  document.addEventListener('mouseleave', function() { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', function() { dot.style.opacity = ''; ring.style.opacity = ''; });
}

/* ────────────────────────────────────────────
   Magnetic buttons
──────────────────────────────────────────── */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(function(el) {
    el.addEventListener('mousemove', function(e) {
      var r = el.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width  / 2);
      var dy = e.clientY - (r.top  + r.height / 2);
      el.style.transform = 'translate(' + dx * 0.28 + 'px,' + dy * 0.28 + 'px)';
    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = '';
    });
  });
}

/* ────────────────────────────────────────────
   Parallax on scroll (hero images + booking bg)
──────────────────────────────────────────── */
function initParallax() {
  var imgs = document.querySelectorAll('.parallax-img');
  if (!imgs.length) return;

  function onScroll() {
    imgs.forEach(function(img) {
      var rect   = img.closest('section, .about__img-main, .booking__bg').getBoundingClientRect();
      var speed  = parseFloat(img.getAttribute('data-speed') || '0.1');
      var offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      img.style.transform = 'translateY(' + offset + 'px) scale(1.08)';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ────────────────────────────────────────────
   Reviews auto-carousel
──────────────────────────────────────────── */
function initCarousel() {
  var track = document.getElementById('reviewsTrack');
  var dots  = document.querySelectorAll('.rdot');
  if (!track || !dots.length) return;

  var cards   = track.querySelectorAll('.rcard');
  var total   = cards.length;
  var current = 0;
  var timer;

  function go(idx) {
    current = (idx + total) % total;
    // Show 2 cards at a time on wide screens
    var perView = window.innerWidth >= 768 ? 2 : 1;
    var cardW   = track.parentElement.offsetWidth / perView;
    // Set card widths
    cards.forEach(function(c) {
      c.style.width = 'calc(' + (100 / perView) + '% - ' + (perView > 1 ? '1rem' : '0px') + ')';
    });
    track.style.transform = 'translateX(-' + (current * (100 / perView)) + '%)';
    dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
  }

  dots.forEach(function(d) {
    d.addEventListener('click', function() {
      go(+d.getAttribute('data-idx'));
      resetTimer();
    });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function() { go(current + 1); }, 4500);
  }

  window.addEventListener('resize', function() { go(current); });
  go(0);
  resetTimer();
}

/* ────────────────────────────────────────────
   Services drag-scroll (mouse)
──────────────────────────────────────────── */
function initServicesDrag() {
  var track = document.getElementById('servicesTrack');
  if (!track) return;
  var startX, scrollLeft, dragging = false;

  track.addEventListener('mousedown', function(e) {
    dragging = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup',   function() { dragging = false; track.style.cursor = ''; });
  track.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX);
  });
}

/* ────────────────────────────────────────────
   Booking form
──────────────────────────────────────────── */
function initBooking() {
  var btn = document.getElementById('bookBtn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var form  = btn.closest('form');
    var nameI = form ? form.querySelector('input[type="text"]') : null;
    if (nameI && !nameI.value.trim()) {
      nameI.style.borderColor = '#ff8a65';
      setTimeout(function() { nameI.style.borderColor = ''; }, 1400);
      return;
    }
    btn.textContent = currentLang === 'es' ? '¡Reservado! ✓' : 'Booked! ✓';
    btn.style.background = '#4caf50';
    setTimeout(function() {
      btn.textContent = btn.getAttribute('data-' + currentLang);
      btn.style.background = '';
    }, 3000);
  });
}

/* ────────────────────────────────────────────
   Hero title lang update
   The hero title uses a special multi-line
   data attribute (values separated by |).
──────────────────────────────────────────── */
function updateHeroTitle(lang) {
  var el = document.querySelector('.js-split-title');
  if (!el) return;
  var raw   = el.getAttribute('data-' + lang) || '';
  var lines = raw.split('|');
  var masks = el.querySelectorAll('.title-mask span');
  masks.forEach(function(span, i) {
    if (lines[i]) span.textContent = lines[i];
  });
}

/* ────────────────────────────────────────────
   Boot
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  // Translations
  applyTranslations('es');
  initLangToggle();

  // Patch toggle to also update hero title
  var origToggle = document.getElementById('langToggle');
  if (origToggle) {
    origToggle.addEventListener('click', function() {
      updateHeroTitle(currentLang);
    });
  }

  // UI
  initNav();
  initMobileNav();
  initReveal();
  initCounters();
  initCursor();
  initMagnetic();
  initParallax();
  initCarousel();
  initServicesDrag();
  initBooking();
});
