/* ═══════════════════════════════════════════
   SERENIDAD — main.js
   • Scroll-reveal animations
   • Sticky nav
   • Number counters
   • Bilingual toggle (ES / EN)
   • Mobile nav
   ═══════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────
   i18n Translations
──────────────────────────────────────────── */
const translations = {
  es: {
    /* nav */
    'nav.about':    'Nosotros',
    'nav.services': 'Servicios',
    'nav.club':     'Club',
    'nav.reviews':  'Reseñas',
    'nav.contact':  'Contacto',
    'nav.book':     'Reservar',
    /* hero */
    'hero.eyebrow': 'Tu cuerpo merece esto',
    'hero.title1':  'Tu Cuerpo',
    'hero.title2':  'Se Merece Esto',
    'hero.sub':     'Descubre el masaje terapéutico que transforma cuerpo y mente. Ubicados en el corazón de México.',
    'hero.cta':     'Reservar cita',
    'hero.learn':   'Conocer más',
    /* ticker */
    'ticker.1': 'Masaje Terapéutico',
    'ticker.2': 'Ciudad de México',
    'ticker.3': 'Masaje de Tejido Profundo',
    'ticker.4': 'Reflexología',
    'ticker.5': 'Aromaterapia',
    'ticker.6': 'Masaje Prenatal',
    'ticker.f1': 'MASAJES TERAPÉUTICOS',
    'ticker.f2': 'BIENESTAR',
    /* about */
    'about.eyebrow': 'Nuestra Historia',
    'about.title':   'La Historia Detrás<br/><em>De Tu Serenidad</em>',
    'about.p1':      'Somos un equipo de terapeutas certificados con más de 10 años de experiencia en masajes terapéuticos. Nuestra misión es ayudarte a reconectar con tu cuerpo y encontrar paz interior.',
    'about.p2':      'Inspirados en las tradiciones de bienestar mexicanas y técnicas modernas, cada sesión es una experiencia única diseñada especialmente para ti.',
    'about.cta':     'Explorar Servicios',
    /* stats */
    'stats.clients':    'Clientes Felices',
    'stats.years':      'Años de Servicio',
    'stats.rating':     'Calificación Media',
    'stats.therapists': 'Terapeutas Certificados',
    /* treatments */
    'treatments.title': 'Tratamientos Para<br/><em>Cada Cuerpo</em>',
    'treatments.sub':   'Elige el tratamiento ideal para tus necesidades.',
    'treatments.cta':   'Ver Tratamientos',
    /* club */
    'club.eyebrow': 'Membresías',
    'club.title':   'El Club de Bienestar<br/><em>Serenidad</em>',
    /* plans */
    'plans.per':    '/mes',
    'plans.select': 'Seleccionar',
    'plans.popular':'Más Popular',
    'plans.serenity.name': 'Serenidad',
    'plans.serenity.f1':   '1 Masaje Terapéutico al mes',
    'plans.serenity.f2':   'Descuento del 10% en productos',
    'plans.serenity.f3':   'Acceso a meditaciones guiadas',
    'plans.serenity.f4':   '10% de descuento en servicios adicionales',
    'plans.oasis.name': 'Oasis',
    'plans.oasis.f1':   '2 Masajes Terapéuticos al mes',
    'plans.oasis.f2':   '1 Sesión de Aromaterapia',
    'plans.oasis.f3':   'Descuento del 20% en productos',
    'plans.oasis.f4':   '15% de descuento en servicios adicionales',
    'plans.radiance.name': 'Radiancia',
    'plans.radiance.f1':   '4 Masajes Terapéuticos al mes',
    'plans.radiance.f2':   '2 Sesiones de Aromaterapia',
    'plans.radiance.f3':   '1 Sesión de Reflexología',
    'plans.radiance.f4':   'Descuento del 30% en todos los servicios',
    /* reviews */
    'reviews.eyebrow': 'Testimonios',
    'reviews.title':   'Tus Historias<br/><em>de Bienestar</em>',
    'review1.text':    '"El mejor masaje que he tenido en mi vida. La terapeuta supo exactamente dónde tenía tensión y la alivió completamente."',
    'review1.loc':     'Ciudad de México',
    'review2.text':    '"Me siento renacida después de cada visita. El ambiente es increíblemente relajante y el equipo muy profesional."',
    'review2.loc':     'Guadalajara',
    'review3.text':    '"El masaje de tejido profundo resolvió mi dolor de espalda crónico. Llevo 3 meses sin molestias. ¡Totalmente recomendado!"',
    'review3.loc':     'Monterrey',
    'review4.text':    '"El masaje prenatal fue una experiencia sublime. Me sentí en las mejores manos durante todo mi embarazo."',
    'review4.loc':     'Cancún',
    /* cta / form */
    'cta.eyebrow':  'Reserva Ahora',
    'cta.title':    'El Bienestar<br/><em>Que Mereces</em>',
    'form.name':    'Tu nombre',
    'form.phone':   'Tu teléfono',
    'form.service': 'Elige un servicio',
    'form.submit':  'Reservar Ahora',
    /* services */
    'service1': 'Masaje Terapéutico',
    'service2': 'Masaje de Tejido Profundo',
    'service3': 'Aromaterapia',
    'service4': 'Reflexología',
    'service5': 'Masaje Prenatal',
    /* footer */
    'footer.tagline':  'Masajes terapéuticos en el corazón de México. Tu bienestar es nuestra misión.',
    'footer.nav':      'Navegación',
    'footer.services': 'Servicios',
    'footer.contact':  'Contacto',
    'footer.hours':    'Lun–Sáb: 9am – 8pm',
    'footer.copy':     '© 2025 Serenidad. Todos los derechos reservados.',
  },

  en: {
    /* nav */
    'nav.about':    'About',
    'nav.services': 'Services',
    'nav.club':     'Club',
    'nav.reviews':  'Reviews',
    'nav.contact':  'Contact',
    'nav.book':     'Book Now',
    /* hero */
    'hero.eyebrow': 'Your body deserves this',
    'hero.title1':  'Your Body',
    'hero.title2':  'Deserves This',
    'hero.sub':     'Discover therapeutic massage that transforms body and mind. Located in the heart of Mexico.',
    'hero.cta':     'Book Appointment',
    'hero.learn':   'Learn More',
    /* ticker */
    'ticker.1': 'Therapeutic Massage',
    'ticker.2': 'Mexico City',
    'ticker.3': 'Deep Tissue Massage',
    'ticker.4': 'Reflexology',
    'ticker.5': 'Aromatherapy',
    'ticker.6': 'Prenatal Massage',
    'ticker.f1': 'THERAPEUTIC MASSAGE',
    'ticker.f2': 'WELLNESS',
    /* about */
    'about.eyebrow': 'Our Story',
    'about.title':   'The Story Behind<br/><em>Your Serenity</em>',
    'about.p1':      'We are a team of certified therapists with over 10 years of experience in therapeutic massage. Our mission is to help you reconnect with your body and find inner peace.',
    'about.p2':      'Inspired by Mexican wellness traditions and modern techniques, each session is a unique experience designed especially for you.',
    'about.cta':     'Explore Services',
    /* stats */
    'stats.clients':    'Happy Clients',
    'stats.years':      'Years of Service',
    'stats.rating':     'Average Rating',
    'stats.therapists': 'Certified Therapists',
    /* treatments */
    'treatments.title': 'Treatments For<br/><em>Every Body</em>',
    'treatments.sub':   'Choose the ideal treatment for your needs.',
    'treatments.cta':   'View Treatments',
    /* club */
    'club.eyebrow': 'Memberships',
    'club.title':   'The Serenidad<br/><em>Wellness Club</em>',
    /* plans */
    'plans.per':    '/mo',
    'plans.select': 'Select Plan',
    'plans.popular':'Most Popular',
    'plans.serenity.name': 'Serenity',
    'plans.serenity.f1':   '1 Therapeutic Massage per month',
    'plans.serenity.f2':   '10% discount on products',
    'plans.serenity.f3':   'Access to guided meditations',
    'plans.serenity.f4':   '10% off additional services',
    'plans.oasis.name': 'Oasis',
    'plans.oasis.f1':   '2 Therapeutic Massages per month',
    'plans.oasis.f2':   '1 Aromatherapy Session',
    'plans.oasis.f3':   '20% discount on products',
    'plans.oasis.f4':   '15% off additional services',
    'plans.radiance.name': 'Radiance',
    'plans.radiance.f1':   '4 Therapeutic Massages per month',
    'plans.radiance.f2':   '2 Aromatherapy Sessions',
    'plans.radiance.f3':   '1 Reflexology Session',
    'plans.radiance.f4':   '30% off all services',
    /* reviews */
    'reviews.eyebrow': 'Testimonials',
    'reviews.title':   'Your Stories<br/><em>of Well-being</em>',
    'review1.text':    '"The best massage I have ever had. The therapist knew exactly where I had tension and completely relieved it."',
    'review1.loc':     'Mexico City',
    'review2.text':    '"I feel reborn after every visit. The atmosphere is incredibly relaxing and the team is very professional."',
    'review2.loc':     'Guadalajara',
    'review3.text':    '"The deep tissue massage solved my chronic back pain. Three months without discomfort. Totally recommended!"',
    'review3.loc':     'Monterrey',
    'review4.text':    '"The prenatal massage was a sublime experience. I felt in the best hands throughout my pregnancy."',
    'review4.loc':     'Cancún',
    /* cta / form */
    'cta.eyebrow':  'Book Now',
    'cta.title':    'The Wellness<br/><em>You Deserve</em>',
    'form.name':    'Your name',
    'form.phone':   'Your phone',
    'form.service': 'Choose a service',
    'form.submit':  'Book Now',
    /* services */
    'service1': 'Therapeutic Massage',
    'service2': 'Deep Tissue Massage',
    'service3': 'Aromatherapy',
    'service4': 'Reflexology',
    'service5': 'Prenatal Massage',
    /* footer */
    'footer.tagline':  'Therapeutic massages in the heart of Mexico. Your well-being is our mission.',
    'footer.nav':      'Navigation',
    'footer.services': 'Services',
    'footer.contact':  'Contact',
    'footer.hours':    'Mon–Sat: 9am – 8pm',
    'footer.copy':     '© 2025 Serenidad. All rights reserved.',
  }
};

