//import React from 'react'
import { RecoilRoot } from 'recoil'
import NewsManager from '../src/components/NewsManager'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <RecoilRoot>
        <NewsManager />
        </RecoilRoot>
      </div>
    </div>
  )
}

export default App