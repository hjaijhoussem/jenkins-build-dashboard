
import React from 'react';
import { CircleSlash } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 animate-fade-in">
      <div className="rounded-full bg-muted p-4 mb-4">
        <CircleSlash className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No build data available</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        There are no builds to display at the moment. New builds will appear here when they become available.
      </p>
    </div>
  );
};

export default EmptyState;
