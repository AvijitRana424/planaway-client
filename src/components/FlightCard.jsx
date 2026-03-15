export function FlightCard({ airline, from, to, duration, stops, price, badge, logo }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardLeft}>
        <div style={styles.airline}>
          <span style={{ fontSize: 20 }}>{logo}</span>
          <span style={styles.airlineName}>{airline}</span>
        </div>
        <div style={styles.route}>
          <span style={styles.airport}>{from}</span>
          <div style={styles.routeLine}>
            <span style={styles.duration}>{duration}</span>
            <div style={styles.line}>
              <div style={styles.dot} />
              <div style={styles.lineBar} />
              <div style={styles.planeIcon}>✈</div>
              <div style={styles.lineBar} />
              <div style={styles.dot} />
            </div>
            <span style={styles.stops}>{stops}</span>
          </div>
          <span style={styles.airport}>{to}</span>
        </div>
      </div>
      <div style={styles.cardRight}>
        {badge && <div style={styles.badge}>{badge}</div>}
        <div style={styles.price}>{price}</div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>per person</p>
        <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Select</button>
      </div>
    </div>
  );
}

export default FlightCard;

const styles = {
  card: { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, transition: 'border-color 0.2s' },
  cardLeft: { flex: 1 },
  airline: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 },
  airlineName: { fontSize: 14, fontWeight: 500, color: 'var(--text-main)' },
  route: { display: 'flex', alignItems: 'center', gap: 12 },
  airport: { fontSize: 22, fontWeight: 600, fontFamily: 'Playfair Display, serif', color: 'var(--text-main)' },
  routeLine: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 },
  duration: { fontSize: 11, color: 'var(--text-muted)' },
  line: { display: 'flex', alignItems: 'center', gap: 4, width: '100%' },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 },
  lineBar: { flex: 1, height: 1, background: 'var(--border-color)' },
  planeIcon: { fontSize: 12, color: 'var(--sky)', flexShrink: 0 },
  stops: { fontSize: 11, color: 'var(--text-muted)' },
  cardRight: { textAlign: 'right', flexShrink: 0 },
  badge: { display: 'inline-block', background: 'var(--gold-dim)', border: '1px solid rgba(240,180,41,0.3)', borderRadius: 50, padding: '3px 10px', fontSize: 11, color: 'var(--gold)', marginBottom: 8 },
  price: { fontSize: 22, fontWeight: 600, fontFamily: 'Playfair Display, serif', color: 'var(--text-main)' },
};
