import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Users, Calendar, Sparkles, AlertCircle } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format } from 'date-fns'

export default function HomePage() {
  const trips = useTripStore((state) => state.trips)
  const location = useLocation()
  const error = location.state?.error

  return (
    <div className="animate-fade-in">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-adventure-600 via-wanderlust-600 to-forest-600 bg-clip-text text-transparent">
            Your next adventure
          </h2>
          <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-adventure-600 via-wanderlust-600 to-forest-600 bg-clip-text text-transparent">
            starts here
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
          </p>
        </div>
        
        <Link to="/create-trip">
          <button className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-3 group">
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span>Start Planning</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>
        </Link>
      </div>

      {/* Recent Trips */}
      {trips.length > 0 && (
        <div className="animate-slide-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-adventure-500" />
            Your Adventures
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <Link key={trip.id} to={`/trip/${trip.id}`}>
                <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-adventure-600 transition-colors">
                      {trip.name}
                    </h4>
                    <div className="w-3 h-3 bg-gradient-to-r from-adventure-400 to-wanderlust-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-adventure-500" />
                      <span className="text-sm">
                        {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-wanderlust-500" />
                      <span className="text-sm">
                        {trip.travelers?.length || trip.participantCount} {(trip.travelers?.length || trip.participantCount) === 1 ? 'traveler' : 'travelers'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      Created {format(new Date(trip.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {trips.length === 0 && (
        <div className="text-center py-16 animate-slide-up">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-adventure-100 to-wanderlust-100 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-adventure-500 animate-bounce-gentle" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Ready for your first adventure?</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Create your first trip and start planning something amazing with your friends.
          </p>
        </div>
      )}
    </div>
  )
}