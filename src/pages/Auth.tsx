import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, User, Key, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  // Define navigate here but use it safely inside useEffect to avoid null issues
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        console.log("Session check:", sessionData, error);
        if (sessionData.session) {
          navigate("/resources");
        }
      } catch (err) {
        console.error("Error checking session:", err);
      }
    };
    
    // Only run this effect if navigate is defined
    if (navigate) {
      checkSession();
    }
  }, [navigate]); // Add navigate as dependency

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      // Regular authentication flow
      if (isSignUp) {
        // Validate passwords match
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoading(false);
          setAuthError("Passwords do not match");
          return;
        }

        // Sign up new user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        console.log("Sign up response:", signUpData, signUpError);

        if (signUpError) throw signUpError;
        
        toast.success("Registration successful! Please check your email to confirm your account.");
      } else {
        // Sign in existing user
        console.log("Attempting sign in with:", email);
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log("Sign in response:", signInData, signInError);

        if (signInError) throw signInError;
        
        toast.success("Logged in successfully!");
        if (navigate) {
          navigate("/resources");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setAuthError(error.message);
      
      // Try to provide more helpful error messages
      if (error.message.includes("Email not confirmed")) {
        setAuthError("Email not confirmed. Please check your inbox for the confirmation email.");
      }
      
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-law-dark mb-4 inline-block border-4 border-black p-4 transform -rotate-1">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <p className="text-gray-600">
            {isSignUp 
              ? "Create an account to access all features" 
              : "Sign in to access your account"}
          </p>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
              <p><strong>Error:</strong> {authError}</p>
            </div>
          )}
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-bold text-gray-700">
                Email
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-bold text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700">
                  Confirm Password
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full border-2 border-black bg-law-accent text-black font-bold p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>{isSignUp ? "Sign Up" : "Login"}</span>
              )}
            </Button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
