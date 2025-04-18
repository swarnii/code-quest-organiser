
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import HackathonDetails from "./pages/HackathonDetails";
import TeamsList from "./pages/TeamsList";
import JoinTeam from "./pages/JoinTeam";
import ProjectsList from "./pages/ProjectsList";
import VotingPage from "./pages/VotingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            
            {/* Admin routes - these would normally be protected by role in MainLayout */}
            <Route path="/admin/hackathons" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
            
            {/* Organiser routes */}
            <Route path="/organiser/hackathons" element={<Dashboard />} />
            <Route path="/organiser/submissions" element={<Dashboard />} />
            <Route path="/organiser/voting" element={<Dashboard />} />
            
            {/* Participant routes */}
            <Route path="/hackathons" element={<Dashboard />} />
            <Route path="/hackathons/:id" element={<HackathonDetails />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/join-team" element={<JoinTeam />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/voting" element={<VotingPage />} />
            
            {/* Settings & Profile */}
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
