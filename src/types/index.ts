
export type ApplicationStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Ghosted';

export interface TimelineEvent {
  id: string;
  date: string;
  description: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  notes?: string;
  lastContactDate?: string;
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
  coverLetterUrl?: string;
  notes?: string;
  tags: string[];
  timeline: TimelineEvent[];
  lastUpdated: string;
  priority?: boolean;
  contacts: Contact[];
  companyLinkedIn?: string;
  lastCompanyUpdate?: string;
}
