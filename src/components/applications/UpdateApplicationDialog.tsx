
import React, { useState } from 'react';
import { JobApplication } from '@/types';
import { useApplications } from '@/context/ApplicationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Plus } from 'lucide-react';
import StatusSelector from './StatusSelector';

interface UpdateApplicationDialogProps {
  application: JobApplication;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateApplicationDialog: React.FC<UpdateApplicationDialogProps> = ({ 
  application, 
  isOpen, 
  onClose 
}) => {
  const { updateApplication } = useApplications();
  
  const [formData, setFormData] = useState({
    companyName: application.companyName,
    roleName: application.roleName,
    applicationDate: new Date(application.applicationDate).toISOString().split('T')[0],
    source: application.source,
    location: application.location || '',
    status: application.status,
    jobDescription: application.jobDescription || '',
    jobPostUrl: application.jobPostUrl || '',
    notes: application.notes || '',
    tag: '',
    tags: [...application.tags]
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedApplication: Partial<JobApplication> = {
      companyName: formData.companyName,
      roleName: formData.roleName,
      applicationDate: new Date(formData.applicationDate).toISOString(),
      source: formData.source,
      location: formData.location,
      status: formData.status,
      jobDescription: formData.jobDescription,
      jobPostUrl: formData.jobPostUrl,
      notes: formData.notes,
      tags: formData.tags
    };
    
    updateApplication(application.id, updatedApplication);
    onClose();
  };
  
  const handleAddTag = () => {
    if (formData.tag.trim() && !formData.tags.includes(formData.tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, formData.tag.trim()],
        tag: ''
      }));
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roleName">Role *</Label>
              <Input
                id="roleName"
                value={formData.roleName}
                onChange={(e) => setFormData(prev => ({ ...prev, roleName: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="applicationDate">Application Date *</Label>
              <Input
                id="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Source *</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <StatusSelector 
                currentStatus={formData.status} 
                onChange={(status) => setFormData(prev => ({ ...prev, status }))} 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="jobPostUrl">Job Post URL</Label>
              <Input
                id="jobPostUrl"
                value={formData.jobPostUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, jobPostUrl: e.target.value }))}
                type="url"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Tags</Label>
              <div className="flex space-x-2">
                <Input
                  value={formData.tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                  placeholder="Add tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((t) => (
                  <div key={t} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center text-sm">
                    {t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Application</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateApplicationDialog;
