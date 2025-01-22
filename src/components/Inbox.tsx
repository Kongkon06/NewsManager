import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
//import { Button } from './ui/button'
import {  Calendar, Users } from 'lucide-react'

interface Newsletter {
  id: string;
  subject: string;
  date: string;
  content: string;
  recipientCount: number;
}

interface NewsletterInboxProps {
  newsletters: Newsletter[];
}

const NewsletterInbox: React.FC<NewsletterInboxProps> = ({ newsletters }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sent Newsletters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No newsletters sent yet
            </div>
          ) : (
            newsletters.map((newsletter) => (
              <div key={newsletter.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{newsletter.subject}</h3>
                  <span className="text-sm text-gray-500">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    {new Date(newsletter.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{newsletter.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  Sent to {newsletter.recipientCount} subscribers
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsletterInbox