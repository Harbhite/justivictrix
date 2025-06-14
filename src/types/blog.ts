
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image_url: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  status: 'draft' | 'published' | 'private';
  category: string;
  tags: string[];
  is_anonymous: boolean;
  is_featured: boolean;
  view_count: number;
  author?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
    bio?: string;
  };
  comments_count?: number;
}

export interface BlogComment {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  author_url?: string;
  content: string;
  created_at: string;
  status: 'approved' | 'pending' | 'spam';
  parent_id?: number;
  replies?: BlogComment[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  post_count: number;
}
