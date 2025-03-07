
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
    } & Database['public']['Tables'];
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  };
};
