
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Home,
  Award,
  Users,
  Calendar,
  Layers,
  Settings,
  ChevronRight,
  LayoutDashboard,
  UserPlus,
  Vote,
  FileText,
  Hash,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  collapsed: boolean;
  active: boolean;
  children?: { label: string; path: string }[];
}

const SidebarItem = ({ icon: Icon, label, path, collapsed, active, children }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  
  // Check if any child is active
  const isChildActive = children?.some(
    (child) => location.pathname === child.path
  );

  // Determine if this item or any of its children is active
  const isItemActive = active || isChildActive;
  
  useEffect(() => {
    // Auto-expand if a child is active
    if (isChildActive) {
      setExpanded(true);
    }
  }, [isChildActive]);

  return (
    <div className="mb-1">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={children ? '#' : path}
              onClick={(e) => {
                if (children) {
                  e.preventDefault();
                  setExpanded(!expanded);
                }
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                isItemActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                collapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center">
                <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
                {!collapsed && <span>{label}</span>}
              </div>
              {!collapsed && children && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expanded ? "rotate-90" : ""
                  )}
                />
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" className="z-[60]">
              {label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      {/* Submenu */}
      {!collapsed && expanded && children && (
        <div className="ml-6 mt-1 space-y-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className={cn(
                "block px-3 py-1.5 rounded-md text-sm",
                location.pathname === child.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isOrganiser = user?.role === 'ORGANISER' || isAdmin;
  const isParticipant = user?.role === 'PARTICIPANT' || isAdmin;

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed ? (
          <Link to="/dashboard" className="text-xl font-bold text-hackathon-primary">
            HackathonOrganiser
          </Link>
        ) : (
          <Link to="/dashboard" className="text-xl font-bold text-hackathon-primary">
            HO
          </Link>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="space-y-1">
          {/* Common menu items */}
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            path="/dashboard"
            collapsed={collapsed}
            active={location.pathname === '/dashboard'}
          />
          
          {/* Admin menu items */}
          {isAdmin && (
            <>
              <SidebarItem
                icon={Layers}
                label="Hackathons"
                path="/admin/hackathons"
                collapsed={collapsed}
                active={location.pathname.startsWith('/admin/hackathons')}
                children={[
                  { label: 'All Hackathons', path: '/admin/hackathons' },
                  { label: 'Create New', path: '/admin/hackathons/new' },
                ]}
              />
              <SidebarItem
                icon={Users}
                label="Users"
                path="/admin/users"
                collapsed={collapsed}
                active={location.pathname.startsWith('/admin/users')}
              />
            </>
          )}
          
          {/* Organiser menu items */}
          {isOrganiser && (
            <>
              <SidebarItem
                icon={Calendar}
                label="My Hackathons"
                path="/organiser/hackathons"
                collapsed={collapsed}
                active={location.pathname === '/organiser/hackathons'}
              />
              <SidebarItem
                icon={FileText}
                label="Submissions"
                path="/organiser/submissions"
                collapsed={collapsed}
                active={location.pathname === '/organiser/submissions'}
              />
              <SidebarItem
                icon={Vote}
                label="Voting"
                path="/organiser/voting"
                collapsed={collapsed}
                active={location.pathname === '/organiser/voting'}
              />
            </>
          )}
          
          {/* Participant menu items */}
          {isParticipant && (
            <>
              <SidebarItem
                icon={Calendar}
                label="Hackathons"
                path="/hackathons"
                collapsed={collapsed}
                active={location.pathname === '/hackathons'}
              />
              <SidebarItem
                icon={Users}
                label="My Teams"
                path="/teams"
                collapsed={collapsed}
                active={location.pathname === '/teams'}
              />
              <SidebarItem
                icon={UserPlus}
                label="Join Team"
                path="/join-team"
                collapsed={collapsed}
                active={location.pathname === '/join-team'}
              />
              <SidebarItem
                icon={FileText}
                label="My Projects"
                path="/projects"
                collapsed={collapsed}
                active={location.pathname === '/projects'}
              />
              <SidebarItem
                icon={Vote}
                label="Voting"
                path="/voting"
                collapsed={collapsed}
                active={location.pathname === '/voting'}
              />
            </>
          )}
          
          {/* Common menu items at bottom */}
          <SidebarItem
            icon={Award}
            label="Leaderboard"
            path="/leaderboard"
            collapsed={collapsed}
            active={location.pathname === '/leaderboard'}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            path="/settings"
            collapsed={collapsed}
            active={location.pathname === '/settings'}
          />
        </div>
      </nav>
      
      {/* Version info */}
      {!collapsed && (
        <div className="p-4 text-xs text-gray-500 border-t border-sidebar-border">
          <p>HackathonOrganiser v1.0</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
