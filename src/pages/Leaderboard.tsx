
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LeaderboardDisplay from '@/components/leaderboard/LeaderboardDisplay';
import { hackathonApi } from '@/services/api';
import { Hackathon } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Trophy, Loader2 } from 'lucide-react';

const Leaderboard = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Leaderboard | HackathonOrganiser';
    
    const fetchHackathons = async () => {
      try {
        setIsLoading(true);
        const data = await hackathonApi.getAll();
        // Filter to active hackathons
        const activeHackathons = data.filter(h => h.isActive);
        setHackathons(activeHackathons);
        
        // Auto-select first hackathon if available
        if (activeHackathons.length > 0) {
          setSelectedHackathon(activeHackathons[0].id);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch hackathons.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHackathons();
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-hackathon-primary" />
          Leaderboard
        </h1>
        <p className="text-gray-500 mt-1">
          Live voting results for active hackathons
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-12 w-12 animate-spin text-hackathon-primary" />
        </div>
      ) : hackathons.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Trophy className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Active Hackathons</h2>
          <p className="text-gray-500 mb-4">
            There are currently no active hackathons with voting enabled.
          </p>
          <Button onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-medium mb-1">Select Hackathon</h2>
                <p className="text-sm text-gray-500">
                  Choose a hackathon to view its leaderboard
                </p>
              </div>
              
              <div className="w-full sm:w-auto">
                <Select
                  value={selectedHackathon || ""}
                  onValueChange={(value) => setSelectedHackathon(value)}
                >
                  <SelectTrigger className="min-w-[240px]">
                    <SelectValue placeholder="Select a hackathon" />
                  </SelectTrigger>
                  <SelectContent>
                    {hackathons.map((hackathon) => (
                      <SelectItem key={hackathon.id} value={hackathon.id}>
                        {hackathon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {selectedHackathon && (
            <LeaderboardDisplay
              hackathonId={selectedHackathon}
              hackathonName={
                hackathons.find(h => h.id === selectedHackathon)?.name || 
                "Selected Hackathon"
              }
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Leaderboard;
