'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';

export function CategoriesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="section-padding"
      style={{ backgroundColor: '#080A0C' }}
    >
      <div className="container-rnt">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Browse by Style</p>
          <h2 id="categories-heading" className="display-md" style={{ color: '#F5F7F8' }}>
            FIND YOUR PERFECT FIT
          </h2>
        </div>

        {/* Category grid — cinematic masonry-like layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: '1rem',
          }}
          className="cat-grid"
        >
          {CATEGORIES.map((cat, i) => {
            const isHovered = hoveredId === cat.id;
            // Make first and last cards wider
            const isFeature = i === 0 || i === 3;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                aria-label={`Shop ${cat.name} — ${cat.count} products`}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  display: 'block',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  backgroundColor: '#101418',
                  gridColumn: isFeature ? 'span 2' : 'span 1',
                  aspectRatio: isFeature ? '16/9' : '4/3',
                  cursor: 'pointer',
                }}
                className="cat-card"
              >
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={`${cat.name} shoes collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Dark overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? 'linear-gradient(to top, rgba(8,10,12,0.85) 0%, rgba(8,10,12,0.2) 60%)'
                      : 'linear-gradient(to top, rgba(8,10,12,0.7) 0%, rgba(8,10,12,0.1) 60%)',
                    transition: 'background 0.4s ease',
                  }}
                />

                {/* Text */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: isFeature ? '2rem' : '1.5rem',
                        textTransform: 'uppercase',
                        color: '#F5F7F8',
                        letterSpacing: '0.04em',
                        lineHeight: 1,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {cat.name}
                    </p>
                    <p
                      style={{
                        color: '#9AA3AB',
                        fontSize: '0.75rem',
                        opacity: isHovered ? 1 : 0.7,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {cat.count} style{cat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? '#C8FF00' : 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowRight
                      size={15}
                      style={{
                        color: isHovered ? '#080A0C' : '#F5F7F8',
                        transition: 'color 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cat-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .cat-card {
            grid-column: span 1 !important;
            aspect-ratio: 4/3 !important;
          }
        }
        @media (max-width: 480px) {
          .cat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
