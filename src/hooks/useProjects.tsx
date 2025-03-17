
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, ProjectData } from '@/types';
import { toast } from 'sonner';

const API_HOST = window._env_?.API_HOST || 'localhost';
const API_PORT = window._env_?.API_PORT || '8000';
const API_PATH = window._env_?.API_PATH || '/api/pipeline';
const API_VERSION = window._env_?.API_VERSION || '1.0';

// Construct the API URL using environment variables
const API_URL = `http://${API_HOST}:${API_PORT}${API_PATH}/projects`;

const fetchProjects = async (): Promise<ProjectData[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'api-version': API_VERSION
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching projects: ${response.status}`);
    }
    
    const data = await response.json() as ApiResponse;
    
    if (data.status === 'ERROR') {
      throw new Error(data.message);
    }
    
    return data.data as ProjectData[];
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    retry: 2,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: true,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load projects: ${error.message}`);
      }
    }
  });
}
