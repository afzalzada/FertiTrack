
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  BookHeart,
  BookOpen,
  CalendarDays,
  HeartPulse,
  LayoutDashboard,
  Leaf,
  LogOut,
  Sparkles,
  Menu,
  Users,
  Award,
  Gem,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-sky-500' },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays, color: 'text-rose-500' },
  { href: '/journal', label: 'Journal', icon: BookHeart, color: 'text-amber-500' },
  { href: '/tracker', label: 'Symptom Tracker', icon: HeartPulse, color: 'text-pink-500' },
  { href: '/mindfulness', label: 'Mindfulness', icon: Leaf, color: 'text-green-500' },
  { href: '/resources', label: 'Resources', icon: BookOpen, color: 'text-blue-500' },
  { href: '/community', label: 'Community', icon: Users, color: 'text-teal-500' },
  { href: '/stories', label: 'Success Stories', icon: Award, color: 'text-yellow-500' },
  { href: '/support', label: 'AI Support', icon: Sparkles, color: 'text-indigo-500' },
  { href: '/pricing', label: 'Upgrade', icon: Gem, color: 'text-violet-500' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navLinks = (
     <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {navItems.map(({ href, label, icon: Icon, color }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            pathname === href
              ? 'bg-muted text-primary'
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <Icon className={`h-4 w-4 ${pathname === href ? 'text-primary' : color}`} />
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
           <div className="mt-auto p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
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
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
