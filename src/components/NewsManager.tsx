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

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useRecoilState(allSubscribersAtom)
  const [newsletters, setNewsletters] = useRecoilState(allNewsLetterAtom)
  const sentNewsletters = useLocalStorage('sentNewsletters', [])
  const [activeTab, setActiveTab] = useState('subscribers')

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
        alert("Newsletter send sucessfully to all subscriber");
      }
    })
  }
  const tabs: { [key: string]: JSX.Element } = {
    subscribers: <SubscribersList subscribers={subscribers} onDelete={handleDeleteSubscriber} />,
    compose: (
      <div className="space-y-6">
        <ComposeNewsletter subscribers={subscribers} />
        <NewsletterInbox newsletters={sentNewsletters} />
      </div>
    ),
    newsletters: <NewslettersList onSend={handleSendtoAll} newsletters={newsletters} onDelete={handleDeleteNewsletter} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex space-x-2 mb-4">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs[activeTab]}
    </div>
  )
}

export default NewsletterManager