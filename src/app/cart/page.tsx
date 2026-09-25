'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/data/products';

export default function CartPage() {
  const cartStore = useCartStore();
  const { items } = cartStore;
  const subtotal = cartStore.subtotal();
  const shipping = cartStore.shippingCost();
  const total = cartStore.total();

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '0.5rem' }}>
          YOUR CART
        </h1>
        <p style={{ color: '#9AA3AB', fontSize: '0.9375rem', marginBottom: '3rem' }}>
          {items.length} item{items.length !== 1 ? 's' : ''} in your cart
        </p>

        {items.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '40vh',
              gap: '1.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: '#151A1F',
              border: '1px solid #283038',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShoppingBag size={40} style={{ color: '#283038' }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: '#F5F7F8', marginBottom: '0.5rem' }}>
                Your cart is empty
              </p>
              <p style={{ color: '#9AA3AB' }}>Start shopping to fill it up.</p>
            </div>
            <Link href="/shop" className="btn-primary">
              Start Shopping <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }} className="cart-grid">
            {/* Items */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      padding: '1.25rem',
                      backgroundColor: '#151A1F',
                      border: '1px solid #283038',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <Link href={`/product/${item.productSlug}`} style={{ flexShrink: 0 }}>
                      <div style={{ width: '100px', height: '80px', borderRadius: '0.25rem', overflow: 'hidden', backgroundColor: '#101418', position: 'relative' }}>
                        <Image src={item.image} alt={item.productName} fill style={{ objectFit: 'cover' }} sizes="100px" />
                      </div>
                    </Link>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.375rem' }}>
                        <Link href={`/product/${item.productSlug}`} style={{ textDecoration: 'none' }}>
                          <h3 style={{ color: '#F5F7F8', fontSize: '0.9375rem', fontWeight: 600 }}>{item.productName}</h3>
                        </Link>
                        <button
                          aria-label={`Remove ${item.productName}`}
                          onClick={() => cartStore.removeItem(item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9AA3AB', padding: '0.25rem', flexShrink: 0 }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p style={{ color: '#9AA3AB', fontSize: '0.8125rem', marginBottom: '0.875rem' }}>
                        {item.color.name} · UK {item.size.uk} · US {item.size.us}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #283038', borderRadius: '0.25rem', overflow: 'hidden' }}>
                          <button onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.4rem 0.625rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9AA3AB', display: 'flex', alignItems: 'center' }}>
                            <Minus size={13} />
                          </button>
                          <span style={{ padding: '0 0.5rem', color: '#F5F7F8', fontSize: '0.875rem', fontWeight: 600, minWidth: '28px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.4rem 0.625rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9AA3AB', display: 'flex', alignItems: 'center' }}>
                            <Plus size={13} />
                          </button>
                        </div>
                        <span style={{ color: '#F5F7F8', fontSize: '1rem', fontWeight: 700 }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '1.5rem' }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', color: '#F5F7F8', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>Subtotal ({cartStore.totalItems()} items)</span>
                    <span style={{ color: '#F5F7F8', fontSize: '0.875rem' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#C8FF00' : '#F5F7F8', fontSize: '0.875rem' }}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p style={{ color: '#9AA3AB', fontSize: '0.75rem', backgroundColor: 'rgba(200,255,0,0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', border: '1px solid rgba(200,255,0,0.1)' }}>
                      💡 Add {formatPrice(999 - subtotal)} more for free shipping
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #283038', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#F5F7F8', fontWeight: 700, fontSize: '1rem' }}>Total</span>
                  <span style={{ color: '#F5F7F8', fontWeight: 800, fontSize: '1.25rem' }}>{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  PROCEED TO CHECKOUT <ArrowRight size={14} />
                </Link>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem' }}>
                  {['Secure checkout', 'Easy returns', 'Free shipping above ₹999'].map(item => (
                    <p key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#9AA3AB', fontSize: '0.75rem' }}>
                      <span style={{ color: '#C8FF00', fontSize: '0.625rem' }}>✓</span> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
