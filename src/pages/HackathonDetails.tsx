
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, MapPin, Users, FileText, Clock } from 'lucide-react';

// This would normally come from an API
const getHackathonById = (id: string) => {
  const hackathons = [
    {
      id: '1',
      name: 'Innovation Challenge 2025',
      description: 'Sustainable development solutions',
      date: 'June 15, 2025',
      location: 'Virtual Event',
      status: 'Active',
      participants: 42,
      teams: 12,
      submissions: 10,
      timeLeft: '14 days',
      isParticipating: true
    },
    {
      id: '2',
      name: 'Tech for Good Hackathon',
      description: 'Social impact technologies',
      date: 'July 20, 2025',
      location: 'San Francisco, CA',
      status: 'Active',
      participants: 56,
      teams: 15,
      submissions: 0,
      timeLeft: '49 days',
      isParticipating: true
    },
    {
      id: '3',
      name: 'AI Innovations Hackathon',
      description: 'AI frontiers exploration',
      date: 'August 10, 2025',
      location: 'Boston, MA',
      status: 'Upcoming',
      participants: 24,
      teams: 8,
      submissions: 0,
      timeLeft: '70 days',
      isParticipating: false
    }
  ];
  
  return hackathons.find(h => h.id === id);
};

const HackathonDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const hackathon = getHackathonById(id || '');

  useEffect(() => {
    if (hackathon) {
      document.title = `${hackathon.name} | HackathonOrganiser`;
    } else {
      document.title = 'Hackathon Not Found | HackathonOrganiser';
    }
  }, [hackathon]);

  if (!hackathon) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-4">Hackathon Not Found</h1>
          <p className="text-gray-500 mb-6">The hackathon you're looking for does not exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </MainLayout>
    );
  }

  const handleRegister = () => {
    toast({
      title: "Registration Successful",
      description: `You have registered for ${hackathon.name}`,
    });
  };
  
  const handleLeaveTeam = () => {
    toast({
      title: "Team Left",
      description: "You have left your team for this hackathon",
      variant: "destructive",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with hackathon info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{hackathon.name}</h1>
            <p className="text-gray-500 mt-1">{hackathon.description}</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                {hackathon.date}
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-1 h-4 w-4" />
                {hackathon.location}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4" />
                {hackathon.timeLeft} remaining
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                hackathon.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {hackathon.status}
              </span>
              
              {hackathon.isParticipating && (
                <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-800 px-2.5 py-0.5 text-xs font-medium ml-2">
                  Participating
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {!hackathon.isParticipating ? (
              <Button onClick={handleRegister}>Register Now</Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleLeaveTeam}>Leave Team</Button>
                <Button>Team Dashboard</Button>
              </>
            )}
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{hackathon.participants}</p>
              <p className="text-sm text-muted-foreground">
                {hackathon.teams} teams formed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{hackathon.submissions}</p>
              <p className="text-sm text-muted-foreground">
                {hackathon.submissions === 0 ? 'No submissions yet' : `${hackathon.submissions} projects submitted`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                Time Left
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{hackathon.timeLeft}</p>
              <p className="text-sm text-muted-foreground">
                Until submission deadline
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Details sections */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hackathon Details</CardTitle>
              <CardDescription>All the information you need about this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This hackathon focuses on {hackathon.description.toLowerCase()}. Participants will work in teams to develop innovative solutions addressing real-world challenges in this domain.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Rules</h3>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Teams must consist of 2-5 members</li>
                  <li>All code must be written during the hackathon period</li>
                  <li>Submissions must address the hackathon theme</li>
                  <li>Each team can only submit one project</li>
                  <li>Judges' decisions are final</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">Timeline</h3>
                <div className="mt-1 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Registration Opens</span>
                    <span className="font-medium">May 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kickoff Event</span>
                    <span className="font-medium">{hackathon.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submission Deadline</span>
                    <span className="font-medium">June 22, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voting Period</span>
                    <span className="font-medium">June 23-25, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Winners Announcement</span>
                    <span className="font-medium">June 26, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default HackathonDetails;
