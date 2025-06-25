import React from 'react'

export default function AdventureIllustration() {
  return (
    <div className="w-full max-w-md mx-auto my-12 relative">
      <svg
        viewBox="0 0 400 300"
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
            <stop offset="0%" stopColor="#2E7D48" />
            <stop offset="100%" stopColor="#1f5235" />
          </linearGradient>
          <linearGradient id="tentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7C544" />
            <stop offset="100%" stopColor="#e89611" />
          </linearGradient>
          <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F7931E" />
            <stop offset="100%" stopColor="#FFD23F" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="400" height="300" fill="url(#skyGradient)" />

        {/* Clouds */}
        <g opacity="0.8">
          <ellipse cx="80" cy="40" rx="25" ry="12" fill="white" />
          <ellipse cx="95" cy="35" rx="20" ry="10" fill="white" />
          <ellipse cx="110" cy="40" rx="15" ry="8" fill="white" />
          
          <ellipse cx="280" cy="30" rx="20" ry="10" fill="white" />
          <ellipse cx="295" cy="25" rx="15" ry="8" fill="white" />
          
          <ellipse cx="320" cy="60" rx="18" ry="9" fill="white" />
          <ellipse cx="335" cy="55" rx="12" ry="6" fill="white" />
        </g>

        {/* Mountains */}
        <polygon 
          points="0,180 80,80 160,140 240,60 320,120 400,100 400,300 0,300" 
          fill="url(#mountainGradient)" 
        />
        
        {/* Mountain highlights */}
        <polygon 
          points="80,80 120,110 80,140" 
          fill="#56bc8e" 
          opacity="0.6"
        />
        <polygon 
          points="240,60 280,90 240,120" 
          fill="#56bc8e" 
          opacity="0.6"
        />

        {/* Ground/grass area */}
        <ellipse cx="200" cy="280" rx="180" ry="40" fill="#8dd5b3" opacity="0.8" />
        <ellipse cx="200" cy="285" rx="160" ry="30" fill="#56bc8e" opacity="0.6" />

        {/* Trees */}
        <g>
          {/* Tree 1 */}
          <rect x="45" y="200" width="8" height="25" fill="#8B4513" />
          <circle cx="49" cy="195" r="18" fill="#2E7D48" />
          <circle cx="42" cy="188" r="12" fill="#56bc8e" />
          <circle cx="56" cy="188" r="12" fill="#56bc8e" />
          
          {/* Tree 2 */}
          <rect x="320" y="190" width="6" height="20" fill="#8B4513" />
          <circle cx="323" cy="185" r="15" fill="#2E7D48" />
          <circle cx="318" cy="180" r="10" fill="#56bc8e" />
          <circle cx="328" cy="180" r="10" fill="#56bc8e" />
          
          {/* Tree 3 */}
          <rect x="360" y="195" width="7" height="22" fill="#8B4513" />
          <circle cx="363.5" cy="190" r="16" fill="#2E7D48" />
          <circle cx="357" cy="184" r="11" fill="#56bc8e" />
          <circle cx="370" cy="184" r="11" fill="#56bc8e" />
        </g>

        {/* Tent */}
        <g>
          <polygon 
            points="150,220 180,180 210,220" 
            fill="url(#tentGradient)" 
          />
          <polygon 
            points="180,180 210,220 180,220" 
            fill="#e89611" 
          />
          <rect x="175" y="215" width="10" height="8" fill="#8B4513" />
        </g>

        {/* Campfire */}
        <g>
          {/* Fire base */}
          <ellipse cx="120" cy="235" rx="8" ry="3" fill="#8B4513" />
          {/* Logs */}
          <rect x="110" y="232" width="20" height="3" rx="1.5" fill="#8B4513" />
          <rect x="115" y="228" width="15" height="3" rx="1.5" fill="#A0522D" transform="rotate(15 122.5 229.5)" />
          {/* Flames */}
          <ellipse cx="120" cy="225" rx="6" ry="12" fill="url(#fireGradient)" opacity="0.9" />
          <ellipse cx="118" cy="220" rx="4" ry="8" fill="#FF6B35" opacity="0.8" />
          <ellipse cx="122" cy="218" rx="3" ry="6" fill="#FFD23F" opacity="0.9" />
        </g>

        {/* Hot air balloon */}
        <g>
          <ellipse cx="300" cy="90" rx="25" ry="30" fill="#F7C544" />
          <ellipse cx="290" cy="85" rx="8" ry="25" fill="#e89611" />
          <ellipse cx="310" cy="85" rx="8" ry="25" fill="#c17510" />
          <rect x="290" y="120" width="20" height="8" fill="#8B4513" rx="2" />
          <line x1="290" y1="120" x2="285" y2="110" stroke="#654321" strokeWidth="1" />
          <line x1="310" y1="120" x2="315" y2="110" stroke="#654321" strokeWidth="1" />
          <line x1="295" y1="120" x2="295" y2="110" stroke="#654321" strokeWidth="1" />
          <line x1="305" y1="120" x2="305" y2="110" stroke="#654321" strokeWidth="1" />
        </g>

        {/* People/Travelers */}
        <g>
          {/* Person 1 - Hiker with backpack */}
          <circle cx="90" cy="200" r="8" fill="#FDBCB4" />
          <rect x="85" y="208" width="10" height="15" fill="#4A90E2" rx="2" />
          <rect x="83" y="223" width="6" height="12" fill="#2E7D48" rx="1" />
          <rect x="91" y="223" width="6" height="12" fill="#2E7D48" rx="1" />
          <ellipse cx="95" cy="210" rx="4" ry="8" fill="#8B4513" />
          <rect x="88" y="195" width="4" height="3" fill="#654321" />
          
          {/* Person 2 - Sitting by fire */}
          <circle cx="105" cy="225" r="7" fill="#D4A574" />
          <rect x="100" y="232" width="10" height="8" fill="#E74C3C" rx="2" />
          <rect x="98" y="240" width="6" height="8" fill="#34495E" rx="1" />
          <rect x="106" y="240" width="6" height="8" fill="#34495E" rx="1" />
          
          {/* Person 3 - Standing with arms up */}
          <circle cx="250" cy="200" r="8" fill="#8D5524" />
          <rect x="245" y="208" width="10" height="15" fill="#9B59B6" rx="2" />
          <rect x="243" y="223" width="6" height="12" fill="#2C3E50" rx="1" />
          <rect x="251" y="223" width="6" height="12" fill="#2C3E50" rx="1" />
          <rect x="235" y="205" width="8" height="3" fill="#9B59B6" transform="rotate(-30 239 206.5)" />
          <rect x="257" y="205" width="8" height="3" fill="#9B59B6" transform="rotate(30 261 206.5)" />
          
          {/* Person 4 - Photographer */}
          <circle cx="280" cy="210" r="7" fill="#FDBCB4" />
          <rect x="275" y="217" width="10" height="12" fill="#27AE60" rx="2" />
          <rect x="273" y="229" width="6" height="10" fill="#8B4513" rx="1" />
          <rect x="281" y="229" width="6" height="10" fill="#8B4513" rx="1" />
          <rect x="285" y="215" width="6" height="4" fill="#2C3E50" rx="1" />
          
          {/* Person 5 - Sitting on log */}
          <circle cx="140" cy="225" r="6" fill="#F4D1AE" />
          <rect x="136" y="231" width="8" height="8" fill="#E67E22" rx="2" />
          <rect x="134" y="239" width="5" height="6" fill="#95A5A6" rx="1" />
          <rect x="141" y="239" width="5" height="6" fill="#95A5A6" rx="1" />
          
          {/* Person 6 - Walking with hiking stick */}
          <circle cx="200" cy="205" r="7" fill="#C0392B" />
          <rect x="196" y="212" width="8" height="13" fill="#F39C12" rx="2" />
          <rect x="194" y="225" width="5" height="10" fill="#7F8C8D" rx="1" />
          <rect x="201" y="225" width="5" height="10" fill="#7F8C8D" rx="1" />
          <line x1="190" y1="200" x2="190" y2="220" stroke="#8B4513" strokeWidth="2" />
          <circle cx="190" cy="198" r="2" fill="#654321" />
        </g>

        {/* Birds */}
        <g stroke="#2C3E50" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M 60 70 Q 65 65 70 70" />
          <path d="M 75 75 Q 80 70 85 75" />
          <path d="M 340 45 Q 345 40 350 45" />
        </g>

        {/* Sun */}
        <circle cx="350" cy="50" r="20" fill="#FFD700" opacity="0.9" />
        <g stroke="#FFD700" strokeWidth="2" opacity="0.7">
          <line x1="350" y1="20" x2="350" y2="30" />
          <line x1="350" y1="70" x2="350" y2="80" />
          <line x1="320" y1="50" x2="330" y2="50" />
          <line x1="370" y1="50" x2="380" y2="50" />
          <line x1="330" y1="30" x2="336" y2="36" />
          <line x1="364" y1="64" x2="370" y2="70" />
          <line x1="370" y1="30" x2="364" y2="36" />
          <line x1="336" y1="64" x2="330" y2="70" />
        </g>
      </svg>
    </div>
  )
}