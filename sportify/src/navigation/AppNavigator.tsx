/**
 * App Navigator
 * Root navigation with authentication flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { AppDispatch, RootState } from '../redux/store';
import { checkAuth } from '../redux/slices/authSlice';
import { loadTheme } from '../redux/slices/themeSlice';
import { loadFavoritesFromStorage } from '../redux/slices/favoritesSlice';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

export const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors, isDarkMode } = useTheme();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize app - load saved data
    const initializeApp = async () => {
      try {
        await dispatch(loadTheme()).unwrap();
        await dispatch(loadFavoritesFromStorage()).unwrap();
        await dispatch(checkAuth()).unwrap();
      } catch (error) {
        console.log('App initialization complete');
      }
    };

    initializeApp();
  }, [dispatch]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading Sportify...
        </Text>
      </View>
    );
  }

  // Custom navigation theme based on app theme
  const navigationTheme = isDarkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
        },
      };

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default AppNavigator;
