import React, { useState } from 'react'
import { X, Calendar, Users, MapPin } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { Button } from './ui/Button'
import { Card, CardContent } from './ui/Card'

interface CreateTripModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function CreateTripModal({ isOpen = false, onClose }: CreateTripModalProps) {
  const { createTrip } = useTripStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    participants: [] as string[]
  })
  const [participantEmail, setParticipantEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.start_date || !formData.end_date) return

    try {
      setLoading(true)
      const tripId = await createTrip({
        name: formData.name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        image_url: `https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800`
      })
      
      // Reset form
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        participants: []
      })
      setParticipantEmail('')
      
      // Navigate to trip
      window.location.href = `/trip/${tripId}`
    } catch (error) {
      console.error('Error creating trip:', error)
    } finally {
      setLoading(false)
    }
  }

  const addParticipant = () => {
    if (participantEmail && !formData.participants.includes(participantEmail)) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantEmail]
      }))
      setParticipantEmail('')
    }
  }

  const removeParticipant = (email: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p !== email)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Trip</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Tahoe Skiing Weekend"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Add Participants
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addParticipant}
                  disabled={!participantEmail}
                >
                  Add
                </Button>
              </div>
              
              {formData.participants.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.participants.map((email) => (
                    <div key={email} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm text-gray-700">{email}</span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(email)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center pt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-sm text-gray-500">AI-generated trip image will be added</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
                disabled={!formData.name || !formData.start_date || !formData.end_date}
              >
                Create Trip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}