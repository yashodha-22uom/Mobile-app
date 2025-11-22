/**
 * useTheme Custom Hook
 * Provides theme colors and utilities based on current theme mode
 */

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { lightTheme, darkTheme, Theme } from '../constants/colors';

/**
 * Custom hook to access theme colors
 * @returns Current theme colors and isDarkMode flag
 */
export const useTheme = (): { colors: Theme; isDarkMode: boolean } => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  const colors = isDarkMode ? darkTheme : lightTheme;
  
  return {
    colors,
    isDarkMode,
  };
};

export default useTheme;
