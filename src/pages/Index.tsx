
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBuilds } from '@/hooks/useBuilds';
import { BuildData } from '@/types';
import BuildCard from '@/components/BuildCard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import StatusBadge from '@/components/StatusBadge';
import { formatDistanceToNow } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Beaker, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import TestDashboard from '@/components/TestDashboard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample test data for demo (this would come from the API)
const sampleTestResults = {
  summary: {
    tests: 15,
    failures: 2,
    errors: 0,
    time: 5.678
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
};

const Index = () => {
  // Get project ID from URL
  const { projectId } = useParams();
  const { data: builds, isLoading, isError, error } = useBuilds(projectId);
  const [selectedBuild, setSelectedBuild] = useState<BuildData | null>(null);
  
  // Sort builds by updatedAt date (newest first)
  const sortedBuilds = React.useMemo(() => {
    if (!builds) return [];
    
    return [...builds].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [builds]);

  // Function to determine color class for coverage progress based on percentage
  const getCoverageColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  // Check if the error is specifically a "project not found" error
  const isProjectNotFoundError = React.useMemo(() => {
    if (!error) return false;
    
    // Check the error message for the specific project not found message
    return error.message?.includes('Project') && error.message?.includes('not found');
  }, [error]);

  // Function to open build details
  const openBuildDetails = (build: BuildData) => {
    // Attach the sample test results for demo purposes
    // In a real application, this would come from the API
    setSelectedBuild({
      ...build,
      testResults: sampleTestResults
    });
  };

  // Function to close build details
  const closeBuildDetails = () => {
    setSelectedBuild(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pipelines</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold">Project Pipelines</h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">
                <ArrowLeft size={14} className="mr-1" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : isProjectNotFoundError ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Project Not Found</AlertTitle>
            <AlertDescription>
              The project you're looking for doesn't exist or has been deleted.
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/projects">
                    <ArrowLeft size={14} className="mr-1" />
                    Return to Projects
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : isError ? (
          <Card className="p-6 border border-error/20 bg-error/5 text-center">
            <h3 className="text-lg font-medium text-error mb-2">Error loading build data</h3>
            <p className="text-sm text-muted-foreground">{error?.message || 'Failed to fetch data'}</p>
          </Card>
        ) : sortedBuilds.length === 0 ? (
          <EmptyState />
        ) : (
          <Card>
            <Tabs defaultValue="table" className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="table" className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Build</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Code Coverage</TableHead>
                      <TableHead>Test Results</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedBuilds.map((build: BuildData) => {
                      // Format dates for readability
                      const formattedDate = formatDistanceToNow(new Date(build.updatedAt), { 
                        addSuffix: true,
                        includeSeconds: true 
                      });
                      
                      // Calculate test success rate
                      const testSuccessRate = build.testsTotal > 0 
                        ? Math.round((build.testsSuccess / build.testsTotal) * 100) 
                        : 0;

                      return (
                        <TableRow key={build.id} className="hover:bg-muted/40">
                          <TableCell className="font-medium">{build.name}</TableCell>
                          <TableCell>
                            <StatusBadge status={build.status} />
                          </TableCell>
                          <TableCell>
                            <div className="w-full max-w-[200px] space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Coverage</span>
                                <span className="font-medium">{build.coveragePercentage}%</span>
                              </div>
                              <Progress 
                                value={build.coveragePercentage} 
                                className="h-2 bg-secondary"
                                indicatorClassName={getCoverageColorClass(build.coveragePercentage)} 
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Beaker size={14} className="text-muted-foreground" />
                              <span className="text-success font-medium">{build.testsSuccess}</span>
                              {build.testsFailed > 0 && (
                                <>
                                  <span>/</span>
                                  <span className="text-error font-medium">{build.testsFailed}</span>
                                </>
                              )}
                              <span className="text-muted-foreground">of {build.testsTotal}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formattedDate}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => openBuildDetails(build)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="cards" className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedBuilds.map((build: BuildData) => (
                    <div key={build.id} onClick={() => openBuildDetails(build)} className="cursor-pointer">
                      <BuildCard build={build} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-center text-muted-foreground">
            Jenkins Build Dashboard • {new Date().getFullYear()} 
          </p>
        </div>
      </footer>
      
      {/* Test Results Dialog */}
      {selectedBuild && selectedBuild.testResults && (
        <Dialog open={true} onOpenChange={closeBuildDetails}>
          <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedBuild.name} Test Results
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              <TestDashboard results={selectedBuild.testResults} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;
