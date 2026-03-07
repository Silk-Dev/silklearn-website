import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'flex h-11 w-full rounded-md border border-[color:var(--input)] bg-white/70 px-3 py-2 text-sm text-[color:var(--foreground)] shadow-none outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[color:var(--muted-foreground)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };