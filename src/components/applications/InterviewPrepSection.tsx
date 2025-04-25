
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, MessageSquare, Search } from 'lucide-react';

interface InterviewPrepSectionProps {
  companyName: string;
}

const InterviewPrepSection: React.FC<InterviewPrepSectionProps> = ({ companyName }) => {
  const encodedCompanyName = encodeURIComponent(companyName);
  
  const resources = [
    {
      name: 'Glassdoor Reviews',
      url: `https://www.glassdoor.com/Search/results.htm?keyword=${encodedCompanyName}`,
      icon: MessageSquare
    },
    {
      name: 'Blind Reviews',
      url: `https://www.teamblind.com/company/${encodedCompanyName}`,
      icon: Search
    },
    {
      name: 'LeetCode Discussions',
      url: `https://leetcode.com/discuss/interview-question?currentPage=1&query=${encodedCompanyName}`,
      icon: BookOpen
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Prep Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {resources.map((resource) => (
            <Button
              key={resource.name}
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <resource.icon className="h-4 w-4" />
              {resource.name}
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewPrepSection;
