'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import AppLayout from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const moodData = [
  { name: 'Mon', mood: 3 },
  { name: 'Tue', mood: 4 },
  { name: 'Wed', mood: 2 },
  { name: 'Thu', mood: 5 },
  { name: 'Fri', mood: 4 },
  { name: 'Sat', mood: 3 },
  { name: 'Sun', mood: 5 },
]

const physicalSymptoms = ["Cramping", "Bloating", "Headache", "Fatigue", "Nausea", "Tender Breasts"]
const moodSymptoms = ["Anxious", "Irritable", "Sad", "Hopeful", "Calm", "Energetic"]

function CycleTracker() {
  const [day, setDay] = useState(14)
  const phase = day <= 5 ? "Menstruation" : day <= 14 ? "Follicular" : day <= 25 ? "Ovulatory" : "Luteal"
  const phaseColor = phase === "Menstruation" ? "hsl(var(--destructive))" :
                     phase === "Follicular" ? "hsl(var(--chart-4))" :
                     phase === "Ovulatory" ? "hsl(var(--chart-2))" :
                     "hsl(var(--chart-5))";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cycle Phase</CardTitle>
        <CardDescription>Track your current menstrual cycle phase.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 rounded-lg" style={{backgroundColor: phaseColor + '20'}}>
            <span className="font-semibold text-lg" style={{color: phaseColor}}>{phase}</span>
            <span className="font-bold text-2xl font-headline" style={{color: phaseColor}}>Day {day}</span>
          </div>
          <Slider defaultValue={[14]} value={[day]} onValueChange={(vals) => setDay(vals[0])} max={28} min={1} step={1} />
        </div>
      </CardContent>
    </Card>
  )
}


export default function TrackerPage() {
  const { toast } = useToast()
  
  const handleSave = () => {
    toast({
      title: "Symptoms Logged",
      description: "Your symptoms for today have been saved.",
    })
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Symptom Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor your body and mind. Logging symptoms helps you understand your journey better.
          </p>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="log">Log Today's Symptoms</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="lg:col-span-4"><CycleTracker /></div>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Weekly Mood</CardTitle>
                  <CardDescription>Your mood levels over the past week.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 5]} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar dataKey="mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="log" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Log Today's Symptoms</CardTitle>
                    <CardDescription>Select any physical or emotional symptoms you're experiencing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 font-headline">Physical Symptoms</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {physicalSymptoms.map(symptom => (
                                <div key={symptom} className="flex items-center space-x-2">
                                    <Checkbox id={`phys-${symptom}`} />
                                    <Label htmlFor={`phys-${symptom}`}>{symptom}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-4 font-headline">Mood & Emotions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {moodSymptoms.map(symptom => (
                                <div key={symptom} className="flex items-center space-x-2">
                                    <Checkbox id={`mood-${symptom}`} />
                                    <Label htmlFor={`mood-${symptom}`}>{symptom}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-right">
                        <Button onClick={handleSave}>Save Today's Log</Button>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
