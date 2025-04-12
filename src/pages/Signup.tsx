
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    document.title = 'Sign Up | HackathonOrganiser';
  }, []);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-hackathon-primary mb-2">
          HackathonOrganiser
        </h1>
        <p className="text-gray-600">
          Join the HackathonOrganiser platform
        </p>
      </div>
      
      <SignupForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default Signup;
