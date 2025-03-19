
import { useQuery } from '@tanstack/react-query';
import { TestResults } from '@/types';
import { toast } from 'sonner';

const API_HOST = window._env_?.API_HOST || 'localhost';
const API_PORT = window._env_?.API_PORT || '8000';
const API_PATH = window._env_?.API_PATH || '/api/pipeline';
const API_VERSION = window._env_?.API_VERSION || '1.0';

// Construct the API URL using environment variables
const API_URL = `http://${API_HOST}:${API_PORT}${API_PATH}`;

const fetchTestResults = async (buildId: string): Promise<TestResults> => {
  try {
    const response = await fetch(`${API_URL}/${buildId}/tests`, {
      headers: {
        'api-version': API_VERSION
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching test results: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching test results:', error);
    throw error;
  }
};

export function useTestResults(buildId: string | undefined) {
  return useQuery({
    queryKey: ['testResults', buildId],
    queryFn: () => buildId ? fetchTestResults(buildId) : Promise.reject('No build ID provided'),
    enabled: !!buildId, // Only run the query if buildId is provided
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error(`Failed to load test results: ${error.message}`);
      }
    }
  });
}
