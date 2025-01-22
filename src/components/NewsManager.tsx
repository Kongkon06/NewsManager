import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
//import { generateId, formatDate } from '../utils/utils'
import SubscribersList from '../components/SubscriberList'
import NewslettersList from '../components/NewsLetter'
import ComposeNewsletter from '../components/Compose'
import NewsletterInbox from '../components/Inbox'

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useLocalStorage('subscribers', [])
  const [newsletters, setNewsletters] = useLocalStorage('newsletters', [])
  const [sentNewsletters, setSentNewsletters] = useLocalStorage('sentNewsletters', [])
  const [activeTab, setActiveTab] = useState('subscribers')

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter((sub: { id: string }) => sub.id !== id))
  }

  const handleDeleteNewsletter = (id: string) => {
    setNewsletters(newsletters.filter((news: { id: string }) => news.id !== id))
  }

  const handleSendNewsletter = async (newsletter: { subject: string; content: string; id: number; date: string; recipientCount: number }) => {
    // Simulate sending emails to subscribers
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // In a real application, you would integrate with an email service here
        console.log(`Sending newsletter to ${subscribers.length} subscribers:`, newsletter)
        
        // Add to sent newsletters
        setSentNewsletters([
          {
            ...newsletter,
            sentAt: new Date().toISOString(),
          },
          ...sentNewsletters
        ])
        
        resolve()
      }, 2000) // Simulate network delay
    })
  }

  const tabs: { [key: string]: JSX.Element } = {
    subscribers: <SubscribersList subscribers={subscribers} onDelete={handleDeleteSubscriber} />,
    compose: (
      <div className="space-y-6">
        <ComposeNewsletter onSend={handleSendNewsletter} subscribers={subscribers} />
        <NewsletterInbox newsletters={sentNewsletters} />
      </div>
    ),
    newsletters: <NewslettersList newsletters={newsletters} onDelete={handleDeleteNewsletter} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex space-x-2 mb-4">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeTab === tab
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