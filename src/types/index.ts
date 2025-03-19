
export type BuildStatus = 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | 'ABORTED' | 'IN_PROGRESS' | 'NOT_BUILT' | string;

export interface BuildData {
  id: string;
  name: string;
  projectId: string;
  status: BuildStatus;
  coveragePercentage: number;
  testsTotal: number;
  testsSuccess: number;
  testsFailed: number;
  createdAt: string;
  updatedAt: string;
  testResults?: TestResults;
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

// Test Results Types
export interface TestResults {
  summary: TestSummary;
  testsuites: TestSuite[];
  coverage: CoverageData;
}

export interface TestSummary {
  tests: number;
  failures: number;
  errors: number;
  time: number;
}

export interface TestSuite {
  name: string;
  tests: number;
  failures: number;
  errors: number;
  time: number;
  testcases: TestCase[];
}

export interface TestCase {
  name: string;
  classname: string;
  time: number;
  failure?: TestFailure;
}

export interface TestFailure {
  message: string;
  details?: string;
}

export interface CoverageData {
  timestamp: string;
  name: string;
  metrics: CoverageMetrics;
  packages: CoveragePackage[];
}

export interface CoverageMetrics {
  statements: number;
  coveredstatements: number;
  conditionals: number;
  coveredconditionals: number;
  methods: number;
  coveredmethods: number;
  elements: number;
  coveredelements: number;
  complexity: number;
  loc: number;
  ncloc: number;
  packages: number;
  files: number;
  classes: number;
  lineRate: number;
  branchRate: number;
  functionRate: number;
}

export interface CoveragePackage {
  name: string;
  metrics: PackageMetrics;
  files: CoverageFile[];
}

export interface PackageMetrics {
  statements: number;
  coveredstatements: number;
  conditionals: number;
  coveredconditionals: number;
  methods: number;
  coveredmethods: number;
}

export interface CoverageFile {
  name: string;
  path: string;
  metrics: FileMetrics;
  lines?: CoverageLine[];
}

export interface FileMetrics {
  statements: number;
  coveredstatements: number;
  conditionals: number;
  coveredconditionals: number;
  methods: number;
  coveredmethods: number;
}

export interface CoverageLine {
  num: number;
  count: number;
  type?: string;
}
