import React, { useState } from 'react'
import { Users, Crown, Calendar, MoreVertical, UserMinus } from 'lucide-react'
import { useTripStore, Traveler } from '../../stores/tripStore'
import { format } from 'date-fns'

interface TravelersListProps {
  tripId: string
  travelers: Traveler[]
  currentTraveler: Traveler | null
}

export default function TravelersList({ tripId, travelers, currentTraveler }: TravelersListProps) {
  const { leaveTrip, getTravelerCosts } = useTripStore()
  const [showActions, setShowActions] = useState<string | null>(null)

  const handleLeaveTrip = (travelerId: string) => {
    if (window.confirm('Are you sure you want to leave this trip?')) {
      leaveTrip(tripId, travelerId)
    }
    setShowActions(null)
  }

  const getTravelerInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-adventure-500',
      'bg-wanderlust-500', 
      'bg-forest-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 flex items-center">
          <Users className="w-5 h-5 mr-2 text-wanderlust-500" />
          Travelers ({travelers.length})
        </h3>
      </div>

      <div className="space-y-3">
        {travelers.map((traveler, index) => {
          const travelerCost = getTravelerCosts(tripId, traveler.id)
          const isCurrentTraveler = currentTraveler?.id === traveler.id
          
          return (
            <div 
              key={traveler.id}
              className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(index)}`}>
                  {getTravelerInitials(traveler.name)}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      {traveler.name}
                      {isCurrentTraveler && (
                        <span className="text-xs text-gray-500 ml-1">(You)</span>
                      )}
                    </span>
                    {traveler.isOwner && (
                      <Crown className="w-4 h-4 text-yellow-500" title="Trip Owner" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {format(new Date(traveler.joinedAt), 'MMM d')}</span>
                    </div>
                    {travelerCost > 0 && (
                      <div className="text-forest-600 font-medium">
                        ${travelerCost.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isCurrentTraveler && !traveler.isOwner && (
                <div className="relative">
                  <button
                    onClick={() => setShowActions(showActions === traveler.id ? null : traveler.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  
                  {showActions === traveler.id && (
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                      <button
                        onClick={() => handleLeaveTrip(traveler.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <UserMinus className="w-4 h-4" />
                        <span>Leave Trip</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {travelers.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gradient-to-br from-wanderlust-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-wanderlust-500" />
          </div>
          <p className="text-sm text-gray-500">No travelers yet</p>
        </div>
      )}
    </div>
  )
}