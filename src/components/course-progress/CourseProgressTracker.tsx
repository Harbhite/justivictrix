
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Course {
  id: number;
  code: string;
  title: string;
  units: number;
  year: number;
  semester: number;
  completed: boolean;
}

interface CourseProgress {
  course_id: number;
  progress_percentage: number;
  last_studied_at: string;
  notes: string;
}

const CourseProgressTracker = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<Record<number, CourseProgress>>({});
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  useEffect(() => {
    if (user) {
      fetchCoursesAndProgress();
    }
  }, [user]);

  const fetchCoursesAndProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('year')
        .order('semester')
        .order('code');

      if (coursesError) throw coursesError;

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      setCourses(coursesData || []);
      
      // Convert progress array to object for easier lookup
      const progressMap = (progressData || []).reduce((acc, item) => {
        acc[item.course_id] = item;
        return acc;
      }, {} as Record<number, CourseProgress>);
      
      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load course progress');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (courseId: number, newProgress: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: newProgress,
          last_studied_at: new Date().toISOString(),
          notes: progress[courseId]?.notes || ''
        }, {
          onConflict: 'user_id,course_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        [courseId]: {
          ...prev[courseId],
          course_id: courseId,
          progress_percentage: newProgress,
          last_studied_at: new Date().toISOString(),
          notes: prev[courseId]?.notes || ''
        }
      }));

      toast.success('Progress updated successfully');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const saveNotes = async (courseId: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('course_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: progress[courseId]?.progress_percentage || 0,
          notes: tempNotes,
          last_studied_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        [courseId]: {
          ...prev[courseId],
          course_id: courseId,
          progress_percentage: prev[courseId]?.progress_percentage || 0,
          notes: tempNotes,
          last_studied_at: new Date().toISOString()
        }
      }));

      setEditingNotes(null);
      setTempNotes('');
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    }
  };

  const getProgressStats = () => {
    const totalCourses = courses.length;
    const coursesWithProgress = Object.keys(progress).length;
    const averageProgress = coursesWithProgress > 0 
      ? Math.round(Object.values(progress).reduce((sum, p) => sum + p.progress_percentage, 0) / coursesWithProgress)
      : 0;
    
    return { totalCourses, coursesWithProgress, averageProgress };
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-600">Please log in to track your course progress.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading course progress...</div>;
  }

  const stats = getProgressStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Courses</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesWithProgress}</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const courseProgress = progress[course.id];
          const progressValue = courseProgress?.progress_percentage || 0;
          
          return (
            <Card key={course.id} className="border-2 border-black">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.code}: {course.title}</CardTitle>
                    <CardDescription>
                      Year {course.year}, Semester {course.semester} • {course.units} Units
                    </CardDescription>
                  </div>
                  <Badge variant={course.completed ? "default" : "secondary"}>
                    {course.completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="w-full" />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProgress(course.id, Math.max(0, progressValue - 10))}
                    >
                      -10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProgress(course.id, Math.min(100, progressValue + 10))}
                    >
                      +10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateProgress(course.id, 100)}
                    >
                      Complete
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Study Notes</span>
                    {editingNotes === course.id ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveNotes(course.id)}>Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingNotes(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingNotes(course.id);
                          setTempNotes(courseProgress?.notes || '');
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {editingNotes === course.id ? (
                    <Textarea
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Add your study notes here..."
                      className="min-h-[80px]"
                    />
                  ) : (
                    <div className="text-sm text-gray-600 min-h-[80px] p-2 bg-gray-50 rounded border">
                      {courseProgress?.notes || "No notes added yet."}
                    </div>
                  )}
                </div>

                {courseProgress?.last_studied_at && (
                  <div className="text-xs text-gray-500">
                    Last studied: {new Date(courseProgress.last_studied_at).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseProgressTracker;
