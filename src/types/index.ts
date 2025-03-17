
export type BuildStatus = 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | 'ABORTED' | 'IN_PROGRESS' | 'NOT_BUILT' | string;

export interface BuildData {
  id: string;
  name: string;
  projectId: string; // Add projectId to associate builds with projects
  status: BuildStatus;
  coveragePercentage: number;
  testsTotal: number;
  testsSuccess: number;
  testsFailed: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  pipelinesCount: number;
  successJobsCount: number;
  failedJobsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data: BuildData[] | ProjectData[];
}
