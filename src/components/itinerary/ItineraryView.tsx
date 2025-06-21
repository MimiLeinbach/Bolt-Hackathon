import React, { useState } from 'react'
import { format, addDays, differenceInDays } from 'date-fns'
import { ChevronDown, ChevronRight, Plus, Calendar, Clock } from 'lucide-react'
import { useTripStore, Activity } from '../../stores/tripStore'
import ActivityModal from './ActivityModal'
import ActivityCard from './ActivityCard'

interface ItineraryViewProps {
  trip: {
    id: string
    name: string
    startDate: string
    endDate: string
    activities: Activity[]
    travelers: any[]
  }
}

interface DayData {
  date: Date
  dayIndex: number
  dayName: string
  activities: Activity[]
}

export default function ItineraryView({ trip }: ItineraryViewProps) {
  const { getActivitiesForDay, deleteActivity, getCurrentTravelerForTrip } = useTripStore()
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0])) // First day expanded by default
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  const currentTraveler = getCurrentTravelerForTrip(trip.id)

  // Generate all days for the trip
  const generateDays = (): DayData[] => {
    const startDate = new Date(trip.startDate)
    const endDate = new Date(trip.endDate)
    const totalDays = differenceInDays(endDate, startDate) + 1
    
    return Array.from({ length: totalDays }, (_, index) => {
      const currentDate = addDays(startDate, index)
      const activities = getActivitiesForDay(trip.id, index)
      
      return {
        date: currentDate,
        dayIndex: index,
        dayName: format(currentDate, 'EEEE'),
        activities
      }
    })
  }

  const days = generateDays()

  const toggleDay = (dayIndex: number) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(dayIndex)) {
      newExpanded.delete(dayIndex)
    } else {
      newExpanded.add(dayIndex)
    }
    setExpandedDays(newExpanded)
  }

  const getTotalActivities = () => {
    return trip.activities?.length || 0
  }

  const getTotalParticipations = () => {
    if (!currentTraveler) return 0
    return trip.activities?.filter(activity => 
      activity.participants.includes(currentTraveler.id)
    ).length || 0
  }

  const handleAddActivity = (dayIndex?: number) => {
    setSelectedDayIndex(dayIndex ?? 0)
    setEditingActivity(null)
    setIsModalOpen(true)
  }

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity)
    setSelectedDayIndex(activity.dayIndex)
    setIsModalOpen(true)
  }

  const handleDeleteActivity = (activityId: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteActivity(trip.id, activityId)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingActivity(null)
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Activity Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-adventure-500" />
            Itinerary
          </h2>
          <p className="text-gray-600 mt-1">
            {days.length} {days.length === 1 ? 'day' : 'days'} • {getTotalActivities()} {getTotalActivities() === 1 ? 'activity' : 'activities'}
            {currentTraveler && getTotalParticipations() > 0 && (
              <span className="text-adventure-600 font-medium ml-2">
                • You're joining {getTotalParticipations()}
              </span>
            )}
          </p>
        </div>
        
        <button 
          onClick={() => handleAddActivity()}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Days List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {days.map((day) => (
          <div key={day.dayIndex} className="glass-card rounded-xl overflow-hidden">
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.dayIndex)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {expandedDays.has(day.dayIndex) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                <div className="text-left">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Day {day.dayIndex + 1}
                    </h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm font-medium text-gray-600">
                      {day.dayName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {format(day.date, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">
                    {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                  </div>
                  {day.activities.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {day.activities.filter(a => a.cost).reduce((sum, a) => sum + (a.cost || 0), 0) > 0 && 
                        `$${day.activities.filter(a => a.cost).reduce((sum, a) => sum + (a.cost || 0), 0)} total`
                      }
                      {currentTraveler && (
                        <span className="ml-2 text-adventure-600">
                          • {day.activities.filter(a => a.participants.includes(currentTraveler.id)).length} joined
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>

            {/* Day Content */}
            {expandedDays.has(day.dayIndex) && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {day.activities.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    {day.activities.map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity}
                        tripId={trip.id}
                        currentTraveler={currentTraveler}
                        allTravelers={trip.travelers}
                        onEdit={() => handleEditActivity(activity)}
                        onDelete={() => handleDeleteActivity(activity.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-adventure-100 to-wanderlust-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-adventure-500" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">No activities planned</h4>
                    <p className="text-xs text-gray-500 mb-4">Add your first activity for this day</p>
                    <button 
                      onClick={() => handleAddActivity(day.dayIndex)}
                      className="btn-secondary text-sm px-4 py-2 flex items-center space-x-2 mx-auto"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Activity</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State for No Days */}
      {days.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-adventure-100 to-wanderlust-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-adventure-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No itinerary available</h3>
          <p className="text-gray-500">
            Please check your trip dates to generate the itinerary.
          </p>
        </div>
      )}

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tripId={trip.id}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
        selectedDayIndex={selectedDayIndex}
        editActivity={editingActivity}
      />
    </div>
  )
}