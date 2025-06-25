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

      {/* Adventure Lifestyle Illustrations - Dynamic & Organic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Mountain Hiker Illustration - Top Right (Large) */}
        <div className="absolute top-16 right-8 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <svg width="200" height="220" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Organic Mountain Background */}
            <path d="M20 160 Q35 80 55 100 Q75 60 95 90 Q115 45 135 75 Q155 35 175 85 Q185 110 180 160 Q175 180 160 185 Q140 190 120 185 Q100 188 80 185 Q60 190 40 185 Q25 180 20 160 Z" fill="#2E7D48" opacity="0.8"/>
            <path d="M35 160 Q50 95 70 115 Q90 75 110 105 Q130 60 150 90 Q165 70 175 120 Q180 145 175 170 Q170 185 155 188 Q135 190 115 188 Q95 190 75 188 Q55 190 40 185 Q35 175 35 160 Z" fill="#256640" opacity="0.6"/>
            
            {/* Hiker Figure */}
            <g transform="translate(95, 125)">
              {/* Backpack */}
              <ellipse cx="-6" cy="-12" rx="6" ry="8" fill="#F4C542"/>
              <ellipse cx="-4" cy="-9" rx="4" ry="1" fill="#e89611"/>
              
              {/* Body */}
              <ellipse cx="0" cy="0" rx="7" ry="11" fill="#2E7D48"/>
              
              {/* Head */}
              <circle cx="0" cy="-18" r="6" fill="#fdbcbc"/>
              
              {/* Hat */}
              <ellipse cx="0" cy="-22" rx="7" ry="3" fill="#256640"/>
              <ellipse cx="0" cy="-24" rx="2" ry="1" fill="#256640"/>
              
              {/* Arms */}
              <ellipse cx="-11" cy="-3" rx="3" ry="7" fill="#fdbcbc" transform="rotate(-20)"/>
              <ellipse cx="11" cy="-3" rx="3" ry="7" fill="#fdbcbc" transform="rotate(20)"/>
              
              {/* Legs */}
              <ellipse cx="-4" cy="15" rx="3" ry="10" fill="#2B2B2B"/>
              <ellipse cx="4" cy="15" rx="3" ry="10" fill="#2B2B2B"/>
              
              {/* Hiking Stick */}
              <line x1="15" y1="-10" x2="18" y2="25" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="15" cy="-12" r="2" fill="#2B2B2B"/>
            </g>
            
            {/* Organic Trees */}
            <g transform="translate(35, 150)">
              <ellipse cx="0" cy="10" rx="2" ry="15" fill="#8B4513"/>
              <path d="M0 -5 Q-8 -2 -6 5 Q-10 8 -4 10 Q2 12 6 8 Q10 5 8 0 Q6 -8 0 -5 Z" fill="#2E7D48"/>
            </g>
            <g transform="translate(155, 145)">
              <ellipse cx="0" cy="8" rx="1.5" ry="12" fill="#8B4513"/>
              <path d="M0 -4 Q-6 -1 -4 4 Q-7 6 -2 8 Q1 9 4 6 Q7 4 6 0 Q4 -6 0 -4 Z" fill="#256640"/>
            </g>
          </svg>
        </div>

        {/* Camping Scene - Bottom Left (Medium, moved away from text) */}
        <div className="absolute bottom-32 left-12 opacity-12 animate-float" style={{ animationDelay: '3s' }}>
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Organic Ground */}
            <path d="M10 105 Q40 100 80 102 Q120 105 150 100 Q155 108 150 115 Q120 118 80 115 Q40 118 10 115 Q5 110 10 105 Z" fill="#2E7D48" opacity="0.3"/>
            
            {/* Large Organic Tree */}
            <g transform="translate(125, 60)">
              <ellipse cx="0" cy="18" rx="3" ry="25" fill="#8B4513"/>
              <path d="M0 -10 Q-15 -8 -12 5 Q-18 12 -8 18 Q0 22 8 18 Q18 12 12 5 Q15 -8 0 -10 Z" fill="#2E7D48" opacity="0.8"/>
              <path d="M-6 -6 Q-12 -4 -10 3 Q-14 8 -6 12 Q0 14 6 12 Q14 8 10 3 Q12 -4 6 -6 Q0 -8 -6 -6 Z" fill="#256640" opacity="0.6"/>
            </g>
            
            {/* Organic Tent */}
            <g transform="translate(60, 80)">
              <path d="M0 30 Q-20 32 -18 28 Q-15 15 -8 8 Q0 5 8 8 Q15 15 18 28 Q20 32 0 30 Z" fill="#F4C542"/>
              <path d="M0 30 Q-20 32 -18 28 Q-15 15 -8 8 Q0 5 0 30 Z" fill="#e89611"/>
              <ellipse cx="0" cy="28" rx="1" ry="4" fill="#2B2B2B"/>
              <path d="M-8 8 Q0 6 8 8" stroke="#e89611" strokeWidth="1"/>
            </g>
            
            {/* Organic Campfire */}
            <g transform="translate(90, 90)">
              <ellipse cx="0" cy="12" rx="8" ry="2" fill="#8B4513"/>
              <ellipse x="-5" y="8" rx="1.5" ry="5" fill="#8B4513" transform="rotate(-15)"/>
              <ellipse x="3" y="8" rx="1.5" ry="5" fill="#8B4513" transform="rotate(15)"/>
              <ellipse x="-1" y="6" rx="1" ry="6" fill="#8B4513"/>
              {/* Organic Fire */}
              <path d="M0 6 Q-3 2 -1 0 Q1 1 0 3 Q2 1 1 0 Q3 2 0 6" fill="#ff6b35" opacity="0.8"/>
              <path d="M-2 4 Q-1 1 0 0 Q1 1 0 3 Q1 1 2 4" fill="#F4C542" opacity="0.9"/>
            </g>
            
            {/* Camper Figure */}
            <g transform="translate(75, 85)">
              <circle cx="0" cy="-6" r="3" fill="#fdbcbc"/>
              <ellipse cx="0" cy="0" rx="4" ry="6" fill="#2E7D48"/>
              <ellipse cx="-5" cy="-1" rx="1.5" ry="4" fill="#fdbcbc" transform="rotate(-10)"/>
              <ellipse cx="5" cy="-1" rx="1.5" ry="4" fill="#fdbcbc" transform="rotate(10)"/>
              <ellipse cx="-1.5" cy="8" rx="1.5" ry="5" fill="#2B2B2B"/>
              <ellipse cx="1.5" cy="8" rx="1.5" ry="5" fill="#2B2B2B"/>
            </g>
          </svg>
        </div>

        {/* NEW: Biking by Waterfall - Middle Right (Small) */}
        <div className="absolute top-1/3 right-16 opacity-11 animate-float" style={{ animationDelay: '5s' }}>
          <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Organic Waterfall Background */}
            <path d="M75 10 Q80 15 78 25 Q82 35 80 45 Q85 55 82 65 Q88 75 85 85 Q90 95 87 105 Q85 115 80 120 Q75 125 70 120 Q65 115 68 105 Q65 95 68 85 Q65 75 68 65 Q65 55 68 45 Q65 35 68 25 Q65 15 70 10 Q75 5 75 10 Z" fill="#87CEEB" opacity="0.6"/>
            
            {/* Waterfall Mist */}
            <ellipse cx="78" cy="30" rx="3" ry="8" fill="#ffffff" opacity="0.4"/>
            <ellipse cx="82" cy="50" rx="2" ry="6" fill="#ffffff" opacity="0.3"/>
            <ellipse cx="80" cy="70" rx="4" ry="10" fill="#ffffff" opacity="0.4"/>
            
            {/* Organic Rocks */}
            <path d="M70 115 Q85 112 88 118 Q85 125 75 123 Q65 125 62 118 Q65 112 70 115 Z" fill="#8B7D6B" opacity="0.7"/>
            <path d="M90 110 Q100 108 102 115 Q100 120 95 118 Q88 120 86 115 Q88 108 90 110 Z" fill="#8B7D6B" opacity="0.6"/>
            
            {/* Organic Trail */}
            <path d="M5 100 Q25 95 45 98 Q65 102 85 98 Q95 100 105 95" stroke="#2E7D48" strokeWidth="2" fill="none" opacity="0.5"/>
            
            {/* Bicycle */}
            <g transform="translate(45, 85)">
              {/* Wheels */}
              <circle cx="-12" cy="8" r="8" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              <circle cx="12" cy="8" r="8" fill="none" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Frame */}
              <path d="M-12 8 L0 -2 L12 8 M0 -2 L0 6 M-5 8 L5 8" stroke="#F4C542" strokeWidth="2" fill="none"/>
              
              {/* Handlebars */}
              <line x1="-2" y1="-2" x2="2" y2="-2" stroke="#2B2B2B" strokeWidth="2"/>
              
              {/* Seat */}
              <ellipse cx="0" cy="6" rx="2.5" ry="1" fill="#2B2B2B"/>
            </g>
            
            {/* Cyclist */}
            <g transform="translate(45, 70)">
              {/* Head */}
              <circle cx="0" cy="0" r="3" fill="#fdbcbc"/>
              {/* Helmet */}
              <path d="M-3 -1 Q0 -5 3 -1" fill="#F4C542"/>
              
              {/* Body */}
              <ellipse cx="0" cy="5" rx="4" ry="6" fill="#2E7D48"/>
              
              {/* Arms */}
              <ellipse cx="-5" cy="3" rx="1" ry="4" fill="#fdbcbc" transform="rotate(-25)"/>
              <ellipse cx="5" cy="3" rx="1" ry="4" fill="#fdbcbc" transform="rotate(25)"/>
              
              {/* Legs */}
              <ellipse cx="-1.5" cy="12" rx="1" ry="4" fill="#2B2B2B" transform="rotate(-10)"/>
              <ellipse cx="1.5" cy="12" rx="1" ry="4" fill="#2B2B2B" transform="rotate(10)"/>
            </g>
            
            {/* Organic Vegetation */}
            <g transform="translate(15, 105)">
              <ellipse cx="0" cy="4" rx="1" ry="8" fill="#8B4513"/>
              <path d="M0 -4 Q-4 -2 -3 2 Q-5 4 -1 5 Q1 6 3 4 Q5 2 4 0 Q3 -4 0 -4 Z" fill="#256640"/>
            </g>
            <g transform="translate(95, 100)">
              <ellipse cx="0" cy="3" rx="0.8" ry="6" fill="#8B4513"/>
              <path d="M0 -3 Q-3 -1 -2 1 Q-4 3 -1 4 Q1 5 2 3 Q4 1 3 0 Q2 -3 0 -3 Z" fill="#2E7D48"/>
            </g>
            
            {/* Water Pool at Bottom */}
            <path d="M65 120 Q75 118 85 120 Q88 125 85 128 Q75 130 65 128 Q62 125 65 120 Z" fill="#87CEEB" opacity="0.5"/>
          </svg>
        </div>

        {/* NEW: Small Organic Nature Element - Top Left */}
        <div className="absolute top-32 left-20 opacity-8 animate-float" style={{ animationDelay: '7s' }}>
          <svg width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Organic Hill */}
            <path d="M5 70 Q20 50 40 55 Q60 50 75 65 Q78 75 75 80 Q60 85 40 82 Q20 85 5 80 Q2 75 5 70 Z" fill="#2E7D48" opacity="0.6"/>
            
            {/* Small Organic Trees */}
            <g transform="translate(25, 65)">
              <ellipse cx="0" cy="3" rx="0.8" ry="8" fill="#8B4513"/>
              <path d="M0 -5 Q-4 -3 -3 1 Q-5 3 -1 4 Q1 5 3 3 Q5 1 4 -1 Q3 -5 0 -5 Z" fill="#256640"/>
            </g>
            <g transform="translate(55, 62)">
              <ellipse cx="0" cy="4" rx="1" ry="10" fill="#8B4513"/>
              <path d="M0 -6 Q-5 -4 -4 0 Q-6 2 -2 3 Q1 4 4 2 Q6 0 5 -2 Q4 -6 0 -6 Z" fill="#2E7D48"/>
            </g>
            
            {/* Flying Bird */}
            <g transform="translate(40, 25)">
              <path d="M-3 0 Q0 -2 3 0 Q0 1 -3 0" fill="#2B2B2B" opacity="0.7"/>
            </g>
            <g transform="translate(50, 20)">
              <path d="M-2 0 Q0 -1 2 0 Q0 0.5 -2 0" fill="#2B2B2B" opacity="0.5"/>
            </g>
          </svg>
        </div>

        {/* NEW: Tiny Organic Element - Bottom Right */}
        <div className="absolute bottom-24 right-32 opacity-9 animate-float" style={{ animationDelay: '9s' }}>
          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Small Organic Bush */}
            <path d="M10 50 Q20 40 30 45 Q40 40 50 50 Q52 60 50 65 Q40 68 30 65 Q20 68 10 65 Q8 60 10 50 Z" fill="#2E7D48" opacity="0.5"/>
            
            {/* Flowers */}
            <circle cx="20" cy="45" r="2" fill="#F4C542" opacity="0.8"/>
            <circle cx="35" cy="48" r="1.5" fill="#ff6b35" opacity="0.7"/>
            <circle cx="42" cy="52" r="1.8" fill="#F4C542" opacity="0.6"/>
            
            {/* Small Butterfly */}
            <g transform="translate(30, 30)">
              <ellipse cx="-1" cy="0" rx="2" ry="3" fill="#F4C542" opacity="0.6"/>
              <ellipse cx="1" cy="0" rx="2" ry="3" fill="#ff6b35" opacity="0.6"/>
              <line x1="0" y1="-2" x2="0" y2="2" stroke="#2B2B2B" strokeWidth="0.5"/>
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