
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useAuth() {
  const context = useContext(AuthContext);
  
  // Make sure the context is being used within an AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, isLoading } = context;
  const navigate = useNavigate();
  
  // Function to check auth and redirect if not authenticated
  const requireAuth = (redirectPath = '/auth') => {
    if (!isLoading && !user) {
      toast.error("You must be logged in to access this page");
      navigate(redirectPath);
      return false;
    }
    return true;
  };
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    requireAuth
  };
}
