/**
 * MatchCard Component
 * Displays match information in a card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { Match } from '../../constants/types';
import { toggleFavoriteMatch } from '../../redux/slices/favoritesSlice';
import { RootState } from '../../redux/store';
import { spacing, borderRadius, fontSize, fontWeight, shadow } from '../../constants/colors';
import { formatDate, formatTime, getStatusColor } from '../../utils/helpers';

interface MatchCardProps {
  match: Match;
  onPress: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favoriteMatches = useSelector(
    (state: RootState) => state.favorites.favoriteMatches
  );

  const isFavorite = favoriteMatches.includes(match.id);
  const statusColor = getStatusColor(match.status);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    dispatch(toggleFavoriteMatch(match.id));
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          ...shadow.medium,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{match.status}</Text>
        </View>
        
        <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={20}
            color={isFavorite ? colors.error : colors.textSecondary}
            fill={isFavorite ? colors.error : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Teams and Score */}
      <View style={styles.matchInfo}>
        <View style={styles.teamContainer}>
          <Feather name="shield" size={32} color={colors.primary} />
          <Text style={[styles.teamName, { color: colors.text }]} numberOfLines={1}>
            {match.homeTeam}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          {match.status === 'Upcoming' ? (
            <Text style={[styles.vsText, { color: colors.textSecondary }]}>VS</Text>
          ) : (
            <View style={styles.scoreBox}>
              <Text style={[styles.score, { color: colors.text }]}>
                {match.homeScore}
              </Text>
              <Text style={[styles.scoreDivider, { color: colors.textSecondary }]}>
                -
              </Text>
              <Text style={[styles.score, { color: colors.text }]}>
                {match.awayScore}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.teamContainer, styles.teamRight]}>
          <Feather name="shield" size={32} color={colors.secondary} />
          <Text style={[styles.teamName, { color: colors.text }]} numberOfLines={1}>
            {match.awayTeam}
          </Text>
        </View>
      </View>

      {/* Match Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {formatDate(match.date)} • {formatTime(match.time)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {match.venue}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Feather name="award" size={14} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {match.league}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamRight: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  scoreContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  scoreDivider: {
    fontSize: fontSize.xl,
    marginHorizontal: spacing.sm,
  },
  vsText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
    paddingTop: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  detailText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
});

export default MatchCard;
