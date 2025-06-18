import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import HomePage from './pages/HomePage'
import CreateTripPage from './pages/CreateTripPage'
import TripSummaryPage from './pages/TripSummaryPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-trip" element={<CreateTripPage />} />
        <Route path="/trip/:tripId" element={<TripSummaryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App