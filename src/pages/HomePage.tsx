import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, MapPin, Users, Calendar, Sparkles, AlertCircle } from 'lucide-react'
import { useTripStore } from '../stores/tripStore'
import { format } from 'date-fns'
import AdventureIllustration from '../components/shared/AdventureIllustration'

export default function HomePage() {
  const trips = useTripStore((state) => state.trips)
  const location = useLocation()
  const error = location.state?.error

  return (
    <div className="animate-fade-in relative min-h-screen">
      {/* Background Illustration */}
      <AdventureIllustration />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
