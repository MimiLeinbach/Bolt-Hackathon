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
        {/* Mountain Hiker Illustration - Top Right */}
        <div className="absolute top-32 right-16 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
          <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mountain Background */}
            <path d="M20 160 L60 80 L100 120 L140 60 L180 140 L180 180 L20 180 Z" fill="#2E7D48" opacity="0.6"/>
            <path d="M40 160 L80 100 L120 140 L160 80 L180 160 L180 180 L40 180 Z" fill="#256640" opacity="0.4"/>
            
            {/* Hiker Figure */}
            <g transform="translate(85, 110)">
              {/* Backpack */}
              <rect x="-8" y="-15" width="16" height="20" rx="3" fill="#F4C542"/>
              <rect x="-6" y="-12" width="12" height="3" rx="1" fill="#e89611"/>
              
              {/* Body */}
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="#2E7D48"/>
              
              {/* Head */}
              <circle cx="0" cy="-20" r="6" fill="#fdbcbc"/>
              
              {/* Hat */}
              <ellipse cx="0" cy="-24" rx="8" ry="3" fill="#256640"/>
              <rect x="-2" y="-26" width="4" height="2" fill="#256640"/>
              
              {/* Arms */}
              <ellipse cx="-12" cy="-5" rx="3" ry="8" fill="#fdbcbc" transform="rotate(-20)"/>
              <ellipse cx="12" cy="-5" rx="3" ry="8" fill="#fdbcbc" transform="rotate(20)"/>
              
              {/* Legs */}
              <ellipse cx="-4" cy="15" rx="3" ry="10" fill="#2B2B2B"/>
              <ellipse cx="4" cy="15" rx="3" ry="10" fill="#2B2B2B"/>
              
              {/* Hiking Stick */}
              <line x1="15" y1="-10" x2="20" y2="25" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
            </g>
            
            {/* Trees */}
            <g transform="translate(30, 140)">
              <rect x="0" y="10" width="4" height="15" fill="#8B4513"/>
              <polygon points="2,0 8,10 -4,10" fill="#2E7D48"/>
            </g>
            <g transform="translate(150, 135)">
              <rect x="0" y="8" width="3" height="12" fill="#8B4513"/>
              <polygon points="1.5,0 6,8 -3,8" fill="#256640"/>
            </g>
          </svg>
        </div>

        {/* Camping Scene - Bottom Left */}
        <div className="absolute bottom-20 left-8 opacity-12 animate-float" style={{ animationDelay: '3s' }}>
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <ellipse cx="100" cy="140" rx="90" ry="15" fill="#2E7D48" opacity="0.3"/>
            
            {/* Large Tree */}
            <g transform="translate(160, 80)">
              <rect x="-3" y="20" width="6" height="40" fill="#8B4513"/>
              <circle cx="0" cy="15" r="25" fill="#2E7D48" opacity="0.8"/>
              <circle cx="-8" cy="8" r="18" fill="#256640" opacity="0.6"/>
              <circle cx="8" cy="12" r="20" fill="#2E7D48" opacity="0.7"/>
            </g>
            
            {/* Tent */}
            <g transform="translate(80, 100)">
              <path d="M0 40 L-25 40 L-12.5 10 L12.5 10 L25 40 Z" fill="#F4C542"/>
              <path d="M0 40 L-25 40 L-12.5 10 L0 10 Z" fill="#e89611"/>
              <rect x="-2" y="35" width="4" height="8" fill="#2B2B2B"/>
              <line x1="-12.5" y1="10" x2="12.5" y2="10" stroke="#e89611" strokeWidth="1"/>
            </g>
            
            {/* Campfire */}
            <g transform="translate(120, 120)">
              <ellipse cx="0" cy="15" rx="12" ry="3" fill="#8B4513"/>
              <rect x="-8" y="10" width="3" height="8" fill="#8B4513" transform="rotate(-15)"/>
              <rect x="5" y="10" width="3" height="8" fill="#8B4513" transform="rotate(15)"/>
              <rect x="-2" y="8" width="4" height="10" fill="#8B4513"/>
              {/* Fire */}
              <path d="M0 8 Q-3 3 0 0 Q3 3 0 8" fill="#ff6b35" opacity="0.8"/>
              <path d="M-3 6 Q-1 2 -3 0 Q-1 2 -3 6" fill="#F4C542" opacity="0.9"/>
              <path d="M3 6 Q1 2 3 0 Q1 2 3 6" fill="#F4C542" opacity="0.9"/>
            </g>
            
            {/* Camper Figure */}
            <g transform="translate(100, 110)">
              <circle cx="0" cy="-8" r="4" fill="#fdbcbc"/>
              <ellipse cx="0" cy="0" rx="5" ry="8" fill="#2E7D48"/>
              <ellipse cx="-7" cy="-2" rx="2" ry="5" fill="#fdbcbc" transform="rotate(-10)"/>
              <ellipse cx="7" cy="-2" rx="2" ry="5" fill="#fdbcbc" transform="rotate(10)"/>
              <ellipse cx="-2" cy="10" rx="2" ry="6" fill="#2B2B2B"/>
              <ellipse cx="2" cy="10" rx="2" ry="6" fill="#2B2B2B"/>
            </g>
          </svg>
        </div>

        {/* Biking Adventure - Middle Right */}
        <div className="absolute top-1/2 right-4 opacity-10 animate-float" style={{ animationDelay: '5s' }}>
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trail/Path */}
            <path d="M0 80 Q40 70 80 75 Q120 80 160 70" stroke="#2E7D48" strokeWidth="3" fill="none" opacity="0.4"/>
            
            {/* Bicycle */}
            <g transform="translate(80, 70)">
              {/* Wheels */}
              <circle cx="-20" cy="15" r="12" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              <circle cx="20" cy="15" r="12" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Frame */}
              <path d="M-20 15 L0 0 L20 15 M0 0 L0 10 M-8 15 L8 15" stroke="#F4C542" strokeWidth="2" fill="none"/>
              
              {/* Handlebars */}
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Seat */}
              <ellipse cx="0" cy="10" rx="4" ry="2" fill="#2B2B2B"/>
            </g>
            
            {/* Cyclist */}
            <g transform="translate(80, 45)">
              {/* Head */}
              <circle cx="0" cy="0" r="5" fill="#fdbcbc"/>
              {/* Helmet */}
              <path d="M-5 -2 Q0 -8 5 -2" fill="#F4C542"/>
              
              {/* Body */}
              <ellipse cx="0" cy="8" rx="6" ry="10" fill="#2E7D48"/>
              
              {/* Arms */}
              <ellipse cx="-8" cy="5" rx="2" ry="6" fill="#fdbcbc" transform="rotate(-30)"/>
              <ellipse cx="8" cy="5" rx="2" ry="6" fill="#fdbcbc" transform="rotate(30)"/>
              
              {/* Legs */}
              <ellipse cx="-3" cy="20" rx="2" ry="8" fill="#2B2B2B" transform="rotate(-15)"/>
              <ellipse cx="3" cy="20" rx="2" ry="8" fill="#2B2B2B" transform="rotate(15)"/>
            </g>
            
            {/* Background Hills */}
            <path d="M0 90 Q40 75 80 80 Q120 85 160 75 L160 120 L0 120 Z" fill="#2E7D48" opacity="0.3"/>
            
            {/* Small Trees */}
            <g transform="translate(20, 85)">
              <rect x="0" y="8" width="2" height="8" fill="#8B4513"/>
              <circle cx="1" cy="6" r="4" fill="#256640"/>
            </g>
            <g transform="translate(140, 80)">
              <rect x="0" y="6" width="2" height="10" fill="#8B4513"/>
              <circle cx="1" cy="4" r="5" fill="#2E7D48"/>
            </g>
          </svg>
        </div>

        {/* Waterfall Scene - Top Left (Subtle) */}
        <div className="absolute top-40 left-12 opacity-8 animate-float" style={{ animationDelay: '7s' }}>
          <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rock Face */}
            <path d="M20 0 L100 0 L90 60 L80 80 L70 100 L60 120 L40 140 L20 140 Z" fill="#256640" opacity="0.6"/>
            
            {/* Waterfall */}
            <path d="M60 0 Q65 20 62 40 Q58 60 60 80 Q62 100 58 120 Q55 130 60 140" 
                  stroke="#87CEEB" strokeWidth="4" fill="none" opacity="0.7"/>
            <path d="M58 0 Q60 15 59 30 Q57 45 58 60 Q59 75 57 90 Q56 105 58 120" 
                  stroke="#B0E0E6" strokeWidth="2" fill="none" opacity="0.8"/>
            
            {/* Water Pool */}
            <ellipse cx="60" cy="135" rx="15" ry="5" fill="#87CEEB" opacity="0.5"/>
            
            {/* Mist/Spray */}
            <circle cx="55" cy="125" r="2" fill="#B0E0E6" opacity="0.4"/>
            <circle cx="65" cy="120" r="1.5" fill="#B0E0E6" opacity="0.3"/>
            <circle cx="52" cy="115" r="1" fill="#B0E0E6" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start">
            {/* Junto Logo - Full image, reduced to half size (h-24) */}
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

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-12 pt-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}