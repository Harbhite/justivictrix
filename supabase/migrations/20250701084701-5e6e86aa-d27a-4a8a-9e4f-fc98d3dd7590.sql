
-- Add author_name and references columns to blog_posts table (using quoted identifier for references)
ALTER TABLE public.blog_posts 
ADD COLUMN author_name TEXT,
ADD COLUMN "references" TEXT;
