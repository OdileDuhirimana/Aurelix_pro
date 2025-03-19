/**
 * Format number with commas
 * @param num Number to format
 * @returns Formatted number string with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format percentage change with sign
 * @param change Percentage change value
 * @returns Formatted percentage string with sign
 */
export const formatPercentageChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

/**
 * Formats a timestamp into a human-readable time string
 * @param timestamp The timestamp to format (Date object or ISO string)
 * @returns Formatted time string (e.g., "10:30 AM", "Yesterday", "Mar 15")
 */
export const formatTime = (timestamp: Date | string): string => {
  // Convert string timestamp to Date if needed
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
  // Get current date for comparison
  const now = new Date();
  
  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();
  
  // Check if the date was yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  // Check if the date is within the current week
  const isThisWeek = date > new Date(now.setDate(now.getDate() - 7));
  
  // Format the time (e.g., "10:30 AM")
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  const timeString = date.toLocaleTimeString(undefined, timeOptions);
  
  if (isToday) {
    // If today, just return the time
    return timeString;
  } else if (isYesterday) {
    // If yesterday, return "Yesterday"
    return "Yesterday";
  } else if (isThisWeek) {
    // If within the current week, return the day name
    const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return date.toLocaleDateString(undefined, dayOptions);
  } else {
    // Otherwise, return the short date (e.g., "Mar 15")
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, dateOptions);
  }
};

/**
 * Formats a date into a human-readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "March 15, 2023")
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return dateObj.toLocaleDateString(undefined, options);
};

/**
 * Formats a currency amount
 * @param amount The amount to format
 * @param currency The currency code (default: 'USD')
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};