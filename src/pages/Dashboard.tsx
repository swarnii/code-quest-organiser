
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Layers, Users, Calendar, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | HackathonOrganiser';
  }, []);

  const renderAdminDashboard = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hackathons Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Hackathons</CardTitle>
              <CardDescription>Manage all hackathons</CardDescription>
            </div>
            <Layers className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">2 active, 1 completed</p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/admin/hackathons')}
            >
              View Hackathons
            </Button>
          </CardContent>
        </Card>
        
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage platform users</CardDescription>
            </div>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">1 admin, 2 organisers, 4 participants</p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/admin/users')}
            >
              Manage Users
            </Button>
          </CardContent>
        </Card>
        
        {/* Activity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Recent activity</CardDescription>
            </div>
            <Activity className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-2 border-hackathon-primary pl-3 py-1">
                <p className="text-sm">New project submission from Team Quantum Coders</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
              <div className="border-l-2 border-hackathon-primary pl-3 py-1">
                <p className="text-sm">New user registered: Alice Johnson</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <div className="border-l-2 border-hackathon-primary pl-3 py-1">
                <p className="text-sm">Hackathon "AI Innovations" created</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Hackathons */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Hackathons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hackathon 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Innovation Challenge 2025</CardTitle>
            <CardDescription>Sustainable development solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">June 15, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">Virtual Event</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/admin/hackathons/1')}
              variant="outline"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
        
        {/* Hackathon 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Tech for Good Hackathon</CardTitle>
            <CardDescription>Social impact technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">July 20, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/admin/hackathons/2')}
              variant="outline"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
        
        {/* Hackathon 3 */}
        <Card>
          <CardHeader>
            <CardTitle>AI Innovations Hackathon</CardTitle>
            <CardDescription>AI frontiers exploration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">August 10, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">Boston, MA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm font-medium text-gray-600">Upcoming</span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/admin/hackathons/3')}
              variant="outline"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderOrganiserDashboard = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Organiser Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Hackathons Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>My Hackathons</CardTitle>
              <CardDescription>Hackathons you organize</CardDescription>
            </div>
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">2 active</p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/organiser/hackathons')}
            >
              View Hackathons
            </Button>
          </CardContent>
        </Card>
        
        {/* Submissions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Pending Submissions</CardTitle>
              <CardDescription>Project submissions to review</CardDescription>
            </div>
            <Layers className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">1 new submission awaiting review</p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/organiser/submissions')}
            >
              Review Submissions
            </Button>
          </CardContent>
        </Card>
        
        {/* Voting Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Voting Status</CardTitle>
              <CardDescription>Manage voting periods</CardDescription>
            </div>
            <Award className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1 Active</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active voting for Innovation Challenge 2025
            </p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/organiser/voting')}
            >
              Manage Voting
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Activity</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="border-l-2 border-hackathon-primary pl-3 py-1">
              <p className="text-sm">New project submission: "SmartCity" by Data Miners</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
            <div className="border-l-2 border-hackathon-primary pl-3 py-1">
              <p className="text-sm">New team joined: "Quantum Coders" in Tech for Good Hackathon</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
            <div className="border-l-2 border-hackathon-primary pl-3 py-1">
              <p className="text-sm">Project "EcoTracker" approved</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div className="border-l-2 border-hackathon-primary pl-3 py-1">
              <p className="text-sm">Voting enabled for Innovation Challenge 2025</p>
              <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
            </div>
            <div className="border-l-2 border-hackathon-primary pl-3 py-1">
              <p className="text-sm">New participant registered: Bob Williams</p>
              <p className="text-xs text-muted-foreground">Yesterday at 10:20 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderParticipantDashboard = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Participant Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Teams Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>My Teams</CardTitle>
              <CardDescription>Your hackathon teams</CardDescription>
            </div>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Member of 2 teams across different hackathons
            </p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/teams')}
            >
              View Teams
            </Button>
          </CardContent>
        </Card>
        
        {/* My Projects Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>Your submitted projects</CardDescription>
            </div>
            <Layers className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              1 approved, 0 pending, 1 needs submission
            </p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/projects')}
            >
              View Projects
            </Button>
          </CardContent>
        </Card>
        
        {/* Voting Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Voting</CardTitle>
              <CardDescription>Vote on other projects</CardDescription>
            </div>
            <Award className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1 Active</div>
            <p className="text-xs text-muted-foreground mt-1">
              Voting is open for Innovation Challenge 2025
            </p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/voting')}
            >
              Vote Now
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Hackathons */}
      <h2 className="text-xl font-bold mt-8 mb-4">Upcoming Hackathons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hackathon 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Innovation Challenge 2025</CardTitle>
            <CardDescription>Sustainable development solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">June 15, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">Virtual Event</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                Participating
              </span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/hackathons/1')}
              variant="outline"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
        
        {/* Hackathon 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Tech for Good Hackathon</CardTitle>
            <CardDescription>Social impact technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">July 20, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                Participating
              </span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/hackathons/2')}
              variant="outline"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
        
        {/* Hackathon 3 */}
        <Card>
          <CardHeader>
            <CardTitle>AI Innovations Hackathon</CardTitle>
            <CardDescription>AI frontiers exploration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">August 10, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">Boston, MA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                Open for Registration
              </span>
            </div>
            <Button 
              className="mt-4 w-full" 
              onClick={() => navigate('/hackathons/3')}
              variant="outline"
            >
              Register Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <MainLayout>
      {user?.role === 'ADMIN' && renderAdminDashboard()}
      {user?.role === 'ORGANISER' && renderOrganiserDashboard()}
      {user?.role === 'PARTICIPANT' && renderParticipantDashboard()}
    </MainLayout>
  );
};

export default Dashboard;
