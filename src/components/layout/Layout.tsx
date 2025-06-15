import React from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-whimsical-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-32 h-32 bg-adventure-200 rounded-full opacity-20 animate-float pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-24 h-24 bg-sunset-200 rounded-full opacity-20 animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-1/2 right-1/4 w-16 h-16 bg-sky-200 rounded-full opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
    </div>
  )
}