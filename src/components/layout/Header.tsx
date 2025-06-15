import React from 'react'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { LogOut, Settings, Compass } from 'lucide-react'

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuthStore()

  return (
    <header className="bg-gradient-to-r from-adventure-50 via-white to-sky-50 border-b-2 border-adventure-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-adventure-500 to-adventure-600 rounded-xl flex items-center justify-center shadow-adventure animate-bounce-gentle">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-adventure-700 to-adventure-600 bg-clip-text text-transparent">
                  Adventure Planner
                </h1>
                <p className="text-xs text-earth-500 font-medium">Plan • Explore • Remember</p>
              </div>
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
                  className="ring-2 ring-adventure-200 hover:ring-adventure-300 transition-all duration-300"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-earth-800">
                    {profile?.full_name || 'Adventurer'}
                  </p>
                  <p className="text-xs text-earth-500">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-adventure-100">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut} className="hover:bg-sunset-100 hover:text-sunset-700">
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