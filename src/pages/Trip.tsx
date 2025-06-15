import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Users, MapPin, Plus, Edit3, DollarSign } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/authStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import type { TripWithParticipants, LineItem } from '../types/database'

export default function Trip() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthStore()
  const [trip, setTrip] = useState<TripWithParticipants | null>(null)
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'accommodation' | 'activity' | 'meal'>('accommodation')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    if (id && user) {
      fetchTripData()
    }
  }, [id, user])

  const fetchTripData = async () => {
    try {
      setLoading(true)
      
      // Fetch trip with participants
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .select(`
          *,
          trip_participants (
            *,
            profiles (*)
          )
        `)
        .eq('id', id)
        .single()

      if (tripError) throw tripError

      // Fetch line items
      const { data: itemsData, error: itemsError } = await supabase
        .from('line_items')
        .select('*')
        .eq('trip_id', id)
        .order('order_index', { ascending: true })

      if (itemsError) throw itemsError

      setTrip(tripData)
      setLineItems(itemsData || [])
    } catch (error) {
      console.error('Error fetching trip data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  const getFilteredItems = () => {
    return lineItems.filter(item => item.category === activeTab)
  }

  const calculateUserTotal = () => {
    // This would calculate the user's share of expenses
    // For now, return a mock value
    return 285
  }

  const tabs = [
    { id: 'accommodation' as const, label: 'Accommodations', icon: MapPin },
    { id: 'activity' as const, label: 'Activities', icon: Calendar },
    { id: 'meal' as const, label: 'Meals', icon: Users }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
        <p className="text-gray-600">The trip you're looking for doesn't exist or you don't have access to it.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Trip Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Trip
            </Button>
          </div>

          {/* Participants */}
          <div className="flex items-center space-x-3 mb-4">
            {trip.trip_participants.slice(0, 6).map((participant) => (
              <Avatar
                key={participant.id}
                src={participant.profiles.avatar_url}
                alt={participant.profiles.full_name || participant.profiles.email}
                fallback={participant.profiles.full_name?.charAt(0) || participant.profiles.email.charAt(0)}
                size="md"
              />
            ))}
            {trip.trip_participants.length > 6 && (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                +{trip.trip_participants.length - 6}
              </div>
            )}
          </div>

          {/* Cost Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Your total cost</p>
                <p className="text-2xl font-bold text-green-800">${calculateUserTotal()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {activeTab === 'accommodation' ? 'Accommodations' : 
             activeTab === 'activity' ? 'Activities' : 'Meals'}
          </h2>
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {getFilteredItems().length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'accommodation' && <MapPin className="w-12 h-12 mx-auto" />}
                {activeTab === 'activity' && <Calendar className="w-12 h-12 mx-auto" />}
                {activeTab === 'meal' && <Users className="w-12 h-12 mx-auto" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab}s added yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start planning by adding your first {activeTab}
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add {activeTab === 'accommodation' ? 'Accommodation' : 
                     activeTab === 'activity' ? 'Activity' : 'Meal'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {getFilteredItems().map((item) => (
              <Card key={item.id} hover>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {item.date && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {item.cost && (
                        <div className="text-lg font-semibold text-green-600">
                          ${item.cost}/person
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add {activeTab}</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add item form would go here...</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setShowAddModal(false)} className="flex-1">
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}