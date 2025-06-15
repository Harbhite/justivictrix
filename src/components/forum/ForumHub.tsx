import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForumCategoryList from "./ForumCategoryList";
import ForumMicroblogFeed from "./ForumMicroblogFeed";
import { MessageSquareText, User, Settings, BookOpen, Award, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const ForumHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("categories");

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquareText className="h-8 w-8" />
          Community Forum
        </h1>
        <p className="text-gray-600 mt-2">
          A space for everyone to discuss topics, share knowledge, and collaborate on legal matters.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <ForumCategoryList />
            </TabsContent>
            <TabsContent value="community">
              {/* MICROBLOG FEED */}
              <ForumMicroblogFeed />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={18} />
                Forum Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                {user ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member since:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Forum access:</span>
                      <span className="font-medium">Full</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-600">User status:</span>
                    <span className="font-medium">Guest</span>
                  </div>
                )}
              </div>
              
              {user && (
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleNavigate("/forum/settings")}
                  >
                    <Settings size={16} className="mr-2" />
                    Forum Settings
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={18} />
                Forum Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                • Be respectful and courteous to fellow members
              </p>
              <p className="text-sm">
                • Keep discussions on topic and relevant
              </p>
              <p className="text-sm">
                • No sharing of exam materials or answers
              </p>
              <p className="text-sm">
                • Use anonymous posting responsibly
              </p>
              <p className="text-sm">
                • Report inappropriate content to moderators
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForumHub;
