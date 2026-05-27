'use client';

export function FloatingButtons() {
  return (
    <div className="floating-enquiry">
      <button
        className="floating-btn floating-btn-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up" />
      </button>
      <a
        href="https://wa.me/911234567890"
        className="floating-btn floating-btn-whatsapp"
        aria-label="WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  );
}
