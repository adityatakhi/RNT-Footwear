import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getBestSellers } from '@/lib/data/products';

export function BestSellersSection() {
  const products = getBestSellers(4);

  return (
    <section
      id="best-sellers"
      aria-labelledby="best-sellers-heading"
      className="section-padding"
      style={{ backgroundColor: '#101418' }}
    >
      <div className="container-rnt">
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
              ✦ Community Favourites
            </p>
            <h2
              id="best-sellers-heading"
              className="display-md"
              style={{ color: '#F5F7F8' }}
            >
              BEST SELLERS
            </h2>
            <p style={{ color: '#9AA3AB', fontSize: '0.9375rem', marginTop: '0.5rem' }}>
              Loved by many.
            </p>
          </div>
          <Link href="/shop?filter=bestseller" className="btn-outline" style={{ flexShrink: 0 }}>
            Shop All <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
