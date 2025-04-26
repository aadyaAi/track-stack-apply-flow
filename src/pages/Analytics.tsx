
import React from 'react';
import { useApplications } from '@/context/ApplicationContext';
import SourceSuccessChart from '@/components/analytics/SourceSuccessChart';
import ResponseTimeChart from '@/components/analytics/ResponseTimeChart';
import IndustryChart from '@/components/analytics/IndustryChart';
import ActivityHeatmap from '@/components/analytics/ActivityHeatmap';

const Analytics: React.FC = () => {
  const { applications } = useApplications();
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SourceSuccessChart applications={applications} />
        <ResponseTimeChart applications={applications} />
        <IndustryChart applications={applications} />
        <ActivityHeatmap applications={applications} />
      </div>
    </div>
  );
};

export default Analytics;
