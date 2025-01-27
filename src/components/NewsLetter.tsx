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
  onDelete: (id: string) => void;
  onSend: (id: string) => void;
}

const NewslettersList: React.FC<NewslettersListProps> = ({ newsletters, onDelete, onSend }) => {
  if (newsletters.length === 0) {
    return <p className="text-center py-12 text-muted-foreground">No newsletters available</p>
  }

  const handleSend = (id: string) => {
    onSend(id);
    toast.success('Newsletter sent successfully!');
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast.success('Newsletter deleted successfully!');
  };

  return (
    <Card className="card-gradient border-none shadow-xl" >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Newsletters</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage and track your newsletter campaigns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div key={newsletter.id} className=" group relative flex justify-between items-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/60 transition-all duration-200 hover:shadow-md hover:bg-gray-50 animate-fade-in">
              <div  className="space-y-1">
                <div className="flex items-center gap-2"><h3 className="font-semibold text-base tracking-tight">{newsletter.title}</h3></div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground text-gray-500">
                  Status: <span className="capitalize px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{newsletter.status}</span> | 
                  Created: {newsletter.created}
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <button
                  className="p-2 gap-1 text-white rounded-lg bg-green-500 hover:bg-green-600"
                  onClick={() => handleSend(newsletter.id)}
                >
                  Send
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className='hover:bg-red-50 hover:text-red-600 transition-all duration-200'
                  onClick={() => handleDelete(newsletter.id)}
                >
                  <Trash2 className="h-4 w-4 " />
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