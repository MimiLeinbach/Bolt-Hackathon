import React from 'react'

export default function AdventureIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 800"
        className="w-full h-full object-cover opacity-90"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8F4FD" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
          
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E7D48" />
            <stop offset="100%" stopColor="#1f5235" />
          </linearGradient>
          
          <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#56bc8e" />
            <stop offset="100%" stopColor="#2E7D48" />
          </linearGradient>
        </defs>
        
        {/* Sky */}
        <rect width="1200" height="800" fill="url(#skyGradient)" />
        
        {/* Clouds */}
        <g opacity="0.6">
          <ellipse cx="200" cy="120" rx="40" ry="20" fill="white" />
          <ellipse cx="220" cy="115" rx="35" ry="18" fill="white" />
          <ellipse cx="180" cy="115" rx="30" ry="15" fill="white" />
          
          <ellipse cx="800" cy="100" rx="45" ry="22" fill="white" />
          <ellipse cx="825" cy="95" rx="38" ry="20" fill="white" />
          <ellipse cx="775" cy="95" rx="32" ry="16" fill="white" />
          
          <ellipse cx="1000" cy="140" rx="35" ry="18" fill="white" />
          <ellipse cx="1020" cy="135" rx="30" ry="15" fill="white" />
        </g>
        
        {/* Birds in the sky */}
        <g opacity="0.6">
          {/* Bird 1 - Higher up, near the sun */}
          <g transform="translate(850, 120)">
            <path d="M-8,-2 Q-4,-6 Q0,-2 Q4,-6 Q8,-2" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="-1" r="1.5" fill="#2C3E50" />
          </g>
          
          {/* Bird 2 - Lower, flying towards the left */}
          <g transform="translate(600, 180)">
            <path d="M-10,-3 Q-5,-7 Q0,-3 Q5,-7 Q10,-3" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="-1.5" r="2" fill="#2C3E50" />
          </g>
        </g>
        
        {/* Mountains (background) */}
        <path
          d="M0 400 L200 250 L400 300 L600 200 L800 280 L1000 220 L1200 300 L1200 800 L0 800 Z"
          fill="url(#mountainGradient)"
          opacity="0.8"
        />
        
        {/* Hills (middle ground) */}
        <path
          d="M0 500 L300 380 L500 420 L700 360 L900 400 L1200 380 L1200 800 L0 800 Z"
          fill="url(#hillGradient)"
          opacity="0.9"
        />
        
        {/* Sun */}
        <circle cx="950" cy="150" r="60" fill="#F4C542" opacity="0.9" />
        <circle cx="950" cy="150" r="45" fill="#F7C544" />
        
        {/* Trees */}
        <g>
          {/* Tree 1 */}
          <rect x="150" y="480" width="8" height="40" fill="#8B4513" rx="4" />
          <circle cx="154" cy="470" r="25" fill="#2E7D48" />
          <circle cx="154" cy="460" r="20" fill="#56bc8e" />
          
          {/* Tree 2 */}
          <rect x="320" y="460" width="10" height="50" fill="#8B4513" rx="5" />
          <circle cx="325" cy="450" r="30" fill="#2E7D48" />
          <circle cx="325" cy="440" r="25" fill="#56bc8e" />
          
          {/* Tree 3 */}
          <rect x="1050" y="470" width="8" height="45" fill="#8B4513" rx="4" />
          <circle cx="1054" cy="460" r="28" fill="#2E7D48" />
          <circle cx="1054" cy="450" r="22" fill="#56bc8e" />
        </g>
        
        {/* Large Tent (positioned to the right) */}
        <g transform="translate(850, 420)" opacity="0.95">
          {/* Tent shadow */}
          <ellipse cx="0" cy="80" rx="50" ry="12" fill="#000000" opacity="0.2" />
          
          {/* Main tent body */}
          <path d="M0,0 L-45,70 L45,70 Z" fill="#E74C3C" />
          <path d="M0,0 L-40,70 L40,70 Z" fill="#C0392B" />
          
          {/* Tent entrance */}
          <rect x="-20" y="45" width="12" height="25" fill="#2C3E50" rx="2" />
          <circle cx="-14" cy="50" r="2" fill="#F4C542" />
          
          {/* Tent details */}
          <path d="M-35,60 L35,60" stroke="#A93226" strokeWidth="2" />
          <path d="M-30,50 L30,50" stroke="#A93226" strokeWidth="2" />
          
          {/* Tent poles/stakes */}
          <rect x="-42" y="65" width="2" height="8" fill="#8B4513" />
          <rect x="40" y="65" width="2" height="8" fill="#8B4513" />
          
          {/* Guy ropes */}
          <line x1="-35" y1="20" x2="-55" y2="65" stroke="#654321" strokeWidth="1.5" />
          <line x1="35" y1="20" x2="55" y2="65" stroke="#654321" strokeWidth="1.5" />
          
          {/* Stakes for guy ropes */}
          <rect x="-57" y="63" width="4" height="8" fill="#8B4513" rx="2" />
          <rect x="53" y="63" width="4" height="8" fill="#8B4513" rx="2" />
        </g>
        
        {/* Group of friends - repositioned around the central bonfire */}
        <g>
          {/* Person 1 - Hiker with backpack (left side of fire) */}
          <g transform="translate(480, 450)">
            {/* Hair - Brown wavy hair */}
            <path d="M-12,-35 Q-15,-40 Q-8,-42 Q0,-45 Q8,-42 Q15,-40 Q12,-35 Q10,-30 Q8,-25 Q-8,-25 Q-10,-30 Z" fill="#8B4513" />
            <path d="M-10,-38 Q-5,-42 Q0,-40 Q5,-42 Q10,-38" fill="#A0522D" />
            
            <circle cx="0" cy="-25" r="12" fill="#FDBCB4" />
            <rect x="-8" y="-15" width="16" height="25" fill="#4A90E2" rx="8" />
            <rect x="-6" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <rect x="1" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <ellipse cx="-3" cy="32" rx="4" ry="2" fill="#8B4513" />
            <ellipse cx="3" cy="32" rx="4" ry="2" fill="#8B4513" />
            {/* Backpack */}
            <rect x="-12" y="-10" width="8" height="15" fill="#E74C3C" rx="4" />
          </g>
          
          {/* Person 2 - Taking photos (behind fire, left) */}
          <g transform="translate(520, 430)">
            {/* Hair - Black short hair */}
            <path d="M-12,-35 Q-10,-40 Q-5,-42 Q0,-43 Q5,-42 Q10,-40 Q12,-35 Q10,-28 Q8,-25 Q-8,-25 Q-10,-28 Z" fill="#2C3E50" />
            <path d="M-8,-38 Q-3,-40 Q0,-39 Q3,-40 Q8,-38" fill="#34495E" />
            
            <circle cx="0" cy="-25" r="12" fill="#D4A574" />
            <rect x="-8" y="-15" width="16" height="25" fill="#27AE60" rx="8" />
            <rect x="-6" y="10" width="5" height="20" fill="#34495E" rx="2" />
            <rect x="1" y="10" width="5" height="20" fill="#34495E" rx="2" />
            <ellipse cx="-3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            <ellipse cx="3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            {/* Camera */}
            <rect x="8" y="-20" width="8" height="6" fill="#2C3E50" rx="2" />
            <circle cx="12" cy="-17" r="2" fill="#3498DB" />
          </g>
          
          {/* Person 3 - Pointing at view (behind fire, center) */}
          <g transform="translate(600, 420)">
            {/* Hair - Blonde/orange curly hair */}
            <path d="M-12,-35 Q-14,-42 Q-8,-45 Q-3,-43 Q0,-46 Q3,-43 Q8,-45 Q14,-42 Q12,-35 Q10,-30 Q8,-25 Q-8,-25 Q-10,-30 Z" fill="#E67E22" />
            <circle cx="-6" cy="-38" r="2" fill="#F39C12" />
            <circle cx="6" cy="-38" r="2" fill="#F39C12" />
            <circle cx="0" cy="-40" r="1.5" fill="#F39C12" />
            
            <circle cx="0" cy="-25" r="12" fill="#FDBCB4" />
            <rect x="-8" y="-15" width="16" height="25" fill="#F39C12" rx="8" />
            <rect x="-6" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <rect x="1" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <ellipse cx="-3" cy="32" rx="4" ry="2" fill="#8B4513" />
            <ellipse cx="3" cy="32" rx="4" ry="2" fill="#8B4513" />
            {/* Pointing arm */}
            <rect x="8" y="-18" width="15" height="4" fill="#FDBCB4" rx="2" transform="rotate(-20)" />
          </g>
          
          {/* Person 4 - With hiking stick (right side of fire) */}
          <g transform="translate(720, 445)">
            {/* Hair - Dark brown straight hair */}
            <path d="M-11,-35 Q-12,-40 Q-6,-42 Q0,-43 Q6,-42 Q12,-40 Q11,-35 Q9,-30 Q8,-25 Q-8,-25 Q-9,-30 Z" fill="#654321" />
            <rect x="-9" y="-38" width="18" height="8" fill="#8B4513" rx="4" />
            
            <circle cx="0" cy="-25" r="12" fill="#C4A484" />
            <rect x="-8" y="-15" width="16" height="25" fill="#8E44AD" rx="8" />
            <rect x="-6" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <rect x="1" y="10" width="5" height="20" fill="#2C3E50" rx="2" />
            <ellipse cx="-3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            <ellipse cx="3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            {/* Hiking stick */}
            <rect x="-15" y="-30" width="2" height="40" fill="#8B4513" rx="1" />
          </g>
          
          {/* Person 5 - Sitting on rock (right side) */}
          <g transform="translate(750, 460)">
            {/* Hair - Light brown ponytail */}
            <path d="M-10,-30 Q-8,-35 Q0,-37 Q8,-35 Q10,-30 Q8,-25 Q-8,-25 Z" fill="#D2691E" />
            <ellipse cx="12" cy="-28" rx="3" ry="8" fill="#CD853F" transform="rotate(20)" />
            <circle cx="10" cy="-32" r="1.5" fill="#8B4513" />
            
            <circle cx="0" cy="-20" r="12" fill="#FDBCB4" />
            <rect x="-8" y="-10" width="16" height="20" fill="#E74C3C" rx="8" />
            <rect x="-8" y="10" width="6" height="15" fill="#2C3E50" rx="3" />
            <rect x="2" y="10" width="6" height="15" fill="#2C3E50" rx="3" />
            <ellipse cx="-5" cy="27" rx="4" ry="2" fill="#8B4513" />
            <ellipse cx="5" cy="27" rx="4" ry="2" fill="#8B4513" />
            {/* Rock */}
            <ellipse cx="0" cy="15" rx="20" ry="8" fill="#95A5A6" />
          </g>
          
          {/* Person 6 - With map (left side, closer) */}
          <g transform="translate(450, 450)">
            {/* Hair - Red/auburn hair with bangs */}
            <path d="M-11,-35 Q-10,-40 Q-5,-42 Q0,-43 Q5,-42 Q10,-40 Q11,-35 Q9,-30 Q8,-25 Q-8,-25 Q-9,-30 Z" fill="#B22222" />
            <path d="M-8,-32 L8,-32 Q6,-28 Q-6,-28 Z" fill="#CD5C5C" />
            
            <circle cx="0" cy="-25" r="12" fill="#D4A574" />
            <rect x="-8" y="-15" width="16" height="25" fill="#16A085" rx="8" />
            <rect x="-6" y="10" width="5" height="20" fill="#34495E" rx="2" />
            <rect x="1" y="10" width="5" height="20" fill="#34495E" rx="2" />
            <ellipse cx="-3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            <ellipse cx="3" cy="32" rx="4" ry="2" fill="#2C3E50" />
            {/* Map */}
            <rect x="-12" y="-22" width="12" height="8" fill="#F4C542" rx="1" />
            <rect x="-10" y="-20" width="8" height="4" fill="white" rx="0.5" />
          </g>
          
          {/* Person 7 - Waving (background left) */}
          <g transform="translate(380, 470)" opacity="0.8">
            {/* Hair - Blonde pixie cut */}
            <path d="M-9,-33 Q-8,-37 Q-3,-38 Q0,-39 Q3,-38 Q8,-37 Q9,-33 Q7,-28 Q6,-23 Q-6,-23 Q-7,-28 Z" fill="#FFD700" />
            <path d="M-6,-35 Q0,-37 Q6,-35" fill="#FFA500" />
            
            <circle cx="0" cy="-25" r="10" fill="#FDBCB4" />
            <rect x="-6" y="-15" width="12" height="20" fill="#3498DB" rx="6" />
            <rect x="-4" y="5" width="3" height="15" fill="#2C3E50" rx="1.5" />
            <rect x="1" y="5" width="3" height="15" fill="#2C3E50" rx="1.5" />
            <ellipse cx="-2" cy="22" rx="3" ry="1.5" fill="#8B4513" />
            <ellipse cx="2" cy="22" rx="3" ry="1.5" fill="#8B4513" />
            {/* Waving arm */}
            <rect x="6" y="-20" width="3" height="12" fill="#FDBCB4" rx="1.5" transform="rotate(-30)" />
          </g>
          
          {/* Person 8 - With water bottle (background right) */}
          <g transform="translate(820, 465)" opacity="0.8">
            {/* Hair - Dark curly hair */}
            <path d="M-9,-33 Q-10,-38 Q-5,-40 Q0,-41 Q5,-40 Q10,-38 Q9,-33 Q7,-28 Q6,-23 Q-6,-23 Q-7,-28 Z" fill="#2F1B14" />
            <circle cx="-4" cy="-35" r="1.5" fill="#4A4A4A" />
            <circle cx="4" cy="-35" r="1.5" fill="#4A4A4A" />
            <circle cx="0" cy="-37" r="1" fill="#4A4A4A" />
            
            <circle cx="0" cy="-25" r="10" fill="#C4A484" />
            <rect x="-6" y="-15" width="12" height="20" fill="#E67E22" rx="6" />
            <rect x="-4" y="5" width="3" height="15" fill="#34495E" rx="1.5" />
            <rect x="1" y="5" width="3" height="15" fill="#34495E" rx="1.5" />
            <ellipse cx="-2" cy="22" rx="3" ry="1.5" fill="#2C3E50" />
            <ellipse cx="2" cy="22" rx="3" ry="1.5" fill="#2C3E50" />
            {/* Water bottle */}
            <rect x="6" y="-18" width="3" height="8" fill="#3498DB" rx="1.5" />
            <rect x="6.5" y="-20" width="2" height="2" fill="#2C3E50" rx="1" />
          </g>
        </g>
        
        {/* CENTRAL BONFIRE - Now the focal point! */}
        <g transform="translate(600, 520)">
          {/* Fire shadow/glow effect */}
          <ellipse cx="0" cy="15" rx="35" ry="8" fill="#F39C12" opacity="0.3" />
          <ellipse cx="0" cy="15" rx="25" ry="5" fill="#E74C3C" opacity="0.2" />
          
          {/* Logs arranged in a circle */}
          <rect x="-25" y="10" width="50" height="5" fill="#8B4513" rx="2.5" />
          <rect x="-20" y="6" width="40" height="5" fill="#A0522D" rx="2.5" transform="rotate(30)" />
          <rect x="-20" y="6" width="40" height="5" fill="#A0522D" rx="2.5" transform="rotate(-30)" />
          <rect x="-18" y="8" width="36" height="4" fill="#8B4513" rx="2" transform="rotate(60)" />
          <rect x="-18" y="8" width="36" height="4" fill="#8B4513" rx="2" transform="rotate(-60)" />
          
          {/* Main fire flames - larger and more dramatic */}
          <path d="M-12,10 Q-8,-5 Q-4,8 Q0,-8 Q4,8 Q8,-5 Q12,10 Q8,15 Q4,5 Q0,12 Q-4,5 Q-8,15 Z" fill="#E74C3C" />
          <path d="M-10,8 Q-6,-8 Q-2,6 Q0,-12 Q2,6 Q6,-8 Q10,8 Q6,12 Q2,2 Q0,8 Q-2,2 Q-6,12 Z" fill="#F39C12" />
          <path d="M-8,6 Q-4,-10 Q0,4 Q4,-10 Q8,6 Q4,10 Q0,0 Q-4,10 Z" fill="#F4C542" />
          
          {/* Inner core of fire */}
          <path d="M-6,4 Q-3,-12 Q0,2 Q3,-12 Q6,4 Q3,8 Q0,-2 Q-3,8 Z" fill="#FFF3CD" />
          
          {/* Sparks and embers */}
          <circle cx="-15" cy="-5" r="1" fill="#F39C12" opacity="0.8" />
          <circle cx="18" cy="-8" r="1.5" fill="#E74C3C" opacity="0.7" />
          <circle cx="-8" cy="-15" r="0.8" fill="#F4C542" opacity="0.9" />
          <circle cx="12" cy="-12" r="1.2" fill="#F39C12" opacity="0.6" />
          <circle cx="5" cy="-18" r="0.6" fill="#E74C3C" opacity="0.8" />
          
          {/* Smoke wisps */}
          <path d="M-2,-15 Q-8,-25 Q-4,-35 Q2,-30 Q-3,-40" stroke="#95A5A6" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
          <path d="M2,-15 Q8,-25 Q4,-35 Q-2,-30 Q3,-40" stroke="#95A5A6" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
        </g>
        
        {/* Hot air balloon (distant) */}
        <g transform="translate(1100, 200)" opacity="0.7">
          <ellipse cx="0" cy="0" rx="20" ry="25" fill="#F4C542" />
          <path d="M-20,0 Q0,-5 Q20,0 Q15,5 Q-15,5 Z" fill="#E67E22" />
          <path d="M-15,5 Q0,0 Q15,5 Q10,10 Q-10,10 Z" fill="#D35400" />
          <rect x="-8" y="25" width="16" height="8" fill="#8B4513" rx="2" />
          <line x1="-15" y1="20" x2="-6" y2="25" stroke="#654321" strokeWidth="1" />
          <line x1="15" y1="20" x2="6" y2="25" stroke="#654321" strokeWidth="1" />
          <line x1="-8" y1="15" x2="-3" y2="25" stroke="#654321" strokeWidth="1" />
          <line x1="8" y1="15" x2="3" y2="25" stroke="#654321" strokeWidth="1" />
        </g>
        
        {/* Small birds in distance */}
        <g opacity="0.4">
          <path d="M300,180 Q305,175 Q310,180" stroke="#2C3E50" strokeWidth="2" fill="none" />
          <path d="M320,175 Q325,170 Q330,175" stroke="#2C3E50" strokeWidth="2" fill="none" />
          <path d="M340,185 Q345,180 Q350,185" stroke="#2C3E50" strokeWidth="2" fill="none" />
        </g>
        
        {/* Subtle ground details */}
        <g opacity="0.3">
          <circle cx="200" cy="520" r="3" fill="#95A5A6" />
          <circle cx="450" cy="530" r="2" fill="#95A5A6" />
          <circle cx="800" cy="525" r="4" fill="#95A5A6" />
          <ellipse cx="750" cy="540" rx="8" ry="3" fill="#7F8C8D" />
        </g>
      </svg>
    </div>
  )
}