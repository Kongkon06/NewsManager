import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Loader2, Mail, Code, Eye } from 'lucide-react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import 'react-tabs/style/react-tabs.css';
import { useToast } from "@/hooks/use-toast"

interface Subscriber {
  email: string;
}

interface ComposeNewsletterProps {
  subscribers: Subscriber[];
}

const ComposeNewsletter: React.FC<ComposeNewsletterProps> = ({ subscribers }) => {
  const { toast } = useToast();
  const [newsletter, setNewsletter] = useState({
    subject: '',
    content: '',
    useHtml: false,
  });
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!newsletter.subject || !newsletter.content) return;

    setSending(true);
    try {
      const finalContent = newsletter.useHtml
        ? newsletter.content
        : `${newsletter.content}\n\nBest regards,\nDeveplexity Pvt Ltd`;

      await axios.post('https://newsletter-devplexity-api.vercel.app/newsletter/create', {
        title: newsletter.subject,
        content: finalContent,
      });

      toast({
        title: "Newsletter sent successfully",
        description: "Your newsletter has been sent to all subscribers.",
      });

      setNewsletter({ subject: '', content: '', useHtml: false });
    } catch (error) {
      toast({
        title: "Error sending newsletter",
        description: "There was a problem sending your newsletter. Please try again.",
        variant: "destructive",
      });
      console.error('Error sending newsletter:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-b from-white to-gray-50/50">
      <CardHeader className="space-y-1 pb-8 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Compose Newsletter
          </CardTitle>
          <div className="bg-purple-50 px-3 py-1 rounded-full text-sm text-purple-600 font-medium">
            {subscribers.length} subscribers
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="relative">
            <Input
              placeholder="Newsletter Subject"
              value={newsletter.subject}
              onChange={(e) =>
                setNewsletter((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="pl-10 h-12 text-lg border-gray-200 focus:border-purple-400 focus:ring-purple-400"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <Tabs defaultValue="plain" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-purple-50">
              <TabsTrigger value="plain" className="data-[state=active]:bg-white">
                <Mail className="mr-2 h-4 w-4" />
                Plain Text
              </TabsTrigger>
              <TabsTrigger value="html" className="data-[state=active]:bg-white">
                <Code className="mr-2 h-4 w-4" />
                HTML Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-white">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="plain" className="mt-4">
              <textarea
                placeholder="Write your newsletter content here..."
                value={newsletter.content}
                onChange={(e) =>
                  setNewsletter((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full min-h-[400px] p-4 border rounded-lg focus:border-purple-400 focus:ring-purple-400 resize-none"
              />
            </TabsContent>
            <TabsContent value="html" className="mt-4">
              <div className="rounded-lg overflow-hidden border">
                <CodeMirror
                  value={newsletter.content}
                  onChange={(value) =>
                    setNewsletter((prev) => ({ ...prev, content: value }))
                  }
                  extensions={[html()]}
                  height="400px"
                  theme="dark"
                  className="border-none"
                />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-4">
              <div
                className="p-6 border rounded-lg bg-white min-h-[400px] prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: newsletter.useHtml
                    ? newsletter.content
                    : `${newsletter.content.replace(/\n/g, '<br>')}<br><br>Best regards,<br>Deveplexity Pvt Ltd`,
                }}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSend}
              disabled={!newsletter.subject || !newsletter.content || sending}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 h-12"
            >
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Newsletter...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
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