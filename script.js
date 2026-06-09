// =========================================
//   PORTFOLIO WEBSITE — script.js
// =========================================

// --- MOBILE MENU TOGGLE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});


// --- SKILL BAR ANIMATION ---
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      observer.unobserve(entry.target);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));


// --- SCROLL REVEAL ANIMATION ---
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-grid'
);

const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
};

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver(revealOnScroll, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));


// --- CONTACT FORM HANDLER ---
function sendMessage() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('form-status');

  if (!name || !email || !subject || !message) {
    status.style.color = '#ef4444';
    status.textContent = '⚠️ Please fill in all fields.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.style.color = '#ef4444';
    status.textContent = '⚠️ Please enter a valid email address.';
    return;
  }

  // Simulate sending (replace with real backend/email service)
  status.style.color = 'var(--primary)';
  status.textContent = '✅ Message sent! I\'ll get back to you soon.';

  document.getElementById('name').value    = '';
  document.getElementById('email').value   = '';
  document.getElementById('subject').value = '';
  document.getElementById('message').value = '';
}


// --- SMOOTH SCROLL OFFSET (for fixed navbar) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
