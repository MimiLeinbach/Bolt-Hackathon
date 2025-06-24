import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, MapPin, Edit3, Share2, Sparkles, UserPlus, Bug } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format, differenceInDays } from 'date-fns'
import ItineraryView from '../components/itinerary/ItineraryView'
import TravelersList from '../components/collaboration/TravelersList'
import InviteModal from '../components/collaboration/InviteModal'
import JoinTripModal from '../components/collaboration/JoinTripModal'
import ResetUserButton from '../components/collaboration/ResetUserButton'

export default function TripSummaryPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getTrip, setCurrentTrip, currentTrip, getCurrentTravelerForTrip, shareTrip, isHydrated, setCurrentTraveler } = useTripStore()
  
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [testMode, setTestMode] = useState(false)

  const isInviteLink = searchParams.get('invite') === 'true'
  const forceJoin = searchParams.get('test') === 'true'

  useEffect(() => {
    const loadTrip = async () => {
      if (!tripId) {
        console.log('❌ No trip ID provided')
        navigate('/')
        return
      }

      console.log(`🔍 Loading trip ${tripId}, isInviteLink: ${isInviteLink}, forceJoin: ${forceJoin}`)
      console.log('🌐 Current URL:', window.location.href)
      console.log('📍 Search params:', Object.fromEntries(searchParams.entries()))
      console.log('🏪 Store hydrated:', isHydrated)
      
      setIsLoading(true)

      // Wait for store to be hydrated if it isn't already
      if (!isHydrated) {
        console.log('⏳ Waiting for store to hydrate...')
        // Wait up to 2 seconds for hydration
        let attempts = 0
        while (!useTripStore.getState().isHydrated && attempts < 20) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        console.log(`✅ Store hydration complete after ${attempts * 100}ms`)
      }

      // Try to get trip (this will check local, shared memory, and localStorage)
      const trip = getTrip(tripId)
      console.log('🎯 Found trip:', trip ? `${trip.name} (${trip.id})` : 'NOT FOUND')

      if (trip) {
        console.log('✅ Setting current trip:', trip.name)
        setCurrentTrip(trip)
        
        // Ensure trip is shared for future access
        shareTrip(tripId)
        
        // Check if this is an invite link and user isn't already part of the trip
        let currentTraveler = getCurrentTravelerForTrip(tripId)
        
        // Test mode: temporarily clear current traveler to simulate new user
        if (forceJoin) {
          console.log('🧪 TEST MODE: Clearing current traveler to simulate new user')
          setCurrentTraveler(null)
          currentTraveler = null
          setTestMode(true)
        }
        
        console.log('👤 Current traveler for trip:', currentTraveler ? currentTraveler.name : 'NONE')
        
        if ((isInviteLink || forceJoin) && !currentTraveler) {
          console.log('🚪 Showing join modal for invite link')
          // Add a small delay to ensure the page has fully loaded
          setTimeout(() => {
            console.log('🚪 Actually showing join modal now')
            setShowJoinModal(true)
          }, 500)
        }
      } else {
        // Trip not found - provide detailed error
        console.log('❌ Trip not found, redirecting to homepage')
        
        // Check what's actually in localStorage for debugging
        const allKeys = Object.keys(localStorage).filter(key => key.includes('trip') || key.includes('itinerary'))
        console.log('🔍 All trip-related localStorage keys:', allKeys)
        
        navigate('/', { 
          state: { 
            error: `Trip not found (ID: ${tripId}). The link may be invalid or the trip may have been deleted.` 
          } 
        })
      }

      setIsLoading(false)
    }

    loadTrip()
  }, [tripId, getTrip, setCurrentTrip, navigate, getCurrentTravelerForTrip, isInviteLink, shareTrip, searchParams, isHydrated, forceJoin, setCurrentTraveler])

  // Debug effect to track modal state changes
  useEffect(() => {
    console.log('🔄 Modal states changed:', { showJoinModal, showInviteModal })
  }, [showJoinModal, showInviteModal])

  const handleExitTestMode = () => {
    console.log('🧪 Exiting test mode')
    setTestMode(false)
    // Navigate back without test parameter
    navigate(`/trip/${tripId}`)
    // Reload the page to restore normal state
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-forest-200 border-t-forest-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal">Loading your adventure...</p>
          <p className="text-xs text-gray-500 mt-2">Trip ID: {tripId}</p>
          <p className="text-xs text-gray-500">Store hydrated: {isHydrated ? 'Yes' : 'No'}</p>
          <p className="text-xs text-gray-500">Is invite link: {isInviteLink ? 'Yes' : 'No'}</p>
          {forceJoin && <p className="text-xs text-gold-600">🧪 TEST MODE ACTIVE</p>}
        </div>
      </div>
    )
  }

  if (!currentTrip) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-2">Trip Not Found</h3>
          <p className="text-gray-600 mb-2">
            The trip you're looking for doesn't exist or may have been deleted.
          </p>
          <p className="text-xs text-gray-500 mb-6">Trip ID: {tripId}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const dayCount = differenceInDays(new Date(currentTrip.endDate), new Date(currentTrip.startDate)) + 1
  const currentTraveler = testMode ? null : getCurrentTravelerForTrip(currentTrip.id)

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
      {/* Test Mode Banner */}
      {testMode && (
        <div className="mb-4 p-4 bg-gold-50 border-2 border-gold-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bug className="w-5 h-5 text-gold-600" />
              <div>
                <h4 className="font-medium text-gold-800">🧪 Test Mode Active</h4>
                <p className="text-sm text-gold-700">You're viewing this as a new user who hasn't joined the trip yet.</p>
              </div>
            </div>
            <button
              onClick={handleExitTestMode}
              className="btn-secondary text-sm bg-gold-100 border-gold-300 text-gold-800 hover:bg-gold-200"
            >
              Exit Test Mode
            </button>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {(isInviteLink || testMode) && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">🔧 Debug Info</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <div>Trip ID: <code>{tripId}</code></div>
            <div>Is invite link: <code>{isInviteLink ? 'Yes' : 'No'}</code></div>
            <div>Force join (test): <code>{forceJoin ? 'Yes' : 'No'}</code></div>
            <div>Test mode: <code>{testMode ? 'Yes' : 'No'}</code></div>
            <div>Current traveler: <code>{currentTraveler ? currentTraveler.name : 'None'}</code></div>
            <div>Show join modal: <code>{showJoinModal ? 'Yes' : 'No'}</code></div>
            <div>URL: <code className="break-all">{window.location.href}</code></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">{currentTrip.name}</h1>
            <p className="text-lg text-gray-600">
              {formatTripDates()}
              {currentTraveler && (
                <span className="ml-2 text-sm">
                  • You're {currentTraveler.name}
                </span>
              )}
              {testMode && (
                <span className="ml-2 text-sm text-gold-600">
                  • 🧪 Test Mode
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Reset User Button for Testing */}
          <ResetUserButton />
          
          {!currentTraveler ? (
            <button 
              onClick={() => {
                console.log('🚪 Manual join button clicked')
                setShowJoinModal(true)
              }}
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
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-gold-500" />
              Trip Overview
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl border border-forest-200/50">
                <Calendar className="w-8 h-8 text-forest-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Duration</div>
                <div className="text-2xl font-bold text-charcoal">{dayCount}</div>
                <div className="text-sm text-gray-600">{dayCount === 1 ? 'day' : 'days'}</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-gold-50 to-gold-100 rounded-xl border border-gold-200/50">
                <Users className="w-8 h-8 text-gold-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Travelers</div>
                <div className="text-2xl font-bold text-charcoal">{currentTrip.travelers.length}</div>
                <div className="text-sm text-gray-600">{currentTrip.travelers.length === 1 ? 'person' : 'people'}</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-forest-50 to-gold-50 rounded-xl border border-forest-200/50">
                <MapPin className="w-8 h-8 text-forest-600 mx-auto mb-3" />
                <div className="text-sm text-gray-600 mb-1">Destination</div>
                <div className="text-lg font-bold text-charcoal leading-tight">{currentTrip.name}</div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-forest-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Join the Adventure!</h3>
              <p className="text-gray-600 mb-6">
                Enter your name to join this trip and start collaborating on the itinerary.
              </p>
              <button 
                onClick={() => {
                  console.log('🚪 Join prompt button clicked')
                  setShowJoinModal(true)
                }}
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
            <h3 className="font-bold text-charcoal mb-4">Trip Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium text-charcoal">{format(new Date(currentTrip.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activities</span>
                <span className="font-medium text-charcoal">{currentTrip.activities.length}</span>
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
        onClose={() => {
          console.log('🚪 Join modal closed')
          setShowJoinModal(false)
        }}
        tripId={currentTrip.id}
        tripName={currentTrip.name}
      />
    </div>
  )
}