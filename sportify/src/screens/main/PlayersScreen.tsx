/**
 * Players Screen
 * Displays list of players with search, sport filters, and position filters
 */

import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPlayers, filterPlayersByPosition, setSportFilter } from '../../redux/slices/playersSlice';
import { Header, LoadingSpinner } from '../../components/common';
import PlayerCard from '../../components/cards/PlayerCard';
import { spacing, fontSize, borderRadius, fontWeight } from '../../constants/colors';
import { Player, SportType, FootballPosition, CricketPosition } from '../../constants/types';

const footballPositions: Array<'All' | FootballPosition> = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
const cricketPositions: Array<'All' | CricketPosition> = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];

export const PlayersScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { players, loading, selectedSport } = useSelector((state: RootState) => state.players);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  // Get positions based on selected sport
  const positions: string[] = useMemo(() => {
    if (selectedSport === 'Cricket') {
      return [...cricketPositions];
    } else if (selectedSport === 'Football') {
      return [...footballPositions];
    }
    // For 'All' sports, combine both
    const combined = ['All', ...Array.from(new Set([...footballPositions.slice(1), ...cricketPositions.slice(1)]))];
    return combined;
  }, [selectedSport]);

  // Filter players by sport and position
  const filteredPlayers = useMemo(() => {
    let filtered = players;

    // Filter by sport
    if (selectedSport !== 'All') {
      filtered = filtered.filter(player => player.sport === selectedSport);
    }

    // Filter by position
    if (selectedPosition !== 'All') {
      filtered = filtered.filter(player => player.position === selectedPosition);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [players, selectedSport, selectedPosition, searchQuery]);

  const handleSportFilter = (sport: 'All' | SportType) => {
    dispatch(setSportFilter(sport));
    setSelectedPosition('All'); // Reset position filter when sport changes
  };

  const handlePositionFilter = (position: string) => {
    setSelectedPosition(position);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No players found
      </Text>
    </View>
  );

  if (loading && players.length === 0) {
    return <LoadingSpinner message="Loading players..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Players" showUser />
      
      {/* Sport Filters */}
      <View style={styles.sportFilterOuterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sportFilterContainer}
        >
          <TouchableOpacity
            style={[
              styles.sportFilterButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              selectedSport === 'All' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSportFilter('All')}
          >
            <Text style={[
              styles.sportFilterText,
              { color: colors.text },
              selectedSport === 'All' && { color: '#FFFFFF', fontWeight: '700' }
            ]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sportFilterButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              selectedSport === 'Football' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSportFilter('Football')}
          >
            <Text style={[
              styles.sportFilterText,
              { color: colors.text },
              selectedSport === 'Football' && { color: '#FFFFFF', fontWeight: '700' }
            ]}>
              ⚽ Football
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sportFilterButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              selectedSport === 'Cricket' && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
            onPress={() => handleSportFilter('Cricket')}
          >
            <Text style={[
              styles.sportFilterText,
              { color: colors.text },
              selectedSport === 'Cricket' && { color: '#FFFFFF', fontWeight: '700' }
            ]}>
              🏏 Cricket
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <Feather name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search players..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Position Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={positions}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedPosition === item ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => handlePositionFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedPosition === item ? '#FFFFFF' : colors.text,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Players List */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item: Player) => item.id}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={() => {
              // Navigate to player details
              console.log('Player pressed:', item.id);
            }}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sportFilterOuterContainer: {
    paddingVertical: spacing.sm,
  },
  sportFilterContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  sportFilterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginRight: spacing.sm,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  sportFilterText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    paddingVertical: spacing.sm,
  },
  filtersContainer: {
    marginVertical: spacing.md,
  },
  filtersList: {
    paddingHorizontal: spacing.md,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  list: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
  },
});

export default PlayersScreen;