/* ────────────────────────────────────────────
   State
──────────────────────────────────────────── */
let currentLang = 'es';

/* ────────────────────────────────────────────
   Apply translations
──────────────────────────────────────────── */
function applyTranslations(lang, animate = false) {
  const t = translations[lang];
  const els = document.querySelectorAll('[data-i18n]');

  if (animate) {
    // Fade out
    document.body.classList.add('lang-fade-out');
  }

  const doUpdate = () => {
    els.forEach(el => {
      const key = el.dataset.i18n;
      if (!t[key]) return;
      // Some values contain HTML (e.g. <em>, <br/>)
      if (t[key].includes('<')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key]) el.placeholder = t[key];
    });

    // HTML lang attribute
    document.documentElement.lang = lang;
  };

  if (animate) {
    setTimeout(() => {
      doUpdate();
      document.body.classList.remove('lang-fade-out');
      document.body.classList.add('lang-fade-in');
      setTimeout(() => document.body.classList.remove('lang-fade-in'), 400);
    }, 220);
  } else {
    doUpdate();
  }
}

/* ────────────────────────────────────────────
   Language toggle
──────────────────────────────────────────── */
function initLangToggle() {
  const btn   = document.getElementById('langToggle');
  const label = document.getElementById('langLabel');
  if (!btn) return;

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    label.textContent = currentLang === 'es' ? 'EN' : 'ES';
    applyTranslations(currentLang, true);

    // Bounce animation on toggle button
    btn.style.transform = 'scale(0.85)';
    setTimeout(() => { btn.style.transform = ''; }, 180);
  });
}

