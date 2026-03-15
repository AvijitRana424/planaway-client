import { useState, useEffect, useRef } from "react";
import { sendMessage } from "../services/aiService";
import ChatMessage from "../components/ChatMessage";
import FlightCard from "../components/FlightCard";
import HotelCard from "../components/HotelCard";

const QUICK_REPLIES = [
  "What's the cheapest time to fly?",
  "Show me budget hotels",
  "What are hidden gems to visit?",
  "Build me a full itinerary",
  "What visa do I need?",
  "Best local food to try?",
];

const MOCK_FLIGHTS = [
  { airline: "IndiGo", from: "DEL", to: "CDG", duration: "9h 45m", stops: "1 stop", price: "₹42,500", badge: "Best value", logo: "🔵" },
  { airline: "Air France", from: "DEL", to: "CDG", duration: "8h 20m", stops: "Direct", price: "₹68,200", badge: "Fastest", logo: "🔴" },
  { airline: "Emirates", from: "DEL", to: "CDG", duration: "10h 55m", stops: "1 stop DXB", price: "₹38,900", badge: "Cheapest", logo: "🟡" },
];

const MOCK_HOTELS = [
  { name: "Hotel Le Marais", location: "Central Paris", rating: 4.8, reviews: "2.1k", price: "₹8,200/night", type: "Boutique", img: "🏛️" },
  { name: "Ibis Paris Centre", location: "Near Eiffel Tower", rating: 4.4, reviews: "5.6k", price: "₹3,800/night", type: "Budget", img: "🏨" },
  { name: "Hôtel Lutetia", location: "Saint-Germain", rating: 4.9, reviews: "890", price: "₹24,000/night", type: "Luxury", img: "✨" },
];

