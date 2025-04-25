import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApplications } from '@/context/ApplicationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/format-date';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import TimelineItem from '@/components/applications/TimelineItem';
import AddEventForm from '@/components/applications/AddEventForm';
import StatusSelector from '@/components/applications/StatusSelector';
import { ArrowLeft, Link as LinkIcon, Calendar, Paperclip, Edit, Trash } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UpdateApplicationDialog from '@/components/applications/UpdateApplicationDialog';
import InterviewPrepSection from '@/components/applications/InterviewPrepSection';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, updateApplication, updateStatus, deleteApplication } = useApplications();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Application Not Found</h1>
        <p className="mb-4">The application you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link to="/applications">Return to Applications</Link>
        </Button>
      </div>
    );
  }
  
  React.useEffect(() => {
    if (application?.notes) {
      setNotes(application.notes);
    }
  }, [application?.notes]);
  
  const handleSaveNotes = () => {
    updateApplication(application.id, { notes });
    setIsEditingNotes(false);
  };
  
  const handleDeleteApplication = () => {
    deleteApplication(application.id);
    navigate('/applications');
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/applications')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Applications
        </Button>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{application.companyName}</h1>
            <p className="text-gray-600">{application.roleName}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <StatusSelector 
              currentStatus={application.status} 
              onChange={(status) => updateStatus(application.id, status)} 
            />
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this job application
                    and all of its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteApplication} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Applied On</dt>
                  <dd className="mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {formatDate(application.applicationDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Source</dt>
                  <dd className="mt-1">{application.source}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1">{application.location || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Job Post URL</dt>
                  <dd className="mt-1">
                    {application.jobPostUrl ? (
                      <a 
                        href={application.jobPostUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        View Job Post
                      </a>
                    ) : (
                      '-'
                    )}
                  </dd>
                </div>
                {application.tags.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {application.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Job Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {application.jobDescription ? (
                  <div className="whitespace-pre-wrap">{application.jobDescription}</div>
                ) : (
                  <p className="text-gray-500">No job description available.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Notes</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (isEditingNotes) {
                      handleSaveNotes();
                    } else {
                      setIsEditingNotes(true);
                    }
                  }}
                >
                  {isEditingNotes ? 'Save' : <Edit className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px]"
                  placeholder="Add notes about this application..."
                />
              ) : (
                <div className="prose max-w-none">
                  {application.notes ? (
                    <div className="whitespace-pre-wrap">{application.notes}</div>
                  ) : (
                    <p className="text-gray-500">No notes yet. Click the edit button to add notes.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Attachments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="flex items-center w-full justify-start">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>Add resume</span>
                </Button>
                <Button variant="outline" className="flex items-center w-full justify-start">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>Add cover letter</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Timeline</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Add Event</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Timeline Event</DialogTitle>
                    </DialogHeader>
                    <AddEventForm applicationId={application.id} />
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {application.timeline.length > 0 ? (
                <div className="space-y-1 mt-2">
                  {[...application.timeline]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((event) => (
                      <TimelineItem 
                        key={event.id} 
                        event={event} 
                        applicationId={application.id} 
                      />
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No timeline events yet.</p>
              )}
            </CardContent>
          </Card>
          
          <InterviewPrepSection companyName={application.companyName} />
        </div>
      </div>
      
      <UpdateApplicationDialog
        application={application}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </div>
  );
};

export default ApplicationDetail;
