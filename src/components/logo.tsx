import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M12 22c-2.5 0-4.2-1-6-3.2.7-1.2 1.5-2.2 2.5-3 1-.8 2-1.3 3.5-1.3s2.5.5 3.5 1.3c1 1 1.8 2 2.5 3.2-1.8 2.2-3.5 3.2-6 3.2z" />
        <path d="M12 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
        <path d="M20 11.8c.8.8 1.2 1.8 1.2 2.8 0 2.5-2 4.5-4.5 4.5" />
        <path d="M4 11.8c-.8.8-1.2 1.8-1.2 2.8 0 2.5 2 4.5 4.5 4.5" />
      </svg>
      <span className="font-headline text-xl font-bold">Verdant Bond</span>
    </div>
  )
}
