
import React, { createContext, useContext, useEffect, useState } from 'react';
import { JobApplication, ApplicationStatus, TimelineEvent } from '../types';
import { toast } from '@/hooks/use-toast';

interface ApplicationContextType {
  applications: JobApplication[];
  addApplication: (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => void;
  updateApplication: (id: string, application: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  addTimelineEvent: (applicationId: string, event: Omit<TimelineEvent, 'id'>) => void;
  deleteTimelineEvent: (applicationId: string, eventId: string) => void;
  updateStatus: (id: string, status: ApplicationStatus) => void;
  addAttachment: (applicationId: string, type: 'resume' | 'coverLetter', file: File) => void;
  removeAttachment: (applicationId: string, type: 'resume' | 'coverLetter') => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'jobApplications';

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadSavedData = () => {
      const savedApplications = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedApplications) {
        try {
          const parsed = JSON.parse(savedApplications);
          setApplications(parsed);
          console.log('Loaded applications from localStorage:', parsed);
        } catch (error) {
          console.error('Failed to parse saved applications:', error);
          toast({
            title: "Error",
            description: "Failed to load saved applications.",
            variant: "destructive"
          });
        }
      }
      setIsInitialized(true);
    };
    
    loadSavedData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      console.log('Saving applications to localStorage:', applications);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(applications));
    }
  }, [applications, isInitialized]);

  const addApplication = (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString()
    };
    setApplications(prev => [...prev, newApplication]);
    toast({
      title: "Success",
      description: "Application added successfully."
    });
  };

  const updateApplication = (id: string, updatedFields: Partial<JobApplication>) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, ...updatedFields, lastUpdated: new Date().toISOString() } 
          : app
      )
    );
    toast({
      title: "Success",
      description: "Application updated successfully."
    });
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast({
      title: "Success",
      description: "Application deleted successfully."
    });
  };

  const addTimelineEvent = (applicationId: string, event: Omit<TimelineEvent, 'id'>) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === applicationId) {
          const newEvent: TimelineEvent = {
            ...event,
            id: crypto.randomUUID()
          };
          return { 
            ...app, 
            timeline: [...app.timeline, newEvent],
            lastUpdated: new Date().toISOString()
          };
        }
        return app;
      })
    );
    toast({
      title: "Success",
      description: "Timeline event added."
    });
  };

  const deleteTimelineEvent = (applicationId: string, eventId: string) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === applicationId) {
          return { 
            ...app, 
            timeline: app.timeline.filter(event => event.id !== eventId),
            lastUpdated: new Date().toISOString()
          };
        }
        return app;
      })
    );
    toast({
      title: "Success",
      description: "Timeline event removed."
    });
  };

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          const newEvent: TimelineEvent = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            description: `Status changed to ${status}`
          };
          
          return { 
            ...app, 
            status,
            timeline: [...app.timeline, newEvent],
            lastUpdated: new Date().toISOString()
          };
        }
        return app;
      })
    );
    toast({
      title: "Status Updated",
      description: `Status changed to ${status}.`
    });
  };

  // New functions for handling attachments
  const addAttachment = (applicationId: string, type: 'resume' | 'coverLetter', file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const fileDataUrl = event.target?.result as string;
      
      setApplications(prev => 
        prev.map(app => {
          if (app.id === applicationId) {
            const updatedApp = { ...app, lastUpdated: new Date().toISOString() };
            
            if (type === 'resume') {
              updatedApp.resumeUrl = fileDataUrl;
              updatedApp.resumeName = file.name;
            } else {
              updatedApp.coverLetterUrl = fileDataUrl;
              updatedApp.coverLetterName = file.name;
            }
            
            return updatedApp;
          }
          return app;
        })
      );
      
      toast({
        title: "Attachment Added",
        description: `${type === 'resume' ? 'Resume' : 'Cover letter'} has been attached.`
      });
    };
    
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the file.",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const removeAttachment = (applicationId: string, type: 'resume' | 'coverLetter') => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === applicationId) {
          const updatedApp = { ...app, lastUpdated: new Date().toISOString() };
          
          if (type === 'resume') {
            updatedApp.resumeUrl = undefined;
            updatedApp.resumeName = undefined;
          } else {
            updatedApp.coverLetterUrl = undefined;
            updatedApp.coverLetterName = undefined;
          }
          
          return updatedApp;
        }
        return app;
      })
    );
    
    toast({
      title: "Attachment Removed",
      description: `${type === 'resume' ? 'Resume' : 'Cover letter'} has been removed.`
    });
  };

  return (
    <ApplicationContext.Provider 
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        addTimelineEvent,
        deleteTimelineEvent,
        updateStatus,
        addAttachment,
        removeAttachment
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
