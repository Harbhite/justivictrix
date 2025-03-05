
import { useContext } from 'react';
import { AuthContext } from '@/App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useAuth() {
  const { user, isLoading } = useContext(AuthContext);
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
