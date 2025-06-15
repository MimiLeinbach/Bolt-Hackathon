import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react'

export const Landing: React.FC = () => {
  const loading = false

  const handleGetStarted = () => {
    // Navigate to auth page or show auth modal
    window.location.href = '/auth'
  }

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborative Planning',
      description: 'Invite friends and plan together in real-time'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Trip Organization',
      description: 'Organize accommodations, activities, and meals'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Cost Splitting',
      description: 'Automatic expense calculations and fair splitting'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location Tracking',
      description: 'Keep track of all your trip locations and details'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Plan Group Trips
                <span className="block text-primary-600">Together</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Coordinate accommodations, activities, and expenses in one place. 
                Make group travel planning effortless and fun.
              </p>
            </div>

            <div className="animate-slide-up">
              <Button
                size="lg"
                onClick={handleGetStarted}
                loading={loading}
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Invited to a trip? Sign in to join your group
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need for group travel
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features to make planning and organizing trips a breeze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center animate-fade-in">
              <CardContent className="py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to plan your next adventure?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of travelers who trust AI Itinerary for their group trips
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStarted}
            loading={loading}
            className="bg-white text-primary-600 hover:bg-gray-50"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  )
}