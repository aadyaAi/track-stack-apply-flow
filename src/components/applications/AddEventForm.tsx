
import React from 'react';
import { useApplications } from '@/context/ApplicationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AddEventFormProps {
  applicationId: string;
  onAddSuccess?: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ applicationId, onAddSuccess }) => {
  const { addTimelineEvent } = useApplications();
  const { toast } = useToast();
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter an event description",
        variant: "destructive"
      });
      return;
    }

    addTimelineEvent(applicationId, {
      date: new Date(date).toISOString(),
      description
    });

    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    
    if (onAddSuccess) {
      onAddSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <Input
          id="eventDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1"
          required
        />
      </div>
      <div>
        <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="eventDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1"
          placeholder="Describe what happened"
          required
        />
      </div>
      <Button type="submit">Add Event</Button>
    </form>
  );
};

export default AddEventForm;
