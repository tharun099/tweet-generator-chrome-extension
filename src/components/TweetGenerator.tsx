import React, { useState } from 'react';
import { Copy, RefreshCw, Twitter } from 'lucide-react';
import { TONE_OPTIONS, LENGTH_OPTIONS, type TweetOptions } from '../types';
import { generateTweet } from '../lib/gemini';

export function TweetGenerator() {
  const [selectedText, setSelectedText] = useState('');
  const [options, setOptions] = useState<TweetOptions>({
    tone: TONE_OPTIONS[0],
    customTone: '',
    length: 'medium'
  });
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get selected text from storage when component mounts
  React.useEffect(() => {
    const getSelectedText = async () => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        try {
          // First try to get from storage
          const result = await chrome.storage.local.get(['selectedText']);
          
          if (result.selectedText) {
            setSelectedText(result.selectedText);
            return;
          }

          // If no text in storage, try to get from active tab
          if (chrome.tabs) {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTED_TEXT' }, (response) => {
                if (response?.selectedText) {
                  setSelectedText(response.selectedText);
                  // Store for future use
                  chrome.storage.local.set({ selectedText: response.selectedText });
                }
              });
            }
          }
        } catch (err) {
          console.error('Error getting selected text:', err);
          setError('Unable to get selected text. Please try selecting text again.');
        }
      } else {
        // Development fallback
        setSelectedText('Example text for development');
      }
    };

    getSelectedText();

    // Listen for new text selections
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'TEXT_SELECTED') {
          setSelectedText(message.text);
        }
      });
    }
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError('');
      
      const tone = options.tone === 'Custom' ? options.customTone : options.tone;
      const maxLength = LENGTH_OPTIONS[options.length].maxChars;
      
      const generatedTweet = await generateTweet(
        selectedText,
        tone,
        maxLength
      );
      
      setTweet(generatedTweet);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to generate tweet. Please try again.';
      setError(errorMessage);
      console.error('Tweet generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tweet);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!selectedText) {
    return (
      <div className="p-4 text-center text-gray-600">
        Please select some text on the webpage to generate a tweet.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Writing Tone
        </label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={options.tone}
          onChange={(e) => setOptions({ ...options, tone: e.target.value })}
        >
          {TONE_OPTIONS.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>

        {options.tone === 'Custom' && (
          <input
            type="text"
            placeholder="Enter custom tone..."
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={options.customTone}
            onChange={(e) => setOptions({ ...options, customTone: e.target.value })}
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tweet Length
        </label>
        <div className="flex gap-2">
          {Object.entries(LENGTH_OPTIONS).map(([key, { label, maxChars }]) => (
            <button
              key={key}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md ${
                options.length === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setOptions({ ...options, length: key as TweetOptions['length'] })}
            >
              {label}
              <span className="block text-xs opacity-75">
                ({maxChars} chars)
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        onClick={handleGenerate}
        disabled={loading}
      >
        <Twitter className="w-4 h-4" />
        {loading ? 'Generating...' : 'Generate Tweet'}
      </button>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {tweet && (
        <div className="space-y-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Tweet Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Twitter className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-800">Generated Tweet</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={handleGenerate}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Tweet Content */}
            <div className="p-4">
              <p className="text-gray-800 text-base whitespace-pre-wrap break-words leading-relaxed">
                {tweet}
              </p>
            </div>
            
            {/* Tweet Footer */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Generated with {options.tone === 'Custom' ? options.customTone : options.tone} tone
                </span>
                <span className="text-sm text-gray-500">
                  {tweet.length} / {LENGTH_OPTIONS[options.length].maxChars} characters
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}