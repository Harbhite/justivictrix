
-- Create table for microblog posts ("forum_microblogs")
CREATE TABLE public.forum_microblogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE public.forum_microblogs ENABLE ROW LEVEL SECURITY;

-- Allow users to select all posts (public timeline)
CREATE POLICY "Public can view microblog posts" 
  ON public.forum_microblogs
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert their own posts
CREATE POLICY "Users can post microblogs"
  ON public.forum_microblogs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow authors to update or delete only their own posts
CREATE POLICY "Users can modify own microblogs"
  ON public.forum_microblogs
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own microblogs"
  ON public.forum_microblogs
  FOR DELETE USING (auth.uid() = user_id);
