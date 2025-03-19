
import React from 'react';
import { TestResults } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Beaker, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TestResultsOverviewProps {
  results: TestResults;
}

const TestResultsOverview: React.FC<TestResultsOverviewProps> = ({ results }) => {
  const { summary, coverage } = results;
  
  const passRate = summary.tests > 0 
    ? Math.round(((summary.tests - summary.failures - summary.errors) / summary.tests) * 100) 
    : 0;

  // Function to determine color class based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              Test Results Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Passed Tests</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success">
                  {summary.tests - summary.failures - summary.errors}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-error" />
                  <span>Failed Tests</span>
                </div>
                <Badge variant="outline" className="bg-error/10 text-error">
                  {summary.failures}
                </Badge>
              </div>
              
              {summary.errors > 0 && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <span>Errors</span>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    {summary.errors}
                  </Badge>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Beaker className="h-5 w-5" />
                  <span>Total Tests</span>
                </div>
                <Badge variant="outline">
                  {summary.tests}
                </Badge>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Pass Rate</span>
                  <span className="font-medium">{passRate}%</span>
                </div>
                <Progress 
                  value={passRate} 
                  max={100}
                  className="h-2 bg-secondary"
                  indicatorClassName={getColorClass(passRate)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Coverage Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Code Coverage Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Line Coverage</span>
                </div>
                <Badge variant="outline" className={`bg-${getColorClass(coverage.metrics.lineRate * 100).replace('bg-', '')}/10`}>
                  {Math.round(coverage.metrics.lineRate * 100)}%
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Branch Coverage</span>
                </div>
                <Badge variant="outline" className={`bg-${getColorClass(coverage.metrics.branchRate * 100).replace('bg-', '')}/10`}>
                  {Math.round(coverage.metrics.branchRate * 100)}%
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Function Coverage</span>
                </div>
                <Badge variant="outline" className={`bg-${getColorClass(coverage.metrics.functionRate * 100).replace('bg-', '')}/10`}>
                  {Math.round(coverage.metrics.functionRate * 100)}%
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Files Analyzed</span>
                </div>
                <Badge variant="outline">
                  {coverage.metrics.files}
                </Badge>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Overall Coverage</span>
                  <span className="font-medium">
                    {Math.round((coverage.metrics.coveredelements / coverage.metrics.elements) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={Math.round((coverage.metrics.coveredelements / coverage.metrics.elements) * 100)} 
                  max={100}
                  className="h-2 bg-secondary"
                  indicatorClassName={getColorClass(Math.round((coverage.metrics.coveredelements / coverage.metrics.elements) * 100))} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestResultsOverview;
