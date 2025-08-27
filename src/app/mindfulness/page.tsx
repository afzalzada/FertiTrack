import AppLayout from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Leaf, Wind, Waves, Sunrise, BrainCircuit, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Exercise = {
  title: string
  description: string
  duration: string
  icon: LucideIcon
}

const exercises: Exercise[] = [
  {
    title: '5-Minute Breathing',
    description: 'Center yourself with a short, guided breathing exercise to calm your nervous system.',
    duration: '5 min',
    icon: Wind,
  },
  {
    title: 'Body Scan Meditation',
    description: 'Tune into your body, releasing tension from head to toe. Perfect for relaxation.',
    duration: '15 min',
    icon: Leaf,
  },
  {
    title: 'Mindful Gratitude',
    description: 'Focus on what you are thankful for to cultivate a positive mindset and inner peace.',
    duration: '10 min',
    icon: Heart,
  },
  {
    title: 'Ocean Escape',
    description: 'Visualize the calming rhythm of ocean waves to wash away stress and anxiety.',
    duration: '10 min',
    icon: Waves,
  },
  {
    title: 'Morning Intention',
    description: 'Start your day with purpose and clarity by setting a positive intention.',
    duration: '3 min',
    icon: Sunrise,
  },
  {
    title: 'Letting Go of Thoughts',
    description: 'Observe your thoughts without judgment, allowing them to pass like clouds in the sky.',
    duration: '12 min',
    icon: BrainCircuit,
  },
]

export default function MindfulnessPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Mindfulness Exercises
          </h1>
          <p className="text-muted-foreground">
            Find calm and center yourself with these short, guided practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <Card key={exercise.title} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <exercise.icon className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.duration}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {exercise.description}
                </p>
              </CardContent>
              <CardContent>
                <Button className="w-full">Begin Exercise</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
