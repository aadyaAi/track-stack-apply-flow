
import { ApplicationStatus } from '../types';

export function getStatusColor(status: ApplicationStatus): string {
  switch (status) {
    case 'Applied':
      return 'bg-status-applied';
    case 'Interviewing':
      return 'bg-status-interviewing';
    case 'Offer':
      return 'bg-status-offer';
    case 'Rejected':
      return 'bg-status-rejected';
    case 'Ghosted':
      return 'bg-status-ghosted';
    default:
      return 'bg-gray-400';
  }
}

export function getStatusTextColor(status: ApplicationStatus): string {
  switch (status) {
    case 'Applied':
      return 'text-status-applied';
    case 'Interviewing':
      return 'text-status-interviewing';
    case 'Offer':
      return 'text-status-offer';
    case 'Rejected':
      return 'text-status-rejected';
    case 'Ghosted':
      return 'text-status-ghosted';
    default:
      return 'text-gray-400';
  }
}
