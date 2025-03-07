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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
