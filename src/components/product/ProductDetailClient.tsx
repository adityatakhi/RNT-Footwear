'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingBag, Heart, ChevronRight, Shield, Truck, RotateCcw, Check } from 'lucide-react';
import { formatPrice } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product, ProductColor, ProductSize } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const router = useRouter();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const isWishlisted = wishlistStore.isWishlisted(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    setIsAdding(true);
    cartStore.addItem(product, selectedColor, selectedSize, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    cartStore.addItem(product, selectedColor, selectedSize, 1);
    router.push('/checkout');
  };

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <ol style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', listStyle: 'none', padding: 0, color: '#9AA3AB', fontSize: '0.8125rem' }}>
            <li><Link href="/" style={{ color: '#9AA3AB', textDecoration: 'none' }}>Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li><Link href="/shop" style={{ color: '#9AA3AB', textDecoration: 'none' }}>Shop</Link></li>
            <li><ChevronRight size={12} /></li>
            <li><Link href={`/shop?category=${product.category}`} style={{ color: '#9AA3AB', textDecoration: 'none', textTransform: 'capitalize' }}>{product.category}</Link></li>
            <li><ChevronRight size={12} /></li>
            <li style={{ color: '#F5F7F8' }}>{product.name}</li>
          </ol>
        </nav>

        {/* Product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="product-detail-grid"
        >
          {/* LEFT — Gallery */}
          <div>
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                backgroundColor: '#151A1F',
                border: '1px solid #283038',
                marginBottom: '0.75rem',
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} — view ${selectedImage + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={selectedImage === i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '0.25rem',
                    overflow: 'hidden',
                    border: `2px solid ${selectedImage === i ? '#C8FF00' : '#283038'}`,
                    cursor: 'pointer',
                    flexShrink: 0,
                    position: 'relative',
                    backgroundColor: '#151A1F',
                    transition: 'border-color 0.2s ease',
                    padding: 0,
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    sizes="72px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Product info */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {product.isNew && <span className="badge-accent">New Arrival</span>}
              {product.isBestSeller && (
                <span style={{
                  display: 'inline-flex',
                  padding: '0.2rem 0.6rem',
                  backgroundColor: 'rgba(215, 168, 75, 0.1)',
                  color: '#D7A84B',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '0.125rem',
                  border: '1px solid rgba(215, 168, 75, 0.2)',
                }}>
                  Best Seller
                </span>
              )}
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#F5F7F8',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#D7A84B' : 'none'} color="#D7A84B" />
                ))}
              </div>
              <span style={{ color: '#F5F7F8', fontSize: '0.9375rem', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <span style={{ color: '#F5F7F8', fontSize: '1.75rem', fontWeight: 800 }}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span style={{ color: '#9AA3AB', fontSize: '1.125rem', textDecoration: 'line-through' }}>
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {product.comparePrice && (
                <span style={{
                  padding: '0.15rem 0.5rem',
                  backgroundColor: 'rgba(215,168,75,0.1)',
                  color: '#D7A84B',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '0.125rem',
                }}>
                  {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="divider-rnt" style={{ marginBottom: '1.75rem' }} />

            {/* Color selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: '#F5F7F8', fontSize: '0.875rem', fontWeight: 600 }}>
                  Colour: <span style={{ color: '#9AA3AB', fontWeight: 400 }}>{selectedColor.name}</span>
                </span>
              </div>
              <div role="radiogroup" aria-label="Select colour" style={{ display: 'flex', gap: '0.625rem' }}>
                {product.colors.map(color => (
                  <button
                    key={color.slug}
                    role="radio"
                    aria-checked={selectedColor.slug === color.slug}
                    aria-label={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: selectedColor.slug === color.slug ? '2px solid #C8FF00' : '2px solid #283038',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                      transform: selectedColor.slug === color.slug ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: selectedColor.slug === color.slug ? '0 0 0 3px rgba(200,255,0,0.15)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: sizeError ? '#ef4444' : '#F5F7F8', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s ease' }}>
                  {sizeError ? '⚠ Please select a size' : 'Select Size (UK)'}
                </span>
                <button
                  style={{ color: '#C8FF00', fontSize: '0.75rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Size Guide
                </button>
              </div>
              <div
                role="radiogroup"
                aria-label="Select size"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
              >
                {product.sizes.map(size => (
                  <button
                    key={size.uk}
                    role="radio"
                    aria-checked={selectedSize?.uk === size.uk}
                    aria-label={`UK ${size.uk}`}
                    disabled={!size.available}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    style={{
                      width: '52px',
                      height: '46px',
                      borderRadius: '0.25rem',
                      border: !size.available ? '1px solid #1e262e'
                        : selectedSize?.uk === size.uk ? '2px solid #C8FF00'
                        : `1px solid ${sizeError ? 'rgba(239,68,68,0.4)' : '#283038'}`,
                      backgroundColor: selectedSize?.uk === size.uk ? 'rgba(200,255,0,0.08)' : 'transparent',
                      color: !size.available ? '#283038' : selectedSize?.uk === size.uk ? '#C8FF00' : '#9AA3AB',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: size.available ? 'pointer' : 'not-allowed',
                      textDecoration: !size.available ? 'line-through' : 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                  >
                    {size.uk}
                    {selectedSize?.uk === size.uk && (
                      <span style={{ position: 'absolute', top: '2px', right: '2px' }}>
                        <Check size={8} style={{ color: '#C8FF00' }} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {product.features.map(feat => (
                <span
                  key={feat}
                  style={{
                    padding: '0.3rem 0.75rem',
                    backgroundColor: '#101418',
                    border: '1px solid #283038',
                    borderRadius: '2rem',
                    color: '#9AA3AB',
                    fontSize: '0.75rem',
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem' }}
              >
                {isAdding ? (
                  <>
                    <Check size={16} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> ADD TO CART
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-outline"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem' }}
              >
                BUY NOW
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => wishlistStore.toggleItem(product.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isWishlisted ? '#C8FF00' : '#9AA3AB',
                fontSize: '0.8125rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                padding: '0.25rem 0',
              }}
            >
              <Heart size={15} fill={isWishlisted ? '#C8FF00' : 'none'} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            {/* Delivery promises */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                marginTop: '1.75rem',
                padding: '1.25rem',
                backgroundColor: '#101418',
                border: '1px solid #283038',
                borderRadius: '0.375rem',
              }}
            >
              {[
                { Icon: Truck, text: 'Free delivery on orders above ₹999' },
                { Icon: Shield, text: 'Genuine product, quality guaranteed' },
                { Icon: RotateCcw, text: '30-day easy returns & exchanges' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={15} style={{ color: '#C8FF00', flexShrink: 0 }} />
                  <span style={{ color: '#9AA3AB', fontSize: '0.8125rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs — Description / Specs / Reviews */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #283038', marginBottom: '2rem' }}>
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.875rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab ? '#C8FF00' : 'transparent'}`,
                  color: activeTab === tab ? '#F5F7F8' : '#9AA3AB',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  marginBottom: '-1px',
                }}
              >
                {tab === 'specs' ? 'Specifications' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && <span style={{ marginLeft: '0.375rem', color: '#9AA3AB', fontSize: '0.75rem' }}>({product.reviewCount})</span>}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'description' && (
            <div style={{ maxWidth: '680px' }}>
              <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.8 }}>{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ maxWidth: '480px' }}>
              {product.specifications.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.875rem 0',
                    borderBottom: i < product.specifications.length - 1 ? '1px solid #283038' : 'none',
                  }}
                >
                  <span style={{ color: '#9AA3AB', fontSize: '0.875rem' }}>{spec.label}</span>
                  <span style={{ color: '#F5F7F8', fontSize: '0.875rem', fontWeight: 500 }}>{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {product.reviews.map(review => (
                <div
                  key={review.id}
                  style={{
                    padding: '1.25rem',
                    backgroundColor: '#151A1F',
                    border: '1px solid #283038',
                    borderRadius: '0.375rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#F5F7F8', fontSize: '0.875rem', fontWeight: 600 }}>{review.author}</span>
                      {review.verified && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#C8FF00', fontSize: '0.6875rem', fontWeight: 600 }}>
                          <Check size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <span style={{ color: '#9AA3AB', fontSize: '0.75rem' }}>
                      {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1px', marginBottom: '0.625rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill={i < review.rating ? '#D7A84B' : 'none'} color="#D7A84B" />
                    ))}
                  </div>
                  <p style={{ color: '#F5F7F8', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}>{review.title}</p>
                  <p style={{ color: '#9AA3AB', fontSize: '0.875rem', lineHeight: 1.6 }}>{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <h2 className="display-md" style={{ color: '#F5F7F8', marginBottom: '2rem' }}>
              YOU MAY ALSO LIKE
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
