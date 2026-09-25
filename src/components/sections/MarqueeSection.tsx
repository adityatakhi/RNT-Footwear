const MARQUEE_ITEMS = [
  'RNT FOOTWEAR',
  'PERFORMANCE ENGINEERED',
  'BUILT FOR MORE',
  'STYLE IN EVERY STEP',
  'NEXT GEN',
  'PREMIUM QUALITY',
];

export function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // duplicate for seamless loop

  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: '#C8FF00',
        overflow: 'hidden',
        padding: '0.875rem 0',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          width: 'max-content',
        }}
        className="animate-marquee"
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#080A0C',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            {item}
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(8,10,12,0.3)', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
