
import React, { useState } from 'react';
import { CoveragePackage, CoverageFile } from '@/types';
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Search, ChevronDown, ChevronRight, FileCode } from 'lucide-react';

interface CoverageResultsTableProps {
  packages: CoveragePackage[];
}

const CoverageResultsTable: React.FC<CoverageResultsTableProps> = ({ packages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({});
  
  // Toggle package expansion
  const togglePackage = (packageName: string) => {
    setExpandedPackages(prev => ({
      ...prev,
      [packageName]: !prev[packageName]
    }));
  };
  
  // Filter packages and files by search term
  const filteredPackages = packages.filter(pkg => {
    const packageMatches = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const hasMatchingFile = pkg.files.some(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      file.path.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return packageMatches || hasMatchingFile;
  });

  // Function to determine color class based on percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  // Calculate coverage percentage
  const calculateCoverage = (covered: number, total: number) => {
    return total > 0 ? Math.round((covered / total) * 100) : 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center w-full max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files or packages..."
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
              <TableHead>Package/File</TableHead>
              <TableHead>Line Coverage</TableHead>
              <TableHead>Branch Coverage</TableHead>
              <TableHead>Function Coverage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No coverage results match your search
                </TableCell>
              </TableRow>
            ) : (
              filteredPackages.map((pkg) => (
                <React.Fragment key={pkg.name}>
                  <TableRow className="bg-muted/30 hover:bg-muted/50 cursor-pointer" onClick={() => togglePackage(pkg.name)}>
                    <TableCell>
                      {expandedPackages[pkg.name] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {pkg.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-full max-w-[180px]">
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{pkg.metrics.coveredstatements}/{pkg.metrics.statements}</span>
                            <span>{calculateCoverage(pkg.metrics.coveredstatements, pkg.metrics.statements)}%</span>
                          </div>
                          <Progress 
                            value={calculateCoverage(pkg.metrics.coveredstatements, pkg.metrics.statements)} 
                            max={100}
                            className="h-2 bg-secondary"
                            indicatorClassName={getColorClass(calculateCoverage(pkg.metrics.coveredstatements, pkg.metrics.statements))} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-full max-w-[180px]">
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{pkg.metrics.coveredconditionals}/{pkg.metrics.conditionals}</span>
                            <span>{calculateCoverage(pkg.metrics.coveredconditionals, pkg.metrics.conditionals)}%</span>
                          </div>
                          <Progress 
                            value={calculateCoverage(pkg.metrics.coveredconditionals, pkg.metrics.conditionals)} 
                            max={100}
                            className="h-2 bg-secondary"
                            indicatorClassName={getColorClass(calculateCoverage(pkg.metrics.coveredconditionals, pkg.metrics.conditionals))} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-full max-w-[180px]">
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{pkg.metrics.coveredmethods}/{pkg.metrics.methods}</span>
                            <span>{calculateCoverage(pkg.metrics.coveredmethods, pkg.metrics.methods)}%</span>
                          </div>
                          <Progress 
                            value={calculateCoverage(pkg.metrics.coveredmethods, pkg.metrics.methods)} 
                            max={100}
                            className="h-2 bg-secondary"
                            indicatorClassName={getColorClass(calculateCoverage(pkg.metrics.coveredmethods, pkg.metrics.methods))} 
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedPackages[pkg.name] && pkg.files.filter(file => 
                    searchTerm === '' || 
                    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    file.path.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((file) => (
                    <TableRow key={`${pkg.name}-${file.path}`} className="bg-background">
                      <TableCell></TableCell>
                      <TableCell className="pl-8 py-2">
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div>{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.path}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-full max-w-[180px]">
                          <div className="w-full">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>{file.metrics.coveredstatements}/{file.metrics.statements}</span>
                              <span>{calculateCoverage(file.metrics.coveredstatements, file.metrics.statements)}%</span>
                            </div>
                            <Progress 
                              value={calculateCoverage(file.metrics.coveredstatements, file.metrics.statements)} 
                              max={100}
                              className="h-2 bg-secondary"
                              indicatorClassName={getColorClass(calculateCoverage(file.metrics.coveredstatements, file.metrics.statements))} 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-full max-w-[180px]">
                          <div className="w-full">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>{file.metrics.coveredconditionals}/{file.metrics.conditionals}</span>
                              <span>{calculateCoverage(file.metrics.coveredconditionals, file.metrics.conditionals)}%</span>
                            </div>
                            <Progress 
                              value={calculateCoverage(file.metrics.coveredconditionals, file.metrics.conditionals)} 
                              max={100}
                              className="h-2 bg-secondary"
                              indicatorClassName={getColorClass(calculateCoverage(file.metrics.coveredconditionals, file.metrics.conditionals))} 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 w-full max-w-[180px]">
                          <div className="w-full">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>{file.metrics.coveredmethods}/{file.metrics.methods}</span>
                              <span>{calculateCoverage(file.metrics.coveredmethods, file.metrics.methods)}%</span>
                            </div>
                            <Progress 
                              value={calculateCoverage(file.metrics.coveredmethods, file.metrics.methods)} 
                              max={100}
                              className="h-2 bg-secondary"
                              indicatorClassName={getColorClass(calculateCoverage(file.metrics.coveredmethods, file.metrics.methods))} 
                            />
                          </div>
                        </div>
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

export default CoverageResultsTable;
