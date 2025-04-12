
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, UserRole } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserProfile: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: true,
  });

  // Mock API call for authentication - replace with real API calls when backend is ready
  const mockAuthApi = async (credentials: any, endpoint: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This is a placeholder for actual API calls
    if (endpoint === '/auth/login') {
      // Mock successful login
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        return {
          user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' },
          token: 'mock-jwt-token-admin'
        };
      }
      if (credentials.email === 'organiser@example.com' && credentials.password === 'password') {
        return {
          user: { id: '2', name: 'Organiser User', email: 'organiser@example.com', role: 'ORGANISER' },
          token: 'mock-jwt-token-organiser'
        };
      }
      if (credentials.email === 'participant@example.com' && credentials.password === 'password') {
        return {
          user: { id: '3', name: 'Participant User', email: 'participant@example.com', role: 'PARTICIPANT' },
          token: 'mock-jwt-token-participant'
        };
      }
      throw new Error('Invalid credentials');
    }
    
    if (endpoint === '/auth/signup') {
      // Mock successful signup
      return {
        user: { 
          id: '4', 
          name: credentials.name, 
          email: credentials.email, 
          role: credentials.role 
        },
        token: `mock-jwt-token-${credentials.role.toLowerCase()}`
      };
    }
    
    throw new Error('Unknown endpoint');
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          // In a real app, you'd validate the token with your backend
          // For now, we'll just assume the token is valid and fetch user data
          // This would be replaced with an actual API call to fetch the current user
          
          // Mock user based on token for demonstration
          let user = null;
          if (state.token.includes('admin')) {
            user = { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' as UserRole };
          } else if (state.token.includes('organiser')) {
            user = { id: '2', name: 'Organiser User', email: 'organiser@example.com', role: 'ORGANISER' as UserRole };
          } else if (state.token.includes('participant')) {
            user = { id: '3', name: 'Participant User', email: 'participant@example.com', role: 'PARTICIPANT' as UserRole };
          }
          
          setState({
            ...state,
            user,
            isAuthenticated: !!user,
            isLoading: false,
          });
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setState({
          ...state,
          isLoading: false,
        });
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await mockAuthApi({ email, password }, '/auth/login');
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login.",
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await mockAuthApi({ name, email, password, role }, '/auth/signup');
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast({
        title: "Signup successful",
        description: `Welcome, ${response.user.name}!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "An error occurred during signup.",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      setState({
        ...state,
        user: updatedUser,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
