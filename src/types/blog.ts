
export interface BlogPost {
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
  author?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}
