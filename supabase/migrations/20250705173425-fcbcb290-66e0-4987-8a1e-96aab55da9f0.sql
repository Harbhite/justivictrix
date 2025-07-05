-- Add RLS policies for study_groups table
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view study groups
CREATE POLICY "Anyone can view study groups" 
ON public.study_groups 
FOR SELECT 
USING (true);

-- Allow authenticated users to create study groups
CREATE POLICY "Authenticated users can create study groups" 
ON public.study_groups 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow creators or admins to update study groups (fix type casting)
CREATE POLICY "Study group creators can update" 
ON public.study_groups 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM study_group_members 
    WHERE study_group_members.study_group_id = study_groups.id 
    AND study_group_members.user_id = auth.uid() 
    AND study_group_members.is_admin = true
  )
);

-- Allow creators or admins to delete study groups (fix type casting)
CREATE POLICY "Study group creators can delete" 
ON public.study_groups 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM study_group_members 
    WHERE study_group_members.study_group_id = study_groups.id 
    AND study_group_members.user_id = auth.uid() 
    AND study_group_members.is_admin = true
  )
);

-- Add notification preferences table for PWA
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  push_notifications BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  study_group_updates BOOLEAN DEFAULT true,
  forum_mentions BOOLEAN DEFAULT true,
  blog_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notification preferences
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- RLS policies for notification preferences
CREATE POLICY "Users can view their own notification preferences" 
ON public.notification_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification preferences" 
ON public.notification_preferences 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification preferences" 
ON public.notification_preferences 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add search analytics table
CREATE TABLE public.search_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  search_query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_result BOOLEAN DEFAULT false,
  search_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on search analytics
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert search analytics (for tracking)
CREATE POLICY "Anyone can insert search analytics" 
ON public.search_analytics 
FOR INSERT 
WITH CHECK (true);

-- Only allow users to view their own search analytics
CREATE POLICY "Users can view their own search analytics" 
ON public.search_analytics 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);