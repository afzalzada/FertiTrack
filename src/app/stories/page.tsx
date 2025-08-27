import AppLayout from '@/components/layout/app-layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Quote } from 'lucide-react'

const stories = [
  {
    name: 'Sarah & Tom',
    journey: '3 years, 2 rounds of IVF',
    story: "Our path was longer and tougher than we ever imagined. There were so many moments of doubt. This community was a lifeline. Reading other stories made us feel less alone. We finally welcomed our daughter last spring. Don't give up hope.",
    image: 'https://picsum.photos/400/300?random=15',
    dataAiHint: 'happy couple',
  },
  {
    name: 'Maria',
    journey: '2 years, PCOS diagnosis, IUI',
    story: "Getting the PCOS diagnosis was scary, but it was also the first step towards a real plan. The resources here helped me understand my body. Our first IUI cycle was successful, and our son is now a toddler. My advice is to be your own advocate and ask all the questions.",
    image: 'https://picsum.photos/400/300?random=16',
    dataAiHint: 'smiling woman',
  },
  {
    name: 'David & Alex',
    journey: '4 years, exploring surrogacy',
    story: "As a same-sex couple, our journey had unique challenges. The support we found in the forums was incredible. We're now matched with a wonderful surrogate and are filled with so much excitement for what's to come. This app helped us find our way.",
    image: 'https://picsum.photos/400/300?random=17',
    dataAiHint: 'happy couple',
  },
   {
    name: 'Jasmine',
    journey: '5 years, unexplained infertility',
    story: "The hardest part of 'unexplained' is the lack of answers. It's a mental battle more than anything. The mindfulness tools in this app were my anchor. After years of trying, we decided to pursue adoption and our hearts have never been fuller. The destination isn't always what you planned.",
    image: 'https://picsum.photos/400/300?random=18',
    dataAiHint: 'thoughtful woman',
  },
]

export default function StoriesPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Success Stories
          </h1>
          <p className="text-muted-foreground">
            Inspiration and hope from others who have walked this path.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {stories.map((story) => (
            <Card key={story.name} className="overflow-hidden">
                <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1 relative min-h-[200px] md:min-h-0">
                        <Image src={story.image} alt={story.name} fill className="object-cover" data-ai-hint={story.dataAiHint} />
                    </div>
                    <div className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>{story.name}</CardTitle>
                            <CardDescription>
                                <Badge variant="secondary">{story.journey}</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                            <Quote className="absolute -top-2 left-0 h-8 w-8 text-muted/50" />
                            <p className="pl-6 text-muted-foreground italic">
                                {story.story}
                            </p>
                        </CardContent>
                    </div>
                </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
