'use client'

import { useState, useEffect, useCallback } from 'react'
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
  Loader2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { formatDistanceToNow } from 'date-fns'
import type { PostWithAuthor } from '@/lib/database.types'

const topics = [
  'General Discussion',
  'IVF/IUI',
  'Emotional Support',
  'Success Stories',
  'Coping Strategies',
  'Partner Support',
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [activeTopic, setActiveTopic] = useState('General Discussion')
  const { toast } = useToast()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles (full_name, avatar_url)
      `)
      .order('created_at', { ascending: false })

    if (activeTopic !== 'General Discussion') {
      query = query.eq('topic', activeTopic)
    }

    const { data, error } = await query

    if (error) {
      toast({ title: 'Error fetching posts', description: error.message, variant: 'destructive' })
    } else {
      setPosts(data as unknown as PostWithAuthor[] || [])
    }
    setLoading(false)
  }, [activeTopic, toast])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
        toast({ title: 'Incomplete Post', description: 'Please provide a title and content for your post.', variant: 'destructive'})
        return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        toast({ title: 'Not authenticated', description: 'You must be logged in to create a post.', variant: 'destructive'})
        return
    }

    const { error } = await supabase.from('posts').insert({
        title: newPostTitle,
        content: newPostContent,
        topic: activeTopic,
        author_id: user.id
    })

    if (error) {
        toast({ title: 'Error creating post', description: error.message, variant: 'destructive'})
    } else {
        setNewPostTitle('')
        setNewPostContent('')
        toast({ title: 'Post created!', description: 'Your post has been shared with the community.'})
        fetchPosts()
    }
  }


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
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Post title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Share what's on your mind..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCreatePost}>
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
              {loading ? (
                 <div className="flex items-center justify-center h-64 gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span>Loading posts...</span>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="p-4 bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author?.avatar_url || ''} alt={post.author?.full_name || 'User'} />
                          <AvatarFallback>
                            {post.author?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author?.full_name || 'Anonymous'}</p>
                          <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })} in <Badge variant="secondary" className="text-xs">{post.topic}</Badge>
                          </div>
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
                          <span>0 Comments</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-accent transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>0 Likes</span>
                        </button>
                      </div>
                      <Button size="sm">Read More</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No posts in this topic yet.</p>
                    <p className="text-sm">Be the first to share your story!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  )
}
