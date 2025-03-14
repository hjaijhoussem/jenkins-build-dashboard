
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Header = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      await queryClient.refetchQueries({ 
        queryKey: ['builds'],
        exact: true
      });
      toast.success('Build data refreshed');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-2xl font-semibold tracking-tight">Jenkins Build Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor your builds and test results</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 h-9 transition-all"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw 
            size={14} 
            className={isRefreshing ? "animate-spin" : "transition-transform duration-500 ease-in-out"}
          />
          <span>Refresh</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
