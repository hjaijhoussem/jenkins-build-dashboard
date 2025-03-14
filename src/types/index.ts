
export type BuildStatus = 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | 'ABORTED' | 'IN_PROGRESS' | 'NOT_BUILT' | string;

export interface BuildData {
  id: string;
  name: string;
  status: BuildStatus;
  coveragePercentage: number;
  testsTotal: number;
  testsSuccess: number;
  testsFailed: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data: BuildData[];
}
