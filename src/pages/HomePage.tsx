import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Users, Calendar, Sparkles, AlertCircle } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format } from 'date-fns'

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
    <div className="animate-fade-in relative min-h-screen bg-[#D4E4E0]">
      {/* Background Image - Full bleed */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ChatGPT Image Jun 26, 2025, 12_37_10 PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Blue background extension for extra vertical space */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, #D4E4E0 0%, #D4E4E0 100%)',
          zIndex: -1
        }}
      />

      {/* Logo in upper left corner */}
      <div className="absolute top-4 left-6 z-20">
        <Link to="/">
          <img 
            src="/Juntobig.jpg" 
            alt="Junto Logo" 
            className="h-16 w-auto object-contain object-center drop-shadow-lg"
          />
        </Link>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3 mt-20">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Hero Section - Equal spacing above white rectangle */}
        <div className="text-center mb-6 pt-20">
          <div className="mb-6">
            <h2 className="text-5xl md:text-6xl font-black mb-2 text-charcoal drop-shadow-lg">
              Your next adventure
            </h2>
            <h3 className="text-5xl md:text-6xl font-black mb-6 text-charcoal drop-shadow-lg">
              starts here
            </h3>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 max-w-xl mx-auto shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
              </p>
            </div>
          </div>
        </div>

        {/* Hero CTA - Equal spacing below white rectangle */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3 drop-shadow-md">
              Ready to start planning?
            </h2>
            <Link
              to="/create-trip"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-forest-500 to-gold-400 text-white font-semibold rounded-xl hover:from-forest-600 hover:to-gold-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Trip
            </Link>
          </div>
        </div>

        {/* Existing Trips - More compact */}
        {trips.length > 0 && (
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Your Adventures
              </h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/trip/${trip.id}`}
                    className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base text-charcoal group-hover:text-purple-600 transition-colors">
                        {trip.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {trip.participantCount || trip.travelers?.length || 1}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-3 h-3 mr-2" />
                      {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      Created {format(new Date(trip.createdAt), 'MMM d, yyyy')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}