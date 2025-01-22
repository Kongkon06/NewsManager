//import React from 'react'
import NewsManager from '../src/components/NewsManager'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Newsletter Management</h1>
        <NewsManager />
      </div>
    </div>
  )
}

export default App