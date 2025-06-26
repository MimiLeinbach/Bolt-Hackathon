import React, { useState } from 'react'
import { X, Users, UserPlus, Sparkles } from 'lucide-react'
import { useTripStore } from '../../stores/tripStore'

interface JoinTripModalProps {
  isOpen: boolean
  onClose: () => void
  tripId: string
  tripName: string
}

export default function JoinTripModal({ isOpen, onClose, tripId, tripName }: JoinTripModalProps) {
  const { joinTrip } = useTripStore()
  const [name, setName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    setIsJoining(true)
    setError('')

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const traveler = joinTrip(tripId, name.trim())
      
      if (traveler) {
        onClose()
        setName('')
      } else {
        setError('Failed to join trip. Please try again.')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsJoining(false)
    }
  }

  const handleClose = () => {
    if (!isJoining) {
      onClose()
      setName('')
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal - Responsive sizing */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-slide-up">
          {/* Header - Responsive */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-wanderlust-500" />
                Join Trip
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                You're joining "{tripName}"
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isJoining}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          {/* Form - Responsive */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError('')
                }}
                placeholder="Enter your name..."
                className={`input-field ${error ? 'border-red-300 focus:ring-red-400' : ''}`}
                disabled={isJoining}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 animate-slide-up">{error}</p>
              )}
            </div>

            {/* Buttons - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isJoining}
                className="w-full sm:w-auto btn-secondary disabled:opacity-50 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isJoining || !name.trim()}
                className="w-full sm:w-auto btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              >
                {isJoining ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Join Trip</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer - Responsive */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="bg-gradient-to-r from-wanderlust-50 to-adventure-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-wanderlust-500 flex-shrink-0" />
                <span>Once you join, you can add activities and collaborate with other travelers!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}