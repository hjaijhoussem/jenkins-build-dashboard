
import React, { useState } from 'react';
import { TestResults } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestResultsOverview from './TestResultsOverview';
import TestResultsTable from './TestResultsTable';
import CoverageResultsTable from './CoverageResultsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode, Check, Shield } from 'lucide-react';

interface TestDashboardProps {
  results: TestResults;
}

const TestDashboard: React.FC<TestDashboardProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <TestResultsOverview results={results} />
      
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="coverage" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Coverage Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Check className="h-5 w-5" />
                Detailed Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TestResultsTable testsuites={results.testsuites} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coverage" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Detailed Coverage Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CoverageResultsTable packages={results.coverage.packages} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestDashboard;
