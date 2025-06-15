import React, { useState } from 'react'
import { X, Calendar, Users, MapPin, Compass, Sparkles } from 'lucide-react'
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

  const getRandomAdventureEmoji = () => {
    const emojis = ['🏔️', '🏖️', '🏕️', '🗻', '🌊', '🌲', '🏝️', '🎿', '🚁', '⛵']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card variant="whimsical" className="w-full max-w-md animate-scale-in shadow-whimsical">
        <div className="flex items-center justify-between p-6 border-b border-adventure-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-xl flex items-center justify-center animate-bounce-gentle">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-adventure-700 to-adventure-600 bg-clip-text text-transparent">
              Create New Adventure
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-earth-400 hover:text-earth-600 transition-colors p-1 hover:bg-earth-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">
                <Sparkles className="w-4 h-4 inline mr-2 text-adventure-500" />
                Adventure Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Epic Tahoe Skiing Adventure 🎿"
                className="w-full px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-earth-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1 text-adventure-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full px-3 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-earth-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1 text-adventure-500" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  className="w-full px-3 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">
                <Users className="w-4 h-4 inline mr-2 text-sunset-500" />
                Invite Fellow Adventurers
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  placeholder="friend@email.com"
                  className="flex-1 px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addParticipant}
                  disabled={!participantEmail}
                  className="px-4"
                >
                  Add
                </Button>
              </div>
              
              {formData.participants.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.participants.map((email) => (
                    <div key={email} className="flex items-center justify-between bg-adventure-50 border border-adventure-200 px-4 py-2 rounded-xl">
                      <span className="text-sm text-earth-700 font-medium">👤 {email}</span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(email)}
                        className="text-earth-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center pt-4">
              <div className="w-20 h-20 bg-gradient-to-br from-adventure-100 via-adventure-200 to-sunset-200 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-adventure animate-bounce-gentle">
                <div className="text-3xl">
                  {getRandomAdventureEmoji()}
                </div>
              </div>
              <p className="text-sm text-earth-500 font-medium">✨ AI will generate a perfect adventure image</p>
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
                variant="adventure"
                loading={loading}
                className="flex-1 shadow-adventure"
                disabled={!formData.name || !formData.start_date || !formData.end_date}
              >
                {loading ? 'Creating...' : '🚀 Create Adventure'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}