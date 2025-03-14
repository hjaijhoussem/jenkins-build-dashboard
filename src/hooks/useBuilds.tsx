
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types';
import { toast } from 'sonner';

const API_URL = 'http://localhost:8000/api/pipeline';

const fetchBuilds = async (): Promise<ApiResponse['data']> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error fetching builds: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.status === 'ERROR') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching build data:', error);
    throw error;
  }
};

export function useBuilds() {
  return useQuery({
    queryKey: ['builds'],
    queryFn: fetchBuilds,
    retry: 2,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: true,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load builds: ${error.message}`);
      }
    }
  });
}
