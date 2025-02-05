import React from 'react';
import { cn } from '@/lib/utils';

// This is a simple wrapper mimicking a shadcn/ui Button.
// You can add additional variants and styles as required.
const variants = {
  default: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
};

const Button = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
