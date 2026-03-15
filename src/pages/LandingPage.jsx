import { useState, useEffect } from "react";

const DESTINATIONS = ["Paris, France", "Tokyo, Japan", "Bali, Indonesia", "New York, USA", "Rome, Italy", "Barcelona, Spain"];

export default function LandingPage({ onStart, theme, toggleTheme }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(0);
  const [typed, setTyped] = useState("");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 3,
      dur: Math.random() * 2 + 2,
    }));
    setStars(arr);
  }, []);

  useEffect(() => {
    const dest = DESTINATIONS[placeholder % DESTINATIONS.length];
    let i = 0;
    setTyped("");
    const type = setInterval(() => {
      if (i <= dest.length) { setTyped(dest.slice(0, i)); i++; }
      else {
        clearInterval(type);
        setTimeout(() => setPlaceholder(p => p + 1), 1800);
      }
    }, 70);
    return () => clearInterval(type);
  }, [placeholder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onStart(query.trim());
  };

  return (
    <div style={styles.page}>
      {/* Starfield */}
      <svg style={styles.stars} viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map(s => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.size * 0.15}
            fill="white" opacity={0.4 + Math.random() * 0.4}>
            <animate attributeName="opacity" values="0.2;0.9;0.2"
              dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Glow orbs */}
      <div style={{ ...styles.orb, top: '10%', left: '15%', background: 'radial-gradient(circle, rgba(74,158,255,0.15) 0%, transparent 70%)', width: 500, height: 500 }} />
      <div style={{ ...styles.orb, bottom: '15%', right: '10%', background: 'radial-gradient(circle, rgba(240,180,41,0.1) 0%, transparent 70%)', width: 400, height: 400 }} />

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span style={styles.logoText}>MyScanner</span>
        </div>
        <div style={styles.navLinks}>
          <button onClick={toggleTheme} className="btn-ghost" style={{ fontSize: 16, padding: '6px 10px', borderRadius: '50%', border: 'none', marginRight: 4 }} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn-ghost" style={{ fontSize: 13 }}>How it works</button>
          <button className="btn-ghost" style={{ fontSize: 13 }}>Pricing</button>
          <button className="btn-primary" style={{ padding: '10px 22px', fontSize: 13 }}>Sign in</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.badge}>
          <span style={{ color: 'var(--gold)', marginRight: 6, animation: 'slideInRight 0.5s ease' }}>✦</span>
          AI-Powered Travel Planning
        </div>
        <h1 style={styles.h1}>
          Your entire trip,<br />
          <span style={styles.h1Gold}>planned in seconds.</span>
        </h1>
        <p style={styles.subtitle}>
          Don't just search for flights. Tell our AI where you want to go —<br />
          it handles flights, hotels, itinerary and hidden gems. All in one chat.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} style={styles.searchBar}>
          <span style={styles.searchIcon}>🌍</span>
          <input
            style={styles.searchInput}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Try "${typed}"`}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px 28px', flexShrink: 0 }}>
            Plan my trip <span className="arrow">→</span>
          </button>
        </form>

        {/* Quick chips */}
        <div style={styles.chips}>
          {["Europe 10 days", "Budget Asia trip", "Honeymoon Maldives", "Solo Japan"].map(c => (
            <button key={c} onClick={() => onStart(c)} style={styles.chip}>{c}</button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {[
          { icon: "🤖", title: "AI Tour Guide", desc: "Just type your destination. The bot asks your budget, style and dates — then builds your perfect trip." },
          { icon: "✈️", title: "Best Flight Finder", desc: "Compares hundreds of airlines in real time. Always finds the cheapest route, with layover options." },
          { icon: "🏨", title: "Hotel Matcher", desc: "Matches hotels to your travel style — boutique, budget, luxury — with real guest ratings." },
          { icon: "🗺️", title: "Smart Itinerary", desc: "Day-by-day plan with timings, transport tips, local food spots and things most tourists miss." },
        ].map(f => (
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        {[["2M+", "Trips planned"], ["180+", "Countries covered"], ["4.9★", "User rating"], ["₹0", "Planning fee"]].map(([n, l]) => (
          <div key={l} style={styles.stat}>
            <div style={styles.statNum}>{n}</div>
            <div style={styles.statLabel}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-main)' },
  stars: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 },
  orb: { position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', position: 'relative', zIndex: 10 },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: { color: 'var(--gold)', fontSize: 20 },
  logoText: { fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: 'var(--text-main)' },
  navLinks: { display: 'flex', gap: 12, alignItems: 'center' },
  hero: { textAlign: 'center', padding: '80px 24px 60px', position: 'relative', zIndex: 5 },
  badge: { display: 'inline-flex', alignItems: 'center', background: 'var(--gold-dim)', border: '1px solid var(--border-color)', borderRadius: 50, padding: '6px 16px', fontSize: 13, color: 'var(--text-main)', marginBottom: 28 },
  h1: { fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text-main)', marginBottom: 20 },
  h1Gold: { color: 'var(--text-main)' },
  subtitle: { fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40 },
  searchBar: { display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 60, padding: '8px 8px 8px 20px', maxWidth: 620, margin: '0 auto 20px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' },
  searchIcon: { fontSize: 20, flexShrink: 0 },
  searchInput: { flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text-main)', fontFamily: 'DM Sans, sans-serif', minWidth: 0 },
  chips: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
  chip: { background: 'var(--chip-bg)', border: '1px solid var(--border-color)', borderRadius: 50, padding: '8px 18px', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, padding: '40px 48px', position: 'relative', zIndex: 5 },
  featureCard: { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '28px 24px', transition: 'border-color 0.2s' },
  featureIcon: { fontSize: 28, marginBottom: 14 },
  featureTitle: { fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, marginBottom: 10, color: 'var(--text-main)' },
  featureDesc: { fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 },
  stats: { display: 'flex', justifyContent: 'center', gap: 60, padding: '40px 48px 60px', flexWrap: 'wrap', position: 'relative', zIndex: 5 },
  stat: { textAlign: 'center' },
  statNum: { fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: 'var(--gold)' },
  statLabel: { fontSize: 13, color: 'var(--text-muted)', marginTop: 4 },
};
