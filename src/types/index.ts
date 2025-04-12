
export type UserRole = "ADMIN" | "ORGANISER" | "PARTICIPANT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Hackathon {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  organiserId: string;
  organiserName?: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  leaderId: string;
  joinCode: string;
  members?: User[];
  hackathonName?: string;
  projectSubmitted?: boolean;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  userName?: string;
}

export interface Project {
  id: string;
  teamId: string;
  title: string;
  description: string;
  repoLink: string;
  demoLink: string;
  approved: boolean;
  teamName?: string;
  voteCount?: number;
}

export interface Vote {
  id: string;
  voterId: string;
  projectId: string;
}

export interface LeaderboardEntry {
  rank: number;
  projectId: string;
  teamName: string;
  projectTitle: string;
  voteCount: number;
}
