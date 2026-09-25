'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  customerCare: [
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Order', href: '/track' },
    { label: 'Support', href: '/contact' },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
  { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#080A0C',
        borderTop: '1px solid #283038',
        paddingTop: '5rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container-rnt">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid #283038',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  letterSpacing: '0.12em',
                  color: '#F5F7F8',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                }}
              >
                RNT<span style={{ color: '#C8FF00' }}>.</span>
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  letterSpacing: '0.25em',
                  color: '#9AA3AB',
                  textTransform: 'uppercase',
                }}
              >
                FOOTWEAR
              </div>
            </Link>
            <p
              style={{
                color: '#9AA3AB',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                marginTop: '1.25rem',
                maxWidth: '220px',
              }}
            >
              Performance meets style. Engineered for every move, built to last.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '0.25rem',
                    border: '1px solid #283038',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9AA3AB',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#C8FF00';
                    e.currentTarget.style.color = '#C8FF00';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#283038';
                    e.currentTarget.style.color = '#9AA3AB';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F5F7F8',
                marginBottom: '1.25rem',
              }}
            >
              Quick Links
            </h3>
            <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FOOTER_LINKS.quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: '#9AA3AB',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F5F7F8',
                marginBottom: '1.25rem',
              }}
            >
              Customer Care
            </h3>
            <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FOOTER_LINKS.customerCare.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: '#9AA3AB',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F5F7F8',
                marginBottom: '0.5rem',
              }}
            >
              Stay Updated
            </h3>
            <p style={{ color: '#9AA3AB', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Get the latest drops and updates.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#101418',
                  border: '1px solid #283038',
                  borderRadius: '0.25rem',
                  color: '#F5F7F8',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.target.style.borderColor = '#C8FF00')}
                onBlur={e => (e.target.style.borderColor = '#283038')}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1rem' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '2rem',
          }}
        >
          <p style={{ color: '#9AA3AB', fontSize: '0.8125rem' }}>
            © {year ?? '—'} RNT FOOTWEAR. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Service', href: '/terms-of-service' },
              { label: 'Cookie Policy', href: '/cookie-policy' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: '#9AA3AB',
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
