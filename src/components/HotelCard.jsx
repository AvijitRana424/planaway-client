export default function HotelCard({ name, location, rating, reviews, price, type, img }) {
  return (
    <div style={styles.card}>
      <div style={styles.imgBox}>{img}</div>
      <div style={styles.info}>
        <div style={styles.typeTag}>{type}</div>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.location}>📍 {location}</p>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>★ {rating}</span>
          <span style={styles.reviews}>({reviews} reviews)</span>
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.price}>{price}</div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>avg per night</p>
        <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Book</button>
        <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: 12, marginTop: 6, display: 'block', width: '100%' }}>View details</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '20px', display: 'flex', alignItems: 'center', gap: 20 },
  imgBox: { width: 80, height: 80, background: 'var(--chip-bg, rgba(255,255,255,0.04))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 },
  info: { flex: 1 },
  typeTag: { display: 'inline-block', background: 'var(--sky-dim)', border: '1px solid rgba(74,158,255,0.25)', borderRadius: 50, padding: '2px 10px', fontSize: 11, color: 'var(--sky)', marginBottom: 6 },
  name: { fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 },
  location: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 6 },
  stars: { color: 'var(--gold)', fontSize: 13, fontWeight: 500 },
  reviews: { fontSize: 12, color: 'var(--text-muted)' },
  right: { textAlign: 'right', flexShrink: 0 },
  price: { fontSize: 20, fontWeight: 600, fontFamily: 'Playfair Display, serif', color: 'var(--text-main)' },
};
