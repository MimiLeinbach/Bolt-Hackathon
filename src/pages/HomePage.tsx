import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Users, Calendar, Sparkles, AlertCircle } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format } from 'date-fns'
import AdventureIllustration from '../components/shared/AdventureIllustration'

interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  createdAt: string
  travelers?: Array<any>
  participantCount?: number
}

interface LocationState {
  error?: string
}

export default function HomePage() {
  const trips: Trip[] = useTripStore((state) => state.trips)
  const location = useLocation()
  const state = location.state as LocationState
  const error = state?.error

  return (
    <div className="animate-fade-in relative min-h-screen">
      {/* Background Illustration */}
      <AdventureIllustration />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-8 pt-20">
          <div className="mb-6">
            <h2 className="text-6xl font-black mb-4 text-charcoal drop-shadow-lg">
              Your next adventure
            </h2>
            <h3 className="text-6xl font-black mb-6 text-charcoal drop-shadow-lg">
              starts here
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
              </p>
            </div>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h2 classNam
