
import { useState, useEffect } from "react";
import { Calendar, Tag, Folder, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCategory, BlogTag } from "@/types/blog";

interface BlogSidebarProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  onCategorySelect: (category: string) => void;
  onTagSelect: (tag: string) => void;
  selectedCategory: string;
  selectedTag: string;
}

const BlogSidebar = ({ 
  categories, 
  tags, 
  onCategorySelect, 
  onTagSelect,
  selectedCategory,
  selectedTag 
}: BlogSidebarProps) => {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      {/* Search on Mobile */}
      <Card className="md:hidden">
        <CardContent className="pt-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles..."
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder size={18} />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => onCategorySelect("All")}
            >
              <span>All Posts</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {categories.reduce((sum, cat) => sum + cat.post_count, 0)}
              </span>
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "ghost"}
                className="w-full justify-between"
                onClick={() => onCategorySelect(category.name)}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {category.post_count}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag size={18} />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <Button
                key={tag.id}
                variant={selectedTag === tag.name ? "default" : "outline"}
                size="sm"
                onClick={() => onTagSelect(tag.name)}
                className="text-xs"
              >
                {tag.name} ({tag.post_count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={18} />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-gray-600">5 new posts this week</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-gray-400" />
              <span className="text-gray-600">12 active discussions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribe to Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest legal insights and updates delivered to your inbox.
          </p>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
