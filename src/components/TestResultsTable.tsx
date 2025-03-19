
import React, { useState } from 'react';
import { TestSuite, TestCase } from '@/types';
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface TestResultsTableProps {
  testsuites: TestSuite[];
}

const TestResultsTable: React.FC<TestResultsTableProps> = ({ testsuites }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>({});
  
  // Toggle test suite expansion
  const toggleSuite = (suiteName: string) => {
    setExpandedSuites(prev => ({
      ...prev,
      [suiteName]: !prev[suiteName]
    }));
  };
  
  // Filter test suites and test cases by search term
  const filteredSuites = testsuites.filter(suite => {
    const suiteMatches = suite.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasMatchingTestCase = suite.testcases.some(testCase => 
      testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      testCase.classname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testCase.failure?.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return suiteMatches || hasMatchingTestCase;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center w-full max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Error Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuites.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No test results match your search
                </TableCell>
              </TableRow>
            ) : (
              filteredSuites.map((suite) => (
                <React.Fragment key={suite.name}>
                  <TableRow className="bg-muted/30 hover:bg-muted/50 cursor-pointer" onClick={() => toggleSuite(suite.name)}>
                    <TableCell>
                      {expandedSuites[suite.name] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {suite.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {suite.failures > 0 ? (
                          <Badge variant="outline" className="bg-error/10 text-error">
                            {suite.failures} Failed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-success/10 text-success">
                            All Passed
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{suite.time}s</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{suite.tests} tests</span>
                    </TableCell>
                  </TableRow>
                  
                  {expandedSuites[suite.name] && suite.testcases.filter(testCase => 
                    searchTerm === '' || 
                    testCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    testCase.classname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    testCase.failure?.message?.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((testCase) => (
                    <TableRow key={`${suite.name}-${testCase.name}`} className="bg-background">
                      <TableCell></TableCell>
                      <TableCell className="pl-8 py-2">
                        <div>
                          <div>{testCase.name}</div>
                          <div className="text-xs text-muted-foreground">{testCase.classname}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {testCase.failure ? (
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-error mr-1" />
                            <span className="text-error">Failed</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-success mr-1" />
                            <span className="text-success">Passed</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{testCase.time}s</TableCell>
                      <TableCell className="max-w-md truncate">
                        {testCase.failure ? (
                          <div className="text-sm text-error">{testCase.failure.message}</div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TestResultsTable;
