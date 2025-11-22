/**
 * PlayerCard Component
 * Displays player information in a horizontal card format
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { Player } from '../../constants/types';
import { toggleFavoritePlayer } from '../../redux/slices/favoritesSlice';
import { RootState } from '../../redux/store';
import { spacing, borderRadius, fontSize, fontWeight, shadow } from '../../constants/colors';
import { getRatingStars } from '../../utils/helpers';

interface PlayerCardProps {
  player: Player;
  onPress: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onPress }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favoritePlayers = useSelector(
    (state: RootState) => state.favorites.favoritePlayers
  );

  const isFavorite = favoritePlayers.includes(player.id);
  const ratingStars = getRatingStars(player.rating);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    dispatch(toggleFavoritePlayer(player.id));
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Forward':
        return colors.error;
      case 'Midfielder':
        return colors.success;
      case 'Defender':
        return colors.info;
      case 'Goalkeeper':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
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
      {/* Player Avatar */}
      <View
        style={[
          styles.avatarContainer,
          { backgroundColor: colors.primary + '20' },
        ]}
      >
        <Feather name="user" size={32} color={colors.primary} />
      </View>

      {/* Player Info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.nameContainer}>
            <Text style={[styles.playerName, { color: colors.text }]} numberOfLines={1}>
              {player.name}
            </Text>
            <Text style={[styles.teamName, { color: colors.textSecondary }]} numberOfLines={1}>
              {player.team}
            </Text>
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

        <View style={styles.detailsRow}>
          <View
            style={[
              styles.positionBadge,
              { backgroundColor: getPositionColor(player.position) + '20' },
            ]}
          >
            <Text
              style={[
                styles.positionText,
                { color: getPositionColor(player.position) },
              ]}
            >
              {player.position}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Feather name="target" size={12} color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>
                {player.statistics.goals} Goals
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Feather name="trending-up" size={12} color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>
                {player.statistics.assists} Assists
              </Text>
            </View>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          {ratingStars.map((type, index) => (
            <Feather
              key={index}
              name={type === 'full' || type === 'half' ? 'star' : 'star'}
              size={14}
              color={type === 'full' || type === 'half' ? colors.warning : colors.border}
              fill={type === 'full' ? colors.warning : 'transparent'}
            />
          ))}
          <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
            {player.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  nameContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  playerName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  teamName: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  positionBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  positionText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginHorizontal: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
    fontWeight: fontWeight.medium,
  },
});

export default PlayerCard;
