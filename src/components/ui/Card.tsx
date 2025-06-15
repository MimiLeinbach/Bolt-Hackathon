import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  style 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 shadow-soft'
  const hoverClasses = hover ? 'hover:shadow-medium hover:border-gray-300 transition-all duration-200 cursor-pointer' : ''
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
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
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)