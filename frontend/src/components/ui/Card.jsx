import React from 'react';
import { cn } from '../../lib/utils';

// A simple Card and CardContent components inspired by shadcn/ui.
export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn('text-gray-800', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
