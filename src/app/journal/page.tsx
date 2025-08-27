'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { Lightbulb, PlusCircle, Loader2 } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import type { JournalEntry } from '@/lib/database.types'

const prompts = [
  'What are you most grateful for today?',
  'Describe a challenge you faced recently and how you handled it.',
  'What does hope feel like to you right now?',
  'Write a letter to your future self.',
  'What is one small thing you can do for yourself today?',
  'How has this journey changed your perspective on partnership?',
  'What emotion is most present for you today? Describe it.',
  'If you could give your past self one piece of advice, what would it be?',
  'What are you proud of this week?',
  'Describe a moment of peace you experienced recently.',
]

// Simple hash function to get a number from a string
const simpleHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash)
}

const getDailyPrompt = () => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const index = simpleHash(today) % prompts.length
  return prompts[index]
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState('')
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  const dailyPrompt = useMemo(() => getDailyPrompt(), [])

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      toast({ title: 'Error fetching entries', description: error.message, variant: 'destructive' })
    } else {
      setEntries(data || [])
    }
    setLoading(false)
  }, [toast])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const handleSaveEntry = async () => {
    if (!newEntry.trim()) {
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        toast({ title: 'Not authenticated', description: 'You must be logged in to save an entry.', variant: 'destructive'})
        return
    }

    const { error } = await supabase
      .from('journal_entries')
      .insert({ content: newEntry, user_id: user.id })

    if (error) {
      toast({ title: 'Error saving entry', description: error.message, variant: 'destructive' })
    } else {
      setNewEntry('')
      toast({
        title: 'Entry saved',
        description: 'Your journal has been updated.',
      })
      fetchEntries()
    }
  }

  const handlePrompt = () => {
    setNewEntry(current => `${dailyPrompt}\n\n${current}`)
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Private Journal
          </h1>
          <p className="text-muted-foreground">
            Your confidential space to write, reflect, and process your journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
                <CardDescription>
                  {format(new Date(), 'EEEE, MMMM do, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write what's on your mind..."
                  className="min-h-[300px]"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handlePrompt}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Use today's prompt
                </Button>
                <Button onClick={handleSaveEntry}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Save Entry
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-semibold">Past Entries</h2>
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading entries...</span>
              </div>
            ) : entries.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {entries.map((entry, index) => (
                  <AccordionItem value={`item-${index}`} key={entry.id}>
                    <AccordionTrigger>
                      <div className="text-left">
                        <p className="font-semibold">{format(new Date(entry.created_at), 'MMMM d, yyyy')}</p>
                        <p className="text-sm font-normal text-muted-foreground">
                          {format(new Date(entry.created_at), 'eeee')}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="whitespace-pre-wrap text-muted-foreground">{entry.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-sm text-muted-foreground">
                No past entries yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
