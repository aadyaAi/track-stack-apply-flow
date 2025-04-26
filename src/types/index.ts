
export type ApplicationStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Ghosted';

export interface TimelineEvent {
  id: string;
  date: string;
  description: string;
}

export interface JobApplication {
  id: string;
  companyName: string;
  roleName: string;
  applicationDate: string;
  source: string;
  status: ApplicationStatus;
  location: string;
  jobDescription?: string;
  jobPostUrl?: string;
  resumeUrl?: string;
  resumeName?: string;
  coverLetterUrl?: string;
  coverLetterName?: string;
  notes?: string;
  tags: string[];
  timeline: TimelineEvent[];
  lastUpdated: string;
  priority?: boolean;
}
