'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Zap, Wind, Layers } from 'lucide-react';
import { formatPrice } from '@/lib/data/products';

const HERO_PRODUCT = {
  name: 'RNT Runner 01',
  price: 6999,
  currency: 'INR',
  rating: 4.8,
  slug: 'rnt-runner-01',
  features: ['Breathable Mesh', 'Lightweight', 'Cushion Foam'],
};

const FEATURE_ICONS = [Wind, Zap, Layers];

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRef.current.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / (heroHeight * 0.8));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shoeScale = 1.18 + scrollProgress * 0.08;
  const shoeY = scrollProgress * -12;
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const textY = scrollProgress * -24;

  return (
    <section
      ref={heroRef}
      aria-label="Hero — Next Gen Footwear"
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: '#080A0C',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(200,255,0,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 30% 60%, rgba(215,168,75,0.03) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(40, 48, 56, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 48, 56, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      <div className="container-rnt" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            alignItems: 'center',
            gap: '1.5rem',
            minHeight: '100svh',
            paddingTop: '80px',
            paddingBottom: '2rem',
          }}
          className="hero-grid"
        >
          <div
            style={{
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              transition: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              maxWidth: '420px',
            }}
          >
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>
              ✦ Next Gen Footwear
            </div>

            <h1
              className="display-xl"
              style={{
                color: '#F5F7F8',
                marginBottom: '0.7rem',
                maxWidth: '390px',
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(3.1rem, 5vw, 5.6rem)',
              }}
            >
              Make
              <br />
              <span style={{ color: '#C8FF00' }}>every step</span>
              <br />
              feel easier.
            </h1>

            <p
              style={{
                color: '#9AA3AB',
                fontSize: '0.92rem',
                lineHeight: 1.55,
                maxWidth: '290px',
                marginBottom: '1.8rem',
              }}
            >
              Precision-built footwear for daily movement,
              <br />
              training, and the pace of real life.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link
                href={`/product/${HERO_PRODUCT.slug}`}
                className="btn-primary"
                style={{ fontSize: '0.8125rem' }}
              >
                SHOP NOW <ArrowRight size={14} />
              </Link>
              <Link href="/shop" className="btn-outline">
                VIEW ALL
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid #283038',
                width: '100%',
                maxWidth: '390px',
              }}
            >
              <div>
                <p className="eyebrow" style={{ color: '#9AA3AB', marginBottom: '0.25rem' }}>Product</p>
                <p style={{ color: '#F5F7F8', fontWeight: 600, fontSize: '0.9375rem' }}>
                  {HERO_PRODUCT.name}
                </p>
              </div>
              <div>
                <p className="eyebrow" style={{ color: '#9AA3AB', marginBottom: '0.25rem' }}>Price</p>
                <p style={{ color: '#C8FF00', fontWeight: 700, fontSize: '0.9375rem' }}>
                  {formatPrice(HERO_PRODUCT.price)}
                </p>
              </div>
              <div>
                <p className="eyebrow" style={{ color: '#9AA3AB', marginBottom: '0.25rem' }}>Rating</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={13} fill="#D7A84B" color="#D7A84B" />
                  <span style={{ color: '#F5F7F8', fontWeight: 600, fontSize: '0.9375rem' }}>
                    {HERO_PRODUCT.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '30%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(200,255,0,0.12) 0%, transparent 70%)',
                filter: 'blur(24px)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                width: '100%',
                maxWidth: '820px',
                position: 'relative',
                transform: `scale(${shoeScale}) translateY(${shoeY}px)`,
                transition: 'none',
                marginRight: '-2rem',
              }}
            >
              <div style={{ position: 'relative', width: '100%', paddingBottom: '54%' }}>
                <Image
                  src="/hero_shoe.png"
                  alt={`${HERO_PRODUCT.name} hero image`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  quality={90}
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    borderRadius: '0.75rem',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {HERO_PRODUCT.features.map((feat, i) => {
                const Icon = FEATURE_ICONS[i] ?? Wind;
                return (
                  <span
                    key={feat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.3rem 0.75rem',
                      backgroundColor: '#101418',
                      border: '1px solid #283038',
                      borderRadius: '2rem',
                      color: '#9AA3AB',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    <Icon size={12} style={{ color: '#C8FF00' }} />
                    {feat}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 1 - scrollProgress * 3,
        }}
      >
        <span style={{ color: '#9AA3AB', fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, #C8FF00, transparent)',
            animation: 'fadeInUp 1s ease infinite alternate',
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 100px !important;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