export default function TripPlannerPage({ initialDestination, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [destination, setDestination] = useState(initialDestination || "");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialDestination) {
      const firstMsg = { role: "user", content: `I want to visit ${initialDestination}` };
      setMessages([firstMsg]);
      fetchAI([firstMsg]);
    } else {
      setMessages([{
        role: "assistant",
        content: "✦ Welcome to MyScanner! I'm your personal AI travel guide.\n\nTell me where you'd like to go — even something vague like *\"a beach holiday under ₹60,000\"* or *\"10 days in Europe\"* — and I'll plan your entire trip: flights, hotels, itinerary and hidden gems. 🌍\n\nWhere are we headed?"
      }]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchAI = async (msgs) => {
    setLoading(true);
    try {
      const reply = await sendMessage(msgs);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      if (msgs.length <= 2 && initialDestination) setDestination(initialDestination);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I had trouble connecting. Please try again! 🙏" }]);
    } finally {
      setLoading(false);
    }
  };

  const send = (text) => {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content }];
    setMessages(newMsgs);
    fetchAI(newMsgs);
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={{ color: 'var(--gold)' }}>✦</span> MyScanner
        </div>

        <button onClick={onBack} style={styles.newTrip}>+ New trip</button>

        <div style={styles.sidebarSection}>
          <div style={styles.sidebarLabel}>Navigation</div>
          {[
            { id: "chat", icon: "💬", label: "AI Guide" },
            { id: "flights", icon: "✈️", label: "Flights" },
            { id: "hotels", icon: "🏨", label: "Hotels" },
            { id: "itinerary", icon: "🗺️", label: "Itinerary" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ ...styles.sidebarTab, ...(activeTab === tab.id ? styles.sidebarTabActive : {}) }}>
              <span style={{ fontSize: 16 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.sidebarLabel}>Trip details</div>
          <div style={styles.tripMeta}>
            <div style={styles.tripMetaItem}>
              <span style={styles.tripMetaIcon}>📍</span>
              <span>{destination || "Not set yet"}</span>
            </div>
            <div style={styles.tripMetaItem}>
              <span style={styles.tripMetaIcon}>📅</span>
              <span>Flexible dates</span>
            </div>
            <div style={styles.tripMetaItem}>
              <span style={styles.tripMetaIcon}>👤</span>
              <span>1 traveller</span>
            </div>
          </div>
        </div>

        <div style={styles.sidebarFooter}>
          <div style={styles.aiBadge}>
            <span>✦</span> Powered by Claude AI
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.headerTitle}>
              {activeTab === "chat" ? "AI Travel Guide" :
               activeTab === "flights" ? "Flights" :
               activeTab === "hotels" ? "Hotels" : "Itinerary"}
            </h2>
            {destination && <p style={styles.headerSub}>Planning your trip to {destination}</p>}
          </div>
          <div style={styles.headerTabs}>
            {[
              { id: "chat", label: "💬 Chat" },
              { id: "flights", label: "✈️ Flights" },
              { id: "hotels", label: "🏨 Hotels" },
              { id: "itinerary", label: "🗺️ Itinerary" },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ ...styles.headerTab, ...(activeTab === t.id ? styles.headerTabActive : {}) }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div style={styles.chatArea}>
            <div style={styles.messages}>
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} content={m.content} />
              ))}
              {loading && (
                <div style={styles.typing}>
                  <span style={styles.typingDot} />
                  <span style={{ ...styles.typingDot, animationDelay: "0.15s" }} />
                  <span style={{ ...styles.typingDot, animationDelay: "0.3s" }} />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div style={styles.quickReplies}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => send(q)} disabled={loading} style={styles.quickReply}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={styles.inputBar}>
              <input
                ref={inputRef}
                style={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask anything about your trip..."
                disabled={loading}
              />
              <button onClick={() => send()} disabled={loading || !input.trim()} className="btn-primary"
                style={{ padding: "12px 24px", opacity: (loading || !input.trim()) ? 0.5 : 1 }}>
                Send ↑
              </button>
            </div>
          </div>
        )}

        {/* FLIGHTS TAB */}
        {activeTab === "flights" && (
          <div style={styles.cardsArea}>
            <div style={styles.filterBar}>
              {["All", "Cheapest", "Fastest", "Direct only"].map(f => (
                <button key={f} style={{ ...styles.filterChip, ...(f === "All" ? styles.filterChipActive : {}) }}>{f}</button>
              ))}
            </div>
            <div style={styles.cardGrid}>
              {MOCK_FLIGHTS.map((f, i) => <FlightCard key={i} {...f} />)}
            </div>
            <div style={styles.askAI}>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>Not sure which to pick?</p>
              <button className="btn-primary" onClick={() => { setActiveTab("chat"); send("Which of these flights should I book and why?"); }}
                style={{ padding: '10px 22px', fontSize: 14 }}>
                Ask AI to decide ✦
              </button>
            </div>
          </div>
        )}

        {/* HOTELS TAB */}
        {activeTab === "hotels" && (
          <div style={styles.cardsArea}>
            <div style={styles.filterBar}>
              {["All", "Budget", "Boutique", "Luxury"].map(f => (
                <button key={f} style={{ ...styles.filterChip, ...(f === "All" ? styles.filterChipActive : {}) }}>{f}</button>
              ))}
            </div>
            <div style={styles.cardGrid}>
              {MOCK_HOTELS.map((h, i) => <HotelCard key={i} {...h} />)}
            </div>
            <div style={styles.askAI}>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>Tell the AI your preferences for better picks</p>
              <button className="btn-primary" onClick={() => { setActiveTab("chat"); send("Recommend the best hotel for my trip based on my budget and style"); }}
                style={{ padding: '10px 22px', fontSize: 14 }}>
                Ask AI to pick ✦
              </button>
            </div>
          </div>
        )}

        {/* ITINERARY TAB */}
        {activeTab === "itinerary" && (
          <div style={styles.cardsArea}>
            <div style={styles.itineraryEmpty}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 10 }}>No itinerary yet</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
                Ask the AI to build your day-by-day itinerary and it will appear here.
              </p>
              <button className="btn-primary" onClick={() => { setActiveTab("chat"); send("Build me a complete day-by-day itinerary for my trip"); }}>
                Generate itinerary ✦
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes blink { 0%,80%,100%{opacity:0} 40%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

const styles = {
  page: { display: 'flex', height: '100vh', background: 'var(--night)', overflow: 'hidden' },

  // Sidebar
  sidebar: { width: 240, background: 'var(--deep)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '20px 16px', flexShrink: 0 },
  sidebarLogo: { fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 },
  newTrip: { background: 'var(--gold-dim)', border: '1px solid rgba(240,180,41,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 16px', color: 'var(--gold)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', marginBottom: 24, transition: 'all 0.2s' },
  sidebarSection: { marginBottom: 28 },
  sidebarLabel: { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, paddingLeft: 8 },
  sidebarTab: { display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: 'transparent', border: 'none', borderRadius: 'var(--radius-sm)', padding: '10px 12px', color: 'var(--muted)', fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif', marginBottom: 2, textAlign: 'left' },
  sidebarTabActive: { background: 'rgba(255,255,255,0.06)', color: 'var(--text)' },
  tripMeta: { background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '12px', border: '1px solid var(--border)' },
  tripMetaItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', marginBottom: 8 },
  tripMetaIcon: { fontSize: 14 },
  sidebarFooter: { marginTop: 'auto' },
  aiBadge: { background: 'var(--gold-dim)', border: '1px solid rgba(240,180,41,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6 },

  // Main
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  headerTitle: { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600 },
  headerSub: { fontSize: 13, color: 'var(--muted)', marginTop: 3 },
  headerTabs: { display: 'flex', gap: 6 },
  headerTab: { background: 'transparent', border: '1px solid var(--border)', borderRadius: 50, padding: '7px 16px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' },
  headerTabActive: { background: 'var(--card)', color: 'var(--text)', borderColor: 'rgba(255,255,255,0.15)' },

  // Chat
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  messages: { flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 },
  typing: { display: 'flex', gap: 5, padding: '12px 16px', background: 'var(--card)', borderRadius: 16, width: 'fit-content', alignItems: 'center' },
  typingDot: { width: 7, height: 7, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block', animation: 'blink 1.2s infinite' },
  quickReplies: { display: 'flex', gap: 8, padding: '0 28px 12px', flexWrap: 'wrap' },
  quickReply: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 50, padding: '7px 14px', fontSize: 12, color: 'var(--muted)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s', whiteSpace: 'nowrap' },
  inputBar: { display: 'flex', gap: 12, padding: '12px 28px 20px', borderTop: '1px solid var(--border)', alignItems: 'center' },
  input: { flex: 1, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 50, padding: '13px 20px', fontSize: 14, color: 'var(--text)', outline: 'none', fontFamily: 'DM Sans, sans-serif' },

  // Cards
  cardsArea: { flex: 1, overflowY: 'auto', padding: '24px 28px' },
  filterBar: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  filterChip: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 50, padding: '8px 18px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' },
  filterChipActive: { background: 'var(--gold-dim)', border: '1px solid rgba(240,180,41,0.4)', color: 'var(--gold)' },
  cardGrid: { display: 'flex', flexDirection: 'column', gap: 14 },
  askAI: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24, padding: '20px', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' },
  itineraryEmpty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: 40 },
};
