import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#D4E4E0] relative">
      {/* Background Image - positioned at bottom with matching blue top */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Matching blue background for top area */}
        <div className="absolute inset-0 bg-[#D4E4E0]"></div>
        
        {/* Background image positioned at bottom */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            backgroundImage: "url('/ChatGPT Image Jun 26, 2025, 12_37_10 PM.png')",
            backgroundPosition: 'bottom center'
          }}
        ></div>
        
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Header - Compact */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Junto Logo */}
            <div className="flex items-center">
              <img 
                src="/Juntobig.jpg" 
                alt="Junto Logo" 
                className="h-24 w-auto object-contain object-center drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}