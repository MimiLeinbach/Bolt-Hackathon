import React, { useState } from 'react'
import { format, addDays, differenceInDays } from 'date-fns'
import { ChevronDown, ChevronRight, Plus, Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react'
import { useTripStore, Activity } from '../../stores/tripStore'

interface ItineraryViewProps {
  trip: {
    id: string
    name: string
    startDate: string
    endDate: string
    activities: Activity[]
  }
}

interface DayData {
  date: Date
  dayIndex: number
  dayName: string
  activities: Activity[]
}

export default function ItineraryView({ trip }: ItineraryViewProps) {
  const { getActivitiesForDay } = useTripStore()
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0])) // First day expanded by default

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
          </p>
        </div>
        
        <button className="btn-primary flex items-center space-x-2">
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
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-adventure-100 to-wanderlust-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-adventure-500" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">No activities planned</h4>
                    <p className="text-xs text-gray-500 mb-4">Add your first activity for this day</p>
                    <button className="btn-secondary text-sm px-4 py-2 flex items-center space-x-2 mx-auto">
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
    </div>
  )
}

// Activity Card Component
interface ActivityCardProps {
  activity: Activity
}

function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="bg-white/60 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{activity.title}</h4>
          {activity.description && (
            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
          )}
        </div>
        <button className="text-gray-400 hover:text-gray-600 ml-4">
          <div className="w-2 h-2 bg-current rounded-full"></div>
          <div className="w-2 h-2 bg-current rounded-full mt-1"></div>
          <div className="w-2 h-2 bg-current rounded-full mt-1"></div>
        </button>
      </div>

      <div className="flex items-center space-x-4 text-xs text-gray-500">
        {activity.location && (
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{activity.location}</span>
          </div>
        )}
        
        {activity.participantCount && (
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{activity.participantCount} people</span>
          </div>
        )}
        
        {activity.cost && (
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3" />
            <span>${activity.cost}</span>
          </div>
        )}
      </div>

      {activity.notes && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">{activity.notes}</p>
        </div>
      )}
    </div>
  )
}