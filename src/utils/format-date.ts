
import { formatDistance } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

export function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString);
  return formatDistance(date, new Date(), { addSuffix: true });
}
