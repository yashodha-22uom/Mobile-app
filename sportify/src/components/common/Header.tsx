/**
 * Header Component
 * Custom header with app logo and user name
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { spacing, fontSize, fontWeight } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showUser?: boolean;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightIconPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showUser = false,
  rightIcon,
  onRightIconPress,
}) => {
  const { colors } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  // Get display name - prioritize full name, then firstName, then username
  const getDisplayName = (): string => {
    if (!user) return '';
    
    // If both firstName and lastName exist, combine them
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    // If only firstName exists
    if (user.firstName) {
      return user.firstName;
    }
    
    // Fall back to username, capitalize first letter
    const username = user.username || '';
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      {/* Left Side */}
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        
        {title && !showBack && (
          <View style={styles.titleContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.text }]}>
              {title}
            </Text>
          </View>
        )}
      </View>

      {/* Center */}
      {showBack && title && (
        <View style={styles.centerContainer}>
          <Text
            style={[styles.headerTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      )}

      {/* Right Side */}
      <View style={styles.rightContainer}>
        {showUser && user && (
          <View style={styles.userInfoContainer}>
            <View style={styles.userTextContainer}>
              <Text
                style={[styles.greetingText, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                Hello,
              </Text>
              <Text
                style={[styles.userName, { color: colors.text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {getDisplayName()}
              </Text>
            </View>
            <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {getDisplayName().charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.iconButton}
          >
            <Feather name={rightIcon} size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 36,
    height: 36,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  iconButton: {
    padding: spacing.xs,
  },
  userNameContainer: {
    maxWidth: 150,
    marginRight: spacing.xs,
  },
  userName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  userTextContainer: {
    alignItems: 'flex-end',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '400' as any,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as any,
  },
});

export default Header;
