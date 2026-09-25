import { Shield, CreditCard, Truck, RotateCcw } from 'lucide-react';

const TRUST_ITEMS = [
  {
    Icon: Shield,
    title: 'Premium Quality',
    body: 'Every shoe is crafted with premium materials and passes rigorous quality checks before it reaches you.',
  },
  {
    Icon: CreditCard,
    title: 'Secure Payments',
    body: 'Your payment information is encrypted and never stored. We support UPI, cards, and cash on delivery.',
  },
  {
    Icon: Truck,
    title: 'Fast Delivery',
    body: 'Orders dispatched within 24 hours. Track your order in real time from our warehouse to your door.',
  },
  {
    Icon: RotateCcw,
    title: 'Easy Returns',
    body: '30-day hassle-free returns. If the fit isn\'t right, we make it right — no questions asked.',
  },
];

export function TrustSection() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      style={{
        backgroundColor: '#101418',
        borderTop: '1px solid #283038',
        borderBottom: '1px solid #283038',
        padding: '4rem 0',
      }}
    >
      <div className="container-rnt">
        <h2 id="trust-heading" className="sr-only">
          Why Shop RNT Footwear
        </h2>
        <div
          className="trust-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {TRUST_ITEMS.map(({ Icon, title, body }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.375rem',
                  backgroundColor: 'rgba(200, 255, 0, 0.08)',
                  border: '1px solid rgba(200, 255, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} style={{ color: '#C8FF00' }} />
              </div>
              <div>
                <h3
                  style={{
                    color: '#F5F7F8',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    marginBottom: '0.375rem',
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: '#9AA3AB', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .trust-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem;
          }
        }
        @media (max-width: 420px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
