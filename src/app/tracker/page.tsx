'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { supabase } from '@/lib/supabase'
import { format, subDays } from 'date-fns'
import type { MoodLog } from '@/lib/database.types'

const physicalSymptoms = ["Cramping", "Bloating", "Headache", "Fatigue", "Nausea", "Tender Breasts", "Spotting", "Backache"]
const moodSymptoms = ["Anxious", "Irritable", "Sad", "Hopeful", "Calm", "Energetic", "Mood Swings", "Stressed"]

function CycleTracker() {
  const [day, setDay] = useState(14)
  const phase = day <= 5 ? "Menstruation" : day <= 14 ? "Follicular" : day <= 25 ? "Ovulatory" : "Luteal"
  const phaseColor = phase === "Menstruation" ? "hsl(var(--chart-1))" :
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
  const [moodData, setMoodData] = useState<{ name: string, mood: number }[]>([])
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string[]>([])
  
  const fetchMoodData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = new Date()
    const lastWeek = subDays(today, 6)
    
    const { data, error } = await supabase
      .from('mood_logs')
      .select('mood_level, log_date')
      .eq('user_id', user.id)
      .gte('log_date', format(lastWeek, 'yyyy-MM-dd'))
      .lte('log_date', format(today, 'yyyy-MM-dd'))

    if (error) {
      toast({ title: 'Error fetching mood data', description: error.message, variant: 'destructive' })
      return
    }

    const weeklyMood = Array.from({ length: 7 }).map((_, i) => {
        const date = subDays(today, i);
        const dayData = data.find(d => format(new Date(d.log_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
        return {
            name: format(date, 'E'),
            mood: dayData?.mood_level || 0
        }
    }).reverse();

    setMoodData(weeklyMood)

  }, [toast])

  useEffect(() => {
    fetchMoodData()
  }, [fetchMoodData])


  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        toast({ title: 'Not authenticated', description: 'Please log in to save your symptoms.', variant: 'destructive'})
        return
    }
    
    const today = format(new Date(), 'yyyy-MM-dd')
    const allSymptoms = [...selectedPhysical, ...selectedMood]

    const symptomLogs = allSymptoms.map(symptom => ({
        user_id: user.id,
        symptom,
        log_date: today
    }))

    const { error } = await supabase.from('symptom_logs').insert(symptomLogs)

    if (error) {
        toast({ title: 'Error saving symptoms', description: error.message, variant: 'destructive' })
    } else {
        toast({
          title: "Symptoms Logged",
          description: "Your symptoms for today have been saved.",
        })
        setSelectedPhysical([])
        setSelectedMood([])
    }
  }

  const handleCheckboxChange = (symptom: string, type: 'physical' | 'mood') => {
    const setter = type === 'physical' ? setSelectedPhysical : setSelectedMood
    const list = type === 'physical' ? selectedPhysical : selectedMood

    if (list.includes(symptom)) {
        setter(list.filter(s => s !== symptom))
    } else {
        setter([...list, symptom])
    }
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
                  <CardDescription>Your mood levels over the past week (1-5).</CardDescription>
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {physicalSymptoms.map(symptom => (
                                <div key={symptom} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`phys-${symptom}`} 
                                        checked={selectedPhysical.includes(symptom)}
                                        onCheckedChange={() => handleCheckboxChange(symptom, 'physical')}
                                    />
                                    <Label htmlFor={`phys-${symptom}`}>{symptom}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold mb-4 font-headline">Mood & Emotions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {moodSymptoms.map(symptom => (
                                <div key={symptom} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`mood-${symptom}`} 
                                        checked={selectedMood.includes(symptom)}
                                        onCheckedChange={() => handleCheckboxChange(symptom, 'mood')}
                                    />
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
