'use client';

import Link from 'next/link';
import { ArrowRight, User, Package, LogOut, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

type SessionUser = {
  id: string;
  username: string;
  email?: string;
  role: 'customer' | 'admin';
};

export default function AccountPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>My Account</p>
        <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '2rem' }}>
          {loading ? 'Loading...' : user ? `Welcome, ${user.username}` : 'Welcome back'}
        </h1>

        {!loading && !user ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <Link href="/login" className="btn-primary" style={{ justifyContent: 'center' }}>Login</Link>
            <Link href="/signup" className="btn-outline" style={{ justifyContent: 'center' }}>Create account</Link>
          </div>
        ) : null}

        {user && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'linear-gradient(180deg, #101418 0%, #111821 100%)', border: '1px solid #283038', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(200,255,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} style={{ color: '#C8FF00' }} />
                  </div>
                  <h2 style={{ color: '#F5F7F8', fontSize: '1.1rem', margin: 0 }}>Profile</h2>
                </div>
                <span style={{ color: '#C8FF00', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {user.role}
                </span>
              </div>

              <p style={{ color: '#F5F7F8', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                {user.username}
              </p>
              <p style={{ color: '#9AA3AB', lineHeight: 1.7, marginBottom: '0.35rem' }}>
                {user.email || 'No email saved'}
              </p>
              {user.role === 'admin' && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem', color: '#C8FF00', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <ShieldCheck size={14} /> Admin access
                </div>
              )}
            </div>

            <div style={{ background: 'linear-gradient(180deg, #101418 0%, #111821 100%)', border: '1px solid #283038', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'rgba(200,255,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={18} style={{ color: '#C8FF00' }} />
                </div>
                <h2 style={{ color: '#F5F7F8', fontSize: '1.1rem', margin: 0 }}>Orders</h2>
              </div>
              <p style={{ color: '#9AA3AB', lineHeight: 1.7, marginBottom: '1rem' }}>
                Track shipments and review your purchase history in one place.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href="/shop" className="btn-outline" style={{ justifyContent: 'center' }}>Shop more</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="btn-primary" style={{ justifyContent: 'center' }}>Open admin</Link>
                )}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn-primary">
            Continue Shopping <ArrowRight size={14} />
          </Link>
          {user && (
            <button onClick={logout} className="btn-outline" style={{ gap: '0.5rem' }}>
              <LogOut size={14} /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
