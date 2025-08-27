'use client'

import { useState } from 'react'
import AppLayout from '@/components/layout/app-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageSquare,
  Heart,
  PlusCircle,
  Search,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const topics = [
  'General Discussion',
  'IVF/IUI',
  'Emotional Support',
  'Success Stories',
  'Coping Strategies',
  'Partner Support',
]

const posts = [
  {
    id: 1,
    author: 'HopefulSoul',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    time: '2 hours ago',
    topic: 'IVF/IUI',
    title: 'Feeling so anxious about our first IVF cycle. Any advice?',
    content:
      "We're starting our first round of IVF next week and I'm a bundle of nerves. I'm excited but also terrified. For those who've been through it, what do you wish you'd known beforehand? Any tips for managing the emotional and physical side effects?",
    comments: 12,
    likes: 34,
  },
  {
    id: 2,
    author: 'StrongerTogether',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    time: '5 hours ago',
    topic: 'Partner Support',
    title: "How to best support my partner through this?",
    content:
      "As the non-carrying partner, I sometimes feel helpless. I want to be as supportive as possible, but I'm not always sure how. What are the most helpful things your partners have done for you during treatment? I'm open to any and all suggestions.",
    comments: 8,
    likes: 22,
  },
  {
    id: 3,
    author: 'PatientlyWaiting',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    time: '1 day ago',
    topic: 'Coping Strategies',
    title: 'The two-week wait is driving me crazy.',
    content:
      "I'm in the middle of the TWW and every single twinge or lack thereof is sending me into a spiral. How do you all get through this period without losing your minds? I need some distraction ideas, please!",
    comments: 25,
    likes: 51,
  },
]

export default function CommunityPage() {
  const [newPostContent, setNewPostContent] = useState('')
  const [activeTopic, setActiveTopic] = useState('General Discussion')

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight">
            Community Forum
          </h1>
          <p className="text-muted-foreground">
            Connect, share, and find support with others on a similar journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share what's on your mind..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {topics.map((topic) => (
                    <Button
                      key={topic}
                      variant={activeTopic === topic ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTopic(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-10" />
              </div>
              <Button>Newest</Button>
              <Button variant="outline">Top</Button>
            </div>
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="p-4 bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>
                          {post.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.time} in <Badge variant="outline" className="text-xs">{post.topic}</Badge>
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-lg font-headline font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.content}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-muted/50">
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} Comments</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes} Likes</span>
                      </button>
                    </div>
                    <Button size="sm">Read More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  )
}
