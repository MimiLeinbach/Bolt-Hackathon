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
          </div>
        </div>

        {/* Spacer to push CTA lower */}
        <div className="flex-1 min-h-[200px]"></div>

        {/* Hero CTA - Moved much lower */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              Plan Trips Better. Together.
            </h2>
            <p className="text-xl text-white font-bold mb-6 leading-relaxed drop-shadow-lg">
              Create itineraries, share ideas and make memories together
            </p>
            <Link
              to="/create-trip"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Trip
            </Link>
          </div>
        </div>

        {/* Existing Trips - Now below the CTA button */}
        {trips.length > 0 && (
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                Your Adventures
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/trip/${trip.id}`}
                    className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg text-charcoal group-hover:text-purple-600 transition-colors">
                        {trip.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {trip.participantCount || trip.travelers?.length || 1}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
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