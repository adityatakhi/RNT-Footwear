'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>Checkout</p>
        <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '2rem' }}>Secure checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }} className="checkout-grid">
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <p style={{ color: '#9AA3AB', marginBottom: '1rem' }}>Enter delivery details to complete your order.</p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <input required placeholder="Email" type="email" style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
              <input required placeholder="Phone" type="tel" style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
              <input required placeholder="Address" style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                Place Order <ArrowRight size={14} />
              </button>
              {submitted && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C8FF00', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Order placed successfully. Confirmation is on the way.
                </div>
              )}
            </div>
          </form>

          <div style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldCheck size={18} style={{ color: '#C8FF00' }} />
              <p style={{ color: '#F5F7F8', fontWeight: 700 }}>Protected checkout</p>
            </div>
            <p style={{ color: '#9AA3AB', lineHeight: 1.7 }}>Encrypted payment processing, no hidden fees, and easy returns for eligible items.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gap: '0.75rem' }}>
              <Link href="/cart" style={{ color: '#C8FF00', textDecoration: 'none', fontWeight: 700 }}>Return to cart</Link>
              <Link href="/shop" style={{ color: '#F5F7F8', textDecoration: 'none', fontWeight: 600 }}>Continue shopping</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
