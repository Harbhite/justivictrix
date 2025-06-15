
-- Add missing columns to blog_posts to match WordPress-like blog model
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- Ensure status can only be: 'draft', 'published', 'private'
-- Using a trigger instead of a check constraint for mutability (best practice)
CREATE OR REPLACE FUNCTION enforce_blog_post_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'published', 'private') THEN
    RAISE EXCEPTION 'Invalid status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_post_status_trigger ON public.blog_posts;
CREATE TRIGGER blog_post_status_trigger
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE PROCEDURE enforce_blog_post_status();

