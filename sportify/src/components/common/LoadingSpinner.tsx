/**
 * LoadingSpinner Component
 * Displays a loading indicator
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, fontSize } from '../../constants/colors';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
  overlay?: boolean;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message,
  overlay = false,
  style,
}) => {
  const { colors } = useTheme();

  if (overlay) {
    return (
      <View
        style={[
          styles.overlayContainer,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
      >
        <View
          style={[
            styles.overlayContent,
            { backgroundColor: colors.surface },
          ]}
        >
          <ActivityIndicator size={size} color={colors.primary} />
          {message && (
            <Text
              style={[
                styles.message,
                { color: colors.text, marginTop: spacing.md },
              ]}
            >
              {message}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text
          style={[
            styles.message,
            { color: colors.text, marginTop: spacing.md },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  overlayContent: {
    padding: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    fontSize: fontSize.md,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
