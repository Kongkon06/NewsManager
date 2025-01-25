import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Newsletter {
  id: string;
  title: string;
  status: string;
  created: string;
}

interface NewslettersListProps {
  newsletters: Newsletter[];
  onDelete: (id: string) => Promise<void>; // Marked as async
  onSend: (id: string) => Promise<void>; // Marked as async
}

const NewslettersList: React.FC<NewslettersListProps> = ({ newsletters, onDelete, onSend }) => {
  const handleSend = async (id: string) => {
    try {
      await onSend(id); // Await the async function
      toast.success('Newsletter sent successfully!');
    } catch (error) {
      toast.error('Failed to send newsletter.');
      console.error('Error sending newsletter:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id); // Await the async function
      toast.success('Newsletter deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete newsletter.');
      console.error('Error deleting newsletter:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div key={newsletter.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{newsletter.title}</div>
                <div className="text-sm text-gray-500">
                  Status: <span className="capitalize">{newsletter.status}</span> | 
                  Created: {newsletter.created}
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  className="p-2 text-white rounded-lg bg-green-500 hover:bg-green-600"
                  onClick={() => handleSend(newsletter.id)}
                >
                  Send
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(newsletter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewslettersList;