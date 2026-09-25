import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '620px', textAlign: 'center', padding: '2rem', border: '1px solid #283038', borderRadius: '1.25rem', background: 'linear-gradient(180deg, #101418 0%, #0d1217 100%)' }}>
        <div style={{ display: 'inline-flex', width: '4rem', height: '4rem', borderRadius: '999px', backgroundColor: 'rgba(200,255,0,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <SearchX size={28} style={{ color: '#C8FF00' }} />
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>404</p>
        <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '1rem' }}>Page not found</h1>
        <p style={{ color: '#9AA3AB', lineHeight: 1.8, marginBottom: '2rem' }}>
          The page you are looking for doesn’t exist or may have moved. Let’s take you back to the collection.
        </p>

        <Link href="/" className="btn-primary" style={{ justifyContent: 'center' }}>
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </div>
  );
}
