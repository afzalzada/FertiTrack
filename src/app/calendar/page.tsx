'use client'

import { useState, useEffect, useCallback } from 'react'
import { addDays, format } from 'date-fns'
import { Circle, Loader2 } from 'lucide-react'
import AppLayout from '@/components/layout/app-layout'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import type { CalendarEvent } from '@/lib/database.types'

const eventTypeColors: { [key: string]: string } = {
  appointment: 'hsl(var(--chart-1))',
  medication: 'hsl(var(--chart-2))',
  test: 'hsl(var(--chart-3))',
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return;
    }

    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('user_id', user.id)
    
    if (error) {
      toast({ title: 'Error fetching events', description: error.message, variant: 'destructive' })
    } else {
      setEvents(data.map(e => ({...e, event_date: new Date(e.event_date)})))
    }
    setLoading(false)
  }, [toast])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const selectedDayEvents = events.filter(
    (event) => date && format(event.event_date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  )

  const calendarEvents = events.map(e => new Date(e.event_date));

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Shared Calendar
          </h1>
          <p className="text-muted-foreground">
            Stay in sync with your partner on all important dates and treatments.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-2 md:p-4">
               {loading ? (
                <div className="flex h-[350px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  event: calendarEvents,
                }}
                modifiersStyles={{
                  event: {
                    position: 'relative',
                  },
                }}
                components={{
                  DayContent: (props) => {
                    const dayEvents = events.filter(
                      (event) => format(new Date(event.event_date), 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
                    );
                    const originalDay = <>{format(props.date, 'd')}</>;
                    if (dayEvents.length > 0) {
                      return (
                        <div className="relative h-full w-full flex items-center justify-center">
                          {originalDay}
                          <div className="absolute bottom-1 flex space-x-1">
                            {Array.from(new Set(dayEvents.map(e => e.type))).map(type => (
                              <Circle key={type} className="h-1.5 w-1.5" fill={eventTypeColors[type as string]} strokeWidth={0} />
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return originalDay;
                  }
                }}
              />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Schedule for {date ? format(date, 'PPP') : '...'}
              </CardTitle>
              <CardDescription>
                Your events for the selected day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDayEvents.length > 0 ? (
                <ul className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <li key={event.id} className="flex items-start gap-4">
                      <div
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: eventTypeColors[event.type as string] }}
                      />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <Badge variant="outline" className="capitalize text-xs mt-1" style={{borderColor: eventTypeColors[event.type as string], color: eventTypeColors[event.type as string]}}>
                          {event.type}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No events scheduled for this day.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
