import React from 'react'

export default function AdventureIllustration() {
  return (
    <div className="relative w-full overflow-hidden -mx-6 px-6">
      {/* Background illustration that blends with the page */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full object-cover opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" stopOpacity="0" />
              <stop offset="50%" stopColor="#dcf4e6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f0f9f4" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E7D48" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#256640" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dcf4e6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#bce8d1" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F7C544" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f4b429" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Sky background */}
          <rect width="1200" height="600" fill="url(#skyGradient)" />

          {/* Sun */}
          <circle cx="950" cy="120" r="50" fill="url(#sunGradient)" />
          
          {/* Sun rays */}
          <g stroke="#F7C544" strokeWidth="2" strokeLinecap="round" opacity="0.3">
            <line x1="950" y1="40" x2="950" y2="55" />
            <line x1="950" y1="185" x2="950" y2="200" />
            <line x1="870" y1="120" x2="855" y2="120" />
            <line x1="1030" y1="120" x2="1045" y2="120" />
            <line x1="890" y1="65" x2="880" y2="55" />
            <line x1="1010" y1="175" x2="1020" y2="185" />
            <line x1="1010" y1="65" x2="1020" y2="55" />
            <line x1="890" y1="175" x2="880" y2="185" />
          </g>

          {/* Floating clouds */}
          <g fill="#ffffff" opacity="0.4">
            <ellipse cx="200" cy="80" rx="35" ry="20" />
            <ellipse cx="230" cy="70" rx="40" ry="25" />
            <ellipse cx="260" cy="80" rx="30" ry="18" />
            
            <ellipse cx="600" cy="60" rx="25" ry="15" />
            <ellipse cx="620" cy="55" rx="30" ry="18" />
            <ellipse cx="640" cy="60" rx="20" ry="12" />
            
            <ellipse cx="1000" cy="200" rx="30" ry="18" />
            <ellipse cx="1025" cy="195" rx="35" ry="20" />
          </g>

          {/* Mountain silhouettes */}
          <polygon points="0,350 200,200 400,280 600,150 800,220 1000,180 1200,200 1200,600 0,600" fill="url(#mountainGradient)" />
          
          {/* Secondary mountain layer */}
          <polygon points="100,400 300,250 500,320 700,200 900,270 1100,230 1200,250 1200,600 0,600" fill="url(#mountainGradient)" opacity="0.5" />

          {/* Ground/grass areas */}
          <ellipse cx="300" cy="550" rx="200" ry="50" fill="url(#grassGradient)" />
          <ellipse cx="700" cy="570" rx="250" ry="60" fill="url(#grassGradient)" />
          <ellipse cx="1000" cy="560" rx="180" ry="40" fill="url(#grassGradient)" />

          {/* Scattered trees */}
          <g opacity="0.4">
            {/* Tree cluster 1 */}
            <rect x="145" y="380" width="10" height="40" fill="#2E7D48" />
            <polygon points="150,380 135,360 165,360" fill="#38A169" />
            <polygon points="150,370 140,355 160,355" fill="#48BB78" />
            
            <rect x="170" y="385" width="8" height="35" fill="#2E7D48" />
            <polygon points="174,385 162,370 186,370" fill="#38A169" />
            
            {/* Tree cluster 2 */}
            <rect x="850" y="390" width="12" height="45" fill="#2E7D48" />
            <polygon points="856,390 840,370 872,370" fill="#38A169" />
            <polygon points="856,380 845,365 867,365" fill="#48BB78" />
            
            <rect x="880" y="395" width="10" height="35" fill="#2E7D48" />
            <polygon points="885,395 873,380 897,380" fill="#38A169" />
            
            {/* Tree cluster 3 */}
            <rect x="1050" y="385" width="8" height="30" fill="#2E7D48" />
            <polygon points="1054,385 1042,370 1066,370" fill="#38A169" />
          </g>

          {/* Adventure elements scattered throughout */}
          <g opacity="0.3">
            {/* Hot air balloon in distance */}
            <ellipse cx="300" cy="180" rx="20" ry="28" fill="#F7C544" />
            <ellipse cx="295" cy="180" rx="6" ry="28" fill="#f4b429" />
            <ellipse cx="305" cy="180" rx="6" ry="28" fill="#e89611" />
            <rect x="292" y="208" width="16" height="12" fill="#8B4513" />
            <line x1="280" y1="208" x2="292" y2="215" stroke="#4A5568" strokeWidth="1" />
            <line x1="320" y1="208" x2="308" y2="215" stroke="#4A5568" strokeWidth="1" />

            {/* Tent silhouette */}
            <polygon points="750,420 780,460 720,460" fill="#2E7D48" />
            <polygon points="750,420 765,460 735,460" fill="#256640" />

            {/* Campfire smoke */}
            <path d="M600,450 Q605,440 595,430 Q605,420 595,410 Q605,400 595,390" stroke="#E2E8F0" strokeWidth="2" fill="none" opacity="0.4" />
          </g>

          {/* People silhouettes - very subtle */}
          <g opacity="0.2" fill="#2E7D48">
            {/* Group of friends as simple silhouettes */}
            <ellipse cx="400" cy="420" rx="3" ry="8" />
            <ellipse cx="415" cy="425" rx="3" ry="8" />
            <ellipse cx="430" cy="422" rx="3" ry="8" />
            <ellipse cx="445" cy="428" rx="3" ry="8" />
            <ellipse cx="460" cy="424" rx="3" ry="8" />
            <ellipse cx="475" cy="427" rx="3" ry="8" />
            
            {/* Another group */}
            <ellipse cx="650" cy="440" rx="3" ry="8" />
            <ellipse cx="665" cy="445" rx="3" ry="8" />
            <ellipse cx="680" cy="442" rx="3" ry="8" />
            <ellipse cx="695" cy="448" rx="3" ry="8" />
          </g>

          {/* Birds in the sky */}
          <g stroke="#2E7D48" strokeWidth="1.5" fill="none" opacity="0.3">
            <path d="M400,120 Q405,115 410,120 Q415,115 420,120" />
            <path d="M450,140 Q455,135 460,140 Q465,135 470,140" />
            <path d="M750,100 Q755,95 760,100" />
            <path d="M800,130 Q805,125 810,130 Q815,125 820,130" />
          </g>

          {/* Floating elements */}
          <g opacity="0.2">
            {/* Butterflies */}
            <g transform="translate(500, 300)">
              <ellipse cx="-2" cy="0" rx="2" ry="4" fill="#F7C544" />
              <ellipse cx="2" cy="0" rx="2" ry="4" fill="#f4b429" />
            </g>
            <g transform="translate(800, 320)">
              <ellipse cx="-2" cy="0" rx="2" ry="4" fill="#2E7D48" />
              <ellipse cx="2" cy="0" rx="2" ry="4" fill="#38A169" />
            </g>
            
            {/* Floating leaves */}
            <ellipse cx="350" cy="250" rx="3" ry="6" fill="#48BB78" transform="rotate(45 350 250)" />
            <ellipse cx="550" cy="280" rx="2" ry="5" fill="#38A169" transform="rotate(-30 550 280)" />
            <ellipse cx="900" cy="300" rx="3" ry="6" fill="#2E7D48" transform="rotate(60 900 300)" />
          </g>
        </svg>
      </div>

      {/* Content area with proper spacing */}
      <div className="relative z-10 py-16">
        {/* This creates the space where your content will sit above the illustration */}
      </div>
    </div>
  )
}