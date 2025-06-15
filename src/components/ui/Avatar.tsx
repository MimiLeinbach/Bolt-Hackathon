import React from 'react'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  fallback,
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }

  const baseClasses = `${sizes[size]} rounded-full flex items-center justify-center font-medium ${className}`

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${baseClasses} object-cover`}
      />
    )
  }

  return (
    <div className={`${baseClasses} bg-primary-100 text-primary-700`}>
      {fallback || alt.charAt(0).toUpperCase()}
    </div>
  )
}