/* ============================================
   WanderVista Travel - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initTabs();
  initAccordions();
  initFAQ();
  initCounters();
  initWishlist();
  initScrollToTop();
  initModal();
  initBookingSteps();
  initLiveFeed();
  initAnimateOnScroll();
  initSearchBox();
});

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('mobile-open');
    document.body.style.overflow = menu.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close menu on nav link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only for direct links, not dropdowns
      if (!e.target.closest('.nav-item') || window.innerWidth > 768) return;
      const megaMenu = e.target.closest('.nav-item').querySelector('.mega-menu');
      if (megaMenu) {
        megaMenu.style.display = megaMenu.style.display === 'block' ? 'none' : 'block';
        e.preventDefault();
      }
    });
  });
}

/* --- Tabs --- */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.detail-tab');
    const contents = container.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = container.querySelector(`#${target}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
}

/* --- Itinerary Accordions --- */
function initAccordions() {
  const days = document.querySelectorAll('.itinerary-day');

  days.forEach(day => {
    const header = day.querySelector('.itinerary-day-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const wasOpen = day.classList.contains('open');

      // Close all others (optional: remove for multi-open)
      days.forEach(d => d.classList.remove('open'));

      if (!wasOpen) {
        day.classList.add('open');
      }
    });
  });

  // Open first day by default
  if (days.length > 0) {
    days[0].classList.add('open');
  }
}

/* --- FAQ Accordions --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --- Traveler Counter --- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-controls');

  counters.forEach(counter => {
    const minBtn = counter.querySelector('.counter-btn:first-child');
    const maxBtn = counter.querySelector('.counter-btn:last-child');
    const valueEl = counter.querySelector('.counter-value');
    if (!minBtn || !maxBtn || !valueEl) return;

    const min = parseInt(counter.dataset.min || '0');
    const max = parseInt(counter.dataset.max || '10');

    minBtn.addEventListener('click', () => {
      let val = parseInt(valueEl.textContent);
      if (val > min) {
        valueEl.textContent = val - 1;
        updateBookingPrice();
      }
    });

    maxBtn.addEventListener('click', () => {
      let val = parseInt(valueEl.textContent);
      if (val < max) {
        valueEl.textContent = val + 1;
        updateBookingPrice();
      }
    });
  });
}

function updateBookingPrice() {
  // Recalculate price based on travelers
  const adultCount = document.querySelector('[data-counter="adults"] .counter-value');
  const childCount = document.querySelector('[data-counter="children"] .counter-value');
  const totalEl = document.querySelector('.booking-total-price');

  if (adultCount && totalEl) {
    const adults = parseInt(adultCount.textContent) || 0;
    const children = childCount ? parseInt(childCount.textContent) || 0 : 0;
    const basePrice = parseInt(totalEl.dataset.base || '0');
    const childPrice = Math.round(basePrice * 0.7);
    const total = (adults * basePrice) + (children * childPrice);
    totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  }
}

/* --- Wishlist Toggle --- */
function initWishlist() {
  const wishlistBtns = document.querySelectorAll('.package-card-wishlist');

  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
      }
    });
  });
}

/* --- Scroll To Top --- */
function initScrollToTop() {
  const topBtn = document.querySelector('.floating-btn-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Modal --- */
function initModal() {
  // Open modal triggers
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modalOpen;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal triggers
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        const modal = el.closest('.modal-overlay') || el;
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}

/* --- Booking Steps --- */
function initBookingSteps() {
  const steps = document.querySelectorAll('.booking-step');
  const nextBtns = document.querySelectorAll('[data-step-next]');
  const prevBtns = document.querySelectorAll('[data-step-prev]');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressLines = document.querySelectorAll('.progress-line');

  if (steps.length === 0) return;

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });

    progressSteps.forEach((ps, i) => {
      ps.classList.remove('active', 'completed');
      if (i < index) ps.classList.add('completed');
      if (i === index) ps.classList.add('active');
    });

    progressLines.forEach((pl, i) => {
      pl.classList.toggle('completed', i < index);
    });

    currentStep = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        // Basic validation
        const currentStepEl = steps[currentStep];
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let valid = true;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            valid = false;
          } else {
            field.style.borderColor = '';
          }
        });

        if (valid) {
          showStep(currentStep + 1);
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  showStep(0);
}

/* --- Live Booking Feed --- */
function initLiveFeed() {
  const feedContainer = document.querySelector('.feed-items');
  if (!feedContainer) return;

  const feedData = [
    { name: 'Rahul S.', city: 'Mumbai', destination: 'Ladakh Adventure', time: '2 min ago' },
    { name: 'Priya M.', city: 'Delhi', destination: 'Kerala Backwaters', time: '5 min ago' },
    { name: 'Amit K.', city: 'Bangalore', destination: 'Spiti Valley Road Trip', time: '8 min ago' },
    { name: 'Sneha R.', city: 'Chennai', destination: 'Rajasthan Heritage Tour', time: '12 min ago' },
    { name: 'Vikram P.', city: 'Pune', destination: 'Andaman Islands Escape', time: '15 min ago' },
    { name: 'Neha G.', city: 'Hyderabad', destination: 'Bali Honeymoon Package', time: '18 min ago' },
    { name: 'Arjun D.', city: 'Kolkata', destination: 'Meghalaya Explorer', time: '22 min ago' },
    { name: 'Kavita J.', city: 'Ahmedabad', destination: 'Thailand Family Tour', time: '25 min ago' },
  ];

  let currentIndex = 0;

  function showFeedItem() {
    const item = feedData[currentIndex];
    const feedEl = feedContainer.querySelector('.feed-ticker');

    if (feedEl) {
      feedEl.style.animation = 'none';
      feedEl.offsetHeight; // Trigger reflow
      feedEl.style.animation = 'fadeInUp 0.5s ease';

      feedEl.querySelector('.feed-text').innerHTML =
        `<strong>${item.name}</strong> from ${item.city} just booked <strong>${item.destination}</strong>`;
      feedEl.querySelector('.feed-time').textContent = item.time;
    }

    currentIndex = (currentIndex + 1) % feedData.length;
  }

  showFeedItem();
  setInterval(showFeedItem, 4000);
}

/* --- Animate on Scroll --- */
function initAnimateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// AOS animation class
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .aos-animate {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

/* --- Search Box Interaction --- */
function initSearchBox() {
  const searchForm = document.querySelector('.search-box');
  if (!searchForm) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = searchForm.querySelector('input[name="destination"]');
    if (destination && destination.value.trim()) {
      window.location.href = `packages.html?search=${encodeURIComponent(destination.value.trim())}`;
    }
  });
}

/* --- Testimonials Auto-Scroll --- */
function initTestimonialsScroll() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  let scrollAmount = 0;
  const cardWidth = 396; // card width + gap

  setInterval(() => {
    scrollAmount += cardWidth;
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
    }
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 5000);
}

// Initialize testimonials scroll after DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonialsScroll);
