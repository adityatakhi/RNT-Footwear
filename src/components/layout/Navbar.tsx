'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronRight, Heart, Users, User, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore(state => state.totalItems());
  const openCart = useCartStore(state => state.openCart);
  const wishlistCount = useWishlistStore(state => state.count());
  const searchRef = useRef<HTMLInputElement>(null);
  const visibleNavLinks = user?.role === 'admin' ? NAV_LINKS : NAV_LINKS.filter(link => link.href !== '/admin');

  useEffect(() => {
    async function loadSession() {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user ?? null);
    }

    loadSession();
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(8, 10, 12, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #283038' : '1px solid transparent',
        }}
      >
        <div className="container-rnt">
          <nav
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              height: scrolled ? '60px' : '72px',
              transition: 'height 0.3s ease',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="RNT Footwear - Home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                textDecoration: 'none',
                flexShrink: 0,
                minWidth: 0,
                maxWidth: '100%',
              }}
            >
              <span
                className="brand-mark"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.375rem',
                  letterSpacing: '0.12em',
                  color: '#F5F7F8',
                  textTransform: 'uppercase',
                }}
              >
                RNT
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#C8FF00',
                  flexShrink: 0,
                }}
              />
              <span
                className="brand-submark"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: '0.2em',
                  color: '#9AA3AB',
                  textTransform: 'uppercase',
                }}
              >
                FOOTWEAR
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul
              role="list"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
              className="hidden md:flex"
            >
              {visibleNavLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenus}
                    className={`nav-link${pathname === link.href ? ' active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                style={{
                  padding: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9AA3AB',
                  borderRadius: '0.25rem',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F7F8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
              >
                <Search size={18} />
              </button>

              <button
                aria-label="Wishlist"
                onClick={() => router.push('/wishlist')}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(17, 21, 25, 0.9)',
                  border: '1px solid #283038',
                  cursor: 'pointer',
                  color: wishlistCount > 0 ? '#C8FF00' : '#9AA3AB',
                  transition: 'all 0.2s ease',
                }}
              >
                <Heart size={16} fill={wishlistCount > 0 ? '#C8FF00' : 'none'} />
                {wishlistCount > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 4px',
                      borderRadius: '50%',
                      backgroundColor: '#C8FF00',
                      color: '#080A0C',
                      fontSize: '9px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #080A0C',
                    }}
                  >
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  aria-label="Profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen(prev => !prev)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(17, 21, 25, 0.9)',
                    border: '1px solid #283038',
                    cursor: 'pointer',
                    color: '#F5F7F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Users size={17} />
                </button>

                {profileOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 10px)',
                      width: '200px',
                      backgroundColor: '#101418',
                      border: '1px solid #283038',
                      borderRadius: '0.75rem',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                      padding: '0.5rem',
                      display: 'grid',
                      gap: '0.35rem',
                      zIndex: 70,
                    }}
                  >
                    {user ? (
                      <>
                        <Link href="/account" onClick={closeMenus} style={profileItemStyle}>
                          <Users size={14} /> Account
                        </Link>
                        <Link href="/wishlist" onClick={closeMenus} style={profileItemStyle}>
                          <Heart size={14} /> Wishlist
                        </Link>
                        {user.role === 'admin' && (
                          <Link href="/admin" onClick={closeMenus} style={profileItemStyle}>
                            <ShieldCheck size={14} /> Admin
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={closeMenus} style={profileItemStyle}>
                          <LogIn size={14} /> Login
                        </Link>
                        <Link href="/signup" onClick={closeMenus} style={profileItemStyle}>
                          <UserPlus size={14} /> Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                aria-label={`Cart, ${totalItems} items`}
                onClick={() => openCart()}
                style={{
                  position: 'relative',
                  padding: '0.55rem',
                  background: 'rgba(17, 21, 25, 0.9)',
                  border: '1px solid #283038',
                  cursor: 'pointer',
                  color: '#F5F7F8',
                  borderRadius: '999px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={17} />
                {totalItems > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 4px',
                      borderRadius: '50%',
                      backgroundColor: '#C8FF00',
                      color: '#080A0C',
                      fontSize: '9px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #080A0C',
                    }}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(prev => !prev)}
                style={{
                  padding: '0.55rem',
                  background: 'rgba(17, 21, 25, 0.9)',
                  border: '1px solid #283038',
                  cursor: 'pointer',
                  color: '#F5F7F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '999px',
                }}
                className="md:hidden"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-label="Search"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(8, 10, 12, 0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20vh',
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '600px', padding: '0 1.5rem' }}
          >
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Search
            </p>
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9AA3AB',
                  pointerEvents: 'none',
                }}
              />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search shoes, collections..."
                aria-label="Search products"
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchOpen(false);
                    return;
                  }
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) {
                      setSearchOpen(false);
                      router.push(`/shop?search=${encodeURIComponent(q)}`);
                    }
                  }
                }}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  backgroundColor: '#151A1F',
                  border: '1px solid #283038',
                  borderRadius: '0.25rem',
                  color: '#F5F7F8',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
            <p
              style={{
                color: '#9AA3AB',
                fontSize: '0.75rem',
                textAlign: 'center',
                marginTop: '1rem',
              }}
            >
              Press Enter to search · Esc to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          backgroundColor: '#080A0C',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
        }}
      >
        <nav style={{ padding: '2rem 1.5rem', flex: 1 }}>
          <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {visibleNavLinks.map((link, i) => (
              <li key={link.href} style={{ borderBottom: '1px solid #283038' }}>
                <Link
                  href={link.href}
                  onClick={closeMenus}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 0',
                    textDecoration: 'none',
                    color: pathname === link.href ? '#C8FF00' : '#F5F7F8',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {link.label}
                  <ChevronRight size={20} style={{ color: '#283038' }} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile bottom actions */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem',
                backgroundColor: '#151A1F',
                border: '1px solid #283038',
                borderRadius: '0.25rem',
                color: '#F5F7F8',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              <Search size={15} /> Search
            </button>
            <Link
              href="/account"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem',
                backgroundColor: '#151A1F',
                border: '1px solid #283038',
                borderRadius: '0.25rem',
                color: '#F5F7F8',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <User size={15} /> Account
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

const profileItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.55rem',
  textDecoration: 'none',
  color: '#F5F7F8',
  backgroundColor: '#151A1F',
  padding: '0.7rem 0.8rem',
  borderRadius: '0.5rem',
  border: '1px solid #283038',
  fontSize: '0.75rem',
  fontWeight: 600,
};
