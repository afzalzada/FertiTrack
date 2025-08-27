'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  BookHeart,
  BookOpen,
  CalendarDays,
  HeartPulse,
  LayoutDashboard,
  Leaf,
  Sparkles,
  Menu,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { href: '/tracker', label: 'Symptom Tracker', icon: HeartPulse },
  { href: '/mindfulness', label: 'Mindfulness', icon: Leaf },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/support', label: 'AI Support', icon: Sparkles },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navLinks = (
    <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === href
              ? 'bg-muted text-primary'
              : 'text-muted-foreground'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
            <Logo />
          </div>
          <ScrollArea className="flex-1 py-4">{navLinks}</ScrollArea>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-4">
                  <Logo />
                </div>
                <div className="mt-4">{navLinks}</div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             <Logo className="md:hidden" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 bg-muted/20">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">{children}</ScrollArea>
        </main>
      </div>
    </div>
  )
}
