
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { 
  CheckCircle, 
  XCircle, 
  PackageOpen, 
  GitBranch,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { DeleteProjectDialog } from '@/components/DeleteProjectDialog';
import { useProjects } from '@/hooks/useProjects';
import LoadingState from '@/components/LoadingState';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();
  const navigate = useNavigate();

  // Sort projects by updatedAt date (newest first)
  const sortedProjects = React.useMemo(() => {
    if (!projects) return [];
    
    return [...projects].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [projects]);

  // Function to handle row click
  const handleRowClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <LoadingState />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium">Error loading projects</h2>
              <p className="text-muted-foreground mt-2">{error.message}</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Projects Dashboard</h1>
            <p className="text-muted-foreground">View all projects and their pipeline statuses</p>
          </div>
          <CreateProjectDialog />
        </div>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Project</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Pipelines</TableHead>
                <TableHead>Successful Jobs</TableHead>
                <TableHead>Failed Jobs</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project) => {
                // Calculate total jobs and percentages
                const totalJobs = project.successJobsCount + project.failedJobsCount;
                const successPercentage = totalJobs > 0 
                  ? Math.round((project.successJobsCount / totalJobs) * 100) 
                  : 0;
                const failedPercentage = totalJobs > 0 
                  ? Math.round((project.failedJobsCount / totalJobs) * 100) 
                  : 0;
                
                // Format dates for readability
                const date = new Date(project.updatedAt);
                const formattedDate = date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit', 
                  year: 'numeric'
                }) + ' ' + date.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                return (
                  <TableRow 
                    key={project.id} 
                    className="hover:bg-muted/40 cursor-pointer"
                    onClick={() => handleRowClick(project.id)}
                  >
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
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-success" />
                        <span className="font-medium">{project.successJobsCount}</span>
                        <span className="text-xs text-muted-foreground">
                          ({successPercentage}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <XCircle size={14} className="text-error" />
                        <span className="font-medium">{project.failedJobsCount}</span>
                        <span className="text-xs text-muted-foreground">
                          ({failedPercentage}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formattedDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/project/${project.id}`}>
                            <span>View</span>
                            <ArrowRight size={14} />
                          </Link>
                        </Button>
                        <DeleteProjectDialog 
                          projectId={project.id} 
                          projectName={project.name} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
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
