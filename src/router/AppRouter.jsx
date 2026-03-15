import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Flights from '../pages/Flights'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/flights"
        element={
          <ProtectedRoute>
            <Flights />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
