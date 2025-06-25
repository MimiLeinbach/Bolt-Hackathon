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
            {/* Junto Logo matching the image */}
            <div className="flex flex-col items-center space-y-4">
              {/* Heart Logo - recreated to match image exactly */}
              <div className="relative w-24 h-20">
                {/* Forest Green Heart (left side) */}
                <div className="absolute left-0 top-0">
                  <div className="relative w-16 h-16">
                    {/* Main heart body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-forest-500 rounded-b-full"></div>
                    {/* Left lobe */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-forest-500 rounded-full"></div>
                    {/* Right lobe */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-forest-500 rounded-full"></div>
                    {/* Heart point */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-forest-500"></div>
                  </div>
                </div>
                
                {/* Gold Heart (right side, overlapping) */}
                <div className="absolute right-0 top-1">
                  <div className="relative w-16 h-16">
                    {/* Main heart body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gold-400 rounded-b-full"></div>
                    {/* Left lobe */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-gold-400 rounded-full"></div>
                    {/* Right lobe */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gold-400 rounded-full"></div>
                    {/* Heart point */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gold-400"></div>
                  </div>
                </div>
              </div>
              
              {/* Junto Text - positioned below heart like in image */}
              <div>
                <h1 className="text-5xl font-bold text-charcoal tracking-wide font-sans">
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