'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Login failed.');
      return;
    }

    router.push(data.user?.role === 'admin' ? '/admin' : '/account');
    router.refresh();
  };

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container-rnt" style={{ maxWidth: '560px', paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', padding: '2rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Customer login</p>
          <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '1.5rem' }}>Welcome back</h1>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <input
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
              required
              style={inputStyle}
            />
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
              required
              style={inputStyle}
            />

            {error && <div style={{ color: '#FF6B6B', fontSize: '0.875rem' }}>{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ color: '#9AA3AB', marginTop: '1rem', textAlign: 'center' }}>
            New here?{' '}
            <Link href="/signup" style={{ color: '#C8FF00', textDecoration: 'none' }}>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#0d1217',
  border: '1px solid #283038',
  borderRadius: '0.75rem',
  color: '#F5F7F8',
  padding: '0.9rem 1rem',
  outline: 'none',
};
