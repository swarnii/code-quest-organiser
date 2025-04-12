
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Award, Calendar, Star, ExternalLink, ThumbsUp } from 'lucide-react';

const VotingPage = () => {
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Voting | HackathonOrganiser';
  }, []);

  const handleVote = (projectId: string, rating: number) => {
    // In a real app, this would make an API call
    toast({
      title: "Vote Submitted",
      description: `You rated the project ${rating} out of 5 stars.`
    });
    
    setHasVoted(prev => ({
      ...prev,
      [projectId]: true
    }));
  };
  
  // Mock active voting hackathon
  const activeHackathon = {
    id: '1',
    name: 'Innovation Challenge 2025',
    votingEnds: 'June 25, 2025',
    votingTimeLeft: '2 days'
  };
  
  // Mock projects available for voting
  const projects = [
    {
      id: '101',
      title: 'EcoTracker',
      team: 'Data Miners',
      description: 'A mobile application that tracks and reduces carbon footprint through daily habit suggestions and carbon offset initiatives.',
      demoLink: 'https://example.com/ecotracker-demo',
      technologies: ['React Native', 'Node.js', 'MongoDB']
    },
    {
      id: '102',
      title: 'Waste Not',
      team: 'Green Solutions',
      description: 'An AI-powered app that helps households reduce food waste by tracking expiration dates and suggesting recipes based on available ingredients.',
      demoLink: 'https://example.com/wastenot-demo',
      technologies: ['Flutter', 'Python', 'TensorFlow']
    },
    {
      id: '103',
      title: 'Community Solar',
      team: 'SunPower',
      description: 'A platform that enables neighborhoods to crowdfund and manage community solar installations with transparent energy production and consumption tracking.',
      demoLink: 'https://example.com/communitysolar-demo',
      technologies: ['React', 'Web3.js', 'Node.js']
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Voting</h1>
            <p className="text-gray-500">Cast your votes for hackathon projects</p>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <div>
                <CardTitle>Active Voting: {activeHackathon.name}</CardTitle>
                <CardDescription className="mt-1">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Voting ends on {activeHackathon.votingEnds} ({activeHackathon.votingTimeLeft} left)</span>
                  </div>
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm mb-3">
              Rate projects on a scale of 1-5 stars. You can vote once for each project. Your own projects are not shown in this list.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
              <div className="flex gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Voting Guidelines</h3>
                  <p className="text-xs text-amber-700 mt-1">
                    Please vote based on innovation, execution, impact, and presentation. 
                    Consider each project fairly and independently.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {projects.map(project => (
            <Card key={project.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Team: {project.team}
                    </CardDescription>
                  </div>
                  
                  {hasVoted[project.id] && (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Voted
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{project.description}</p>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Demo
                  </a>
                  
                  {!hasVoted[project.id] ? (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <Button
                          key={rating}
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVote(project.id, rating)}
                          className="h-9 w-9"
                        >
                          <Star 
                            className="h-5 w-5" 
                            fill="none"
                          />
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">
                      Thank you for voting!
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default VotingPage;
