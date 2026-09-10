const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.global-nav');
const siteHeader = document.querySelector('.site-header');
const faqButtons = document.querySelectorAll('.faq-question');
const revealImages = document.querySelectorAll(
  '.hero > img, .split-image img, .about-section img, .service-row img, .staff-row img, .hospital-visual img, .map-link img'
);

if (siteHeader) {
  const updateHeaderShadow = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 0);
  };

  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
      menuButton.focus();
    }
  });
}

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const open = item.classList.toggle('is-open');

    button.setAttribute('aria-expanded', String(open));
    if (answer) {
      answer.setAttribute('aria-hidden', String(!open));
    }
  });
});

if (revealImages.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealImages.forEach((image) => {
      image.classList.add('image-reveal', 'is-visible');
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealImages.forEach((image) => {
      image.classList.add('image-reveal');
      imageObserver.observe(image);
    });
  }
}
