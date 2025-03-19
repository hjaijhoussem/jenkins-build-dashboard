
import { useQuery } from '@tanstack/react-query';
import { ProjectData } from '@/types';
import { toast } from 'sonner';

// Static project data
const staticProjects: ProjectData[] = [
  {
    id: "proj-001",
    name: "Frontend Dashboard",
    description: "Customer-facing dashboard application with React and TypeScript",
    pipelinesCount: 24,
    successJobsCount: 18,
    failedJobsCount: 6,
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-11-28T14:45:30Z"
  },
  {
    id: "proj-002",
    name: "Backend API",
    description: "RESTful API service with Node.js and Express",
    pipelinesCount: 31,
    successJobsCount: 27,
    failedJobsCount: 4,
    createdAt: "2023-08-05T08:15:00Z",
    updatedAt: "2023-11-29T11:20:15Z"
  },
  {
    id: "proj-003",
    name: "Mobile App",
    description: "Cross-platform mobile application with React Native",
    pipelinesCount: 18,
    successJobsCount: 15,
    failedJobsCount: 3,
    createdAt: "2023-10-12T09:45:00Z",
    updatedAt: "2023-11-27T16:30:45Z"
  },
  {
    id: "proj-004",
    name: "Data Processing Service",
    description: "ETL pipeline for data transformation and analysis",
    pipelinesCount: 12,
    successJobsCount: 9,
    failedJobsCount: 3,
    createdAt: "2023-07-22T11:00:00Z",
    updatedAt: "2023-11-26T12:15:30Z"
  },
  {
    id: "proj-005",
    name: "Authentication Service",
    description: "User authentication and authorization system",
    pipelinesCount: 8,
    successJobsCount: 7,
    failedJobsCount: 1,
    createdAt: "2023-11-01T14:20:00Z",
    updatedAt: "2023-11-28T09:10:15Z"
  }
];

const fetchProjects = async (): Promise<ProjectData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return staticProjects;
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
