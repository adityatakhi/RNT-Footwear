'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { formatPrice } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const isWishlisted = wishlistStore.isWishlisted(product.id);

  const selectedColor = product.colors[selectedColorIdx];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes.find(s => s.available);
    if (!defaultSize) return;
    setIsAdding(true);
    cartStore.addItem(product, selectedColor, defaultSize, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlistStore.toggleItem(product.id);
  };

  return (
    <article
      className="card-rnt"
      style={{ position: 'relative' }}
    >
      <Link
        href={`/product/${product.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {/* Image container */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            backgroundColor: '#101418',
          }}
        >
          {/* Badges */}
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
            }}
          >
            {product.isNew && (
              <span className="badge-accent">New</span>
            )}
            {product.comparePrice && (
              <span
                style={{
                  display: 'inline-flex',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'rgba(215, 168, 75, 0.1)',
                  color: '#D7A84B',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '0.125rem',
                  border: '1px solid rgba(215, 168, 75, 0.2)',
                }}
              >
                Sale
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlist}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              zIndex: 2,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(8, 10, 12, 0.7)',
              border: '1px solid rgba(40, 48, 56, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(20, 24, 28, 0.9)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(8, 10, 12, 0.7)')}
          >
            <Heart
              size={14}
              fill={isWishlisted ? '#C8FF00' : 'none'}
              color={isWishlisted ? '#C8FF00' : '#9AA3AB'}
            />
          </button>

          {/* Skeleton */}
          {!imageLoaded && (
            <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />
          )}

          <Image
            src={product.images[0]}
            alt={`${product.name} — premium ${product.category} shoe`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            style={{
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease, transform 0.5s ease',
            }}
            onLoad={() => setImageLoaded(true)}
            className="product-image"
          />

          {/* Quick add to cart overlay */}
          <div
            className="add-overlay"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0.75rem',
              background: 'linear-gradient(to top, rgba(8,10,12,0.95) 0%, transparent 100%)',
              transform: 'translateY(100%)',
              transition: 'transform 0.3s ease',
            }}
          >
            <button
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
              disabled={isAdding}
              style={{
                width: '100%',
                padding: '0.625rem',
                backgroundColor: isAdding ? '#A8D900' : '#C8FF00',
                color: '#080A0C',
                border: 'none',
                borderRadius: '0.125rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: isAdding ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                transition: 'background-color 0.2s ease',
              }}
            >
              <ShoppingBag size={13} />
              {isAdding ? 'Added!' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1rem' }}>
          {/* Category */}
          <p
            style={{
              color: '#9AA3AB',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            {product.category}
          </p>

          {/* Name */}
          <h3
            style={{
              color: '#F5F7F8',
              fontSize: '0.9375rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill={i < Math.floor(product.rating) ? '#D7A84B' : 'none'}
                  color="#D7A84B"
                />
              ))}
            </div>
            <span style={{ color: '#9AA3AB', fontSize: '0.75rem' }}>
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ color: '#F5F7F8', fontWeight: 700, fontSize: '1rem' }}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span
                  style={{
                    color: '#9AA3AB',
                    fontSize: '0.8125rem',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Color dots */}
            <div
              role="group"
              aria-label="Available colors"
              style={{ display: 'flex', gap: '4px' }}
            >
              {product.colors.slice(0, 4).map((color, i) => (
                <button
                  key={color.slug}
                  aria-label={color.name}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(i);
                  }}
                  title={color.name}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    border: selectedColorIdx === i
                      ? '2px solid #C8FF00'
                      : '1px solid #283038',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
              {product.colors.length > 4 && (
                <span style={{ color: '#9AA3AB', fontSize: '0.625rem', alignSelf: 'center' }}>
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Hover styles */}
      <style>{`
        article.card-rnt:hover .product-image {
          transform: scale(1.04);
        }
        article.card-rnt:hover .add-overlay {
          transform: translateY(0);
        }
      `}</style>
    </article>
  );
});
