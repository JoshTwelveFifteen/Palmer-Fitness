const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinksEl.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Hero background auto-rotate (no visible navigation UI)
const slides = document.querySelectorAll('.hero-bg-slide');
let current = 0;
setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 5000);

// Gallery: manual scroll with auto-nudge that yields to the user
(function () {
  const wrap = document.querySelector('.gallery-track-wrap');
  const track = document.querySelector('.gallery-track');
  if (!wrap || !track) return;
  const cycleMs = 46900;
  let auto = true;
  let last = null;
  let resumeTimer;
  function half() { return track.scrollWidth / 2; }
  function frame(ts) {
    if (last === null) last = ts;
    const dt = ts - last;
    last = ts;
    if (auto) {
      const h = half();
      wrap.scrollLeft += (h / cycleMs) * dt;
      if (wrap.scrollLeft >= h) wrap.scrollLeft -= h;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function pause() {
    auto = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { auto = true; last = null; }, 2500);
  }
  ['pointerdown', 'wheel', 'touchstart'].forEach((evt) => wrap.addEventListener(evt, pause, { passive: true }));
  wrap.addEventListener('scroll', () => {
    const h = half();
    if (wrap.scrollLeft >= h) wrap.scrollLeft -= h;
    else if (wrap.scrollLeft < 0) wrap.scrollLeft += h;
  }, { passive: true });
})();