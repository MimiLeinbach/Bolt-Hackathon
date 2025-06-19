import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, MapPin, Edit3, Share2, Sparkles } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format, differenceInDays } from 'date-fns'
import ItineraryView from '../components/itinerary/ItineraryView'

export default function TripSummaryPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const navigate = useNavigate()
  const { getTrip, setCurrentTrip, currentTrip } = useTripStore()

  useEffect(() => {
    if (tripId) {
      const trip = getTrip(tripId)
      if (trip) {
        setCurrentTrip(trip)
      } else {
        navigate('/')
      }
    }
  }, [tripId, getTrip, setCurrentTrip, navigate])

  if (!currentTrip) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-adventure-200 border-t-adventure-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    )
  }

  const dayCount = differenceInDays(new Date(currentTrip.endDate), new Date(currentTrip.startDate)) + 1

  // Format dates to show month name and day
  const formatTripDates = () => {
    const startDate = new Date(currentTrip.startDate)
    const endDate = new Date(currentTrip.endDate)
    
    const startMonth = format(startDate, 'MMMM')
    const startDay = format(startDate, 'd')
    const endDay = format(endDate, 'd')
    
    // Check if same month
    if (format(startDate, 'MMMM yyyy') === format(endDate, 'MMMM yyyy')) {
      return `${startMonth} ${startDay} - ${endDay}`
    } else {
      const endMonth = format(endDate, 'MMMM')
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentTrip.name}</h1>
            <p className="text-lg text-gray-600">
              {formatTripDates()}. Created by Trip Planner
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to={`/create-trip?edit=${currentTrip.id}`}>
            <button className="btn-secondary flex items-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </Link>
          <button className="btn-primary flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trip Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <div className="glass-card rounded-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-adventure-500" />
              Trip Overview
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-adventure-50 to-adventure-100 rounded-xl">
                <Calendar className="w-8 h-8 text-adventure-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Duration</div>
                <div className="text-2xl font-bold text-gray-800">{dayCount}</div>
                <div className="text-sm text-gray-600">{dayCount === 1 ? 'day' : 'days'}</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-wanderlust-50 to-wanderlust-100 rounded-xl">
                <Users className="w-8 h-8 text-wanderlust-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Travelers</div>
                <div className="text-2xl font-bold text-gray-800">{currentTrip.participantCount}</div>
                <div className="text-sm text-gray-600">{currentTrip.participantCount === 1 ? 'person' : 'people'}</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl">
                <MapPin className="w-8 h-8 text-forest-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Destination</div>
                <div className="text-lg font-bold text-gray-800 leading-tight">{currentTrip.name}</div>
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ItineraryView trip={currentTrip} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trip Dates */}
          <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-adventure-500" />
              Dates
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">Departure</div>
                <div className="font-semibold text-gray-800">
                  {format(new Date(currentTrip.startDate), 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Return</div>
                <div className="font-semibold text-gray-800">
                  {format(new Date(currentTrip.endDate), 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Placeholder */}
          <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-wanderlust-500" />
              Travelers
            </h3>
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gradient-to-br from-wanderlust-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-wanderlust-500" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Emily will build collaboration features here - participant management, invites, and sharing.
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-wanderlust-50 text-wanderlust-700 rounded-full text-xs font-medium">
                Ready for collaboration features
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-bold text-gray-800 mb-4">Trip Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{format(new Date(currentTrip.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trip ID</span>
                <span className="font-mono text-xs text-gray-500">{currentTrip.id.slice(-8)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}