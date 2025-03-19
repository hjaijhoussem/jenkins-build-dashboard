
import { useQuery } from '@tanstack/react-query';
import { BuildData } from '@/types';
import { toast } from 'sonner';

// Static builds data
const staticBuilds: BuildData[] = [
  {
    id: "build-001",
    name: "Build #125",
    projectId: "proj-001",
    status: "SUCCESS",
    coveragePercentage: 87,
    testsTotal: 142,
    testsSuccess: 139,
    testsFailed: 3,
    createdAt: "2023-11-28T09:30:00Z",
    updatedAt: "2023-11-28T09:45:30Z"
  },
  {
    id: "build-002",
    name: "Build #124",
    projectId: "proj-001",
    status: "FAILURE",
    coveragePercentage: 78,
    testsTotal: 142,
    testsSuccess: 128,
    testsFailed: 14,
    createdAt: "2023-11-27T14:20:00Z",
    updatedAt: "2023-11-27T14:35:15Z"
  },
  {
    id: "build-003",
    name: "Build #123",
    projectId: "proj-001",
    status: "SUCCESS",
    coveragePercentage: 92,
    testsTotal: 140,
    testsSuccess: 140,
    testsFailed: 0,
    createdAt: "2023-11-26T11:15:00Z",
    updatedAt: "2023-11-26T11:30:45Z"
  },
  {
    id: "build-004",
    name: "Build #56",
    projectId: "proj-002",
    status: "SUCCESS",
    coveragePercentage: 85,
    testsTotal: 98,
    testsSuccess: 94,
    testsFailed: 4,
    createdAt: "2023-11-29T08:10:00Z",
    updatedAt: "2023-11-29T08:25:30Z"
  },
  {
    id: "build-005",
    name: "Build #55",
    projectId: "proj-002",
    status: "UNSTABLE",
    coveragePercentage: 75,
    testsTotal: 98,
    testsSuccess: 92,
    testsFailed: 6,
    createdAt: "2023-11-28T15:45:00Z",
    updatedAt: "2023-11-28T16:00:15Z"
  },
  {
    id: "build-006",
    name: "Build #34",
    projectId: "proj-003",
    status: "SUCCESS",
    coveragePercentage: 90,
    testsTotal: 76,
    testsSuccess: 76,
    testsFailed: 0,
    createdAt: "2023-11-27T10:30:00Z",
    updatedAt: "2023-11-27T10:45:30Z"
  },
  {
    id: "build-007",
    name: "Build #33",
    projectId: "proj-003",
    status: "FAILURE",
    coveragePercentage: 65,
    testsTotal: 76,
    testsSuccess: 65,
    testsFailed: 11,
    createdAt: "2023-11-26T13:20:00Z",
    updatedAt: "2023-11-26T13:35:15Z"
  },
  {
    id: "build-008",
    name: "Build #21",
    projectId: "proj-004",
    status: "IN_PROGRESS",
    coveragePercentage: 0,
    testsTotal: 0,
    testsSuccess: 0,
    testsFailed: 0,
    createdAt: "2023-11-29T11:00:00Z",
    updatedAt: "2023-11-29T11:00:00Z"
  },
  {
    id: "build-009",
    name: "Build #20",
    projectId: "proj-004",
    status: "SUCCESS",
    coveragePercentage: 82,
    testsTotal: 54,
    testsSuccess: 52,
    testsFailed: 2,
    createdAt: "2023-11-28T12:15:00Z",
    updatedAt: "2023-11-28T12:30:45Z"
  },
  {
    id: "build-010",
    name: "Build #15",
    projectId: "proj-005",
    status: "SUCCESS",
    coveragePercentage: 95,
    testsTotal: 32,
    testsSuccess: 32,
    testsFailed: 0,
    createdAt: "2023-11-29T09:45:00Z",
    updatedAt: "2023-11-29T10:00:30Z"
  }
];

const fetchBuilds = async (projectId?: string): Promise<BuildData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return all builds or filter by projectId
  if (!projectId) {
    return staticBuilds;
  }
  
  // Check if project exists
  const projectExists = projectId === "proj-001" || 
                        projectId === "proj-002" || 
                        projectId === "proj-003" || 
                        projectId === "proj-004" || 
                        projectId === "proj-005";
  
  // Simulate "Project not found" error for non-existent project IDs
  if (!projectExists) {
    throw new Error(`Project ${projectId} not found`);
  }
  
  return staticBuilds.filter(build => build.projectId === projectId);
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
