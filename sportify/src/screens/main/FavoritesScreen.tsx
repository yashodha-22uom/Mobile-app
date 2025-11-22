/**
 * Favorites Screen
 * Displays favorite matches and players
 */

import React, { useEffect } from 'react';
import { View, SectionList, StyleSheet, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { AppDispatch, RootState } from '../../redux/store';
import { clearAllFavorites } from '../../redux/slices/favoritesSlice';
import { Header, Button } from '../../components/common';
import MatchCard from '../../components/cards/MatchCard';
import PlayerCard from '../../components/cards/PlayerCard';
import { spacing, fontSize, fontWeight } from '../../constants/colors';

export const FavoritesScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteMatches, favoritePlayers } = useSelector(
    (state: RootState) => state.favorites
  );
  const matches = useSelector((state: RootState) => state.matches.matches);
  const players = useSelector((state: RootState) => state.players.players);

  const favoriteMatchesData = matches.filter((match) =>
    favoriteMatches.includes(match.id)
  );
  const favoritePlayersData = players.filter((player) =>
    favoritePlayers.includes(player.id)
  );

  const sections = [
    {
      title: 'Favorite Matches',
      data: favoriteMatchesData as any[],
      type: 'match',
    },
    {
      title: 'Favorite Players',
      data: favoritePlayersData as any[],
      type: 'player',
    },
  ];

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearAllFavorites()),
        },
      ]
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No Favorites Yet
      </Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Start adding matches and players to your favorites
      </Text>
    </View>
  );

  const renderSectionHeader = ({ section }: any) => {
    if (section.data.length === 0) return null;
    
    return (
      <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {section.title}
        </Text>
        <Text style={[styles.sectionCount, { color: colors.textSecondary }]}>
          {section.data.length}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, section }: any) => {
    if (section.type === 'match') {
      return (
        <MatchCard
          match={item}
          onPress={() => {
            console.log('Match pressed:', item.id);
          }}
        />
      );
    } else {
      return (
        <PlayerCard
          player={item}
          onPress={() => {
            console.log('Player pressed:', item.id);
          }}
        />
      );
    }
  };

  const hasFavorites = favoriteMatches.length > 0 || favoritePlayers.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Favorites" showUser />
      
      {hasFavorites ? (
        <>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={styles.list}
            stickySectionHeadersEnabled={false}
          />
          
          <View style={styles.clearButtonContainer}>
            <Button
              title="Clear All Favorites"
              onPress={handleClearAll}
              variant="outline"
              fullWidth
            />
          </View>
        </>
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  sectionCount: {
    fontSize: fontSize.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  clearButtonContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
});

export default FavoritesScreen;
