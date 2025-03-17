
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, BuildData } from '@/types';
import { toast } from 'sonner';

const API_HOST = window._env_?.API_HOST || 'localhost';
const API_PORT = window._env_?.API_PORT || '8000';
const API_PATH = window._env_?.API_PATH || '/api/pipeline';
const API_VERSION = window._env_?.API_VERSION || '1.0';

// Construct the API URL using environment variables
const API_URL = `http://${API_HOST}:${API_PORT}${API_PATH}`;

const fetchBuilds = async (projectId?: string): Promise<BuildData[]> => {
  try {
    // Append project filtering if projectId is provided
    const url = projectId ? `${API_URL}?projectId=${projectId}` : API_URL;
    
    const response = await fetch(url, {
      headers: {
        'api-version': API_VERSION
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching builds: ${response.status}`);
    }
    
    const data = await response.json() as ApiResponse;
    
    if (data.status === 'ERROR') {
      throw new Error(data.message);
    }
    
    return data.data as BuildData[];
  } catch (error) {
    console.error('Error fetching build data:', error);
    throw error;
  }
};

export function useBuilds(projectId?: string) {
  return useQuery({
    queryKey: ['builds', projectId],
    queryFn: () => fetchBuilds(projectId),
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
