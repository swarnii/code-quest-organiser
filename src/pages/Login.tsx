
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    document.title = 'Login | HackathonOrganiser';
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
          Manage your hackathons with ease
        </p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Demo accounts:</p>
        <ul className="mt-1">
          <li>admin@example.com / password</li>
          <li>organiser@example.com / password</li>
          <li>participant@example.com / password</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
