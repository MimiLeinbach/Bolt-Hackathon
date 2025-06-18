import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Users, Sparkles, Plane } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format, addDays, differenceInDays } from 'date-fns'

export default function CreateTripPage() {
  const navigate = useNavigate()
  const createTrip = useTripStore((state) => state.createTrip)
  
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    participantCount: 2,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      
      if (start >= end) {
        newErrors.endDate = 'End date must be after start date'
      }
      
      if (start < new Date(new Date().setHours(0, 0, 0, 0))) {
        newErrors.startDate = 'Start date cannot be in the past'
      }
    }
    
    if (formData.participantCount < 1 || formData.participantCount > 50) {
      newErrors.participantCount = 'Participant count must be between 1 and 50'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const trip = createTrip(formData)
      navigate(`/trip/${trip.id}`)
    } catch (error) {
      console.error('Error creating trip:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDayCount = () => {
    if (formData.startDate && formData.endDate) {
      const days = differenceInDays(new Date(formData.endDate), new Date(formData.startDate)) + 1
      return days > 0 ? days : 0
    }
    return 0
  }

  const getTomorrowDate = () => {
    return format(addDays(new Date(), 1), 'yyyy-MM-dd')
  }

  const getNextWeekDate = () => {
    return format(addDays(new Date(), 8), 'yyyy-MM-dd')
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="mr-4 p-2 rounded-xl hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-adventure-600 to-wanderlust-600 bg-clip-text text-transparent">
            Plan Your Adventure
          </h1>
          <p className="text-gray-600 mt-1">Tell us about your upcoming trip</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="glass-card rounded-2xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-adventure-500" />
                Where are you going?
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Tokyo Adventure, Beach Getaway, European Tour..."
                className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-400' : ''}`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.name}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-wanderlust-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className={`input-field ${errors.startDate ? 'border-red-300 focus:ring-red-400' : ''}`}
                />
                {errors.startDate && (
                  <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-wanderlust-500" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || format(new Date(), 'yyyy-MM-dd')}
                  className={`input-field ${errors.endDate ? 'border-red-300 focus:ring-red-400' : ''}`}
                />
                {errors.endDate && (
                  <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Participant Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-forest-500" />
                How many travelers?
              </label>
              <input
                type="number"
                name="participantCount"
                value={formData.participantCount}
                onChange={handleInputChange}
                min="1"
                max="50"
                className={`input-field ${errors.participantCount ? 'border-red-300 focus:ring-red-400' : ''}`}
              />
              {errors.participantCount && (
                <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.participantCount}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating your adventure...</span>
                </>
              ) : (
                <>
                  <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Create Trip</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-adventure-500" />
              Trip Preview
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-adventure-50 to-wanderlust-50 rounded-xl">
                <h4 className="font-semibold text-gray-800">
                  {formData.name || 'Your Amazing Trip'}
                </h4>
              </div>
              
              {formData.startDate && formData.endDate && (
                <div className="p-4 bg-gradient-to-r from-wanderlust-50 to-forest-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-800">
                      {getDayCount()} {getDayCount() === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-gradient-to-r from-forest-50 to-adventure-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-semibold text-gray-800">
                    {formData.participantCount} {formData.participantCount === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Date Suggestions */}
          <div className="glass-card rounded-2xl p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Suggestions</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  startDate: getTomorrowDate(),
                  endDate: format(addDays(new Date(), 3), 'yyyy-MM-dd')
                }))}
                className="w-full text-left p-3 rounded-lg hover:bg-adventure-50 transition-colors text-sm"
              >
                Weekend Trip (3 days)
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  startDate: getNextWeekDate(),
                  endDate: format(addDays(new Date(), 14), 'yyyy-MM-dd')
                }))}
                className="w-full text-left p-3 rounded-lg hover:bg-wanderlust-50 transition-colors text-sm"
              >
                Week-long Adventure (7 days)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}