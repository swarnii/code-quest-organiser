
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Code,
  Users,
  Trophy,
  Calendar,
  Award,
  CheckCircle,
  ChevronRight,
  Github,
  Laptop,
  ExternalLink
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'HackathonOrganiser - Simplify Hackathon Management';
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-hackathon-primary mr-2" />
              <span className="font-bold text-xl text-hackathon-primary">HackathonOrganiser</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/#features" className="text-gray-600 hover:text-hackathon-primary transition">
              Features
            </Link>
            <Link to="/#roles" className="text-gray-600 hover:text-hackathon-primary transition">
              User Roles
            </Link>
            <Link to="/#about" className="text-gray-600 hover:text-hackathon-primary transition">
              About
            </Link>
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
          
          <div className="md:hidden">
            {isAuthenticated ? (
              <Button asChild size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hackathon-primary/10 via-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simplify Your Hackathon Management
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                An all-in-one platform for organizing, participating in, and judging hackathons.
                From team formation to project submission and voting - we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Button size="lg" className="text-base" asChild>
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="text-base" asChild>
                      <Link to="/signup">
                        Get Started
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-base" asChild>
                      <Link to="/login">
                        Log in
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden transform rotate-1">
                <img 
                  src="https://placehold.co/700x400/e2e8f0/475569?text=Leaderboard+Screenshot" 
                  alt="HackathonOrganiser Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100 transform -rotate-2">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Real-time Leaderboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to run successful hackathons from start to finish
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
                <Users className="h-6 w-6 text-hackathon-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Create teams, generate unique join codes, and collaborate with fellow participants.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-purple-100 p-3 w-fit mb-4">
                <Code className="h-6 w-6 text-hackathon-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Submissions</h3>
              <p className="text-gray-600">
                Easily submit projects with descriptions, repository links, and demo URLs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-green-100 p-3 w-fit mb-4">
                <Award className="h-6 w-6 text-hackathon-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voting System</h3>
              <p className="text-gray-600">
                Fair and transparent voting process with real-time leaderboard updates.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-yellow-100 p-3 w-fit mb-4">
                <Calendar className="h-6 w-6 text-hackathon-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-gray-600">
                Create and manage multiple hackathons with custom settings and timelines.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-red-100 p-3 w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-hackathon-danger" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Approval</h3>
              <p className="text-gray-600">
                Review and approve project submissions to ensure they meet hackathon criteria.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="rounded-full bg-indigo-100 p-3 w-fit mb-4">
                <Trophy className="h-6 w-6 text-hackathon-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Live leaderboard with Socket.IO for instant feedback on project rankings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* User Roles Section */}
      <section id="roles" className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">User Roles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              HackathonOrganiser provides tailored experiences for different user types
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Admin Role */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-semibold">Administrator</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Create and manage hackathons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Assign organizers to events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>User management and access control</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>View all teams and submissions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>System-wide configuration</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Organiser Role */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-purple-600 text-white p-4">
                <h3 className="text-xl font-semibold">Organiser</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Manage assigned hackathons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Review and approve projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Enable/disable voting periods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monitor leaderboard and results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Participant communication</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Participant Role */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-green-600 text-white p-4">
                <h3 className="text-xl font-semibold">Participant</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Register for hackathons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Create or join teams with code</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Submit projects with details</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Vote on other team's projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>View real-time results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About HackathonOrganiser</h2>
            <p className="text-gray-600 mb-6">
              HackathonOrganiser is a comprehensive platform built to streamline the entire hackathon process.
              From event creation to project submission and voting, our tool simplifies every aspect of hackathon management.
            </p>
            <p className="text-gray-600 mb-6">
              Built with modern technologies including React, Node.js, Express, Prisma ORM, PostgreSQL, 
              and Socket.IO for real-time updates, HackathonOrganiser delivers a seamless experience for 
              administrators, organizers, and participants alike.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
              <Button variant="outline" asChild className="gap-2">
                <Link to="https://github.com">
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
              
              <Button asChild className="gap-2">
                <Link to="/signup">
                  <Laptop className="h-4 w-4" />
                  <span>Start Using It Today</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <Trophy className="h-8 w-8 text-hackathon-primary mr-2" />
              <span className="font-bold text-xl">HackathonOrganiser</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link to="/#features" className="hover:text-hackathon-primary transition">Features</Link>
              <Link to="/#roles" className="hover:text-hackathon-primary transition">User Roles</Link>
              <Link to="/#about" className="hover:text-hackathon-primary transition">About</Link>
              <Link to="/login" className="hover:text-hackathon-primary transition">Log in</Link>
              <Link to="/signup" className="hover:text-hackathon-primary transition">Sign up</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HackathonOrganiser. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link to="#" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
