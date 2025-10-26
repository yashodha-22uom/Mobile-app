/**
 * Utility Helper Functions for Sportify App
 */

/**
 * Format date string to readable format
 * @param dateString - ISO date string or date string
 * @returns Formatted date string (e.g., "Jan 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    return dateString;
  }
};

/**
 * Format time string to readable format
 * @param timeString - Time string
 * @returns Formatted time string (e.g., "3:00 PM")
 */
export const formatTime = (timeString: string): string => {
  try {
    // Handle if it's already formatted
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  } catch (error) {
    return timeString;
  }
};

/**
 * Get initials from full name
 * @param name - Full name
 * @returns Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Get status badge color based on match status
 * @param status - Match status
 * @param isDark - Is dark mode enabled
 * @returns Color hex code
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'live':
      return '#66BB6A';
    case 'upcoming':
      return '#42A5F5';
    case 'completed':
      return '#9E9E9E';
    default:
      return '#9E9E9E';
  }
};

/**
 * Calculate rating stars
 * @param rating - Numeric rating
 * @returns Array of star types ['full', 'full', 'half', 'empty', 'empty']
 */
export const getRatingStars = (rating: number): string[] => {
  const stars: string[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  if (hasHalfStar) {
    stars.push('half');
  }
  
  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push('empty');
  }
  
  return stars;
};

/**
 * Generate random ID
 * @returns Random ID string
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email format
 * @param email - Email string
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format member since date
 * @param dateString - ISO date string
 * @returns Formatted member since date (e.g., "Member since Jan 2025")
 */
export const formatMemberSince = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      year: 'numeric' 
    };
    return `Member since ${date.toLocaleDateString('en-US', options)}`;
  } catch (error) {
    return 'Member';
  }
};

/**
 * Get score display
 * @param homeScore - Home team score
 * @param awayScore - Away team score
 * @returns Formatted score string (e.g., "2 - 1")
 */
export const getScoreDisplay = (homeScore: number, awayScore: number): string => {
  return `${homeScore} - ${awayScore}`;
};

/**
 * Delay utility for async operations
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Safely parse JSON
 * @param json - JSON string
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
};
