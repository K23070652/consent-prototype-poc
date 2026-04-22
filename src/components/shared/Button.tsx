interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-semibold rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-consent-purple text-white hover:bg-consent-purple-dark',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    success: 'bg-approved text-white hover:opacity-90',
    danger: 'bg-declined text-white hover:opacity-90',
    warning: 'bg-pending text-gray-900 hover:opacity-90',
    outline:
      'border-2 border-consent-purple text-consent-purple bg-transparent hover:bg-consent-purple-light',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
