'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CalendarDays,
  BookHeart,
  HeartPulse,
  Leaf,
  Users,
  Award,
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
import { supabase } from '@/lib/supabase'

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

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserName(profile.full_name?.split(' ')[0] || '')
      }
      setLoading(false)
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          fetchUser();
        }
      }
    );

    fetchUser()
    setGreeting(getGreeting())
    
    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [router])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            {greeting}{userName && `, ${userName}`}
          </h1>
          <p className="text-muted-foreground">
            A gentle space for your journey. Here are some tools to support you
            today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                <CalendarDays className="h-6 w-6 text-rose-500" />
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
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <BookHeart className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <CardTitle>Private Journal</CardTitle>
                <CardDescription>2 entries logged this month</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>A secure space for your thoughts and feelings, with optional AI-powered insights.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/journal">
                  Write in Journal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                <Users className="h-6 w-6 text-teal-500" />
              </div>
              <div className="flex-1">
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="mr-2 border-teal-500 text-teal-500">3 New Posts</Badge>
                  Connect with others
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Share experiences and find support in a safe, anonymous community forum.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/community">
                  Join Discussion <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                <HeartPulse className="h-6 w-6 text-pink-500" />
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
              <Button asChild className="w-full" variant="outline">
                <Link href="/tracker">
                  Track Symptoms <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Leaf className="h-6 w-6 text-green-500" />
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
              <Button asChild className="w-full" variant="outline">
                <Link href="/mindfulness">
                  Find Calm <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>4 new stories this week</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p>Read inspiring stories of hope and perseverance from the community.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/stories">
                  Get Inspired <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
