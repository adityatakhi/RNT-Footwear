'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlistStore } from '@/lib/store/wishlist';
import type { Product } from '@/types';

export default function WishlistPage() {
  const wishlistIds = useWishlistStore(state => state.ids);
  const removeItem = useWishlistStore(state => state.removeItem);
  const clearWishlist = useWishlistStore(state => state.clear);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (!active) return;

        const allProducts = data.products ?? [];
        setProducts(allProducts.filter((product: Product) => wishlistIds.includes(product.id)));
      } catch {
        if (!active) return;
        setProducts([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProducts();
    return () => {
      active = false;
    };
  }, [wishlistIds]);

  const wishlistProducts = useMemo(
    () => products.filter(product => wishlistIds.includes(product.id)),
    [products, wishlistIds]
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080A0C', paddingTop: '92px' }}>
      <div className="container-rnt" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #283038',
                backgroundColor: '#101418',
                color: '#F5F7F8',
                textDecoration: 'none',
              }}
              aria-label="Back to shop"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>Saved picks</p>
              <h1 className="display-md" style={{ color: '#F5F7F8' }}>Wishlist</h1>
            </div>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#151A1F',
                border: '1px solid #283038',
                borderRadius: '0.25rem',
                color: '#F5F7F8',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              <Trash2 size={14} /> Clear all
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ color: '#9AA3AB', fontSize: '0.9rem' }}>Loading wishlist...</div>
        ) : wishlistProducts.length === 0 ? (
          <div
            style={{
              display: 'grid',
              gap: '1.25rem',
              justifyItems: 'center',
              textAlign: 'center',
              padding: '4rem 1rem',
              border: '1px solid #283038',
              borderRadius: '1rem',
              backgroundColor: '#101418',
            }}
          >
            <div
              style={{
                width: '82px',
                height: '82px',
                borderRadius: '50%',
                backgroundColor: 'rgba(200,255,0,0.08)',
                border: '1px solid rgba(200,255,0,0.2)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Heart size={28} fill="#C8FF00" color="#C8FF00" />
            </div>
            <div>
              <h2 style={{ color: '#F5F7F8', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>Your wishlist is empty</h2>
              <p style={{ color: '#9AA3AB', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
                Save the pairs you love and keep them ready for your next checkout.
              </p>
              <Link href="/shop" className="btn-primary">
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="wishlist-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {wishlistProducts.map(product => (
              <div key={product.id} style={{ position: 'relative' }}>
                <ProductCard product={product} />
                <button
                  type="button"
                  aria-label={`Remove ${product.name} from wishlist`}
                  onClick={() => removeItem(product.id)}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    zIndex: 5,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(8,10,12,0.8)',
                    border: '1px solid rgba(40,48,56,0.8)',
                    color: '#C8FF00',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
