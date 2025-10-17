import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'xl' && 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
}
