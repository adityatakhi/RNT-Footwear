import Link from 'next/link';

interface InfoSection {
  heading: string;
  items: string[];
}

interface InfoPageProps {
  title: string;
  description: string;
  sections: InfoSection[];
}

export function InfoPage({ title, description, sections }: InfoPageProps) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#080A0C', paddingTop: '96px' }}>
      <div className="container-rnt" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>RNT Support</p>
          <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '1rem' }}>{title}</h1>
          <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>{description}</p>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {sections.map(section => (
              <section
                key={section.heading}
                style={{
                  backgroundColor: '#101418',
                  border: '1px solid #283038',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                }}
              >
                <h2 style={{ color: '#F5F7F8', fontSize: '1.2rem', marginBottom: '0.75rem' }}>{section.heading}</h2>
                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', margin: 0, padding: 0 }}>
                  {section.items.map(item => (
                    <li key={item} style={{ color: '#9AA3AB', lineHeight: 1.7, position: 'relative', paddingLeft: '1rem' }}>
                      <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '0.55rem', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C8FF00' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-primary">Continue Shopping</Link>
            <Link href="/contact" className="btn-outline">Contact Support</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
