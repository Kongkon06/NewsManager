import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Subscriber {
  email: string;
}


interface ComposeNewsletterProps {
  subscribers: Subscriber[];
}

const ComposeNewsletter: React.FC<ComposeNewsletterProps> = ({ subscribers }) => {
  const [newsletter, setNewsletter] = useState({
    subject: '',
    content: '',
  });
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!newsletter.subject || !newsletter.content) return;

    setSending(true);
    try {
      // API call to save newsletter to the backend
     await axios.post('https://newsletter-devplexity-api.vercel.app/newsletter/create', {
        title: newsletter.subject,
        content: newsletter.content,
      });

      // Notify parent component about the new newsletter

      // Reset form
      setNewsletter({ subject: '', content: '' });
    } catch (error) {
      console.error('Error sending newsletter:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Newsletter Subject"
              value={newsletter.subject}
              onChange={(e) =>
                setNewsletter((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="mb-2"
            />
            <textarea
              placeholder="Newsletter Content"
              value={newsletter.content}
              onChange={(e) =>
                setNewsletter((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full min-h-[200px] p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Will be sent to {subscribers.length} subscribers
            </div>
            <Button
              onClick={handleSend}
              disabled={!newsletter.subject || !newsletter.content || sending}
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Newsletter
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComposeNewsletter;
