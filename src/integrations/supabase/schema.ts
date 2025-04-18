
import { Database } from './types';

// Extend the Database type with our new tables
export type ExtendedDatabase = Database & {
  public: {
    Tables: {
      events: {
        Row: {
          id: number;
          title: string;
          date: string;
          time: string;
          location: string;
          description: string;
          created_at: string;
        };
        Insert: {
          title: string;
          date: string;
          time: string;
          location: string;
          description: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          date?: string;
          time?: string;
          location?: string;
          description?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      study_groups: {
        Row: {
          id: number;
          name: string;
          subject: string;
          meeting_day: string;
          meeting_time: string;
          location: string;
          max_members: number;
          current_members: number;
          created_at: string;
        };
        Insert: {
          name: string;
          subject: string;
          meeting_day: string;
          meeting_time: string;
          location: string;
          max_members?: number;
          current_members?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          subject?: string;
          meeting_day?: string;
          meeting_time?: string;
          location?: string;
          max_members?: number;
          current_members?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      timetable: {
        Row: {
          id: number;
          course_code: string;
          course_title: string;
          day: string;
          start_time: string;
          end_time: string;
          location: string;
          lecturer: string;
          created_at: string;
        };
        Insert: {
          course_code: string;
          course_title: string;
          day: string;
          start_time: string;
          end_time: string;
          location: string;
          lecturer: string;
          created_at?: string;
        };
        Update: {
          course_code?: string;
          course_title?: string;
          day?: string;
          start_time?: string;
          end_time?: string;
          location?: string;
          lecturer?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          content: string;
          excerpt: string;
          author_id: string;
          is_anonymous: boolean;
          created_at: string;
          updated_at: string;
          category: string;
          image_url: string;
        };
        Insert: {
          title: string;
          content: string;
          excerpt: string;
          author_id: string;
          is_anonymous?: boolean;
          created_at?: string;
          updated_at?: string;
          category: string;
          image_url?: string;
        };
        Update: {
          title?: string;
          content?: string;
          excerpt?: string;
          author_id?: string;
          is_anonymous?: boolean;
          created_at?: string;
          updated_at?: string;
          category?: string;
          image_url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    } & Database['public']['Tables'];
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  };
};
