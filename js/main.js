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
  initMonthChips();
  initHorizontalScrollers();
  initImageFallback();
  initLatestUpdatesTicker();
});

/* --- Latest Updates rotating ticker --- */
function initLatestUpdatesTicker() {
  const rotator = document.getElementById('feedRotator');
  if (!rotator) return;
  const msgs = rotator.querySelectorAll('.feed-msg');
  if (msgs.length < 2) return;
  let i = 0;
  setInterval(() => {
    msgs[i].classList.remove('is-active');
    i = (i + 1) % msgs.length;
    msgs[i].classList.add('is-active');
  }, 4000);
}

/* --- Image broken-source fallback. Catches both error events AND
       images that "loaded" but rendered 0x0 (Unsplash sometimes returns
       a 200 page that's not a real image when the ID is gone). --- */
function initImageFallback() {
  const fallback = (img) => {
    if (img.dataset.fb === '2') return;                       // already at final fallback
    const step = (img.dataset.fb || '0');
    const seed = encodeURIComponent((img.alt || 'travel').toLowerCase().replace(/\s+/g, '-')) || 'travel';
    if (step === '0') {
      img.dataset.fb = '1';
      img.src = `https://picsum.photos/seed/${seed}/600/800`;
    } else {
      img.dataset.fb = '2';
      img.src = `https://placehold.co/600x800/0a2540/ffc94d?text=${seed}`;
    }
  };

  const check = (img) => {
    if (img.complete && img.naturalWidth === 0) fallback(img);
  };

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => fallback(img));
    img.addEventListener('load',  () => check(img));
    check(img);
  });
}

/* --- Header Scroll Effect (skips solid headers on inner pages) --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  if (header.classList.contains('header--solid')) return; // inner pages stay solid

  const handleScroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else                     header.classList.remove('scrolled');
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

/* --- Search Box + live keyword suggestions --- */
const DESTINATIONS = [
  { name: 'Bali, Indonesia',     tag: 'International', emoji: '🏝️' },
  { name: 'Maldives',            tag: 'International', emoji: '🏖️' },
  { name: 'Thailand',            tag: 'International', emoji: '🛕' },
  { name: 'Vietnam',             tag: 'International', emoji: '⛵' },
  { name: 'Singapore',           tag: 'International', emoji: '🌆' },
  { name: 'Japan',               tag: 'International', emoji: '🗾' },
  { name: 'Europe Tour',         tag: 'International', emoji: '🗼' },
  { name: 'Dubai',               tag: 'International', emoji: '🕌' },
  { name: 'Bhutan',              tag: 'International', emoji: '🏔️' },
  { name: 'Leh Ladakh',          tag: 'India',         emoji: '🏍️' },
  { name: 'Spiti Valley',        tag: 'India',         emoji: '🏔️' },
  { name: 'Kashmir',             tag: 'India',         emoji: '❄️' },
  { name: 'Kerala',              tag: 'India',         emoji: '🛶' },
  { name: 'Rajasthan',           tag: 'India',         emoji: '🐪' },
  { name: 'Himachal Pradesh',    tag: 'India',         emoji: '⛰️' },
  { name: 'Meghalaya',           tag: 'India',         emoji: '🌧️' },
  { name: 'Goa',                 tag: 'Weekend',       emoji: '🏖️' },
  { name: 'Andaman & Nicobar',   tag: 'India',         emoji: '🐠' },
  { name: 'Coorg',               tag: 'Weekend',       emoji: '☕' },
  { name: 'Pondicherry',         tag: 'Weekend',       emoji: '🌊' },
  { name: 'Rishikesh',           tag: 'Weekend',       emoji: '🧘' }
];

function initSearchBox() {
  const form    = document.querySelector('.search-pill');
  const input   = document.getElementById('heroSearchInput');
  const suggest = document.getElementById('heroSearchSuggest');
  if (!form || !input || !suggest) return;

  const go = (q) => {
    if (!q) return;
    window.location.href = `packages.html?search=${encodeURIComponent(q.trim())}`;
  };

  const render = (q) => {
    const ql = q.trim().toLowerCase();
    const list = ql
      ? DESTINATIONS.filter(d => d.name.toLowerCase().includes(ql) || d.tag.toLowerCase().includes(ql)).slice(0, 6)
      : DESTINATIONS.slice(0, 6);

    if (!list.length) {
      suggest.innerHTML = `<li class="search-suggest__empty">No matches — try “Bali” or “Ladakh”</li>`;
    } else {
      suggest.innerHTML = list.map(d => `
        <li role="option" data-q="${d.name}">
          <span class="search-suggest__emoji">${d.emoji}</span>
          <span class="search-suggest__name">${d.name}</span>
          <span class="search-suggest__tag">${d.tag}</span>
        </li>`).join('');
    }
    suggest.hidden = false;
  };

  input.addEventListener('focus', () => render(input.value));
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') suggest.hidden = true;
  });

  suggest.addEventListener('mousedown', (e) => {
    const li = e.target.closest('li[data-q]');
    if (!li) return;
    e.preventDefault();
    input.value = li.dataset.q;
    suggest.hidden = true;
    go(li.dataset.q);
  });

  document.addEventListener('click', (e) => {
    if (!form.contains(e.target)) suggest.hidden = true;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    go(input.value);
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

/* --- Month chip selection (Upcoming Community Trips) --- */
function initMonthChips() {
  const chips = document.querySelectorAll('.month-chip');
  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

/* --- Horizontal scrollers (community / shorts / cat / frames):
       arrow buttons + mouse drag-to-scroll + wheel-to-horizontal. --- */
function initHorizontalScrollers() {
  const bind = (scroller, trackSel, prevSel, nextSel) => {
    if (!scroller) return;
    const track = scroller.querySelector(trackSel);
    const prev  = scroller.querySelector(prevSel);
    const next  = scroller.querySelector(nextSel);
    if (!track) return;

    const step = () => Math.max(track.clientWidth * 0.8, 280);

    if (prev) prev.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left:  step(), behavior: 'smooth' });
    });

    // Drag-to-scroll on mouse / touchpad
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener('mousedown', (e) => {
      isDown = true; moved = false;
      startX = e.pageX - track.offsetLeft;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('is-dragging'); });
    track.addEventListener('mouseup',    () => { isDown = false; track.classList.remove('is-dragging'); });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX);
      if (Math.abs(walk) > 6) moved = true;
      track.scrollLeft = startScroll - walk;
    });
    // Swallow click after a drag so child links don't fire
    track.addEventListener('click', (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  };

  document.querySelectorAll('.community-scroller').forEach(s => bind(s, '.community-track', '.community-arrow--prev', '.community-arrow--next'));
  document.querySelectorAll('.shorts-scroller').forEach(s    => bind(s, '.shorts-track',    '.shorts-arrow--prev',    '.shorts-arrow--next'));
  document.querySelectorAll('.cat-scroller').forEach(s       => bind(s, '.cat-track',       '.cat-arrow--prev',       '.cat-arrow--next'));
  document.querySelectorAll('.frames-scroller').forEach(s    => bind(s, '.frames-track',    '.frames-arrow--prev',    '.frames-arrow--next'));
}
