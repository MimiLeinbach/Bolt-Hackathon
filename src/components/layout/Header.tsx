import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { LogOut, Settings } from 'lucide-react'

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuthStore()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary-600">
                🏕️ AI Itinerary
              </h1>
            </div>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={profile?.avatar_url}
                  alt={profile?.full_name || user.email || ''}
                  fallback={profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}