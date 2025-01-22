import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send, Loader2 } from 'lucide-react'

interface ComposeNewsletterProps {
  onSend: (newsletter: { subject: string; content: string; id: number; date: string; recipientCount: number }) => Promise<void>;
  subscribers: { email: string }[];
}

const ComposeNewsletter: React.FC<ComposeNewsletterProps> = ({ onSend, subscribers }) => {
  const [newsletter, setNewsletter] = useState({
    subject: '',
    content: '',
  })
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    setSending(true)
    try {
      await onSend({
        ...newsletter,
        id: Date.now(),
        date: new Date().toISOString(),
        recipientCount: subscribers.length
      })
      setNewsletter({ subject: '', content: '' })
    } finally {
      setSending(false)
    }
  }

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
              onChange={(e) => setNewsletter({ ...newsletter, subject: e.target.value })}
              className="mb-2"
            />
            <textarea
              placeholder="Newsletter Content"
              value={newsletter.content}
              onChange={(e) => setNewsletter({ ...newsletter, content: e.target.value })}
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
  )
}

export default ComposeNewsletter