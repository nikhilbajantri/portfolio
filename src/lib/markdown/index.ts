export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = calculateWordCount(text);
  return Math.max(1, Math.round(words / wordsPerMinute));
}
