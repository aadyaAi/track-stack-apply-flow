
import { JobApplication } from '@/types';

export const exportToCSV = (applications: JobApplication[]) => {
  const headers = [
    'Company Name',
    'Role Name',
    'Application Date',
    'Source',
    'Status',
    'Location',
    'Job Post URL',
    'Notes',
    'Tags',
    'Last Updated'
  ];

  const csvRows = [
    headers.join(','),
    ...applications.map(app => [
      `"${app.companyName}"`,
      `"${app.roleName}"`,
      app.applicationDate,
      `"${app.source}"`,
      app.status,
      `"${app.location}"`,
      `"${app.jobPostUrl || ''}"`,
      `"${(app.notes || '').replace(/"/g, '""')}"`,
      `"${app.tags.join(';')}"`,
      app.lastUpdated
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `job_applications_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
