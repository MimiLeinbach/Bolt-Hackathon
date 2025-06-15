import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { MapPin, Users, DollarSign, Calendar, Mail, Lock, User, Compass, Mountain, Camera, Heart } from 'lucide-react'

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
      description: 'Invite friends and plan together in real-time',
      color: 'adventure'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Trip Organization',
      description: 'Organize accommodations, activities, and meals',
      color: 'sky'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Smart Cost Splitting',
      description: 'Automatic expense calculations and fair splitting',
      color: 'sunset'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location Tracking',
      description: 'Keep track of all your adventure destinations',
      color: 'adventure'
    }
  ]

  return (
    <div className="min-h-screen bg-whimsical-gradient relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-adventure-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-sunset-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-sky-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-adventure-300 rounded-full opacity-15 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="animate-fade-in">
              {/* Logo and tagline */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-2xl flex items-center justify-center shadow-whimsical animate-bounce-gentle">
                    <Compass className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-adventure-700 via-adventure-600 to-adventure-500 bg-clip-text text-transparent">
                      Adventure Planner
                    </h1>
                    <p className="text-earth-600 font-medium">Where memories begin</p>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-earth-800 mb-6">
                Plan Epic Adventures
                <span className="block bg-gradient-to-r from-adventure-600 to-sunset-500 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-xl text-earth-600 mb-8 max-w-2xl mx-auto">
                Turn your travel dreams into reality. Coordinate with friends, split costs fairly, 
                and create unforgettable memories on every journey.
              </p>

              {/* Adventure icons */}
              <div className="flex justify-center space-x-6 mb-12">
                <div className="animate-bounce-gentle">
                  <Mountain className="w-8 h-8 text-adventure-500" />
                </div>
                <div className="animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
                  <Camera className="w-8 h-8 text-sunset-500" />
                </div>
                <div className="animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
                  <Heart className="w-8 h-8 text-sky-500" />
                </div>
              </div>
            </div>

            {/* Auth Form */}
            <div className="animate-slide-up max-w-md mx-auto">
              <Card variant="whimsical" className="p-6 shadow-whimsical">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-earth-800 mb-2">
                      {isSignUp ? 'Start Your Journey' : 'Welcome Back, Explorer'}
                    </h3>
                    <p className="text-earth-600">
                      {isSignUp ? 'Create your account and start planning' : 'Sign in to continue your adventures'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                      <div>
                        <label className="block text-sm font-semibold text-earth-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-earth-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-earth-700 mb-2">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
                        className="w-full px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        required
                      />
                    </div>

                    {isSignUp && (
                      <div>
                        <label className="block text-sm font-semibold text-earth-700 mb-2">
                          <Lock className="w-4 h-4 inline mr-2" />
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirm your password"
                          className="w-full px-4 py-3 border-2 border-adventure-200 rounded-xl focus:ring-2 focus:ring-adventure-500 focus:border-adventure-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                          required
                        />
                      </div>
                    )}

                    {error && (
                      <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 animate-scale-in">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="adventure"
                      loading={loading}
                      className="w-full py-4 text-lg font-bold"
                    >
                      {isSignUp ? '🚀 Start Adventure' : '🗺️ Continue Journey'}
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
                      className="text-adventure-600 hover:text-adventure-700 font-semibold transition-colors duration-300 hover:underline"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign in' 
                        : "New to adventures? Create account"
                      }
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-earth-500">
                      🎒 Invited to an adventure? {isSignUp ? 'Create an account' : 'Sign in'} to join your crew
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
          <h2 className="text-3xl font-bold text-earth-800 mb-4">
            Everything you need for epic adventures
          </h2>
          <p className="text-lg text-earth-600">
            Powerful tools to make planning and organizing trips a magical experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} variant="whimsical" hover className="text-center animate-fade-in group">
              <CardContent className="py-8">
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-500 text-white rounded-2xl mb-4 shadow-adventure group-hover:animate-bounce-gentle transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-earth-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-earth-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-adventure-600 via-adventure-500 to-sunset-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            🌟 Ready for your next epic adventure?
          </h2>
          <p className="text-xl text-adventure-100 mb-8">
            Join thousands of explorers who trust Adventure Planner for their group journeys
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-adventure-700 hover:bg-adventure-50 shadow-whimsical font-bold"
          >
            🚀 Start Planning Free
          </Button>
        </div>
      </div>
    </div>
  )
}