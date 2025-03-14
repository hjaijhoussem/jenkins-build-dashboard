
import React from 'react';
import { useBuilds } from '@/hooks/useBuilds';
import { BuildData } from '@/types';
import BuildCard from '@/components/BuildCard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { data: builds, isLoading, isError, error } = useBuilds();
  
  // Sort builds by updatedAt date (newest first)
  const sortedBuilds = React.useMemo(() => {
    if (!builds) return [];
    
    return [...builds].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [builds]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <Card className="p-6 border border-error/20 bg-error/5 text-center">
            <h3 className="text-lg font-medium text-error mb-2">Error loading build data</h3>
            <p className="text-sm text-muted-foreground">{error?.message || 'Failed to fetch data'}</p>
          </Card>
        ) : sortedBuilds.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBuilds.map((build: BuildData) => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
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

export default Index;
