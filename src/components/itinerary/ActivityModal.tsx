import React, { useState, useEffect } from 'react'
import { X, MapPin, Users, DollarSign, FileText, Calendar, Sparkles } from 'lucide-react'
import { useTripStore, Activity } from '../../stores/tripStore'
import { format, addDays } from 'date-fns'

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  tripId: string
  tripStartDate: string
  tripEndDate: string
  selectedDayIndex?: number
  editActivity?: Activity | null
}

export default function ActivityModal({ 
  isOpen, 
  onClose, 
  tripId, 
  tripStartDate, 
  tripEndDate,
  selectedDayIndex = 0,
  editActivity = null 
}: ActivityModalProps) {
  const { addActivity, updateActivity } = useTripStore()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    cost: '',
    participantCount: '',
    notes: '',
    dayIndex: selectedDayIndex,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens/closes or when editing different activity
  useEffect(() => {
    if (isOpen) {
      if (editActivity) {
        // Populate form with existing activity data
        setFormData({
          title: editActivity.title,
          description: editActivity.description || '',
          location: editActivity.location || '',
          cost: editActivity.cost ? editActivity.cost.toString() : '',
          participantCount: editActivity.participantCount ? editActivity.participantCount.toString() : '',
          notes: editActivity.notes || '',
          dayIndex: editActivity.dayIndex,
        })
      } else {
        // Reset form for new activity
        setFormData({
          title: '',
          description: '',
          location: '',
          cost: '',
          participantCount: '',
          notes: '',
          dayIndex: selectedDayIndex,
        })
      }
      setErrors({})
    }
  }, [isOpen, editActivity, selectedDayIndex])

  // Generate day options for the trip
  const generateDayOptions = () => {
    const startDate = new Date(tripStartDate)
    const endDate = new Date(tripEndDate)
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    
    return Array.from({ length: totalDays }, (_, index) => {
      const currentDate = addDays(startDate, index)
      return {
        value: index,
        label: `Day ${index + 1} - ${format(currentDate, 'MMM d, yyyy')}`,
        dayName: format(currentDate, 'EEEE')
      }
    })
  }

  const dayOptions = generateDayOptions()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Activity title is required'
    }
    
    if (formData.cost && isNaN(Number(formData.cost))) {
      newErrors.cost = 'Cost must be a valid number'
    }
    
    if (formData.participantCount && (isNaN(Number(formData.participantCount)) || Number(formData.participantCount) < 1)) {
      newErrors.participantCount = 'Participant count must be a positive number'
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
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const activityData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        location: formData.location.trim() || undefined,
        cost: formData.cost ? Number(formData.cost) : undefined,
        participantCount: formData.participantCount ? Number(formData.participantCount) : undefined,
        notes: formData.notes.trim() || undefined,
        dayIndex: Number(formData.dayIndex),
      }

      if (editActivity) {
        // Update existing activity
        updateActivity(tripId, editActivity.id, activityData)
      } else {
        // Add new activity
        addActivity(tripId, activityData)
      }
      
      onClose()
    } catch (error) {
      console.error('Error saving activity:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
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
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-adventure-500" />
                {editActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <p className="text-gray-600 mt-1">
                {editActivity ? 'Update your activity details' : 'Plan something amazing for your trip'}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Day Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-adventure-500" />
                Which day?
              </label>
              <select
                name="dayIndex"
                value={formData.dayIndex}
                onChange={handleInputChange}
                className="input-field"
              >
                {dayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.dayName})
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Activity Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Visit Tokyo Tower, Beach Day, Museum Tour..."
                className={`input-field ${errors.title ? 'border-red-300 focus:ring-red-400' : ''}`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us more about this activity..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Location and Cost Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-wanderlust-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Where is this happening?"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-forest-500" />
                  Cost per person
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={`input-field ${errors.cost ? 'border-red-300 focus:ring-red-400' : ''}`}
                />
                {errors.cost && (
                  <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.cost}</p>
                )}
              </div>
            </div>

            {/* Participant Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-wanderlust-500" />
                How many people?
              </label>
              <input
                type="number"
                name="participantCount"
                value={formData.participantCount}
                onChange={handleInputChange}
                placeholder="Leave empty to include everyone"
                min="1"
                className={`input-field ${errors.participantCount ? 'border-red-300 focus:ring-red-400' : ''}`}
              />
              {errors.participantCount && (
                <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.participantCount}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special notes, requirements, or reminders..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="btn-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{editActivity ? 'Updating...' : 'Adding...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{editActivity ? 'Update Activity' : 'Add Activity'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}