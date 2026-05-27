'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  {
    title: 'Main',
    items: [
      { href: '/admin', icon: 'fa-gauge-high', label: 'Dashboard' },
      { href: '/admin/bookings', icon: 'fa-calendar-check', label: 'Bookings', badge: '12' },
      { href: '/packages', icon: 'fa-route', label: 'Trips & Packages' },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/blogs', icon: 'fa-newspaper', label: 'Blog Posts' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/', icon: 'fa-globe', label: 'View Website' },
    ],
  },
];

export function AdminShell({
  title,
  breadcrumb,
  actions,
  children,
}: {
  title: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-wrapper">
      <aside className={`admin-sidebar${open ? ' open' : ''}`} id="adminSidebar">
        <div className="admin-sidebar-header">
          <div className="logo-icon"><i className="fas fa-mountain-sun" /></div>
          <div>
            <span className="logo-text" style={{ color: 'var(--white)' }}>WanderVista</span>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV.map((section) => (
            <div className="admin-nav-section" key={section.title}>
              <div className="admin-nav-section-title">{section.title}</div>
              {section.items.map((it) => {
                const active = pathname === it.href || (it.href !== '/admin' && pathname.startsWith(it.href));
                return (
                  <Link key={it.href} href={it.href} className={`admin-nav-link${active ? ' active' : ''}`}>
                    <i className={`fas ${it.icon}`} /> {it.label}
                    {it.badge && <span className="nav-badge">{it.badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-user-avatar">AM</div>
            <div className="admin-user-info">
              <strong>Arjun Mehta</strong>
              <small>Super Admin</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="mobile-menu-btn" onClick={() => setOpen((o) => !o)}><i className="fas fa-bars" /></button>
            <div>
              <h1>{title}</h1>
              {breadcrumb && <span className="breadcrumb">{breadcrumb}</span>}
            </div>
          </div>
          <div className="admin-topbar-right">{actions}</div>
        </div>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
