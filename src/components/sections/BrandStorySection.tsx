import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BrandStorySection() {
  return (
    <section
      id="brand-story"
      aria-labelledby="brand-story-heading"
      className="section-padding"
      style={{
        backgroundColor: '#080A0C',
        position: 'relative',
        overflow: 'hidden',
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
          src="https://images.unsplash.com/photo-1539185441755-769473a23570?w=1600&q=80"
          alt="RNT Footwear brand story — athletes in motion"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.15 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(8,10,12,1) 30%, rgba(8,10,12,0.6) 100%)',
          }}
        />
      </div>

      <div className="container-rnt" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '640px' }}>
          <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>
            ✦ Our Story
          </p>
          <h2
            id="brand-story-heading"
            className="display-lg"
            style={{ color: '#F5F7F8', marginBottom: '2rem' }}
          >
            MORE THAN
            <br />
            <span style={{ color: '#C8FF00' }}>JUST</span> SHOES
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.75 }}>
              RNT FOOTWEAR was built on a single belief — that the right shoe changes everything. Not just how you move, but how you feel, how you compete, and how you carry yourself.
            </p>
            <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.75 }}>
              We design footwear for people who take their movement seriously. Whether you&apos;re pushing your personal best on the track, navigating the urban grid, or simply demanding more from your everyday shoes — RNT is built for that moment.
            </p>
            <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.75 }}>
              Every pair is engineered with precision materials, tested across real conditions, and designed to last beyond trends.
            </p>
          </div>
          <Link href="/about" className="btn-primary">
            Our Story <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid #283038',
            maxWidth: '640px',
          }}
          className="stats-grid"
        >
          {[
            { value: '50+', label: 'Styles Available' },
            { value: '4.7★', label: 'Avg. Rating' },
            { value: '30-Day', label: 'Easy Returns' },
          ].map(stat => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#C8FF00',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: '#9AA3AB', fontSize: '0.8125rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #brand-story .display-lg {
            font-size: clamp(2.2rem, 10vw, 3.3rem);
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.25rem;
          }
        }
        @media (max-width: 420px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
