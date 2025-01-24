import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Trash2, UserCheck } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Subscriber removed",
      description: "The subscriber has been successfully removed from the list.",
    })
  }

  const isRecentSubscriber = (dateJoined: string) => {
    const joinedDate = new Date(dateJoined);
    const now = new Date();
    const daysSinceJoined = Math.floor((now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceJoined <= 7;
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-b from-white to-gray-50/50">
      <CardHeader className="space-y-1 pb-8 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Subscriber List
          </CardTitle>
          <div className="bg-purple-50 px-3 py-1 rounded-full text-sm text-purple-600 font-medium">
            {subscribers.length} subscribers
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {subscribers.map((subscriber) => (
            <div 
              key={subscriber.id} 
              className="group flex justify-between items-center p-4 rounded-xl transition-all duration-200 hover:bg-purple-50/50 border border-transparent hover:border-purple-100"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                    {subscriber.email}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    Joined: {subscriber.dateJoined}
                    {isRecentSubscriber(subscriber.dateJoined) && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove the subscriber from your list.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(subscriber.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SubscribersList