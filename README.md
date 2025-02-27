# Tweet Generator Chrome Extension

## Overview
The **Tweet Generator** is a powerful Chrome extension that transforms selected web content into engaging social media posts using Google's **Gemini AI**. With advanced customization options, direct social media integration, and an intuitive interface, it streamlines the content creation process for **social media managers, content creators, and casual users** alike.

## Key Features
- **Smart Text Selection**: Extract content from any webpage with context-aware selection.
- **AI-Powered Generation**: Leverage Google's Gemini AI for high-quality post creation.
- **Customizable Prompts**: Edit and save default prompts for personalized output.
- **Multi-Platform Support**: Direct posting to Twitter, LinkedIn, and other social platforms.
- **Advanced Customization:**
  - Multiple writing tones (**Professional, Casual, Humorous**, etc.)
  - Variable post length options
  - Custom hashtag preferences
  - Brand voice settings
- **Real-time Preview**: Live character count and post preview.
- **Direct Social Integration**: Post directly to multiple platforms without leaving the extension.

---

## File Structure & Purpose

### `manifest.json`
- Chrome extension configuration file.
- Defines permissions, content scripts, and extension metadata.
- Sets up the extension's popup interface.

### `src/components/TweetGenerator.tsx`
- Main component handling the tweet generation interface.
- Manages state for selected text, options, and generated tweets.
- Implements text selection detection and storage.
- Handles user interactions and API calls.
- Renders the UI with tone selection, length options, and tweet display.

### `src/lib/gemini.ts`
- Implements the integration with **Google's Gemini AI**.
- Handles API calls for tweet generation.
- Formats prompts and processes AI responses.
- Manages error handling for API interactions.

### `src/content.tsx`
- Content script injected into web pages.
- Listens for text selection events.
- Communicates selected text to the extension.
- Manages **chrome.storage** for persistence.

### `src/types.ts`
- TypeScript type definitions.
- Defines interfaces for tweet options and responses.
- Contains constants for tone options and length settings.

### `src/App.tsx`
- Root component of the extension.
- Provides the main layout and structure.
- Handles routing and component organization.

### `vite.config.ts`
- Build configuration for the extension.
- Sets up **development and production builds**.
- Manages asset handling and optimization.

---

## Development Process

### 1. Initial Setup
- Created a **Vite-based React** project with **TypeScript**.
- Configured **Chrome extension manifest**.
- Set up **build pipeline** for extension packaging.

### 2. Core Functionality
- Implemented **text selection detection**.
- Integrated **Gemini AI** for tweet generation.
- Added **tone and length customization options**.

### 3. UI Development
- Designed a **clean and intuitive interface**.
- Implemented **responsive components**.
- Added **loading states and error handling**.
- Created **Twitter-like tweet preview**.

### 4. Extension Integration
- Added **Chrome extension-specific features**.
- Implemented **cross-script communication**.
- Set up **data persistence with chrome.storage**.

### 5. Polish & Optimization
- Added **copy and regenerate functionality**.
- Improved **error handling and user feedback**.
- Optimized **performance and bundle size**.

---

## Technical Stack
- **React 18.3**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **Google Generative AI (Gemini)**
- **Chrome Extension APIs**
- **Lucide React (for icons)**

---

## Security Considerations
- **API key storage** in `.env` file.
- **Content security policies** to ensure safe execution.
- **Safe text selection handling** to prevent unwanted interactions.
- **Proper error handling and validation** for smooth functionality.

---

## Installation & Usage

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd tweet-generator-extension
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Build the extension:
   ```sh
   npm run build
   ```
5. Load the extension into Chrome:
   - Open **Chrome** and go to `chrome://extensions/`
   - Enable **Developer Mode** (top-right corner)
   - Click **Load Unpacked** and select the `dist/` folder

### Usage
- Select any text on a webpage.
- Open the extension popup.
- Customize the tone, length, and hashtags.
- Generate a tweet using **Gemini AI**.
- Copy or post directly to social media platforms.

---

## Contributing
We welcome contributions! Feel free to submit a pull request or report any issues.

---

Happy Tweeting! 🚀
