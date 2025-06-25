import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-light-gray relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-forest-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-forest-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Adventure Lifestyle Illustrations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Mountain Hiker Illustration - Top Right (Fixed colors) */}
        <div className="absolute top-24 right-12 opacity-12 animate-float" style={{ animationDelay: '1s' }}>
          <svg width="140" height="160" viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mountain Background */}
            <path d="M15 120 L45 60 L75 90 L105 45 L135 105 L135 140 L15 140 Z" fill="#2E7D48" opacity="0.8"/>
            <path d="M30 120 L60 75 L90 105 L120 60 L135 120 L135 140 L30 140 Z" fill="#256640" opacity="0.6"/>
            
            {/* Hiker Figure */}
            <g transform="translate(65, 85)">
              {/* Backpack */}
              <rect x="-6" y="-12" width="12" height="16" rx="2" fill="#F4C542"/>
              <rect x="-4" y="-9" width="8" height="2" rx="1" fill="#e89611"/>
              
              {/* Body */}
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#2E7D48"/>
              
              {/* Head */}
              <circle cx="0" cy="-15" r="5" fill="#fdbcbc"/>
              
              {/* Hat */}
              <ellipse cx="0" cy="-18" rx="6" ry="2" fill="#256640"/>
              <rect x="-1" y="-20" width="2" height="1" fill="#256640"/>
              
              {/* Arms */}
              <ellipse cx="-9" cy="-3" rx="2" ry="6" fill="#fdbcbc" transform="rotate(-20)"/>
              <ellipse cx="9" cy="-3" rx="2" ry="6" fill="#fdbcbc" transform="rotate(20)"/>
              
              {/* Legs */}
              <ellipse cx="-3" cy="12" rx="2" ry="8" fill="#2B2B2B"/>
              <ellipse cx="3" cy="12" rx="2" ry="8" fill="#2B2B2B"/>
              
              {/* Hiking Stick */}
              <line x1="12" y1="-8" x2="15" y2="20" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
            </g>
            
            {/* Trees */}
            <g transform="translate(25, 110)">
              <rect x="0" y="8" width="3" height="12" fill="#8B4513"/>
              <polygon points="1.5,0 6,8 -3,8" fill="#2E7D48"/>
            </g>
            <g transform="translate(115, 105)">
              <rect x="0" y="6" width="2" height="10" fill="#8B4513"/>
              <polygon points="1,0 5,6 -3,6" fill="#256640"/>
            </g>
          </svg>
        </div>

        {/* Camping Scene - Bottom Left (Keep as is - it's working well) */}
        <div className="absolute bottom-16 left-6 opacity-15 animate-float" style={{ animationDelay: '3s' }}>
          <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <ellipse cx="90" cy="125" rx="80" ry="12" fill="#2E7D48" opacity="0.3"/>
            
            {/* Large Tree */}
            <g transform="translate(140, 70)">
              <rect x="-2" y="18" width="4" height="35" fill="#8B4513"/>
              <circle cx="0" cy="12" r="22" fill="#2E7D48" opacity="0.8"/>
              <circle cx="-6" cy="6" r="16" fill="#256640" opacity="0.6"/>
              <circle cx="6" cy="10" r="18" fill="#2E7D48" opacity="0.7"/>
            </g>
            
            {/* Tent */}
            <g transform="translate(70, 90)">
              <path d="M0 35 L-22 35 L-11 8 L11 8 L22 35 Z" fill="#F4C542"/>
              <path d="M0 35 L-22 35 L-11 8 L0 8 Z" fill="#e89611"/>
              <rect x="-1" y="30" width="2" height="6" fill="#2B2B2B"/>
              <line x1="-11" y1="8" x2="11" y2="8" stroke="#e89611" strokeWidth="1"/>
            </g>
            
            {/* Campfire */}
            <g transform="translate(105, 105)">
              <ellipse cx="0" cy="12" rx="10" ry="2" fill="#8B4513"/>
              <rect x="-6" y="8" width="2" height="6" fill="#8B4513" transform="rotate(-15)"/>
              <rect x="4" y="8" width="2" height="6" fill="#8B4513" transform="rotate(15)"/>
              <rect x="-1" y="6" width="2" height="8" fill="#8B4513"/>
              {/* Fire */}
              <path d="M0 6 Q-2 2 0 0 Q2 2 0 6" fill="#ff6b35" opacity="0.8"/>
              <path d="M-2 4 Q-1 1 -2 0 Q-1 1 -2 4" fill="#F4C542" opacity="0.9"/>
              <path d="M2 4 Q1 1 2 0 Q1 1 2 4" fill="#F4C542" opacity="0.9"/>
            </g>
            
            {/* Camper Figure */}
            <g transform="translate(85, 95)">
              <circle cx="0" cy="-6" r="3" fill="#fdbcbc"/>
              <ellipse cx="0" cy="0" rx="4" ry="6" fill="#2E7D48"/>
              <ellipse cx="-5" cy="-1" rx="1.5" ry="4" fill="#fdbcbc" transform="rotate(-10)"/>
              <ellipse cx="5" cy="-1" rx="1.5" ry="4" fill="#fdbcbc" transform="rotate(10)"/>
              <ellipse cx="-1.5" cy="8" rx="1.5" ry="5" fill="#2B2B2B"/>
              <ellipse cx="1.5" cy="8" rx="1.5" ry="5" fill="#2B2B2B"/>
            </g>
          </svg>
        </div>

        {/* Biking Adventure - Middle Right (Fixed colors) */}
        <div className="absolute top-1/2 right-8 opacity-12 animate-float" style={{ animationDelay: '5s' }}>
          <svg width="130" height="100" viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trail/Path */}
            <path d="M0 65 Q30 55 60 60 Q90 65 130 55" stroke="#2E7D48" strokeWidth="2" fill="none" opacity="0.6"/>
            
            {/* Background Hills */}
            <path d="M0 70 Q30 60 60 62 Q90 65 130 58 L130 100 L0 100 Z" fill="#2E7D48" opacity="0.4"/>
            
            {/* Bicycle */}
            <g transform="translate(65, 55)">
              {/* Wheels */}
              <circle cx="-15" cy="12" r="10" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              <circle cx="15" cy="12" r="10" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Frame */}
              <path d="M-15 12 L0 0 L15 12 M0 0 L0 8 M-6 12 L6 12" stroke="#F4C542" strokeWidth="2" fill="none"/>
              
              {/* Handlebars */}
              <line x1="-2" y1="0" x2="2" y2="0" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Seat */}
              <ellipse cx="0" cy="8" rx="3" ry="1.5" fill="#2B2B2B"/>
            </g>
            
            {/* Cyclist */}
            <g transform="translate(65, 35)">
              {/* Head */}
              <circle cx="0" cy="0" r="4" fill="#fdbcbc"/>
              {/* Helmet */}
              <path d="M-4 -1 Q0 -6 4 -1" fill="#F4C542"/>
              
              {/* Body */}
              <ellipse cx="0" cy="6" rx="5" ry="8" fill="#2E7D48"/>
              
              {/* Arms */}
              <ellipse cx="-6" cy="4" rx="1.5" ry="5" fill="#fdbcbc" transform="rotate(-25)"/>
              <ellipse cx="6" cy="4" rx="1.5" ry="5" fill="#fdbcbc" transform="rotate(25)"/>
              
              {/* Legs */}
              <ellipse cx="-2" cy="16" rx="1.5" ry="6" fill="#2B2B2B" transform="rotate(-12)"/>
              <ellipse cx="2" cy="16" rx="1.5" ry="6" fill="#2B2B2B" transform="rotate(12)"/>
            </g>
            
            {/* Small Trees */}
            <g transform="translate(15, 68)">
              <rect x="0" y="6" width="1.5" height="6" fill="#8B4513"/>
              <circle cx="0.75" cy="4" r="3" fill="#256640"/>
            </g>
            <g transform="translate(110, 63)">
              <rect x="0" y="5" width="1.5" height="8" fill="#8B4513"/>
              <circle cx="0.75" cy="3" r="4" fill="#2E7D48"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Junto Logo - Properly sized and positioned */}
            <div className="flex items-center">
              <img 
                src="/Juntobig.jpg" 
                alt="Junto Logo" 
                className="h-20 w-auto object-contain object-center"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-12 pt-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}