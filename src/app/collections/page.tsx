import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function CollectionsPage() {
  const featured = PRODUCTS.filter(product => product.isFeatured || product.isBestSeller).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Curated Collections</p>
            <h1 className="display-md" style={{ color: '#F5F7F8' }}>Find Your Fit</h1>
          </div>
          <Link href="/shop" className="btn-outline">
            Shop All
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '5rem' }}>
          {CATEGORIES.map(category => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              style={{
                textDecoration: 'none',
                display: 'block',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid #283038',
                backgroundColor: '#151A1F',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,10,12,0.8), transparent)' }} />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <p style={{ color: '#F5F7F8', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1 }}>
                      {category.name}
                    </p>
                    <p style={{ color: '#9AA3AB', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                      {category.count} styles
                    </p>
                  </div>
                  <span style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#C8FF00', color: '#080A0C', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <h2 className="display-md" style={{ color: '#F5F7F8' }}>Featured Picks</h2>
            <Link href="/shop" style={{ color: '#C8FF00', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              View all <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
