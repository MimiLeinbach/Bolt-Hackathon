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

      {/* Header - Responsive and mobile-friendly */}
      <header className="relative z-20 px-4 sm:px-6 py-3 sm:py-4 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Logo - Using reliable placeholder with error handling */}
            <div className="flex items-center">
              <img 
                src="https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=200&h=80&fit=crop"
                alt="Junto Logo" 
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain object-center drop-shadow-lg"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const textLogo = document.createElement('div');
                  textLogo.className = 'text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-forest-600 to-gold-400 bg-clip-text text-transparent';
                  textLogo.textContent = 'Junto';
                  target.parentNode?.appendChild(textLogo);
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive padding and max-width */}
      <main className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}