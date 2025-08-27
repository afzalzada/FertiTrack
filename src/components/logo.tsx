import { cn } from '@/lib/utils'
import { HandHeart } from 'lucide-react'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="rounded-lg bg-primary/10 p-1.5 border border-primary/20">
        <HandHeart className="h-5 w-5 text-primary" />
      </div>
      <span className="font-headline text-xl font-bold text-foreground">FertiTrack</span>
    </div>
  )
}
