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
 * Format a timestamp for display in the UI
 * @param timestamp ISO string timestamp
 * @returns Formatted time string (e.g., "10:30 AM", "Yesterday", "Mar 15")
 */
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  // Today
  if (diffInDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Yesterday
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  
  // Within the last week
  if (diffInDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }
  
  // Older than a week
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
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

/**
 * Format a timestamp for display in a message bubble
 * @param timestamp ISO string timestamp
 * @returns Formatted time string (e.g., "10:30 AM")
 */
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};