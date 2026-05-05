import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-body-standard transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-container text-on-primary hover:bg-primary-blue-dark focus:ring-primary-container shadow-sm hover:shadow-md',
    secondary: 'bg-white text-primary-container border border-neutral-medium-gray hover:bg-neutral-off-white focus:ring-primary-container',
    danger: 'bg-danger-red text-on-error hover:bg-error-red focus:ring-danger-red',
    success: 'bg-success-green text-on-primary hover:opacity-90 focus:ring-success-green'
  };

  const sizes = {
    sm: 'h-[32px] px-sm text-body-regular',
    md: 'h-[36px] px-md text-body-standard',
    lg: 'h-[44px] px-lg text-h2-heading'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;