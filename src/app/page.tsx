import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const DashboardPage = () => {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Welcome to Verdant Bond
          </h1>
          <p className="text-muted-foreground">
            A gentle space for your journey. Here are some tools to support you today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Shared Calendar</CardTitle>
              <CardDescription>
                Keep track of appointments and treatments together.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-video w-full">
                <Image
                  src="https://picsum.photos/600/400?grayscale"
                  alt="A calendar with marked dates"
                  fill
                  className="rounded-lg object-cover"
                  data-ai-hint="calendar appointments"
                />
              </div>
            </CardContent>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/calendar">
                  View Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Private Journal</CardTitle>
              <CardDescription>
                A secure space for your thoughts and feelings.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-video w-full">
                <Image
                  src="https://picsum.photos/600/400"
                  alt="A person writing in a journal"
                  fill
                  className="rounded-lg object-cover"
                  data-ai-hint="journal writing"
                />
              </div>
            </CardContent>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/journal">
                  Write in Journal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>
                Access curated articles and expert advice.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative aspect-video w-full">
                <Image
                  src="https://picsum.photos/600/400?blur=1"
                  alt="A collection of books on a shelf"
                  fill
                  className="rounded-lg object-cover"
                  data-ai-hint="books library"
                />
              </div>
            </CardContent>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/resources">
                  Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export default DashboardPage;