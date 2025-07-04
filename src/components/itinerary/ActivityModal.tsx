import React, { useState, useEffect } from 'react'
import { X, MapPin, DollarSign, FileText, Calendar, Sparkles, Clock } from 'lucide-react'
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
    time: '',
    cost: '',
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
          time: editActivity.time || '',
          cost: editActivity.cost ? editActivity.cost.toString() : '',
          notes: editActivity.notes || '',
          dayIndex: editActivity.dayIndex,
        })
      } else {
        // Reset form for new activity
        setFormData({
          title: '',
          description: '',
          location: '',
          time: '',
          cost: '',
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
    
    if (formData.time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.time)) {
      newErrors.time = 'Time must be in HH:MM format (e.g., 14:30)'
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
        time: formData.time.trim() || undefined,
        cost: formData.cost ? Number(formData.cost) : undefined,
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
      
      {/* Modal - Responsive sizing */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-lg sm:max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
          {/* Header - Responsive */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-adventure-500" />
                {editActivity ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <p className="text-gray-600 mt-1 text-xs sm:text-base">
                {editActivity ? 'Update your activity details' : 'Plan something amazing for your trip'}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>

          {/* Form - Responsive spacing */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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

            {/* Location and Time Row - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-wanderlust-500" />
                  Location (optional)
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
                  <Clock className="w-4 h-4 mr-2 text-forest-500" />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`input-field ${errors.time ? 'border-red-300 focus:ring-red-400' : ''}`}
                />
                {errors.time && (
                  <p className="mt-2 text-sm text-red-600 animate-slide-up">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Cost */}
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

            {/* Form Actions - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-secondary disabled:opacity-50 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
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