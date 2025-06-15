import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { MapPin, Users, DollarSign, Calendar, Mail, Lock, User } from 'lucide-react'

export default function Auth() {
  const { signIn, signUp } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
    }

    try {
      setLoading(true)
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.fullName)
      } else {
        await signIn(formData.email, formData.password)
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during authentication')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('') // Clear error when user starts typing
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

            {/* Auth Form */}
            <div className="animate-slide-up max-w-md mx-auto">
              <Card className="p-6">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-600">
                      {isSignUp ? 'Start planning your next adventure' : 'Sign in to your account'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        required
                      />
                    </div>

                    {isSignUp && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Lock className="w-4 h-4 inline mr-2" />
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirm your password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      loading={loading}
                      className="w-full py-3 text-lg font-medium"
                    >
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </Button>
                  </form>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp)
                        setError('')
                        setFormData({ email: '', password: '', fullName: '', confirmPassword: '' })
                      }}
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign in' 
                        : "Don't have an account? Sign up"
                      }
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Invited to a trip? {isSignUp ? 'Create an account' : 'Sign in'} to join your group
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary-600 hover:bg-gray-50"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  )
}