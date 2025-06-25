import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Users, Calendar, Sparkles, AlertCircle } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format } from 'date-fns'
import AdventureIllustration from '../components/shared/AdventureIllustration'

export default function HomePage() {
  const trips = useTripStore((state) => state.trips)
  const location = useLocation()
  const error = location.state?.error

  return (
    <div className="animate-fade-in relative">
      {/* Background Illustration */}
      <AdventureIllustration />
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12 pt-20">
          <div className="mb-6">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-forest-600 via-forest-500 to-gold-500 bg-clip-text text-transparent drop-shadow-sm">
              Your next adventure
            </h2>
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-forest-600 via-forest-500 to-gold-500 bg-clip-text text-transparent drop-shadow-sm">
              starts here
            </h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Plan unforgettable trips with friends. Create itineraries, share ideas, and make memories together.
              </p>
            </div>
          </div>
          
          <Link to="/create-trip">
            <button className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-3 group shadow-2xl">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span>Start Planning</span>
              <Sparkles className="w-5 h-5 animate-pulse text-gold-300" />
            </button>
          </Link>
        </div>

        {/* Recent Trips */}
        {trips.length > 0 && (
          <div className="animate-slide-up">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-charcoal mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-forest-500" />
                Your Adventures
              </h3>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <Link key={trip.id} to={`/trip/${trip.id}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group border border-white/50">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-charcoal group-hover:text-forest-600 transition-colors">
                        {trip.name}
                      </h4>
                      <div className="w-3 h-3 bg-gradient-to-r from-forest-400 to-gold-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-forest-500" />
                        <span className="text-sm">
                          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gold-500" />
                        <span className="text-sm">
                          {trip.travelers?.length || trip.participantCount} {(trip.travelers?.length || trip.participantCount) === 1 ? 'traveler' : 'travelers'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-forest-100 to-gold-100 rounded-full flex items-center justify-center">
                <MapPin className="w-12 h-12 text-forest-500 animate-bounce-gentle" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-3">Ready for your first adventure?</h3>
              <p className="text-gray-600 mb-8">
                Create your first trip and start planning something amazing with your friends.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}