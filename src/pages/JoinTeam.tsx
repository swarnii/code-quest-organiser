
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Users, ArrowRight } from 'lucide-react';

const JoinTeam = () => {
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock team data for demonstration
  const validTeams = [
    { code: 'ABC12', name: 'Data Miners', hackathon: 'Innovation Challenge 2025' },
    { code: 'XYZ45', name: 'Quantum Coders', hackathon: 'Tech for Good Hackathon' },
    { code: 'DEF67', name: 'Cloud Innovations', hackathon: 'AI Innovations Hackathon' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!joinCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a join code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const team = validTeams.find(t => t.code.toLowerCase() === joinCode.trim().toLowerCase());
      
      if (team) {
        toast({
          title: "Success!",
          description: `You've joined the team "${team.name}" for ${team.hackathon}.`,
        });
        navigate('/teams');
      } else {
        toast({
          title: "Invalid code",
          description: "The team code you entered doesn't exist. Please check and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Join a Team</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Join Code</CardTitle>
            <CardDescription>
              Enter the 5-character code provided by your team leader
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="join-code" className="text-sm font-medium">
                  Team Code
                </label>
                <Input
                  id="join-code"
                  placeholder="e.g. ABC12"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="uppercase"
                  maxLength={5}
                  disabled={isLoading}
                />
              </div>
              
              <div className="bg-blue-50 rounded-md p-4">
                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  How to join a team
                </h3>
                <p className="text-xs text-blue-600">
                  Ask your team leader for the 5-character join code. Each team has a unique code that allows you to join directly without an invitation.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/teams')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Joining..."
                ) : (
                  <>
                    Join Team <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Don't have a team yet?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Create a team</p>
                <p className="text-xs text-gray-500">
                  You can create your own team when registering for a hackathon.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/hackathons')}
            >
              Browse Hackathons
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default JoinTeam;
