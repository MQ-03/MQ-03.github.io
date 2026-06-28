// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Sticky nav shadow =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile menu =====
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('.nav__links a, .nav__cta').forEach((a) =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(
  '.card, .case, .stack, .tl, .section__head, .hero__stats li, .about__body, .about__media, .cta__card'
);
revealEls.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

// ===== Contact form (client-side demo) =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.className = 'form__note';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    note.textContent = 'Please add your name, a valid email, and a short message.';
    note.classList.add('err');
    return;
  }

  // No backend wired up — open the user's mail client as a graceful fallback.
  const subject = encodeURIComponent(`New project enquiry from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n— ${name}\n${email}\nProject type: ${form.budget.value || 'Not specified'}`
  );
  window.location.href = `mailto:mubaraque3@gmail.com?subject=${subject}&body=${body}`;

  note.textContent = 'Thanks! Your email client should open — or reach me directly at mubaraque3@gmail.com.';
  note.classList.add('ok');
  form.reset();
});
