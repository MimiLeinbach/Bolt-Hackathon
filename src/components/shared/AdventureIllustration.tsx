import React from 'react'

export default function AdventureIllustration() {
  return (
    <div className="w-full max-w-lg mx-auto my-12 relative">
      <svg
        viewBox="0 0 500 350"
        className="w-full h-auto drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Advanced Gradients and Shadows */}
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="70%" stopColor="#B8E6FF" />
            <stop offset="100%" stopColor="#E8F4FD" />
          </linearGradient>
          
          {/* Mountain gradients with depth */}
          <linearGradient id="mountainFar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A90A4" />
            <stop offset="100%" stopColor="#2E5266" />
          </linearGradient>
          
          <linearGradient id="mountainNear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D48" />
            <stop offset="50%" stopColor="#1f5235" />
            <stop offset="100%" stopColor="#0f2a1a" />
          </linearGradient>
          
          {/* Ground gradient */}
          <radialGradient id="groundGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#8dd5b3" />
            <stop offset="70%" stopColor="#56bc8e" />
            <stop offset="100%" stopColor="#2E7D48" />
          </radialGradient>
          
          {/* Tent gradient */}
          <linearGradient id="tentMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7C544" />
            <stop offset="100%" stopColor="#e89611" />
          </linearGradient>
          
          <linearGradient id="tentShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e89611" />
            <stop offset="100%" stopColor="#c17510" />
          </linearGradient>
          
          {/* Fire gradient */}
          <radialGradient id="fireGradient" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="30%" stopColor="#FF8C00" />
            <stop offset="70%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#DC143C" />
          </radialGradient>
          
          {/* Balloon gradient */}
          <linearGradient id="balloonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#FF8E9B" />
            <stop offset="100%" stopColor="#FFB3BA" />
          </linearGradient>
          
          {/* Tree gradients */}
          <radialGradient id="treeGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#56bc8e" />
            <stop offset="70%" stopColor="#2E7D48" />
            <stop offset="100%" stopColor="#1f5235" />
          </radialGradient>
          
          {/* Shadow filters */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.2"/>
          </filter>
          
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Sky */}
        <rect width="500" height="350" fill="url(#skyGradient)" />

        {/* Soft clouds with depth */}
        <g opacity="0.9" filter="url(#softShadow)">
          <ellipse cx="90" cy="45" rx="35" ry="18" fill="white" opacity="0.8" />
          <ellipse cx="110" cy="40" rx="25" ry="14" fill="white" opacity="0.9" />
          <ellipse cx="125" cy="45" rx="20" ry="12" fill="white" opacity="0.7" />
          
          <ellipse cx="320" cy="35" rx="28" ry="15" fill="white" opacity="0.8" />
          <ellipse cx="340" cy="30" rx="22" ry="12" fill="white" opacity="0.9" />
          
          <ellipse cx="380" cy="65" rx="25" ry="13" fill="white" opacity="0.7" />
          <ellipse cx="400" cy="60" rx="18" ry="10" fill="white" opacity="0.8" />
        </g>

        {/* Layered mountains for depth */}
        {/* Far mountains */}
        <polygon 
          points="0,160 120,70 200,110 280,50 380,90 500,80 500,350 0,350" 
          fill="url(#mountainFar)" 
          opacity="0.7"
        />
        
        {/* Near mountains */}
        <polygon 
          points="0,200 100,100 180,150 260,80 340,130 420,110 500,120 500,350 0,350" 
          fill="url(#mountainNear)" 
          filter="url(#softShadow)"
        />
        
        {/* Mountain highlights for 3D effect */}
        <polygon 
          points="100,100 140,125 100,150" 
          fill="#56bc8e" 
          opacity="0.4"
        />
        <polygon 
          points="260,80 300,105 260,130" 
          fill="#56bc8e" 
          opacity="0.4"
        />

        {/* Layered ground with depth */}
        <ellipse cx="250" cy="320" rx="220" ry="50" fill="url(#groundGradient)" opacity="0.8" />
        <ellipse cx="250" cy="325" rx="200" ry="40" fill="#56bc8e" opacity="0.6" />
        <ellipse cx="250" cy="330" rx="180" ry="30" fill="#2E7D48" opacity="0.4" />

        {/* Detailed trees with 3D effect */}
        <g filter="url(#softShadow)">
          {/* Tree 1 - Large foreground tree */}
          <ellipse cx="60" cy="240" rx="4" ry="15" fill="#8B4513" />
          <ellipse cx="60" cy="225" rx="25" ry="30" fill="url(#treeGradient)" />
          <ellipse cx="50" cy="215" rx="18" ry="22" fill="#56bc8e" opacity="0.8" />
          <ellipse cx="70" cy="220" rx="15" ry="18" fill="#56bc8e" opacity="0.8" />
          <ellipse cx="60" cy="205" rx="12" ry="15" fill="#8dd5b3" opacity="0.6" />
          
          {/* Tree 2 - Medium tree */}
          <ellipse cx="400" cy="235" rx="3" ry="12" fill="#8B4513" />
          <ellipse cx="400" cy="223" rx="20" ry="25" fill="url(#treeGradient)" />
          <ellipse cx="392" cy="215" rx="14" ry="18" fill="#56bc8e" opacity="0.8" />
          <ellipse cx="408" cy="218" rx="12" ry="15" fill="#56bc8e" opacity="0.8" />
          
          {/* Tree 3 - Background tree */}
          <ellipse cx="450" cy="230" rx="2.5" ry="10" fill="#8B4513" />
          <ellipse cx="450" cy="220" rx="15" ry="20" fill="url(#treeGradient)" opacity="0.8" />
          <ellipse cx="445" cy="213" rx="10" ry="14" fill="#56bc8e" opacity="0.7" />
          <ellipse cx="455" cy="215" rx="8" ry="12" fill="#56bc8e" opacity="0.7" />
        </g>

        {/* Detailed tent with 3D shading */}
        <g filter="url(#dropShadow)">
          <polygon 
            points="180,240 210,190 240,240" 
            fill="url(#tentMain)" 
          />
          <polygon 
            points="210,190 240,240 210,240" 
            fill="url(#tentShadow)" 
          />
          <polygon 
            points="210,190 225,200 210,240" 
            fill="#F7C544" 
            opacity="0.6"
          />
          <rect x="205" y="235" width="10" height="8" rx="2" fill="#654321" />
          <ellipse cx="210" cy="243" rx="8" ry="2" fill="#2E7D48" opacity="0.3" />
        </g>

        {/* Realistic campfire */}
        <g filter="url(#softShadow)">
          {/* Fire base and logs */}
          <ellipse cx="140" cy="255" rx="12" ry="4" fill="#654321" />
          <ellipse cx="135" cy="252" rx="15" ry="3" fill="#8B4513" transform="rotate(-15 135 252)" />
          <ellipse cx="145" cy="252" rx="15" ry="3" fill="#8B4513" transform="rotate(15 145 252)" />
          <ellipse cx="140" cy="250" rx="12" ry="3" fill="#A0522D" />
          
          {/* Layered flames */}
          <ellipse cx="140" cy="235" rx="8" ry="20" fill="url(#fireGradient)" opacity="0.9" />
          <ellipse cx="138" cy="230" rx="6" ry="15" fill="#FF8C00" opacity="0.8" />
          <ellipse cx="142" cy="228" rx="4" ry="12" fill="#FFD700" opacity="0.9" />
          <ellipse cx="140" cy="225" rx="3" ry="8" fill="#FFFF99" opacity="0.7" />
          
          {/* Smoke */}
          <ellipse cx="140" cy="210" rx="2" ry="8" fill="#D3D3D3" opacity="0.4" />
          <ellipse cx="142" cy="200" rx="3" ry="6" fill="#D3D3D3" opacity="0.3" />
          <ellipse cx="138" cy="190" rx="4" ry="5" fill="#D3D3D3" opacity="0.2" />
        </g>

        {/* Detailed hot air balloon */}
        <g filter="url(#dropShadow)">
          <ellipse cx="350" cy="100" rx="30" ry="40" fill="url(#balloonGradient)" />
          <ellipse cx="340" cy="90" rx="10" ry="35" fill="#FF8E9B" opacity="0.7" />
          <ellipse cx="360" cy="90" rx="10" ry="35" fill="#FFB3BA" opacity="0.7" />
          <ellipse cx="350" cy="85" rx="8" ry="30" fill="#FF6B9D" opacity="0.5" />
          
          <rect x="340" y="140" width="20" height="10" rx="3" fill="#8B4513" />
          <rect x="342" y="142" width="16" height="6" rx="2" fill="#A0522D" />
          
          {/* Balloon strings */}
          <line x1="340" y1="140" x2="335" y2="125" stroke="#654321" strokeWidth="1" />
          <line x1="360" y1="140" x2="365" y2="125" stroke="#654321" strokeWidth="1" />
          <line x1="345" y1="140" x2="345" y2="125" stroke="#654321" strokeWidth="1" />
          <line x1="355" y1="140" x2="355" y2="125" stroke="#654321" strokeWidth="1" />
        </g>

        {/* Well-defined people with realistic proportions */}
        <g filter="url(#softShadow)">
          {/* Person 1 - Hiker with backpack (diverse skin tone) */}
          <ellipse cx="110" cy="220" r="10" fill="#D4A574" />
          <ellipse cx="110" cy="218" rx="8" ry="6" fill="#8B4513" /> {/* Hair */}
          <rect x="105" y="230" width="10" height="18" rx="3" fill="#4A90E2" />
          <ellipse cx="100" cy="235" rx="6" ry="12" fill="#2E7D48" /> {/* Backpack */}
          <ellipse cx="105" cy="248" rx="3" ry="8" fill="#34495E" />
          <ellipse cx="115" cy="248" rx="3" ry="8" fill="#34495E" />
          <ellipse cx="105" cy="256" rx="4" ry="2" fill="#654321" />
          <ellipse cx="115" cy="256" rx="4" ry="2" fill="#654321" />
          <ellipse cx="110" cy="265" rx="8" ry="2" fill="#2E7D48" opacity="0.3" />
          
          {/* Person 2 - Sitting by fire (different skin tone) */}
          <ellipse cx="125" cy="245" r="9" fill="#FDBCB4" />
          <ellipse cx="125" cy="243" rx="7" ry="5" fill="#654321" />
          <rect x="120" y="254" width="10" height="12" rx="3" fill="#E74C3C" />
          <ellipse cx="118" cy="266" rx="3" ry="6" fill="#2C3E50" />
          <ellipse cx="132" cy="266" rx="3" ry="6" fill="#2C3E50" />
          <ellipse cx="125" cy="275" rx="6" ry="2" fill="#2E7D48" opacity="0.3" />
          
          {/* Person 3 - Standing with arms raised (celebrating) */}
          <ellipse cx="280" cy="215" r="10" fill="#8D5524" />
          <ellipse cx="280" cy="213" rx="8" ry="6" fill="#2C3E50" />
          <rect x="275" y="225" width="10" height="18" rx="3" fill="#9B59B6" />
          <ellipse cx="275" cy="243" rx="3" ry="8" fill="#34495E" />
          <ellipse cx="285" cy="243" rx="3" ry="8" fill="#34495E" />
          <ellipse cx="275" cy="251" rx="4" ry="2" fill="#8B4513" />
          <ellipse cx="285" cy="251" rx="4" ry="2" fill="#8B4513" />
          {/* Raised arms */}
          <ellipse cx="265" cy="225" rx="8" ry="3" fill="#9B59B6" transform="rotate(-45 265 225)" />
          <ellipse cx="295" cy="225" rx="8" ry="3" fill="#9B59B6" transform="rotate(45 295 225)" />
          <ellipse cx="280" cy="260" rx="8" ry="2" fill="#2E7D48" opacity="0.3" />
          
          {/* Person 4 - Photographer with camera */}
          <ellipse cx="320" cy="225" r="9" fill="#F4D1AE" />
          <ellipse cx="320" cy="223" rx="7" ry="5" fill="#8B4513" />
          <rect x="315" y="234" width="10" height="15" rx="3" fill="#27AE60" />
          <ellipse cx="313" cy="249" rx="3" ry="7" fill="#654321" />
          <ellipse cx="327" cy="249" rx="3" ry="7" fill="#654321" />
          <ellipse cx="320" cy="256" rx="4" ry="2" fill="#2C3E50" />
          {/* Camera */}
          <rect x="325" y="232" width="8" height="6" rx="2" fill="#2C3E50" />
          <circle cx="329" cy="235" r="2" fill="#34495E" />
          <ellipse cx="320" cy="265" rx="7" ry="2" fill="#2E7D48" opacity="0.3" />
          
          {/* Person 5 - Sitting relaxed */}
          <ellipse cx="160" cy="245" r="8" fill="#C0392B" />
          <ellipse cx="160" cy="243" rx="6" ry="4" fill="#E67E22" />
          <rect x="156" y="253" width="8" height="12" rx="2" fill="#F39C12" />
          <ellipse cx="154" cy="265" rx="2.5" ry="5" fill="#7F8C8D" />
          <ellipse cx="166" cy="265" rx="2.5" ry="5" fill="#7F8C8D" />
          <ellipse cx="160" cy="272" rx="6" ry="2" fill="#2E7D48" opacity="0.3" />
          
          {/* Person 6 - Walking with hiking stick */}
          <ellipse cx="240" cy="220" r="9" fill="#FDBCB4" />
          <ellipse cx="240" cy="218" rx="7" ry="5" fill="#654321" />
          <rect x="235" y="229" width="10" height="16" rx="3" fill="#E74C3C" />
          <ellipse cx="233" cy="245" rx="3" ry="7" fill="#2C3E50" />
          <ellipse cx="247" cy="245" rx="3" ry="7" fill="#2C3E50" />
          <ellipse cx="233" cy="252" rx="4" ry="2" fill="#654321" />
          <ellipse cx="247" cy="252" rx="4" ry="2" fill="#654321" />
          {/* Hiking stick */}
          <line x1="225" y1="210" x2="225" y2="240" stroke="#8B4513" strokeWidth="3" />
          <ellipse cx="225" cy="208" rx="2" ry="3" fill="#654321" />
          <ellipse cx="240" cy="260" rx="7" ry="2" fill="#2E7D48" opacity="0.3" />
        </g>

        {/* Flying birds with realistic movement */}
        <g stroke="#2C3E50" strokeWidth="2" fill="none" opacity="0.6">
          <path d="M 80 80 Q 85 75 90 80 Q 95 75 100 80" />
          <path d="M 110 85 Q 115 80 120 85" />
          <path d="M 370 50 Q 375 45 380 50 Q 385 45 390 50" />
          <path d="M 395 55 Q 400 50 405 55" />
        </g>

        {/* Detailed sun with rays */}
        <g filter="url(#softShadow)">
          <circle cx="420" cy="60" r="25" fill="#FFD700" opacity="0.9" />
          <circle cx="420" cy="60" r="20" fill="#FFFF99" opacity="0.7" />
          <circle cx="420" cy="60" r="15" fill="#FFFACD" opacity="0.5" />
          
          <g stroke="#FFD700" strokeWidth="3" opacity="0.6">
            <line x1="420" y1="25" x2="420" y2="35" />
            <line x1="420" y1="85" x2="420" y2="95" />
            <line x1="385" y1="60" x2="395" y2="60" />
            <line x1="445" y1="60" x2="455" y2="60" />
            <line x1="395" y1="35" x2="402" y2="42" />
            <line x1="438" y1="78" x2="445" y2="85" />
            <line x1="445" y1="35" x2="438" y2="42" />
            <line x1="402" y1="78" x2="395" y2="85" />
          </g>
        </g>

        {/* Subtle ground shadows for depth */}
        <g opacity="0.2">
          <ellipse cx="110" cy="265" rx="8" ry="2" fill="#000000" />
          <ellipse cx="125" cy="275" rx="6" ry="2" fill="#000000" />
          <ellipse cx="280" cy="260" rx="8" ry="2" fill="#000000" />
          <ellipse cx="320" cy="265" rx="7" ry="2" fill="#000000" />
          <ellipse cx="160" cy="272" rx="6" ry="2" fill="#000000" />
          <ellipse cx="240" cy="260" rx="7" ry="2" fill="#000000" />
          <ellipse cx="210" cy="250" rx="15" ry="3" fill="#000000" />
          <ellipse cx="140" cy="260" rx="10" ry="2" fill="#000000" />
        </g>
      </svg>
    </div>
  )
}