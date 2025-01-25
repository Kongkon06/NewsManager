import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
//import { generateId, formatDate } from '../utils/utils'
import SubscribersList from '../components/SubscriberList'
import NewslettersList from '../components/NewsLetter'
import ComposeNewsletter from '../components/Compose'
import NewsletterInbox from '../components/Inbox'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { allNewsLetterAtom, allSubscribersAtom } from '../Atoms/Atoms'
import { Mail, Users, PenSquare } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from 'react-hot-toast'
const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useRecoilState(allSubscribersAtom)
  const [newsletters, setNewsletters] = useRecoilState(allNewsLetterAtom)
  const sentNewsletters = useLocalStorage('sentNewsletters', [])
  const [activeTab, setActiveTab] = useState('subscribers')
  const { toast } = useToast()

  const fetchSubscriber = () => {
    axios.get("https://newsletter-devplexity-api.vercel.app/subscriber").then((response: any) => {
      setSubscribers(response.data);
    });
  }

  const fetchNewsletter = async () => {
    axios.get("https://newsletter-devplexity-api.vercel.app/newsletter").then((response: any) => {
      setNewsletters(response.data);
    });
  }

  useEffect(() => {
    try {
      fetchSubscriber();
      fetchNewsletter();
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again later.",
        variant: "destructive",
      })
    }
  }, [])

  const handleDeleteSubscriber = async (id: string) => {
    setSubscribers(subscribers.filter((sub: { id: string }) => sub.id !== id))
  }

  const handleDeleteNewsletter = async (id: string) => {
    await axios.get(`https://newsletter-devplexity-api.vercel.app/newsletter/${id}`);
    setNewsletters(newsletters.filter((news: { id: string }) => news.id !== id))
  }

  const handleSendtoAll = (id: string) => {
    axios.post('https://newsletter-devplexity-api.vercel.app/emailhandler/sendNewsletter', {
      newsletterId: id
    }).then((response: any) => {
      if (response.status == 200) {
        console.log(response.data);
        toast({
          title: "Success",
          description: "Newsletter sent successfully to all subscribers.",
        })
      }
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to send newsletter. Please try again.",
        variant: "destructive",
      })
    })
  }

  const tabs: { [key: string]: { icon: JSX.Element; content: JSX.Element } } = {
    subscribers: {
      icon: <Users className="h-4 w-4" />,
      content: <SubscribersList subscribers={subscribers} onDelete={handleDeleteSubscriber} />
    },
    compose: {
      icon: <PenSquare className="h-4 w-4" />,
      content: (
        <div className="space-y-6 animate-fade-in">
          <ComposeNewsletter subscribers={subscribers} />
          <NewsletterInbox newsletters={sentNewsletters} />
        </div>
      )
    },
    newsletters: {
      icon: <Mail className="h-4 w-4" />,
      content: <NewslettersList onSend={handleSendtoAll} newsletters={newsletters} onDelete={handleDeleteNewsletter} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Newsletter Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your newsletters, subscribers, and campaigns in one place
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6  animate-fade-in">
          {Object.entries(tabs).map(([key, { icon }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === key
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105'
                  : 'bg-white hover:bg-purple-50 text-gray-600 hover:text-purple-600 border border-gray-200'
                }
              `}
            >
              {icon}
              <span className="capitalize">{key}</span>
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  )
}


export default NewsletterManager