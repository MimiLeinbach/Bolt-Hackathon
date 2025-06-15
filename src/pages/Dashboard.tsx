import React, { useEffect, useState } from 'react'
import { useTripStore } from '../stores/tripStore'
import { useAuthStore } from '../stores/authStore'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { Plus, Calendar, Users, DollarSign, MapPin } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const { trips, loading, fetchTrips } = useTripStore()
  const { profile } = useAuthStore()
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateTripCost = (trip: any) => {
    // Mock calculation - in real app this would come from line items
    return Math.floor(Math.random() * 500) + 200
  }

  const getParticipantCount = (trip: any) => {
    return trip.trip_participants?.length || 0
  }

  const getTripStatus = (trip: any) => {
    const now = new Date()
    const startDate = new Date(trip.start_date)
    const endDate = new Date(trip.end_date)
    
    if (now < startDate) return 'upcoming'
    if (now >= startDate && now <= endDate) return 'active'
    return 'completed'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50'
      case 'active': return 'text-green-600 bg-green-50'
      case 'completed': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Traveler'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              {trips.length === 0 
                ? "Ready to plan your first group trip?" 
                : `You have ${trips.length} trip${trips.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Trip
          </Button>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No trips yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first trip and start planning an amazing adventure with your friends
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => {
              const status = getTripStatus(trip)
              const cost = calculateTripCost(trip)
              const participantCount = getParticipantCount(trip)
              
              return (
                <Card 
                  key={trip.id} 
                  hover 
                  className="animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Trip Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
                    {trip.image_url ? (
                      <img 
                        src={trip.image_url} 
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-80" />
                          <p className="text-sm opacity-80">Trip Photo</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Trip Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {trip.name}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {participantCount} participant{participantCount !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${cost}/person
                        </div>
                      </div>
                    </div>

                    {/* Participants */}
                    {trip.trip_participants && trip.trip_participants.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {trip.trip_participants.slice(0, 4).map((participant) => (
                            <Avatar
                              key={participant.id}
                              src={participant.profiles?.avatar_url}
                              alt={participant.profiles?.full_name || ''}
                              size="sm"
                              className="border-2 border-white"
                              fallback={participant.profiles?.full_name?.charAt(0)}
                            />
                          ))}
                          {trip.trip_participants.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                              +{trip.trip_participants.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}