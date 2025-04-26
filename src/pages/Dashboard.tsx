
import React from 'react';
import { useApplications } from '@/context/ApplicationContext';
import StatCard from '@/components/dashboard/StatCard';
import StatusChart from '@/components/dashboard/StatusChart';
import RecentApplications from '@/components/dashboard/RecentApplications';
import { LayoutDashboard, Calendar, ClipboardList, CheckCheck, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { applications } = useApplications();
  
  // Calculate statistics
  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === 'Interviewing').length;
  const offers = applications.filter(app => app.status === 'Offer').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;
  
  // Applications in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentApplications = applications.filter(
    app => new Date(app.applicationDate) >= thirtyDaysAgo
  ).length;
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          icon={<LayoutDashboard className="h-4 w-4" />}
          description="All time applications"
        />
        <StatCard 
          title="Recent Applications" 
          value={recentApplications} 
          icon={<Calendar className="h-4 w-4" />}
          description="Last 30 days" 
        />
        <StatCard 
          title="Active Interviews" 
          value={interviews} 
          icon={<ClipboardList className="h-4 w-4" />}
          description="Applications in interview stage"
        />
        <StatCard 
          title="Success Rate" 
          value={totalApplications ? Math.round((offers / totalApplications) * 100) : 0} 
          icon={totalApplications && offers > 0 ? <CheckCheck className="h-4 w-4" /> : <X className="h-4 w-4" />}
          description="Offer percentage" 
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-5">
        <StatusChart applications={applications} />
        <RecentApplications applications={applications} />
      </div>
      <div className="mt-4">
        <ApplicationTimeline applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
