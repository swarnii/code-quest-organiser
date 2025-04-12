
import { Hackathon, Team, Project, Vote, LeaderboardEntry, User } from '@/types';

// Mock data for development
const mockHackathons: Hackathon[] = [
  {
    id: '1',
    name: 'Innovation Challenge 2025',
    description: 'Build solutions for sustainable development',
    date: '2025-06-15',
    location: 'Virtual Event',
    organiserId: '2',
    organiserName: 'Organiser User',
    isActive: true
  },
  {
    id: '2',
    name: 'Tech for Good Hackathon',
    description: 'Creating technology solutions for social impact',
    date: '2025-07-20',
    location: 'San Francisco, CA',
    organiserId: '2',
    organiserName: 'Organiser User',
    isActive: true
  },
  {
    id: '3',
    name: 'AI Innovations Hackathon',
    description: 'Exploring the frontiers of artificial intelligence',
    date: '2025-08-10',
    location: 'Boston, MA',
    organiserId: '5',
    organiserName: 'Other Organiser',
    isActive: false
  },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Code Wizards',
    hackathonId: '1',
    leaderId: '3',
    joinCode: 'CW123',
    hackathonName: 'Innovation Challenge 2025',
    projectSubmitted: true
  },
  {
    id: '2',
    name: 'Data Miners',
    hackathonId: '1',
    leaderId: '4',
    joinCode: 'DM456',
    hackathonName: 'Innovation Challenge 2025',
    projectSubmitted: false
  },
  {
    id: '3',
    name: 'Quantum Coders',
    hackathonId: '2',
    leaderId: '3',
    joinCode: 'QC789',
    hackathonName: 'Tech for Good Hackathon',
    projectSubmitted: true
  },
];

const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' },
  { id: '2', name: 'Organiser User', email: 'organiser@example.com', role: 'ORGANISER' },
  { id: '3', name: 'Participant User', email: 'participant@example.com', role: 'PARTICIPANT' },
  { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'PARTICIPANT' },
  { id: '5', name: 'Other Organiser', email: 'organiser2@example.com', role: 'ORGANISER' },
  { id: '6', name: 'Alice Johnson', email: 'alice@example.com', role: 'PARTICIPANT' },
  { id: '7', name: 'Bob Williams', email: 'bob@example.com', role: 'PARTICIPANT' },
];

const mockProjects: Project[] = [
  {
    id: '1',
    teamId: '1',
    title: 'EcoTracker',
    description: 'An app that helps track and reduce carbon footprint',
    repoLink: 'https://github.com/codewizards/ecotracker',
    demoLink: 'https://ecotracker-demo.vercel.app',
    approved: true,
    teamName: 'Code Wizards',
    voteCount: 15
  },
  {
    id: '2',
    teamId: '3',
    title: 'MedAssist',
    description: 'AI-powered medical assistance platform',
    repoLink: 'https://github.com/quantumcoders/medassist',
    demoLink: 'https://medassist-demo.vercel.app',
    approved: true,
    teamName: 'Quantum Coders',
    voteCount: 12
  },
  {
    id: '3',
    teamId: '2',
    title: 'SmartCity',
    description: 'IoT solution for urban management',
    repoLink: 'https://github.com/dataminers/smartcity',
    demoLink: 'https://smartcity-demo.vercel.app',
    approved: false,
    teamName: 'Data Miners',
    voteCount: 0
  },
];

const mockVotes: Vote[] = [
  { id: '1', voterId: '3', projectId: '2' },
  { id: '2', voterId: '4', projectId: '1' },
  { id: '3', voterId: '6', projectId: '1' },
  { id: '4', voterId: '7', projectId: '2' },
];

const mockTeamMembers: { id: string; userId: string; teamId: string }[] = [
  { id: '1', userId: '3', teamId: '1' }, // Participant is leader of Code Wizards
  { id: '2', userId: '4', teamId: '2' }, // Jane is leader of Data Miners
  { id: '3', userId: '6', teamId: '1' }, // Alice is member of Code Wizards
  { id: '4', userId: '7', teamId: '2' }, // Bob is member of Data Miners
  { id: '5', userId: '3', teamId: '3' }, // Participant is also leader of Quantum Coders
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service for Hackathons
export const hackathonApi = {
  getAll: async (): Promise<Hackathon[]> => {
    await delay(500);
    return [...mockHackathons];
  },
  
  getById: async (id: string): Promise<Hackathon> => {
    await delay(300);
    const hackathon = mockHackathons.find(h => h.id === id);
    if (!hackathon) throw new Error('Hackathon not found');
    return { ...hackathon };
  },
  
  getByOrganiser: async (organiserId: string): Promise<Hackathon[]> => {
    await delay(500);
    return mockHackathons.filter(h => h.organiserId === organiserId);
  },
  
  create: async (hackathon: Omit<Hackathon, 'id'>): Promise<Hackathon> => {
    await delay(700);
    const newHackathon = {
      ...hackathon,
      id: `${mockHackathons.length + 1}`
    };
    mockHackathons.push(newHackathon);
    return newHackathon;
  },
  
  update: async (id: string, hackathon: Partial<Hackathon>): Promise<Hackathon> => {
    await delay(500);
    const index = mockHackathons.findIndex(h => h.id === id);
    if (index === -1) throw new Error('Hackathon not found');
    
    mockHackathons[index] = { ...mockHackathons[index], ...hackathon };
    return mockHackathons[index];
  },
  
  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockHackathons.findIndex(h => h.id === id);
    if (index === -1) throw new Error('Hackathon not found');
    
    mockHackathons.splice(index, 1);
  }
};

