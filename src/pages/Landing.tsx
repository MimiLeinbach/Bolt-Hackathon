import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react'

export const Landing: React.FC = () => {
  const { signInWithGoogle } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
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
                onClick={handleSignIn}
                loading={loading}
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
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
            onClick={handleSignIn}
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