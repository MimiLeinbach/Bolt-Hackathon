import { useState, useEffect } from 'react'
import { Plus, Calendar, Users, MapPin } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useTripStore } from '../stores/tripStore'
import { Button } from '../components/ui/Button'
import CreateTripModal from '../components/CreateTripModal'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { trips, loading, fetchTrips } = useTripStore()
  const [setShowCreateModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchTrips()
    }
  }, [user, fetchTrips])

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-2">Plan and manage your group adventures</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <MapPin className="h-full w-full" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-6">Start planning your next adventure with friends</p>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus className="h-5 w-5" />
            Create Your First Trip
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = `/trip/${trip.id}`}
            >
              {trip.image_url && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={trip.image_url}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{trip.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{formatDateRange(trip.start_date, trip.end_date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{trip.participant_count || 1} participants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTripModal />
    </div>
  )
}