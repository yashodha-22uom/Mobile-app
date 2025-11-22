/**
 * Profile Screen
 * User profile with settings and dark mode toggle
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { AppDispatch, RootState } from '../../redux/store';
import { logoutUser } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { Header, Button } from '../../components/common';
import { spacing, fontSize, fontWeight, borderRadius, shadow } from '../../constants/colors';
import { getInitials, formatMemberSince } from '../../utils/helpers';

export const ProfileScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { favoriteMatches, favoritePlayers } = useSelector(
    (state: RootState) => state.favorites
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ]
    );
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Profile" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, ...shadow.medium }]}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {user ? getInitials(user.username || user.email) : 'U'}
            </Text>
          </View>
          
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.username || 'User'}
          </Text>
          
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email || 'user@sportify.com'}
          </Text>
          
          <Text style={[styles.memberSince, { color: colors.textSecondary }]}>
            {user?.memberSince ? formatMemberSince(user.memberSince) : 'Member'}
          </Text>
        </View>

        {/* Statistics Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, ...shadow.medium }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Statistics</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Feather name="calendar" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {favoriteMatches.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Favorite Matches
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Feather name="users" size={24} color={colors.secondary} />
              </View>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {favoritePlayers.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Favorite Players
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Card */}
        <View style={[styles.card, { backgroundColor: colors.surface, ...shadow.medium }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather
                name={isDarkMode ? 'moon' : 'sun'}
                size={20}
                color={colors.text}
              />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDarkMode ? colors.primary : colors.surface}
            />
          </View>
          
          <View style={[styles.settingItem, { opacity: 0.5 }]}>
            <View style={styles.settingLeft}>
              <Feather name="bell" size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Notifications
              </Text>
            </View>
            <Switch value={true} disabled />
          </View>
          
          <View style={[styles.settingItem, { opacity: 0.5 }]}>
            <View style={styles.settingLeft}>
              <Feather name="globe" size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Language
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              English
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
          style={styles.logoutButton}
        />

        {/* App Version */}
        <Text style={[styles.version, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  memberSince: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  statLabel: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: fontSize.md,
    marginLeft: spacing.md,
  },
  settingValue: {
    fontSize: fontSize.md,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
  version: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});

export default ProfileScreen;
