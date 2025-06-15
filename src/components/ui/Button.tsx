import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'adventure' | 'sunset'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'
  
  const variants = {
    primary: 'bg-adventure-500 text-white hover:bg-adventure-600 focus:ring-adventure-500 shadow-adventure hover:shadow-whimsical',
    secondary: 'bg-earth-600 text-white hover:bg-earth-700 focus:ring-earth-500 shadow-soft',
    outline: 'border-2 border-adventure-300 text-adventure-700 hover:bg-adventure-50 hover:border-adventure-400 focus:ring-adventure-500 hover:shadow-soft',
    ghost: 'text-adventure-700 hover:bg-adventure-50 focus:ring-adventure-500 hover:shadow-soft',
    adventure: 'bg-gradient-to-r from-adventure-500 to-adventure-600 text-white hover:from-adventure-600 hover:to-adventure-700 focus:ring-adventure-500 shadow-adventure hover:shadow-whimsical',
    sunset: 'bg-gradient-to-r from-sunset-500 to-sunset-600 text-white hover:from-sunset-600 hover:to-sunset-700 focus:ring-sunset-500 shadow-adventure hover:shadow-whimsical'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm font-semibold',
    lg: 'px-8 py-4 text-base font-semibold'
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}