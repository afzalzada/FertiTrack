'use client'

import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { Circle } from 'lucide-react'
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

type Event = {
  date: Date
  title: string
  type: 'appointment' | 'medication' | 'test'
}

const events: Event[] = [
  {
    date: new Date(),
    title: 'Morning Medication',
    type: 'medication',
  },
  {
    date: new Date(),
    title: 'Fertility Clinic Check-up',
    type: 'appointment',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Blood Test',
    type: 'test',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Evening Medication',
    type: 'medication',
  },
  {
    date: addDays(new Date(), 5),
    title: "Ultrasound Scan",
    type: 'appointment',
  },
  {
    date: addDays(new Date(), 10),
    title: "Consultation with Dr. Smith",
    type: 'appointment',
  },
]

const eventTypeColors = {
  appointment: 'hsl(var(--chart-1))',
  medication: 'hsl(var(--chart-2))',
  test: 'hsl(var(--chart-3))',
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedDayEvents = events.filter(
    (event) => date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  )

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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  event: events.map((event) => event.date),
                }}
                modifiersStyles={{
                  event: {
                    position: 'relative',
                  },
                }}
                components={{
                  DayContent: (props) => {
                    const dayEvents = events.filter(
                      (event) => format(event.date, 'yyyy-MM-dd') === format(props.date, 'yyyy-MM-dd')
                    );
                    const originalDay = <>{format(props.date, 'd')}</>;
                    if (dayEvents.length > 0) {
                      return (
                        <div className="relative h-full w-full flex items-center justify-center">
                          {originalDay}
                          <div className="absolute bottom-1 flex space-x-1">
                            {Array.from(new Set(dayEvents.map(e => e.type))).map(type => (
                              <Circle key={type} className="h-1.5 w-1.5" fill={eventTypeColors[type]} strokeWidth={0} />
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return originalDay;
                  }
                }}
              />
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
                  {selectedDayEvents.map((event, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: eventTypeColors[event.type] }}
                      />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <Badge variant="outline" className="capitalize text-xs mt-1" style={{borderColor: eventTypeColors[event.type], color: eventTypeColors[event.type]}}>
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
