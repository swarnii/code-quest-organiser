
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Trophy, Medal, Clock, RefreshCw, ThumbsUp } from 'lucide-react';
import { LeaderboardEntry } from '@/types';
import { socketService, leaderboardApi } from '@/services/api';

interface LeaderboardDisplayProps {
  hackathonId: string;
  hackathonName: string;
}

const LeaderboardDisplay = ({ hackathonId, hackathonName }: LeaderboardDisplayProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRealtime, setIsRealtime] = useState(true);
  const { toast } = useToast();

  // Function to fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const data = await leaderboardApi.getByHackathon(hackathonId);
      setLeaderboard(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch leaderboard data.",
      });
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Connect to real-time updates
  useEffect(() => {
    fetchLeaderboard();
    
    // Setup real-time updates
    let unsubscribe: (() => void) | null = null;
    
    if (isRealtime) {
      // Connect to socket
      socketService.connect();
      
      // Subscribe to leaderboard updates
      unsubscribe = socketService.subscribeToLeaderboard(
        hackathonId, 
        (data) => setLeaderboard(data)
      );
      
      toast({
        title: "Real-time updates enabled",
        description: "Leaderboard will automatically refresh as votes come in.",
      });
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      socketService.disconnect();
    };
  }, [hackathonId, isRealtime]);

  // Get medal icon based on rank
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-gray-500 font-semibold">{rank}</span>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">{hackathonName} Leaderboard</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRealtime(!isRealtime)}
            className={isRealtime ? "bg-green-100 hover:bg-green-200" : ""}
          >
            {isRealtime ? (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Real-time
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Manual
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLeaderboard}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading && leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Loading leaderboard data...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground">
              No projects have received votes yet.
              <br />
              Check back soon!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-2 w-16">Rank</th>
                  <th className="text-left py-3 px-2">Project</th>
                  <th className="text-left py-3 px-2">Team</th>
                  <th className="text-right py-3 pl-2 w-20">Votes</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr 
                    key={entry.projectId} 
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full">
                        {getMedalIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium">{entry.projectTitle}</td>
                    <td className="py-3 px-2 text-gray-600">{entry.teamName}</td>
                    <td className="py-3 pl-2 text-right">
                      <div className="flex items-center justify-end">
                        <ThumbsUp className="h-4 w-4 mr-1 text-hackathon-primary" />
                        <span>{entry.voteCount}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {isRealtime && leaderboard.length > 0 && (
          <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1 animate-pulse-slow" />
            <span>Real-time updates enabled</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardDisplay;
