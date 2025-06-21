import React, { useState } from 'react'
import { RotateCcw, AlertTriangle, Users, ChevronDown } from 'lucide-react'
import { useTripStore } from '../../stores/tripStore'

interface ResetUserButtonProps {
  className?: string
}

export default function ResetUserButton({ className = '' }: ResetUserButtonProps) {
  const { resetUserForTesting, currentTraveler, currentTrip, setCurrentTraveler } = useTripStore()
  const [showOptions, setShowOptions] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const availableTravelers = currentTrip?.travelers || []
  const otherTravelers = availableTravelers.filter(t => t.id !== currentTraveler?.id)

  const handleReset = () => {
    resetUserForTesting()
    setShowConfirm(false)
    setShowOptions(false)
    
    // Show a brief success message
    const originalTitle = document.title
    document.title = '🧪 User Reset - You are now a new user!'
    setTimeout(() => {
      document.title = originalTitle
    }, 3000)
  }

  const handleSwitchToTraveler = (traveler: any) => {
    console.log(`🧪 Switching to existing traveler: ${traveler.name}`)
    setCurrentTraveler(traveler)
    setShowOptions(false)
    
    // Show success message
    const originalTitle = document.title
    document.title = `🧪 Now logged in as ${traveler.name}!`
    setTimeout(() => {
      document.title = originalTitle
    }, 3000)
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

  if (!currentTraveler && !showOptions) {
    return (
      <button
        onClick={() => setShowOptions(true)}
        className={`btn-secondary flex items-center space-x-2 text-sm ${className}`}
        title="Login as existing traveler"
      >
        <Users className="w-4 h-4" />
        <span>Login As...</span>
      </button>
    )
  }

  if (showConfirm) {
    return (
      <div className={`bg-yellow-50 border border-yellow-300 rounded-lg p-3 ${className}`}>
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-yellow-800 mb-1">Reset User Session?</h4>
            <p className="text-sm text-yellow-700 mb-3">
              This will log you out and let you test the app as a new user. You can rejoin trips later.
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReset}
                className="btn-primary text-sm px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary text-sm px-3 py-1.5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showOptions) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[280px] ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-800">🧪 Testing Options</h4>
          <button
            onClick={() => setShowOptions(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          {/* Reset to New User */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Become New User</h5>
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full btn-secondary text-sm flex items-center space-x-2 justify-center"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to New User</span>
            </button>
          </div>

          {/* Switch to Existing Traveler */}
          {otherTravelers.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Login as Existing Traveler
              </h5>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {otherTravelers.map((traveler, index) => (
                  <button
                    key={traveler.id}
                    onClick={() => handleSwitchToTraveler(traveler)}
                    className="w-full p-2 rounded-lg hover:bg-gray-50 border border-gray-200 flex items-center space-x-3 text-left transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(index)}`}>
                      {getTravelerInitials(traveler.name)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{traveler.name}</div>
                      <div className="text-xs text-gray-500">
                        {traveler.isOwner ? 'Trip Owner' : 'Traveler'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Current Status */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Currently: <span className="font-medium text-gray-700">
                {currentTraveler ? currentTraveler.name : 'Not logged in'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(true)}
        className={`btn-secondary flex items-center space-x-2 text-sm ${className}`}
        title="Testing options"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Switch User</span>
        <ChevronDown className="w-3 h-3" />
      </button>
    </div>
  )
}