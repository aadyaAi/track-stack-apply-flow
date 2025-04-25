
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { JobApplication } from '@/types';
import { formatDate } from '@/utils/format-date';
import { getStatusColor } from '@/utils/status-utils';
import { Link } from 'react-router-dom';

interface ApplicationCardProps {
  application: JobApplication;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { id, companyName, roleName, applicationDate, status, source, tags } = application;
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/application/${id}`} className="group">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{companyName}</h3>
            <p className="text-muted-foreground text-sm">{roleName}</p>
          </Link>
          <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(status)}`}>
            {status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Applied:</span>
            <span>{formatDate(applicationDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Source:</span>
            <span>{source}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
