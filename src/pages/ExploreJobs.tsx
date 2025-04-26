
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, Building2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  posted: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'Looking for an experienced frontend developer with React expertise...',
    posted: '2 days ago'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Join our growing team to build innovative solutions...',
    posted: '1 week ago'
  },
  // Add more mock jobs as needed
];

const ExploreJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs] = useState<Job[]>(MOCK_JOBS);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Explore Jobs</h1>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-4">
        {filteredJobs.map(job => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-xl font-semibold">{job.title}</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>{job.company}</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{job.location}</span>
                    <Briefcase className="h-4 w-4 ml-2" />
                    <span>{job.type}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => alert('This would create a new application')}>
                  Apply Now
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="font-medium">Salary Range</div>
                  <div className="text-gray-600">{job.salary}</div>
                </div>
                <div>
                  <div className="font-medium">Description</div>
                  <div className="text-gray-600">{job.description}</div>
                </div>
                <div className="text-sm text-gray-500">Posted {job.posted}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreJobs;
