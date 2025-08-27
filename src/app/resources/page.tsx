import AppLayout from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import Link from 'next/link'

const resources = {
  fertility: [
    { title: 'Understanding Your Cycle', description: 'A deep dive into the phases of the menstrual cycle and key fertility indicators.', image: 'https://picsum.photos/400/200?random=1', dataAiHint: 'cycle chart' },
    { title: 'Common Fertility Tests', description: 'An overview of the tests you and your partner may encounter on your journey.', image: 'https://picsum.photos/400/200?random=2', dataAiHint: 'medical test' },
    { title: 'Decoding Lab Results', description: 'Learn what common hormone levels and other test results mean.', image: 'https://picsum.photos/400/200?random=3', dataAiHint: 'lab results' },
  ],
  treatments: [
    { title: 'Intro to IUI and IVF', description: 'Comparing two of the most common assisted reproductive technologies.', image: 'https://picsum.photos/400/200?random=4', dataAiHint: 'medical procedure' },
    { title: 'Medication Protocols', description: 'A guide to the various medications used in fertility treatments.', image: 'https://picsum.photos/400/200?random=5', dataAiHint: 'pills medication' },
    { title: 'Exploring Alternative Paths', description: 'Information on adoption, surrogacy, and donor options.', image: 'https://picsum.photos/400/200?random=6', dataAiHint: 'family path' },
  ],
  wellness: [
    { title: 'Communicating with Your Partner', description: 'Tips for navigating difficult conversations and supporting each other.', image: 'https://picsum.photos/400/200?random=7', dataAiHint: 'couple talking' },
    { title: 'Coping with Stress and Anxiety', description: 'Techniques to manage the emotional rollercoaster of infertility.', image: 'https://picsum.photos/400/200?random=8', dataAiHint: 'person meditating' },
    { title: 'When Friends and Family Ask', description: 'Strategies for setting boundaries and handling insensitive questions.', image: 'https://picsum.photos/400/200?random=9', dataAiHint: 'social gathering' },
  ],
  nutrition: [
    { title: 'Fertility-Boosting Foods', description: 'Learn which foods can support reproductive health for both partners.', image: 'https://picsum.photos/400/200?random=10', dataAiHint: 'healthy food' },
    { title: 'Supplements: What You Need to Know', description: 'A guide to vitamins and supplements that may aid fertility.', image: 'https://picsum.photos/400/200?random=11', dataAiHint: 'vitamins supplements' },
    { title: 'Meal Planning for Two', description: 'Simple recipes and meal ideas to nourish your bodies together.', image: 'https://picsum.photos/400/200?random=12', dataAiHint: 'couple cooking' },
  ],
}

const ResourceTab = ({ category }: { category: keyof typeof resources }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {resources[category].map((item) => (
      <Card key={item.title} className="flex flex-col overflow-hidden">
        <CardHeader className="p-0">
            <div className="relative h-40 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.dataAiHint} />
            </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="mb-2 text-xl font-headline">{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="outline" asChild>
            <Link href="#">Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
)

export default function ResourcesPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Resource Library
          </h1>
          <p className="text-muted-foreground">
            Curated knowledge to empower and support you on your journey.
          </p>
        </div>

        <Tabs defaultValue="fertility" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="fertility">Fertility 101</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="wellness">Emotional Wellness</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          <TabsContent value="fertility">
            <ResourceTab category="fertility" />
          </TabsContent>
          <TabsContent value="treatments">
            <ResourceTab category="treatments" />
          </TabsContent>
          <TabsContent value="wellness">
            <ResourceTab category="wellness" />
          </TabsContent>
          <TabsContent value="nutrition">
            <ResourceTab category="nutrition" />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
