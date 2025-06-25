import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-light-gray">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-forest-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-forest-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Large Junto Logo with Text */}
            <div className="flex items-center space-x-6">
              {/* Heart Logo */}
              <div className="relative">
                <div className="w-20 h-20 relative">
                  {/* Green heart shape */}
                  <div className="absolute inset-0 bg-forest-500 rounded-full transform rotate-45 origin-center scale-75"></div>
                  <div className="absolute top-2 left-2 w-8 h-8 bg-forest-500 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-forest-500 rounded-full"></div>
                  
                  {/* Yellow heart shape overlapping */}
                  <div className="absolute inset-0 bg-gold-400 rounded-full transform rotate-45 origin-center scale-75 translate-x-4 translate-y-1"></div>
                  <div className="absolute top-3 left-6 w-8 h-8 bg-gold-400 rounded-full"></div>
                  <div className="absolute top-3 right-6 w-8 h-8 bg-gold-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Junto Text */}
              <div>
                <h1 className="text-6xl font-bold text-charcoal tracking-tight">
                  Junto
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-12 pt-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}