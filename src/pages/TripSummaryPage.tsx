import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, MapPin, Edit3, Share2, Sparkles, UserPlus } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format, differenceInDays } from 'date-fns'
import ItineraryView from '../components/itinerary/ItineraryView'
import TravelersList from '../components/collaboration/TravelersList'
import InviteModal from '../components/collaboration/InviteModal'
import JoinTripModal from '../components/collaboration/JoinTripModal'

export default function TripSummaryPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getTrip, setCurrentTrip, currentTrip, getCurrentTravelerForTrip } = useTripStore()
  
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  const isInviteLink = searchParams.get('invite') === 'true'

  useEffect(() => {
    if (tripId) {
      const trip = getTrip(tripId)
      if (trip) {
        setCurrentTrip(trip)
        
        // Check if this is an invite link and user isn't already part of the trip
        const currentTraveler = getCurrentTravelerForTrip(tripId)
        if (isInviteLink && !currentTraveler) {
          setShowJoinModal(true)
        }
      } else {
        navigate('/')
      }
    }
  }, [tripId, getTrip, setCurrentTrip, navigate, getCurrentTravelerForTrip, isInviteLink])

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
  const currentTraveler = getCurrentTravelerForTrip(currentTrip.id)

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
              {formatTripDates()}
              {currentTraveler && (
                <span className="ml-2 text-sm">
                  • You're {currentTraveler.name}
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {!currentTraveler ? (
            <button 
              onClick={() => setShowJoinModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join Trip</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => setShowInviteModal(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Invite</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </>
          )}
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
                <div className="text-2xl font-bold text-gray-800">{currentTrip.travelers.length}</div>
                <div className="text-sm text-gray-600">{currentTrip.travelers.length === 1 ? 'person' : 'people'}</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl">
                <MapPin className="w-8 h-8 text-forest-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Destination</div>
                <div className="text-lg font-bold text-gray-800 leading-tight">{currentTrip.name}</div>
              </div>
            </div>
          </div>

          {/* Itinerary Section - Only show if user has joined */}
          {currentTraveler && (
            <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <ItineraryView trip={currentTrip} />
            </div>
          )}

          {/* Join Prompt for non-members */}
          {!currentTraveler && (
            <div className="glass-card rounded-2xl p-8 animate-slide-up text-center" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-wanderlust-100 to-adventure-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-wanderlust-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Join the Adventure!</h3>
              <p className="text-gray-600 mb-6">
                Enter your name to join this trip and start collaborating on the itinerary.
              </p>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>Join Trip</span>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Travelers List */}
          <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TravelersList 
              tripId={currentTrip.id}
              travelers={currentTrip.travelers}
              currentTraveler={currentTraveler}
            />
          </div>

          {/* Trip Stats */}
          <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-gray-800 mb-4">Trip Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{format(new Date(currentTrip.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activities</span>
                <span className="font-medium">{currentTrip.activities.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trip ID</span>
                <span className="font-mono text-xs text-gray-500">{currentTrip.id.slice(-8)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        tripId={currentTrip.id}
        tripName={currentTrip.name}
      />

      <JoinTripModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        tripId={currentTrip.id}
        tripName={currentTrip.name}
      />
    </div>
  )
}