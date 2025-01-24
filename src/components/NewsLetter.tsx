import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Trash2, Send } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Newsletter {
  id: string;
  title: string;
  status: string;
  created: string;
}

interface NewslettersListProps {
  newsletters: Newsletter[];
  onDelete: (id: string) => void;
  onSend: (id: string) => Promise<boolean>; // Make onSend return a Promise
}

const NewslettersList: React.FC<NewslettersListProps> = ({ newsletters, onDelete, onSend }) => {
  const { toast } = useToast()
  const [sendingId, setSendingId] = useState<string | null>(null)

  const handleSend = async (id: string) => {
    setSendingId(id)
    try {
      const success = await onSend(id)
      
      if (success) {
        toast({
          title: "Newsletter Sent",
          description: `Newsletter "${newsletters.find(n => n.id === id)?.title}" sent successfully`,
          variant: "default"
        })
      } else {
        toast({
          title: "Send Failed",
          description: "Could not send newsletter. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while sending newsletter.",
        variant: "destructive"
      })
    } finally {
      setSendingId(null)
    }
  }

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
              <div className='flex gap-2'>
                <Button
                  disabled={sendingId === newsletter.id}
                  onClick={() => handleSend(newsletter.id)}
                  className="flex items-center gap-2"
                >
                  {sendingId === newsletter.id ? 'Sending...' : 'Send'}
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(newsletter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default NewslettersList