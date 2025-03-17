
import React from 'react';
import { ProjectData } from '@/types';
import { Link } from 'react-router-dom';
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

// Static project data for demonstration purposes
const staticProjects: ProjectData[] = [
  {
    id: "proj-1",
    name: "Frontend Application",
    description: "Main user-facing web application",
    pipelinesCount: 24,
    successJobsCount: 20,
    failedJobsCount: 4,
    createdAt: new Date(2023, 6, 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: "proj-2",
    name: "Backend API",
    description: "RESTful API services and database operations",
    pipelinesCount: 56,
    successJobsCount: 48,
    failedJobsCount: 8,
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: "proj-3",
    name: "Mobile App",
    description: "Cross-platform mobile application using React Native",
    pipelinesCount: 18,
    successJobsCount: 15,
    failedJobsCount: 3,
    createdAt: new Date(2023, 8, 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: "proj-4",
    name: "Authentication Service",
    description: "User authentication and authorization microservice",
    pipelinesCount: 12,
    successJobsCount: 12,
    failedJobsCount: 0,
    createdAt: new Date(2023, 5, 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
  },
  {
    id: "proj-5",
    name: "Data Processing Service",
    description: "Big data processing and analytics pipeline",
    pipelinesCount: 32,
    successJobsCount: 28,
    failedJobsCount: 4,
    createdAt: new Date(2023, 4, 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() // 3 hours ago
  }
];

const Projects = () => {
  // Sort projects by updatedAt date (newest first)
  const sortedProjects = React.useMemo(() => {
    return [...staticProjects].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Projects Dashboard</h1>
          <p className="text-muted-foreground">View all projects and their pipeline statuses</p>
        </div>
        
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
