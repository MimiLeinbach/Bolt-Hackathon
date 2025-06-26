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
    <div className="animate-fade-in relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <img 
          src="/ChatGPT Image Jun 26, 2025, 12_37_10 PM copy.png" 
          alt="Adventure Background" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content overlay - Structured for 16:9 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <header className="flex-shrink-0 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-start">
              <img 
                src="/Juntobig.jpg" 
                alt="Junto Logo" 
                className="h-16 w-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="flex-shrink-0 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area - Centered in remaining space */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
              
              {/* Left Column - Hero Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                    Your next adventure
                    <br />
                    <span className="text-gold-400">starts here</span>
                  </h1>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center lg:justify-start">
                  <Link
                    to="/create-trip"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-500 to-gold-400 text-white font-semibold rounded-xl hover:from-forest-600 hover:to-gold-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Trip
                    <Sparkles className="w-5 h-5 ml-2 animate-pulse text-gold-200" />
                  </Link>
                </div>
              </div>

              {/* Right Column - Existing Trips or Features */}
              <div className="space-y-6">
                {trips.length > 0 ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <Sparkles className="w-6 h-6 mr-2 text-forest-600" />
                      Your Adventures
                    </h3>
                    <div className="grid gap-4 max-h-96 overflow-y-auto">
                      {trips.slice(0, 3).map((trip) => (
                        <Link
                          key={trip.id}
                          to={`/trip/${trip.id}`}
                          className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-forest-300 hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg text-gray-800 group-hover:text-forest-600 transition-colors">
                              {trip.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-1" />
                              {trip.participantCount || trip.travelers?.length || 1}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            Created {format(new Date(trip.createdAt), 'MMM d, yyyy')}
                          </div>
                        </Link>
                      ))}
                      {trips.length > 3 && (
                        <div className="text-center py-2">
                          <span className="text-sm text-gray-500">
                            +{trips.length - 3} more trips
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-forest-100 to-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-forest-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to explore?</h3>
                    <p className="text-gray-600 mb-4">
                      Start planning your first adventure and invite friends to join the journey.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <Calendar className="w-6 h-6 text-forest-500 mx-auto mb-1" />
                        <span className="text-gray-600">Plan Days</span>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 text-gold-500 mx-auto mb-1" />
                        <span className="text-gray-600">Invite Friends</span>
                      </div>
                      <div className="text-center">
                        <Sparkles className="w-6 h-6 text-forest-500 mx-auto mb-1" />
                        <span className="text-gray-600">Create Memories</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer spacer */}
        <div className="flex-shrink-0 h-8"></div>
      </div>
    </div>
  )
}