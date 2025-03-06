// Utility functions for time formatting

/**
 * Format timestamp to display time
 * @param timestamp ISO string timestamp
 * @returns Formatted time string (e.g. "2:30 PM")
 */
export const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
  
  