import React, { useState } from 'react'
import { MapPin, DollarSign, Clock, Edit, Trash2, Users, UserPlus, UserMinus } from 'lucide-react'
import { useTripStore, Activity, Traveler } from '../../stores/tripStore'

interface ActivityCardProps {
  activity: Activity
  tripId: string
  currentTraveler: Traveler | null
  allTravelers: Traveler[]
  onEdit: () => void
  onDelete: () => void
}

export default function ActivityCard({ 
  activity, 
  tripId, 
  currentTraveler, 
  allTravelers, 
  onEdit, 
  onDelete 
}: ActivityCardProps) {
  const { joinActivity, leaveActivity } = useTripStore()
  const [showActions, setShowActions] = useState(false)
  const [isJoining, setIsJoining] = useState(false)

  const isParticipating = currentTraveler ? activity.participants.includes(currentTraveler.id) : false
  const participantCount = activity.participants.length
  
  // Get participant names for display
  const participantNames = activity.participants
    .map(participantId => allTravelers.find(t => t.id === participantId)?.name)
    .filter(Boolean)
    .slice(0, 3) // Show max 3 names

  const handleToggleParticipation = async () => {
    if (!currentTraveler) return
    
    setIsJoining(true)
    
    try {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (isParticipating) {
        leaveActivity(tripId, activity.id, currentTraveler.id)
      } else {
        joinActivity(tripId, activity.id, currentTraveler.id)
      }
    } finally {
      setIsJoining(false)
    }
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
    <div 
      className="bg-white/60 rounded-lg p-3 sm:p-4 border border-gray-100 hover:shadow-md transition-all duration-200 relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base leading-tight pr-2">{activity.title}</h4>
          {activity.description && (
            <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed">{activity.description}</p>
          )}
        </div>
        
        {/* Action Buttons - Responsive */}
        <div className={`flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0 sm:opacity-0'} opacity-100 sm:opacity-0 group-hover:opacity-100`}>
          <button
            onClick={onEdit}
            className="p-1.5 sm:p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-adventure-600 transition-colors"
            title="Edit activity"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 sm:p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete activity"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Activity Details - Responsive layout */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-3">
        {activity.time && (
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span>{activity.time}</span>
          </div>
        )}
        
        {activity.location && (
          <div className="flex items-center space-x-1 min-w-0">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
        )}
        
        {activity.cost && (
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 flex-shrink-0" />
            <span>${activity.cost}</span>
          </div>
        )}
      </div>

      {/* Participation Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-gray-100 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          {/* Participant Count */}
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-600">
              {participantCount} {participantCount === 1 ? 'person' : 'people'}
            </span>
          </div>
          
          {/* Participant Avatars - Responsive */}
          {participantCount > 0 && (
            <div className="flex items-center space-x-1">
              {activity.participants.slice(0, 3).map((participantId, index) => {
                const traveler = allTravelers.find(t => t.id === participantId)
                if (!traveler) return null
                
                return (
                  <div
                    key={participantId}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(index)}`}
                    title={traveler.name}
                  >
                    {getTravelerInitials(traveler.name)}
                  </div>
                )
              })}
              
              {participantCount > 3 && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium">
                  +{participantCount - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Join/Leave Button - Responsive */}
        {currentTraveler && (
          <button
            onClick={handleToggleParticipation}
            disabled={isJoining}
            className={`flex items-center justify-center space-x-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
              isParticipating
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                : 'bg-adventure-50 text-adventure-700 hover:bg-adventure-100 border border-adventure-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isJoining ? (
              <>
                <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                <span>{isParticipating ? 'Leaving...' : 'Joining...'}</span>
              </>
            ) : isParticipating ? (
              <>
                <UserMinus className="w-3 h-3" />
                <span>Leave</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                <span>Join</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Participant Names - Responsive */}
      {participantCount > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          <span className="leading-relaxed">
            {participantNames.length > 0 && (
              <>
                Going: {participantNames.join(', ')}
                {participantCount > participantNames.length && ` and ${participantCount - participantNames.length} more`}
              </>
            )}
          </span>
        </div>
      )}

      {/* Notes - Responsive */}
      {activity.notes && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600 leading-relaxed">{activity.notes}</p>
        </div>
      )}
    </div>
  )
}