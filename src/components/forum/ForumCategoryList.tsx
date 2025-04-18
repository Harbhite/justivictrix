
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight, MessageSquare, BookOpen, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  topicCount?: number;
}

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "general-discussion":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "case-studies":
      return <Scale className="h-5 w-5 text-green-500" />;
    case "study-resources":
      return <BookOpen className="h-5 w-5 text-amber-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
  }
};

const ForumCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("forum_categories")
          .select("*")
          .order("name");

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          return;
        }

        // For each category, count the number of topics
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            const { count, error } = await supabase
              .from("forum_topics")
              .select("*", { count: "exact" })
              .eq("category_id", category.id);

            return {
              ...category,
              topicCount: count || 0,
            };
          })
        );

        setCategories(categoriesWithCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Card key={n} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/forum/category/${category.slug}`}
          className="block"
        >
          <Card className="overflow-hidden transition-all hover:border-gray-400 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category.slug)}
                  {category.name}
                </div>
                <div className="text-sm text-gray-500 font-normal">
                  {category.topicCount} {category.topicCount === 1 ? "topic" : "topics"}
                </div>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-right">
              <ChevronRight className="h-5 w-5 inline-block text-gray-400" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ForumCategoryList;
