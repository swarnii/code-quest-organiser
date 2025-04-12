
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Users, ExternalLink, Github } from 'lucide-react';

const ProjectsList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Projects | HackathonOrganiser';
  }, []);

  // Mock data for projects
  const projects = [
    {
      id: '1',
      title: 'EcoTracker',
      description: 'A mobile application that tracks and reduces carbon footprint through daily habit suggestions and carbon offset initiatives.',
      team: 'Data Miners',
      teamId: '1',
      hackathon: 'Innovation Challenge 2025',
      hackathonId: '1',
      status: 'Approved',
      submissionDate: 'June 10, 2025',
      githubLink: 'https://github.com/example/ecotracker',
      demoLink: 'https://example.com/ecotracker-demo',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      feedback: 'Great project! The UI is intuitive and the carbon calculation algorithm is impressive.'
    },
    {
      id: '2',
      title: 'SmartCity',
      description: 'Pending submission. Create a project that uses technology to improve urban living.',
      team: 'Quantum Coders',
      teamId: '2',
      hackathon: 'Tech for Good Hackathon',
      hackathonId: '2',
      status: 'Needs Submission',
      submissionDate: '-',
      githubLink: '',
      demoLink: '',
      technologies: [],
      feedback: ''
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Projects</h1>
        </div>
        
        {projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Projects Yet</h2>
              <p className="text-gray-500 text-center mb-6">
                You haven't submitted any projects yet. Join a team and participate in a hackathon to get started.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/hackathons')}>
                  Browse Hackathons
                </Button>
                <Button onClick={() => navigate('/teams')}>
                  My Teams
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant={project.status === 'Approved' ? 'default' : 'outline'}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{project.hackathon}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Team: {project.team}</span>
                    </div>
                    {project.submissionDate !== '-' && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Submitted: {project.submissionDate}</span>
                      </div>
                    )}
                  </div>
                  
                  {project.status === 'Approved' && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Github className="h-4 w-4" />
                            GitHub Repository
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        
                        {project.demoLink && (
                          <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo Link
                          </a>
                        )}
                      </div>
                      
                      {project.feedback && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h3 className="text-sm font-medium mb-1">Organizer Feedback</h3>
                          <p className="text-sm">{project.feedback}</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/hackathons/${project.hackathonId}`)}
                  >
                    View Hackathon
                  </Button>
                  
                  {project.status === 'Needs Submission' ? (
                    <Button onClick={() => navigate(`/projects/${project.id}/submit`)}>
                      Submit Project
                    </Button>
                  ) : (
                    <Button onClick={() => navigate(`/projects/${project.id}`)}>
                      View Details
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectsList;
