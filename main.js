/* ═══════════════════════════════════════════
   SERENIDAD — main.js
   ═══════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────
   Language state
──────────────────────────────────────────── */
let currentLang = 'es';

/* ────────────────────────────────────────────
   Apply translations
   Reads data-es / data-en attributes directly
   from each element — no external dictionary,
   nothing for auto-translate to intercept.
──────────────────────────────────────────── */
function applyTranslations(lang) {
  // Text / HTML nodes
  document.querySelectorAll('[data-es][data-en]').forEach(function(el) {
    // Skip the toggle button itself (it manages its own state)
    if (el.id === 'langToggle') return;
    var text = el.getAttribute('data-' + lang);
    if (!text) return;
    // HTML-encoded content (entities were used to store < > safely in attrs)
    el.innerHTML = text
      .replace(/&lt;/g,  '<')
      .replace(/&gt;/g,  '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"');
  });

  // Placeholder attributes on inputs
  document.querySelectorAll('[data-ph-es][data-ph-en]').forEach(function(el) {
    el.placeholder = el.getAttribute('data-ph-' + lang) || '';
  });

  // Update toggle button highlight
  var btn = document.getElementById('langToggle');
  if (btn) btn.setAttribute('data-lang', lang);
}

/* ────────────────────────────────────────────
   Language toggle
──────────────────────────────────────────── */
function initLangToggle() {
  var btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyTranslations(currentLang);
  });
}

/* ────────────────────────────────────────────
   Sticky Nav
──────────────────────────────────────────── */
function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ────────────────────────────────────────────
   Mobile hamburger
──────────────────────────────────────────── */
function initMobileNav() {
  var hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  var menu = document.createElement('div');
  menu.className = 'nav__mobile-menu';

  var links = [
    ['#about',    'Nosotros',  'About'],
    ['#services', 'Servicios', 'Services'],
    ['#club',     'Club',      'Club'],
    ['#reviews',  'Reseñas',   'Reviews'],
    ['#book',     'Reservar',  'Book Now'],
  ];

  links.forEach(function(item) {
    var a = document.createElement('a');
    a.href = item[0];
    a.setAttribute('data-es', item[1]);
    a.setAttribute('data-en', item[2]);
    a.textContent = item[1];
    a.addEventListener('click', closeMenu);
    menu.appendChild(a);
  });
  document.body.appendChild(menu);

  function openMenu() {
    menu.classList.add('open');
    var spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }
  function closeMenu() {
    menu.classList.remove('open');
    var spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  hamburger.addEventListener('click', function() {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
}

/* ────────────────────────────────────────────
   Scroll Reveal
──────────────────────────────────────────── */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(function(el) { observer.observe(el); });
}

/* ────────────────────────────────────────────
   Number Counters
──────────────────────────────────────────── */
function animateCounter(el) {
  var target   = parseInt(el.getAttribute('data-target'), 10);
  var duration = 1600;
  var start    = performance.now();
  function tick(now) {
    var progress = Math.min((now - start) / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    var current  = Math.floor(eased * target);
    el.textContent = target >= 1000 ? (current / 1000).toFixed(0) : current;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target >= 1000 ? (target / 1000) : target;
    }
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  var counters = document.querySelectorAll('.counter');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(function(el) {
      var t = parseInt(el.getAttribute('data-target'), 10);
      el.textContent = t >= 1000 ? t / 1000 : t;
    });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function(el) { observer.observe(el); });
}

/* ────────────────────────────────────────────
   Mosaic parallax (desktop only)
──────────────────────────────────────────── */
function initMosaicParallax() {
  if (window.innerWidth < 1024) return;
  var items = document.querySelectorAll('.mosaic__item');
  document.addEventListener('mousemove', function(e) {
    var cx = window.innerWidth  / 2;
    var cy = window.innerHeight / 2;
    var dx = (e.clientX - cx) / cx;
    var dy = (e.clientY - cy) / cy;
    items.forEach(function(item, i) {
      var depth = (i + 1) * 6;
      item.style.transform = 'translate(' + (dx * depth) + 'px,' + (dy * depth) + 'px)';
    });
  });
}

/* ────────────────────────────────────────────
   Booking form feedback
──────────────────────────────────────────── */
function initBookingForm() {
  var form = document.querySelector('.booking-cta__form');
  if (!form) return;
  var btn = document.getElementById('bookBtn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var nameInput = form.querySelector('input[type="text"]');
    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = '#ff8a65';
      setTimeout(function() { nameInput.style.borderColor = ''; }, 1200);
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
   Boot
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initLangToggle();
  initNav();
  initMobileNav();
  initReveal();
  initCounters();
  initMosaicParallax();
  initBookingForm();
  // Ensure initial state matches HTML default (es)
  applyTranslations('es');
});
