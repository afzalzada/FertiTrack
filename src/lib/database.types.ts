export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string
          event_date: string
          id: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_date: string
          id?: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_date?: string
          id?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mood_logs: {
        Row: {
          created_at: string
          id: string
          log_date: string
          mood_level: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          log_date: string
          mood_level: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          log_date?: string
          mood_level?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          title: string
          topic: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          title: string
          topic?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      symptom_logs: {
        Row: {
          created_at: string
          id: string
          log_date: string
          symptom: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          log_date: string
          symptom: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          log_date?: string
          symptom?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_full_name: {
        Args: {
          user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Custom types
export type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type PostWithAuthor = Post & {
    author: Pick<Profile, 'full_name' | 'avatar_url'> | null
}
export type CalendarEvent = Omit<Database['public']['Tables']['calendar_events']['Row'], 'event_date'> & {
    event_date: Date
}
export type MoodLog = Database['public']['Tables']['mood_logs']['Row']
