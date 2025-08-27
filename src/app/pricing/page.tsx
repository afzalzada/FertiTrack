
'use client'

import { useState } from 'react'
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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: { monthly: '$0', yearly: '$0' },
    description: 'Get started with the essential tools to track your journey.',
    features: [
      'Basic Cycle Tracking',
      'Daily Journaling (up to 10 entries)',
      'Community Forum Access',
      'Standard Mindfulness Exercises',
    ],
    cta: 'Continue with Free',
    isPrimary: false,
  },
  {
    name: 'Premium',
    price: { monthly: '$9.99', yearly: '$99.99' },
    description: 'Unlock the full suite of tools for you and your partner.',
    features: [
      'Everything in Free, plus:',
      'Advanced Cycle & Symptom Analytics',
      'Unlimited Journal Entries with AI Insights',
      'Shared Calendar with Partner',
      'Advanced Mindfulness & Couples Meditations',
      'Full Access to Resource Library',
      'Priority Support',
    ],
    cta: 'Upgrade to Premium',
    isPrimary: true,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Find the plan that's right for you
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Empower your fertility journey with tools designed for support, clarity, and connection.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-cycle" className="relative">
            Yearly
            <span className="absolute -right-1 -top-4 -rotate-12 text-xs font-semibold text-primary">
              Save 20%
            </span>
          </Label>
        </div>

        <div className="mx-auto grid max-w-md gap-8 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${
                tier.isPrimary ? 'border-primary shadow-2xl shadow-primary/10' : ''
              }`}
            >
              <CardHeader className="p-6">
                <h3 className="text-2xl font-headline font-semibold">{tier.name}</h3>
                <p className="mt-1 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    {isYearly ? '/year' : '/month'}
                  </span>
                </p>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-0">
                <ul role="list" className="space-y-3 text-sm leading-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  variant={tier.isPrimary ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
