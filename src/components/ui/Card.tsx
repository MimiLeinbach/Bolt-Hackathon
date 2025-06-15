import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  style?: React.CSSProperties
  variant?: 'default' | 'adventure' | 'whimsical' | 'sunset'
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  style,
  variant = 'default'
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300'
  
  const variants = {
    default: 'bg-white border-earth-200 shadow-soft',
    adventure: 'bg-gradient-to-br from-adventure-50 to-white border-adventure-200 shadow-adventure',
    whimsical: 'bg-gradient-to-br from-white via-adventure-50 to-sky-50 border-adventure-200 shadow-whimsical',
    sunset: 'bg-gradient-to-br from-sunset-50 to-white border-sunset-200 shadow-soft'
  }
  
  const hoverClasses = hover ? 'hover:shadow-whimsical hover:border-adventure-300 hover:-translate-y-1 cursor-pointer hover:scale-[1.02]' : ''
  
  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-5 border-b border-earth-200 ${className}`}>
    {children}
  </div>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-5 ${className}`}>
    {children}
  </div>
)