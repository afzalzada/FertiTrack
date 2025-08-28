
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import Image from 'next/image'
import {
  HeartPulse,
  CalendarDays,
  BookHeart,
  Users,
  CheckCircle,
} from 'lucide-react'

const features = [
  {
    icon: CalendarDays,
    title: 'Sync Your Schedules',
    description: 'Keep track of appointments, treatments, and important dates together in one shared calendar.',
  },
  {
    icon: HeartPulse,
    title: 'Track Your Journey',
    description: 'Log symptoms, moods, and cycle data to gain insights and have more informed conversations with doctors.',
  },
  {
    icon: BookHeart,
    title: 'Reflect and Grow',
    description: 'Use a private journal with AI-powered insights to process your thoughts and emotions securely.',
  },
  {
    icon: Users,
    title: 'Find Your Community',
    description: 'Connect with others on a similar path in a safe, anonymous forum for support and shared experiences.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-headline text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Navigate your fertility journey, together.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              FertiTrack is a compassionate, all-in-one app designed to support, organize, and empower you and your partner every step of the way.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Image Section */}
        <section className="container relative my-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg">
                 <Image src="https://picsum.photos/1200/600" alt="FertiTrack app dashboard" fill className="object-cover" data-ai-hint="app screenshot" />
            </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Your Partner in Hope
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              FertiTrack provides the tools you need to feel organized, supported, and in control.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center text-center">
                <p className="font-headline text-2xl font-semibold italic text-foreground">
                    "This app was a lifeline for us. Feeling organized and connected to others who understood made all the difference. We felt less alone."
                </p>
                <p className="mt-4 text-muted-foreground">- Sarah & Tom, FertiTrack Users</p>
            </div>
        </section>

      </main>

      <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground">
              Built with care by the FertiTrack team.
            </p>
          </div>
      </footer>
    </div>
  )
}
