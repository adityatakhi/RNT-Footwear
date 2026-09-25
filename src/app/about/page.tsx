import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const VALUES = [
  {
    title: 'Performance First',
    description: 'Every RNT design is developed around how real people move, train, recover, and perform.' ,
  },
  {
    title: 'Built to Last',
    description: 'We use resilient materials, tested construction, and practical design details that hold up beyond trends.',
  },
  {
    title: 'Made for Everyday Motion',
    description: 'From first mile to last meeting, our shoes are made to move naturally through every layer of your life.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>About RNT</p>
          <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '1.25rem' }}>Built for the next stride.</h1>
          <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.8 }}>
            RNT FOOTWEAR was founded with a simple mission: create footwear that helps you move better,
            feel more confident, and stay comfortable from the first step to the final push. We combine
            technical performance, refined design, and everyday practicality to deliver shoes that work as
            hard as you do.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {VALUES.map(value => (
            <div key={value.title} style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <p style={{ color: '#C8FF00', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Core Value
              </p>
              <h2 style={{ color: '#F5F7F8', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{value.title}</h2>
              <p style={{ color: '#9AA3AB', lineHeight: 1.7 }}>{value.description}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }} className="about-grid">
          <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Our Philosophy</p>
            <p style={{ color: '#9AA3AB', lineHeight: 1.8 }}>
              We believe good footwear should feel effortless. Our products are engineered to support your rhythm,
              fit naturally, and look elevated enough for everyday life. Performance details matter, but comfort and
              confidence matter even more.
            </p>
          </div>
          <div style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <p style={{ color: '#F5F7F8', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Designed for movement.</p>
            <p style={{ color: '#9AA3AB', lineHeight: 1.7 }}>Running. Training. Everyday wear. Built around your pace.</p>
          </div>
        </div>

        <Link href="/shop" className="btn-primary">
          Explore Collection <ArrowRight size={14} />
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
