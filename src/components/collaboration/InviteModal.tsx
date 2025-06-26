import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Copy, Check, Share2, Users, Bug, ExternalLink } from 'lucide-react'

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  tripId: string
  tripName: string
}

export default function InviteModal({ isOpen, onClose, tripId, tripName }: InviteModalProps) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [showEmailPreview, setShowEmailPreview] = useState(false)

  const inviteLink = `${window.location.origin}/trip/${tripId}?invite=true`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // Debug: Log the link being copied
      console.log('📋 Copied invite link:', inviteLink)
      console.log('🔗 Trip ID in link:', tripId)
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = inviteLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      console.log('📋 Copied invite link (fallback):', inviteLink)
    }
  }

  const handleTestInviteNewTab = () => {
    console.log('🧪 Opening invite link in new tab for testing')
    console.log('🧪 Link:', inviteLink)
    
    // Open in new tab so user can test without losing current session
    window.open(inviteLink, '_blank')
  }

  const handleTestInviteCurrentTab = () => {
    console.log('🧪 Testing invite flow in current tab for trip:', tripId)
    console.log('🧪 Current location before navigation:', window.location.href)
    console.log('🧪 Will navigate to:', `/trip/${tripId}?test=true`)
    
    // Close the modal first
    onClose()
    
    // Small delay to ensure modal closes before navigation
    setTimeout(() => {
      console.log('🧪 Navigating now...')
      // Use test=true parameter to force join modal even if user is logged in
      navigate(`/trip/${tripId}?invite=true&test=true`)
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - Responsive sizing and positioning */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-sm sm:max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
          {/* Header - Responsive */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-adventure-500" />
                Invite Friends
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Share "{tripName}" with your travel buddies
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          {/* Content - Responsive spacing */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Copy Link Section - Responsive */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Share Link</h3>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1 p-3 bg-gray-50 rounded-xl border">
                  <p className="text-xs sm:text-sm text-gray-600 font-mono truncate">
                    {inviteLink}
                  </p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`btn-secondary flex items-center justify-center space-x-2 transition-all w-full sm:w-auto ${
                    copied ? 'bg-green-50 text-green-700 border-green-200' : ''
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Test Invite Section - Responsive */}
            <div className="bg-yellow-50 rounded-xl p-3 sm:p-4 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <Bug className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800 mb-2 text-sm sm:text-base">Test Invite Flow</h4>
                  <p className="text-xs sm:text-sm text-yellow-700 mb-3">
                    Test how the invite experience works for new users:
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleTestInviteNewTab}
                      className="btn-secondary text-xs sm:text-sm bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open in New Tab</span>
                    </button>
                    <button
                      onClick={handleTestInviteCurrentTab}
                      className="btn-secondary text-xs sm:text-sm bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 justify-center"
                    >
                      🧪 Test Here
                    </button>
                  </div>
                  <p className="text-xs text-yellow-600 mt-2">
                    💡 "New Tab" preserves your current session, "Test Here" simulates a new user
                  </p>
                </div>
              </div>
            </div>

            {/* Debug Info - Responsive */}
            <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 text-sm">🔧 Debug Info</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div>Trip ID: <code className="bg-blue-100 px-1 rounded text-xs">{tripId}</code></div>
                <div className="break-all">Current URL: <code className="bg-blue-100 px-1 rounded text-xs">{window.location.href}</code></div>
                <div className="break-all">Invite Link: <code className="bg-blue-100 px-1 rounded text-xs">{inviteLink}</code></div>
              </div>
            </div>

            {/* Email Preview Section - Responsive */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Email Preview</h3>
                <button
                  onClick={() => setShowEmailPreview(!showEmailPreview)}
                  className="text-xs sm:text-sm text-adventure-600 hover:text-adventure-700 font-medium"
                >
                  {showEmailPreview ? 'Hide' : 'Show'} Preview
                </button>
              </div>
              
              {showEmailPreview && (
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border animate-slide-up">
                  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Trip Invitation</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      You're invited to join "{tripName}"!
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Hey! I'm planning an awesome trip and would love for you to join. 
                      Click the link below to see the itinerary and add your own ideas.
                    </p>
                    
                    <div className="bg-gradient-to-r from-adventure-500 to-wanderlust-500 text-white rounded-lg p-3 text-center">
                      <span className="text-xs sm:text-sm font-medium">Join Trip →</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      This invitation was sent through AI Itinerary
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions - Responsive */}
            <div className="bg-gradient-to-r from-wanderlust-50 to-adventure-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-wanderlust-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm sm:text-base">How it works</h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>• Share the link with your friends</li>
                    <li>• They'll enter their name to join</li>
                    <li>• Everyone can add and edit activities</li>
                    <li>• Costs are tracked automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Responsive */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <button
              onClick={onClose}
              className="w-full btn-primary"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}