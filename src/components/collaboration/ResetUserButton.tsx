import React, { useState } from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'
import { useTripStore } from '../../stores/tripStore'

interface ResetUserButtonProps {
  className?: string
}

export default function ResetUserButton({ className = '' }: ResetUserButtonProps) {
  const { resetUserForTesting, currentTraveler } = useTripStore()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReset = () => {
    resetUserForTesting()
    setShowConfirm(false)
    
    // Show a brief success message
    const originalTitle = document.title
    document.title = '🧪 User Reset - You are now a new user!'
    setTimeout(() => {
      document.title = originalTitle
    }, 3000)
  }

  if (!currentTraveler) {
    return null // Don't show if already not logged in
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

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className={`btn-secondary flex items-center space-x-2 text-sm ${className}`}
      title="Reset user session for testing"
    >
      <RotateCcw className="w-4 h-4" />
      <span>Reset User</span>
    </button>
  )
}