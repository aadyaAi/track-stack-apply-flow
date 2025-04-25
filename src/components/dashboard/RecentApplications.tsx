
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication } from '@/types';
import { formatDistanceToNow } from '@/utils/format-date';
import { getStatusColor } from '@/utils/status-utils';
import { Link } from 'react-router-dom';

interface RecentApplicationsProps {
  applications: JobApplication[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({ applications }) => {
  // Sort applications by last updated, most recent first
  const sortedApplications = [...applications]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5); // Take only the 5 most recent

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedApplications.length > 0 ? (
            sortedApplications.map(application => (
              <div key={application.id} className="flex items-center">
                <div className="flex-1 space-y-1">
                  <Link to={`/application/${application.id}`} className="hover:underline">
                    <p className="text-sm font-medium leading-none">{application.companyName}</p>
                  </Link>
                  <p className="text-sm text-muted-foreground">{application.roleName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(application.status)}`} />
                  <span className="text-xs text-muted-foreground">{application.status}</span>
                  <span className="text-xs text-muted-foreground">{formatDistanceToNow(application.lastUpdated)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No applications yet. Start by adding your first job application.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