// API service for Teams
export const teamApi = {
  getAll: async (): Promise<Team[]> => {
    await delay(500);
    return [...mockTeams];
  },
  
  getById: async (id: string): Promise<Team> => {
    await delay(300);
    const team = mockTeams.find(t => t.id === id);
    if (!team) throw new Error('Team not found');
    
    // Get team members
    const members = mockTeamMembers
      .filter(tm => tm.teamId === id)
      .map(tm => {
        const user = mockUsers.find(u => u.id === tm.userId);
        return user ? { ...user } : null;
      })
      .filter(Boolean) as User[];
      
    return { ...team, members };
  },
  
  getByHackathon: async (hackathonId: string): Promise<Team[]> => {
    await delay(500);
    return mockTeams.filter(t => t.hackathonId === hackathonId);
  },
  
  getByUser: async (userId: string): Promise<Team[]> => {
    await delay(500);
    const teamIds = mockTeamMembers
      .filter(tm => tm.userId === userId)
      .map(tm => tm.teamId);
    
    return mockTeams.filter(t => teamIds.includes(t.id));
  },
  
  create: async (team: Omit<Team, 'id'>): Promise<Team> => {
    await delay(700);
    const newTeam = {
      ...team,
      id: `${mockTeams.length + 1}`
    };
    mockTeams.push(newTeam);
    
    // Add team leader as team member
    mockTeamMembers.push({
      id: `${mockTeamMembers.length + 1}`,
      userId: team.leaderId,
      teamId: newTeam.id
    });
    
    return newTeam;
  },
  
  joinTeam: async (userId: string, joinCode: string): Promise<Team> => {
    await delay(500);
    const team = mockTeams.find(t => t.joinCode === joinCode);
    if (!team) throw new Error('Team not found with that join code');
    
    // Check if user is already in team
    const existingMember = mockTeamMembers.find(
      tm => tm.teamId === team.id && tm.userId === userId
    );
    
    if (existingMember) {
      throw new Error('You are already a member of this team');
    }
    
    // Add user to team members
    mockTeamMembers.push({
      id: `${mockTeamMembers.length + 1}`,
      userId,
      teamId: team.id
    });
    
    return team;
  },
  
  update: async (id: string, team: Partial<Team>): Promise<Team> => {
    await delay(500);
    const index = mockTeams.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Team not found');
    
    mockTeams[index] = { ...mockTeams[index], ...team };
    return mockTeams[index];
  }
};

// API service for Projects
export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    await delay(500);
    return [...mockProjects];
  },
  
  getById: async (id: string): Promise<Project> => {
    await delay(300);
    const project = mockProjects.find(p => p.id === id);
    if (!project) throw new Error('Project not found');
    return { ...project };
  },
  
  getByTeam: async (teamId: string): Promise<Project | null> => {
    await delay(300);
    const project = mockProjects.find(p => p.teamId === teamId);
    return project ? { ...project } : null;
  },
  
  getByHackathon: async (hackathonId: string): Promise<Project[]> => {
    await delay(500);
    // Find teams in hackathon
    const teamIds = mockTeams
      .filter(t => t.hackathonId === hackathonId)
      .map(t => t.id);
    
    // Find projects from those teams
    return mockProjects.filter(p => teamIds.includes(p.teamId));
  },
  
  create: async (project: Omit<Project, 'id' | 'approved' | 'voteCount'>): Promise<Project> => {
    await delay(700);
    const newProject = {
      ...project,
      id: `${mockProjects.length + 1}`,
      approved: false,
      voteCount: 0
    };
    mockProjects.push(newProject);
    
    // Mark team as having submitted a project
    const teamIndex = mockTeams.findIndex(t => t.id === project.teamId);
    if (teamIndex !== -1) {
      mockTeams[teamIndex].projectSubmitted = true;
    }
    
    return newProject;
  },
  
  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    await delay(500);
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = { ...mockProjects[index], ...project };
    return mockProjects[index];
  },
  
  approve: async (id: string, approved: boolean): Promise<Project> => {
    await delay(500);
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index].approved = approved;
    return { ...mockProjects[index] };
  }
};

