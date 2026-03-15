import { useState, useEffect } from "react";
import { config } from "../config";

export default function LandingPage({ onStart, theme, toggleTheme }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(0);
  const [typed, setTyped] = useState("");
  const [stars, setStars] = useState([]);

  const [flightSearch, setFlightSearch] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
    passengers: 1,
    travelClass: "Economy"
  });

  const DESTINATIONS = config.hero.searchPlaceholderDestinations;

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
  }, [placeholder, DESTINATIONS]);

  const handleTripSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onStart({ destination: query.trim(), tab: 'chat' });
  };

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    onStart({ destination: `Flight from ${flightSearch.from} to ${flightSearch.to}`, tab: 'flights' });
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
          <span style={styles.logoIcon}>{config.nav.logoIcon}</span>
          <span style={styles.logoText}>{config.nav.logoText}</span>
        </div>
        <div style={styles.navLinks}>
          <button onClick={toggleTheme} className="btn-ghost" style={{ fontSize: 16, padding: '6px 10px', borderRadius: '50%', border: 'none', marginRight: 4 }} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {config.nav.links.map(link => (
            <button key={link.id} className="btn-ghost" style={{ fontSize: 13 }}>{link.label}</button>
          ))}
          <button className="btn-primary" style={{ padding: '10px 22px', fontSize: 13 }}>{config.nav.primaryButton}</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        
        {/* Title */}
        <h1 style={styles.h1}>
          {config.hero.titleLine1}<br />
          <span style={styles.h1Gold}>{config.hero.titleLine2}</span>
        </h1>
        
        {/* Subtitle */}
        <p style={styles.subtitle}>
          {config.hero.subtitle}
        </p>

        {/* Small AI Trip Planner Banner */}
        <div style={styles.smallAiSearch}>
           <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
             <span style={{fontSize: 16, color: 'var(--brand-gold)'}}>✨</span>
             <span style={styles.smallAiText}>Plan your entire trip with AI</span>
           </div>
           <form onSubmit={handleTripSubmit} style={styles.smallSearchBar}>
              <span style={{fontSize: 14, color: '#94a3b8'}}>🌍</span>
              <input
                style={styles.smallSearchInput}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Try "Paris, France"`}
              />
           </form>
           <button type="submit" onClick={handleTripSubmit} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14, borderRadius: 8 }}>
             Plan my trip <span className="arrow">→</span>
           </button>
        </div>

        {/* Flight Search directly in Hero */}
        <div style={styles.flightBox}>
          
          <div style={styles.flightTabs}>
            <span style={styles.flightTabActive}>Round trip</span>
            <span style={styles.flightTabInactive}>One way</span>
          </div>

          <form onSubmit={handleFlightSubmit} style={styles.flightForm}>
            
            <div style={styles.flightGrid}>
               {/* Location Group */}
               <div style={styles.flightLocationGroup}>
                 <div style={styles.flightInputWrapper}>
                   <label style={styles.flightLabelBlue}>FROM</label>
                   <div style={styles.flightInputBlock}>
                     <span style={styles.inputIcon}>📍</span>
                     <input style={styles.flightInputInline} placeholder="City or airport" value={flightSearch.from} onChange={e => setFlightSearch({...flightSearch, from: e.target.value})} required/>
                   </div>
                 </div>

                 <div style={styles.flightSwapBtn}>⇄</div>

                 <div style={styles.flightInputWrapper}>
                   <label style={styles.flightLabelBlue}>TO</label>
                   <div style={styles.flightInputBlock}>
                     <span style={styles.inputIcon}>📍</span>
                     <input style={styles.flightInputInline} placeholder="City or airport" value={flightSearch.to} onChange={e => setFlightSearch({...flightSearch, to: e.target.value})} required/>
                   </div>
                 </div>
               </div>

               {/* Dates Group */}
               <div style={styles.flightDatesGroup}>
                 <div style={styles.flightInputWrapper}>
                   <label style={styles.flightLabelBlue}>DEPART</label>
                   <div style={styles.flightInputBlock}>
                     <span style={styles.inputIcon}>📅</span>
                     <input style={styles.flightInputInline} type="date" value={flightSearch.depart} onChange={e => setFlightSearch({...flightSearch, depart: e.target.value})} />
                   </div>
                 </div>

                 <div style={styles.flightInputWrapper}>
                   <label style={styles.flightLabelBlue}>RETURN</label>
                   <div style={styles.flightInputBlock}>
                     <span style={styles.inputIcon}>📅</span>
                     <input style={styles.flightInputInline} type="date" value={flightSearch.returnDate} onChange={e => setFlightSearch({...flightSearch, returnDate: e.target.value})} />
                   </div>
                 </div>
               </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <div style={styles.flightInputWrapper}>
                <div style={styles.flightInputBlock}>
                  <span style={styles.inputIcon}>👥</span>
                  <span style={{fontSize: 14, color: '#334155', fontWeight: 500}}>{flightSearch.passengers} Adult, Economy</span>
                </div>
              </div>
              
              <button type="submit" className="btn-primary" style={{ padding: '12px 28px', fontSize: 16, fontWeight: 600, borderRadius: 8, flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, maxWidth: 300 }}>
                🔍 Search Flights
              </button>
            </div>
            
          </form>
        </div>



        {/* Quick chips below search */}
        <div style={styles.chips}>
          {config.hero.quickChips.map(c => (
            <button key={c} onClick={() => onStart({ destination: c, tab: 'chat' })} style={styles.chip}>{c}</button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {config.features.map(f => (
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)' },
  stars: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 },
  orb: { position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', position: 'relative', zIndex: 10 },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: { color: 'var(--gold)', fontSize: 20 },
  logoText: { fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: 'var(--text-main)' },
  navLinks: { display: 'flex', gap: 12, alignItems: 'center' },
  hero: { textAlign: 'center', padding: '20px 24px 60px', position: 'relative', zIndex: 5 },
  badge: { display: 'inline-flex', alignItems: 'center', background: 'var(--gold-dim)', border: '1px solid var(--border-color)', borderRadius: 50, padding: '6px 16px', fontSize: 13, color: 'var(--text-main)', marginBottom: 28 },
  h1: { fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text-main)', marginBottom: 20 },
  h1Gold: { color: 'var(--text-main)' },
  
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 1.6, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' },

  smallAiSearch: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 40, background: '#f8faff', padding: '10px 10px 10px 24px', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', width: '90%', maxWidth: 700, margin: '0 auto 40px auto', flexWrap: 'wrap' },
  smallAiText: { fontSize: 15, color: '#1e293b', fontWeight: 500 },
  smallSearchBar: { display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 16px', flex: '1 1 200px' },
  smallSearchInput: { background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: '#0f172a', fontFamily: 'DM Sans, sans-serif', width: '100%' },

  flightBox: { maxWidth: 960, width: '90%', margin: '0 auto', position: 'relative', zIndex: 10, boxShadow: '0 10px 40px rgba(0,0,0,0.08)', borderRadius: 16, background: '#ffffff', padding: '32px 32px', textAlign: 'left' },
  flightTabs: { display: 'flex', gap: 24, marginBottom: 24, borderBottom: '1px solid transparent' },
  flightTabActive: { fontSize: 14, fontWeight: 600, color: '#2563eb', paddingBottom: 8, borderBottom: '2px solid #2563eb', cursor: 'pointer' },
  flightTabInactive: { fontSize: 14, fontWeight: 500, color: '#64748b', paddingBottom: 8, cursor: 'pointer' },

  flightForm: { display: 'flex', flexDirection: 'column', gap: 24 },
  flightGrid: { display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative', flexWrap: 'wrap', width: '100%' },
  
  flightLocationGroup: { display: 'flex', flex: '2 1 400px', gap: 16, position: 'relative', minWidth: 300 },
  flightDatesGroup: { display: 'flex', flex: '1.2 1 280px', gap: 16, minWidth: 280 },

  flightInputWrapper: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1, position: 'relative', minWidth: 0 },
  flightLabelBlue: { fontSize: 11, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' },
  
  flightInputBlock: { display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', gap: 10, width: '100%' },
  inputIcon: { fontSize: 16, color: '#94a3b8' },
  flightInputInline: { background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: '#0f172a', fontFamily: 'DM Sans, sans-serif', width: '100%', fontWeight: 500, minWidth: 50 },
  
  flightSwapBtn: { position: 'absolute', left: '50%', top: '34px', transform: 'translateX(-50%)', width: 32, height: 32, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, cursor: 'pointer', fontSize: 14, color: '#64748b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },

  chips: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
  chip: { background: 'var(--chip-bg)', border: '1px solid var(--border-color)', borderRadius: 50, padding: '8px 18px', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' },

  features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, padding: '40px 48px', position: 'relative', zIndex: 5 },
  featureCard: { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '28px 24px', transition: 'border-color 0.2s' },
  featureIcon: { fontSize: 28, marginBottom: 14 },
  featureTitle: { fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, marginBottom: 10, color: 'var(--text-main)' },
  featureDesc: { fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }
};

