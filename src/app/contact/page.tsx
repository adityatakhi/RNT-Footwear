'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'nidurix.tech@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 94170 44971' },
  { icon: MapPin, label: 'Studio', value: 'Banjara Hills, Haydrabad, India' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container-rnt" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '700px', marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Contact</p>
          <h1 className="display-md" style={{ color: '#F5F7F8', marginBottom: '1rem' }}>We’d love to hear from you.</h1>
          <p style={{ color: '#9AA3AB', fontSize: '1rem', lineHeight: 1.8 }}>
            Whether you want size help, product advice, or partner support, our team is here to help.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.7rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', backgroundColor: 'rgba(200,255,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} style={{ color: '#C8FF00' }} />
                </div>
                <span style={{ color: '#9AA3AB', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
              </div>
              <p style={{ color: '#F5F7F8', fontSize: '1rem', fontWeight: 600 }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'stretch' }} className="contact-grid">
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#151A1F', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-grid">
                <label style={{ display: 'grid', gap: '0.5rem', color: '#F5F7F8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  First Name
                  <input type="text" required style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
                </label>
                <label style={{ display: 'grid', gap: '0.5rem', color: '#F5F7F8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Last Name
                  <input type="text" required style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
                </label>
              </div>

              <label style={{ display: 'grid', gap: '0.5rem', color: '#F5F7F8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Email
                <input type="email" required style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8' }} />
              </label>

              <label style={{ display: 'grid', gap: '0.5rem', color: '#F5F7F8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Message
                <textarea rows={5} required style={{ padding: '0.875rem 1rem', backgroundColor: '#080A0C', border: '1px solid #283038', borderRadius: '0.25rem', color: '#F5F7F8', resize: 'vertical' }} />
              </label>

              <button type="submit" className="btn-primary" style={{ width: 'fit-content', justifySelf: 'start' }}>
                Send Message <ArrowRight size={14} />
              </button>

              {submitted && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C8FF00', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Your message has been recorded successfully.
                </div>
              )}
            </div>
          </form>

          <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '0.5rem', padding: '2rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Hours</p>
            <div style={{ display: 'grid', gap: '0.75rem', color: '#9AA3AB', lineHeight: 1.7 }}>
              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p>Saturday: 10:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/shop" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid, .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
