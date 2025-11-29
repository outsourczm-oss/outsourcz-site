// Init small interactive libraries
document.addEventListener('DOMContentLoaded', function() {
  // AOS init
  if (window.AOS) {
    AOS.init({
      duration: 600,
      once: true
    });
  }

  // set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // form validation + small UX
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      // basic client-side validation
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) {
        e.preventDefault();
        status.textContent = 'Please fill in name, email and message.';
        status.style.color = 'crimson';
        return;
      }

      // Email simple regex (not foolproof)
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        e.preventDefault();
        status.textContent = 'Please enter a valid email address.';
        status.style.color = 'crimson';
        return;
      }

      // Nice UI: disable submit to avoid double clicks (FormSubmit will handle POST)
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      // Let the browser submit the form (FormSubmit handles sending to email).
      // If you prefer AJAX submission to show a message without page redirect,
      // you'll need to use FormSubmit's AJAX docs or another service.
    });
  }
});
