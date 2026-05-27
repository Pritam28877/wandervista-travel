import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-text">WanderVista</span>
            <p>
              We craft unforgettable travel experiences across India and the world. With 500+ curated
              packages and 15,000+ happy travelers, your next adventure is just a click away.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-x-twitter" /></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Destinations</h4>
            <Link href="/packages">Himachal Pradesh</Link>
            <Link href="/packages">Ladakh</Link>
            <Link href="/packages">Kerala</Link>
            <Link href="/packages">Rajasthan</Link>
            <Link href="/packages">Goa</Link>
          </div>

          <div className="footer-col">
            <h4>International</h4>
            <Link href="/packages">Bali</Link>
            <Link href="/packages">Thailand</Link>
            <Link href="/packages">Vietnam</Link>
            <Link href="/packages">Maldives</Link>
            <Link href="/packages">Europe</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/blogs">Blog</Link>
            <Link href="/admin">Admin</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <div className="footer-contact-item">
              <i className="fas fa-phone" />
              <div>
                <strong>1800-123-4567</strong>
                <br />
                <small style={{ color: 'var(--gray-500)' }}>Toll Free (Mon-Sat, 9am-8pm)</small>
              </div>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope" />
              <div>hello@wandervista.com</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 - 2026 WanderVista Travel Pvt Ltd. All rights reserved.</p>
          <div className="footer-badges">
            <div className="footer-badge"><i className="fas fa-lock" /> Secure Payments</div>
            <div className="footer-badge"><i className="fas fa-shield-halved" /> SSL Encrypted</div>
            <div className="footer-badge"><i className="fas fa-certificate" /> IATA Certified</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
