
import { useState, useEffect } from 'react';
import { Search, FileText, Users, Calendar, BookOpen, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SearchResult {
  id: string;
  title: string;
  type: 'resource' | 'member' | 'event' | 'course' | 'blog';
  description?: string;
  url: string;
}

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['globalSearch', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];

      const results: SearchResult[] = [];

      // Search resources
      const { data: resources } = await supabase
        .from('resources')
        .select('id, title, description')
        .ilike('title', `%${searchQuery}%`)
        .limit(3);

      if (resources) {
        results.push(...resources.map(r => ({
          id: `resource-${r.id}`,
          title: r.title,
          type: 'resource' as const,
          description: r.description,
          url: '/resources'
        })));
      }

      // Search members
      const { data: members } = await supabase
        .from('members')
        .select('id, name, post_held')
        .ilike('name', `%${searchQuery}%`)
        .limit(3);

      if (members) {
        results.push(...members.map(m => ({
          id: `member-${m.id}`,
          title: m.name,
          type: 'member' as const,
          description: m.post_held,
          url: `/people/${m.id}`
        })));
      }

      // Search events
      const { data: events } = await supabase
        .from('events')
        .select('id, title, description, date')
        .ilike('title', `%${searchQuery}%`)
        .limit(3);

      if (events) {
        results.push(...events.map(e => ({
          id: `event-${e.id}`,
          title: e.title,
          type: 'event' as const,
          description: e.description,
          url: '/events'
        })));
      }

      // Search courses
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title, code, description')
        .or(`title.ilike.%${searchQuery}%,code.ilike.%${searchQuery}%`)
        .limit(3);

      if (courses) {
        results.push(...courses.map(c => ({
          id: `course-${c.id}`,
          title: `${c.code} - ${c.title}`,
          type: 'course' as const,
          description: c.description,
          url: '/courses'
        })));
      }

      return results;
    },
    enabled: searchQuery.length >= 2
  });

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'resource': return <FileText className="h-4 w-4" />;
      case 'member': return <Users className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'blog': return <FileText className="h-4 w-4" />;
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative h-9 w-40 justify-start text-sm text-muted-foreground">
          <Search className="mr-2 h-4 w-4" />
          Search...
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search resources, members, events, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="text-sm text-muted-foreground">Searching...</div>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full flex items-start gap-3 rounded-md p-3 text-left hover:bg-muted transition-colors"
                >
                  <div className="mt-0.5 text-muted-foreground">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{result.title}</div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {result.description}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground capitalize mt-1">
                      {result.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery.length >= 2 ? (
            <div className="flex items-center justify-center py-6">
              <div className="text-sm text-muted-foreground">No results found</div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-6">
              <div className="text-sm text-muted-foreground">
                Type at least 2 characters to search
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
