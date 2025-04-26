
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    salary?: string;
    posted_at: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Briefcase className="mr-2 h-4 w-4" />
          {job.company}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Globe className="mr-2 h-4 w-4" />
          {job.location}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{job.type}</span>
          {job.salary && (
            <span className="text-sm font-medium text-gray-500">{job.salary}</span>
          )}
        </div>
        <div className="mt-4">
          <Button className="w-full">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
