/**
 * Home Screen
 * Displays list of matches with pull-to-refresh and sport filtering
 */

import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchMatches, refreshMatches, setSportFilter } from '../../redux/slices/matchesSlice';
import { Header, LoadingSpinner } from '../../components/common';
import MatchCard from '../../components/cards/MatchCard';
import { spacing, fontSize } from '../../constants/colors';
import { Match, SportType } from '../../constants/types';

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { matches, loading, selectedSport } = useSelector((state: RootState) => state.matches);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  // Filter matches based on selected sport
  const filteredMatches = useMemo(() => {
    if (selectedSport === 'All') {
      return matches;
    }
    return matches.filter(match => match.sport === selectedSport);
  }, [matches, selectedSport]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(refreshMatches());
    setRefreshing(false);
  };

  const handleSportFilter = (sport: 'All' | SportType) => {
    dispatch(setSportFilter(sport));
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No matches available
      </Text>
    </View>
  );

  const renderSportFilters = () => (
    <View style={styles.filterOuterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
            selectedSport === 'All' && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleSportFilter('All')}
        >
          <Text style={[
            styles.filterText,
            { color: colors.text },
            selectedSport === 'All' && { color: '#FFFFFF', fontWeight: '700' }
          ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
            selectedSport === 'Football' && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleSportFilter('Football')}
        >
          <Text style={[
            styles.filterText,
            { color: colors.text },
            selectedSport === 'Football' && { color: '#FFFFFF', fontWeight: '700' }
          ]}>
            ⚽ Football
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
            selectedSport === 'Cricket' && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => handleSportFilter('Cricket')}
        >
          <Text style={[
            styles.filterText,
            { color: colors.text },
            selectedSport === 'Cricket' && { color: '#FFFFFF', fontWeight: '700' }
          ]}>
            🏏 Cricket
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  if (loading && matches.length === 0) {
    return <LoadingSpinner message="Loading matches..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Sportify" showUser />
      {renderSportFilters()}
      <FlatList
        data={filteredMatches}
        keyExtractor={(item: Match) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() => {
              // Navigate to match details
              console.log('Match pressed:', item.id);
            }}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
  },
  filterOuterContainer: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
  },
  filterContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginRight: spacing.sm,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});

export default HomeScreen;
