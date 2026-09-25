import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const EDITORIAL_SECTIONS = [
  {
    id: 'performance',
    eyebrow: 'Performance Engineering',
    title: 'ENGINEERED\nFOR\nPERFORMANCE',
    body: 'Every component of RNT footwear is precision-engineered to help you push beyond limits. From responsive midsoles to adaptive mesh uppers — built for those who demand more.',
    cta: { label: 'LEARN MORE', href: '/about' },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=85',
    align: 'left' as const,
  },
  {
    id: 'lifestyle',
    eyebrow: 'Lifestyle Collection',
    title: 'STYLE\nIN EVERY\nSTEP',
    body: 'From the gym floor to the city streets, RNT lifestyle shoes are crafted for those who refuse to compromise between performance and aesthetics.',
    cta: { label: 'SHOP LIFESTYLE', href: '/shop?category=lifestyle' },
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=85',
    align: 'right' as const,
  },
];

export function EditorialSections() {
  return (
    <div style={{ backgroundColor: '#080A0C' }}>
      {EDITORIAL_SECTIONS.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`editorial-heading-${section.id}`}
          style={{
            position: 'relative',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: idx % 2 === 0 ? '#080A0C' : '#101418',
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={section.image}
              alt={`RNT Footwear ${section.eyebrow}`}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: section.align === 'left' ? 'right center' : 'left center',
                opacity: 0.25,
              }}
            />
          </div>

          {/* Content overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: section.align === 'left'
                ? 'linear-gradient(to right, rgba(8,10,12,0.98) 40%, rgba(8,10,12,0.4) 100%)'
                : 'linear-gradient(to left, rgba(8,10,12,0.98) 40%, rgba(8,10,12,0.4) 100%)',
              zIndex: 1,
            }}
          />

          <div className="container-rnt" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '6rem 0' }}>
            <div
              style={{
                maxWidth: '520px',
                marginLeft: section.align === 'right' ? 'auto' : undefined,
                textAlign: 'left',
              }}
              className="container-rnt"
            >
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>
                ✦ {section.eyebrow}
              </p>
              <h2
                id={`editorial-heading-${section.id}`}
                className="display-lg"
                style={{
                  color: '#F5F7F8',
                  marginBottom: '1.5rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.title.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {i === 1 ? <span style={{ color: '#C8FF00' }}>{line}</span> : line}
                  </span>
                ))}
              </h2>
              <p
                style={{
                  color: '#9AA3AB',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: '400px',
                }}
              >
                {section.body}
              </p>
              <Link href={section.cta.href} className="btn-primary">
                {section.cta.label} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Accent line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              [section.align]: 0,
              width: '3px',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, #C8FF00, transparent)',
              opacity: 0.4,
            }}
          />
        </section>
      ))}
    </div>
  );
}
