
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface FilePreviewProps {
  fileUrl: string;
  fileName: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, fileName }) => {
  const fileType = fileName.split('.').pop()?.toLowerCase();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Preview">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {fileType === 'pdf' ? (
            <iframe 
              src={fileUrl} 
              className="w-full h-[80vh]"
              title={fileName}
            />
          ) : (
            <img 
              src={fileUrl} 
              alt={fileName} 
              className="max-w-full h-auto"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
