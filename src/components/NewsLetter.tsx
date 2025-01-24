import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { CheckCircle2, Clock, Send, Trash2, XCircle } from 'lucide-react'
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
  onSend: (id: string) => void;
}

const NewslettersList: React.FC<NewslettersListProps> = ({ newsletters, onDelete, onSend }) => {
  const { toast } = useToast()

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'draft':
        return <Clock className="h-4 w-4 text-amber-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const handleSend = (id: string) => {
    toast({
      title: "Sending newsletter...",
      description: "Your newsletter is being sent to all subscribers.",
    })
    onSend(id)
  }

  const handleDelete = (id: string) => {
    toast({
      title: "Newsletter deleted",
      description: "The newsletter has been removed from your drafts.",
      variant: "destructive",
    })
    onDelete(id)
  }

  return (
    <Card className="card-gradient border-none shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Newsletters</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage and track your newsletter campaigns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div 
              key={newsletter.id} 
              className="group relative flex justify-between items-center p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 transition-all duration-200 hover:shadow-md hover:bg-background/80 animate-fade-in"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getStatusIcon(newsletter.status)}
                  <h3 className="font-semibold text-lg tracking-tight">{newsletter.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {newsletter.status}
                  </span>
                  <span>•</span>
                  <span>{newsletter.created}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {newsletter.status.toLowerCase() === 'draft' && (
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleSend(newsletter.id)}
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(newsletter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {newsletters.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No newsletters found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default NewslettersList