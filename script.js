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
// ⬇️  PASTE YOUR WEB3FORMS ACCESS KEY HERE (from https://web3forms.com — enter
//     your email, copy the key it emails you). Until you do, the form falls back
//     to opening the visitor's mail client.
const WEB3FORMS_KEY = '619a91ee-33ef-464c-9d71-2a010f832eac';

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  note.className = 'form__note';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const projectType = form.budget.value || 'Not specified';
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    note.textContent = 'Please add your name, a valid email, and a short message.';
    note.classList.add('err');
    return;
  }

  const configured = WEB3FORMS_KEY && WEB3FORMS_KEY !== 'YOUR_ACCESS_KEY_HERE';

  // Fallback: no key configured yet → open the visitor's mail client.
  if (!configured) {
    const subject = encodeURIComponent(`New project enquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}\nProject type: ${projectType}`
    );
    window.location.href = `mailto:mubaraque3@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = 'Your email client should open — or reach me directly at mubaraque3@gmail.com.';
    note.classList.add('ok');
    return;
  }

  // Real submission via Web3Forms (no backend needed).
  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New enquiry from ${name} — portfolio`,
        from_name: name,
        name,
        email,
        project_type: projectType,
        message,
      }),
    });
    const data = await res.json();

    if (data.success) {
      note.textContent = 'Thanks! Your message has been sent — I’ll reply within one business day.';
      note.classList.add('ok');
      form.reset();
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    note.textContent = 'Something went wrong sending the form. Please email me at mubaraque3@gmail.com.';
    note.classList.add('err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
});
