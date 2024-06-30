import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  badge?: React.ReactNode; // Define badge prop to accept any React node
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, badge, ...props }, ref) => {
    return (
      <div className='relative flex items-center w-full'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-right ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {badge && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
            {badge}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
