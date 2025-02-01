// Check if we're in a Chrome extension environment
if (typeof chrome !== 'undefined' && chrome.storage) {
  // Listen for text selection
  document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection()?.toString().trim();
    
    if (selectedText && selectedText.length > 0) {
      // Send message to the extension
      chrome.runtime.sendMessage({ type: 'TEXT_SELECTED', text: selectedText });
      
      // Also store in local storage as backup
      chrome.storage.local.set({ selectedText });
    }
  });

  // Listen for messages from the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_SELECTED_TEXT') {
      const selectedText = window.getSelection()?.toString().trim();
      sendResponse({ selectedText });
    }
  });
}