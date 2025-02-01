export interface TweetOptions {
  tone: string;
  customTone: string;
  length: 'short' | 'medium' | 'full';
}

export interface TweetResponse {
  text: string;
  error?: string;
}

export const TONE_OPTIONS = [
  'Professional',
  'Casual',
  'Witty',
  'Inspirational',
  'Custom'
] as const;

export const LENGTH_OPTIONS = {
  short: { label: 'Short', maxChars: 100 },
  medium: { label: 'Medium', maxChars: 200 },
  full: { label: 'Full', maxChars: 280 }
} as const;