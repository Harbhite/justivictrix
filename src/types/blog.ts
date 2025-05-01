
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  category: string;
  is_anonymous: boolean;
  author?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}
