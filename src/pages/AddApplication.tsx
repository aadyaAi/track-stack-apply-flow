
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '@/context/ApplicationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication, ApplicationStatus } from '@/types';
import StatusSelector from '@/components/applications/StatusSelector';
import { X, Plus } from 'lucide-react';

const AddApplication: React.FC = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
  
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [source, setSource] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [jobDescription, setJobDescription] = useState('');
  const [jobPostUrl, setJobPostUrl] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication: Omit<JobApplication, 'id' | 'lastUpdated'> = {
      companyName,
      roleName,
      applicationDate: new Date(applicationDate).toISOString(),
      source,
      status,
      location,
      jobDescription,
      jobPostUrl,
      notes,
      tags,
      timeline: [{
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        description: `Applied to ${companyName} for ${roleName} position`
      }],
      resumeUrl: '',
      coverLetterUrl: ''
    };
    
    addApplication(newApplication);
    navigate('/applications');
  };
  
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Application</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role *</Label>
                  <Input
                    id="roleName"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Job title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="applicationDate">Application Date *</Label>
                  <Input
                    id="applicationDate"
                    type="date"
                    value={applicationDate}
                    onChange={(e) => setApplicationDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">Source *</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="LinkedIn, Company Website, etc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Remote, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <StatusSelector currentStatus={status} onChange={setStatus} />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="jobPostUrl">Job Post URL</Label>
                  <Input
                    id="jobPostUrl"
                    value={jobPostUrl}
                    onChange={(e) => setJobPostUrl(e.target.value)}
                    placeholder="https://..."
                    type="url"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
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
                    {tags.map((t) => (
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
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional notes"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => navigate('/applications')}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Application</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddApplication;
