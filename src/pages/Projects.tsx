
import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectData } from '@/types';
import { Link } from 'react-router-dom';
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
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  XCircle, 
  PackageOpen, 
  GitBranch,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const { data: projects, isLoading, isError, error } = useProjects();
  
  // Sort projects by updatedAt date (newest first)
  const sortedProjects = React.useMemo(() => {
    if (!projects) return [];
    
    return [...projects].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Projects Dashboard</h1>
          <p className="text-muted-foreground">View all projects and their pipeline statuses</p>
        </div>
        
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <Card className="p-6 border border-error/20 bg-error/5 text-center">
            <h3 className="text-lg font-medium text-error mb-2">Error loading project data</h3>
            <p className="text-sm text-muted-foreground">{error?.message || 'Failed to fetch data'}</p>
          </Card>
        ) : sortedProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Project</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Pipelines</TableHead>
                  <TableHead className="text-center">Jobs Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProjects.map((project: ProjectData) => {
                  // Format dates for readability
                  const formattedDate = formatDistanceToNow(new Date(project.updatedAt), { 
                    addSuffix: true,
                    includeSeconds: true 
                  });
                  
                  // Calculate total jobs
                  const totalJobs = project.successJobsCount + project.failedJobsCount;
                  
                  return (
                    <TableRow key={project.id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <PackageOpen size={16} className="text-primary" />
                          <span>{project.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {project.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-mono">
                          <GitBranch size={14} className="mr-1" />
                          {project.pipelinesCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-center gap-1">
                            <CheckCircle size={16} className="text-success" />
                            <span className="font-medium">{project.successJobsCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <XCircle size={16} className="text-error" />
                            <span className="font-medium">{project.failedJobsCount}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            of {totalJobs}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formattedDate}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full"
                          asChild
                        >
                          <Link to={`/project/${project.id}`}>
                            <span>View</span>
                            <ArrowRight size={14} />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
    </div>
  );
};

export default Projects;
