/* main.js
   - mobile menu toggle
   - smooth scrolling
   - contact + apply form validation (UI-only)
   - testimonials slider
   - portfolio modal popup
*/

document.addEventListener('DOMContentLoaded', () => {

  /* NAV MENU TOGGLE */
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // swap icon
      menuBtn.innerHTML = navLinks.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
  }

  /* SMOOTH SCROLL for anchors */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e)=>{
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (menuBtn) menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      }
    });
  });

  /* TESTIMONIALS SLIDER (simple) */
  const testimonials = document.querySelectorAll('.testimonial');
  let tIndex = 0;
  if (testimonials.length > 1) {
    function showTestimonial(index) {
      testimonials.forEach((el,i) => el.style.display = (i===index ? 'flex' : 'none'));
    }
    showTestimonial(tIndex);
    setInterval(() => {
      tIndex = (tIndex + 1) % testimonials.length;
      showTestimonial(tIndex);
    }, 4500);
  }

  /* PORTFOLIO MODAL */
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal .box img');
  const modalTitle = document.querySelector('.modal .box .meta h3');
  const modalDesc = document.querySelector('.modal .box .meta p');
  const modalMeta = document.querySelector('.modal .box .meta .meta-details');

  document.querySelectorAll('.project').forEach(proj => {
    proj.addEventListener('click', () => {
      const img = proj.querySelector('img')?.src || proj.dataset.img;
      const title = proj.querySelector('.meta h5')?.innerText || proj.dataset.title;
      const desc = proj.querySelector('.meta p')?.innerText || proj.dataset.desc;
      const industry = proj.dataset.industry || proj.querySelector('.meta .industry')?.innerText || '';

      if (modal && modalImg) {
        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalMeta.innerText = industry ? `Industry: ${industry}` : '';
        modal.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.modal .close, .modal').forEach(el => {
    el.addEventListener('click', (e)=>{
      // close if clicking background or close button
      if (e.target === el || el.classList.contains('close')) {
        modal.classList.remove('active');
      }
    });
  });

  // prevent clicks inside modal content from closing
  const modalBox = document.querySelector('.modal .box');
  if (modalBox) modalBox.addEventListener('click', e => e.stopPropagation());

  /* CONTACT FORM VALIDATION (UI-only) */
  window.validateContactForm = function(formEl) {
    try {
      const name = formEl.querySelector('[name="name"]').value.trim();
      const email = formEl.querySelector('[name="email"]').value.trim();
      const message = formEl.querySelector('[name="message"]').value.trim();

      if (!name) { alert('Please enter your name.'); return false; }
      if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
      if (message.length < 10) { alert('Message must have at least 10 characters.'); return false; }

      // UI confirmation only
      alert('Thanks — your message was captured (UI-only).');
      formEl.reset();
      return false; // prevent actual submit
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /* APPLY FORM VALIDATION (Careers page) */
  window.validateApplyForm = function(formEl) {
    try {
      const name = formEl.querySelector('[name="app-name"]').value.trim();
      const email = formEl.querySelector('[name="app-email"]').value.trim();
      const position = formEl.querySelector('[name="app-position"]').value.trim();
      const cover = formEl.querySelector('[name="app-cover"]').value.trim();

      if (!name) { alert('Please enter your full name.'); return false; }
      if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
      if (!position) { alert('Please select a position.'); return false; }
      if (cover.length < 20) { alert('Cover note should be at least 20 characters.'); return false; }

      alert('Application submitted (UI-only). Good luck!');
      formEl.reset();
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /* small: auto-hide mobile menu on window resize to desktop */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (menuBtn) menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });

});
