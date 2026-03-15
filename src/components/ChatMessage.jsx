export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  const renderContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith("## ")) return <h3 key={i} style={styles.h3}>{line.replace("## ", "")}</h3>;
      if (line.startsWith("# ")) return <h2 key={i} style={styles.h2}>{line.replace("# ", "")}</h2>;
      // Bullet points
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return <div key={i} style={styles.bullet}>
          <span style={styles.bulletDot}>·</span>
          <span>{renderInline(line.replace(/^[-•] /, ""))}</span>
        </div>;
      }
      // Empty line = spacer
      if (line.trim() === "") return <div key={i} style={{ height: 6 }} />;
      // Normal paragraph
      return <p key={i} style={styles.para}>{renderInline(line)}</p>;
    });
  };

  const renderInline = (text) => {
    // Bold: **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**")
        ? <strong key={i} style={{ color: 'var(--text-main)', fontWeight: 500 }}>{p.slice(2, -2)}</strong>
        : p.startsWith("*") && p.endsWith("*")
        ? <em key={i} style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{p.slice(1, -1)}</em>
        : p
    );
  };

  return (
    <div style={{ ...styles.wrap, justifyContent: isUser ? "flex-end" : "flex-start", animation: "fadeUp 0.3s ease" }}>
      {!isUser && <div style={styles.avatar}>✦</div>}
      <div style={{ ...styles.bubble, ...(isUser ? styles.userBubble : styles.botBubble) }}>
        {isUser ? <p style={styles.para}>{content}</p> : renderContent(content)}
      </div>
      {isUser && <div style={styles.userAvatar}>👤</div>}
    </div>
  );
}

const styles = {
  wrap: { display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: '85%' },
  avatar: { width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid rgba(240,180,41,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--gold)', flexShrink: 0 },
  userAvatar: { width: 32, height: 32, borderRadius: '50%', background: 'var(--sky-dim)', border: '1px solid rgba(74,158,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 },
  bubble: { borderRadius: 16, padding: '14px 18px', lineHeight: 1.65, fontSize: 14, maxWidth: '100%' },
  botBubble: { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderTopLeftRadius: 4 },
  userBubble: { background: 'var(--sky-dim)', border: '1px solid rgba(74,158,255,0.25)', borderTopRightRadius: 4, color: 'var(--text-main)' },
  h2: { fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, marginTop: 6 },
  h3: { fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 600, color: 'var(--gold)', marginBottom: 6, marginTop: 8 },
  para: { fontSize: 14, color: 'var(--text-main)', lineHeight: 1.65, margin: 0 },
  bullet: { display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4 },
  bulletDot: { color: 'var(--gold)', fontWeight: 700, marginTop: 2, flexShrink: 0 },
};
