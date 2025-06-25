import React from 'react'

export default function AdventureIllustration() {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F6FF" />
          </linearGradient>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A5568" />
            <stop offset="100%" stopColor="#2D3748" />
          </linearGradient>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#68D391" />
            <stop offset="100%" stopColor="#38A169" />
          </linearGradient>
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBD38D" />
            <stop offset="100%" stopColor="#F6AD55" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="400" fill="url(#skyGradient)" />

        {/* Sun */}
        <circle cx="650" cy="80" r="35" fill="url(#sunGradient)" />
        
        {/* Sun rays */}
        <g stroke="#FBD38D" strokeWidth="3" strokeLinecap="round">
          <line x1="650" y1="25" x2="650" y2="35" />
          <line x1="650" y1="125" x2="650" y2="135" />
          <line x1="595" y1="80" x2="585" y2="80" />
          <line x1="705" y1="80" x2="715" y2="80" />
          <line x1="615" y1="45" x2="608" y2="38" />
          <line x1="685" y1="115" x2="692" y2="122" />
          <line x1="685" y1="45" x2="692" y2="38" />
          <line x1="615" y1="115" x2="608" y2="122" />
        </g>

        {/* Clouds */}
        <g fill="white" opacity="0.8">
          <ellipse cx="150" cy="60" rx="25" ry="15" />
          <ellipse cx="170" cy="55" rx="30" ry="18" />
          <ellipse cx="190" cy="60" rx="20" ry="12" />
          
          <ellipse cx="450" cy="45" rx="20" ry="12" />
          <ellipse cx="465" cy="40" rx="25" ry="15" />
          <ellipse cx="480" cy="45" rx="18" ry="10" />
        </g>

        {/* Mountains */}
        <polygon points="0,250 150,120 300,200 450,100 600,180 800,150 800,400 0,400" fill="url(#mountainGradient)" />
        
        {/* Mountain highlights */}
        <polygon points="150,120 200,160 100,160" fill="#718096" opacity="0.6" />
        <polygon points="450,100 500,140 400,140" fill="#718096" opacity="0.6" />

        {/* Ground/grass */}
        <ellipse cx="400" cy="380" rx="400" ry="80" fill="url(#grassGradient)" />

        {/* Trees */}
        <g>
          {/* Tree 1 */}
          <rect x="95" y="280" width="10" height="40" fill="#8B4513" />
          <polygon points="100,280 85,260 115,260" fill="#22543D" />
          <polygon points="100,270 88,255 112,255" fill="#2F855A" />
          
          {/* Tree 2 */}
          <rect x="680" y="290" width="12" height="35" fill="#8B4513" />
          <polygon points="686,290 670,270 702,270" fill="#22543D" />
          <polygon points="686,280 673,265 699,265" fill="#2F855A" />
          
          {/* Tree 3 */}
          <rect x="720" y="295" width="8" height="30" fill="#8B4513" />
          <polygon points="724,295 712,280 736,280" fill="#22543D" />
        </g>

        {/* Campfire */}
        <g>
          {/* Fire base */}
          <ellipse cx="400" cy="320" rx="15" ry="5" fill="#8B4513" />
          {/* Logs */}
          <rect x="385" y="315" width="30" height="4" rx="2" fill="#A0522D" />
          <rect x="390" y="310" width="20" height="4" rx="2" fill="#A0522D" transform="rotate(15 400 312)" />
          {/* Flames */}
          <path d="M400,315 Q395,305 400,295 Q405,305 400,315" fill="#FF6B35" />
          <path d="M405,312 Q410,302 405,292 Q400,302 405,312" fill="#FF8E53" />
          <path d="M395,312 Q390,302 395,292 Q400,302 395,312" fill="#FF8E53" />
          {/* Smoke */}
          <path d="M400,295 Q405,285 395,275 Q405,265 395,255" stroke="#E2E8F0" strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* Tent */}
        <g>
          <polygon points="550,280 580,320 520,320" fill="#E53E3E" />
          <polygon points="550,280 565,320 535,320" fill="#C53030" />
          <rect x="548" y="285" width="4" height="35" fill="#8B4513" />
          <polygon points="545,320 555,320 550,315" fill="#2D3748" />
        </g>

        {/* Hot air balloon */}
        <g>
          <ellipse cx="200" cy="140" rx="25" ry="35" fill="#F6AD55" />
          <ellipse cx="190" cy="140" rx="8" ry="35" fill="#ED8936" />
          <ellipse cx="210" cy="140" rx="8" ry="35" fill="#DD6B20" />
          <rect x="190" y="175" width="20" height="15" fill="#8B4513" />
          <line x1="175" y1="175" x2="190" y2="185" stroke="#4A5568" strokeWidth="1" />
          <line x1="225" y1="175" x2="210" y2="185" stroke="#4A5568" strokeWidth="1" />
          <line x1="200" y1="165" x2="195" y2="185" stroke="#4A5568" strokeWidth="1" />
          <line x1="200" y1="165" x2="205" y2="185" stroke="#4A5568" strokeWidth="1" />
        </g>

        {/* People - Group of diverse friends */}
        <g>
          {/* Person 1 - Hiking with backpack */}
          <g transform="translate(250, 280)">
            <circle cx="0" cy="-25" r="8" fill="#FDBCB4" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#4299E1" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#2B6CB0" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <ellipse cx="-8" cy="-10" rx="4" ry="8" fill="#E53E3E" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 2 - Taking photos */}
          <g transform="translate(320, 285)">
            <circle cx="0" cy="-25" r="8" fill="#D69E2E" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#38A169" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#2F855A" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <rect x="6" y="-20" width="8" height="6" rx="2" fill="#2D3748" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 3 - Sitting by campfire */}
          <g transform="translate(380, 300)">
            <circle cx="0" cy="-15" r="8" fill="#F7FAFC" />
            <rect x="-6" y="-7" width="12" height="15" rx="6" fill="#E53E3E" />
            <rect x="-8" y="8" width="16" height="8" rx="8" fill="#2B6CB0" />
            <path d="M-2,-20 Q0,-25 2,-20" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 4 - Standing with arms raised */}
          <g transform="translate(450, 275)">
            <circle cx="0" cy="-25" r="8" fill="#C05621" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#F6AD55" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#DD6B20" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <rect x="-15" y="-15" width="8" height="3" rx="1.5" fill="#F6AD55" transform="rotate(-30)" />
            <rect x="7" y="-15" width="8" height="3" rx="1.5" fill="#F6AD55" transform="rotate(30)" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 5 - Pointing at mountains */}
          <g transform="translate(180, 290)">
            <circle cx="0" cy="-25" r="8" fill="#E2E8F0" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#805AD5" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#6B46C1" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <rect x="6" y="-20" width="12" height="3" rx="1.5" fill="#805AD5" transform="rotate(-20)" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 6 - With hiking stick */}
          <g transform="translate(500, 285)">
            <circle cx="0" cy="-25" r="8" fill="#FDBCB4" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#48BB78" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#38A169" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <line x1="12" y1="-25" x2="12" y2="15" stroke="#8B4513" strokeWidth="3" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 7 - Sitting on log */}
          <g transform="translate(420, 305)">
            <circle cx="0" cy="-15" r="8" fill="#D69E2E" />
            <rect x="-6" y="-7" width="12" height="12" rx="6" fill="#F56565" />
            <rect x="-8" y="5" width="16" height="8" rx="8" fill="#2B6CB0" />
            <rect x="-12" y="13" width="24" height="4" rx="2" fill="#A0522D" />
            <path d="M-2,-20 Q0,-25 2,-20" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>

          {/* Person 8 - Looking through binoculars */}
          <g transform="translate(150, 285)">
            <circle cx="0" cy="-25" r="8" fill="#C05621" />
            <rect x="-6" y="-17" width="12" height="20" rx="6" fill="#2B6CB0" />
            <rect x="-4" y="3" width="8" height="15" rx="4" fill="#2C5282" />
            <rect x="-3" y="18" width="6" height="8" fill="#8B4513" />
            <ellipse cx="-3" cy="-22" rx="2" ry="3" fill="#2D3748" />
            <ellipse cx="3" cy="-22" rx="2" ry="3" fill="#2D3748" />
            <rect x="-4" y="-24" width="8" height="4" rx="2" fill="#4A5568" />
            <path d="M-2,-30 Q0,-35 2,-30" stroke="#2D3748" strokeWidth="2" fill="none" />
          </g>
        </g>

        {/* Birds in the sky */}
        <g stroke="#4A5568" strokeWidth="2" fill="none">
          <path d="M300,80 Q305,75 310,80 Q315,75 320,80" />
          <path d="M350,90 Q355,85 360,90 Q365,85 370,90" />
          <path d="M500,70 Q505,65 510,70" />
        </g>

        {/* Butterflies */}
        <g>
          <g transform="translate(280, 200)">
            <ellipse cx="-2" cy="0" rx="3" ry="5" fill="#F687B3" opacity="0.8" />
            <ellipse cx="2" cy="0" rx="3" ry="5" fill="#ED64A6" opacity="0.8" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#2D3748" strokeWidth="1" />
          </g>
          <g transform="translate(480, 220)">
            <ellipse cx="-2" cy="0" rx="2" ry="4" fill="#90CDF4" opacity="0.8" />
            <ellipse cx="2" cy="0" rx="2" ry="4" fill="#63B3ED" opacity="0.8" />
            <line x1="0" y1="-2" x2="0" y2="2" stroke="#2D3748" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  )
}