import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBuilds } from '@/hooks/useBuilds';
import { useTestResults } from '@/hooks/useTestResults';
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

const Index = () => {
  // Get project ID from URL
  const { projectId } = useParams();
  const { data: builds, isLoading, isError, error } = useBuilds(projectId);
  const [selectedBuild, setSelectedBuild] = useState<BuildData | null>(null);
  const { data: testResults } = useTestResults(selectedBuild?.id);
  
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
    setSelectedBuild(build);
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
      {selectedBuild && testResults && (
        <Dialog open={true} onOpenChange={closeBuildDetails}>
          <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedBuild.name} Test Results
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              <TestDashboard results={testResults} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;
