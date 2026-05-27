'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const DEST = {
  'India Trips': ['Himachal Pradesh', 'Ladakh & Leh', 'Kashmir', 'Kerala', 'Rajasthan'],
  International: ['Bali, Indonesia', 'Thailand', 'Vietnam', 'Europe Tours', 'Maldives'],
  'Weekend Getaways': ['Goa', 'Coorg', 'Pondicherry', 'Lonavala', 'Rishikesh'],
};

const PKG = {
  'By Type': ['Family Holidays', 'Honeymoon Specials', 'Adventure Tours', 'Road Trips'],
  'By Budget': ['Under ₹25,000', '₹25K - ₹50K', '₹50K - ₹1 Lakh', 'Luxury'],
  Special: ["Women's Special", 'Solo Travel', 'Group Tours', 'Weekend Getaways'],
};

/** variant: 'transparent' (homepage hero) or 'solid' (inner pages) */
export function Header({ variant = 'solid' }: { variant?: 'transparent' | 'solid' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (variant === 'solid') return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const cls = [
    'header',
    variant === 'solid' ? 'header--solid' : '',
    scrolled ? 'scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const isActive = (href: string) => pathname === href;

  return (
    <header className={cls} id="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <i className="fas fa-mountain-sun" />
          </div>
          <span className="logo-text">WanderVista</span>
        </Link>

        <nav className="nav">
          <ul className={`nav-menu${menuOpen ? ' mobile-open' : ''}`} id="navMenu">
            <li className="nav-item">
              <Link href="/packages" className={`nav-link${isActive('/packages') ? ' active' : ''}`}>
                Destinations <span className="arrow"><i className="fas fa-chevron-down" /></span>
              </Link>
              <div className="mega-menu">
                <div className="mega-menu-grid">
                  {Object.entries(DEST).map(([col, items]) => (
                    <div className="mega-menu-col" key={col}>
                      <h4>{col}</h4>
                      {items.map((i) => (
                        <Link key={i} href="/packages">{i}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link href="/packages" className="nav-link">
                Packages <span className="arrow"><i className="fas fa-chevron-down" /></span>
              </Link>
              <div className="mega-menu">
                <div className="mega-menu-grid">
                  {Object.entries(PKG).map(([col, items]) => (
                    <div className="mega-menu-col" key={col}>
                      <h4>{col}</h4>
                      {items.map((i) => (
                        <Link key={i} href="/packages">{i}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li><Link href="/#community" className="nav-link">Upcoming Trips</Link></li>
            <li><Link href="/blogs" className={`nav-link${pathname.startsWith('/blogs') ? ' active' : ''}`}>Blogs</Link></li>
            <li><Link href="/contact" className={`nav-link${isActive('/contact') ? ' active' : ''}`}>Contact</Link></li>
          </ul>

          <div className="header-actions">
            <a href="tel:18001234567" className="header-phone">
              <i className="fas fa-phone" /> 1800-123-4567
            </a>
            <Link href="/booking" className="btn-booknow">Book Now</Link>
          </div>

          <button
            className={`menu-toggle${menuOpen ? ' active' : ''}`}
            id="menuToggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>
    </header>
  );
}
