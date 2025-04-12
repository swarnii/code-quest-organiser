
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, User, Calendar, ExternalLink } from 'lucide-react';

const TeamsList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Teams | HackathonOrganiser';
  }, []);

  // Mock data for teams
  const teams = [
    {
      id: '1',
      name: 'Data Miners',
      hackathon: 'Innovation Challenge 2025',
      hackathonId: '1',
      members: [
        { id: '1', name: 'You (Team Leader)', avatar: '👤' },
        { id: '2', name: 'Alex Johnson', avatar: '👤' },
        { id: '3', name: 'Taylor Smith', avatar: '👤' },
      ],
      joinCode: 'ABC12',
      projectStatus: 'Approved',
      submissionDate: 'June 10, 2025'
    },
    {
      id: '2',
      name: 'Quantum Coders',
      hackathon: 'Tech for Good Hackathon',
      hackathonId: '2',
      members: [
        { id: '4', name: 'Maria Garcia', avatar: '👤' },
        { id: '1', name: 'You', avatar: '👤' },
        { id: '5', name: 'James Wilson', avatar: '👤' },
        { id: '6', name: 'Emma Brown', avatar: '👤' }
      ],
      joinCode: 'XYZ45',
      projectStatus: 'Needs Submission',
      submissionDate: '-'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Teams</h1>
          <Button onClick={() => navigate('/join-team')}>
            Join a Team
          </Button>
        </div>
        
        {teams.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Teams Yet</h2>
              <p className="text-gray-500 text-center mb-6">
                You haven't joined any teams yet. Create a new team or join an existing one with a join code.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/hackathons')}>
                  Browse Hackathons
                </Button>
                <Button onClick={() => navigate('/join-team')}>
                  Join with Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams.map(team => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {team.hackathon}
                      </CardDescription>
                    </div>
                    <Badge variant={team.projectStatus === 'Approved' ? 'default' : 'outline'}>
                      {team.projectStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Team Members</h3>
                    <div className="flex flex-wrap gap-2">
                      {team.members.map(member => (
                        <div key={member.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                          <span className="mr-1">{member.avatar}</span>
                          <span className="text-sm">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Join Code:</p>
                      <p className="font-mono bg-gray-100 px-2 py-1 rounded">{team.joinCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Submission Date:</p>
                      <p>{team.submissionDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate(`/hackathons/${team.hackathonId}`)}>
                    View Hackathon
                  </Button>
                  <Button onClick={() => navigate(`/teams/${team.id}`)}>
                    Team Dashboard
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TeamsList;
