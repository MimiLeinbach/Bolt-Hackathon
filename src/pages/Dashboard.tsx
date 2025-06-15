import { useState, useEffect } from 'react'
import { Plus, Calendar, Users, MapPin, Compass, Mountain, Camera, Plane } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useTripStore } from '../stores/tripStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import CreateTripModal from '../components/CreateTripModal'

export default function Dashboard() {
  const { user, profile } = useAuthStore()
  const { trips, loading, fetchTrips } = useTripStore()
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchTrips()
    }
  }, [user, fetchTrips])

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
  }

  const getRandomTripEmoji = () => {
    const emojis = ['🏔️', '🏖️', '🏕️', '🗻', '🌊', '🌲', '🏝️', '🎿', '🚁', '⛵']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-2xl flex items-center justify-center shadow-whimsical animate-bounce-gentle mx-auto mb-4">
            <Compass className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-earth-600 font-medium">Loading your adventures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-2xl flex items-center justify-center shadow-adventure animate-bounce-gentle">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-sunset-500 to-sunset-600 rounded-2xl flex items-center justify-center shadow-adventure animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-adventure animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
              <Plane className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-adventure-700 to-adventure-600 bg-clip-text text-transparent mb-4">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'Adventurer'}! 🌟
        </h1>
        <p className="text-xl text-earth-600 mb-8">Ready to plan your next epic adventure?</p>
        
        <Button 
          onClick={() => setShowCreateModal(true)}
          variant="adventure"
          size="lg"
          className="shadow-whimsical"
        >
          <Plus className="h-5 w-5 mr-2" />
          🚀 Create New Adventure
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-16">
          <Card variant="whimsical" className="max-w-2xl mx-auto">
            <CardContent className="py-16">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-adventure-400 to-adventure-500 rounded-3xl flex items-center justify-center shadow-whimsical animate-float">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-earth-800 mb-4">Your adventure awaits! 🗺️</h3>
              <p className="text-earth-600 mb-8 text-lg">
                Start planning your first epic journey with friends and family
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                variant="adventure"
                size="lg"
                className="shadow-whimsical"
              >
                <Plus className="h-5 w-5 mr-2" />
                🌟 Plan Your First Adventure
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-earth-800">Your Adventures 🎒</h2>
            <p className="text-earth-600">{trips.length} {trips.length === 1 ? 'adventure' : 'adventures'} planned</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <Card
                key={trip.id}
                variant="whimsical"
                hover
                onClick={() => window.location.href = `/trip/${trip.id}`}
                className="group overflow-hidden"
              >
                {trip.image_url ? (
                  <div className="h-48 bg-gradient-to-br from-adventure-200 to-adventure-300 relative overflow-hidden">
                    <img
                      src={trip.image_url}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 text-2xl animate-bounce-gentle">
                      {getRandomTripEmoji()}
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-adventure-400 to-adventure-500 flex items-center justify-center relative">
                    <div className="text-6xl animate-bounce-gentle">
                      {getRandomTripEmoji()}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-earth-800 mb-3 group-hover:text-adventure-700 transition-colors">
                    {trip.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-earth-600">
                      <Calendar className="h-4 w-4 mr-3 text-adventure-500" />
                      <span className="text-sm font-medium">{formatDateRange(trip.start_date, trip.end_date)}</span>
                    </div>
                    
                    <div className="flex items-center text-earth-600">
                      <Users className="h-4 w-4 mr-3 text-sunset-500" />
                      <span className="text-sm font-medium">
                        {trip.trip_participants?.length || 1} {(trip.trip_participants?.length || 1) === 1 ? 'adventurer' : 'adventurers'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-adventure-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-adventure-600 bg-adventure-100 px-3 py-1 rounded-full">
                        Adventure #{index + 1}
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-earth-500">Ready to explore</p>
                        <p className="text-sm font-bold text-adventure-600">🎯 Let's go!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <CreateTripModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  )
}