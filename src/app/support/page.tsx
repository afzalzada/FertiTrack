'use client'

import { useState } from 'react'
import { analyzeJournalEntries, AnalyzeJournalEntriesOutput } from '@/ai/flows/analyze-journal-entries'
import AppLayout from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Sparkles } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function SupportPage() {
  const [journalEntries, setJournalEntries] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalyzeJournalEntriesOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!journalEntries.trim()) {
      setError('Please enter some journal entries to analyze.')
      return
    }

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const output = await analyzeJournalEntries({ journalEntries })
      setResult(output)
    } catch (e) {
      console.error(e)
      setError('An error occurred while analyzing your entries. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            AI-Powered Support
          </h1>
          <p className="text-muted-foreground">
            Get personalized insights based on your journal entries. This tool is here to offer a supportive perspective.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Your Journal</CardTitle>
              <CardDescription>
                Copy and paste one or more journal entries below. Your data is not stored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your journal entries here..."
                className="min-h-[300px]"
                value={journalEntries}
                onChange={(e) => setJournalEntries(e.target.value)}
                disabled={loading}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Insights
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Insights</CardTitle>
              <CardDescription>
                Reflections and suggestions based on your writing.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px]">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analyzing your thoughts...</p>
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && (
                <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground">
                  {result.insights.split('\n').map((line, index) => {
                     if (line.startsWith('### ')) {
                        return <h3 key={index} className="text-lg font-headline font-semibold mt-4 mb-2">{line.substring(4)}</h3>
                    }
                    if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-headline font-bold mt-6 mb-3">{line.substring(3)}</h2>
                    }
                     if (line.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-headline font-extrabold mt-8 mb-4">{line.substring(2)}</h1>
                    }
                    if (line.startsWith('* ')) {
                       return <p key={index} className="flex items-start"><span className="mr-2 mt-1.5 text-primary">&#8226;</span><span>{line.substring(2)}</span></p>
                    }
                    return <p key={index} className="mb-2">{line}</p>
                  })}
                </div>
              )}
               {!loading && !result && !error && (
                 <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Your insights will appear here.</p>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
