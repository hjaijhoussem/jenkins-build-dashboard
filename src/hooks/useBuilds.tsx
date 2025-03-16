import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types';
import { toast } from 'sonner';

// Read API configuration from environment variables
// const API_HOST = import.meta.env.VITE_API_HOST || 'localhost';
// const API_PORT = import.meta.env.VITE_API_PORT || '8000';
// const API_PATH = import.meta.env.VITE_API_PATH || '/api/pipeline';
// const API_VERSION = import.meta.env.VITE_API_VERSION || '1.0';

const API_HOST = window._env_?.API_HOST || 'localhost';
const API_PORT = window._env_?.API_PORT || '8000';
const API_PATH = window._env_?.API_PATH || '/api/pipeline';
const API_VERSION = window._env_?.API_VERSION || '1.0';

// Construct the API URL using environment variables
const API_URL = `http://${API_HOST}:${API_PORT}${API_PATH}`;

const fetchBuilds = async (): Promise<ApiResponse['data']> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'api-version': API_VERSION
      }
    });
    
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
