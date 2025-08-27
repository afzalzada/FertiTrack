'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  BookHeart,
  HeartPulse,
  Leaf,
  Sparkles,
  Users,
} from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const getGreeting = () => {
  const currentHour = new Date().getHours()
  if (currentHour < 12) {
    return 'Good morning'
  } else if (currentHour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

const DashboardPage = () => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            {greeting}
          </h1>
          <p className="text-muted-foreground">
            A gentle space for your journey. Here are some tools to support you
            today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-primary/10 p-3">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle>Shared Calendar</CardTitle>
                <CardDescription>
                  Next up: Fertility Clinic Check-up
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Stay in sync with your partner on all important dates and treatments.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/calendar">
                  View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-accent/20 p-3">
                <BookHeart className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <CardTitle>Private Journal</CardTitle>
                <CardDescription>Last entry: 2 days ago</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>A secure space for your thoughts and feelings, with optional AI-powered insights.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/journal">
                  Write in Journal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-chart-3/10 p-3">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <div className="flex-1">
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="mr-2 border-accent-foreground text-accent-foreground">New</Badge> 
                  Connect with others
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Share experiences and find support in a safe, anonymous community forum.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/community">
                  Join Discussion <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-chart-5/10 p-3">
                <HeartPulse className="h-6 w-6 text-chart-5" />
              </div>
              <div className="flex-1">
                <CardTitle>Symptom Tracker</CardTitle>
                <CardDescription>Current Phase: Follicular</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Log physical and emotional symptoms to better understand your body's patterns.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/tracker">
                  Track Symptoms <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-chart-2/10 p-3">
                <Leaf className="h-6 w-6 text-chart-2" />
              </div>
              <div className="flex-1">
                <CardTitle>Mindfulness</CardTitle>
                <CardDescription>6 guided exercises available</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Find calm and center yourself with short, guided practices for stress relief.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/mindfulness">
                  Find Calm <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="rounded-lg bg-foreground/5 p-3">
                <Sparkles className="h-6 w-6 text-foreground/80" />
              </div>
              <div className="flex-1">
                <CardTitle>Resource Library</CardTitle>
                <CardDescription>12 curated articles</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Access curated articles, expert advice, and information to empower your journey.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/resources">
                  Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export default DashboardPage