// API service for Votes
export const voteApi = {
  getByProject: async (projectId: string): Promise<Vote[]> => {
    await delay(300);
    return mockVotes.filter(v => v.projectId === projectId);
  },
  
  getByUser: async (userId: string): Promise<Vote[]> => {
    await delay(300);
    return mockVotes.filter(v => v.voterId === userId);
  },
  
  vote: async (userId: string, projectId: string): Promise<Vote> => {
    await delay(500);
    // Check if user already voted for this project
    const existingVote = mockVotes.find(
      v => v.voterId === userId && v.projectId === projectId
    );
    
    if (existingVote) {
      throw new Error('You have already voted for this project');
    }
    
    const newVote = {
      id: `${mockVotes.length + 1}`,
      voterId: userId,
      projectId
    };
    mockVotes.push(newVote);
    
    // Update project vote count
    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      mockProjects[projectIndex].voteCount = (mockProjects[projectIndex].voteCount || 0) + 1;
    }
    
    return newVote;
  },
  
  removeVote: async (userId: string, projectId: string): Promise<void> => {
    await delay(500);
    const index = mockVotes.findIndex(
      v => v.voterId === userId && v.projectId === projectId
    );
    
    if (index !== -1) {
      mockVotes.splice(index, 1);
      
      // Update project vote count
      const projectIndex = mockProjects.findIndex(p => p.id === projectId);
      if (projectIndex !== -1 && mockProjects[projectIndex].voteCount) {
        mockProjects[projectIndex].voteCount = mockProjects[projectIndex].voteCount! - 1;
      }
    }
  }
};

// API service for Users
export const userApi = {
  getAll: async (): Promise<User[]> => {
    await delay(500);
    return [...mockUsers];
  },
  
  getById: async (id: string): Promise<User> => {
    await delay(300);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { ...user };
  },
  
  getByRole: async (role: string): Promise<User[]> => {
    await delay(500);
    return mockUsers.filter(u => u.role === role);
  },
  
  create: async (user: Omit<User, 'id'>): Promise<User> => {
    await delay(700);
    const newUser = {
      ...user,
      id: `${mockUsers.length + 1}`
    };
    mockUsers.push(newUser);
    return newUser;
  },
  
  update: async (id: string, user: Partial<User>): Promise<User> => {
    await delay(500);
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers[index] = { ...mockUsers[index], ...user };
    return mockUsers[index];
  }
};

// API service for Leaderboard (real-time updates would be via Socket.IO in a real app)
export const leaderboardApi = {
  getByHackathon: async (hackathonId: string): Promise<LeaderboardEntry[]> => {
    await delay(700);
    
    // Get teams in this hackathon
    const hackathonTeams = mockTeams.filter(t => t.hackathonId === hackathonId);
    const teamIds = hackathonTeams.map(t => t.id);
    
    // Get approved projects from these teams
    const approvedProjects = mockProjects.filter(
      p => teamIds.includes(p.teamId) && p.approved
    );
    
    // Create leaderboard entries
    const leaderboard = approvedProjects.map(project => {
      const team = mockTeams.find(t => t.id === project.teamId);
      return {
        projectId: project.id,
        teamName: team?.name || 'Unknown Team',
        projectTitle: project.title,
        voteCount: project.voteCount || 0,
        rank: 0 // Will be calculated below
      };
    });
    
    // Sort by vote count and assign ranks
    leaderboard.sort((a, b) => b.voteCount - a.voteCount);
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    return leaderboard;
  }
};

// Socket.IO service for real-time updates
export const socketService = {
  // These methods would actually connect to a Socket.IO server in a real application
  connect: () => {
    console.log('Socket connection established');
  },
  
  disconnect: () => {
    console.log('Socket disconnected');
  },
  
  subscribeToLeaderboard: (hackathonId: string, callback: (data: LeaderboardEntry[]) => void) => {
    console.log(`Subscribed to leaderboard updates for hackathon ${hackathonId}`);
    
    // Simulate real-time updates every 10 seconds
    const interval = setInterval(async () => {
      try {
        const leaderboard = await leaderboardApi.getByHackathon(hackathonId);
        callback(leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    }, 10000);
    
    // Return unsubscribe function
    return () => {
      clearInterval(interval);
      console.log(`Unsubscribed from leaderboard updates for hackathon ${hackathonId}`);
    };
  }
};