/* ────────────────────────────────────────────
   Sticky Nav + Shadow on scroll
──────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ────────────────────────────────────────────
   Mobile hamburger menu
──────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  // Build overlay if not present
  let menu = document.querySelector('.nav__mobile-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'nav__mobile-menu';

    const links = [
      ['#about',    'nav.about'],
      ['#services', 'nav.services'],
      ['#club',     'nav.club'],
      ['#reviews',  'nav.reviews'],
      ['#book',     'nav.book'],
    ];
    links.forEach(([href, key]) => {
      const a = document.createElement('a');
      a.href = href;
      a.dataset.i18n = key;
      a.textContent = translations[currentLang][key] || key;
      a.addEventListener('click', closeMenu);
      menu.appendChild(a);
    });
    document.body.appendChild(menu);
  }

  function openMenu() {
    menu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    // Animate bars → X
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }
  function closeMenu() {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
}

/* ────────────────────────────────────────────
   Scroll Reveal (IntersectionObserver)
──────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────
   Number Counter Animation
──────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current >= 1000
      ? (current / 1000).toFixed(current >= 10000 ? 0 : 0)
      : current;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target >= 1000 ? (target / 1000) : target;
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(el => {
      const t = parseInt(el.dataset.target, 10);
      el.textContent = t >= 1000 ? t / 1000 : t;
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────
   Parallax tilt on mosaic images (desktop)
──────────────────────────────────────────── */
function initMosaicParallax() {
  if (window.innerWidth < 1024) return;
  const items = document.querySelectorAll('.mosaic__item');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    items.forEach((item, i) => {
      const depth = (i + 1) * 6;
      item.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });
}

/* ────────────────────────────────────────────
   Smooth active nav link highlight
──────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ────────────────────────────────────────────
   Booking form micro-interaction
──────────────────────────────────────────── */
function initBookingForm() {
  const form = document.querySelector('.booking-cta__form');
  if (!form) return;

  const btn = form.querySelector('.btn--primary');
  btn.addEventListener('click', () => {
    const name = form.querySelector('input[type="text"]').value.trim();
    if (!name) {
      form.querySelector('input[type="text"]').style.borderColor = '#ff8a65';
      setTimeout(() => {
        form.querySelector('input[type="text"]').style.borderColor = '';
      }, 1200);
      return;
    }
    btn.textContent = currentLang === 'es' ? '¡Reservado! ✓' : 'Booked! ✓';
    btn.style.background = '#4caf50';
    setTimeout(() => {
      btn.textContent = translations[currentLang]['form.submit'];
      btn.style.background = '';
    }, 3000);
  });
}

/* ────────────────────────────────────────────
   Boot
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);   // Set initial language
  initLangToggle();
  initNav();
  initMobileNav();
  initReveal();
  initCounters();
  initMosaicParallax();
  initActiveNav();
  initBookingForm();
});
