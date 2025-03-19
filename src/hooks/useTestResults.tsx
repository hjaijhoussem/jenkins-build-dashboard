
import { useQuery } from '@tanstack/react-query';
import { TestResults } from '@/types';
import { toast } from 'sonner';

// Static test results data
const staticTestResults: Record<string, TestResults> = {
  "build-001": {
    summary: {
      tests: 142,
      failures: 3,
      errors: 0,
      time: 8.452
    },
    testsuites: [
      {
        name: "Button Component",
        tests: 5,
        failures: 1,
        errors: 0,
        time: 2.345,
        testcases: [
          { name: "renders correctly", classname: "Button.Component", time: 0.123 },
          { name: "handles click events", classname: "Button.Component", time: 0.234 },
          { 
            name: "displays loading state", 
            classname: "Button.Component", 
            time: 0.345,
            failure: {
              message: "Expected loading spinner to be visible",
              details: "Expected element to be in document, but it was not found.\nat Object.<anonymous> (/src/components/Button/Button.test.js:45:10)"
            }
          },
          { name: "applies custom styles", classname: "Button.Component", time: 0.456 },
          { name: "supports different sizes", classname: "Button.Component", time: 0.567 }
        ]
      },
      {
        name: "Form Component",
        tests: 6,
        failures: 0,
        errors: 0,
        time: 1.789,
        testcases: [
          { name: "renders form fields", classname: "Form.Component", time: 0.234 },
          { name: "validates required fields", classname: "Form.Component", time: 0.345 },
          { name: "submits data correctly", classname: "Form.Component", time: 0.456 },
          { name: "shows error messages", classname: "Form.Component", time: 0.321 },
          { name: "clears form on reset", classname: "Form.Component", time: 0.222 },
          { name: "handles disabled state", classname: "Form.Component", time: 0.211 }
        ]
      },
      {
        name: "API Service",
        tests: 4,
        failures: 1,
        errors: 0,
        time: 1.544,
        testcases: [
          { name: "fetches data correctly", classname: "API.Service", time: 0.432 },
          { 
            name: "handles API errors", 
            classname: "API.Service", 
            time: 0.543,
            failure: {
              message: "Expected error to be caught",
              details: "Error was not handled properly\nat Object.<anonymous> (/src/services/api.test.js:78:12)"
            }
          },
          { name: "supports pagination", classname: "API.Service", time: 0.321 },
          { name: "caches results", classname: "API.Service", time: 0.248 }
        ]
      }
    ],
    coverage: {
      timestamp: "1679900000000",
      name: "All files",
      metrics: {
        statements: 156,
        coveredstatements: 132,
        conditionals: 42,
        coveredconditionals: 31,
        methods: 38,
        coveredmethods: 33,
        elements: 236,
        coveredelements: 196,
        complexity: 0,
        loc: 156,
        ncloc: 156,
        packages: 4,
        files: 12,
        classes: 12,
        lineRate: 0.846,
        branchRate: 0.738,
        functionRate: 0.868
      },
      packages: [
        {
          name: "src",
          metrics: {
            statements: 12,
            coveredstatements: 12,
            conditionals: 2,
            coveredconditionals: 2,
            methods: 2,
            coveredmethods: 2
          },
          files: [
            {
              name: "App.js",
              path: "/src/App.js",
              metrics: {
                statements: 8,
                coveredstatements: 8,
                conditionals: 2,
                coveredconditionals: 2,
                methods: 1,
                coveredmethods: 1
              }
            },
            {
              name: "index.js",
              path: "/src/index.js",
              metrics: {
                statements: 4,
                coveredstatements: 4,
                conditionals: 0,
                coveredconditionals: 0,
                methods: 1,
                coveredmethods: 1
              }
            }
          ]
        },
        {
          name: "src.components.Button",
          metrics: {
            statements: 42,
            coveredstatements: 38,
            conditionals: 12,
            coveredconditionals: 10,
            methods: 8,
            coveredmethods: 7
          },
          files: [
            {
              name: "Button.js",
              path: "/src/components/Button/Button.js",
              metrics: {
                statements: 28,
                coveredstatements: 26,
                conditionals: 8,
                coveredconditionals: 7,
                methods: 5,
                coveredmethods: 5
              }
            },
            {
              name: "ButtonGroup.js",
              path: "/src/components/Button/ButtonGroup.js",
              metrics: {
                statements: 14,
                coveredstatements: 12,
                conditionals: 4,
                coveredconditionals: 3,
                methods: 3,
                coveredmethods: 2
              }
            }
          ]
        },
        {
          name: "src.components.Form",
          metrics: {
            statements: 62,
            coveredstatements: 58,
            conditionals: 18,
            coveredconditionals: 16,
            methods: 16,
            coveredmethods: 15
          },
          files: [
            {
              name: "Form.js",
              path: "/src/components/Form/Form.js",
              metrics: {
                statements: 32,
                coveredstatements: 30,
                conditionals: 10,
                coveredconditionals: 9,
                methods: 8,
                coveredmethods: 8
              }
            },
            {
              name: "FormField.js",
              path: "/src/components/Form/FormField.js",
              metrics: {
                statements: 18,
                coveredstatements: 17,
                conditionals: 6,
                coveredconditionals: 5,
                methods: 5,
                coveredmethods: 4
              }
            },
            {
              name: "FormGroup.js",
              path: "/src/components/Form/FormGroup.js",
              metrics: {
                statements: 12,
                coveredstatements: 11,
                conditionals: 2,
                coveredconditionals: 2,
                methods: 3,
                coveredmethods: 3
              }
            }
          ]
        },
        {
          name: "src.services",
          metrics: {
            statements: 40,
            coveredstatements: 24,
            conditionals: 10,
            coveredconditionals: 3,
            methods: 12,
            coveredmethods: 9
          },
          files: [
            {
              name: "api.js",
              path: "/src/services/api.js",
              metrics: {
                statements: 40,
                coveredstatements: 24,
                conditionals: 10,
                coveredconditionals: 3,
                methods: 12,
                coveredmethods: 9
              }
            }
          ]
        }
      ]
    }
  }
};

// For other builds, use the same test results for simplicity
for (const buildId of ["build-002", "build-003", "build-004", "build-005", "build-006", "build-007", "build-009", "build-010"]) {
  staticTestResults[buildId] = { ...staticTestResults["build-001"] };
}

const fetchTestResults = async (buildId: string): Promise<TestResults> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if test results exist for this build
  if (staticTestResults[buildId]) {
    return staticTestResults[buildId];
  }
  
  throw new Error(`Test results not found for build ${buildId}`);
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
