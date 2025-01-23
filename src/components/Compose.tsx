import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
    useHtml: false, // Toggle between plain text and HTML
  });
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleSend = async () => {
    if (!newsletter.subject || !newsletter.content) return;

    setSending(true);
    try {
      // Append "Best regards, Deveplexity Pvt Ltd" to the content if not using HTML
      const finalContent = newsletter.useHtml
        ? newsletter.content
        : `${newsletter.content}\n\nBest regards,\nDeveplexity Pvt Ltd`;

      // API call to save newsletter to the backend
      await axios.post('https://newsletter-devplexity-api.vercel.app/newsletter/create', {
        title: newsletter.subject,
        content: finalContent,
      });

      // Reset form
      setNewsletter({ subject: '', content: '', useHtml: false });
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
            <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
              <TabList>
                <Tab>Plain Text</Tab>
                <Tab>HTML Editor</Tab>
                <Tab>Preview</Tab>
              </TabList>
              <TabPanel>
                <textarea
                  placeholder="Write your newsletter content here..."
                  value={newsletter.content}
                  onChange={(e) =>
                    setNewsletter((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="w-full min-h-[200px] p-2 border rounded-md"
                />
              </TabPanel>
              <TabPanel>
                <CodeMirror
                  value={newsletter.content}
                  onChange={(value) =>
                    setNewsletter((prev) => ({ ...prev, content: value }))
                  }
                  extensions={[html()]}
                  height="200px"
                  theme="dark"
                />
              </TabPanel>
              <TabPanel>
                <div
                  className="p-4 border rounded-md bg-white"
                  dangerouslySetInnerHTML={{
                    __html: newsletter.useHtml
                      ? newsletter.content
                      : `${newsletter.content.replace(/\n/g, '<br>')}<br><br>Best regards,<br>Devplexity Pvt Ltd`,
                  }}
                />
              </TabPanel>
            </Tabs>
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