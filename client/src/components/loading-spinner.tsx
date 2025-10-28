import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const containerSizeClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center justify-center ${containerSizeClasses[size]} ${className}`}>
      {/* Modern Loading Spinner */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-gray-200`}>
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-t-[var(--visa-primary)] animate-spin`}></div>
        </div>

        {/* Inner dots */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-[var(--visa-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-[var(--visa-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-[var(--visa-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <span className={`${textSizeClasses[size]} text-[var(--visa-text-secondary)] font-medium animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );
}

// Skeleton Loading Component
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export function SkeletonLoader({ lines = 3, className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{
            width: index === lines - 1 ? '75%' : '100%',
            animationDelay: `${index * 100}ms`
          }}
        ></div>
      ))}
    </div>
  );
}

// Card Loading Component
interface CardLoaderProps {
  title?: string;
  className?: string;
}

export function CardLoader({ title = 'Loading...', className = '' }: CardLoaderProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Loading Header */}
      <div className="flex items-center space-x-3 mb-4">
        <LoadingSpinner size="sm" />
        <h3 className="text-lg font-semibold text-[var(--visa-text-primary)] animate-pulse">
          {title}
        </h3>
      </div>

      {/* Loading Content */}
      <SkeletonLoader lines={3} />
    </div>
  );
}

// Button Loading Component
interface ButtonLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ButtonLoading({ loading, children, disabled, className = '', size = 'md' }: ButtonLoadingProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        bg-[var(--visa-primary)]
        text-white
        rounded-xl
        font-semibold
        shadow-lg
        hover:shadow-xl
        transition-all duration-200
        ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[var(--visa-primary-hover)]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}