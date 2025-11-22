/**
 * Color Constants for Sportify App
 * Supports Light and Dark Mode Themes
 */

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  border: string;
  placeholder: string;
  disabled: string;
  shadow: string;
  live: string;
  upcoming: string;
  completed: string;
}

export const lightTheme: Theme = {
  primary: '#1E88E5',
  secondary: '#FFA726',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  info: '#42A5F5',
  border: '#E0E0E0',
  placeholder: '#9E9E9E',
  disabled: '#BDBDBD',
  shadow: '#000000',
  live: '#66BB6A',
  upcoming: '#42A5F5',
  completed: '#9E9E9E',
};

export const darkTheme: Theme = {
  primary: '#42A5F5',
  secondary: '#FFB74D',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFB74D',
  info: '#42A5F5',
  border: '#2C2C2C',
  placeholder: '#757575',
  disabled: '#424242',
  shadow: '#000000',
  live: '#66BB6A',
  upcoming: '#42A5F5',
  completed: '#757575',
};

/**
 * Common Color Constants (theme-independent)
 */
export const commonColors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

/**
 * Status Colors
 */
export const statusColors = {
  live: '#66BB6A',
  upcoming: '#42A5F5',
  completed: '#9E9E9E',
};

/**
 * Spacing Constants (in pixels)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

/**
 * Border Radius Constants
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

/**
 * Font Sizes
 */
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  huge: 32,
};

/**
 * Font Weights
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Shadow Styles
 */
export const shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
