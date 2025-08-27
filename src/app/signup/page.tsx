'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/logo'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react'

const isSupabaseConnected =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy')

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setLoading(false)
      toast({
        title: 'Error signing up',
        description: authError.message,
        variant: 'destructive',
      })
      return;
    }
    
    if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: authData.user.id, full_name: fullName })

        if (profileError) {
            setLoading(false)
            // Note: In a real app, you might want to handle this failure more gracefully,
            // perhaps by deleting the created user or asking them to try again.
            toast({
                title: 'Error creating profile',
                description: profileError.message,
                variant: 'destructive',
            })
            return
        }

        if (!authData.session) {
          toast({
            title: 'Check your email',
            description: 'A confirmation link has been sent to your email address.',
          })
          router.push('/login')
        } else {
          toast({
            title: 'Sign up successful!',
            description: 'Redirecting to your dashboard...',
          })
          router.push('/')
          router.refresh()
        }
    }
     setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Enter your details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSupabaseConnected && (
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Supabase is not connected.</AlertTitle>
              <AlertDescription>
                Please add your Supabase URL and Anon Key to the <code>.env</code> file to enable authentication.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                type="text"
                placeholder="Jane Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading || !isSupabaseConnected}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || !isSupabaseConnected}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || !isSupabaseConnected}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !isSupabaseConnected}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <div className="mb-6 mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline hover:text-primary">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  )
}
