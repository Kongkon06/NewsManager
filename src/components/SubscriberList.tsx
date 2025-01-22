import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Trash2 } from 'lucide-react'

interface Subscriber {
  id: string;
  email: string;
  dateJoined: string;
}

interface SubscribersListProps {
  subscribers: Subscriber[];
  onDelete: (id: string) => void;
}

const SubscribersList: React.FC<SubscribersListProps> = ({ subscribers, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriber List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <div key={subscriber.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{subscriber.email}</div>
                <div className="text-sm text-gray-500">Joined: {subscriber.dateJoined}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(subscriber.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SubscribersList