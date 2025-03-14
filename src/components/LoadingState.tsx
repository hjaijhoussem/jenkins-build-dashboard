
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LoadingCard = () => (
  <Card className="border overflow-hidden animate-pulse">
    <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start gap-2">
      <div className="flex flex-col gap-2">
        <div className="shimmer h-5 w-24 rounded-full bg-muted"></div>
        <div className="shimmer h-6 w-48 rounded bg-muted mt-1"></div>
      </div>
      <div className="shimmer h-4 w-20 rounded bg-muted"></div>
    </CardHeader>
    
    <CardContent className="p-4 pt-3">
      <div className="grid gap-3">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <div className="shimmer h-3 w-20 rounded bg-muted"></div>
            <div className="shimmer h-3 w-8 rounded bg-muted"></div>
          </div>
          <div className="shimmer h-2 w-full rounded-full bg-muted"></div>
        </div>
        
        <div className="flex items-center gap-2 pt-1">
          <div className="shimmer h-3 w-36 rounded bg-muted"></div>
        </div>
        
        <div className="border-t pt-2 mt-1">
          <div className="shimmer h-3 w-full rounded bg-muted"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

export default LoadingState;
