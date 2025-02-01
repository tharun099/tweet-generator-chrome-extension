import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { TweetGenerator } from './components/TweetGenerator';

function App() {
  return (
    <div className="w-[400px] bg-white">
      <header className="bg-blue-600 text-white p-4 flex items-center gap-2">
        <MessageSquareQuote className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Tweet Generator</h1>
      </header>
      
      <main className="max-h-[600px] overflow-y-auto">
        <TweetGenerator />
      </main>
    </div>
  );
}

export default App;