import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getNewArrivals } from '@/lib/data/products';

export function NewArrivalsSection() {
  const products = getNewArrivals(6);

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="section-padding"
      style={{ backgroundColor: '#080A0C' }}
    >
      <div className="container-rnt">
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              ✦ Just Dropped
            </p>
            <h2
              id="new-arrivals-heading"
              className="display-md"
              style={{ color: '#F5F7F8' }}
            >
              NEW ARRIVALS
            </h2>
            <p style={{ color: '#9AA3AB', fontSize: '0.9375rem', marginTop: '0.5rem' }}>
              Fresh drops. Same energy.
            </p>
          </div>
          <Link
            href="/shop?filter=new"
            className="btn-outline"
            style={{ flexShrink: 0 }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div
          className="new-arrivals-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #new-arrivals .display-md {
            font-size: clamp(2rem, 8vw, 2.7rem);
          }
          #new-arrivals .btn-outline {
            width: 100%;
            justify-content: center;
          }
          .new-arrivals-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
