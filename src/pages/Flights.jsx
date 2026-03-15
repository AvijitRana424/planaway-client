import { useState, useEffect } from 'react'
import apiClient from '../api/client'

function Flights() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiClient
      .get('/flights')
      .then((res) => setFlights(res.data))
      .catch((err) => setError('Failed to load flights. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page"><div className="loading">Loading flights...</div></div>
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>

  return (
    <div className="page flights-page">
      <h2>Available Flights</h2>
      {flights.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🛫</span>
          <p>No flights found. Add some from the backend!</p>
        </div>
      ) : (
        <div className="flights-grid">
          {flights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-airline">{flight.airline}</div>
              <div className="flight-route">
                <span>{flight.origin}</span>
                <span className="flight-arrow">→</span>
                <span>{flight.destination}</span>
              </div>
              <div className="flight-price">${flight.price}</div>
              <div className="flight-time">
                {new Date(flight.departureTime).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Flights
