
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BuildData } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Beaker, Clock } from 'lucide-react';

interface BuildCardProps {
  build: BuildData;
}

const BuildCard: React.FC<BuildCardProps> = ({ build }) => {
  // Format dates for readability
  const formattedDate = formatDistanceToNow(new Date(build.updatedAt), { 
    addSuffix: true,
    includeSeconds: true 
  });

  // Calculate test success rate as a percentage
  const testSuccessRate = build.testsTotal > 0 
    ? Math.round((build.testsSuccess / build.testsTotal) * 100) 
    : 0;

  // Determine color for coverage progress based on coverage percentage
  const getCoverageColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <Card 
      className={cn(
        "card-hover border overflow-hidden transition-all",
        "opacity-0 animate-fade-up"
      )}
      style={{ 
        animationDelay: '50ms',
        animationFillMode: 'forwards' 
      }}
    >
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start gap-2">
        <div className="flex flex-col gap-2">
          <StatusBadge status={build.status} />
          <h3 className="font-semibold text-lg tracking-tight mt-1">{build.name}</h3>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={12} />
          <span>{formattedDate}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        <div className="grid gap-3">
          {/* Code Coverage */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Code Coverage</span>
              <span className="font-medium">{build.coveragePercentage}%</span>
            </div>
            <Progress 
              value={build.coveragePercentage} 
              max={100}
              className="h-2 bg-secondary"
              indicatorClassName={getCoverageColorClass(build.coveragePercentage)} 
            />
          </div>
          
          {/* Test Results */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1 text-xs">
              <Beaker size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Tests:</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium">
                {build.testsSuccess} <span className="text-success">passed</span>
              </span>
              {build.testsFailed > 0 && (
                <span className="font-medium">
                  {build.testsFailed} <span className="text-error">failed</span>
                </span>
              )}
              <span className="text-muted-foreground">of {build.testsTotal}</span>
            </div>
          </div>
          
          {/* ID Display */}
          <div className="border-t pt-2 mt-1">
            <div className="text-xs text-muted-foreground truncate">
              ID: <span className="font-mono">{build.id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildCard;
