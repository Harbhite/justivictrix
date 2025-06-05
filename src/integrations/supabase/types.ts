export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: number
          image_url: string | null
          is_anonymous: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          is_anonymous?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          is_anonymous?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          course_id: number | null
          created_at: string
          id: string
          last_studied_at: string | null
          notes: string | null
          progress_percentage: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: string
          last_studied_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: string
          last_studied_at?: string | null
          notes?: string | null
          progress_percentage?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          completed: boolean
          course_outline: string | null
          created_at: string
          description: string
          id: number
          lecturers: string[]
          semester: number
          title: string
          units: number
          year: number
        }
        Insert: {
          code: string
          completed?: boolean
          course_outline?: string | null
          created_at?: string
          description: string
          id?: number
          lecturers: string[]
          semester: number
          title: string
          units: number
          year: number
        }
        Update: {
          code?: string
          completed?: boolean
          course_outline?: string | null
          created_at?: string
          description?: string
          id?: number
          lecturers?: string[]
          semester?: number
          title?: string
          units?: number
          year?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string
          id: number
          location: string
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          id?: number
          location: string
          time: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          id?: number
          location?: string
          time?: string
          title?: string
        }
        Relationships: []
      }
      forum_access_codes: {
        Row: {
          access_code: string
          created_at: string
          description: string | null
          expiry_date: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          access_code: string
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          access_code?: string
          created_at?: string
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      forum_anonymous_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_badges: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          required_points: number | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          name: string
          required_points?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          required_points?: number | null
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          is_solution: boolean | null
          topic_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          topic_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          topic_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          title: string
          updated_at: string
          user_id: string | null
          views: number | null
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          title: string
          updated_at?: string
          user_id?: string | null
          views?: number | null
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_user_access: {
        Row: {
          access_code_id: string | null
          granted_at: string
          id: string
          user_id: string
        }
        Insert: {
          access_code_id?: string | null
          granted_at?: string
          id?: string
          user_id: string
        }
        Update: {
          access_code_id?: string | null
          granted_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_user_access_access_code_id_fkey"
            columns: ["access_code_id"]
            isOneToOne: false
            referencedRelation: "forum_access_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          created_at: string
          date: string
          id: number
          image_url: string
          title: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          image_url: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          gender: string
          id: number
          matric_number: string
          name: string
          post_held: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          gender: string
          id?: number
          matric_number: string
          name: string
          post_held?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          gender?: string
          id?: number
          matric_number?: string
          name?: string
          post_held?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          position: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          position?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          position?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_type: string | null
          file_url: string
          id: number
          is_pinned: boolean | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url: string
          id?: number
          is_pinned?: boolean | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url?: string
          id?: number
          is_pinned?: boolean | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_group_members: {
        Row: {
          id: string
          is_admin: boolean | null
          joined_at: string
          study_group_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_admin?: boolean | null
          joined_at?: string
          study_group_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_admin?: boolean | null
          joined_at?: string
          study_group_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_study_group_id_fkey"
            columns: ["study_group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string
          current_members: number | null
          id: number
          location: string
          max_members: number
          meeting_day: string
          meeting_time: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          current_members?: number | null
          id?: number
          location: string
          max_members?: number
          meeting_day: string
          meeting_time: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          current_members?: number | null
          id?: number
          location?: string
          max_members?: number
          meeting_day?: string
          meeting_time?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      timetable: {
        Row: {
          course_code: string
          course_title: string
          created_at: string
          day: string
          end_time: string
          id: number
          lecturer: string
          location: string
          start_time: string
        }
        Insert: {
          course_code: string
          course_title: string
          created_at?: string
          day: string
          end_time: string
          id?: number
          lecturer: string
          location: string
          start_time: string
        }
        Update: {
          course_code?: string
          course_title?: string
          created_at?: string
          day?: string
          end_time?: string
          id?: number
          lecturer?: string
          location?: string
          start_time?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          badge_id: string
          id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge_id: string
          id?: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "forum_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reputation: {
        Row: {
          id: string
          level: number | null
          reputation_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          level?: number | null
          reputation_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          level?: number | null
          reputation_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
