import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-light-gray">
      {/* Subtle Background Elements Only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-forest-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-forest-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header - Compact */}
      <header className="relative z-10 px-6 py-4 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Junto Logo */}
            <div className="flex items-center">
              <img 
                src="/Juntobig.jpg" 
                alt="Junto Logo" 
                className="h-24 w-auto object-contain object-center"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Moved Up */}
      <main className="relative z-10 px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}