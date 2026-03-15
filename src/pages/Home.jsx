import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Welcome to PlanAway ✈️</h1>
        <p className="hero-subtitle">
          Don't just search for flights. Tell our AI where you want to go — it handles
          flights, hotels, itinerary and hidden gems. All in one chat.
        </p>
        <div className="hero-actions">
          <Link to="/flights" className="btn btn-primary">
            Explore Flights
          </Link>
          <Link to="/login" className="btn btn-outline">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Smart Search</h3>
          <p>Find the best deals powered by real-time price tracking.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🤖</span>
          <h3>AI Planning</h3>
          <p>Let our AI craft your perfect itinerary automatically.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔔</span>
          <h3>Price Alerts</h3>
          <p>Get notified instantly when prices drop for your routes.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
