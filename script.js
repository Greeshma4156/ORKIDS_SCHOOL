document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Header on Scroll
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load


  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  const closeMenu = () => {
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // 3. FAQ Accordion Interaction
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const panel = item.querySelector('.faq-panel');
      const isActive = item.classList.contains('active');

      // Close all other FAQ items (Accordion mode)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });


  // 4. Form Submission and Validation
  const inquiryForm = document.getElementById('inquiry-form');
  const formFeedback = document.getElementById('form-feedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple values capture
      const parentName = document.getElementById('parent-name').value.trim();
      const studentInfo = document.getElementById('student-info').value.trim();
      const grade = document.getElementById('grade-apply').value;
      const mobile = document.getElementById('mobile-number').value.trim();

      if (!parentName || !studentInfo || !grade || !mobile) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate API call success
      const submitButton = inquiryForm.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        showFeedback('Thank you for reaching out! Your inquiry has been sent. Our admissions counselor will contact you shortly.', 'success');
        inquiryForm.reset();
      }, 1200);
    });
  }

  const showFeedback = (message, type) => {
    if (!formFeedback) return;
    
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback-message ${type}`;
    
    // Clear feedback after 6 seconds
    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  };

  // 5. Announcement Modal Interaction
  const modalOverlay = document.getElementById('announcement-modal');
  const modalCloseBtn = document.getElementById('modal-close');

  if (modalOverlay && modalCloseBtn) {
    // Show modal immediately on page load with a smooth delay
    setTimeout(() => {
      modalOverlay.classList.add('open');
      document.body.classList.add('modal-active');
    }, 400);

    const closeModal = () => {
      modalOverlay.classList.remove('open');
      document.body.classList.remove('modal-active');
    };

    modalCloseBtn.addEventListener('click', closeModal);

    // Close when clicking on the overlay outside the modal content
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // 6. Stats Count Up Animation on Scroll
  const statsSection = document.querySelector('.stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statsSection && statNumbers.length > 0) {
    let animated = false;

    const startCounters = () => {
      statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'), 10);
        const isPercentage = statNumber.textContent.includes('%') || statNumber.getAttribute('data-target') === '100';
        let current = 0;
        const duration = 1500; // 1.5 seconds animation
        const increment = target / (duration / 16); // approx 60fps

        const updateCounter = () => {
          current += increment;
          if (current >= target) {
            statNumber.textContent = target + (isPercentage ? '%' : '');
          } else {
            statNumber.textContent = Math.floor(current) + (isPercentage ? '%' : '');
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          startCounters();
          animated = true;
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }
});
