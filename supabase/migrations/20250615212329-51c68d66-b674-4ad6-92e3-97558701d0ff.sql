
-- Allow authenticated users to grant themselves forum access in forum_user_access
CREATE POLICY "Users can add themselves to forum_user_access"
  ON public.forum_user_access
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
