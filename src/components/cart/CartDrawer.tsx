'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/data/products';

export function CartDrawer() {
  const items = useCartStore(state => state.items);
  const isOpen = useCartStore(state => state.isOpen);
  const subtotal = useCartStore(state => state.subtotal());
  const shipping = useCartStore(state => state.shippingCost());
  const total = useCartStore(state => state.total());
  const closeCart = useCartStore(state => state.closeCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const totalItems = useCartStore(state => state.totalItems());

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => closeCart()}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 10, 12, 0.75)',
            zIndex: 70,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        aria-hidden={!isOpen}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#101418',
          borderLeft: '1px solid #283038',
          zIndex: 71,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #283038',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingBag size={18} style={{ color: '#C8FF00' }} />
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#F5F7F8',
              }}
            >
              Cart
              {items.length > 0 && (
                <span
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.1rem 0.5rem',
                    backgroundColor: '#C8FF00',
                    color: '#080A0C',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    borderRadius: '0.125rem',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            aria-label="Close cart"
            onClick={() => closeCart()}
            style={{
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9AA3AB',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0.25rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F7F8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: items.length > 0 ? '1rem 1.5rem' : 0,
          }}
          data-lenis-prevent
        >
          {items.length === 0 ? (
            /* Empty state */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '1.5rem',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#151A1F',
                  border: '1px solid #283038',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={32} style={{ color: '#283038' }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#F5F7F8',
                    marginBottom: '0.5rem',
                  }}
                >
                  Your cart is empty
                </p>
                <p style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>
                  Add your favourite shoes to get started
                </p>
              </div>
              <button
                onClick={() => closeCart()}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <li
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '0.875rem',
                    padding: '0.875rem',
                    backgroundColor: '#151A1F',
                    border: '1px solid #283038',
                    borderRadius: '0.375rem',
                  }}
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.productSlug}`}
                    onClick={() => closeCart()}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '0.25rem',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#101418',
                      display: 'block',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={72}
                      height={72}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </Link>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/product/${item.productSlug}`}
                      onClick={() => closeCart()}
                      style={{ textDecoration: 'none' }}
                    >
                      <p
                        style={{
                          color: '#F5F7F8',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          marginBottom: '0.25rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.productName}
                      </p>
                    </Link>
                    <p style={{ color: '#9AA3AB', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      {item.color.name} · UK {item.size.uk}
                    </p>

                    {/* Quantity + price row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0',
                          border: '1px solid #283038',
                          borderRadius: '0.25rem',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            padding: '0.3rem 0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9AA3AB',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.2s',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            padding: '0 0.5rem',
                            color: '#F5F7F8',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            minWidth: '24px',
                            textAlign: 'center',
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            padding: '0.3rem 0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9AA3AB',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.2s',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: '#F5F7F8', fontSize: '0.9375rem', fontWeight: 700 }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          aria-label={`Remove ${item.productName} from cart`}
                          onClick={() => removeItem(item.id)}
                          style={{
                            padding: '0.25rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#9AA3AB',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '0.125rem',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — totals + CTA */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid #283038',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {/* Order summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>Subtotal</span>
                <span style={{ color: '#F5F7F8', fontSize: '0.875rem' }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#C8FF00' : '#F5F7F8', fontSize: '0.875rem' }}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ color: '#9AA3AB', fontSize: '0.75rem' }}>
                  Add {formatPrice(999 - subtotal)} more for free shipping
                </p>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid #283038',
                }}
              >
                <span style={{ color: '#F5F7F8', fontSize: '1rem', fontWeight: 600 }}>Total</span>
                <span style={{ color: '#F5F7F8', fontSize: '1rem', fontWeight: 700 }}>
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => closeCart()}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              PROCEED TO CHECKOUT <ArrowRight size={14} />
            </Link>
            <Link
              href="/cart"
              onClick={() => closeCart()}
              style={{
                textAlign: 'center',
                color: '#9AA3AB',
                fontSize: '0.8125rem',
                textDecoration: 'none',
                padding: '0.5rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F7F8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
