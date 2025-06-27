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
    <div className="animate-fade-in relative min-h-screen">
      {/* Background Image - Full intensity, no fade */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ChatGPT Image Jun 26, 2025, 12_37_10 PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
        onError={(e) => {
          // If background image fails to load, show gradient fallback
          const target = e.target as HTMLElement;
          target.style.backgroundImage = 'linear-gradient(135deg, #f0f9f4 0%, #fefbf0 50%, #f0f9f4 100%)';
        }}
      />

      {/* Content overlay - Responsive padding */}
      <div className="relative z-10 flex flex-col min-h-screen p-2 sm:p-4">
        {/* Error Message - Responsive */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-start sm:items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-red-700 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Hero Section - Mobile-first responsive with tighter spacing */}
        <div className="text-center mb-4 pt-2">
          <div className="mb-3">
            {/* Main headlines - Both lines now matching font size */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal drop-shadow-lg leading-tight">
              Your next adventure
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-charcoal drop-shadow-lg leading-tight">
              starts here
            </h3>
            
            {/* Description text - Narrower width to match header with tighter spacing */}
            <div className="max-w-sm sm:max-w-lg mx-auto mb-3 sm:mb-4">
              <p className="text-base sm:text-lg text-charcoal font-medium leading-relaxed drop-shadow-sm">
                Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
              </p>
            </div>
            
            {/* Call to action text - Responsive with tighter spacing */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal mb-3 sm:mb-4 drop-shadow-md">
              Ready to start planning?
            </h2>
            
            {/* CTA Button - Responsive spacing and sizing with reduced top margin */}
            <div className="text-center mb-6 sm:mb-8">
              <Link
                to="/create-trip"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-forest-500 to-gold-400 text-white font-semibold rounded-xl hover:from-forest-600 hover:to-gold-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create Your First Trip
              </Link>
            </div>
          </div>
        </div>

        {/* Spacer for remaining content */}
        <div className="flex-1">
          {/* Existing Trips - Responsive grid with tighter spacing */}
          {trips.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-4 sm:mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />
                  Your Adventures
                </h3>
                
                {/* Responsive grid - stacks on mobile, 2 cols on tablet, 3 on desktop */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {trips.map((trip) => (
                    <Link
                      key={trip.id}
                      to={`/trip/${trip.id}`}
                      className="block p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-base sm:text-lg text-charcoal group-hover:text-purple-600 transition-colors leading-tight pr-2">
                          {trip.name}
                        </h4>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 flex-shrink-0">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {trip.participantCount || trip.travelers?.length || 1}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">
                          Created {format(new Date(trip.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}